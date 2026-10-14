import { createClient, Client } from '@libsql/client';
import path from 'path';
import { MOCK_CARS } from '@/data/mock-cars';
import { MOCK_PROMOS } from '@/data/mock-promos';
import { MOCK_INQUIRIES, AdminInquiry } from '@/data/mock-inquiries';
import { Car, CarImage, CarStatus } from '@/types/car';
import { PromoItem } from '@/types/promo';
import { migrateIndonesiaDemo } from './indonesia-demo-migration';
import { localizeVehicleValue } from '@/lib/locale';

let clientInstance: Client | null = null;
let isDbInitialized = false;
let initializationPromise: Promise<Client> | null = null;

export function getDbClient(): Client {
  if (!clientInstance) {
    const dbPath = path.join(process.cwd(), 'showroom.db');
    clientInstance = createClient({
      url: `file:${dbPath}`,
    });
  }
  return clientInstance;
}

/**
 * Initializes tables and seeds initial showroom data if database is empty
 */
export function ensureDatabase(): Promise<Client> {
  if (isDbInitialized) return Promise.resolve(getDbClient());
  if (!initializationPromise) {
    initializationPromise = initializeDatabase().catch(error => {
      initializationPromise = null;
      throw error;
    });
  }
  return initializationPromise;
}

