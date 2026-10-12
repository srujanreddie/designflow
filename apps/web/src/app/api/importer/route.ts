// DesignFlow - API Route: Catalog Importer Engine
// GET /api/importer - Get catalog status, metrics, discovered entries
// POST /api/importer - Trigger an import run

import { NextRequest, NextResponse } from 'next/server';
import { CatalogImporterPipeline } from '@/lib/catalog-importer';

export async function GET(request: NextRequest) {
  try {
    const pipeline = CatalogImporterPipeline.getInstance();
    const catalog = await pipeline.discoverCategoryCatalog();

    return NextResponse.json({
      success: true,
      data: {
        source: 'DesignBundles (templates/canva-templates)',
        totalAvailable: catalog.items.length,
        items: catalog.items,
        page: catalog.page,
        totalPages: catalog.totalPages,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch catalog status' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const pipeline = CatalogImporterPipeline.getInstance();
    const summary = await pipeline.executeImportRun();

    return NextResponse.json({
      success: true,
      data: summary,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to execute import run' },
      { status: 500 }
    );
  }
}
