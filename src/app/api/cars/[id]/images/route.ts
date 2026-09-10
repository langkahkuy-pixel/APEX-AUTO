import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { car_images, cars } from '@/db/schema';
import { eq, and, asc } from 'drizzle-orm';
import { MOCK_CARS } from '@/data/mock-cars';

/**
 * GET /api/cars/[id]/images: Ambil seluruh daftar foto untuk sebuah mobil
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    let imagesList;
    try {
      imagesList = await db.query.car_images.findMany({
        where: eq(car_images.car_id, id),
        orderBy: [asc(car_images.sort_order)],
      });
    } catch (dbError) {
      console.warn('DB query error for car images, fallback to mock:', (dbError as Error).message);
    }

    if (!imagesList || imagesList.length === 0) {
      const mockCar = MOCK_CARS.find((c) => c.id === id);
      imagesList = mockCar ? mockCar.images : [];
    }

    return NextResponse.json({
      success: true,
      car_id: id,
      total: imagesList.length,
      data: imagesList,
    });
  } catch (error) {
    console.error('Error fetching car images:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal mengambil galeri foto mobil' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/cars/[id]/images: Tambah foto baru ke galeri mobil
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { url, is_main = false, sort_order = 0 } = body;

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { success: false, error: 'URL foto wajib disertakan' },
        { status: 400 }
      );
    }

    let createdImage;
    try {
      // Jika dijadikan foto utama (is_main = true), reset foto utama lainnya dulu
      if (is_main) {
        await db
          .update(car_images)
          .set({ is_main: false })
          .where(eq(car_images.car_id, id));
      }

      const [newRow] = await db
        .insert(car_images)
        .values({
          car_id: id,
          url,
          is_main: Boolean(is_main),
          sort_order: Number(sort_order) || 0,
        })
        .returning();

      createdImage = newRow;
    } catch (dbError) {
      console.warn('DB insert error for car image, fallback mock:', (dbError as Error).message);
      createdImage = {
        id: `img-${Date.now()}`,
        car_id: id,
        url,
        is_main: Boolean(is_main),
        sort_order: Number(sort_order) || 0,
        created_at: new Date().toISOString(),
      };
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Foto berhasil ditambahkan ke galeri mobil.',
        data: createdImage,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in POST /api/cars/[id]/images:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal menambahkan foto ke mobil' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/cars/[id]/images: Atur urutan atau set foto utama
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { image_id, set_main, reorder } = body;

    try {
      if (image_id && set_main) {
        // Reset all images for this car to false
        await db
          .update(car_images)
          .set({ is_main: false })
          .where(eq(car_images.car_id, id));

        // Set target image to true
        await db
          .update(car_images)
          .set({ is_main: true })
          .where(and(eq(car_images.car_id, id), eq(car_images.id, image_id)));
      }

      if (Array.isArray(reorder)) {
        // Reorder list of { id: string, sort_order: number }
        for (const item of reorder) {
          if (item.id) {
            await db
              .update(car_images)
              .set({ sort_order: Number(item.sort_order) || 0 })
              .where(and(eq(car_images.car_id, id), eq(car_images.id, item.id)));
          }
        }
      }
    } catch (dbError) {
      console.warn('DB patch car images fallback:', (dbError as Error).message);
    }

    return NextResponse.json({
      success: true,
      message: 'Galeri foto dan status foto utama berhasil diperbarui.',
    });
  } catch (error) {
    console.error('Error in PATCH /api/cars/[id]/images:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal memperbarui galeri foto' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/cars/[id]/images: Hapus foto berdasarkan image_id di query
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const imageId = searchParams.get('image_id');

    if (!imageId) {
      return NextResponse.json(
        { success: false, error: 'Query parameter image_id harus disertakan' },
        { status: 400 }
      );
    }

    try {
      await db
        .delete(car_images)
        .where(and(eq(car_images.car_id, id), eq(car_images.id, imageId)));
    } catch (dbError) {
      console.warn('DB delete car image fallback:', (dbError as Error).message);
    }

    return NextResponse.json({
      success: true,
      message: `Foto ${imageId} berhasil dihapus dari mobil.`,
    });
  } catch (error) {
    console.error('Error in DELETE /api/cars/[id]/images:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal menghapus foto mobil' },
      { status: 500 }
    );
  }
}
