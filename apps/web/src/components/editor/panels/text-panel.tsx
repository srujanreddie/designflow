'use client';

import React from 'react';
import { useEditorStore } from '@/store/editor-store';
import { Type, Heading1, Heading2, AlignLeft, Sparkles } from 'lucide-react';
import type { TextElement } from '../../../../../../packages/shared-types/src';

interface TextPreset {
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  overrides: Partial<TextElement>;
  previewClass: string;
}

const TEXT_PRESETS: TextPreset[] = [
  {
    label: 'Add a heading',
    sublabel: 'Large title text',
    icon: <Heading1 className="w-5 h-5 text-violet-600" />,
    previewClass: 'text-2xl font-bold tracking-tight',
    overrides: {
      content: 'Add a heading',
      width: 400,
      height: 70,
      style: {
        fontFamily: 'Inter',
        fontSize: 36,
        fontWeight: 'bold',
        fontStyle: 'normal',
        textDecoration: 'none',
        color: { r: 17, g: 24, b: 39, a: 1 },
        lineHeight: 1.2,
        letterSpacing: -0.5,
        textAlign: 'left',
        verticalAlign: 'top',
      },
    },
  },
  {
    label: 'Add a subheading',
    sublabel: 'Medium section title',
    icon: <Heading2 className="w-5 h-5 text-violet-600" />,
    previewClass: 'text-lg font-semibold',
    overrides: {
      content: 'Add a subheading',
      width: 350,
      height: 50,
      style: {
        fontFamily: 'Inter',
        fontSize: 24,
        fontWeight: '600',
        fontStyle: 'normal',
        textDecoration: 'none',
        color: { r: 55, g: 65, b: 81, a: 1 },
        lineHeight: 1.3,
        letterSpacing: 0,
        textAlign: 'left',
        verticalAlign: 'top',
      },
    },
  },
  {
    label: 'Add body text',
    sublabel: 'Paragraph or narrative text',
    icon: <AlignLeft className="w-5 h-5 text-violet-600" />,
    previewClass: 'text-sm font-normal text-slate-600',
    overrides: {
      content: 'Click here to write your body paragraph text. Tell your story, add details, or provide descriptions.',
      width: 320,
      height: 80,
      style: {
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: 'normal',
        fontStyle: 'normal',
        textDecoration: 'none',
        color: { r: 75, g: 85, b: 99, a: 1 },
        lineHeight: 1.5,
        letterSpacing: 0,
        textAlign: 'left',
        verticalAlign: 'top',
      },
    },
  },
];

interface FontCombo {
  title: string;
  category: string;
  headingFont: string;
  bodyFont: string;
}

const FONT_COMBINATIONS: FontCombo[] = [
  {
    title: 'Modern Minimal',
    category: 'Clean & Contemporary',
    headingFont: 'Montserrat',
    bodyFont: 'Inter',
  },
  {
    title: 'Editorial Elegance',
    category: 'Sophisticated & Literary',
    headingFont: 'Playfair Display',
    bodyFont: 'Georgia',
  },
  {
    title: 'Tech Modern',
    category: 'Sharp & Technical',
    headingFont: 'Roboto Mono',
    bodyFont: 'Roboto',
  },
];

export function TextPanel() {
  const addTextElement = useEditorStore((s) => s.addTextElement);

  const handleAddPreset = (overrides: Partial<TextElement>) => {
    addTextElement(overrides);
  };

  const handleAddCombo = (combo: FontCombo) => {
    addTextElement({
      content: combo.title,
      width: 360,
      height: 60,
      style: {
        fontFamily: combo.headingFont,
        fontSize: 32,
        fontWeight: 'bold',
        fontStyle: 'normal',
        textDecoration: 'none',
        color: { r: 17, g: 24, b: 39, a: 1 },
        lineHeight: 1.2,
        letterSpacing: 0,
        textAlign: 'left',
        verticalAlign: 'top',
      },
    });
  };

  return (
    <div className="flex flex-col h-full text-slate-800">
      <div className="p-4 border-b border-slate-200">
        <h2 className="text-base font-semibold text-slate-900 mb-1 flex items-center gap-2">
          <Type className="w-5 h-5 text-violet-600" />
          Text
        </h2>
        <p className="text-xs text-slate-500">
          Click any text block to insert it directly onto your canvas
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Default Text Styles
          </h3>
          <div className="space-y-2">
            {TEXT_PRESETS.map((preset) => (
              <button
                key={preset.label}
                onClick={() => handleAddPreset(preset.overrides)}
                className="w-full text-left p-3.5 rounded-xl border border-slate-200 bg-white hover:bg-violet-50 hover:border-violet-300 hover:shadow-sm transition-all group cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-violet-100 transition-colors">
                    {preset.icon}
                  </div>
                  <div>
                    <div className={`${preset.previewClass} text-slate-900 leading-tight`}>
                      {preset.label}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {preset.sublabel}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-violet-600" />
            Curated Font Pairs
          </h3>
          <div className="space-y-2">
            {FONT_COMBINATIONS.map((combo) => (
              <button
                key={combo.title}
                onClick={() => handleAddCombo(combo)}
                className="w-full text-left p-3 rounded-xl border border-slate-200 bg-white hover:bg-violet-50 hover:border-violet-300 transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-slate-900">
                    {combo.title}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-violet-100 text-violet-700 rounded-full">
                    {combo.category}
                  </span>
                </div>
                <div className="text-xs text-slate-500">
                  {combo.headingFont} + {combo.bodyFont}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
