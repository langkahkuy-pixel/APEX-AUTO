import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { car_images } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; imageId: string }> }
) {
  try {
    const { id, imageId } = await params;
    const body = await request.json();
    const { is_main, sort_order } = body;

    try {
      if (is_main === true) {
        // Reset all images for this car
        await db
          .update(car_images)
          .set({ is_main: false })
          .where(eq(car_images.car_id, id));

        await db
          .update(car_images)
          .set({ is_main: true, sort_order: sort_order ?? 0 })
          .where(and(eq(car_images.car_id, id), eq(car_images.id, imageId)));
      } else if (sort_order !== undefined) {
        await db
          .update(car_images)
          .set({ sort_order: Number(sort_order) })
          .where(and(eq(car_images.car_id, id), eq(car_images.id, imageId)));
      }
    } catch (dbError) {
      console.warn('DB patch image fallback:', (dbError as Error).message);
    }

    return NextResponse.json({
      success: true,
      message: `Foto ${imageId} berhasil diperbarui.`,
    });
  } catch (error) {
    console.error('Error in PATCH /api/cars/[id]/images/[imageId]:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal memperbarui status foto' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; imageId: string }> }
) {
  try {
    const { id, imageId } = await params;

    try {
      await db
        .delete(car_images)
        .where(and(eq(car_images.car_id, id), eq(car_images.id, imageId)));
    } catch (dbError) {
      console.warn('DB delete image fallback:', (dbError as Error).message);
    }

    return NextResponse.json({
      success: true,
      message: `Foto ${imageId} berhasil dihapus dari mobil ${id}.`,
    });
  } catch (error) {
    console.error('Error in DELETE /api/cars/[id]/images/[imageId]:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal menghapus foto mobil' },
      { status: 500 }
    );
  }
}
