'use client';

import React from 'react';
import { useEditorStore, selectActiveElements } from '@/store/editor-store';
import {
  Layers,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  GripVertical,
  Type,
  Square,
  Circle as CircleIcon,
  Triangle as TriangleIcon,
  Star as StarIcon,
  Minus,
  MoveRight,
  Image as ImageIcon,
  ChevronUp,
  ChevronDown,
  Trash2,
} from 'lucide-react';
import type { DesignElement, ShapeElement } from '../../../../../../packages/shared-types/src';

export function LayersPanel() {
  const elements = useEditorStore(selectActiveElements);
  const selectedElementIds = useEditorStore((s) => s.selectedElementIds);
  const selectElement = useEditorStore((s) => s.selectElement);
  const toggleElementVisibility = useEditorStore((s) => s.toggleElementVisibility);
  const lockElement = useEditorStore((s) => s.lockElement);
  const bringToFront = useEditorStore((s) => s.bringToFront);
  const sendToBack = useEditorStore((s) => s.sendToBack);
  const bringForward = useEditorStore((s) => s.bringForward);
  const sendBackward = useEditorStore((s) => s.sendBackward);
  const removeElement = useEditorStore((s) => s.removeElement);

  // In standard canvas/graphics stacks, array index 0 is at bottom, last is top.
  // We list in reverse order so topmost elements appear at the top of the layer list!
  const reversedElements = [...elements].reverse();

  const getElementIcon = (element: DesignElement) => {
    switch (element.type) {
      case 'text':
        return <Type className="w-4 h-4 text-indigo-500" />;
      case 'shape': {
        const shape = element as ShapeElement;
        switch (shape.shapeType) {
          case 'rectangle':
            return <Square className="w-4 h-4 text-violet-500" />;
          case 'circle':
            return <CircleIcon className="w-4 h-4 text-violet-500" />;
          case 'triangle':
            return <TriangleIcon className="w-4 h-4 text-violet-500" />;
          case 'star':
            return <StarIcon className="w-4 h-4 text-violet-500" />;
          case 'line':
            return <Minus className="w-4 h-4 text-violet-500" />;
          case 'arrow':
            return <MoveRight className="w-4 h-4 text-violet-500" />;
          default:
            return <Square className="w-4 h-4 text-violet-500" />;
        }
      }
      case 'image':
        return <ImageIcon className="w-4 h-4 text-emerald-500" />;
      default:
        return <Layers className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="flex flex-col h-full text-slate-800">
      <div className="p-4 border-b border-slate-200">
        <h2 className="text-base font-semibold text-slate-900 mb-1 flex items-center gap-2">
          <Layers className="w-5 h-5 text-violet-600" />
          Layers
        </h2>
        <p className="text-xs text-slate-500">
          Manage layer stacking order and visibility ({elements.length})
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {reversedElements.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <Layers className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p className="text-xs font-medium">No elements on this page</p>
            <p className="text-[11px] mt-1">Add shapes, text, or images to begin</p>
          </div>
        ) : (
          reversedElements.map((el) => {
            const isSelected = selectedElementIds.includes(el.id);
            return (
              <div
                key={el.id}
                onClick={() => selectElement(el.id, false)}
                className={`group flex items-center justify-between p-2.5 rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-violet-50 border-violet-300 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <div className="text-slate-400 cursor-grab opacity-40 group-hover:opacity-100">
                    <GripVertical className="w-3.5 h-3.5" />
                  </div>
                  <div className="p-1 rounded bg-slate-100 group-hover:bg-white flex-shrink-0">
                    {getElementIcon(el)}
                  </div>
                  <span
                    className={`text-xs font-medium truncate ${
                      isSelected ? 'text-violet-900 font-semibold' : 'text-slate-700'
                    }`}
                  >
                    {el.name || (el.type === 'text' ? (el as any).content : el.type)}
                  </span>
                </div>

                <div className="flex items-center gap-1 opacity-70 group-hover:opacity-100 ml-2">
                  {/* Layer ordering quick buttons */}
                  {isSelected && (
                    <div className="flex items-center mr-1 gap-0.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          bringForward(el.id);
                        }}
                        className="p-1 hover:bg-violet-200/50 rounded text-slate-600"
                        title="Bring Forward"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          sendBackward(el.id);
                        }}
                        className="p-1 hover:bg-violet-200/50 rounded text-slate-600"
                        title="Send Backward"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Lock Toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      lockElement(el.id, !el.locked);
                    }}
                    className={`p-1 rounded hover:bg-slate-200/60 transition-colors ${
                      el.locked ? 'text-amber-600' : 'text-slate-400 hover:text-slate-700'
                    }`}
                    title={el.locked ? 'Unlock element' : 'Lock element'}
                  >
                    {el.locked ? (
                      <Lock className="w-3.5 h-3.5" />
                    ) : (
                      <Unlock className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {/* Visibility Toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleElementVisibility(el.id);
                    }}
                    className={`p-1 rounded hover:bg-slate-200/60 transition-colors ${
                      !el.visible ? 'text-slate-400' : 'text-slate-500 hover:text-slate-700'
                    }`}
                    title={el.visible ? 'Hide element' : 'Show element'}
                  >
                    {el.visible ? (
                      <Eye className="w-3.5 h-3.5" />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {/* Delete button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeElement(el.id);
                    }}
                    className="p-1 rounded hover:bg-red-50 hover:text-red-600 text-slate-400 transition-colors"
                    title="Delete layer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
