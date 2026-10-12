'use client';

import React, { useState, useEffect } from 'react';
import { useEditorStore, selectActivePage } from '@/store/editor-store';
import { useCanvas } from './canvas-context';
import { X, Download, FileImage, FileText, Check, Loader2, Sparkles } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExportDialog({ isOpen, onClose }: ExportDialogProps) {
  const { canvas, exportCanvasAsDataURL } = useCanvas();
  const document = useEditorStore((s) => s.document);
  const activePage = useEditorStore(selectActivePage);

  const [format, setFormat] = useState<'png' | 'jpeg' | 'pdf'>('png');
  const [quality, setQuality] = useState(90);
  const [scale, setScale] = useState(1);
  const [pageScope, setPageScope] = useState<'current' | 'all'>('current');
  const [transparent, setTransparent] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Generate preview when options change or dialog opens
  useEffect(() => {
    if (!isOpen || !canvas) return;

    try {
      const dataUrl = exportCanvasAsDataURL({
        format: format === 'pdf' ? 'png' : format,
        quality: quality / 100,
        multiplier: 0.5, // lightweight preview
        transparent: format === 'png' && transparent,
      });
      setPreviewUrl(dataUrl);
    } catch (e) {
      console.error('Failed to generate preview', e);
    }
  }, [isOpen, canvas, format, quality, transparent, exportCanvasAsDataURL]);

  if (!isOpen) return null;

  const docTitle = document?.title || 'DesignFlow-Project';

  const handleDownload = async () => {
    if (!canvas) return;
    setIsExporting(true);

    try {
      const multiplier = scale;

      if (format === 'png' || format === 'jpeg') {
        const dataUrl = exportCanvasAsDataURL({
          format,
          quality: quality / 100,
          multiplier,
          transparent: format === 'png' && transparent,
        });

        if (dataUrl) {
          const fileName = `${docTitle.toLowerCase().replace(/\s+/g, '-')}.${format}`;
          // Convert dataURL to Blob and download
          const res = await fetch(dataUrl);
          const blob = await res.blob();
          saveAs(blob, fileName);
        }
      } else if (format === 'pdf') {
        // PDF Export using jsPDF
        const dataUrl = exportCanvasAsDataURL({
          format: 'png',
          multiplier: scale,
          transparent: false,
        });

        if (dataUrl) {
          const pageWidth = document?.width || 1080;
          const pageHeight = document?.height || 1080;
          const orientation = pageWidth > pageHeight ? 'landscape' : 'portrait';

          const pdf = new jsPDF({
            orientation,
            unit: 'px',
            format: [pageWidth, pageHeight],
          });

          pdf.addImage(dataUrl, 'PNG', 0, 0, pageWidth, pageHeight);
          pdf.save(`${docTitle.toLowerCase().replace(/\s+/g, '-')}.pdf`);
        }
      }
      onClose();
    } catch (err) {
      console.error('Export error:', err);
      alert('Failed to export image. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-violet-50 text-violet-600 rounded-xl">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Download & Export</h2>
              <p className="text-xs text-slate-500">
                Save your design as high-resolution image or PDF
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Format selection */}
          <div>
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-2">
              File Format
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'png', label: 'PNG Image', desc: 'Best for web & transparency', icon: FileImage },
                { id: 'jpeg', label: 'JPEG Image', desc: 'Smaller file size', icon: FileImage },
                { id: 'pdf', label: 'Standard PDF', desc: 'Best for documents & printing', icon: FileText },
              ].map((opt) => {
                const Icon = opt.icon;
                const isSelected = format === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setFormat(opt.id as any)}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'border-violet-600 bg-violet-50/50 ring-2 ring-violet-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-violet-600' : 'text-slate-400'}`} />
                      {isSelected && <Check className="w-3.5 h-3.5 text-violet-600" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">{opt.label}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{opt.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scale selection */}
          <div>
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-2">
              Resolution Scale
            </label>
            <div className="flex gap-2">
              {[
                { scale: 1, label: '1x (Standard)' },
                { scale: 2, label: '2x (High Res)' },
                { scale: 3, label: '3x (Ultra HD)' },
              ].map((s) => (
                <button
                  key={s.scale}
                  onClick={() => setScale(s.scale)}
                  className={`flex-1 py-2 px-3 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                    scale === s.scale
                      ? 'bg-violet-600 border-violet-600 text-white shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* JPEG Quality Slider */}
          {format === 'jpeg' && (
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Image Quality
                </label>
                <span className="text-xs font-mono font-medium text-slate-600">{quality}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                value={quality}
                onChange={(e) => setQuality(parseInt(e.target.value))}
                className="w-full accent-violet-600 cursor-pointer"
              />
            </div>
          )}

          {/* Transparent Background Toggle for PNG */}
          {format === 'png' && (
            <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div>
                <div className="text-xs font-semibold text-slate-800">
                  Transparent Background
                </div>
                <div className="text-[11px] text-slate-500">
                  Omit document page background color
                </div>
              </div>
              <input
                type="checkbox"
                checked={transparent}
                onChange={(e) => setTransparent(e.target.checked)}
                className="w-4 h-4 rounded text-violet-600 accent-violet-600 cursor-pointer"
              />
            </div>
          )}

          {/* Preview Area */}
          <div>
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-2">
              Export Preview
            </label>
            <div className="border border-slate-200 bg-slate-100 rounded-xl p-4 flex items-center justify-center min-h-[160px] max-h-[220px] overflow-hidden">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Export preview"
                  className="max-h-[180px] max-w-full object-contain rounded-lg shadow-sm border border-slate-300/50"
                />
              ) : (
                <div className="text-xs text-slate-400 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 animate-spin text-violet-500" />
                  Generating preview...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="text-xs text-slate-500 font-medium">
            Dimensions: {Math.round((document?.width || 1080) * scale)} × {Math.round((document?.height || 1080) * scale)} px
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              disabled={isExporting}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleDownload}
              disabled={isExporting}
              className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-60"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Download {format.toUpperCase()}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
