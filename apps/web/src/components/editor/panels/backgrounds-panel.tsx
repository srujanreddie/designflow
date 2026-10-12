'use client';

import React, { useState } from 'react';
import { useEditorStore, selectActivePage } from '@/store/editor-store';
import { Palette, Check, Sparkles } from 'lucide-react';
import type { BackgroundConfig, Color } from '../../../../../../packages/shared-types/src';

const SOLID_COLORS = [
  '#ffffff', '#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1',
  '#000000', '#0f172a', '#1e293b', '#334155', '#475569',
  '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16',
  '#10b981', '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1',
  '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e',
];

interface GradientPreset {
  name: string;
  css: string;
  config: BackgroundConfig;
}

const GRADIENT_PRESETS: GradientPreset[] = [
  {
    name: 'Sunset Glow',
    css: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    config: {
      type: 'gradient',
      fill: {
        type: 'linear-gradient',
        angle: 135,
        stops: [
          { offset: 0, color: { r: 240, g: 147, b: 251, a: 1 } },
          { offset: 1, color: { r: 245, g: 87, b: 108, a: 1 } },
        ],
      },
    },
  },
  {
    name: 'Ocean Breeze',
    css: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    config: {
      type: 'gradient',
      fill: {
        type: 'linear-gradient',
        angle: 135,
        stops: [
          { offset: 0, color: { r: 79, g: 172, b: 254, a: 1 } },
          { offset: 1, color: { r: 0, g: 242, b: 254, a: 1 } },
        ],
      },
    },
  },
  {
    name: 'Neon Violet',
    css: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    config: {
      type: 'gradient',
      fill: {
        type: 'linear-gradient',
        angle: 135,
        stops: [
          { offset: 0, color: { r: 102, g: 126, b: 234, a: 1 } },
          { offset: 1, color: { r: 118, g: 75, b: 162, a: 1 } },
        ],
      },
    },
  },
  {
    name: 'Emerald Forest',
    css: 'linear-gradient(135deg, #0ba360 0%, #3cba92 100%)',
    config: {
      type: 'gradient',
      fill: {
        type: 'linear-gradient',
        angle: 135,
        stops: [
          { offset: 0, color: { r: 11, g: 163, b: 96, a: 1 } },
          { offset: 1, color: { r: 60, g: 186, b: 146, a: 1 } },
        ],
      },
    },
  },
  {
    name: 'Midnight Dark',
    css: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
    config: {
      type: 'gradient',
      fill: {
        type: 'linear-gradient',
        angle: 135,
        stops: [
          { offset: 0, color: { r: 31, g: 41, b: 55, a: 1 } },
          { offset: 1, color: { r: 17, g: 24, b: 39, a: 1 } },
        ],
      },
    },
  },
  {
    name: 'Cotton Candy',
    css: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
    config: {
      type: 'gradient',
      fill: {
        type: 'linear-gradient',
        angle: 135,
        stops: [
          { offset: 0, color: { r: 255, g: 154, b: 158, a: 1 } },
          { offset: 1, color: { r: 254, g: 207, b: 239, a: 1 } },
        ],
      },
    },
  },
];

function hexToRgbaColor(hex: string): Color {
  let clean = hex.replace('#', '');
  if (clean.length === 3) {
    clean = clean.split('').map((c) => c + c).join('');
  }
  const val = parseInt(clean, 16);
  if (isNaN(val)) return { r: 255, g: 255, b: 255, a: 1 };
  return {
    r: (val >> 16) & 255,
    g: (val >> 8) & 255,
    b: val & 255,
    a: 1,
  };
}

function colorToHex(color: Color): string {
  const r = Math.round(color.r).toString(16).padStart(2, '0');
  const g = Math.round(color.g).toString(16).padStart(2, '0');
  const b = Math.round(color.b).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
}

export function BackgroundsPanel() {
  const activePage = useEditorStore(selectActivePage);
  const activePageId = useEditorStore((s) => s.activePageId);
  const setPageBackground = useEditorStore((s) => s.setPageBackground);

  const [customHex, setCustomHex] = useState(
    activePage?.background.type === 'color'
      ? colorToHex(activePage.background.color)
      : '#ffffff'
  );

  const currentColorHex =
    activePage?.background.type === 'color'
      ? colorToHex(activePage.background.color).toLowerCase()
      : null;

  const handleSelectColor = (hex: string) => {
    if (!activePageId) return;
    setCustomHex(hex);
    setPageBackground(activePageId, {
      type: 'color',
      color: hexToRgbaColor(hex),
    });
  };

  const handleSelectGradient = (gradientConfig: BackgroundConfig) => {
    if (!activePageId) return;
    setPageBackground(activePageId, gradientConfig);
  };

  const handleCustomHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomHex(val);
    if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
      if (activePageId) {
        setPageBackground(activePageId, {
          type: 'color',
          color: hexToRgbaColor(val),
        });
      }
    }
  };

  return (
    <div className="flex flex-col h-full text-slate-800">
      <div className="p-4 border-b border-slate-200">
        <h2 className="text-base font-semibold text-slate-900 mb-1 flex items-center gap-2">
          <Palette className="w-5 h-5 text-violet-600" />
          Page Background
        </h2>
        <p className="text-xs text-slate-500">
          Customize page canvas color and gradients
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Custom Color Input */}
        <div>
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
            Custom Color
          </h3>
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-slate-300 shadow-sm flex-shrink-0">
              <input
                type="color"
                value={customHex.startsWith('#') && customHex.length === 7 ? customHex : '#ffffff'}
                onChange={(e) => handleSelectColor(e.target.value)}
                className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer border-0"
              />
            </div>
            <div className="relative flex-1">
              <input
                type="text"
                value={customHex}
                onChange={handleCustomHexChange}
                placeholder="#FFFFFF"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono text-slate-800 uppercase focus:outline-none focus:ring-2 focus:ring-violet-500"
                maxLength={7}
              />
            </div>
          </div>
        </div>

        {/* Solid Colors Swatches */}
        <div>
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
            Solid Colors
          </h3>
          <div className="grid grid-cols-5 gap-2">
            {SOLID_COLORS.map((hex) => {
              const isSelected = currentColorHex === hex.toLowerCase();
              return (
                <button
                  key={hex}
                  onClick={() => handleSelectColor(hex)}
                  className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                    isSelected
                      ? 'ring-2 ring-violet-500 ring-offset-2 scale-105 border-transparent'
                      : 'border-slate-200 hover:scale-105'
                  }`}
                  style={{ backgroundColor: hex }}
                  title={hex}
                >
                  {isSelected && (
                    <Check
                      className={`w-4 h-4 ${
                        hex === '#ffffff' || hex === '#f8fafc' || hex === '#f1f5f9' || hex === '#e2e8f0'
                          ? 'text-slate-900'
                          : 'text-white'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gradient Presets */}
        <div>
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-violet-600" />
            Gradient Styles
          </h3>
          <div className="grid grid-cols-2 gap-2.5">
            {GRADIENT_PRESETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => handleSelectGradient(preset.config)}
                className="h-16 rounded-xl border border-slate-200 overflow-hidden relative group hover:scale-[1.02] hover:shadow-md transition-all cursor-pointer flex items-end p-2"
                style={{ background: preset.css }}
              >
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 text-[11px] font-semibold text-white drop-shadow-md">
                  {preset.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
