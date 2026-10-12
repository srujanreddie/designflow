// DesignFlow - Backend API Service Layer
// Document service - handles all document CRUD operations

import type {
  DesignDocument,
  DocumentMetadata,
  ExportSettings,
  DesignPage,
} from '../../../packages/shared-types/src';
import { createDocument, createPage } from '../../../packages/document-model/src';
import { v4 as uuidv4 } from 'uuid';

// ============================================================
// In-Memory Store (replaced by Prisma in production)
// ============================================================

interface StoredDocument {
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
  createdAt: Date;
  updatedAt: Date;
  lastOpenedAt?: Date;
}

// In-memory storage for development
const documents = new Map<string, StoredDocument>();
const revisions = new Map<string, Array<{
  id: string;
  documentId: string;
  version: number;
  content: DesignDocument;
  createdById: string;
  createdAt: Date;
  description?: string;
}>>();

// ============================================================
// Document Service
// ============================================================

export class DocumentService {
  /**
   * Create a new document
   */
  static async create(params: {
    title: string;
    width: number;
    height: number;
    ownerId: string;
    templateId?: string;
  }): Promise<DocumentMetadata> {
    const doc = createDocument({
      title: params.title,
      width: params.width,
      height: params.height,
    });

    // If creating from template, copy template content
    if (params.templateId) {
      const template = documents.get(params.templateId);
      if (template && template.isTemplate) {
        doc.pages = JSON.parse(JSON.stringify(template.content.pages));
        // Reassign all element IDs
        for (const page of doc.pages) {
          page.id = uuidv4();
          for (const el of page.elements) {
            el.id = uuidv4();
          }
        }
        doc.width = template.width;
        doc.height = template.height;
      }
    }

    const stored: StoredDocument = {
      id: doc.id,
      title: doc.title,
      width: doc.width,
      height: doc.height,
      ownerId: params.ownerId,
      content: doc,
      isTemplate: false,
      version: 0,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    documents.set(doc.id, stored);

    return this.toMetadata(stored, params.ownerId);
  }

  /**
   * Get document content for editing
   */
  static async getDocument(documentId: string, userId: string): Promise<DesignDocument | null> {
    const stored = documents.get(documentId);
    if (!stored || stored.isDeleted) return null;

    // Check ownership (simplified - add sharing check in production)
    if (stored.ownerId !== userId) return null;

    // Update last opened
    stored.lastOpenedAt = new Date();

    return stored.content;
  }

  /**
   * List user's documents
   */
  static async listDocuments(params: {
    userId: string;
    page?: number;
    pageSize?: number;
    search?: string;
    sort?: 'updatedAt' | 'createdAt' | 'title';
    order?: 'asc' | 'desc';
  }): Promise<{ items: DocumentMetadata[]; total: number }> {
    const { userId, page = 1, pageSize = 20, search, sort = 'updatedAt', order = 'desc' } = params;

    let userDocs = Array.from(documents.values())
      .filter((d) => d.ownerId === userId && !d.isDeleted && !d.isTemplate);

    // Apply search
    if (search) {
      const lower = search.toLowerCase();
      userDocs = userDocs.filter((d) => d.title.toLowerCase().includes(lower));
    }

    // Sort
    userDocs.sort((a, b) => {
      const aVal = a[sort as keyof StoredDocument] as any;
      const bVal = b[sort as keyof StoredDocument] as any;
      const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return order === 'desc' ? -cmp : cmp;
    });

    const total = userDocs.length;
    const start = (page - 1) * pageSize;
    const items = userDocs.slice(start, start + pageSize).map((d) => this.toMetadata(d, userId));

    return { items, total };
  }

  /**
   * Update document content (autosave)
   */
  static async updateDocument(
    documentId: string,
    userId: string,
    content: DesignDocument,
    createRevision = false
  ): Promise<{ success: boolean; version: number }> {
    const stored = documents.get(documentId);
    if (!stored || stored.isDeleted) return { success: false, version: -1 };
    if (stored.ownerId !== userId) return { success: false, version: -1 };

    // Optimistic concurrency check
    if (content.version < stored.version) {
      return { success: false, version: stored.version };
    }

    const newVersion = stored.version + 1;
    
    // Create revision if requested
    if (createRevision) {
      const docRevisions = revisions.get(documentId) || [];
      docRevisions.push({
        id: uuidv4(),
        documentId,
        version: newVersion,
        content: JSON.parse(JSON.stringify(stored.content)),
        createdById: userId,
        createdAt: new Date(),
      });
      revisions.set(documentId, docRevisions);
    }

    stored.content = { ...content, version: newVersion };
    stored.version = newVersion;
    stored.title = content.title;
    stored.width = content.width;
    stored.height = content.height;
    stored.updatedAt = new Date();

    return { success: true, version: newVersion };
  }

  /**
   * Rename document
   */
  static async renameDocument(documentId: string, userId: string, title: string): Promise<boolean> {
    const stored = documents.get(documentId);
    if (!stored || stored.isDeleted || stored.ownerId !== userId) return false;
    stored.title = title;
    stored.content.title = title;
    stored.updatedAt = new Date();
    return true;
  }

  /**
   * Duplicate document
   */
  static async duplicateDocument(documentId: string, userId: string): Promise<DocumentMetadata | null> {
    const stored = documents.get(documentId);
    if (!stored || stored.isDeleted) return null;

    const clonedContent: DesignDocument = JSON.parse(JSON.stringify(stored.content));
    clonedContent.id = uuidv4();
    clonedContent.title = `${stored.title} (Copy)`;
    clonedContent.version = 0;
    const now = new Date().toISOString();
    clonedContent.createdAt = now;
    clonedContent.updatedAt = now;

    // Reassign IDs
    for (const page of clonedContent.pages) {
      page.id = uuidv4();
      for (const el of page.elements) {
        el.id = uuidv4();
      }
    }

    const newStored: StoredDocument = {
      id: clonedContent.id,
      title: clonedContent.title,
      width: clonedContent.width,
      height: clonedContent.height,
      ownerId: userId,
      content: clonedContent,
      isTemplate: false,
      version: 0,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    documents.set(newStored.id, newStored);
    return this.toMetadata(newStored, userId);
  }

  /**
   * Soft delete document
   */
  static async deleteDocument(documentId: string, userId: string): Promise<boolean> {
    const stored = documents.get(documentId);
    if (!stored || stored.ownerId !== userId) return false;
    stored.isDeleted = true;
    stored.deletedAt = new Date();
    return true;
  }

  /**
   * List templates
   */
  static async listTemplates(params: {
    category?: string;
    search?: string;
    page?: number;
    pageSize?: number;
  }): Promise<{ items: DocumentMetadata[]; total: number }> {
    const { category, search, page = 1, pageSize = 20 } = params;

    let templates = Array.from(documents.values())
      .filter((d) => d.isTemplate && !d.isDeleted);

    if (category && category !== 'all') {
      templates = templates.filter((d) => d.templateCategory === category);
    }

    if (search) {
      const lower = search.toLowerCase();
      templates = templates.filter((d) => d.title.toLowerCase().includes(lower));
    }

    const total = templates.length;
    const start = (page - 1) * pageSize;
    const items = templates.slice(start, start + pageSize).map((d) => this.toMetadata(d, d.ownerId));

    return { items, total };
  }

  /**
   * Get revision history
   */
  static async getRevisions(documentId: string, userId: string) {
    const stored = documents.get(documentId);
    if (!stored || stored.ownerId !== userId) return [];
    return (revisions.get(documentId) || [])
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  /**
   * Restore a revision
   */
  static async restoreRevision(documentId: string, revisionId: string, userId: string): Promise<boolean> {
    const stored = documents.get(documentId);
    if (!stored || stored.ownerId !== userId) return false;

    const docRevisions = revisions.get(documentId) || [];
    const revision = docRevisions.find((r) => r.id === revisionId);
    if (!revision) return false;

    // Save current as a revision before restoring
    docRevisions.push({
      id: uuidv4(),
      documentId,
      version: stored.version + 1,
      content: JSON.parse(JSON.stringify(stored.content)),
      createdById: userId,
      createdAt: new Date(),
      description: 'Before restore',
    });

    stored.content = JSON.parse(JSON.stringify(revision.content));
    stored.version = stored.version + 1;
    stored.updatedAt = new Date();

    return true;
  }

  // ---- Helpers ----

  private static toMetadata(stored: StoredDocument, ownerName: string): DocumentMetadata {
    return {
      id: stored.id,
      title: stored.title,
      width: stored.width,
      height: stored.height,
      ownerId: stored.ownerId,
      ownerName: ownerName,
      thumbnailUrl: stored.thumbnailUrl,
      pageCount: stored.content.pages.length,
      createdAt: stored.createdAt.toISOString(),
      updatedAt: stored.updatedAt.toISOString(),
      lastOpenedAt: stored.lastOpenedAt?.toISOString(),
      isTemplate: stored.isTemplate,
      templateCategory: stored.templateCategory,
      shareStatus: 'private',
    };
  }
}

// ============================================================
// Seed Templates
// ============================================================

export function seedTemplates() {
  const systemUserId = 'system';
  const templates: Array<{
    title: string;
    width: number;
    height: number;
    category: string;
    elements: any[];
  }> = [
    {
      title: 'Bold Social Post',
      width: 1080,
      height: 1080,
      category: 'social-media',
      elements: [
        {
          id: uuidv4(), type: 'shape', shapeType: 'rectangle', name: 'Background',
          x: 0, y: 0, width: 1080, height: 1080, rotation: 0, scaleX: 1, scaleY: 1,
          opacity: 1, locked: false, visible: true,
          fill: { type: 'solid', color: { r: 99, g: 66, b: 236, a: 1 } },
          stroke: { r: 0, g: 0, b: 0, a: 0 }, strokeWidth: 0, cornerRadius: 0,
        },
        {
          id: uuidv4(), type: 'text', name: 'Heading',
          x: 100, y: 350, width: 880, height: 120, rotation: 0, scaleX: 1, scaleY: 1,
          opacity: 1, locked: false, visible: true,
          content: 'YOUR HEADLINE HERE',
          style: {
            fontFamily: 'Inter', fontSize: 64, fontWeight: 'bold', fontStyle: 'normal',
            textDecoration: 'none', color: { r: 255, g: 255, b: 255, a: 1 },
            lineHeight: 1.2, letterSpacing: 2, textAlign: 'center', verticalAlign: 'middle',
          },
          padding: 0,
        },
        {
          id: uuidv4(), type: 'text', name: 'Subtitle',
          x: 200, y: 500, width: 680, height: 60, rotation: 0, scaleX: 1, scaleY: 1,
          opacity: 0.8, locked: false, visible: true,
          content: 'Add your description here',
          style: {
            fontFamily: 'Inter', fontSize: 20, fontWeight: 'normal', fontStyle: 'normal',
            textDecoration: 'none', color: { r: 255, g: 255, b: 255, a: 1 },
            lineHeight: 1.5, letterSpacing: 0, textAlign: 'center', verticalAlign: 'top',
          },
          padding: 0,
        },
      ],
    },
    {
      title: 'Minimal Presentation',
      width: 1920,
      height: 1080,
      category: 'presentation',
      elements: [
        {
          id: uuidv4(), type: 'text', name: 'Title',
          x: 120, y: 300, width: 800, height: 100, rotation: 0, scaleX: 1, scaleY: 1,
          opacity: 1, locked: false, visible: true,
          content: 'Presentation Title',
          style: {
            fontFamily: 'Inter', fontSize: 56, fontWeight: 'bold', fontStyle: 'normal',
            textDecoration: 'none', color: { r: 17, g: 24, b: 39, a: 1 },
            lineHeight: 1.2, letterSpacing: -1, textAlign: 'left', verticalAlign: 'top',
          },
          padding: 0,
        },
        {
          id: uuidv4(), type: 'text', name: 'Author',
          x: 120, y: 430, width: 400, height: 40, rotation: 0, scaleX: 1, scaleY: 1,
          opacity: 0.6, locked: false, visible: true,
          content: 'By Your Name | 2024',
          style: {
            fontFamily: 'Inter', fontSize: 18, fontWeight: 'normal', fontStyle: 'normal',
            textDecoration: 'none', color: { r: 17, g: 24, b: 39, a: 1 },
            lineHeight: 1.5, letterSpacing: 1, textAlign: 'left', verticalAlign: 'top',
          },
          padding: 0,
        },
        {
          id: uuidv4(), type: 'shape', shapeType: 'rectangle', name: 'Accent Bar',
          x: 120, y: 270, width: 60, height: 6, rotation: 0, scaleX: 1, scaleY: 1,
          opacity: 1, locked: false, visible: true,
          fill: { type: 'solid', color: { r: 99, g: 66, b: 236, a: 1 } },
          stroke: { r: 0, g: 0, b: 0, a: 0 }, strokeWidth: 0, cornerRadius: 3,
        },
      ],
    },
    {
      title: 'YouTube Thumbnail - Bold',
      width: 1280,
      height: 720,
      category: 'youtube-thumbnail',
      elements: [
        {
          id: uuidv4(), type: 'shape', shapeType: 'rectangle', name: 'Background',
          x: 0, y: 0, width: 1280, height: 720, rotation: 0, scaleX: 1, scaleY: 1,
          opacity: 1, locked: true, visible: true,
          fill: { type: 'solid', color: { r: 17, g: 24, b: 39, a: 1 } },
          stroke: { r: 0, g: 0, b: 0, a: 0 }, strokeWidth: 0, cornerRadius: 0,
        },
        {
          id: uuidv4(), type: 'text', name: 'Title',
          x: 60, y: 200, width: 700, height: 200, rotation: 0, scaleX: 1, scaleY: 1,
          opacity: 1, locked: false, visible: true,
          content: 'VIDEO TITLE',
          style: {
            fontFamily: 'Inter', fontSize: 72, fontWeight: 'bold', fontStyle: 'normal',
            textDecoration: 'none', color: { r: 255, g: 255, b: 255, a: 1 },
            lineHeight: 1.1, letterSpacing: 3, textAlign: 'left', verticalAlign: 'middle',
          },
          padding: 0,
        },
        {
          id: uuidv4(), type: 'shape', shapeType: 'circle', name: 'Play Button',
          x: 900, y: 260, width: 200, height: 200, rotation: 0, scaleX: 1, scaleY: 1,
          opacity: 0.9, locked: false, visible: true,
          fill: { type: 'solid', color: { r: 239, g: 68, b: 68, a: 1 } },
          stroke: { r: 0, g: 0, b: 0, a: 0 }, strokeWidth: 0, cornerRadius: 0,
        },
      ],
    },
    {
      title: 'Business Card - Clean',
      width: 1050,
      height: 600,
      category: 'business-card',
      elements: [
        {
          id: uuidv4(), type: 'text', name: 'Name',
          x: 80, y: 180, width: 500, height: 60, rotation: 0, scaleX: 1, scaleY: 1,
          opacity: 1, locked: false, visible: true,
          content: 'John Doe',
          style: {
            fontFamily: 'Inter', fontSize: 32, fontWeight: 'bold', fontStyle: 'normal',
            textDecoration: 'none', color: { r: 17, g: 24, b: 39, a: 1 },
            lineHeight: 1.2, letterSpacing: 1, textAlign: 'left', verticalAlign: 'top',
          },
          padding: 0,
        },
        {
          id: uuidv4(), type: 'text', name: 'Title',
          x: 80, y: 245, width: 500, height: 30, rotation: 0, scaleX: 1, scaleY: 1,
          opacity: 0.7, locked: false, visible: true,
          content: 'Senior Designer',
          style: {
            fontFamily: 'Inter', fontSize: 16, fontWeight: 'normal', fontStyle: 'normal',
            textDecoration: 'none', color: { r: 17, g: 24, b: 39, a: 1 },
            lineHeight: 1.5, letterSpacing: 2, textAlign: 'left', verticalAlign: 'top',
          },
          padding: 0,
        },
        {
          id: uuidv4(), type: 'text', name: 'Contact',
          x: 80, y: 350, width: 500, height: 100, rotation: 0, scaleX: 1, scaleY: 1,
          opacity: 0.6, locked: false, visible: true,
          content: 'john@example.com\n+1 (555) 123-4567\nwww.example.com',
          style: {
            fontFamily: 'Inter', fontSize: 14, fontWeight: 'normal', fontStyle: 'normal',
            textDecoration: 'none', color: { r: 17, g: 24, b: 39, a: 1 },
            lineHeight: 1.8, letterSpacing: 0, textAlign: 'left', verticalAlign: 'top',
          },
          padding: 0,
        },
        {
          id: uuidv4(), type: 'shape', shapeType: 'rectangle', name: 'Accent',
          x: 0, y: 0, width: 8, height: 600, rotation: 0, scaleX: 1, scaleY: 1,
          opacity: 1, locked: true, visible: true,
          fill: { type: 'solid', color: { r: 99, g: 66, b: 236, a: 1 } },
          stroke: { r: 0, g: 0, b: 0, a: 0 }, strokeWidth: 0, cornerRadius: 0,
        },
      ],
    },
    {
      title: 'Event Flyer - Modern',
      width: 2550,
      height: 3300,
      category: 'flyer',
      elements: [
        {
          id: uuidv4(), type: 'shape', shapeType: 'rectangle', name: 'Background',
          x: 0, y: 0, width: 2550, height: 3300, rotation: 0, scaleX: 1, scaleY: 1,
          opacity: 1, locked: true, visible: true,
          fill: { type: 'solid', color: { r: 15, g: 23, b: 42, a: 1 } },
          stroke: { r: 0, g: 0, b: 0, a: 0 }, strokeWidth: 0, cornerRadius: 0,
        },
        {
          id: uuidv4(), type: 'text', name: 'Event Name',
          x: 200, y: 800, width: 2150, height: 300, rotation: 0, scaleX: 1, scaleY: 1,
          opacity: 1, locked: false, visible: true,
          content: 'EVENT NAME',
          style: {
            fontFamily: 'Inter', fontSize: 120, fontWeight: 'bold', fontStyle: 'normal',
            textDecoration: 'none', color: { r: 255, g: 255, b: 255, a: 1 },
            lineHeight: 1.1, letterSpacing: 8, textAlign: 'center', verticalAlign: 'middle',
          },
          padding: 0,
        },
        {
          id: uuidv4(), type: 'text', name: 'Date & Venue',
          x: 400, y: 1200, width: 1750, height: 100, rotation: 0, scaleX: 1, scaleY: 1,
          opacity: 0.7, locked: false, visible: true,
          content: 'January 15, 2025 • Grand Hall',
          style: {
            fontFamily: 'Inter', fontSize: 36, fontWeight: 'normal', fontStyle: 'normal',
            textDecoration: 'none', color: { r: 255, g: 255, b: 255, a: 1 },
            lineHeight: 1.5, letterSpacing: 3, textAlign: 'center', verticalAlign: 'top',
          },
          padding: 0,
        },
        {
          id: uuidv4(), type: 'shape', shapeType: 'circle', name: 'Decorative Circle',
          x: 900, y: 1800, width: 750, height: 750, rotation: 0, scaleX: 1, scaleY: 1,
          opacity: 0.15, locked: false, visible: true,
          fill: { type: 'solid', color: { r: 99, g: 66, b: 236, a: 1 } },
          stroke: { r: 0, g: 0, b: 0, a: 0 }, strokeWidth: 0, cornerRadius: 0,
        },
      ],
    },
    {
      title: 'Instagram Story - Gradient',
      width: 1080,
      height: 1920,
      category: 'social-media',
      elements: [
        {
          id: uuidv4(), type: 'shape', shapeType: 'rectangle', name: 'Background',
          x: 0, y: 0, width: 1080, height: 1920, rotation: 0, scaleX: 1, scaleY: 1,
          opacity: 1, locked: true, visible: true,
          fill: { type: 'solid', color: { r: 99, g: 66, b: 236, a: 1 } },
          stroke: { r: 0, g: 0, b: 0, a: 0 }, strokeWidth: 0, cornerRadius: 0,
        },
        {
          id: uuidv4(), type: 'text', name: 'Quote',
          x: 120, y: 600, width: 840, height: 400, rotation: 0, scaleX: 1, scaleY: 1,
          opacity: 1, locked: false, visible: true,
          content: '"Your inspiring quote goes here"',
          style: {
            fontFamily: 'Inter', fontSize: 48, fontWeight: 'bold', fontStyle: 'italic',
            textDecoration: 'none', color: { r: 255, g: 255, b: 255, a: 1 },
            lineHeight: 1.4, letterSpacing: 0, textAlign: 'center', verticalAlign: 'middle',
          },
          padding: 20,
        },
        {
          id: uuidv4(), type: 'text', name: 'Author',
          x: 300, y: 1050, width: 480, height: 50, rotation: 0, scaleX: 1, scaleY: 1,
          opacity: 0.7, locked: false, visible: true,
          content: '— Author Name',
          style: {
            fontFamily: 'Inter', fontSize: 20, fontWeight: 'normal', fontStyle: 'normal',
            textDecoration: 'none', color: { r: 255, g: 255, b: 255, a: 1 },
            lineHeight: 1.5, letterSpacing: 2, textAlign: 'center', verticalAlign: 'top',
          },
          padding: 0,
        },
      ],
    },
  ];

  // Store each template
  for (const t of templates) {
    const doc = createDocument({ title: t.title, width: t.width, height: t.height });
    doc.pages[0].elements = t.elements as any;

    const stored: StoredDocument = {
      id: doc.id,
      title: t.title,
      width: t.width,
      height: t.height,
      ownerId: systemUserId,
      content: doc,
      isTemplate: true,
      templateCategory: t.category,
      version: 0,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    documents.set(stored.id, stored);
  }
}

// Auto-seed on import
seedTemplates();
