'use client';

import React, { useRef } from 'react';
import {
  useEditorStore,
  selectFirstSelectedElement,
} from '@/store/editor-store';
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Lock,
  Unlock,
  Trash2,
  ChevronUp,
  ChevronDown,
  ChevronsUp,
  ChevronsDown,
  Layers,
  Sparkles,
  Image as ImageIcon,
  Crop,
  Maximize2,
  Eye,
  Sliders,
} from 'lucide-react';
import type {
  TextElement,
  ShapeElement,
  ImageElement,
  Color,
} from '../../../../../../packages/shared-types/src';

const FONT_FAMILIES = [
  'Inter',
  'Roboto',
  'Playfair Display',
  'Montserrat',
  'Open Sans',
  'Courier New',
  'Georgia',
];

const QUICK_COLORS = [
  '#000000',
  '#ffffff',
  '#6366f1',
  '#8b5cf6',
  '#ec4899',
  '#ef4444',
  '#f59e0b',
  '#10b981',
  '#3b82f6',
];

function colorToHex(color?: Color): string {
  if (!color) return '#000000';
  const r = Math.round(color.r).toString(16).padStart(2, '0');
  const g = Math.round(color.g).toString(16).padStart(2, '0');
  const b = Math.round(color.b).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
}

function hexToRgbaColor(hex: string, alpha = 1): Color {
  let clean = hex.replace('#', '');
  if (clean.length === 3) {
    clean = clean.split('').map((c) => c + c).join('');
  }
  const val = parseInt(clean, 16);
  if (isNaN(val)) return { r: 0, g: 0, b: 0, a: alpha };
  return {
    r: (val >> 16) & 255,
    g: (val >> 8) & 255,
    b: val & 255,
    a: alpha,
  };
}

