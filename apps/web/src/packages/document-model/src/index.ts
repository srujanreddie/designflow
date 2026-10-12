// DesignFlow - Document Model
// Factory functions, serialization, and document operations

import { v4 as uuidv4 } from 'uuid';
import type {
  DesignDocument,
  DesignPage,
  DesignElement,
  TextElement,
  ShapeElement,
  ImageElement,
  GroupElement,
  BackgroundConfig,
  Color,
  TextStyle,
  Fill,
  ExportSettings,
  DEFAULT_TEXT_STYLE,
  DEFAULT_COLORS,
  DEFAULT_EXPORT_SETTINGS,
  SCHEMA_VERSION,
} from '../../shared-types/src';

// ============================================================
// Color Helpers
// ============================================================

export function colorToRgba(color: Color): string {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
}

export function colorToHex(color: Color): string {
  const r = color.r.toString(16).padStart(2, '0');
  const g = color.g.toString(16).padStart(2, '0');
  const b = color.b.toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
}

export function hexToColor(hex: string, alpha = 1): Color {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { r: 0, g: 0, b: 0, a: alpha };
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
    a: alpha,
  };
}

// ============================================================
// Document Factory
// ============================================================

export function createDocument(params: {
  title?: string;
  width?: number;
  height?: number;
}): DesignDocument {
  const now = new Date().toISOString();
  return {
    id: uuidv4(),
    title: params.title || 'Untitled Design',
    width: params.width || 1080,
    height: params.height || 1080,
    unit: 'px',
    schemaVersion: 1, // SCHEMA_VERSION
    version: 0,
    pages: [createPage()],
    exportSettings: {
      format: 'png',
      quality: 0.92,
      scale: 1,
      transparentBackground: false,
      pageRange: 'all',
    },
    createdAt: now,
    updatedAt: now,
  };
}

export function createPage(name?: string): DesignPage {
  return {
    id: uuidv4(),
    name: name || 'Page 1',
    background: { type: 'color', color: { r: 255, g: 255, b: 255, a: 1 } },
    elements: [],
  };
}

// ============================================================
// Element Factories
// ============================================================

export function createTextElement(
  overrides: Partial<TextElement> = {}
): TextElement {
  return {
    id: uuidv4(),
    name: 'Text',
    type: 'text',
    x: 100,
    y: 100,
    width: 300,
    height: 60,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    locked: false,
    visible: true,
    content: 'Type something',
    style: {
      fontFamily: 'Inter',
      fontSize: 24,
      fontWeight: 'normal',
      fontStyle: 'normal',
      textDecoration: 'none',
      color: { r: 0, g: 0, b: 0, a: 1 },
      lineHeight: 1.4,
      letterSpacing: 0,
      textAlign: 'left',
      verticalAlign: 'top',
    },
    padding: 8,
    ...overrides,
  };
}

export function createShapeElement(
  shapeType: ShapeElement['shapeType'] = 'rectangle',
  overrides: Partial<ShapeElement> = {}
): ShapeElement {
  return {
    id: uuidv4(),
    name: shapeType.charAt(0).toUpperCase() + shapeType.slice(1),
    type: 'shape',
    shapeType,
    x: 100,
    y: 100,
    width: 200,
    height: 200,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    locked: false,
    visible: true,
    fill: { type: 'solid', color: { r: 99, g: 66, b: 236, a: 1 } },
    stroke: { r: 0, g: 0, b: 0, a: 0 },
    strokeWidth: 0,
    cornerRadius: 0,
    ...overrides,
  };
}

export function createImageElement(
  src: string,
  originalWidth: number,
  originalHeight: number,
  overrides: Partial<ImageElement> = {}
): ImageElement {
  // Scale image to fit within 400x400 while maintaining aspect ratio
  const maxDim = 400;
  const scale = Math.min(maxDim / originalWidth, maxDim / originalHeight, 1);
  const width = Math.round(originalWidth * scale);
  const height = Math.round(originalHeight * scale);

  return {
    id: uuidv4(),
    name: 'Image',
    type: 'image',
    x: 100,
    y: 100,
    width,
    height,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    locked: false,
    visible: true,
    src,
    originalWidth,
    originalHeight,
    cropX: 0,
    cropY: 0,
    cropWidth: originalWidth,
    cropHeight: originalHeight,
    ...overrides,
  };
}

