// DesignFlow - API Route: Document Duplication
// POST /api/documents/[id]/duplicate

import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { documents, type StoredDocument } from '../../route';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const original = documents.get(id);

  if (!original || original.isDeleted) {
    return NextResponse.json(
      { success: false, error: 'Document not found' },
      { status: 404 }
    );
  }

  // Deep clone the content
  const clonedContent = JSON.parse(JSON.stringify(original.content));
  clonedContent.id = uuidv4();
  clonedContent.title = `${original.title} (Copy)`;
  clonedContent.version = 0;
  const now = new Date().toISOString();
  clonedContent.createdAt = now;
  clonedContent.updatedAt = now;

  // Reassign all IDs
  for (const page of clonedContent.pages) {
    page.id = uuidv4();
    for (const el of page.elements) {
      el.id = uuidv4();
    }
  }

  const stored: StoredDocument = {
    id: clonedContent.id,
    title: clonedContent.title,
    width: clonedContent.width,
    height: clonedContent.height,
    ownerId: original.ownerId,
    content: clonedContent,
    isTemplate: false,
    version: 0,
    isDeleted: false,
    createdAt: now,
    updatedAt: now,
  };

  documents.set(stored.id, stored);

  return NextResponse.json(
    { success: true, data: { id: stored.id, title: stored.title } },
    { status: 201 }
  );
}
