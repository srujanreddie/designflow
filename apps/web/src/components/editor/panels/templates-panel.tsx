'use client';

import React from 'react';
import { useEditorStore } from '@/store/editor-store';
import { LayoutTemplate, Sparkles } from 'lucide-react';
import { OPENSOURCE_TEMPLATES, type OpenSourceTemplate } from '@/lib/templates-catalog';

export function TemplatesPanel() {
  const addShapeElement = useEditorStore((s) => s.addShapeElement);
  const addTextElement = useEditorStore((s) => s.addTextElement);

  const applyTemplate = (template: OpenSourceTemplate) => {
    template.elements.forEach((item) => {
      if (item.type === 'shape') {
        addShapeElement(item.shapeType, item);
      } else if (item.type === 'text') {
        addTextElement(item);
      }
    });
  };

  return (
    <div className="flex flex-col h-full text-slate-800">
      <div className="p-4 border-b border-slate-200">
        <h2 className="text-base font-semibold text-slate-900 mb-1 flex items-center gap-2">
          <LayoutTemplate className="w-5 h-5 text-violet-600" />
          Template Library
        </h2>
        <p className="text-xs text-slate-500">
          Click any layout to insert its components directly onto your active canvas
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {OPENSOURCE_TEMPLATES.map((tmpl) => (
          <div
            key={tmpl.id}
            onClick={() => applyTemplate(tmpl)}
            className="group rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:border-violet-400 hover:shadow-md transition-all cursor-pointer"
          >
            <div
              className={`h-28 w-full p-3.5 flex flex-col justify-between relative bg-gradient-to-r ${tmpl.gradient}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 text-slate-800 backdrop-blur-xs">
                  {tmpl.category}
                </span>
                <span className="text-[10px] font-medium text-white/90">
                  {tmpl.width} × {tmpl.height}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-white text-xs font-semibold drop-shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Add to canvas
              </div>
            </div>
            <div className="p-3">
              <h3 className="text-sm font-semibold text-slate-900 group-hover:text-violet-600 transition-colors">
                {tmpl.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                {tmpl.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
