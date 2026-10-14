import type { Client } from '@libsql/client';
import { MOCK_CARS } from '@/data/mock-cars';
import { MOCK_PROMOS } from '@/data/mock-promos';
import { MOCK_INQUIRIES } from '@/data/mock-inquiries';
import { SHOWROOM, localizeVehicleValue } from '@/lib/locale';

/** Migrasi demo satu kali. Harga contoh Indonesia bukan hasil konversi kurs. */
export async function migrateIndonesiaDemo(db: Client) {
  await db.execute('CREATE TABLE IF NOT EXISTS app_settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)');
  const marker = await db.execute("SELECT value FROM app_settings WHERE key = 'indonesia_demo_v1'");
  if (marker.rows.length) {
    await localizeLegacyPromoDetails(db);
    await localizeLegacyCustomerDetails(db);
    return;
  }
  const carColumns = await db.execute('PRAGMA table_info(cars)');
  const oldCarColumns = new Set(carColumns.rows.map(row => String(row.name)));
  const legacy = oldCarColumns.has('depreciation_sgd');
  const additions: Record<string, Record<string, string>> = {
    cars: {
      annual_tax_idr: 'REAL', tax_expiry: 'TEXT', monthly_est_idr: 'REAL',
      plate_number: 'TEXT', document_status: 'TEXT', owners: 'INTEGER',
      currency: "TEXT NOT NULL DEFAULT 'IDR'",
    },
    promos: { discount_idr: 'REAL' },
    inquiries: { car_price_idr: 'REAL' },
  };
  for (const [table, fields] of Object.entries(additions)) {
    const columns = await db.execute(`PRAGMA table_info(${table})`);
    const existing = new Set(columns.rows.map(row => String(row.name)));
    for (const [field, type] of Object.entries(fields)) {
      if (!existing.has(field)) await db.execute(`ALTER TABLE ${table} ADD COLUMN ${field} ${type}`);
    }
  }
  await db.execute('CREATE TABLE IF NOT EXISTS demo_locale_backup (table_name TEXT, record_id TEXT, original_json TEXT NOT NULL, PRIMARY KEY (table_name, record_id))');
  const transaction = await db.transaction('write');
  try {
    if (legacy) {
      const cars = await transaction.execute('SELECT * FROM cars');
      for (const row of cars.rows) {
        const id = String(row.id);
        const demo = MOCK_CARS.find(car => car.id === id);
        const customPrice = String(row.brand) === 'Bentley' ? 7250000000
          : String(row.model).includes('RS e-tron') ? 4950000000
          : Math.round(Number(row.price) * 10000 / 1000000) * 1000000;
        const price = demo?.price ?? customPrice;
        await transaction.execute({ sql: 'INSERT OR IGNORE INTO demo_locale_backup VALUES (?, ?, ?)', args: ['cars', id, JSON.stringify(row)] });
        await transaction.execute({
          sql: 'UPDATE cars SET price = ?, annual_tax_idr = ?, tax_expiry = ?, monthly_est_idr = ?, plate_number = ?, document_status = ?, owners = ?, location = ?, transmission = ?, fuel_type = ?, body_type = ?, description = ?, features = ?, currency = ?, color = ? WHERE id = ?',
          args: [price, demo?.annual_tax_idr ?? null, demo?.tax_expiry ?? '',
            demo?.monthly_est_idr ?? Math.round(price * 0.7 * 1.2 / 48 / 100000) * 100000,
            demo?.plate_number ?? '', demo?.document_status ?? 'Konfirmasi kelengkapan dokumen ke showroom',
            demo?.owners ?? null, 'Medan, Sumatera Utara', localizeVehicleValue(String(row.transmission)),
            localizeVehicleValue(String(row.fuel_type)), localizeVehicleValue(String(row.body_type)),
            demo?.description ?? `${row.brand} ${row.model} tersedia untuk pemeriksaan di Apex Auto Medan. Konsultasikan kondisi unit, dokumen STNK/BPKB, pajak, harga tunai, dan pilihan kredit atau tukar tambah.`,
            JSON.stringify(demo?.features ?? ['Pemeriksaan kondisi unit', 'Konsultasi dokumen dan riwayat servis']), 'IDR', localizeVehicleValue(demo?.color ?? String(row.color)), id],
        });
      }
      const promos = await transaction.execute('SELECT * FROM promos');
      for (const row of promos.rows) {
        const id = String(row.id);
        const demo = MOCK_PROMOS.find(promo => promo.id === id);
        await transaction.execute({ sql: 'INSERT OR IGNORE INTO demo_locale_backup VALUES (?, ?, ?)', args: ['promos', id, JSON.stringify(row)] });
        if (demo) await transaction.execute({
          sql: 'UPDATE promos SET slug = ?, title = ?, tagline = ?, badge = ?, discount_idr = ?, description = ?, benefits = ?, terms_conditions = ?, valid_until = ?, cta_text = ?, cta_whatsapp_text = ? WHERE id = ?',
          args: [demo.slug, demo.title, demo.tagline, demo.badge, demo.discount_idr ?? null, demo.description,
            JSON.stringify(demo.benefits), JSON.stringify(demo.terms_conditions), demo.valid_until,
            demo.cta_text, demo.cta_whatsapp_text, id],
        });
        else await transaction.execute({ sql: 'UPDATE promos SET discount_idr = ?, title = ?, tagline = ?, description = ? WHERE id = ?', args: [Math.round(Number(row.discount_sgd || 0) * 10000), 'Penawaran Mobil Pilihan', 'Konsultasikan promo yang tersedia di showroom Medan.', 'Manfaat dan syarat promo dikonfirmasi sebelum transaksi.', id] });
      }
      const inquiries = await transaction.execute('SELECT * FROM inquiries');
      for (const row of inquiries.rows) {
        const id = String(row.id);
        const demo = MOCK_INQUIRIES.find(inquiry => inquiry.id === id);
        const car = MOCK_CARS.find(car => car.id === row.car_id);
        await transaction.execute({ sql: 'INSERT OR IGNORE INTO demo_locale_backup VALUES (?, ?, ?)', args: ['inquiries', id, JSON.stringify(row)] });
        await transaction.execute({
          sql: 'UPDATE inquiries SET car_price_idr = ?, branch = ?, name = ?, contact = ?, email = ?, car_name = ?, interest = ?, message = ?, sales_assigned = ? WHERE id = ?',
          args: [demo?.carPriceIDR ?? car?.price ?? Math.round(Number(row.car_price_sgd || 0) * 10000), SHOWROOM.name,
            demo?.customerName ?? String(row.name), demo?.phone ?? String(row.contact), demo?.email ?? String(row.email || ''),
            demo?.carName ?? String(row.car_name || 'Pertanyaan Showroom'), demo?.carName ?? String(row.interest || ''),
            demo?.message ?? String(row.message), demo?.salesAssigned ?? 'Tim Penjualan Apex Medan', id],
        });
      }
    }
    await transaction.execute({ sql: "UPDATE users SET email = ?, full_name = ?, phone = ? WHERE email = 'owner@apexautosg.com'", args: ['admin@apexauto.id', 'Admin Apex Medan', SHOWROOM.phone] });
    await transaction.execute("INSERT INTO app_settings (key, value) VALUES ('indonesia_demo_v1', 'IDR')");
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  } finally { transaction.close(); }
  await localizeLegacyPromoDetails(db);
  await localizeLegacyCustomerDetails(db);
}

