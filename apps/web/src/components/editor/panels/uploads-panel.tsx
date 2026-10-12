'use client';

import React, { useState, useRef } from 'react';
import { useEditorStore } from '@/store/editor-store';
import { UploadCloud, Image as ImageIcon, Plus, Trash2, ArrowUpRight } from 'lucide-react';

interface UploadedMedia {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
}

const DEFAULT_STOCK_IMAGES: UploadedMedia[] = [
  {
    id: 'stock-1',
    name: 'Abstract Gradient',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    width: 600,
    height: 400,
  },
  {
    id: 'stock-2',
    name: 'Minimal Architecture',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80',
    width: 600,
    height: 400,
  },
  {
    id: 'stock-3',
    name: 'Vibrant Waves',
    url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80',
    width: 600,
    height: 400,
  },
];

export function UploadsPanel() {
  const [uploads, setUploads] = useState<UploadedMedia[]>(DEFAULT_STOCK_IMAGES);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addImageElement = useEditorStore((s) => s.addImageElement);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (!result) return;

      const img = new Image();
      img.onload = () => {
        const newUpload: UploadedMedia = {
          id: `upload-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          name: file.name,
          url: result,
          width: img.naturalWidth || 400,
          height: img.naturalHeight || 400,
        };
        setUploads((prev) => [newUpload, ...prev]);
        // Also automatically add to canvas for ease of use
        addImageElement(result, newUpload.width, newUpload.height);
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    Array.from(files).forEach(processFile);
    e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;
    Array.from(files).forEach(processFile);
  };

  const handleImageClick = (item: UploadedMedia) => {
    addImageElement(item.url, item.width, item.height);
  };

  const handleDeleteUpload = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setUploads((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="flex flex-col h-full text-slate-800">
      <div className="p-4 border-b border-slate-200">
        <h2 className="text-base font-semibold text-slate-900 mb-1 flex items-center gap-2">
          <UploadCloud className="w-5 h-5 text-violet-600" />
          Uploads
        </h2>
        <p className="text-xs text-slate-500 mb-3">
          Upload and use your own images and assets
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full py-2.5 px-4 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Upload Files
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Drag and Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-violet-500 bg-violet-50/50'
              : 'border-slate-300 hover:border-violet-400 bg-slate-50/50 hover:bg-violet-50/20'
          }`}
        >
          <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-xs font-medium text-slate-700">
            Drag and drop images here
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            PNG, JPG, SVG, WebP up to 10MB
          </p>
        </div>

        {/* Gallery */}
        <div>
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Your Assets ({uploads.length})
          </h3>

          {uploads.length === 0 ? (
            <div className="text-center py-10 text-slate-400">
              <ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="text-xs font-medium">No uploaded images yet</p>
              <p className="text-[11px] mt-1">Uploaded media will show up here</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2.5">
              {uploads.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleImageClick(item)}
                  className="group relative rounded-lg border border-slate-200 overflow-hidden bg-slate-100 aspect-square cursor-pointer hover:border-violet-400 hover:shadow-md transition-all"
                >
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-2">
                    <button
                      onClick={(e) => handleDeleteUpload(e, item.id)}
                      className="p-1.5 bg-white/90 hover:bg-red-50 hover:text-red-600 rounded-md text-slate-700 shadow-sm transition-colors"
                      title="Delete asset"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <span className="p-1.5 bg-violet-600 text-white rounded-md shadow-sm">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
