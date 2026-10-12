// DesignFlow - Editor Store (Zustand)
// Central state management for the design editor

import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type {
  DesignDocument,
  DesignPage,
  DesignElement,
  TextElement,
  ShapeElement,
  ImageElement,
  BackgroundConfig,
  Color,
  Fill,
  ExportSettings,
} from '@packages/shared-types/src';
import {
  CommandHistory,
  AddElementCommand,
  RemoveElementCommand,
  UpdateElementCommand,
  MoveElementCommand,
  ResizeElementCommand,
  RotateElementCommand,
  ReorderElementCommand,
  AddPageCommand,
  RemovePageCommand,
  UpdatePageBackgroundCommand,
  BatchCommand,
  type EditorCommand,
} from '@packages/editor-engine/src';
import {
  createDocument,
  createPage,
  createTextElement,
  createShapeElement,
  createImageElement,
} from '@packages/document-model/src';

// ============================================================
// Editor State Types
// ============================================================

export type Tool =
  | 'select'
  | 'text'
  | 'shape'
  | 'pan'
  | 'crop';

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error' | 'unsaved';

export type SidebarPanel =
  | 'templates'
  | 'elements'
  | 'text'
  | 'uploads'
  | 'shapes'
  | 'backgrounds'
  | 'pages'
  | 'layers'
  | null;

export interface EditorState {
  // Document
  document: DesignDocument | null;
  documentId: string | null;

  // Selection
  selectedElementIds: string[];
  activePageId: string | null;

  // Tool
  activeTool: Tool;
  activeShapeType: ShapeElement['shapeType'];

  // Viewport
  zoom: number;
  panX: number;
  panY: number;

  // UI State
  sidebarPanel: SidebarPanel;
  showGrid: boolean;
  snapToGrid: boolean;
  snapToObjects: boolean;
  gridSize: number;

  // Save State
  saveStatus: SaveStatus;
  lastSavedVersion: number;

  // History
  history: CommandHistory;
  canUndo: boolean;
  canRedo: boolean;

  // Clipboard
  clipboard: DesignElement[];

  // Collaboration (stub for now)
  collaborators: Array<{
    userId: string;
    name: string;
    color: string;
    cursorX?: number;
    cursorY?: number;
  }>;
}

export interface EditorActions {
  // Document Management
  initDocument: (doc: DesignDocument) => void;
  setDocumentId: (id: string) => void;
  updateDocumentTitle: (title: string) => void;
  getDocument: () => DesignDocument | null;

  // Page Operations
  setActivePage: (pageId: string) => void;
  addPage: () => void;
  removePage: (pageId: string) => void;
  duplicatePage: (pageId: string) => void;
  setPageBackground: (pageId: string, bg: BackgroundConfig) => void;

  // Element Operations
  addElement: (element: DesignElement) => void;
  addTextElement: (overrides?: Partial<TextElement>) => void;
  addShapeElement: (shapeType?: ShapeElement['shapeType'], overrides?: Partial<ShapeElement>) => void;
  addImageElement: (src: string, width: number, height: number) => void;
  removeSelectedElements: () => void;
  removeElement: (elementId: string) => void;
  updateElement: (elementId: string, updates: Partial<DesignElement>) => void;
  moveElement: (elementId: string, x: number, y: number, oldX: number, oldY: number) => void;
  resizeElement: (
    elementId: string,
    newProps: { x: number; y: number; width: number; height: number },
    oldProps: { x: number; y: number; width: number; height: number }
  ) => void;
  rotateElement: (elementId: string, rotation: number, oldRotation: number) => void;
  duplicateSelectedElements: () => void;
  lockElement: (elementId: string, locked: boolean) => void;
  toggleElementVisibility: (elementId: string) => void;

  // Layer Operations
  bringToFront: (elementId: string) => void;
  sendToBack: (elementId: string) => void;
  bringForward: (elementId: string) => void;
  sendBackward: (elementId: string) => void;

  // Selection
  selectElement: (elementId: string, addToSelection?: boolean) => void;
  selectAll: () => void;
  deselectAll: () => void;

  // Tools
  setTool: (tool: Tool) => void;
  setActiveShapeType: (shapeType: ShapeElement['shapeType']) => void;

