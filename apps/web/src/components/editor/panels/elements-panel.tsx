'use client';

import React, { useState } from 'react';
import { useEditorStore } from '@/store/editor-store';
import {
  Square,
  Circle as CircleIcon,
  Triangle as TriangleIcon,
  Star as StarIcon,
  Minus,
  MoveRight,
  Search,
  Shapes,
} from 'lucide-react';
import type { ShapeElement } from '../../../../../../packages/shared-types/src';

interface ShapeItem {
  id: ShapeElement['shapeType'];
  name: string;
  category: 'basic' | 'lines' | 'geometric';
  icon: React.ReactNode;
}

const SHAPE_ITEMS: ShapeItem[] = [
  {
    id: 'rectangle',
    name: 'Rectangle',
    category: 'basic',
    icon: <Square className="w-8 h-8 text-violet-600" fill="currentColor" fillOpacity={0.2} strokeWidth={1.5} />,
  },
  {
    id: 'circle',
    name: 'Circle',
    category: 'basic',
    icon: <CircleIcon className="w-8 h-8 text-violet-600" fill="currentColor" fillOpacity={0.2} strokeWidth={1.5} />,
  },
  {
    id: 'triangle',
    name: 'Triangle',
    category: 'basic',
    icon: <TriangleIcon className="w-8 h-8 text-violet-600" fill="currentColor" fillOpacity={0.2} strokeWidth={1.5} />,
  },
  {
    id: 'star',
    name: 'Star',
    category: 'geometric',
    icon: <StarIcon className="w-8 h-8 text-violet-600" fill="currentColor" fillOpacity={0.2} strokeWidth={1.5} />,
  },
  {
    id: 'line',
    name: 'Line',
    category: 'lines',
    icon: <Minus className="w-8 h-8 text-violet-600" strokeWidth={2.5} />,
  },
  {
    id: 'arrow',
    name: 'Arrow',
    category: 'lines',
    icon: <MoveRight className="w-8 h-8 text-violet-600" strokeWidth={2} />,
  },
];

export function ElementsPanel() {
  const [searchQuery, setSearchQuery] = useState('');
  const addShapeElement = useEditorStore((s) => s.addShapeElement);

  const filteredShapes = SHAPE_ITEMS.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const basicShapes = filteredShapes.filter((s) => s.category === 'basic');
  const lineShapes = filteredShapes.filter((s) => s.category === 'lines');
  const geometricShapes = filteredShapes.filter((s) => s.category === 'geometric');

  const handleAddShape = (shapeType: ShapeElement['shapeType']) => {
    addShapeElement(shapeType);
  };

  return (
    <div className="flex flex-col h-full text-slate-800">
      <div className="p-4 border-b border-slate-200">
        <h2 className="text-base font-semibold text-slate-900 mb-3 flex items-center gap-2">
          <Shapes className="w-5 h-5 text-violet-600" />
          Shapes & Elements
        </h2>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search elements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {basicShapes.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Basic Shapes
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {basicShapes.map((shape) => (
                <button
                  key={shape.id}
                  onClick={() => handleAddShape(shape.id)}
                  className="flex flex-col items-center justify-center p-3 rounded-lg border border-slate-200 bg-white hover:bg-violet-50 hover:border-violet-300 hover:shadow-sm transition-all group cursor-pointer"
                  title={`Add ${shape.name}`}
                >
                  <div className="group-hover:scale-110 transition-transform">
                    {shape.icon}
                  </div>
                  <span className="text-xs text-slate-600 mt-2 font-medium">
                    {shape.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {lineShapes.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Lines & Connectors
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {lineShapes.map((shape) => (
                <button
                  key={shape.id}
                  onClick={() => handleAddShape(shape.id)}
                  className="flex flex-col items-center justify-center p-3 rounded-lg border border-slate-200 bg-white hover:bg-violet-50 hover:border-violet-300 hover:shadow-sm transition-all group cursor-pointer"
                  title={`Add ${shape.name}`}
                >
                  <div className="group-hover:scale-110 transition-transform">
                    {shape.icon}
                  </div>
                  <span className="text-xs text-slate-600 mt-2 font-medium">
                    {shape.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {geometricShapes.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Decorative & Geometric
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {geometricShapes.map((shape) => (
                <button
                  key={shape.id}
                  onClick={() => handleAddShape(shape.id)}
                  className="flex flex-col items-center justify-center p-3 rounded-lg border border-slate-200 bg-white hover:bg-violet-50 hover:border-violet-300 hover:shadow-sm transition-all group cursor-pointer"
                  title={`Add ${shape.name}`}
                >
                  <div className="group-hover:scale-110 transition-transform">
                    {shape.icon}
                  </div>
                  <span className="text-xs text-slate-600 mt-2 font-medium">
                    {shape.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {filteredShapes.length === 0 && (
          <div className="text-center py-8 text-slate-400">
            <p className="text-sm">No elements found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
