'use client';

import React, { useEffect, use } from 'react';
import { useParams } from 'next/navigation';
import { useEditorStore } from '@/store/editor-store';
import { createDocument } from '../../../../../../packages/document-model/src';
import { EditorLayout } from '@/components/editor/editor-layout';

interface PageProps {
  params: Promise<{ id: string }> | { id: string };
}

export default function EditorPage(props: PageProps) {
  const routerParams = useParams();
  const idFromRouter = routerParams?.id as string | undefined;

  // Unwrap params if Promise, or fallback to routerParams
  let paramId = idFromRouter || 'default';
  if (props.params) {
    if (typeof (props.params as any).then === 'function') {
      try {
        const unwrapped = use(props.params as Promise<{ id: string }>);
        paramId = unwrapped.id;
      } catch {
        // Fallback to router params if use() is not supported in this runtime
        paramId = idFromRouter || 'default';
      }
    } else {
      paramId = (props.params as { id: string }).id;
    }
  }

  const initDocument = useEditorStore((s) => s.initDocument);
  const setDocumentId = useEditorStore((s) => s.setDocumentId);
  const undo = useEditorStore((s) => s.undo);
  const redo = useEditorStore((s) => s.redo);
  const removeSelectedElements = useEditorStore((s) => s.removeSelectedElements);
  const copySelectedElements = useEditorStore((s) => s.copySelectedElements);
  const pasteElements = useEditorStore((s) => s.pasteElements);
  const selectAll = useEditorStore((s) => s.selectAll);
  const duplicateSelectedElements = useEditorStore((s) => s.duplicateSelectedElements);
  const deselectAll = useEditorStore((s) => s.deselectAll);

  // Initialize document on mount
  useEffect(() => {
    const doc = createDocument({
      title: 'Untitled Design',
      width: 1080,
      height: 1080,
    });
    doc.id = paramId;
    setDocumentId(paramId);
    initDocument(doc);
  }, [paramId, initDocument, setDocumentId]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept shortcuts when editing text inputs
      const activeTag = (document.activeElement?.tagName || '').toLowerCase();
      const isInput =
        activeTag === 'input' ||
        activeTag === 'textarea' ||
        document.activeElement?.getAttribute('contenteditable') === 'true';

      if (isInput) return;

      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      // Undo: Ctrl+Z
      if (cmdOrCtrl && !e.shiftKey && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        undo();
        return;
      }

      // Redo: Ctrl+Shift+Z or Ctrl+Y
      if (
        (cmdOrCtrl && e.shiftKey && e.key.toLowerCase() === 'z') ||
        (cmdOrCtrl && e.key.toLowerCase() === 'y')
      ) {
        e.preventDefault();
        redo();
        return;
      }

      // Delete: Delete or Backspace
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        removeSelectedElements();
        return;
      }

      // Copy: Ctrl+C
      if (cmdOrCtrl && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        copySelectedElements();
        return;
      }

      // Paste: Ctrl+V
      if (cmdOrCtrl && e.key.toLowerCase() === 'v') {
        e.preventDefault();
        pasteElements();
        return;
      }

      // Select All: Ctrl+A
      if (cmdOrCtrl && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        selectAll();
        return;
      }

      // Duplicate: Ctrl+D
      if (cmdOrCtrl && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        duplicateSelectedElements();
        return;
      }

      // Deselect All: Escape
      if (e.key === 'Escape') {
        e.preventDefault();
        deselectAll();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    undo,
    redo,
    removeSelectedElements,
    copySelectedElements,
    pasteElements,
    selectAll,
    duplicateSelectedElements,
    deselectAll,
  ]);

  return <EditorLayout />;
}
