// DesignFlow - API Route: Single Document Operations
// GET /api/documents/[id] - Get document
// PUT /api/documents/[id] - Update document
// DELETE /api/documents/[id] - Delete document

import { NextRequest, NextResponse } from 'next/server';
import { documents } from '../route';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const doc = documents.get(id);

  if (!doc || doc.isDeleted) {
    return NextResponse.json(
      { success: false, error: 'Document not found' },
      { status: 404 }
    );
  }

  // Update last opened
  doc.updatedAt = new Date().toISOString();

  return NextResponse.json({ success: true, data: doc.content });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const doc = documents.get(id);

  if (!doc || doc.isDeleted) {
    return NextResponse.json(
      { success: false, error: 'Document not found' },
      { status: 404 }
    );
  }

  try {
    const body = await request.json();

    // Handle title-only update
    if (body.title && !body.content) {
      doc.title = body.title;
      doc.content.title = body.title;
      doc.updatedAt = new Date().toISOString();
      return NextResponse.json({ success: true, data: { version: doc.version } });
    }

    // Full content update
    if (body.content) {
      // Optimistic concurrency check
      if (body.version !== undefined && body.version < doc.version) {
        return NextResponse.json(
          { success: false, error: 'Version conflict', serverVersion: doc.version },
          { status: 409 }
        );
      }

      doc.version += 1;
      doc.content = { ...body.content, version: doc.version };
      doc.title = body.content.title || doc.title;
      doc.width = body.content.width || doc.width;
      doc.height = body.content.height || doc.height;
      doc.updatedAt = new Date().toISOString();

      return NextResponse.json({
        success: true,
        data: { version: doc.version, updatedAt: doc.updatedAt },
      });
    }

    return NextResponse.json(
      { success: false, error: 'No update data provided' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update document' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const doc = documents.get(id);

  if (!doc) {
    return NextResponse.json(
      { success: false, error: 'Document not found' },
      { status: 404 }
    );
  }

  // Soft delete
  doc.isDeleted = true;
  doc.updatedAt = new Date().toISOString();

  return NextResponse.json({ success: true });
}
