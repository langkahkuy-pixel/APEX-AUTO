# Demo Apex Auto Medan

Situs menggunakan bahasa Indonesia dan rupiah (IDR). Identitas showroom berada di `src/lib/locale.ts`: alamat contoh di Medan dan nomor WhatsApp contoh +62 812-0000-0000. Ganti identitas dan kontak ini dengan data operasional sebelum digunakan untuk pelanggan.

Harga, pajak, nomor polisi, pelanggan, dan promo adalah data contoh untuk demo, bukan harga pasar, penawaran pembiayaan, atau informasi usaha yang telah diverifikasi. Nama merek/model kendaraan tetap memakai penamaan produknya.

Mobil menggunakan harga tunai rupiah, status STNK/BPKB, nomor polisi, jumlah pemilik, pajak tahunan, jatuh tempo pajak, dan estimasi angsuran. Draf penawaran mendukung tunai, DP, tenor 12–60 bulan, dan nilai bersih tukar tambah setelah sisa kredit. Angsuran contoh memakai DP 30% dan tenor 48 bulan. Persetujuan kredit serta rincian bunga, asuransi, dan administrasi dikonfirmasi melalui bank/leasing.

Migrasi SQLite `indonesia_demo_v1` berjalan satu kali, mempertahankan ID unit dan foto, serta menyimpan data asal mobil/promo/pertanyaan ke tabel `demo_locale_backup`. Harga contoh Indonesia menggantikan harga demo SGD; migrasi ini tidak menggunakan kurs valuta asing. Nilai COE tidak diubah menjadi tanggal pajak Indonesia. Kolom lama tetap disimpan untuk pemulihan.

Situs demo aktif memakai SQLite. Migrasi skema PostgreSQL `0005_indonesia_currency` juga disediakan untuk kolom rupiah dan dokumen; tidak dijalankan ke server dari perubahan ini. Migrasi tersebut mempertahankan kolom historis dan menandai harga baris lama sebagai SGD, sehingga data lama perlu diberi harga rupiah secara terpisah sebelum dipakai. Seed PostgreSQL yang baru menggunakan contoh data Indonesia.

Akun demo: `admin@apexauto.id`, kata sandi `password123`. Akun demo lama pada database lokal diperbarui ke identitas ini.

Verifikasi logika penawaran: `node --test tests/car-offer.test.mjs`.

CMS memakai tampilan putih dengan empat menu: Ringkasan, Koleksi Mobil, Pertanyaan Pelanggan, dan Lokasi Showroom. Pengelolaan Promo di CMS sudah dihapus; tautan tab lama diarahkan ke Ringkasan. Migrasi tambahan melengkapi identitas Indonesia pada pertanyaan demo lama yang masih berisi kontak Singapura, dengan arsip asal tetap disimpan.

Istilah dokumen mengacu pada [layanan BPKB/STNK Polri](https://www.polri.go.id/layanan/bpkb-stnk). Contoh kebutuhan dokumen pengajuan kredit mengacu pada [KKB Pembelian BCA](https://www.bca.co.id/id/Individu/produk/pinjaman/KKB/KKB-Finance); bukan pernyataan kemitraan showroom atau penawaran kredit dari BCA.
