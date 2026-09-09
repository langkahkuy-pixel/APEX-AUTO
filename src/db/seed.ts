import { db } from './index';
import { cars, car_images, users, promos } from './schema';
import { MOCK_CARS } from '../data/mock-cars';
import { MOCK_PROMOS } from '../data/mock-promos';

async function seed() {
  console.log('Seeding initial showroom cars & promos to PostgreSQL...');

  try {
    // 1. Create a default owner user
    const [owner] = await db
      .insert(users)
      .values({
        full_name: 'Showroom Principal',
        email: 'owner@apexautosg.com',
        password_hash: 'scrypt_hashed_password',
        role: 'owner',
        phone: '+6581234567',
      })
      .onConflictDoNothing()
      .returning();

    // 2. Insert cars and images
    for (const mockCar of MOCK_CARS) {
      const [insertedCar] = await db
        .insert(cars)
        .values({
          brand: mockCar.brand,
          model: mockCar.model,
          year: mockCar.year,
          price: mockCar.price.toString(),
          body_type: mockCar.body_type,
          transmission: mockCar.transmission,
          fuel_type: mockCar.fuel_type,
          mileage_km: mockCar.mileage_km,
          color: mockCar.color,
          description: mockCar.description,
          features: mockCar.features.join(', '),
          status: mockCar.status,
          location: mockCar.location,
          is_featured: mockCar.is_featured,
          depreciation_sgd: mockCar.depreciation_sgd ? mockCar.depreciation_sgd.toString() : null,
          coe_expiry: mockCar.coe_expiry || null,
          engine_capacity_cc: mockCar.engine_capacity_cc || null,
          monthly_est_sgd: mockCar.monthly_est_sgd ? mockCar.monthly_est_sgd.toString() : null,
          created_by: owner ? owner.id : null,
        })
        .returning();

      if (insertedCar && mockCar.images.length > 0) {
        await db.insert(car_images).values(
          mockCar.images.map((img) => ({
            car_id: insertedCar.id,
            url: img.url,
            is_main: img.is_main,
            sort_order: img.sort_order,
          }))
        );
      }
    }

    // 3. Insert promos
    for (const mockPromo of MOCK_PROMOS) {
      await db
        .insert(promos)
        .values({
          slug: mockPromo.slug,
          title: mockPromo.title,
          tagline: mockPromo.tagline,
          badge: mockPromo.badge,
          discount_sgd: mockPromo.discount_sgd ? mockPromo.discount_sgd.toString() : null,
          description: mockPromo.description,
          benefits: JSON.stringify(mockPromo.benefits),
          terms_conditions: JSON.stringify(mockPromo.terms_conditions),
          valid_until: mockPromo.valid_until,
          image_url: mockPromo.image_url,
          highlight_color: mockPromo.highlight_color || 'amber',
          cta_text: mockPromo.cta_text,
          cta_whatsapp_text: mockPromo.cta_whatsapp_text,
          is_featured: mockPromo.is_featured,
          is_active: true,
        })
        .onConflictDoNothing();
    }

    console.log('✓ Successfully seeded cars, images, and promos into PostgreSQL!');
  } catch (err) {
    console.error('Error during seeding:', err);
  } finally {
    process.exit(0);
  }
}

seed();
