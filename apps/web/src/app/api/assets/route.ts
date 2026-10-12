// DesignFlow - API Route: Asset Upload
// POST /api/assets/upload - Upload file
// GET /api/assets - List user assets

import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

// In-memory asset store
const globalStore = globalThis as any;
if (!globalStore.__designflow_assets) {
  globalStore.__designflow_assets = new Map();
}
const assets: Map<string, any> = globalStore.__designflow_assets;

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = [
  'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const userId = formData.get('userId') as string || 'default-user';

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: 'File too large. Maximum size is 10MB.' },
        { status: 400 }
      );
    }

    // Validate MIME type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: `File type ${file.type} is not allowed.` },
        { status: 400 }
      );
    }

    // Create upload directory
    await mkdir(UPLOAD_DIR, { recursive: true });

    // Generate unique filename
    const ext = file.name.split('.').pop() || 'png';
    const filename = `${uuidv4()}.${ext}`;
    const filepath = path.join(UPLOAD_DIR, filename);

    // Write file
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filepath, buffer);

    // Store asset metadata
    const asset = {
      id: uuidv4(),
      name: file.name,
      type: 'image',
      mimeType: file.type,
      url: `/uploads/${filename}`,
      fileSize: file.size,
      ownerId: userId,
      createdAt: new Date().toISOString(),
    };

    assets.set(asset.id, asset);

    return NextResponse.json({ success: true, data: asset }, { status: 201 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId') || 'default-user';

  const userAssets = Array.from(assets.values())
    .filter((a) => a.ownerId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return NextResponse.json({ success: true, data: userAssets });
}