async function initializeDatabase(): Promise<Client> {
  const db = getDbClient();
  if (isDbInitialized) return db;

  try {
    // 1. Users Table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        full_name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'sales',
        phone TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )
    `);

    // 2. Cars Table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS cars (
        id TEXT PRIMARY KEY,
        brand TEXT NOT NULL,
        model TEXT NOT NULL,
        year INTEGER NOT NULL,
        price REAL NOT NULL,
        body_type TEXT NOT NULL,
        transmission TEXT NOT NULL DEFAULT 'Automatic',
        fuel_type TEXT NOT NULL DEFAULT 'Petrol',
        mileage_km INTEGER NOT NULL DEFAULT 0,
        color TEXT NOT NULL,
        description TEXT,
        features TEXT,
        status TEXT NOT NULL DEFAULT 'available',
        location TEXT NOT NULL,
        annual_tax_idr REAL,
        tax_expiry TEXT,
        engine_capacity_cc INTEGER,
        monthly_est_idr REAL,
        is_featured INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )
    `);

    // 3. Car Images Table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS car_images (
        id TEXT PRIMARY KEY,
        car_id TEXT NOT NULL,
        url TEXT NOT NULL,
        is_main INTEGER NOT NULL DEFAULT 0,
        sort_order INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL,
        FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE
      )
    `);

    // 4. Promos Table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS promos (
        id TEXT PRIMARY KEY,
        slug TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        tagline TEXT NOT NULL,
        badge TEXT NOT NULL,
        discount_idr REAL,
        description TEXT NOT NULL,
        benefits TEXT,
        terms_conditions TEXT,
        valid_until TEXT NOT NULL,
        image_url TEXT NOT NULL,
        highlight_color TEXT DEFAULT 'amber',
        cta_text TEXT NOT NULL,
        cta_whatsapp_text TEXT NOT NULL,
        is_featured INTEGER NOT NULL DEFAULT 0,
        is_active INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )
    `);

    // 5. Inquiries Table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id TEXT PRIMARY KEY,
        car_id TEXT,
        car_name TEXT,
        car_price_idr REAL,
        name TEXT NOT NULL,
        contact TEXT NOT NULL,
        email TEXT,
        interest TEXT,
        message TEXT NOT NULL,
        trade_in_car TEXT,
        loan_type TEXT,
        preferred_contact TEXT DEFAULT 'whatsapp',
        status TEXT NOT NULL DEFAULT 'new',
        sales_assigned TEXT,
        branch TEXT,
        notes TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )
    `);

    await migrateIndonesiaDemo(db);

    // Auto-seed initial admin user
    const usersCount = await db.execute('SELECT COUNT(*) as count FROM users');
    if (Number(usersCount.rows[0]?.count || 0) === 0) {
      const now = new Date().toISOString();
      await db.execute({
        sql: `INSERT INTO users (id, full_name, email, password_hash, role, phone, created_at, updated_at)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          'usr-owner-001',
          'Admin Apex Medan',
          'admin@apexauto.id',
          'password123',
          'owner',
          '+6281200000000',
          now,
          now,
        ],
      });
    }

    // Auto-seed cars and images (insert any missing cars)
    for (const car of MOCK_CARS) {
      const existingCar = await db.execute({
        sql: 'SELECT id FROM cars WHERE id = ? LIMIT 1',
        args: [car.id],
      });

      if (existingCar.rows.length === 0) {
        const now = car.created_at || new Date().toISOString();
        const featuresJson = Array.isArray(car.features)
          ? JSON.stringify(car.features)
          : JSON.stringify([]);

        await db.execute({
          sql: `INSERT INTO cars (
                  id, brand, model, year, price, body_type, transmission,
                  fuel_type, mileage_km, color, description, features,
                  status, location, annual_tax_idr, tax_expiry,
                  engine_capacity_cc, monthly_est_idr, is_featured, created_at, updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          args: [
            car.id,
            car.brand,
            car.model,
            car.year,
            car.price,
            car.body_type,
            car.transmission,
            car.fuel_type,
            car.mileage_km,
            car.color,
            car.description || '',
            featuresJson,
            car.status,
            car.location,
            car.annual_tax_idr ?? null,
            car.tax_expiry ?? null,
            car.engine_capacity_cc ?? null,
            car.monthly_est_idr ?? null,
            car.is_featured ? 1 : 0,
            now,
            now,
          ],
        });

        await db.execute({ sql: 'UPDATE cars SET plate_number = ?, document_status = ?, owners = ? WHERE id = ?', args: [car.plate_number || '', car.document_status || '', car.owners ?? null, car.id] });
        if (car.images && car.images.length > 0) {
          for (let i = 0; i < car.images.length; i++) {
            const img = car.images[i];
            await db.execute({
              sql: `INSERT INTO car_images (id, car_id, url, is_main, sort_order, created_at)
                    VALUES (?, ?, ?, ?, ?, ?)`,
              args: [
                img.id || `img-${car.id}-${i + 1}`,
                car.id,
                img.url,
                img.is_main ? 1 : 0,
                img.sort_order || i,
                now,
              ],
            });
          }
        }
      }
    }

    // Auto-seed promos
    const promosCount = await db.execute('SELECT COUNT(*) as count FROM promos');
    if (Number(promosCount.rows[0]?.count || 0) === 0) {
      const now = new Date().toISOString();
      for (const p of MOCK_PROMOS) {
        await db.execute({
          sql: `INSERT INTO promos (
                  id, slug, title, tagline, badge, discount_idr, description,
                  benefits, terms_conditions, valid_until, image_url,
                  highlight_color, cta_text, cta_whatsapp_text, is_featured, is_active,
                  created_at, updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          args: [
            p.id,
            p.slug,
            p.title,
            p.tagline,
            p.badge,
            p.discount_idr ?? null,
            p.description,
            JSON.stringify(p.benefits || []),
            JSON.stringify(p.terms_conditions || []),
            p.valid_until,
            p.image_url,
            p.highlight_color || 'amber',
            p.cta_text,
            p.cta_whatsapp_text,
            p.is_featured ? 1 : 0,
            1,
            now,
            now,
          ],
        });
      }
    }

    // Auto-seed inquiries
    const inquiriesCount = await db.execute('SELECT COUNT(*) as count FROM inquiries');
    if (Number(inquiriesCount.rows[0]?.count || 0) === 0) {
      for (const inq of MOCK_INQUIRIES) {
        await db.execute({
          sql: `INSERT INTO inquiries (
                  id, car_id, car_name, car_price_idr, name, contact, email,
                  interest, message, trade_in_car, loan_type, preferred_contact,
                  status, sales_assigned, branch, notes, created_at, updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          args: [
            inq.id,
            inq.carId,
            inq.carName,
            inq.carPriceIDR,
            inq.customerName,
            inq.phone,
            inq.email,
            inq.carName,
            inq.message,
            inq.tradeInCar || null,
            inq.loanType || 'bank_loan',
            inq.preferredContact || 'whatsapp',
            inq.status,
            inq.salesAssigned || 'Budi Santoso',
            inq.branch || "Apex Auto Medan",
            null,
            inq.createdAt || new Date().toISOString(),
            inq.createdAt || new Date().toISOString(),
          ],
        });
      }
    }

    isDbInitialized = true;
    return db;
  } catch (err) {
    console.error('Failed to initialize SQLite database:', err);
    throw err;
  }
}

// -------------------------------------------------------------
// CARS CRUD OPERATIONS
// -------------------------------------------------------------

function rowToCar(row: Record<string, any>, images: CarImage[] = []): Car {
  let features: string[] = [];
  try {
    if (typeof row.features === 'string') {
      if (row.features.startsWith('[')) {
        features = JSON.parse(row.features);
      } else {
        features = row.features.split(',').map((f: string) => f.trim()).filter(Boolean);
      }
    }
  } catch {
    features = [];
  }

  return {
    id: String(row.id),
    brand: String(row.brand),
    model: String(row.model),
    year: Number(row.year),
    price: Number(row.price),
    currency: 'IDR',
    body_type: String(row.body_type),
    transmission: String(row.transmission),
    fuel_type: String(row.fuel_type),
    mileage_km: Number(row.mileage_km),
    color: localizeVehicleValue(String(row.color)),
    description: row.description ? String(row.description) : '',
    features,
    status: row.status as CarStatus,
    location: String(row.location),
    is_featured: Boolean(row.is_featured),
    created_at: String(row.created_at),
    updated_at: row.updated_at ? String(row.updated_at) : undefined,
    annual_tax_idr: row.annual_tax_idr !== null ? Number(row.annual_tax_idr) : undefined,
    tax_expiry: row.tax_expiry ? String(row.tax_expiry) : undefined,
    plate_number: row.plate_number ? String(row.plate_number) : undefined,
    document_status: row.document_status ? String(row.document_status) : undefined,
    owners: row.owners !== null && row.owners !== undefined ? Number(row.owners) : undefined,
    engine_capacity_cc: row.engine_capacity_cc !== null ? Number(row.engine_capacity_cc) : undefined,
    monthly_est_idr: row.monthly_est_idr !== null ? Number(row.monthly_est_idr) : undefined,
    images,
  };
}

export async function getSqliteCars(options: {
  search?: string;
  bodyType?: string;
  priceRange?: string;
  minPrice?: number | null;
  maxPrice?: number | null;
  minYear?: number | null;
  location?: string;
  status?: string;
  sort?: string;
} = {}): Promise<Car[]> {
  const db = await ensureDatabase();

  let sql = 'SELECT * FROM cars WHERE 1=1';
  const args: any[] = [];

  if (options.search && options.search.trim()) {
    const term = `%${options.search.trim()}%`;
    sql += ' AND (brand LIKE ? OR model LIKE ? OR color LIKE ? OR features LIKE ? OR location LIKE ?)';
    args.push(term, term, term, term, term);
  }

  if (options.bodyType && options.bodyType !== 'All' && options.bodyType !== 'Semua') {
    sql += ' AND body_type = ?';
    args.push(options.bodyType);
  }

  if (options.priceRange === 'under-500m') {
    sql += ' AND price < 500000000';
  } else if (options.priceRange === '500m-1b') {
    sql += ' AND price >= 500000000 AND price <= 1000000000';
  } else if (options.priceRange === 'above-1b') {
    sql += ' AND price > 1000000000';
  }

  if (options.minPrice !== null && options.minPrice !== undefined && !isNaN(options.minPrice)) {
    sql += ' AND price >= ?';
    args.push(options.minPrice);
  }

  if (options.maxPrice !== null && options.maxPrice !== undefined && !isNaN(options.maxPrice)) {
    sql += ' AND price <= ?';
    args.push(options.maxPrice);
  }

  if (options.minYear && options.minYear > 0) {
    sql += ' AND year >= ?';
    args.push(options.minYear);
  }

  if (options.location && options.location !== 'All Locations' && options.location !== 'Semua Lokasi') {
    sql += ' AND location LIKE ?';
    args.push(`%${options.location}%`);
  }

  if (options.status && options.status !== 'all') {
    sql += ' AND status = ?';
    args.push(options.status);
  }

  // Sorting
  if (options.sort === 'price-asc') {
    sql += ' ORDER BY price ASC';
  } else if (options.sort === 'price-desc') {
    sql += ' ORDER BY price DESC';
  } else if (options.sort === 'year-desc') {
    sql += ' ORDER BY year DESC';
  } else {
    sql += ' ORDER BY created_at DESC';
  }

  const carsResult = await db.execute({ sql, args });
  const allImagesResult = await db.execute('SELECT * FROM car_images ORDER BY sort_order ASC');

  // Map images by car_id
  const imagesByCarId = new Map<string, CarImage[]>();
  for (const row of allImagesResult.rows) {
    const carId = String(row.car_id);
    const img: CarImage = {
      id: String(row.id),
      car_id: carId,
      url: String(row.url),
      is_main: Boolean(row.is_main),
      sort_order: Number(row.sort_order),
    };
    if (!imagesByCarId.has(carId)) {
      imagesByCarId.set(carId, []);
    }
    imagesByCarId.get(carId)!.push(img);
  }

  return carsResult.rows.map((row) => {
    const carId = String(row.id);
    const images = imagesByCarId.get(carId) || [];
    return rowToCar(row, images);
  });
}

export async function getSqliteCarById(id: string): Promise<Car | null> {
  const db = await ensureDatabase();
  const carResult = await db.execute({
    sql: 'SELECT * FROM cars WHERE id = ? LIMIT 1',
    args: [id],
  });

  if (carResult.rows.length === 0) return null;

  const imagesResult = await db.execute({
    sql: 'SELECT * FROM car_images WHERE car_id = ? ORDER BY sort_order ASC',
    args: [id],
  });

  const images: CarImage[] = imagesResult.rows.map((r) => ({
    id: String(r.id),
    car_id: String(r.car_id),
    url: String(r.url),
    is_main: Boolean(r.is_main),
    sort_order: Number(r.sort_order),
  }));

  return rowToCar(carResult.rows[0], images);
}

export async function createSqliteCar(data: Partial<Car> & { images?: (string | Partial<CarImage>)[] }): Promise<Car> {
  const db = await ensureDatabase();
  const now = new Date().toISOString();
  const carId = data.id || `car-${Date.now()}`;

  const features = Array.isArray(data.features) ? data.features : [];
  const featuresJson = JSON.stringify(features);

  const price = Number(data.price) || 0;
  const depreciation = data.annual_tax_idr ? Number(data.annual_tax_idr) : null;
  const monthlyEst = data.monthly_est_idr ? Number(data.monthly_est_idr) : null;

  await db.execute({
    sql: `INSERT INTO cars (
            id, brand, model, year, price, body_type, transmission,
            fuel_type, mileage_km, color, description, features,
            status, location, annual_tax_idr, tax_expiry,
            engine_capacity_cc, monthly_est_idr, is_featured, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      carId,
      data.brand || 'Mercedes-Benz',
      data.model || 'Unknown Model',
      Number(data.year) || new Date().getFullYear(),
      price,
      data.body_type || 'Sedan',
      data.transmission || "Otomatis",
      data.fuel_type || "Bensin",
      Number(data.mileage_km) || 0,
      data.color || 'Black',
      data.description || '',
      featuresJson,
      data.status || 'available',
      data.location || "Medan, Sumatera Utara",
      depreciation,
      data.tax_expiry || "Belum diisi",
      data.engine_capacity_cc ? Number(data.engine_capacity_cc) : null,
      monthlyEst,
      data.is_featured ? 1 : 0,
      now,
      now,
    ],
  });

  const createdImages: CarImage[] = [];
  if (Array.isArray(data.images) && data.images.length > 0) {
    for (let i = 0; i < data.images.length; i++) {
      const img = data.images[i];
      const imgUrl = typeof img === 'string' ? img : (img.url || '');
      if (!imgUrl) continue;

      const imgId = typeof img === 'object' && img.id ? img.id : `img-${carId}-${i + 1}`;
      const isMain = typeof img === 'object' && img.is_main !== undefined ? (img.is_main ? 1 : 0) : (i === 0 ? 1 : 0);

      await db.execute({
        sql: `INSERT INTO car_images (id, car_id, url, is_main, sort_order, created_at)
              VALUES (?, ?, ?, ?, ?, ?)`,
        args: [imgId, carId, imgUrl, isMain, i, now],
      });

      createdImages.push({
        id: imgId,
        car_id: carId,
        url: imgUrl,
        is_main: Boolean(isMain),
        sort_order: i,
      });
    }
  }

  await db.execute({ sql: 'UPDATE cars SET plate_number = ?, document_status = ?, owners = ?, currency = ? WHERE id = ?', args: [data.plate_number || '', data.document_status || '', data.owners ?? null, 'IDR', carId] });
  const createdCar = await getSqliteCarById(carId);
  return createdCar!;
}

export async function updateSqliteCar(id: string, data: Partial<Car> & { images?: (string | Partial<CarImage>)[] }): Promise<Car | null> {
  const db = await ensureDatabase();
  const existing = await getSqliteCarById(id);
  if (!existing) return null;

  const now = new Date().toISOString();
  const fields: string[] = [];
  const args: any[] = [];

  if (data.brand !== undefined) { fields.push('brand = ?'); args.push(data.brand); }
  if (data.model !== undefined) { fields.push('model = ?'); args.push(data.model); }
  if (data.year !== undefined) { fields.push('year = ?'); args.push(Number(data.year)); }
  if (data.price !== undefined) { fields.push('price = ?'); args.push(Number(data.price)); }
  if (data.body_type !== undefined) { fields.push('body_type = ?'); args.push(data.body_type); }
  if (data.transmission !== undefined) { fields.push('transmission = ?'); args.push(data.transmission); }
  if (data.fuel_type !== undefined) { fields.push('fuel_type = ?'); args.push(data.fuel_type); }
  if (data.mileage_km !== undefined) { fields.push('mileage_km = ?'); args.push(Number(data.mileage_km)); }
  if (data.color !== undefined) { fields.push('color = ?'); args.push(data.color); }
  if (data.description !== undefined) { fields.push('description = ?'); args.push(data.description); }
  if (data.features !== undefined) {
    fields.push('features = ?');
    args.push(JSON.stringify(data.features));
  }
  if (data.status !== undefined) { fields.push('status = ?'); args.push(data.status); }
  if (data.location !== undefined) { fields.push('location = ?'); args.push(data.location); }
  if (data.annual_tax_idr !== undefined) { fields.push('annual_tax_idr = ?'); args.push(data.annual_tax_idr ? Number(data.annual_tax_idr) : null); }
  if (data.tax_expiry !== undefined) { fields.push('tax_expiry = ?'); args.push(data.tax_expiry); }
  if (data.engine_capacity_cc !== undefined) { fields.push('engine_capacity_cc = ?'); args.push(data.engine_capacity_cc ? Number(data.engine_capacity_cc) : null); }
  if (data.monthly_est_idr !== undefined) { fields.push('monthly_est_idr = ?'); args.push(data.monthly_est_idr ? Number(data.monthly_est_idr) : null); }
  if (data.is_featured !== undefined) { fields.push('is_featured = ?'); args.push(data.is_featured ? 1 : 0); }

  if (data.plate_number !== undefined) { fields.push('plate_number = ?'); args.push(data.plate_number); }
  if (data.document_status !== undefined) { fields.push('document_status = ?'); args.push(data.document_status); }
  if (data.owners !== undefined) { fields.push('owners = ?'); args.push(Number(data.owners)); }
  fields.push('updated_at = ?');
  args.push(now);

  args.push(id);
  await db.execute({
    sql: `UPDATE cars SET ${fields.join(', ')} WHERE id = ?`,
    args,
  });

  // If images array is provided, replace or update
  if (Array.isArray(data.images)) {
    await db.execute({
      sql: 'DELETE FROM car_images WHERE car_id = ?',
      args: [id],
    });

    for (let i = 0; i < data.images.length; i++) {
      const img = data.images[i];
      const imgUrl = typeof img === 'string' ? img : (img.url || '');
      if (!imgUrl) continue;

      const imgId = typeof img === 'object' && img.id ? img.id : `img-${id}-${Date.now()}-${i}`;
      const isMain = typeof img === 'object' && img.is_main !== undefined ? (img.is_main ? 1 : 0) : (i === 0 ? 1 : 0);

      await db.execute({
        sql: `INSERT INTO car_images (id, car_id, url, is_main, sort_order, created_at)
              VALUES (?, ?, ?, ?, ?, ?)`,
        args: [imgId, id, imgUrl, isMain, i, now],
      });
    }
  }

  return getSqliteCarById(id);
}

export async function deleteSqliteCar(id: string): Promise<boolean> {
  const db = await ensureDatabase();
  await db.execute({ sql: 'DELETE FROM car_images WHERE car_id = ?', args: [id] });
  const result = await db.execute({ sql: 'DELETE FROM cars WHERE id = ?', args: [id] });
  return result.rowsAffected > 0;
}

// -------------------------------------------------------------
// PROMOS CRUD OPERATIONS
// -------------------------------------------------------------

function rowToPromo(row: Record<string, any>): PromoItem {
  let benefits: string[] = [];
  let terms: string[] = [];

  try {
    if (typeof row.benefits === 'string') benefits = JSON.parse(row.benefits);
  } catch {}

  try {
    if (typeof row.terms_conditions === 'string') terms = JSON.parse(row.terms_conditions);
  } catch {}

  return {
    id: String(row.id),
    slug: String(row.slug),
    title: String(row.title),
    tagline: String(row.tagline),
    badge: String(row.badge),
    discount_idr: row.discount_idr !== null ? Number(row.discount_idr) : undefined,
    description: String(row.description),
    benefits,
    terms_conditions: terms,
    valid_until: String(row.valid_until),
    image_url: String(row.image_url),
    highlight_color: row.highlight_color || 'amber',
    cta_text: String(row.cta_text),
    cta_whatsapp_text: String(row.cta_whatsapp_text),
    is_featured: Boolean(row.is_featured),
  };
}

export async function getSqlitePromos(): Promise<PromoItem[]> {
  const db = await ensureDatabase();
  const res = await db.execute('SELECT * FROM promos WHERE is_active = 1 ORDER BY created_at DESC');
  return res.rows.map(rowToPromo);
}

export async function createSqlitePromo(data: Partial<PromoItem>): Promise<PromoItem> {
  const db = await ensureDatabase();
  const now = new Date().toISOString();
  const id = data.id || `promo-${Date.now()}`;
  const slug = data.slug || `promo-${Date.now().toString().slice(-6)}`;

  await db.execute({
    sql: `INSERT INTO promos (
            id, slug, title, tagline, badge, discount_idr, description,
            benefits, terms_conditions, valid_until, image_url,
            highlight_color, cta_text, cta_whatsapp_text, is_featured, is_active,
            created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      id,
      slug,
      data.title || 'New Showroom Privilege',
      data.tagline || 'Special privilege program for Apex Auto clients',
      data.badge || 'PROMOTION',
      data.discount_idr !== undefined ? Number(data.discount_idr) : null,
      data.description || '',
      JSON.stringify(data.benefits || []),
      JSON.stringify(data.terms_conditions || []),
      data.valid_until || "Masih berlaku",
      data.image_url || 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
      data.highlight_color || 'amber',
      data.cta_text || "Tanya Promo via WhatsApp",
      data.cta_whatsapp_text || "Halo Apex Auto, saya ingin mengetahui informasi promo ini.",
      data.is_featured ? 1 : 0,
      1,
      now,
      now,
    ],
  });

  const res = await db.execute({ sql: 'SELECT * FROM promos WHERE id = ?', args: [id] });
  return rowToPromo(res.rows[0]);
}

export async function updateSqlitePromo(id: string, data: Partial<PromoItem>): Promise<PromoItem | null> {
  const db = await ensureDatabase();
  const now = new Date().toISOString();
  const fields: string[] = [];
  const args: any[] = [];

  if (data.title !== undefined) { fields.push('title = ?'); args.push(data.title); }
  if (data.tagline !== undefined) { fields.push('tagline = ?'); args.push(data.tagline); }
  if (data.badge !== undefined) { fields.push('badge = ?'); args.push(data.badge); }
  if (data.discount_idr !== undefined) { fields.push('discount_idr = ?'); args.push(data.discount_idr !== null ? Number(data.discount_idr) : null); }
  if (data.description !== undefined) { fields.push('description = ?'); args.push(data.description); }
  if (data.benefits !== undefined) { fields.push('benefits = ?'); args.push(JSON.stringify(data.benefits)); }
  if (data.terms_conditions !== undefined) { fields.push('terms_conditions = ?'); args.push(JSON.stringify(data.terms_conditions)); }
  if (data.valid_until !== undefined) { fields.push('valid_until = ?'); args.push(data.valid_until); }
  if (data.image_url !== undefined) { fields.push('image_url = ?'); args.push(data.image_url); }
  if (data.highlight_color !== undefined) { fields.push('highlight_color = ?'); args.push(data.highlight_color); }
  if (data.cta_text !== undefined) { fields.push('cta_text = ?'); args.push(data.cta_text); }
  if (data.cta_whatsapp_text !== undefined) { fields.push('cta_whatsapp_text = ?'); args.push(data.cta_whatsapp_text); }
  if (data.is_featured !== undefined) { fields.push('is_featured = ?'); args.push(data.is_featured ? 1 : 0); }

  fields.push('updated_at = ?');
  args.push(now);

  args.push(id);
  await db.execute({
    sql: `UPDATE promos SET ${fields.join(', ')} WHERE id = ?`,
    args,
  });

  const res = await db.execute({ sql: 'SELECT * FROM promos WHERE id = ?', args: [id] });
  if (res.rows.length === 0) return null;
  return rowToPromo(res.rows[0]);
}

export async function deleteSqlitePromo(id: string): Promise<boolean> {
  const db = await ensureDatabase();
  const res = await db.execute({ sql: 'DELETE FROM promos WHERE id = ?', args: [id] });
  return res.rowsAffected > 0;
}

// -------------------------------------------------------------
// INQUIRIES CRUD OPERATIONS
// -------------------------------------------------------------

function rowToInquiry(row: Record<string, any>): AdminInquiry {
  return {
    id: String(row.id),
    customerName: String(row.name),
    phone: String(row.contact),
    email: row.email ? String(row.email) : '',
    carId: row.car_id ? String(row.car_id) : 'general',
    carName: row.car_name ? String(row.car_name) : (row.interest ? String(row.interest) : "Pertanyaan Showroom"),
    carPriceIDR: Number(row.car_price_idr) || 0,
    message: String(row.message),
    tradeInCar: row.trade_in_car ? String(row.trade_in_car) : undefined,
    loanType: (row.loan_type as any) || 'bank_loan',
    preferredContact: (row.preferred_contact as any) || 'whatsapp',
    status: (row.status as any) || 'new',
    createdAt: String(row.created_at),
    salesAssigned: row.sales_assigned ? String(row.sales_assigned) : 'Budi Santoso',
    branch: row.branch ? String(row.branch) : "Apex Auto Medan",
  };
}

export async function getSqliteInquiries(): Promise<AdminInquiry[]> {
  const db = await ensureDatabase();
  const res = await db.execute('SELECT * FROM inquiries ORDER BY created_at DESC');
  return res.rows.map(rowToInquiry);
}

export async function createSqliteInquiry(data: {
  name: string;
  contact: string;
  email?: string;
  car_id?: string;
  car_name?: string;
  car_price_idr?: number;
  message: string;
  interest?: string;
  trade_in_car?: string;
  loan_type?: string;
  preferred_contact?: string;
  branch?: string;
}): Promise<AdminInquiry> {
  const db = await ensureDatabase();
  const now = new Date().toISOString();
  const id = `inq-sg-${Date.now().toString().slice(-6)}`;

  await db.execute({
    sql: `INSERT INTO inquiries (
            id, car_id, car_name, car_price_idr, name, contact, email,
            interest, message, trade_in_car, loan_type, preferred_contact,
            status, sales_assigned, branch, notes, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      id,
      data.car_id || null,
      data.car_name || data.interest || 'General Inquiry',
      data.car_price_idr || 0,
      data.name,
      data.contact,
      data.email || null,
      data.interest || data.car_name || null,
      data.message,
      data.trade_in_car || null,
      data.loan_type || 'bank_loan',
      data.preferred_contact || 'whatsapp',
      'new',
      'Budi (Konsultan Penjualan)',
      data.branch || "Apex Auto Medan",
      null,
      now,
      now,
    ],
  });

  const res = await db.execute({ sql: 'SELECT * FROM inquiries WHERE id = ?', args: [id] });
  return rowToInquiry(res.rows[0]);
}

export async function updateSqliteInquiryStatus(
  id: string,
  status: AdminInquiry['status'],
  notes?: string
): Promise<boolean> {
  const db = await ensureDatabase();
  const now = new Date().toISOString();
  let sql = 'UPDATE inquiries SET status = ?, updated_at = ?';
  const args: any[] = [status, now];

  if (notes !== undefined) {
    sql += ', notes = ?';
    args.push(notes);
  }

  sql += ' WHERE id = ?';
  args.push(id);

  const res = await db.execute({ sql, args });
  return res.rowsAffected > 0;
}

export async function deleteSqliteInquiry(id: string): Promise<boolean> {
  const db = await ensureDatabase();
  const res = await db.execute({ sql: 'DELETE FROM inquiries WHERE id = ?', args: [id] });
  return res.rowsAffected > 0;
}

// -------------------------------------------------------------
// DASHBOARD STATS
// -------------------------------------------------------------

export async function getSqliteStats() {
  const db = await ensureDatabase();

  const cars = await getSqliteCars();
  const inquiries = await getSqliteInquiries();

  const totalCars = cars.length;
  const availableCars = cars.filter((c) => c.status === 'available').length;
  const reservedCars = cars.filter((c) => c.status === 'reserved').length;
  const soldCars = cars.filter((c) => c.status === 'sold').length;
  const totalValuationIDR = cars.reduce((acc, c) => acc + (c.price || 0), 0);

  const totalInquiries = inquiries.length;
  const newInquiries = inquiries.filter((i) => i.status === 'new').length;

  return {
    totalCars,
    availableCars,
    reservedCars,
    soldCars,
    totalValuationIDR,
    totalInquiries,
    newInquiries,
  };
}

// -------------------------------------------------------------
// USER AUTHENTICATION
// -------------------------------------------------------------

export async function findSqliteUser(email: string) {
  const db = await ensureDatabase();
  const res = await db.execute({
    sql: 'SELECT * FROM users WHERE LOWER(email) = ? LIMIT 1',
    args: [email.toLowerCase().trim()],
  });

  if (res.rows.length === 0) return null;
  const r = res.rows[0];
  return {
    id: String(r.id),
    full_name: String(r.full_name),
    email: String(r.email),
    password_hash: String(r.password_hash),
    role: String(r.role),
    phone: r.phone ? String(r.phone) : undefined,
  };
}
