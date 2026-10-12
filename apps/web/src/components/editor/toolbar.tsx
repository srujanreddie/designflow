'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useEditorStore } from '@/store/editor-store';
import {
  ArrowLeft,
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Download,
  Share2,
  Grid,
  Magnet,
  CheckCircle2,
  Loader2,
  AlertCircle,
  MoreVertical,
} from 'lucide-react';
import { ExportDialog } from './export-dialog';

export function Toolbar() {
  const document = useEditorStore((s) => s.document);
  const updateDocumentTitle = useEditorStore((s) => s.updateDocumentTitle);
  const saveStatus = useEditorStore((s) => s.saveStatus);
  const canUndo = useEditorStore((s) => s.canUndo);
  const canRedo = useEditorStore((s) => s.canRedo);
  const undo = useEditorStore((s) => s.undo);
  const redo = useEditorStore((s) => s.redo);
  const zoom = useEditorStore((s) => s.zoom);
  const zoomIn = useEditorStore((s) => s.zoomIn);
  const zoomOut = useEditorStore((s) => s.zoomOut);
  const zoomToFit = useEditorStore((s) => s.zoomToFit);
  const showGrid = useEditorStore((s) => s.showGrid);
  const toggleGrid = useEditorStore((s) => s.toggleGrid);
  const snapToGrid = useEditorStore((s) => s.snapToGrid);
  const toggleSnapToGrid = useEditorStore((s) => s.toggleSnapToGrid);

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState(document?.title || 'Untitled Design');
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  // Sync title when document changes
  React.useEffect(() => {
    if (document?.title && !isEditingTitle) {
      setTitleInput(document.title);
    }
  }, [document?.title, isEditingTitle]);

  const handleTitleSubmit = () => {
    setIsEditingTitle(false);
    const trimmed = titleInput.trim();
    if (trimmed) {
      updateDocumentTitle(trimmed);
    } else {
      setTitleInput(document?.title || 'Untitled Design');
    }
  };

  const handleShareClick = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const renderSaveStatus = () => {
    switch (saveStatus) {
      case 'saving':
        return (
          <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-violet-500" />
            Saving...
          </span>
        );
      case 'saved':
        return (
          <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Saved
          </span>
        );
      case 'unsaved':
        return (
          <span className="flex items-center gap-1.5 text-xs text-amber-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            Unsaved changes
          </span>
        );
      case 'error':
        return (
          <span className="flex items-center gap-1.5 text-xs text-red-500 font-medium">
            <AlertCircle className="w-3.5 h-3.5" />
            Save error
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-slate-300" />
            Auto-saved
          </span>
        );
    }
  };

  return (
    <>
      <header className="h-14 border-b border-slate-200 bg-white px-4 flex items-center justify-between z-30 select-none">
        {/* Left Section: Back, Document Title & Save Status */}
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <div className="h-5 w-px bg-slate-200" />

          {/* Editable Document Title */}
          <div className="flex items-center min-w-0">
            {isEditingTitle ? (
              <input
                type="text"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                onBlur={handleTitleSubmit}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleTitleSubmit();
                  if (e.key === 'Escape') {
                    setTitleInput(document?.title || 'Untitled Design');
                    setIsEditingTitle(false);
                  }
                }}
                autoFocus
                className="px-2 py-1 text-sm font-semibold text-slate-900 border border-violet-400 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500/20 max-w-[220px]"
              />
            ) : (
              <button
                onClick={() => setIsEditingTitle(true)}
                className="px-2 py-1 text-sm font-semibold text-slate-800 hover:text-violet-700 hover:bg-slate-100 rounded-md transition-colors truncate max-w-[220px] text-left cursor-pointer"
                title="Click to rename document"
              >
                {document?.title || 'Untitled Design'}
              </button>
            )}
          </div>

          <div className="hidden sm:flex items-center pl-2">
            {renderSaveStatus()}
          </div>
        </div>

        {/* Center Section: Undo, Redo, Zoom Controls */}
        <div className="flex items-center gap-1.5">
          {/* Undo / Redo */}
          <button
            onClick={undo}
            disabled={!canUndo}
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={redo}
            disabled={!canRedo}
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
            title="Redo (Ctrl+Y)"
          >
            <Redo2 className="w-4 h-4" />
          </button>

          <div className="h-5 w-px bg-slate-200 mx-1" />

          {/* Zoom controls */}
          <button
            onClick={zoomOut}
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <button
            onClick={zoomToFit}
            className="px-2 py-1 rounded-md text-xs font-mono font-medium text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer min-w-[50px] text-center"
            title="Reset Zoom to Fit"
          >
            {Math.round(zoom * 100)}%
          </button>

          <button
            onClick={zoomIn}
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            onClick={zoomToFit}
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer hidden md:flex"
            title="Fit to Screen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Right Section: Share & Export */}
        <div className="flex items-center gap-2">
          {/* Share button */}
          <button
            onClick={handleShareClick}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            title="Copy share link"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-500" />
            {copiedShare ? 'Copied Link!' : 'Share'}
          </button>

          {/* Download / Export button */}
          <button
            onClick={() => setIsExportOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>

          {/* More options dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowMoreMenu((prev) => !prev)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {showMoreMenu && (
              <div
                className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 text-xs animate-in fade-in"
                onClick={() => setShowMoreMenu(false)}
              >
                <button
                  onClick={toggleGrid}
                  className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center justify-between text-slate-700"
                >
                  <span className="flex items-center gap-2">
                    <Grid className="w-3.5 h-3.5 text-slate-400" />
                    Show Grid
                  </span>
                  {showGrid && <span className="text-violet-600 font-bold">✓</span>}
                </button>
                <button
                  onClick={toggleSnapToGrid}
                  className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center justify-between text-slate-700"
                >
                  <span className="flex items-center gap-2">
                    <Magnet className="w-3.5 h-3.5 text-slate-400" />
                    Snap to Grid
                  </span>
                  {snapToGrid && <span className="text-violet-600 font-bold">✓</span>}
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Export Dialog */}
      <ExportDialog
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />
    </>
  );
}
