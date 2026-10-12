'use client';

import React from 'react';
import { useEditorStore } from '@/store/editor-store';
import { FileText, Plus, Copy, Trash2, Eye } from 'lucide-react';
import type { BackgroundConfig, Color } from '../../../../../../packages/shared-types/src';

function getBackgroundStyle(bg: BackgroundConfig): React.CSSProperties {
  if (bg.type === 'color') {
    const c = bg.color;
    return { backgroundColor: `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a ?? 1})` };
  }
  if (bg.type === 'gradient') {
    const g = bg.gradient;
    if (g.type === 'linear-gradient') {
      const stopsStr = g.stops
        .map((s) => `rgba(${s.color.r}, ${s.color.g}, ${s.color.b}, ${s.color.a ?? 1}) ${s.offset * 100}%`)
        .join(', ');
      return { background: `linear-gradient(${g.angle || 135}deg, ${stopsStr})` };
    }
  }
  return { backgroundColor: '#ffffff' };
}

export function PagesPanel() {
  const document = useEditorStore((s) => s.document);
  const activePageId = useEditorStore((s) => s.activePageId);
  const setActivePage = useEditorStore((s) => s.setActivePage);
  const addPage = useEditorStore((s) => s.addPage);
  const removePage = useEditorStore((s) => s.removePage);
  const duplicatePage = useEditorStore((s) => s.duplicatePage);

  const pages = document?.pages || [];

  return (
    <div className="flex flex-col h-full text-slate-800">
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-violet-600" />
            Pages
          </h2>
          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
            {pages.length} {pages.length === 1 ? 'page' : 'pages'}
          </span>
        </div>
        <p className="text-xs text-slate-500 mb-3">
          Manage, add, and reorder document pages
        </p>

        <button
          onClick={addPage}
          className="w-full py-2.5 px-4 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add New Page
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {pages.map((page, index) => {
          const isActive = page.id === activePageId;
          const bgStyle = getBackgroundStyle(page.background);

          return (
            <div
              key={page.id}
              onClick={() => setActivePage(page.id)}
              className={`p-3 rounded-xl border transition-all cursor-pointer group ${
                isActive
                  ? 'border-violet-500 bg-violet-50/40 shadow-sm ring-2 ring-violet-500/20'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Thumbnail */}
                <div
                  className="w-16 h-12 rounded-lg border border-slate-300 shadow-sm flex items-center justify-center relative overflow-hidden flex-shrink-0"
                  style={bgStyle}
                >
                  <span className="text-xs font-bold text-slate-600/80 bg-white/70 px-1.5 py-0.5 rounded shadow-xs">
                    {index + 1}
                  </span>
                  {page.elements.length > 0 && (
                    <span className="absolute bottom-1 right-1 text-[9px] text-slate-500 font-semibold bg-white/80 px-1 rounded">
                      {page.elements.length}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-sm font-medium truncate ${
                        isActive ? 'text-violet-900 font-semibold' : 'text-slate-800'
                      }`}
                    >
                      {page.name || `Page ${index + 1}`}
                    </span>
                    {isActive && (
                      <span className="text-[10px] bg-violet-100 text-violet-700 px-1.5 py-0.2 rounded font-semibold">
                        Active
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {page.elements.length} {page.elements.length === 1 ? 'element' : 'elements'}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      duplicatePage(page.id);
                    }}
                    className="p-1.5 hover:bg-slate-200 rounded-md text-slate-500 hover:text-slate-800 transition-colors"
                    title="Duplicate page"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  {pages.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removePage(page.id);
                      }}
                      className="p-1.5 hover:bg-red-50 rounded-md text-slate-400 hover:text-red-600 transition-colors"
                      title="Delete page"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
