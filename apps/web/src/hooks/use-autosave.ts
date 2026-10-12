// DesignFlow - Autosave Hook
// Debounced autosave with conflict detection and status tracking

'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useEditorStore } from '../store/editor-store';
import type { DesignDocument } from '../../../../packages/shared-types/src';

const AUTOSAVE_DELAY = 2000; // 2 seconds after last change
const PERIODIC_SAVE_INTERVAL = 30000; // 30 seconds periodic save

export function useAutosave() {
  const document = useEditorStore((s) => s.document);
  const documentId = useEditorStore((s) => s.documentId);
  const saveStatus = useEditorStore((s) => s.saveStatus);
  const lastSavedVersion = useEditorStore((s) => s.lastSavedVersion);
  const setSaveStatus = useEditorStore((s) => s.setSaveStatus);
  const markSaved = useEditorStore((s) => s.markSaved);

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const periodicTimer = useRef<NodeJS.Timeout | null>(null);
  const isSaving = useRef(false);
  const lastSavedContent = useRef<string>('');

  const save = useCallback(async () => {
    if (!document || !documentId || isSaving.current) return;

    const currentContent = JSON.stringify(document);
    
    // Skip if content hasn't changed
    if (currentContent === lastSavedContent.current) {
      setSaveStatus('saved');
      return;
    }

    isSaving.current = true;
    setSaveStatus('saving');

    try {
      const response = await fetch(`/api/documents/${documentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: document,
          version: lastSavedVersion,
        }),
      });

      const result = await response.json();

      if (result.success) {
        lastSavedContent.current = currentContent;
        markSaved(result.data.version);
      } else if (response.status === 409) {
        // Version conflict - server has newer version
        console.warn('Version conflict detected. Server version:', result.serverVersion);
        setSaveStatus('error');
        // In production, would show conflict resolution UI
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      console.error('Autosave failed:', error);
      setSaveStatus('error');
    } finally {
      isSaving.current = false;
    }
  }, [document, documentId, lastSavedVersion, setSaveStatus, markSaved]);

  // Debounced save on document changes
  useEffect(() => {
    if (saveStatus !== 'unsaved') return;

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      save();
    }, AUTOSAVE_DELAY);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [document, saveStatus, save]);

  // Periodic save
  useEffect(() => {
    periodicTimer.current = setInterval(() => {
      if (saveStatus === 'unsaved') {
        save();
      }
    }, PERIODIC_SAVE_INTERVAL);

    return () => {
      if (periodicTimer.current) {
        clearInterval(periodicTimer.current);
      }
    };
  }, [saveStatus, save]);

  // Save before unload
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (saveStatus === 'unsaved') {
        e.preventDefault();
        // Attempt synchronous save via beacon
        if (document && documentId) {
          navigator.sendBeacon(
            `/api/documents/${documentId}`,
            new Blob(
              [JSON.stringify({ content: document, version: lastSavedVersion })],
              { type: 'application/json' }
            )
          );
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [document, documentId, saveStatus, lastSavedVersion]);

  return { save, saveStatus };
}
