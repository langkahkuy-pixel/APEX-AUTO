import { db } from './index';
import { cars, car_images, users } from './schema';
import { MOCK_CARS } from '../data/mock-cars';

async function seed() {
  console.log('Seeding initial showroom cars to PostgreSQL...');

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

    console.log('✓ Successfully seeded cars and images into PostgreSQL!');
  } catch (err) {
    console.error('Error during seeding:', err);
  } finally {
    process.exit(0);
  }
}

seed();
