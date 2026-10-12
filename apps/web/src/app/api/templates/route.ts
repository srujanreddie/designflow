// DesignFlow - API Route: Templates
// GET /api/templates - List templates
// GET /api/templates?category=social-media - Filter by category

import { NextRequest, NextResponse } from 'next/server';
import { documents } from '../documents/route';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category') || 'all';
  const search = searchParams.get('search') || '';

  let templates = Array.from(documents.values())
    .filter((d) => d.isTemplate && !d.isDeleted);

  if (category !== 'all') {
    templates = templates.filter((d) => d.templateCategory === category);
  }

  if (search) {
    const lower = search.toLowerCase();
    templates = templates.filter((d) => d.title.toLowerCase().includes(lower));
  }

  const items = templates.map((d) => ({
    id: d.id,
    title: d.title,
    width: d.width,
    height: d.height,
    category: d.templateCategory,
    pageCount: d.content.pages.length,
    elementCount: d.content.pages.reduce((sum, p) => sum + p.elements.length, 0),
    createdAt: d.createdAt,
    updatedAt: d.updatedAt,
  }));

  return NextResponse.json({ success: true, data: items });
}
