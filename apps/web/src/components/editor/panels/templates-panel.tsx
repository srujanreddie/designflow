'use client';

import React from 'react';
import { useEditorStore } from '@/store/editor-store';
import { LayoutTemplate, Sparkles } from 'lucide-react';

interface TemplateItem {
  id: string;
  name: string;
  description: string;
  category: string;
  previewGradient: string;
  elements: Array<{
    type: 'text' | 'shape';
    data: any;
  }>;
}

const TEMPLATES: TemplateItem[] = [
  {
    id: 'social-post',
    name: 'Instagram Quote',
    description: 'Clean modern inspirational post',
    category: 'Social Media',
    previewGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    elements: [
      {
        type: 'shape',
        data: {
          shapeType: 'rectangle',
          x: 140,
          y: 200,
          width: 800,
          height: 680,
          fill: { type: 'solid', color: { r: 255, g: 255, b: 255, a: 0.95 } },
          cornerRadius: 24,
        },
      },
      {
        type: 'text',
        data: {
          content: '“Creativity is intelligence having fun.”',
          x: 200,
          y: 360,
          width: 680,
          height: 150,
          style: {
            fontFamily: 'Playfair Display',
            fontSize: 44,
            fontWeight: 'bold',
            color: { r: 17, g: 24, b: 39, a: 1 },
            textAlign: 'center',
          },
        },
      },
      {
        type: 'text',
        data: {
          content: '— Albert Einstein',
          x: 200,
          y: 560,
          width: 680,
          height: 50,
          style: {
            fontFamily: 'Inter',
            fontSize: 22,
            fontWeight: 'normal',
            color: { r: 107, g: 114, b: 128, a: 1 },
            textAlign: 'center',
          },
        },
      },
    ],
  },
  {
    id: 'sale-banner',
    name: 'Super Sale Banner',
    description: 'Eye-catching promotional design',
    category: 'Marketing',
    previewGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    elements: [
      {
        type: 'shape',
        data: {
          shapeType: 'circle',
          x: 100,
          y: 100,
          width: 320,
          height: 320,
          fill: { type: 'solid', color: { r: 254, g: 240, b: 138, a: 0.9 } },
        },
      },
      {
        type: 'text',
        data: {
          content: 'SUMMER SALE',
          x: 120,
          y: 350,
          width: 840,
          height: 100,
          style: {
            fontFamily: 'Montserrat',
            fontSize: 64,
            fontWeight: 'bold',
            color: { r: 17, g: 24, b: 39, a: 1 },
            textAlign: 'center',
          },
        },
      },
      {
        type: 'text',
        data: {
          content: 'UP TO 50% OFF EVERYTHING',
          x: 120,
          y: 470,
          width: 840,
          height: 60,
          style: {
            fontFamily: 'Inter',
            fontSize: 28,
            fontWeight: '600',
            color: { r: 244, g: 63, b: 94, a: 1 },
            textAlign: 'center',
          },
        },
      },
    ],
  },
];

export function TemplatesPanel() {
  const addShapeElement = useEditorStore((s) => s.addShapeElement);
  const addTextElement = useEditorStore((s) => s.addTextElement);

  const applyTemplate = (template: TemplateItem) => {
    template.elements.forEach((item) => {
      if (item.type === 'shape') {
        addShapeElement(item.data.shapeType, item.data);
      } else if (item.type === 'text') {
        addTextElement(item.data);
      }
    });
  };

  return (
    <div className="flex flex-col h-full text-slate-800">
      <div className="p-4 border-b border-slate-200">
        <h2 className="text-base font-semibold text-slate-900 mb-1 flex items-center gap-2">
          <LayoutTemplate className="w-5 h-5 text-violet-600" />
          Templates
        </h2>
        <p className="text-xs text-slate-500">
          Kickstart your design with pre-built layouts
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {TEMPLATES.map((tmpl) => (
          <div
            key={tmpl.id}
            onClick={() => applyTemplate(tmpl)}
            className="group rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:border-violet-400 hover:shadow-md transition-all cursor-pointer"
          >
            <div
              className="h-32 w-full p-4 flex flex-col justify-between relative"
              style={{ background: tmpl.previewGradient }}
            >
              <span className="self-start text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/80 text-slate-800">
                {tmpl.category}
              </span>
              <div className="flex items-center gap-1 text-white text-xs font-semibold drop-shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                Click to load elements
              </div>
            </div>
            <div className="p-3">
              <h3 className="text-sm font-semibold text-slate-900 group-hover:text-violet-600 transition-colors">
                {tmpl.name}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {tmpl.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