export function createGroupElement(
  children: DesignElement[],
  overrides: Partial<GroupElement> = {}
): GroupElement {
  // Calculate bounding box of children
  const bounds = getElementsBounds(children);
  return {
    id: uuidv4(),
    name: 'Group',
    type: 'group',
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    locked: false,
    visible: true,
    children,
    ...overrides,
  };
}

// ============================================================
// Geometry Helpers
// ============================================================

export function getElementsBounds(elements: DesignElement[]): {
  x: number;
  y: number;
  width: number;
  height: number;
} {
  if (elements.length === 0) {
    return { x: 0, y: 0, width: 0, height: 0 };
  }

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const el of elements) {
    minX = Math.min(minX, el.x);
    minY = Math.min(minY, el.y);
    maxX = Math.max(maxX, el.x + el.width * el.scaleX);
    maxY = Math.max(maxY, el.y + el.height * el.scaleY);
  }

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  };
}

export function isPointInElement(
  point: { x: number; y: number },
  element: DesignElement
): boolean {
  // Simple AABB check (doesn't account for rotation)
  const ex = element.x;
  const ey = element.y;
  const ew = element.width * element.scaleX;
  const eh = element.height * element.scaleY;

  return point.x >= ex && point.x <= ex + ew && point.y >= ey && point.y <= ey + eh;
}

// ============================================================
// Document Operations
// ============================================================

export function addPage(doc: DesignDocument, page?: DesignPage, index?: number): DesignDocument {
  const newPage = page || createPage(`Page ${doc.pages.length + 1}`);
  const pages = [...doc.pages];
  if (index !== undefined) {
    pages.splice(index, 0, newPage);
  } else {
    pages.push(newPage);
  }
  return { ...doc, pages, version: doc.version + 1, updatedAt: new Date().toISOString() };
}

export function removePage(doc: DesignDocument, pageId: string): DesignDocument {
  if (doc.pages.length <= 1) {
    throw new Error('Cannot remove the last page');
  }
  return {
    ...doc,
    pages: doc.pages.filter((p) => p.id !== pageId),
    version: doc.version + 1,
    updatedAt: new Date().toISOString(),
  };
}

export function duplicatePage(doc: DesignDocument, pageId: string): DesignDocument {
  const pageIndex = doc.pages.findIndex((p) => p.id === pageId);
  if (pageIndex === -1) throw new Error('Page not found');

  const original = doc.pages[pageIndex];
  const duplicate: DesignPage = {
    ...JSON.parse(JSON.stringify(original)),
    id: uuidv4(),
    name: `${original.name} (Copy)`,
  };

  // Assign new IDs to all elements
  reassignElementIds(duplicate.elements);

  const pages = [...doc.pages];
  pages.splice(pageIndex + 1, 0, duplicate);

  return { ...doc, pages, version: doc.version + 1, updatedAt: new Date().toISOString() };
}

export function addElement(
  doc: DesignDocument,
  pageId: string,
  element: DesignElement
): DesignDocument {
  return {
    ...doc,
    pages: doc.pages.map((page) =>
      page.id === pageId
        ? { ...page, elements: [...page.elements, element] }
        : page
    ),
    version: doc.version + 1,
    updatedAt: new Date().toISOString(),
  };
}

export function removeElement(
  doc: DesignDocument,
  pageId: string,
  elementId: string
): DesignDocument {
  return {
    ...doc,
    pages: doc.pages.map((page) =>
      page.id === pageId
        ? { ...page, elements: page.elements.filter((e) => e.id !== elementId) }
        : page
    ),
    version: doc.version + 1,
    updatedAt: new Date().toISOString(),
  };
}

export function updateElement(
  doc: DesignDocument,
  pageId: string,
  elementId: string,
  updates: Partial<DesignElement>
): DesignDocument {
  return {
    ...doc,
    pages: doc.pages.map((page) =>
      page.id === pageId
        ? {
            ...page,
            elements: page.elements.map((e) =>
              e.id === elementId ? { ...e, ...updates } as DesignElement : e
            ),
          }
        : page
    ),
    version: doc.version + 1,
    updatedAt: new Date().toISOString(),
  };
}

