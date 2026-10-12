'use client';

import React from 'react';
import { useEditorStore, type SidebarPanel } from '@/store/editor-store';
import {
  LayoutTemplate,
  Shapes,
  Type,
  UploadCloud,
  Palette,
  Layers,
  FileText,
  ChevronLeft,
} from 'lucide-react';
import { ElementsPanel } from './panels/elements-panel';
import { TextPanel } from './panels/text-panel';
import { UploadsPanel } from './panels/uploads-panel';
import { BackgroundsPanel } from './panels/backgrounds-panel';
import { LayersPanel } from './panels/layers-panel';
import { PagesPanel } from './panels/pages-panel';
import { TemplatesPanel } from './panels/templates-panel';

interface SidebarTab {
  id: SidebarPanel;
  label: string;
  icon: React.ReactNode;
}

const TABS: SidebarTab[] = [
  { id: 'templates', label: 'Templates', icon: <LayoutTemplate className="w-5 h-5" /> },
  { id: 'elements', label: 'Elements', icon: <Shapes className="w-5 h-5" /> },
  { id: 'text', label: 'Text', icon: <Type className="w-5 h-5" /> },
  { id: 'uploads', label: 'Uploads', icon: <UploadCloud className="w-5 h-5" /> },
  { id: 'backgrounds', label: 'Background', icon: <Palette className="w-5 h-5" /> },
  { id: 'layers', label: 'Layers', icon: <Layers className="w-5 h-5" /> },
  { id: 'pages', label: 'Pages', icon: <FileText className="w-5 h-5" /> },
];

export function Sidebar() {
  const sidebarPanel = useEditorStore((s) => s.sidebarPanel);
  const setSidebarPanel = useEditorStore((s) => s.setSidebarPanel);

  const handleTabClick = (panelId: SidebarPanel) => {
    if (sidebarPanel === panelId) {
      setSidebarPanel(null); // toggle closed
    } else {
      setSidebarPanel(panelId);
    }
  };

  const renderActivePanel = () => {
    switch (sidebarPanel) {
      case 'templates':
        return <TemplatesPanel />;
      case 'elements':
      case 'shapes':
        return <ElementsPanel />;
      case 'text':
        return <TextPanel />;
      case 'uploads':
        return <UploadsPanel />;
      case 'backgrounds':
        return <BackgroundsPanel />;
      case 'layers':
        return <LayersPanel />;
      case 'pages':
        return <PagesPanel />;
      default:
        return null;
    }
  };

  return (
    <aside className="flex h-full select-none z-20">
      {/* Icon Rail (72px wide) */}
      <nav className="w-[72px] h-full bg-slate-900 border-r border-slate-800 flex flex-col items-center py-3 justify-between flex-shrink-0">
        <div className="flex flex-col items-center gap-1.5 w-full px-1.5">
          {TABS.map((tab) => {
            const isActive =
              sidebarPanel === tab.id ||
              (tab.id === 'elements' && sidebarPanel === 'shapes');

            return (
              <button
                key={tab.label}
                onClick={() => handleTabClick(tab.id)}
                className={`w-full py-2.5 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition-all group cursor-pointer ${
                  isActive
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-900/40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                title={tab.label}
              >
                <div className="transition-transform group-hover:scale-110">
                  {tab.icon}
                </div>
                <span className="text-[10px] font-medium leading-none">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Collapse toggle if panel is open */}
        {sidebarPanel && (
          <button
            onClick={() => setSidebarPanel(null)}
            className="w-10 h-10 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer"
            title="Collapse Sidebar"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
      </nav>

      {/* Flyout Panel (280px wide) */}
      {sidebarPanel && (
        <div className="w-[280px] h-full bg-white border-r border-slate-200 flex flex-col shadow-sm flex-shrink-0 animate-in slide-in-from-left duration-200">
          {renderActivePanel()}
        </div>
      )}
    </aside>
  );
}
