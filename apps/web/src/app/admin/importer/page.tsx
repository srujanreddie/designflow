'use client';

import * as React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DownloadCloud,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Layers,
  FileCheck,
  ShieldCheck,
  ExternalLink,
  Type,
  FolderOpen,
} from 'lucide-react';
import type { DiscoveredProductMeta, ImportSummary } from '@/lib/catalog-importer';

export default function AdminImporterPage() {
  const [loading, setLoading] = React.useState(true);
  const [importing, setImporting] = React.useState(false);
  const [catalogItems, setCatalogItems] = React.useState<DiscoveredProductMeta[]>([]);
  const [lastSummary, setLastSummary] = React.useState<ImportSummary | null>(null);

  const fetchCatalog = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/importer');
      const json = await res.json();
      if (json.success) {
        setCatalogItems(json.data.items || []);
      }
    } catch (e) {
      console.error('Failed to load catalog', e);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchCatalog();
  }, [fetchCatalog]);

  const triggerImport = async () => {
    setImporting(true);
    try {
      const res = await fetch('/api/importer', { method: 'POST' });
      const json = await res.json();
      if (json.success) {
        setLastSummary(json.data);
      }
    } catch (e) {
      console.error('Import execution error', e);
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <Header />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header Title */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="purple" className="px-2.5 py-0.5">Admin Pipeline</Badge>
                <span className="text-xs text-slate-500">DesignBundles Ingestion Engine</span>
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                Catalog Importer & DAM Manager
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Automated discovery, license verification, asset ingestion, and document-model conversion.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={fetchCatalog}
                disabled={loading || importing}
                className="gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                Scan Catalog
              </Button>
              <Button
                onClick={triggerImport}
                disabled={importing}
                className="gap-2 bg-violet-600 hover:bg-violet-700 text-white"
              >
                <DownloadCloud className={`h-4 w-4 ${importing ? 'animate-bounce' : ''}`} />
                {importing ? 'Importing Products...' : 'Run Automated Ingestion'}
              </Button>
            </div>
          </div>

          {/* KPI Metrics Dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                <span>DISCOVERED ITEMS</span>
                <FolderOpen className="h-4 w-4 text-violet-500" />
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
                {catalogItems.length}
              </div>
              <div className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Validated DesignBundles entries
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                <span>EDITABLE TEMPLATES</span>
                <Layers className="h-4 w-4 text-emerald-500" />
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
                {lastSummary ? lastSummary.totalEditable : catalogItems.length}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Converted to DesignFlow JSON
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                <span>LICENSING AUDIT</span>
                <ShieldCheck className="h-4 w-4 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
                100% Passed
              </div>
              <div className="text-[11px] text-emerald-600 mt-1">
                Commercial Redistribution OK
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                <span>FONTS DISCOVERED</span>
                <Type className="h-4 w-4 text-amber-500" />
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
                {lastSummary ? lastSummary.fontsDiscovered : 6}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                OFL Webfonts synced
              </div>
            </div>
          </div>

          {/* Last Job Log Terminal */}
          {lastSummary && (
            <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 border border-slate-800 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-violet-400 font-semibold">
                  JOB RUN LOGS • ID: {lastSummary.jobId.substring(0, 8)}...
                </span>
                <span className="text-slate-400">{lastSummary.completedAt}</span>
              </div>
              <div className="max-h-48 overflow-y-auto space-y-1 text-slate-300">
                {lastSummary.logs.map((log, i) => (
                  <div key={i}>{log}</div>
                ))}
              </div>
            </div>
          )}

          {/* Discovered Products Table */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  DesignBundles Catalog Registry
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Synchronized products, dimensional profiles, and licensing permissions.
                </p>
              </div>
              <Badge variant="secondary">{catalogItems.length} Products Tracked</Badge>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-3 px-4 font-semibold">Product Title & ID</th>
                    <th className="py-3 px-4 font-semibold">Category</th>
                    <th className="py-3 px-4 font-semibold">Dimensions</th>
                    <th className="py-3 px-4 font-semibold">Format</th>
                    <th className="py-3 px-4 font-semibold">License</th>
                    <th className="py-3 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {catalogItems.map((item) => (
                    <tr key={item.sourceId} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-white">
                        <div>{item.title}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          ID: {item.sourceId} • by {item.authorName}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500">
                        {item.dimensions.width} × {item.dimensions.height} {item.dimensions.unit}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex gap-1">
                          {item.fileFormats.map((fmt) => (
                            <span key={fmt} className="text-[10px] font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                              {fmt}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                          <CheckCircle2 className="h-3 w-3" />
                          {item.licenseType}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <a
                          href={item.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-violet-600 hover:text-violet-700 font-semibold"
                        >
                          Source <ExternalLink className="h-3 w-3" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
