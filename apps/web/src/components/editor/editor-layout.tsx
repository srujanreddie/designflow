'use client';

import React from 'react';
import { Toolbar } from './toolbar';
import { Sidebar } from './sidebar';
import { DesignCanvas } from './canvas/design-canvas';
import { PropertyPanel } from './panels/property-panel';
import { CanvasProvider } from './canvas-context';
import { useEditorStore } from '@/store/editor-store';

export function EditorLayout() {
  const selectedElementIds = useEditorStore((s) => s.selectedElementIds);
  const hasSelectedElement = selectedElementIds.length > 0;

  return (
    <CanvasProvider>
      <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-100 select-none">
        {/* Top Toolbar */}
        <Toolbar />

        {/* Editor Main Body */}
        <div className="flex flex-1 w-full h-[calc(100vh-56px)] overflow-hidden relative">
          {/* Left Sidebar (Icons + Panel) */}
          <Sidebar />

          {/* Center Canvas Area */}
          <main className="flex-1 h-full relative overflow-hidden bg-slate-100 flex items-center justify-center">
            <DesignCanvas />
          </main>

          {/* Right Property Panel (Shown when an element is selected) */}
          {hasSelectedElement && (
            <aside className="h-full z-20 flex-shrink-0 animate-in slide-in-from-right duration-150">
              <PropertyPanel />
            </aside>
          )}
        </div>
      </div>
    </CanvasProvider>
  );
}
