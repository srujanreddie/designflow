// DesignFlow - Editor Engine
// Command-based editing operations with undo/redo support

import { v4 as uuidv4 } from 'uuid';
import type {
  DesignDocument,
  DesignPage,
  DesignElement,
  TextElement,
  ShapeElement,
  ImageElement,
  Color,
  BackgroundConfig,
} from '../../shared-types/src';

// ============================================================
// Command Interface
// ============================================================

export interface EditorCommand {
  id: string;
  type: string;
  description: string;
  execute(doc: DesignDocument): DesignDocument;
  undo(doc: DesignDocument): DesignDocument;
}

// ============================================================
// Command History
// ============================================================

export class CommandHistory {
  private undoStack: EditorCommand[] = [];
  private redoStack: EditorCommand[] = [];
  private maxSize: number;

  constructor(maxSize = 100) {
    this.maxSize = maxSize;
  }

  execute(command: EditorCommand, doc: DesignDocument): DesignDocument {
    const result = command.execute(doc);
    this.undoStack.push(command);
    this.redoStack = []; // Clear redo stack on new command

    // Limit stack size
    if (this.undoStack.length > this.maxSize) {
      this.undoStack.shift();
    }

    return result;
  }

  undo(doc: DesignDocument): DesignDocument | null {
    const command = this.undoStack.pop();
    if (!command) return null;

    const result = command.undo(doc);
    this.redoStack.push(command);
    return result;
  }

  redo(doc: DesignDocument): DesignDocument | null {
    const command = this.redoStack.pop();
    if (!command) return null;

    const result = command.execute(doc);
    this.undoStack.push(command);
    return result;
  }

  canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  canRedo(): boolean {
    return this.redoStack.length > 0;
  }

  clear(): void {
    this.undoStack = [];
    this.redoStack = [];
  }

  get undoCount(): number {
    return this.undoStack.length;
  }

  get redoCount(): number {
    return this.redoStack.length;
  }
}

// ============================================================
// Concrete Commands
// ============================================================

export class AddElementCommand implements EditorCommand {
  id = uuidv4();
  type = 'add-element';
  description: string;

  constructor(
    private pageId: string,
    private element: DesignElement,
  ) {
    this.description = `Add ${element.type}: ${element.name}`;
  }

  execute(doc: DesignDocument): DesignDocument {
    return {
      ...doc,
      pages: doc.pages.map((page) =>
        page.id === this.pageId
          ? { ...page, elements: [...page.elements, this.element] }
          : page
      ),
      version: doc.version + 1,
      updatedAt: new Date().toISOString(),
    };
  }

  undo(doc: DesignDocument): DesignDocument {
    return {
      ...doc,
      pages: doc.pages.map((page) =>
        page.id === this.pageId
          ? { ...page, elements: page.elements.filter((e) => e.id !== this.element.id) }
          : page
      ),
      version: doc.version + 1,
      updatedAt: new Date().toISOString(),
    };
  }
}

export class RemoveElementCommand implements EditorCommand {
  id = uuidv4();
  type = 'remove-element';
  description: string;
  private removedElement: DesignElement | null = null;
  private removedIndex: number = -1;

  constructor(
    private pageId: string,
    private elementId: string,
  ) {
    this.description = `Remove element`;
  }

  execute(doc: DesignDocument): DesignDocument {
    // Store the removed element and its index for undo
    const page = doc.pages.find((p) => p.id === this.pageId);
    if (page) {
      this.removedIndex = page.elements.findIndex((e) => e.id === this.elementId);
      this.removedElement = page.elements[this.removedIndex] || null;
    }

    return {
      ...doc,
      pages: doc.pages.map((page) =>
        page.id === this.pageId
          ? { ...page, elements: page.elements.filter((e) => e.id !== this.elementId) }
          : page
      ),
      version: doc.version + 1,
      updatedAt: new Date().toISOString(),
    };
  }

  undo(doc: DesignDocument): DesignDocument {
    if (!this.removedElement) return doc;

    return {
      ...doc,
      pages: doc.pages.map((page) => {
        if (page.id !== this.pageId) return page;
        const elements = [...page.elements];
        elements.splice(this.removedIndex, 0, this.removedElement!);
        return { ...page, elements };
      }),
      version: doc.version + 1,
      updatedAt: new Date().toISOString(),
    };
  }
}

export class UpdateElementCommand implements EditorCommand {
  id = uuidv4();
  type = 'update-element';
  description: string;
  private previousState: Partial<DesignElement> = {};

  constructor(
    private pageId: string,
    private elementId: string,
    private updates: Partial<DesignElement>,
  ) {
    this.description = `Update element`;
  }

