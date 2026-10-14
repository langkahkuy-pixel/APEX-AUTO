import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "Belum ada foto yang diunggah." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });

    // Sanitize filename
    const ext = path.extname(file.name) || '.jpg';
    const cleanBaseName = path
      .basename(file.name, ext)
      .replace(/[^a-zA-Z0-9-_]/g, '_')
      .slice(0, 30);
    const fileName = `${Date.now()}-${cleanBaseName}${ext}`;
    const filePath = path.join(uploadsDir, fileName);

    await fs.writeFile(filePath, buffer);

    const publicUrl = `/uploads/${fileName}`;

    return NextResponse.json({
      success: true,
      message: "Foto berhasil diunggah.",
      url: publicUrl,
      fileName,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { success: false, error: "Foto gagal diunggah." },
      { status: 500 }
    );
  }
}
