// DesignFlow - API Route: Documents
// GET /api/documents - List documents
// POST /api/documents - Create document

import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { createDocument, createPage } from '../../../../../packages/document-model/src';
import type { DesignDocument } from '../../../../../packages/shared-types/src';

// In-memory document store (shared across routes via module scope)
// In production, this would use Prisma with PostgreSQL

export interface StoredDocument {
  id: string;
  title: string;
  width: number;
  height: number;
  ownerId: string;
  content: DesignDocument;
  thumbnailUrl?: string;
  isTemplate: boolean;
  templateCategory?: string;
  version: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

// Global store
const globalStore = globalThis as any;
if (!globalStore.__designflow_docs) {
  globalStore.__designflow_docs = new Map<string, StoredDocument>();
  globalStore.__designflow_initialized = false;
}

export const documents: Map<string, StoredDocument> = globalStore.__designflow_docs;

function initTemplates() {
  if (globalStore.__designflow_initialized) return;
  globalStore.__designflow_initialized = true;

  const templates = [
    {
      title: 'Bold Social Post',
      width: 1080, height: 1080,
      category: 'social-media',
      elements: [
        {
          id: uuidv4(), type: 'shape' as const, shapeType: 'rectangle' as const, name: 'Background',
          x: 0, y: 0, width: 1080, height: 1080, rotation: 0, scaleX: 1, scaleY: 1,
          opacity: 1, locked: false, visible: true,
          fill: { type: 'solid' as const, color: { r: 99, g: 66, b: 236, a: 1 } },
          stroke: { r: 0, g: 0, b: 0, a: 0 }, strokeWidth: 0, cornerRadius: 0,
        },
        {
          id: uuidv4(), type: 'text' as const, name: 'Heading',
          x: 100, y: 400, width: 880, height: 120, rotation: 0, scaleX: 1, scaleY: 1,
          opacity: 1, locked: false, visible: true,
          content: 'YOUR HEADLINE HERE',
          style: {
            fontFamily: 'Inter', fontSize: 64, fontWeight: 'bold' as const, fontStyle: 'normal' as const,
            textDecoration: 'none' as const, color: { r: 255, g: 255, b: 255, a: 1 },
            lineHeight: 1.2, letterSpacing: 2, textAlign: 'center' as const, verticalAlign: 'middle' as const,
          },
          padding: 0,
        },
      ],
    },
    {
      title: 'Minimal Presentation',
      width: 1920, height: 1080,
      category: 'presentation',
      elements: [
        {
          id: uuidv4(), type: 'text' as const, name: 'Title',
          x: 120, y: 300, width: 800, height: 100, rotation: 0, scaleX: 1, scaleY: 1,
          opacity: 1, locked: false, visible: true,
          content: 'Presentation Title',
          style: {
            fontFamily: 'Inter', fontSize: 56, fontWeight: 'bold' as const, fontStyle: 'normal' as const,
            textDecoration: 'none' as const, color: { r: 17, g: 24, b: 39, a: 1 },
            lineHeight: 1.2, letterSpacing: -1, textAlign: 'left' as const, verticalAlign: 'top' as const,
          },
          padding: 0,
        },
        {
          id: uuidv4(), type: 'shape' as const, shapeType: 'rectangle' as const, name: 'Accent',
          x: 120, y: 270, width: 60, height: 6, rotation: 0, scaleX: 1, scaleY: 1,
          opacity: 1, locked: false, visible: true,
          fill: { type: 'solid' as const, color: { r: 99, g: 66, b: 236, a: 1 } },
          stroke: { r: 0, g: 0, b: 0, a: 0 }, strokeWidth: 0, cornerRadius: 3,
        },
      ],
    },
    {
      title: 'YouTube Thumbnail',
      width: 1280, height: 720,
      category: 'youtube-thumbnail',
      elements: [
        {
          id: uuidv4(), type: 'shape' as const, shapeType: 'rectangle' as const, name: 'BG',
          x: 0, y: 0, width: 1280, height: 720, rotation: 0, scaleX: 1, scaleY: 1,
          opacity: 1, locked: true, visible: true,
          fill: { type: 'solid' as const, color: { r: 17, g: 24, b: 39, a: 1 } },
          stroke: { r: 0, g: 0, b: 0, a: 0 }, strokeWidth: 0, cornerRadius: 0,
        },
        {
          id: uuidv4(), type: 'text' as const, name: 'Title',
          x: 60, y: 250, width: 700, height: 200, rotation: 0, scaleX: 1, scaleY: 1,
          opacity: 1, locked: false, visible: true,
          content: 'VIDEO TITLE',
          style: {
            fontFamily: 'Inter', fontSize: 72, fontWeight: 'bold' as const, fontStyle: 'normal' as const,
            textDecoration: 'none' as const, color: { r: 255, g: 255, b: 255, a: 1 },
            lineHeight: 1.1, letterSpacing: 3, textAlign: 'left' as const, verticalAlign: 'middle' as const,
          },
          padding: 0,
        },
      ],
    },
    {
      title: 'Business Card',
      width: 1050, height: 600,
      category: 'business-card',
      elements: [
        {
          id: uuidv4(), type: 'text' as const, name: 'Name',
          x: 80, y: 180, width: 500, height: 60, rotation: 0, scaleX: 1, scaleY: 1,
          opacity: 1, locked: false, visible: true,
          content: 'John Doe',
          style: {
            fontFamily: 'Inter', fontSize: 32, fontWeight: 'bold' as const, fontStyle: 'normal' as const,
            textDecoration: 'none' as const, color: { r: 17, g: 24, b: 39, a: 1 },
            lineHeight: 1.2, letterSpacing: 1, textAlign: 'left' as const, verticalAlign: 'top' as const,
          },
          padding: 0,
        },
      ],
    },
    {
      title: 'Instagram Story',
      width: 1080, height: 1920,
      category: 'social-media',
      elements: [
        {
          id: uuidv4(), type: 'shape' as const, shapeType: 'rectangle' as const, name: 'BG',
          x: 0, y: 0, width: 1080, height: 1920, rotation: 0, scaleX: 1, scaleY: 1,
          opacity: 1, locked: true, visible: true,
          fill: { type: 'solid' as const, color: { r: 236, g: 72, b: 153, a: 1 } },
          stroke: { r: 0, g: 0, b: 0, a: 0 }, strokeWidth: 0, cornerRadius: 0,
        },
        {
          id: uuidv4(), type: 'text' as const, name: 'Quote',
          x: 120, y: 700, width: 840, height: 300, rotation: 0, scaleX: 1, scaleY: 1,
          opacity: 1, locked: false, visible: true,
          content: '"Your inspiring quote"',
          style: {
            fontFamily: 'Inter', fontSize: 48, fontWeight: 'bold' as const, fontStyle: 'italic' as const,
            textDecoration: 'none' as const, color: { r: 255, g: 255, b: 255, a: 1 },
            lineHeight: 1.4, letterSpacing: 0, textAlign: 'center' as const, verticalAlign: 'middle' as const,
          },
          padding: 20,
        },
      ],
    },
    {
      title: 'Event Poster',
      width: 1800, height: 2400,
      category: 'poster',
      elements: [
        {
          id: uuidv4(), type: 'shape' as const, shapeType: 'rectangle' as const, name: 'BG',
          x: 0, y: 0, width: 1800, height: 2400, rotation: 0, scaleX: 1, scaleY: 1,
          opacity: 1, locked: true, visible: true,
          fill: { type: 'solid' as const, color: { r: 15, g: 23, b: 42, a: 1 } },
          stroke: { r: 0, g: 0, b: 0, a: 0 }, strokeWidth: 0, cornerRadius: 0,
        },
        {
          id: uuidv4(), type: 'text' as const, name: 'Event',
          x: 150, y: 800, width: 1500, height: 200, rotation: 0, scaleX: 1, scaleY: 1,
          opacity: 1, locked: false, visible: true,
          content: 'EVENT NAME',
          style: {
            fontFamily: 'Inter', fontSize: 96, fontWeight: 'bold' as const, fontStyle: 'normal' as const,
            textDecoration: 'none' as const, color: { r: 255, g: 255, b: 255, a: 1 },
            lineHeight: 1.1, letterSpacing: 8, textAlign: 'center' as const, verticalAlign: 'middle' as const,
          },
          padding: 0,
        },
      ],
    },
  ];

  for (const t of templates) {
    const doc = createDocument({ title: t.title, width: t.width, height: t.height });
    doc.pages[0].elements = t.elements as any;

    const stored: StoredDocument = {
      id: doc.id,
      title: t.title,
      width: t.width,
      height: t.height,
      ownerId: 'system',
      content: doc,
      isTemplate: true,
      templateCategory: t.category,
      version: 0,
      isDeleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    documents.set(stored.id, stored);
  }
}

initTemplates();

// GET /api/documents
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get('userId') || 'default-user';
  const search = searchParams.get('search') || '';
  const isTemplate = searchParams.get('isTemplate') === 'true';

  let docs = Array.from(documents.values())
    .filter((d) => !d.isDeleted);

  if (isTemplate) {
    docs = docs.filter((d) => d.isTemplate);
    const category = searchParams.get('category');
    if (category && category !== 'all') {
      docs = docs.filter((d) => d.templateCategory === category);
    }
  } else {
    docs = docs.filter((d) => d.ownerId === userId && !d.isTemplate);
  }

  if (search) {
    const lower = search.toLowerCase();
    docs = docs.filter((d) => d.title.toLowerCase().includes(lower));
  }

  docs.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const items = docs.map((d) => ({
    id: d.id,
    title: d.title,
    width: d.width,
    height: d.height,
    ownerId: d.ownerId,
    thumbnailUrl: d.thumbnailUrl,
    pageCount: d.content.pages.length,
    isTemplate: d.isTemplate,
    templateCategory: d.templateCategory,
    createdAt: d.createdAt,
    updatedAt: d.updatedAt,
  }));

  return NextResponse.json({ success: true, data: items });
}

// POST /api/documents
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, width, height, templateId } = body;
    const userId = body.userId || 'default-user';

    if (!title || !width || !height) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title, width, height' },
        { status: 400 }
      );
    }

    const doc = createDocument({ title, width, height });

    // If creating from template, copy content
    if (templateId) {
      const template = documents.get(templateId);
      if (template && template.isTemplate) {
        const clonedPages = JSON.parse(JSON.stringify(template.content.pages));
        for (const page of clonedPages) {
          page.id = uuidv4();
          for (const el of page.elements) {
            el.id = uuidv4();
          }
        }
        doc.pages = clonedPages;
        doc.width = template.width;
        doc.height = template.height;
      }
    }

    const stored: StoredDocument = {
      id: doc.id,
      title: doc.title,
      width: doc.width,
      height: doc.height,
      ownerId: userId,
      content: doc,
      isTemplate: false,
      version: 0,
      isDeleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    documents.set(stored.id, stored);

    return NextResponse.json({ success: true, data: { id: doc.id, ...stored } }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create document' },
      { status: 500 }
    );
  }
}