  execute(doc: DesignDocument): DesignDocument {
    // Store previous values for undo
    const page = doc.pages.find((p) => p.id === this.pageId);
    const element = page?.elements.find((e) => e.id === this.elementId);
    if (element) {
      this.previousState = {};
      for (const key of Object.keys(this.updates)) {
        (this.previousState as any)[key] = (element as any)[key];
      }
    }

    return {
      ...doc,
      pages: doc.pages.map((page) =>
        page.id === this.pageId
          ? {
              ...page,
              elements: page.elements.map((e) =>
                e.id === this.elementId
                  ? ({ ...e, ...this.updates } as DesignElement)
                  : e
              ),
            }
          : page
      ),
      version: doc.version + 1,
      updatedAt: new Date().toISOString(),
    };
  }

  undo(doc: DesignDocument): DesignDocument {
    return {
      ...doc,
      pages: doc.pages.map((page) =>
        page.id === this.pageId
          ? {
              ...page,
              elements: page.elements.map((e) =>
                e.id === this.elementId
                  ? ({ ...e, ...this.previousState } as DesignElement)
                  : e
              ),
            }
          : page
      ),
      version: doc.version + 1,
      updatedAt: new Date().toISOString(),
    };
  }
}

export class MoveElementCommand implements EditorCommand {
  id = uuidv4();
  type = 'move-element';
  description = 'Move element';

  constructor(
    private pageId: string,
    private elementId: string,
    private newX: number,
    private newY: number,
    private oldX: number,
    private oldY: number,
  ) {}

  execute(doc: DesignDocument): DesignDocument {
    return {
      ...doc,
      pages: doc.pages.map((page) =>
        page.id === this.pageId
          ? {
              ...page,
              elements: page.elements.map((e) =>
                e.id === this.elementId
                  ? ({ ...e, x: this.newX, y: this.newY } as DesignElement)
                  : e
              ),
            }
          : page
      ),
      version: doc.version + 1,
      updatedAt: new Date().toISOString(),
    };
  }

  undo(doc: DesignDocument): DesignDocument {
    return {
      ...doc,
      pages: doc.pages.map((page) =>
        page.id === this.pageId
          ? {
              ...page,
              elements: page.elements.map((e) =>
                e.id === this.elementId
                  ? ({ ...e, x: this.oldX, y: this.oldY } as DesignElement)
                  : e
              ),
            }
          : page
      ),
      version: doc.version + 1,
      updatedAt: new Date().toISOString(),
    };
  }
}

export class ResizeElementCommand implements EditorCommand {
  id = uuidv4();
  type = 'resize-element';
  description = 'Resize element';

  constructor(
    private pageId: string,
    private elementId: string,
    private newProps: { x: number; y: number; width: number; height: number },
    private oldProps: { x: number; y: number; width: number; height: number },
  ) {}

  execute(doc: DesignDocument): DesignDocument {
    return {
      ...doc,
      pages: doc.pages.map((page) =>
        page.id === this.pageId
          ? {
              ...page,
              elements: page.elements.map((e) =>
                e.id === this.elementId
                  ? ({ ...e, ...this.newProps } as DesignElement)
                  : e
              ),
            }
          : page
      ),
      version: doc.version + 1,
      updatedAt: new Date().toISOString(),
    };
  }

  undo(doc: DesignDocument): DesignDocument {
    return {
      ...doc,
      pages: doc.pages.map((page) =>
        page.id === this.pageId
          ? {
              ...page,
              elements: page.elements.map((e) =>
                e.id === this.elementId
                  ? ({ ...e, ...this.oldProps } as DesignElement)
                  : e
              ),
            }
          : page
      ),
      version: doc.version + 1,
      updatedAt: new Date().toISOString(),
    };
  }
}

export class RotateElementCommand implements EditorCommand {
  id = uuidv4();
  type = 'rotate-element';
  description = 'Rotate element';

  constructor(
    private pageId: string,
    private elementId: string,
    private newRotation: number,
    private oldRotation: number,
  ) {}

  execute(doc: DesignDocument): DesignDocument {
    return {
      ...doc,
      pages: doc.pages.map((page) =>
        page.id === this.pageId
          ? {
              ...page,
              elements: page.elements.map((e) =>
                e.id === this.elementId
                  ? ({ ...e, rotation: this.newRotation } as DesignElement)
                  : e
              ),
            }
          : page
      ),
      version: doc.version + 1,
      updatedAt: new Date().toISOString(),
    };
  }

  undo(doc: DesignDocument): DesignDocument {
    return {
      ...doc,
      pages: doc.pages.map((page) =>
        page.id === this.pageId
          ? {
              ...page,
              elements: page.elements.map((e) =>
                e.id === this.elementId
                  ? ({ ...e, rotation: this.oldRotation } as DesignElement)
                  : e
              ),
            }
          : page
      ),
      version: doc.version + 1,
      updatedAt: new Date().toISOString(),
    };
  }
}