async function localizeLegacyCustomerDetails(db: Client) {
  const marker = await db.execute("SELECT value FROM app_settings WHERE key = 'indonesia_customer_details_v1'");
  if (marker.rows.length) return;
  const transaction = await db.transaction('write');
  try {
    const legacyInquiries = await transaction.execute("SELECT i.id, i.car_name, c.price FROM inquiries i LEFT JOIN cars c ON c.id = i.car_id JOIN demo_locale_backup b ON b.record_id = i.id AND b.table_name = 'inquiries' WHERE i.contact LIKE '+65%' OR i.message LIKE '%Leng Kee%'");
    for (const [index, row] of legacyInquiries.rows.entries()) {
      if (MOCK_INQUIRIES.some(inquiry => inquiry.id === row.id)) continue;
      const carName = String(row.car_name || 'mobil pilihan');
      await transaction.execute({
        sql: 'UPDATE inquiries SET name = ?, contact = ?, email = ?, car_price_idr = COALESCE(?, car_price_idr), branch = ?, interest = ?, message = ? WHERE id = ?',
        args: ['Dimas Pratama', `+62812000000${String(99 + index).padStart(2, '0')}`, 'pelanggan.demo@example.com', row.price ?? null, SHOWROOM.name, carName,
          `Saya tertarik dengan ${carName}. Mohon informasi kondisi unit, STNK/BPKB, pilihan pembayaran, dan jadwal kunjungan ke showroom Medan.`, String(row.id)],
      });
    }
    await transaction.execute("INSERT OR IGNORE INTO app_settings (key, value) VALUES ('indonesia_customer_details_v1', 'id-ID')");
    await transaction.commit();
  } catch (error) { await transaction.rollback(); throw error; }
  finally { transaction.close(); }
}

async function localizeLegacyPromoDetails(db: Client) {
  const marker = await db.execute("SELECT value FROM app_settings WHERE key = 'indonesia_promo_details_v1'");
  if (marker.rows.length) return;
  const transaction = await db.transaction('write');
  try {
    const promos = await transaction.execute("SELECT p.id FROM promos p JOIN demo_locale_backup b ON b.record_id = p.id AND b.table_name = 'promos'");
    for (const row of promos.rows) {
      const id = String(row.id);
      if (MOCK_PROMOS.some(promo => promo.id === id)) continue;
      await transaction.execute({
        sql: 'UPDATE promos SET badge = ?, benefits = ?, terms_conditions = ?, valid_until = ?, cta_text = ?, cta_whatsapp_text = ? WHERE id = ?',
        args: ['PROMO PILIHAN',
          JSON.stringify(['Perawatan cat sesuai ketentuan promo', 'Konsultasi kelengkapan dokumen dan balik nama']),
          JSON.stringify(['Berlaku untuk unit pilihan yang tersedia di showroom Medan.', 'Rincian manfaat dan biaya dikonfirmasi sebelum transaksi.']),
          '31 Desember 2026', 'Tanya Promo via WhatsApp', 'Halo Apex Auto Medan, saya ingin informasi promo mobil pilihan.', id],
      });
    }
    await transaction.execute("INSERT INTO app_settings (key, value) VALUES ('indonesia_promo_details_v1', 'id-ID')");
    await transaction.commit();
  } catch (error) { await transaction.rollback(); throw error; }
  finally { transaction.close(); }
}