export function PropertyPanel() {
  const selectedElement = useEditorStore(selectFirstSelectedElement);
  const updateElement = useEditorStore((s) => s.updateElement);
  const removeSelectedElements = useEditorStore((s) => s.removeSelectedElements);
  const lockElement = useEditorStore((s) => s.lockElement);
  const bringToFront = useEditorStore((s) => s.bringToFront);
  const sendToBack = useEditorStore((s) => s.sendToBack);
  const bringForward = useEditorStore((s) => s.bringForward);
  const sendBackward = useEditorStore((s) => s.sendBackward);

  const imageInputRef = useRef<HTMLInputElement>(null);

  if (!selectedElement) {
    return (
      <div className="w-[280px] border-l border-slate-200 bg-white p-6 flex flex-col items-center justify-center text-center text-slate-400">
        <Sliders className="w-8 h-8 mb-2 opacity-30 text-slate-500" />
        <p className="text-sm font-medium text-slate-600">No element selected</p>
        <p className="text-xs text-slate-400 mt-1">
          Select an item on the canvas to inspect and edit its properties
        </p>
      </div>
    );
  }

  const el = selectedElement;
  const isText = el.type === 'text';
  const isShape = el.type === 'shape';
  const isImage = el.type === 'image';

  const textEl = isText ? (el as TextElement) : null;
  const shapeEl = isShape ? (el as ShapeElement) : null;
  const imageEl = isImage ? (el as ImageElement) : null;

  const handleUpdate = (updates: any) => {
    updateElement(el.id, updates);
  };

  const handleTextStyleUpdate = (styleUpdates: any) => {
    if (!textEl) return;
    updateElement(el.id, {
      style: {
        ...textEl.style,
        ...styleUpdates,
      },
    } as any);
  };

  const handleImageReplace = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const src = ev.target?.result as string;
      if (src) {
        handleUpdate({ src });
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <div className="w-[280px] h-full border-l border-slate-200 bg-white flex flex-col overflow-y-auto text-slate-800">
      {/* Panel Header */}
      <div className="p-4 border-b border-slate-200 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">
            {el.type}
          </span>
          <h2 className="text-sm font-semibold text-slate-900 mt-1 truncate">
            {el.name}
          </h2>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => lockElement(el.id, !el.locked)}
            className={`p-1.5 rounded-lg border transition-colors ${
              el.locked
                ? 'bg-amber-50 border-amber-200 text-amber-600'
                : 'border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50'
            }`}
            title={el.locked ? 'Unlock element' : 'Lock element'}
          >
            {el.locked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={removeSelectedElements}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors"
            title="Delete element"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-5 flex-1">
        {/* Transform / Position & Size */}
        <div>
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
            Dimensions & Position
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="text-[11px] text-slate-500 font-medium block mb-1">X Position</label>
              <input
                type="number"
                value={Math.round(el.x)}
                onChange={(e) => handleUpdate({ x: parseFloat(e.target.value) || 0 })}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-violet-500"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-500 font-medium block mb-1">Y Position</label>
              <input
                type="number"
                value={Math.round(el.y)}
                onChange={(e) => handleUpdate({ y: parseFloat(e.target.value) || 0 })}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-violet-500"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-500 font-medium block mb-1">Width</label>
              <input
                type="number"
                value={Math.round(el.width)}
                onChange={(e) => handleUpdate({ width: Math.max(1, parseFloat(e.target.value) || 1) })}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-violet-500"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-500 font-medium block mb-1">Height</label>
              <input
                type="number"
                value={Math.round(el.height)}
                onChange={(e) => handleUpdate({ height: Math.max(1, parseFloat(e.target.value) || 1) })}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-violet-500"
              />
            </div>
          </div>
        </div>

        {/* Rotation */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Rotation</span>
            <span className="text-xs font-mono text-slate-600">{Math.round(el.rotation || 0)}°</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="360"
              value={el.rotation || 0}
              onChange={(e) => handleUpdate({ rotation: parseFloat(e.target.value) })}
              className="w-full accent-violet-600 cursor-pointer"
            />
            <input
              type="number"
              min="0"
              max="360"
              value={Math.round(el.rotation || 0)}
              onChange={(e) => handleUpdate({ rotation: parseFloat(e.target.value) || 0 })}
              className="w-14 px-1.5 py-1 bg-slate-50 border border-slate-200 rounded text-center text-xs font-mono"
            />
          </div>
        </div>

        {/* Opacity */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Opacity</span>
            <span className="text-xs font-mono text-slate-600">
              {Math.round((el.opacity ?? 1) * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={Math.round((el.opacity ?? 1) * 100)}
            onChange={(e) => handleUpdate({ opacity: parseFloat(e.target.value) / 100 })}
            className="w-full accent-violet-600 cursor-pointer"
          />
        </div>

        {/* TEXT SPECIFIC CONTROLS */}
        {isText && textEl && (
          <div className="space-y-4 pt-3 border-t border-slate-200">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Typography
            </h3>

            {/* Font Family */}
            <div>
              <label className="text-[11px] text-slate-500 font-medium block mb-1">Font Family</label>
              <select
                value={textEl.style.fontFamily}
                onChange={(e) => handleTextStyleUpdate({ fontFamily: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-violet-500"
              >
                {FONT_FAMILIES.map((font) => (
                  <option key={font} value={font} style={{ fontFamily: font }}>
                    {font}
                  </option>
                ))}
              </select>
            </div>

            {/* Font Size & Formats */}
            <div className="flex items-center gap-2">
              <div className="w-24">
                <label className="text-[11px] text-slate-500 font-medium block mb-1">Font Size</label>
                <input
                  type="number"
                  min="8"
                  max="200"
                  value={textEl.style.fontSize}
                  onChange={(e) => handleTextStyleUpdate({ fontSize: parseInt(e.target.value) || 16 })}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800"
                />
              </div>

              <div className="flex-1">
                <label className="text-[11px] text-slate-500 font-medium block mb-1">Style</label>
                <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 p-0.5">
                  <button
                    onClick={() =>
                      handleTextStyleUpdate({
                        fontWeight: textEl.style.fontWeight === 'bold' ? 'normal' : 'bold',
                      })
                    }
                    className={`flex-1 p-1 rounded flex items-center justify-center transition-colors ${
                      textEl.style.fontWeight === 'bold'
                        ? 'bg-violet-600 text-white'
                        : 'text-slate-600 hover:bg-slate-200'
                    }`}
                    title="Bold"
                  >
                    <Bold className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() =>
                      handleTextStyleUpdate({
                        fontStyle: textEl.style.fontStyle === 'italic' ? 'normal' : 'italic',
                      })
                    }
                    className={`flex-1 p-1 rounded flex items-center justify-center transition-colors ${
                      textEl.style.fontStyle === 'italic'
                        ? 'bg-violet-600 text-white'
                        : 'text-slate-600 hover:bg-slate-200'
                    }`}
                    title="Italic"
                  >
                    <Italic className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() =>
                      handleTextStyleUpdate({
                        textDecoration:
                          textEl.style.textDecoration === 'underline' ? 'none' : 'underline',
                      })
                    }
                    className={`flex-1 p-1 rounded flex items-center justify-center transition-colors ${
                      textEl.style.textDecoration === 'underline'
                        ? 'bg-violet-600 text-white'
                        : 'text-slate-600 hover:bg-slate-200'
                    }`}
                    title="Underline"
                  >
                    <Underline className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Text Alignment */}
            <div>
              <label className="text-[11px] text-slate-500 font-medium block mb-1">Alignment</label>
              <div className="flex border border-slate-200 rounded-lg bg-slate-50 p-0.5">
                {(['left', 'center', 'right'] as const).map((align) => (
                  <button
                    key={align}
                    onClick={() => handleTextStyleUpdate({ textAlign: align })}
                    className={`flex-1 p-1.5 rounded flex items-center justify-center capitalize transition-colors ${
                      textEl.style.textAlign === align
                        ? 'bg-white shadow-xs text-violet-600 font-semibold'
                        : 'text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    {align === 'left' && <AlignLeft className="w-3.5 h-3.5" />}
                    {align === 'center' && <AlignCenter className="w-3.5 h-3.5" />}
                    {align === 'right' && <AlignRight className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Text Color */}
            <div>
              <label className="text-[11px] text-slate-500 font-medium block mb-1">Text Color</label>
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="color"
                  value={colorToHex(textEl.style.color)}
                  onChange={(e) =>
                    handleTextStyleUpdate({ color: hexToRgbaColor(e.target.value) })
                  }
                  className="w-8 h-8 rounded border border-slate-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={colorToHex(textEl.style.color)}
                  onChange={(e) => {
                    if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
                      handleTextStyleUpdate({ color: hexToRgbaColor(e.target.value) });
                    }
                  }}
                  className="flex-1 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono uppercase"
                />
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {QUICK_COLORS.map((hex) => (
                  <button
                    key={hex}
                    onClick={() => handleTextStyleUpdate({ color: hexToRgbaColor(hex) })}
                    className="w-5 h-5 rounded-full border border-slate-300 cursor-pointer hover:scale-110 transition-transform"
                    style={{ backgroundColor: hex }}
                  />
                ))}
              </div>
            </div>

            {/* Line Height & Letter Spacing */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-[11px] text-slate-500 font-medium block mb-1">Line Height</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.5"
                  max="3"
                  value={textEl.style.lineHeight || 1.4}
                  onChange={(e) =>
                    handleTextStyleUpdate({ lineHeight: parseFloat(e.target.value) || 1.4 })
                  }
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-500 font-medium block mb-1">Letter Spacing</label>
                <input
                  type="number"
                  step="0.5"
                  value={textEl.style.letterSpacing || 0}
                  onChange={(e) =>
                    handleTextStyleUpdate({ letterSpacing: parseFloat(e.target.value) || 0 })
                  }
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>
            </div>
          </div>
        )}

        {/* SHAPE SPECIFIC CONTROLS */}
        {isShape && shapeEl && (
          <div className="space-y-4 pt-3 border-t border-slate-200">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Appearance
            </h3>

            {/* Fill Color */}
            <div>
              <label className="text-[11px] text-slate-500 font-medium block mb-1">Fill Color</label>
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="color"
                  value={
                    shapeEl.fill.type === 'solid'
                      ? colorToHex(shapeEl.fill.color)
                      : '#6366f1'
                  }
                  onChange={(e) =>
                    handleUpdate({
                      fill: { type: 'solid', color: hexToRgbaColor(e.target.value) },
                    })
                  }
                  className="w-8 h-8 rounded border border-slate-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={
                    shapeEl.fill.type === 'solid'
                      ? colorToHex(shapeEl.fill.color)
                      : '#6366f1'
                  }
                  onChange={(e) => {
                    if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
                      handleUpdate({
                        fill: { type: 'solid', color: hexToRgbaColor(e.target.value) },
                      });
                    }
                  }}
                  className="flex-1 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono uppercase"
                />
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {QUICK_COLORS.map((hex) => (
                  <button
                    key={hex}
                    onClick={() =>
                      handleUpdate({
                        fill: { type: 'solid', color: hexToRgbaColor(hex) },
                      })
                    }
                    className="w-5 h-5 rounded-full border border-slate-300 cursor-pointer hover:scale-110 transition-transform"
                    style={{ backgroundColor: hex }}
                  />
                ))}
              </div>
            </div>

            {/* Stroke */}
            <div>
              <label className="text-[11px] text-slate-500 font-medium block mb-1">Stroke (Border)</label>
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="color"
                  value={colorToHex(shapeEl.stroke)}
                  onChange={(e) =>
                    handleUpdate({
                      stroke: hexToRgbaColor(e.target.value),
                    })
                  }
                  className="w-8 h-8 rounded border border-slate-300 cursor-pointer"
                />
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={shapeEl.strokeWidth || 0}
                  placeholder="Width"
                  onChange={(e) =>
                    handleUpdate({
                      strokeWidth: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-20 px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
                <span className="text-xs text-slate-400">px</span>
              </div>
            </div>

            {/* Corner Radius (for Rectangles) */}
            {shapeEl.shapeType === 'rectangle' && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] text-slate-500 font-medium">Corner Radius</span>
                  <span className="text-xs font-mono text-slate-600">{shapeEl.cornerRadius || 0}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={shapeEl.cornerRadius || 0}
                  onChange={(e) =>
                    handleUpdate({ cornerRadius: parseInt(e.target.value) || 0 })
                  }
                  className="w-full accent-violet-600 cursor-pointer"
                />
              </div>
            )}
          </div>
        )}

        {/* IMAGE SPECIFIC CONTROLS */}
        {isImage && imageEl && (
          <div className="space-y-4 pt-3 border-t border-slate-200">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Image Settings
            </h3>

            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageReplace}
            />

            <button
              onClick={() => imageInputRef.current?.click()}
              className="w-full py-2 px-3 bg-violet-50 hover:bg-violet-100 text-violet-700 rounded-lg text-xs font-medium border border-violet-200 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              Replace Image File
            </button>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Original Res</span>
                <span className="font-mono">{imageEl.originalWidth} × {imageEl.originalHeight}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Aspect Ratio</span>
                <span className="font-mono">
                  {(imageEl.width / (imageEl.height || 1)).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Layer Controls */}
        <div className="pt-3 border-t border-slate-200">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
            Layer Order
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => bringForward(el.id)}
              className="p-2 border border-slate-200 rounded-lg bg-slate-50 hover:bg-slate-100 flex items-center gap-1.5 justify-center font-medium transition-colors"
            >
              <ChevronUp className="w-3.5 h-3.5" />
              Forward
            </button>
            <button
              onClick={() => sendBackward(el.id)}
              className="p-2 border border-slate-200 rounded-lg bg-slate-50 hover:bg-slate-100 flex items-center gap-1.5 justify-center font-medium transition-colors"
            >
              <ChevronDown className="w-3.5 h-3.5" />
              Backward
            </button>
            <button
              onClick={() => bringToFront(el.id)}
              className="p-2 border border-slate-200 rounded-lg bg-slate-50 hover:bg-slate-100 flex items-center gap-1.5 justify-center font-medium transition-colors"
            >
              <ChevronsUp className="w-3.5 h-3.5" />
              To Front
            </button>
            <button
              onClick={() => sendToBack(el.id)}
              className="p-2 border border-slate-200 rounded-lg bg-slate-50 hover:bg-slate-100 flex items-center gap-1.5 justify-center font-medium transition-colors"
            >
              <ChevronsDown className="w-3.5 h-3.5" />
              To Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