export function moveElement(
  doc: DesignDocument,
  pageId: string,
  elementId: string,
  fromIndex: number,
  toIndex: number
): DesignDocument {
  return {
    ...doc,
    pages: doc.pages.map((page) => {
      if (page.id !== pageId) return page;
      const elements = [...page.elements];
      const [removed] = elements.splice(fromIndex, 1);
      elements.splice(toIndex, 0, removed);
      return { ...page, elements };
    }),
    version: doc.version + 1,
    updatedAt: new Date().toISOString(),
  };
}

export function bringToFront(
  doc: DesignDocument,
  pageId: string,
  elementId: string
): DesignDocument {
  return {
    ...doc,
    pages: doc.pages.map((page) => {
      if (page.id !== pageId) return page;
      const idx = page.elements.findIndex((e) => e.id === elementId);
      if (idx === -1 || idx === page.elements.length - 1) return page;
      const elements = [...page.elements];
      const [el] = elements.splice(idx, 1);
      elements.push(el);
      return { ...page, elements };
    }),
    version: doc.version + 1,
    updatedAt: new Date().toISOString(),
  };
}

export function sendToBack(
  doc: DesignDocument,
  pageId: string,
  elementId: string
): DesignDocument {
  return {
    ...doc,
    pages: doc.pages.map((page) => {
      if (page.id !== pageId) return page;
      const idx = page.elements.findIndex((e) => e.id === elementId);
      if (idx <= 0) return page;
      const elements = [...page.elements];
      const [el] = elements.splice(idx, 1);
      elements.unshift(el);
      return { ...page, elements };
    }),
    version: doc.version + 1,
    updatedAt: new Date().toISOString(),
  };
}

// ============================================================
// Serialization
// ============================================================

export function serializeDocument(doc: DesignDocument): string {
  return JSON.stringify(doc);
}

export function deserializeDocument(json: string): DesignDocument {
  const parsed = JSON.parse(json);
  // Validate with schema version check
  if (parsed.schemaVersion && parsed.schemaVersion > 1) {
    throw new Error(`Unsupported schema version: ${parsed.schemaVersion}. Please update the application.`);
  }
  return parsed as DesignDocument;
}

export function cloneDocument(doc: DesignDocument): DesignDocument {
  const cloned = JSON.parse(JSON.stringify(doc)) as DesignDocument;
  cloned.id = uuidv4();
  cloned.version = 0;
  cloned.title = `${doc.title} (Copy)`;
  const now = new Date().toISOString();
  cloned.createdAt = now;
  cloned.updatedAt = now;

  // Reassign IDs for all pages and elements
  for (const page of cloned.pages) {
    page.id = uuidv4();
    reassignElementIds(page.elements);
  }

  return cloned;
}

// ============================================================
// Internal Helpers
// ============================================================

function reassignElementIds(elements: DesignElement[]): void {
  for (const el of elements) {
    el.id = uuidv4();
    if (el.type === 'group' && el.children) {
      reassignElementIds(el.children);
    }
  }
}

// ============================================================
// Document Diff (for autosave optimization)
// ============================================================

export function hasDocumentChanged(a: DesignDocument, b: DesignDocument): boolean {
  if (a.title !== b.title) return true;
  if (a.width !== b.width || a.height !== b.height) return true;
  if (a.pages.length !== b.pages.length) return true;

  for (let i = 0; i < a.pages.length; i++) {
    const pageA = a.pages[i];
    const pageB = b.pages[i];
    if (pageA.id !== pageB.id) return true;
    if (JSON.stringify(pageA.background) !== JSON.stringify(pageB.background)) return true;
    if (pageA.elements.length !== pageB.elements.length) return true;
    if (JSON.stringify(pageA.elements) !== JSON.stringify(pageB.elements)) return true;
  }

  return false;
}

export {
  type DesignDocument,
  type DesignPage,
  type DesignElement,
  type TextElement,
  type ShapeElement,
  type ImageElement,
  type GroupElement,
} from '../../shared-types/src';