export class ReorderElementCommand implements EditorCommand {
  id = uuidv4();
  type = 'reorder-element';
  description: string;

  constructor(
    private pageId: string,
    private elementId: string,
    private fromIndex: number,
    private toIndex: number,
  ) {
    this.description = `Reorder element ${fromIndex} → ${toIndex}`;
  }

  execute(doc: DesignDocument): DesignDocument {
    return {
      ...doc,
      pages: doc.pages.map((page) => {
        if (page.id !== this.pageId) return page;
        const elements = [...page.elements];
        const [el] = elements.splice(this.fromIndex, 1);
        elements.splice(this.toIndex, 0, el);
        return { ...page, elements };
      }),
      version: doc.version + 1,
      updatedAt: new Date().toISOString(),
    };
  }

  undo(doc: DesignDocument): DesignDocument {
    return {
      ...doc,
      pages: doc.pages.map((page) => {
        if (page.id !== this.pageId) return page;
        const elements = [...page.elements];
        const [el] = elements.splice(this.toIndex, 1);
        elements.splice(this.fromIndex, 0, el);
        return { ...page, elements };
      }),
      version: doc.version + 1,
      updatedAt: new Date().toISOString(),
    };
  }
}

export class AddPageCommand implements EditorCommand {
  id = uuidv4();
  type = 'add-page';
  description = 'Add page';

  constructor(
    private page: DesignPage,
    private index?: number,
  ) {}

  execute(doc: DesignDocument): DesignDocument {
    const pages = [...doc.pages];
    if (this.index !== undefined) {
      pages.splice(this.index, 0, this.page);
    } else {
      pages.push(this.page);
    }
    return { ...doc, pages, version: doc.version + 1, updatedAt: new Date().toISOString() };
  }

  undo(doc: DesignDocument): DesignDocument {
    return {
      ...doc,
      pages: doc.pages.filter((p) => p.id !== this.page.id),
      version: doc.version + 1,
      updatedAt: new Date().toISOString(),
    };
  }
}

export class RemovePageCommand implements EditorCommand {
  id = uuidv4();
  type = 'remove-page';
  description = 'Remove page';
  private removedPage: DesignPage | null = null;
  private removedIndex: number = -1;

  constructor(private pageId: string) {}

  execute(doc: DesignDocument): DesignDocument {
    this.removedIndex = doc.pages.findIndex((p) => p.id === this.pageId);
    this.removedPage = doc.pages[this.removedIndex] || null;

    if (doc.pages.length <= 1) return doc; // Can't remove last page

    return {
      ...doc,
      pages: doc.pages.filter((p) => p.id !== this.pageId),
      version: doc.version + 1,
      updatedAt: new Date().toISOString(),
    };
  }

  undo(doc: DesignDocument): DesignDocument {
    if (!this.removedPage) return doc;
    const pages = [...doc.pages];
    pages.splice(this.removedIndex, 0, this.removedPage);
    return { ...doc, pages, version: doc.version + 1, updatedAt: new Date().toISOString() };
  }
}

export class UpdatePageBackgroundCommand implements EditorCommand {
  id = uuidv4();
  type = 'update-page-background';
  description = 'Update background';
  private previousBackground: BackgroundConfig | null = null;

  constructor(
    private pageId: string,
    private background: BackgroundConfig,
  ) {}

  execute(doc: DesignDocument): DesignDocument {
    const page = doc.pages.find((p) => p.id === this.pageId);
    if (page) this.previousBackground = page.background;

    return {
      ...doc,
      pages: doc.pages.map((p) =>
        p.id === this.pageId ? { ...p, background: this.background } : p
      ),
      version: doc.version + 1,
      updatedAt: new Date().toISOString(),
    };
  }

  undo(doc: DesignDocument): DesignDocument {
    if (!this.previousBackground) return doc;
    return {
      ...doc,
      pages: doc.pages.map((p) =>
        p.id === this.pageId ? { ...p, background: this.previousBackground! } : p
      ),
      version: doc.version + 1,
      updatedAt: new Date().toISOString(),
    };
  }
}

export class BatchCommand implements EditorCommand {
  id = uuidv4();
  type = 'batch';
  description: string;

  constructor(
    private commands: EditorCommand[],
    description?: string,
  ) {
    this.description = description || `Batch (${commands.length} operations)`;
  }

  execute(doc: DesignDocument): DesignDocument {
    let result = doc;
    for (const cmd of this.commands) {
      result = cmd.execute(result);
    }
    return result;
  }

  undo(doc: DesignDocument): DesignDocument {
    let result = doc;
    for (let i = this.commands.length - 1; i >= 0; i--) {
      result = this.commands[i].undo(result);
    }
    return result;
  }
}
