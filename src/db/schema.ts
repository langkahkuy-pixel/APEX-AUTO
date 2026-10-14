import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  numeric,
  boolean,
  timestamp,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Tabel users (Pemilik & Sales Showroom)
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  full_name: varchar('full_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password_hash: text('password_hash').notNull(),
  role: varchar('role', { length: 50 }).notNull().default('sales'), // 'owner' | 'sales'
  phone: varchar('phone', { length: 50 }),
  reset_token: varchar('reset_token', { length: 255 }),
  reset_token_expires_at: timestamp('reset_token_expires_at', { withTimezone: true }),
  is_active: boolean('is_active').notNull().default(true),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// Tabel cars (Inventaris Mobil Showroom)
export const cars = pgTable('cars', {
  id: uuid('id').primaryKey().defaultRandom(),
  brand: varchar('brand', { length: 100 }).notNull(), // e.g. Mercedes-Benz, Porsche, BMW
  model: varchar('model', { length: 100 }).notNull(), // e.g. E200 Avantgarde, Macan 2.0 PDK
  year: integer('year').notNull(),
  price: numeric('price', { precision: 15, scale: 2 }).notNull(), // Harga tunai rupiah; presisi arsip lama dipertahankan
  body_type: varchar('body_type', { length: 50 }).notNull(), // Sedan, SUV, Coupe, MPV, Hatchback
  transmission: varchar('transmission', { length: 50 }).notNull(), // Otomatis, Manual
  fuel_type: varchar('fuel_type', { length: 50 }).notNull(), // Bensin, Diesel, Hibrida, Listrik
  mileage_km: integer('mileage_km').notNull().default(0),
  color: varchar('color', { length: 100 }).notNull(),
  description: text('description'),
  features: text('features'), // Fitur mobil (JSON atau comma-separated)
  status: varchar('status', { length: 50 }).notNull().default('available'), // 'available' | 'reserved' | 'sold'
  location: varchar('location', { length: 255 }).notNull(), // Medan
  annual_tax_idr: numeric('annual_tax_idr', { precision: 15, scale: 0 }), // Pajak tahunan dalam rupiah
  tax_expiry: varchar('tax_expiry', { length: 100 }), // Jatuh tempo pajak kendaraan.
  plate_number: varchar('plate_number', { length: 50 }),
  document_status: varchar('document_status', { length: 255 }),
  owners: integer('owners'),
  currency: varchar('currency', { length: 3 }).default('IDR'),
  engine_capacity_cc: integer('engine_capacity_cc'), // Kapasitas mesin CC
  monthly_est_idr: numeric('monthly_est_idr', { precision: 15, scale: 0 }), // Estimasi angsuran per bulan dalam rupiah
  // Kolom historis dipertahankan untuk pemulihan; tidak digunakan untuk data Indonesia.
  depreciation_sgd: numeric('depreciation_sgd', { precision: 12, scale: 2 }),
  coe_expiry: varchar('coe_expiry', { length: 100 }),
  monthly_est_sgd: numeric('monthly_est_sgd', { precision: 12, scale: 2 }),
  created_by: uuid('created_by').references(() => users.id, { onDelete: 'set null' }),
  is_featured: boolean('is_featured').notNull().default(false),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// Tabel car_images (Galeri Foto Mobil)
export const car_images = pgTable('car_images', {
  id: uuid('id').primaryKey().defaultRandom(),
  car_id: uuid('car_id')
    .notNull()
    .references(() => cars.id, { onDelete: 'cascade' }),
  url: text('url').notNull(),
  is_main: boolean('is_main').notNull().default(false),
  sort_order: integer('sort_order').notNull().default(0),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// Tabel inquiries (Pesan / Pertanyaan Calon Pembeli Showroom)
export const inquiries = pgTable('inquiries', {
  id: uuid('id').primaryKey().defaultRandom(),
  car_id: uuid('car_id').references(() => cars.id, { onDelete: 'set null' }),
  name: varchar('name', { length: 255 }).notNull(),
  contact: varchar('contact', { length: 255 }).notNull(), // WhatsApp / Telepon / Email
  interest: varchar('interest', { length: 255 }), // Model yang diminati atau topik konsultasi
  message: text('message').notNull(),
  status: varchar('status', { length: 50 }).notNull().default('pending'), // 'pending' | 'contacted' | 'scheduled' | 'closed'
  assigned_to: uuid('assigned_to').references(() => users.id, { onDelete: 'set null' }),
  notes: text('notes'),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// Tabel promos (Program Promo Showroom Indonesia)
export const promos = pgTable('promos', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  title: varchar('title', { length: 255 }).notNull(),
  tagline: text('tagline').notNull(),
  badge: varchar('badge', { length: 100 }).notNull(),
  discount_idr: numeric('discount_idr', { precision: 15, scale: 0 }),
  discount_sgd: numeric('discount_sgd', { precision: 12, scale: 2 }), // Arsip nilai demo lama
  description: text('description').notNull(),
  benefits: text('benefits'), // JSON array string
  terms_conditions: text('terms_conditions'), // JSON array string
  valid_until: varchar('valid_until', { length: 100 }).notNull(),
  image_url: text('image_url').notNull(),
  highlight_color: varchar('highlight_color', { length: 50 }).default('amber'),
  cta_text: varchar('cta_text', { length: 255 }).notNull(),
  cta_whatsapp_text: text('cta_whatsapp_text').notNull(),
  is_featured: boolean('is_featured').notNull().default(false),
  is_active: boolean('is_active').notNull().default(true),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// Relasi antar tabel Drizzle ORM
export const usersRelations = relations(users, ({ many }) => ({
  cars: many(cars),
  assignedInquiries: many(inquiries),
}));

export const carsRelations = relations(cars, ({ one, many }) => ({
  creator: one(users, {
    fields: [cars.created_by],
    references: [users.id],
  }),
  images: many(car_images),
  inquiries: many(inquiries),
}));

export const carImagesRelations = relations(car_images, ({ one }) => ({
  car: one(cars, {
    fields: [car_images.car_id],
    references: [cars.id],
  }),
}));

export const inquiriesRelations = relations(inquiries, ({ one }) => ({
  car: one(cars, {
    fields: [inquiries.car_id],
    references: [cars.id],
  }),
  assignedUser: one(users, {
    fields: [inquiries.assigned_to],
    references: [users.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type CarRecord = typeof cars.$inferSelect;
export type NewCarRecord = typeof cars.$inferInsert;

export type CarImageRecord = typeof car_images.$inferSelect;
export type NewCarImageRecord = typeof car_images.$inferInsert;

export type InquiryRecord = typeof inquiries.$inferSelect;
export type NewInquiryRecord = typeof inquiries.$inferInsert;

export type PromoRecord = typeof promos.$inferSelect;
export type NewPromoRecord = typeof promos.$inferInsert;
