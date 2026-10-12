// DesignFlow - Keyboard Shortcuts Hook
// Global keyboard shortcut handler for the editor

'use client';

import { useEffect, useCallback } from 'react';
import { useEditorStore } from '../store/editor-store';

export function useKeyboardShortcuts() {
  const undo = useEditorStore((s) => s.undo);
  const redo = useEditorStore((s) => s.redo);
  const removeSelectedElements = useEditorStore((s) => s.removeSelectedElements);
  const copySelectedElements = useEditorStore((s) => s.copySelectedElements);
  const cutSelectedElements = useEditorStore((s) => s.cutSelectedElements);
  const pasteElements = useEditorStore((s) => s.pasteElements);
  const selectAll = useEditorStore((s) => s.selectAll);
  const deselectAll = useEditorStore((s) => s.deselectAll);
  const duplicateSelectedElements = useEditorStore((s) => s.duplicateSelectedElements);
  const setTool = useEditorStore((s) => s.setTool);
  const zoomIn = useEditorStore((s) => s.zoomIn);
  const zoomOut = useEditorStore((s) => s.zoomOut);
  const resetZoom = useEditorStore((s) => s.resetZoom);
  const toggleGrid = useEditorStore((s) => s.toggleGrid);
  const bringToFront = useEditorStore((s) => s.bringToFront);
  const sendToBack = useEditorStore((s) => s.sendToBack);
  const selectedElementIds = useEditorStore((s) => s.selectedElementIds);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Don't handle shortcuts when typing in inputs
    const target = e.target as HTMLElement;
    if (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.contentEditable === 'true'
    ) {
      // Still allow Escape in inputs
      if (e.key === 'Escape') {
        (target as HTMLElement).blur();
        deselectAll();
        e.preventDefault();
      }
      return;
    }

    const isCtrl = e.ctrlKey || e.metaKey;
    const isShift = e.shiftKey;

    // Undo: Ctrl+Z
    if (isCtrl && !isShift && e.key === 'z') {
      e.preventDefault();
      undo();
      return;
    }

    // Redo: Ctrl+Shift+Z or Ctrl+Y
    if ((isCtrl && isShift && e.key === 'z') || (isCtrl && e.key === 'y')) {
      e.preventDefault();
      redo();
      return;
    }

    // Copy: Ctrl+C
    if (isCtrl && e.key === 'c') {
      e.preventDefault();
      copySelectedElements();
      return;
    }

    // Cut: Ctrl+X
    if (isCtrl && e.key === 'x') {
      e.preventDefault();
      cutSelectedElements();
      return;
    }

    // Paste: Ctrl+V
    if (isCtrl && e.key === 'v') {
      e.preventDefault();
      pasteElements();
      return;
    }

    // Select All: Ctrl+A
    if (isCtrl && e.key === 'a') {
      e.preventDefault();
      selectAll();
      return;
    }

    // Duplicate: Ctrl+D
    if (isCtrl && e.key === 'd') {
      e.preventDefault();
      duplicateSelectedElements();
      return;
    }

    // Delete: Delete or Backspace
    if (e.key === 'Delete' || e.key === 'Backspace') {
      e.preventDefault();
      removeSelectedElements();
      return;
    }

    // Escape: Deselect
    if (e.key === 'Escape') {
      e.preventDefault();
      deselectAll();
      setTool('select');
      return;
    }

    // Tool shortcuts
    if (e.key === 'v' || e.key === 'V') {
      setTool('select');
      return;
    }
    if (e.key === 't' || e.key === 'T') {
      setTool('text');
      return;
    }
    if (e.key === 'r' || e.key === 'R') {
      setTool('shape');
      return;
    }
    if (e.key === 'h' || e.key === 'H') {
      setTool('pan');
      return;
    }

    // Zoom: Ctrl+= (zoom in), Ctrl+- (zoom out), Ctrl+0 (reset)
    if (isCtrl && (e.key === '=' || e.key === '+')) {
      e.preventDefault();
      zoomIn();
      return;
    }
    if (isCtrl && e.key === '-') {
      e.preventDefault();
      zoomOut();
      return;
    }
    if (isCtrl && e.key === '0') {
      e.preventDefault();
      resetZoom();
      return;
    }

    // Toggle grid: Ctrl+'
    if (isCtrl && e.key === "'") {
      e.preventDefault();
      toggleGrid();
      return;
    }

    // Bring to front: Ctrl+]
    if (isCtrl && e.key === ']' && selectedElementIds.length === 1) {
      e.preventDefault();
      bringToFront(selectedElementIds[0]);
      return;
    }

    // Send to back: Ctrl+[
    if (isCtrl && e.key === '[' && selectedElementIds.length === 1) {
      e.preventDefault();
      sendToBack(selectedElementIds[0]);
      return;
    }
  }, [
    undo, redo, removeSelectedElements, copySelectedElements, cutSelectedElements,
    pasteElements, selectAll, deselectAll, duplicateSelectedElements, setTool,
    zoomIn, zoomOut, resetZoom, toggleGrid, bringToFront, sendToBack,
    selectedElementIds,
  ]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
