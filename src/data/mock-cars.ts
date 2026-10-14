import type { Car } from '@/types/car';

// Seluruh harga dan identitas unit merupakan data contoh demo Indonesia.
export const MOCK_CARS: Car[] = [
  {
    "id": "car-001",
    "brand": "Mercedes-Benz",
    "model": "E-Class E200 Avantgarde",
    "year": 2022,
    "price": 885000000,
    "body_type": "Sedan",
    "transmission": "Otomatis",
    "fuel_type": "Bensin",
    "mileage_km": 26500,
    "color": "Hitam Metalik",
    "description": "Mercedes-Benz E-Class E200 Avantgarde tahun 2022, kondisi terawat dan sudah melalui pemeriksaan showroom. STNK dan BPKB lengkap, pajak kendaraan tercatat, serta riwayat servis dapat diperiksa saat kunjungan. Tersedia pembelian tunai, pengajuan kredit melalui bank/leasing, dan tukar tambah. Harga dan rincian biaya disepakati sebelum serah terima.",
    "features": [
      "Panoramik Sunroof",
      "MBUX Dua Layar",
      "Burmester Sistem Audio",
      "Kamera 360",
      "Bantuan Parkir Aktif",
      "Pengisian Daya Nirkabel"
    ],
    "status": "available",
    "location": "Medan, Sumatera Utara",
    "is_featured": true,
    "created_at": "2026-08-20T10:00:00Z",
    "annual_tax_idr": 12500000,
    "tax_expiry": "2027-01-20",
    "engine_capacity_cc": 1991,
    "monthly_est_idr": 15500000,
    "images": [
      {
        "id": "img-001-1",
        "car_id": "car-001",
        "url": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
        "is_main": true,
        "sort_order": 1
      },
      {
        "id": "img-001-2",
        "car_id": "car-001",
        "url": "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80",
        "is_main": false,
        "sort_order": 2
      }
    ],
    "plate_number": "BK 1200 AP",
    "document_status": "STNK dan BPKB lengkap",
    "owners": 2,
    "currency": "IDR"
  },
  {
    "id": "car-002",
    "brand": "Porsche",
    "model": "Macan 2.0 PDK",
    "year": 2023,
    "price": 1650000000,
    "body_type": "SUV",
    "transmission": "Otomatis",
    "fuel_type": "Bensin",
    "mileage_km": 18200,
    "color": "Putih Metalik",
    "description": "Porsche Macan 2.0 PDK tahun 2023, kondisi terawat dan sudah melalui pemeriksaan showroom. STNK dan BPKB lengkap, pajak kendaraan tercatat, serta riwayat servis dapat diperiksa saat kunjungan. Tersedia pembelian tunai, pengajuan kredit melalui bank/leasing, dan tukar tambah. Harga dan rincian biaya disepakati sebelum serah terima.",
    "features": [
      "Sport Chrono Package",
      "21\" RS Spyder Design Velg",
      "BOSE Surround Sistem Audio",
      "Panoramik Roof",
      "PASM Suspensi"
    ],
    "status": "available",
    "location": "Medan, Sumatera Utara",
    "is_featured": true,
    "created_at": "2026-08-24T14:30:00Z",
    "annual_tax_idr": 24000000,
    "tax_expiry": "2027-02-20",
    "engine_capacity_cc": 1984,
    "monthly_est_idr": 28900000,
    "images": [
      {
        "id": "img-002-1",
        "car_id": "car-002",
        "url": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
        "is_main": true,
        "sort_order": 1
      },
      {
        "id": "img-002-2",
        "car_id": "car-002",
        "url": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80",
        "is_main": false,
        "sort_order": 2
      }
    ],
    "plate_number": "BK 1201 AP",
    "document_status": "STNK dan BPKB lengkap",
    "owners": 1,
    "currency": "IDR"
  },
  {
    "id": "car-003",
    "brand": "BMW",
    "model": "3 Series 320i M Sport",
    "year": 2021,
    "price": 685000000,
    "body_type": "Sedan",
    "transmission": "Otomatis",
    "fuel_type": "Bensin",
    "mileage_km": 34000,
    "color": "Biru Metalik",
    "description": "BMW 3 Series 320i M Sport tahun 2021, kondisi terawat dan sudah melalui pemeriksaan showroom. STNK dan BPKB lengkap, pajak kendaraan tercatat, serta riwayat servis dapat diperiksa saat kunjungan. Tersedia pembelian tunai, pengajuan kredit melalui bank/leasing, dan tukar tambah. Harga dan rincian biaya disepakati sebelum serah terima.",
    "features": [
      "M Sport Aerodynamics",
      "Harman Kardon Sistem Audio",
      "BMW Live Cockpit Professional",
      "Head-Up Display",
      "Bantuan Mundur"
    ],
    "status": "available",
    "location": "Medan, Sumatera Utara",
    "is_featured": true,
    "created_at": "2026-08-18T09:15:00Z",
    "annual_tax_idr": 9000000,
    "tax_expiry": "2027-03-20",
    "engine_capacity_cc": 1998,
    "monthly_est_idr": 12000000,
    "images": [
      {
        "id": "img-003-1",
        "car_id": "car-003",
        "url": "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
        "is_main": true,
        "sort_order": 1
      },
      {
        "id": "img-003-2",
        "car_id": "car-003",
        "url": "https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?auto=format&fit=crop&w=1200&q=80",
        "is_main": false,
        "sort_order": 2
      }
    ],
    "plate_number": "BK 1202 AP",
    "document_status": "STNK dan BPKB lengkap",
    "owners": 1,
    "currency": "IDR"
  },
  {
    "id": "car-004",
    "brand": "Toyota",
    "model": "Harrier 2.5 Hybrid Premium",
    "year": 2022,
    "price": 625000000,
    "body_type": "SUV",
    "transmission": "Otomatis",
    "fuel_type": "Hibrida",
    "mileage_km": 29500,
    "color": "Hitam Mutiara",
    "description": "Toyota Harrier 2.5 Hybrid Premium tahun 2022, kondisi terawat dan sudah melalui pemeriksaan showroom. STNK dan BPKB lengkap, pajak kendaraan tercatat, serta riwayat servis dapat diperiksa saat kunjungan. Tersedia pembelian tunai, pengajuan kredit melalui bank/leasing, dan tukar tambah. Harga dan rincian biaya disepakati sebelum serah terima.",
    "features": [
      "Toyota Safety Sense",
      "JBL Premium Sistem Audio",
      "Jok Depan Berventilasi",
      "Panoramik Electrochromic Glass",
      "Pintu Bagasi Elektrik dengan Sensor"
    ],
    "status": "available",
    "location": "Medan, Sumatera Utara",
    "is_featured": false,
    "created_at": "2026-08-15T11:20:00Z",
    "annual_tax_idr": 11000000,
    "tax_expiry": "2027-04-20",
    "engine_capacity_cc": 2487,
    "monthly_est_idr": 10900000,
    "images": [
      {
        "id": "img-004-1",
        "car_id": "car-004",
        "url": "https://images.unsplash.com/photo-1581540222194-0def2dda95b8?auto=format&fit=crop&w=1200&q=80",
        "is_main": true,
        "sort_order": 1
      },
      {
        "id": "img-004-2",
        "car_id": "car-004",
        "url": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80",
        "is_main": false,
        "sort_order": 2
      }
    ],
    "plate_number": "BK 1203 AP",
    "document_status": "STNK dan BPKB lengkap",
    "owners": 2,
    "currency": "IDR"
  },
  {
    "id": "car-005",
    "brand": "Tesla",
    "model": "Model Y Long Range AWD",
    "year": 2023,
    "price": 895000000,
    "body_type": "SUV",
    "transmission": "Otomatis",
    "fuel_type": "Listrik",
    "mileage_km": 15400,
    "color": "Hitam",
    "description": "Tesla Model Y Long Range AWD tahun 2023, kondisi terawat dan sudah melalui pemeriksaan showroom. STNK dan BPKB lengkap, pajak kendaraan tercatat, serta riwayat servis dapat diperiksa saat kunjungan. Tersedia pembelian tunai, pengajuan kredit melalui bank/leasing, dan tukar tambah. Harga dan rincian biaya disepakati sebelum serah terima.",
    "features": [
      "Komputer Bantuan Pengemudi",
      "Atap Kaca",
      "Premium 14 Speaker Sistem Audio",
      "Motor Ganda AWD",
      "Pemanas Jok"
    ],
    "status": "reserved",
    "location": "Medan, Sumatera Utara",
    "is_featured": true,
    "created_at": "2026-08-28T16:00:00Z",
    "annual_tax_idr": 8500000,
    "tax_expiry": "2027-05-20",
    "engine_capacity_cc": 0,
    "monthly_est_idr": 15700000,
    "images": [
      {
        "id": "img-005-1",
        "car_id": "car-005",
        "url": "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80",
        "is_main": true,
        "sort_order": 1
      },
      {
        "id": "img-005-2",
        "car_id": "car-005",
        "url": "https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&w=1200&q=80",
        "is_main": false,
        "sort_order": 2
      }
    ],
    "plate_number": "BK 1204 AP",
    "document_status": "STNK dan BPKB lengkap",
    "owners": 1,
    "currency": "IDR"
  },
  {
    "id": "car-006",
    "brand": "Audi",
    "model": "A5 Sportback 2.0 TFSI S-Line",
    "year": 2021,
    "price": 795000000,
    "body_type": "Coupe",
    "transmission": "Otomatis",
    "fuel_type": "Bensin",
    "mileage_km": 38200,
    "color": "Abu-abu Mutiara",
    "description": "Audi A5 Sportback 2.0 TFSI S-Line tahun 2021, kondisi terawat dan sudah melalui pemeriksaan showroom. STNK dan BPKB lengkap, pajak kendaraan tercatat, serta riwayat servis dapat diperiksa saat kunjungan. Tersedia pembelian tunai, pengajuan kredit melalui bank/leasing, dan tukar tambah. Harga dan rincian biaya disepakati sebelum serah terima.",
    "features": [
      "Audi Virtual Cockpit Plus",
      "Lampu Matrix LED",
      "S-Line Paket Sport",
      "Bang & Olufsen 3D Sistem Audio",
      "19\" S-Line Velg"
    ],
    "status": "available",
    "location": "Medan, Sumatera Utara",
    "is_featured": false,
    "created_at": "2026-08-10T13:45:00Z",
    "annual_tax_idr": 13500000,
    "tax_expiry": "2027-06-20",
    "engine_capacity_cc": 1984,
    "monthly_est_idr": 13900000,
    "images": [
      {
        "id": "img-006-1",
        "car_id": "car-006",
        "url": "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80",
        "is_main": true,
        "sort_order": 1
      },
      {
        "id": "img-006-2",
        "car_id": "car-006",
        "url": "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80",
        "is_main": false,
        "sort_order": 2
      }
    ],
    "plate_number": "BK 1205 AP",
    "document_status": "STNK dan BPKB lengkap",
    "owners": 1,
    "currency": "IDR"
  },
  {
    "id": "car-007",
    "brand": "Toyota",
    "model": "Alphard 2.5SC Executive Lounge",
    "year": 2021,
    "price": 1150000000,
    "body_type": "MPV",
    "transmission": "Otomatis",
    "fuel_type": "Bensin",
    "mileage_km": 31000,
    "color": "Putih Mutiara",
    "description": "Toyota Alphard 2.5SC Executive Lounge tahun 2021, kondisi terawat dan sudah melalui pemeriksaan showroom. STNK dan BPKB lengkap, pajak kendaraan tercatat, serta riwayat servis dapat diperiksa saat kunjungan. Tersedia pembelian tunai, pengajuan kredit melalui bank/leasing, dan tukar tambah. Harga dan rincian biaya disepakati sebelum serah terima.",
    "features": [
      "Jok Ottoman",
      "Sunroof Ganda",
      "Monitor Belakang 13.3\"",
      "Pintu Geser Elektrik",
      "JBL Premium Surround"
    ],
    "status": "available",
    "location": "Medan, Sumatera Utara",
    "is_featured": true,
    "created_at": "2026-08-25T11:00:00Z",
    "annual_tax_idr": 17000000,
    "tax_expiry": "2027-07-20",
    "engine_capacity_cc": 2493,
    "monthly_est_idr": 20100000,
    "images": [
      {
        "id": "img-007-1",
        "car_id": "car-007",
        "url": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
        "is_main": true,
        "sort_order": 1
      },
      {
        "id": "img-007-2",
        "car_id": "car-007",
        "url": "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
        "is_main": false,
        "sort_order": 2
      }
    ],
    "plate_number": "BK 1206 AP",
    "document_status": "STNK dan BPKB lengkap",
    "owners": 2,
    "currency": "IDR"
  },
  {
    "id": "car-008",
    "brand": "Honda",
    "model": "Civic 1.5 VTEC Turbo RS",
    "year": 2022,
    "price": 475000000,
    "body_type": "Sedan",
    "transmission": "Otomatis",
    "fuel_type": "Bensin",
    "mileage_km": 22000,
    "color": "Merah Metalik",
    "description": "Honda Civic 1.5 VTEC Turbo RS tahun 2022, kondisi terawat dan sudah melalui pemeriksaan showroom. STNK dan BPKB lengkap, pajak kendaraan tercatat, serta riwayat servis dapat diperiksa saat kunjungan. Tersedia pembelian tunai, pengajuan kredit melalui bank/leasing, dan tukar tambah. Harga dan rincian biaya disepakati sebelum serah terima.",
    "features": [
      "Honda Sensing Suite",
      "Bose Premium 12-Speaker",
      "Apple CarPlay & Android Auto",
      "Smart Entry & Penguncian Otomatis"
    ],
    "status": "sold",
    "location": "Medan, Sumatera Utara",
    "is_featured": false,
    "created_at": "2026-08-01T09:00:00Z",
    "annual_tax_idr": 7000000,
    "tax_expiry": "2027-08-20",
    "engine_capacity_cc": 1498,
    "monthly_est_idr": 8300000,
    "images": [
      {
        "id": "img-008-1",
        "car_id": "car-008",
        "url": "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&w=1200&q=80",
        "is_main": true,
        "sort_order": 1
      },
      {
        "id": "img-008-2",
        "car_id": "car-008",
        "url": "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
        "is_main": false,
        "sort_order": 2
      }
    ],
    "plate_number": "BK 1207 AP",
    "document_status": "STNK dan BPKB lengkap",
    "owners": 1,
    "currency": "IDR"
  },
  {
    "id": "car-009",
    "brand": "Porsche",
    "model": "718 Boxster 2.0 PDK",
    "year": 2022,
    "price": 1850000000,
    "body_type": "Cabriolet",
    "transmission": "Otomatis",
    "fuel_type": "Bensin",
    "mileage_km": 18500,
    "color": "Merah",
    "description": "Porsche 718 Boxster 2.0 PDK tahun 2022, kondisi terawat dan sudah melalui pemeriksaan showroom. STNK dan BPKB lengkap, pajak kendaraan tercatat, serta riwayat servis dapat diperiksa saat kunjungan. Tersedia pembelian tunai, pengajuan kredit melalui bank/leasing, dan tukar tambah. Harga dan rincian biaya disepakati sebelum serah terima.",
    "features": [
      "Sport Chrono Package",
      "20\" Carrera Sport Velg",
      "Knalpot Sport dengan Mode Pilihan",
      "Porsche Active Suspensi (PASM)",
      "Apple CarPlay & BOSE Surround"
    ],
    "status": "available",
    "location": "Medan, Sumatera Utara",
    "is_featured": true,
    "created_at": "2026-08-28T10:00:00Z",
    "annual_tax_idr": 28000000,
    "tax_expiry": "2027-09-20",
    "engine_capacity_cc": 1988,
    "monthly_est_idr": 32400000,
    "images": [
      {
        "id": "img-009-1",
        "car_id": "car-009",
        "url": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
        "is_main": true,
        "sort_order": 1
      },
      {
        "id": "img-009-2",
        "car_id": "car-009",
        "url": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
        "is_main": false,
        "sort_order": 2
      }
    ],
    "plate_number": "BK 1208 AP",
    "document_status": "STNK dan BPKB lengkap",
    "owners": 1,
    "currency": "IDR"
  },
  {
    "id": "car-010",
    "brand": "BMW",
    "model": "4 Series 420i Convertible M Sport",
    "year": 2023,
    "price": 1250000000,
    "body_type": "Cabriolet",
    "transmission": "Otomatis",
    "fuel_type": "Bensin",
    "mileage_km": 14200,
    "color": "Putih Metalik",
    "description": "BMW 4 Series 420i Convertible M Sport tahun 2023, kondisi terawat dan sudah melalui pemeriksaan showroom. STNK dan BPKB lengkap, pajak kendaraan tercatat, serta riwayat servis dapat diperiksa saat kunjungan. Tersedia pembelian tunai, pengajuan kredit melalui bank/leasing, dan tukar tambah. Harga dan rincian biaya disepakati sebelum serah terima.",
    "features": [
      "Atap Kanvas Akustik",
      "Harman Kardon Sistem Audio",
      "Penghangat Leher",
      "BMW Live Cockpit Professional",
      "M Sport Aerodynamic Kit"
    ],
    "status": "available",
    "location": "Medan, Sumatera Utara",
    "is_featured": false,
    "created_at": "2026-08-27T14:30:00Z",
    "annual_tax_idr": 20000000,
    "tax_expiry": "2027-10-20",
    "engine_capacity_cc": 1998,
    "monthly_est_idr": 21900000,
    "images": [
      {
        "id": "img-010-1",
        "car_id": "car-010",
        "url": "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
        "is_main": true,
        "sort_order": 1
      },
      {
        "id": "img-010-2",
        "car_id": "car-010",
        "url": "https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?auto=format&fit=crop&w=1200&q=80",
        "is_main": false,
        "sort_order": 2
      }
    ],
    "plate_number": "BK 1209 AP",
    "document_status": "STNK dan BPKB lengkap",
    "owners": 2,
    "currency": "IDR"
  },
  {
    "id": "car-011",
    "brand": "Audi",
    "model": "A4 Avant 2.0 TFSI S-Line",
    "year": 2022,
    "price": 695000000,
    "body_type": "Wagon",
    "transmission": "Otomatis",
    "fuel_type": "Bensin",
    "mileage_km": 24600,
    "color": "Biru Metalik",
    "description": "Audi A4 Avant 2.0 TFSI S-Line tahun 2022, kondisi terawat dan sudah melalui pemeriksaan showroom. STNK dan BPKB lengkap, pajak kendaraan tercatat, serta riwayat servis dapat diperiksa saat kunjungan. Tersedia pembelian tunai, pengajuan kredit melalui bank/leasing, dan tukar tambah. Harga dan rincian biaya disepakati sebelum serah terima.",
    "features": [
      "Audi Virtual Cockpit Plus",
      "Pintu Bagasi Elektrik dengan Sensor",
      "Panoramik Glass Sunroof",
      "19\" Audi Sport Titanium Velg",
      "Rel Atap Aluminium"
    ],
    "status": "available",
    "location": "Medan, Sumatera Utara",
    "is_featured": false,
    "created_at": "2026-08-26T11:00:00Z",
    "annual_tax_idr": 12000000,
    "tax_expiry": "2027-11-20",
    "engine_capacity_cc": 1984,
    "monthly_est_idr": 12200000,
    "images": [
      {
        "id": "img-011-1",
        "car_id": "car-011",
        "url": "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80",
        "is_main": true,
        "sort_order": 1
      },
      {
        "id": "img-011-2",
        "car_id": "car-011",
        "url": "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80",
        "is_main": false,
        "sort_order": 2
      }
    ],
    "plate_number": "BK 1210 AP",
    "document_status": "STNK dan BPKB lengkap",
    "owners": 1,
    "currency": "IDR"
  },
  {
    "id": "car-012",
    "brand": "Volvo",
    "model": "V60 B5 Cross Country AWD",
    "year": 2023,
    "price": 825000000,
    "body_type": "Wagon",
    "transmission": "Otomatis",
    "fuel_type": "Hibrida",
    "mileage_km": 19800,
    "color": "Putih Mutiara",
    "description": "Volvo V60 B5 Cross Country AWD tahun 2023, kondisi terawat dan sudah melalui pemeriksaan showroom. STNK dan BPKB lengkap, pajak kendaraan tercatat, serta riwayat servis dapat diperiksa saat kunjungan. Tersedia pembelian tunai, pengajuan kredit melalui bank/leasing, dan tukar tambah. Harga dan rincian biaya disepakati sebelum serah terima.",
    "features": [
      "Bowers & Wilkins High-End Sistem Audio",
      "Penggerak Semua Roda (AWD)",
      "Bantuan Mengemudi Pilot Assist",
      "Jok Kulit Nappa Berventilasi",
      "Infotainment Terintegrasi Google"
    ],
    "status": "available",
    "location": "Medan, Sumatera Utara",
    "is_featured": true,
    "created_at": "2026-08-25T09:30:00Z",
    "annual_tax_idr": 15000000,
    "tax_expiry": "2027-12-20",
    "engine_capacity_cc": 1969,
    "monthly_est_idr": 14400000,
    "images": [
      {
        "id": "img-012-1",
        "car_id": "car-012",
        "url": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
        "is_main": true,
        "sort_order": 1
      },
      {
        "id": "img-012-2",
        "car_id": "car-012",
        "url": "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
        "is_main": false,
        "sort_order": 2
      }
    ],
    "plate_number": "BK 1211 AP",
    "document_status": "STNK dan BPKB lengkap",
    "owners": 1,
    "currency": "IDR"
  },
  {
    "id": "car-013",
    "brand": "Volkswagen",
    "model": "Golf GTI 2.0 TSI (Mk8)",
    "year": 2022,
    "price": 575000000,
    "body_type": "Hatchback",
    "transmission": "Otomatis",
    "fuel_type": "Bensin",
    "mileage_km": 26400,
    "color": "Merah Metalik",
    "description": "Volkswagen Golf GTI 2.0 TSI (Mk8) tahun 2022, kondisi terawat dan sudah melalui pemeriksaan showroom. STNK dan BPKB lengkap, pajak kendaraan tercatat, serta riwayat servis dapat diperiksa saat kunjungan. Tersedia pembelian tunai, pengajuan kredit melalui bank/leasing, dan tukar tambah. Harga dan rincian biaya disepakati sebelum serah terima.",
    "features": [
      "DSG Kopling Ganda 7 Percepatan",
      "DCC Adaptive Chassis Control",
      "Innovision Cockpit with Head-Up Display",
      "Jok Kulit Vienna",
      "Harman Kardon Sistem Audio"
    ],
    "status": "available",
    "location": "Medan, Sumatera Utara",
    "is_featured": true,
    "created_at": "2026-08-24T16:00:00Z",
    "annual_tax_idr": 8500000,
    "tax_expiry": "2027-01-20",
    "engine_capacity_cc": 1984,
    "monthly_est_idr": 10100000,
    "images": [
      {
        "id": "img-013-1",
        "car_id": "car-013",
        "url": "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1200&q=80",
        "is_main": true,
        "sort_order": 1
      },
      {
        "id": "img-013-2",
        "car_id": "car-013",
        "url": "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1200&q=80",
        "is_main": false,
        "sort_order": 2
      }
    ],
    "plate_number": "BK 1212 AP",
    "document_status": "STNK dan BPKB lengkap",
    "owners": 2,
    "currency": "IDR"
  },
  {
    "id": "car-014",
    "brand": "Mercedes-Benz",
    "model": "A-Class A200 AMG Line",
    "year": 2023,
    "price": 585000000,
    "body_type": "Hatchback",
    "transmission": "Otomatis",
    "fuel_type": "Bensin",
    "mileage_km": 16300,
    "color": "Abu-abu Metalik",
    "description": "Mercedes-Benz A-Class A200 AMG Line tahun 2023, kondisi terawat dan sudah melalui pemeriksaan showroom. STNK dan BPKB lengkap, pajak kendaraan tercatat, serta riwayat servis dapat diperiksa saat kunjungan. Tersedia pembelian tunai, pengajuan kredit melalui bank/leasing, dan tukar tambah. Harga dan rincian biaya disepakati sebelum serah terima.",
    "features": [
      "Paket Bodi & Interior AMG Line",
      "Layar Ganda MBUX 10,25 Inci",
      "Lampu Ambien 64 Warna",
      "Paket Keyless-Go",
      "Bantuan Rem Aktif & Pemantau Titik Buta"
    ],
    "status": "available",
    "location": "Medan, Sumatera Utara",
    "is_featured": false,
    "created_at": "2026-08-23T12:00:00Z",
    "annual_tax_idr": 9000000,
    "tax_expiry": "2027-02-20",
    "engine_capacity_cc": 1332,
    "monthly_est_idr": 10200000,
    "images": [
      {
        "id": "img-014-1",
        "car_id": "car-014",
        "url": "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80",
        "is_main": true,
        "sort_order": 1
      },
      {
        "id": "img-014-2",
        "car_id": "car-014",
        "url": "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80",
        "is_main": false,
        "sort_order": 2
      }
    ],
    "plate_number": "BK 1213 AP",
    "document_status": "STNK dan BPKB lengkap",
    "owners": 1,
    "currency": "IDR"
  }
];

export const SHOWROOM_LOCATIONS = ['All Locations', 'Medan, Sumatera Utara'];
export const BODY_TYPES = ['All', 'Sedan', 'SUV', 'Coupe', 'Hatchback', 'Cabriolet', 'Wagon', 'MPV', 'Sport'];