  // Viewport
  setZoom: (zoom: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  zoomToFit: () => void;
  resetZoom: () => void;
  setPan: (x: number, y: number) => void;

  // UI
  setSidebarPanel: (panel: SidebarPanel) => void;
  toggleGrid: () => void;
  toggleSnapToGrid: () => void;
  toggleSnapToObjects: () => void;

  // History
  undo: () => void;
  redo: () => void;

  // Clipboard
  copySelectedElements: () => void;
  cutSelectedElements: () => void;
  pasteElements: () => void;

  // Save
  setSaveStatus: (status: SaveStatus) => void;
  markSaved: (version: number) => void;

  // Internal
  _executeCommand: (command: EditorCommand) => void;
}

export type EditorStore = EditorState & EditorActions;

// ============================================================
// Store Implementation
// ============================================================

export const useEditorStore = create<EditorStore>((set, get) => ({
  // ---- Initial State ----
  document: null,
  documentId: null,
  selectedElementIds: [],
  activePageId: null,
  activeTool: 'select',
  activeShapeType: 'rectangle',
  zoom: 1,
  panX: 0,
  panY: 0,
  sidebarPanel: 'elements',
  showGrid: false,
  snapToGrid: true,
  snapToObjects: true,
  gridSize: 10,
  saveStatus: 'idle',
  lastSavedVersion: 0,
  history: new CommandHistory(100),
  canUndo: false,
  canRedo: false,
  clipboard: [],
  collaborators: [],

  // ---- Document Management ----
  initDocument: (doc) => {
    set({
      document: doc,
      activePageId: doc.pages[0]?.id || null,
      selectedElementIds: [],
      saveStatus: 'idle',
      lastSavedVersion: doc.version,
      zoom: 1,
      panX: 0,
      panY: 0,
    });
    get().history.clear();
    set({ canUndo: false, canRedo: false });
  },

  setDocumentId: (id) => set({ documentId: id }),

  updateDocumentTitle: (title) => {
    const doc = get().document;
    if (!doc) return;
    set({
      document: { ...doc, title, updatedAt: new Date().toISOString() },
      saveStatus: 'unsaved',
    });
  },

  getDocument: () => get().document,

  // ---- Page Operations ----
  setActivePage: (pageId) => {
    set({ activePageId: pageId, selectedElementIds: [] });
  },

  addPage: () => {
    const { document: doc, activePageId } = get();
    if (!doc) return;
    const newPage = createPage(`Page ${doc.pages.length + 1}`);
    const cmd = new AddPageCommand(newPage);
    get()._executeCommand(cmd);
    set({ activePageId: newPage.id });
  },

  removePage: (pageId) => {
    const { document: doc } = get();
    if (!doc || doc.pages.length <= 1) return;
    const cmd = new RemovePageCommand(pageId);
    get()._executeCommand(cmd);
    // Switch to another page if we removed the active one
    const { activePageId } = get();
    if (activePageId === pageId) {
      const newDoc = get().document!;
      set({ activePageId: newDoc.pages[0]?.id || null, selectedElementIds: [] });
    }
  },

  duplicatePage: (pageId) => {
    const { document: doc } = get();
    if (!doc) return;
    const pageIndex = doc.pages.findIndex((p) => p.id === pageId);
    if (pageIndex === -1) return;

    const original = doc.pages[pageIndex];
    const duplicate: DesignPage = JSON.parse(JSON.stringify(original));
    duplicate.id = uuidv4();
    duplicate.name = `${original.name} (Copy)`;
    // Reassign element IDs
    for (const el of duplicate.elements) {
      el.id = uuidv4();
    }

    const cmd = new AddPageCommand(duplicate, pageIndex + 1);
    get()._executeCommand(cmd);
  },

  setPageBackground: (pageId, bg) => {
    const cmd = new UpdatePageBackgroundCommand(pageId, bg);
    get()._executeCommand(cmd);
  },

  // ---- Element Operations ----
  addElement: (element) => {
    const { activePageId } = get();
    if (!activePageId) return;
    const cmd = new AddElementCommand(activePageId, element);
    get()._executeCommand(cmd);
    set({ selectedElementIds: [element.id], activeTool: 'select', saveStatus: 'unsaved' });
  },

  addTextElement: (overrides) => {
    const el = createTextElement(overrides);
    get().addElement(el);
  },

  addShapeElement: (shapeType, overrides) => {
    const el = createShapeElement(shapeType || get().activeShapeType, overrides);
    get().addElement(el);
  },

  addImageElement: (src, width, height) => {
    const el = createImageElement(src, width, height);
    get().addElement(el);
  },

  removeSelectedElements: () => {
    const { selectedElementIds, activePageId, document: doc } = get();
    if (!activePageId || !doc || selectedElementIds.length === 0) return;

    if (selectedElementIds.length === 1) {
      const cmd = new RemoveElementCommand(activePageId, selectedElementIds[0]);
      get()._executeCommand(cmd);
    } else {
      const commands = selectedElementIds.map(
        (id) => new RemoveElementCommand(activePageId, id)
      );
      const batch = new BatchCommand(commands, `Remove ${commands.length} elements`);
      get()._executeCommand(batch);
    }
    set({ selectedElementIds: [] });
  },

  removeElement: (elementId) => {
    const { activePageId } = get();
    if (!activePageId) return;
    const cmd = new RemoveElementCommand(activePageId, elementId);
    get()._executeCommand(cmd);
    set((state) => ({
      selectedElementIds: state.selectedElementIds.filter((id) => id !== elementId),
    }));
  },

  updateElement: (elementId, updates) => {
    const { activePageId } = get();
    if (!activePageId) return;
    const cmd = new UpdateElementCommand(activePageId, elementId, updates);
    get()._executeCommand(cmd);
  },

  moveElement: (elementId, x, y, oldX, oldY) => {
    const { activePageId } = get();
    if (!activePageId) return;
    const cmd = new MoveElementCommand(activePageId, elementId, x, y, oldX, oldY);
    get()._executeCommand(cmd);
  },

  resizeElement: (elementId, newProps, oldProps) => {
    const { activePageId } = get();
    if (!activePageId) return;
    const cmd = new ResizeElementCommand(activePageId, elementId, newProps, oldProps);
    get()._executeCommand(cmd);
  },

  rotateElement: (elementId, rotation, oldRotation) => {
    const { activePageId } = get();
    if (!activePageId) return;
    const cmd = new RotateElementCommand(activePageId, elementId, rotation, oldRotation);
    get()._executeCommand(cmd);
  },

  duplicateSelectedElements: () => {
    const { selectedElementIds, activePageId, document: doc } = get();
    if (!activePageId || !doc) return;

    const page = doc.pages.find((p) => p.id === activePageId);
    if (!page) return;

    const newIds: string[] = [];
    const commands: EditorCommand[] = [];

    for (const id of selectedElementIds) {
      const el = page.elements.find((e) => e.id === id);
      if (!el) continue;
      const clone: DesignElement = {
        ...JSON.parse(JSON.stringify(el)),
        id: uuidv4(),
        x: el.x + 20,
        y: el.y + 20,
        name: `${el.name} (Copy)`,
      };
      newIds.push(clone.id);
      commands.push(new AddElementCommand(activePageId, clone));
    }

    if (commands.length > 0) {
      const batch = new BatchCommand(commands, `Duplicate ${commands.length} elements`);
      get()._executeCommand(batch);
      set({ selectedElementIds: newIds });
    }
  },

  lockElement: (elementId, locked) => {
    get().updateElement(elementId, { locked } as any);
  },

  toggleElementVisibility: (elementId) => {
    const { document: doc, activePageId } = get();
    if (!doc || !activePageId) return;
    const page = doc.pages.find((p) => p.id === activePageId);
    const el = page?.elements.find((e) => e.id === elementId);
    if (el) {
      get().updateElement(elementId, { visible: !el.visible } as any);
    }
  },

  // ---- Layer Operations ----
  bringToFront: (elementId) => {
    const { activePageId, document: doc } = get();
    if (!activePageId || !doc) return;
    const page = doc.pages.find((p) => p.id === activePageId);
    if (!page) return;
    const idx = page.elements.findIndex((e) => e.id === elementId);
    if (idx === -1 || idx === page.elements.length - 1) return;
    const cmd = new ReorderElementCommand(activePageId, elementId, idx, page.elements.length - 1);
    get()._executeCommand(cmd);
  },

  sendToBack: (elementId) => {
    const { activePageId, document: doc } = get();
    if (!activePageId || !doc) return;
    const page = doc.pages.find((p) => p.id === activePageId);
    if (!page) return;
    const idx = page.elements.findIndex((e) => e.id === elementId);
    if (idx <= 0) return;
    const cmd = new ReorderElementCommand(activePageId, elementId, idx, 0);
    get()._executeCommand(cmd);
  },

  bringForward: (elementId) => {
    const { activePageId, document: doc } = get();
    if (!activePageId || !doc) return;
    const page = doc.pages.find((p) => p.id === activePageId);
    if (!page) return;
    const idx = page.elements.findIndex((e) => e.id === elementId);
    if (idx === -1 || idx === page.elements.length - 1) return;
    const cmd = new ReorderElementCommand(activePageId, elementId, idx, idx + 1);
    get()._executeCommand(cmd);
  },

  sendBackward: (elementId) => {
    const { activePageId, document: doc } = get();
    if (!activePageId || !doc) return;
    const page = doc.pages.find((p) => p.id === activePageId);
    if (!page) return;
    const idx = page.elements.findIndex((e) => e.id === elementId);
    if (idx <= 0) return;
    const cmd = new ReorderElementCommand(activePageId, elementId, idx, idx - 1);
    get()._executeCommand(cmd);
  },

  // ---- Selection ----
  selectElement: (elementId, addToSelection = false) => {
    set((state) => {
      if (addToSelection) {
        const exists = state.selectedElementIds.includes(elementId);
        return {
          selectedElementIds: exists
            ? state.selectedElementIds.filter((id) => id !== elementId)
            : [...state.selectedElementIds, elementId],
        };
      }
      return { selectedElementIds: [elementId] };
    });
  },

  selectAll: () => {
    const { document: doc, activePageId } = get();
    if (!doc || !activePageId) return;
    const page = doc.pages.find((p) => p.id === activePageId);
    if (page) {
      set({ selectedElementIds: page.elements.map((e) => e.id) });
    }
  },

  deselectAll: () => set({ selectedElementIds: [] }),

  // ---- Tools ----
  setTool: (tool) => set({ activeTool: tool }),
  setActiveShapeType: (shapeType) => set({ activeShapeType: shapeType }),

  // ---- Viewport ----
  setZoom: (zoom) => set({ zoom: Math.max(0.1, Math.min(5, zoom)) }),
  zoomIn: () => set((s) => ({ zoom: Math.min(5, s.zoom + 0.1) })),
  zoomOut: () => set((s) => ({ zoom: Math.max(0.1, s.zoom - 0.1) })),
  zoomToFit: () => set({ zoom: 1, panX: 0, panY: 0 }),
  resetZoom: () => set({ zoom: 1 }),
  setPan: (x, y) => set({ panX: x, panY: y }),

  // ---- UI ----
  setSidebarPanel: (panel) => set({ sidebarPanel: panel }),
  toggleGrid: () => set((s) => ({ showGrid: !s.showGrid })),
  toggleSnapToGrid: () => set((s) => ({ snapToGrid: !s.snapToGrid })),
  toggleSnapToObjects: () => set((s) => ({ snapToObjects: !s.snapToObjects })),

  // ---- History ----
  undo: () => {
    const { document: doc, history } = get();
    if (!doc) return;
    const result = history.undo(doc);
    if (result) {
      set({
        document: result,
        canUndo: history.canUndo(),
        canRedo: history.canRedo(),
        saveStatus: 'unsaved',
      });
    }
  },

  redo: () => {
    const { document: doc, history } = get();
    if (!doc) return;
    const result = history.redo(doc);
    if (result) {
      set({
        document: result,
        canUndo: history.canUndo(),
        canRedo: history.canRedo(),
        saveStatus: 'unsaved',
      });
    }
  },

  // ---- Clipboard ----
  copySelectedElements: () => {
    const { selectedElementIds, document: doc, activePageId } = get();
    if (!doc || !activePageId) return;
    const page = doc.pages.find((p) => p.id === activePageId);
    if (!page) return;
    const copied = page.elements.filter((e) => selectedElementIds.includes(e.id));
    set({ clipboard: JSON.parse(JSON.stringify(copied)) });
  },

  cutSelectedElements: () => {
    get().copySelectedElements();
    get().removeSelectedElements();
  },

  pasteElements: () => {
    const { clipboard, activePageId } = get();
    if (!activePageId || clipboard.length === 0) return;

    const newIds: string[] = [];
    const commands: EditorCommand[] = [];

    for (const el of clipboard) {
      const clone: DesignElement = {
        ...JSON.parse(JSON.stringify(el)),
        id: uuidv4(),
        x: el.x + 20,
        y: el.y + 20,
      };
      newIds.push(clone.id);
      commands.push(new AddElementCommand(activePageId, clone));
    }

    const batch = new BatchCommand(commands, `Paste ${commands.length} elements`);
    get()._executeCommand(batch);
    set({ selectedElementIds: newIds });
  },

  // ---- Save ----
  setSaveStatus: (status) => set({ saveStatus: status }),
  markSaved: (version) => set({ saveStatus: 'saved', lastSavedVersion: version }),

  // ---- Internal ----
  _executeCommand: (command) => {
    const { document: doc, history } = get();
    if (!doc) return;
    const result = history.execute(command, doc);
    set({
      document: result,
      canUndo: history.canUndo(),
      canRedo: history.canRedo(),
      saveStatus: 'unsaved',
    });
  },
}));

// ============================================================
// Selectors for performance
// ============================================================

export const selectActivePage = (state: EditorStore) => {
  if (!state.document || !state.activePageId) return null;
  return state.document.pages.find((p) => p.id === state.activePageId) || null;
};

export const selectActiveElements = (state: EditorStore) => {
  const page = selectActivePage(state);
  return page?.elements || [];
};

export const selectSelectedElements = (state: EditorStore) => {
  const page = selectActivePage(state);
  if (!page) return [];
  return page.elements.filter((e) => state.selectedElementIds.includes(e.id));
};

export const selectFirstSelectedElement = (state: EditorStore) => {
  const selected = selectSelectedElements(state);
  return selected[0] || null;
};
