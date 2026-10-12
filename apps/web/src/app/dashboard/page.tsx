"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  LayoutGrid,
  List,
  Search,
  MoreVertical,
  Copy,
  Trash2,
  Edit2,
  Sparkles,
  Upload,
  ArrowRight,
  FolderPlus,
  Layers,
  Clock,
  ExternalLink,
  Sliders,
  Image as ImageIcon,
  Video,
  Tv,
  FileSpreadsheet,
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  thumbnailColor: string;
  width: number;
  height: number;
  updatedAt: string;
  pageCount: number;
}

interface CanvasPreset {
  id: string;
  name: string;
  width: number;
  height: number;
  icon: React.ReactNode;
  category: string;
}

const CANVAS_PRESETS: CanvasPreset[] = [
  {
    id: "instagram-post",
    name: "Instagram Post",
    width: 1080,
    height: 1080,
    icon: <ImageIcon className="h-5 w-5 text-pink-500" />,
    category: "Social Media",
  },
  {
    id: "instagram-story",
    name: "Instagram Story",
    width: 1080,
    height: 1920,
    icon: <ImageIcon className="h-5 w-5 text-purple-500" />,
    category: "Social Media",
  },
  {
    id: "youtube-thumb",
    name: "YouTube Thumbnail",
    width: 1280,
    height: 720,
    icon: <Video className="h-5 w-5 text-red-500" />,
    category: "Video",
  },
  {
    id: "presentation",
    name: "Presentation (16:9)",
    width: 1920,
    height: 1080,
    icon: <Tv className="h-5 w-5 text-blue-500" />,
    category: "Presentations",
  },
  {
    id: "a4-doc",
    name: "A4 Document",
    width: 2480,
    height: 3508,
    icon: <FileSpreadsheet className="h-5 w-5 text-emerald-500" />,
    category: "Print",
  },
  {
    id: "custom",
    name: "Custom Size",
    width: 800,
    height: 600,
    icon: <Sliders className="h-5 w-5 text-violet-500" />,
    category: "Custom",
  },
];

const INITIAL_PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "Summer Product Launch Flyer",
    thumbnailColor: "from-amber-500 to-rose-500",
    width: 1080,
    height: 1080,
    updatedAt: "10 minutes ago",
    pageCount: 1,
  },
  {
    id: "proj-2",
    title: "Q4 Pitch Deck Presentation",
    thumbnailColor: "from-violet-600 to-indigo-600",
    width: 1920,
    height: 1080,
    updatedAt: "2 hours ago",
    pageCount: 12,
  },
  {
    id: "proj-3",
    title: "YouTube Tech Review Banner",
    thumbnailColor: "from-blue-600 to-cyan-500",
    width: 1280,
    height: 720,
    updatedAt: "Yesterday",
    pageCount: 1,
  },
  {
    id: "proj-4",
    title: "Brand Style Guide Book",
    thumbnailColor: "from-emerald-500 to-teal-700",
    width: 2480,
    height: 3508,
    updatedAt: "3 days ago",
    pageCount: 8,
  },
  {
    id: "proj-5",
    title: "Black Friday Sale Instagram Story",
    thumbnailColor: "from-purple-600 to-pink-600",
    width: 1080,
    height: 1920,
    updatedAt: "Last week",
    pageCount: 3,
  },
];

export default function DashboardPage() {
  const router = useRouter();

  const [projects, setProjects] = React.useState<Project[]>(INITIAL_PROJECTS);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");

  // Create Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [selectedPreset, setSelectedPreset] = React.useState<CanvasPreset>(
    CANVAS_PRESETS[0]
  );
  const [customWidth, setCustomWidth] = React.useState("1080");
  const [customHeight, setCustomHeight] = React.useState("1080");
  const [newDesignTitle, setNewDesignTitle] = React.useState("Untitled Design");
  const [activeModalTab, setActiveModalTab] = React.useState<
    "presets" | "custom" | "templates"
  >("presets");

  // Rename Dialog State
  const [renamingProject, setRenamingProject] = React.useState<Project | null>(
    null
  );
  const [renameTitle, setRenameTitle] = React.useState("");

  // Filter projects by search
  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateDesign = () => {
    const width =
      activeModalTab === "custom"
        ? parseInt(customWidth, 10) || 1080
        : selectedPreset.width;
    const height =
      activeModalTab === "custom"
        ? parseInt(customHeight, 10) || 1080
        : selectedPreset.height;

    const newId = `design-${Date.now()}`;
    const newProject: Project = {
      id: newId,
      title: newDesignTitle.trim() || "Untitled Design",
      thumbnailColor: "from-violet-600 to-indigo-600",
      width,
      height,
      updatedAt: "Just now",
      pageCount: 1,
    };

    setProjects([newProject, ...projects]);
    setIsCreateModalOpen(false);

    // Redirect to editor
    router.push(`/editor/${newId}`);
  };

  const handleDuplicate = (project: Project) => {
    const duplicated: Project = {
      ...project,
      id: `copy-${Date.now()}`,
      title: `${project.title} (Copy)`,
      updatedAt: "Just now",
    };
    setProjects([duplicated, ...projects]);
  };

  const handleDelete = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  const handleStartRename = (project: Project) => {
    setRenamingProject(project);
    setRenameTitle(project.title);
  };

  const handleConfirmRename = () => {
    if (!renamingProject) return;
    setProjects(
      projects.map((p) =>
        p.id === renamingProject.id
          ? { ...p, title: renameTitle.trim() || p.title, updatedAt: "Just now" }
          : p
      )
    );
    setRenamingProject(null);
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <Header />

      <main className="flex-1 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Greeting Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  Welcome back, Designer
                </h1>
                <Badge variant="purple" className="text-xs">
                  Pro Plan
                </Badge>
              </div>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Pick up where you left off or jumpstart a brand new graphic design.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                onClick={() => {
                  setNewDesignTitle("Untitled Design");
                  setIsCreateModalOpen(true);
                }}
                leftIcon={<Plus className="h-4 w-4" />}
                className="shadow-md shadow-violet-500/20"
              >
                Create New Design
              </Button>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => {
                setSelectedPreset(CANVAS_PRESETS[0]);
                setActiveModalTab("presets");
                setIsCreateModalOpen(true);
              }}
              className="flex items-center gap-4 p-5 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-sm hover:border-violet-500 hover:shadow-md transition-all text-left group cursor-pointer"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-950/60 dark:text-violet-400 group-hover:scale-105 transition-transform">
                <Plus className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-violet-600 transition-colors">
                  Create blank design
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Start fresh with custom canvas dimensions
                </p>
              </div>
            </button>

            <Link
              href="/templates"
              className="flex items-center gap-4 p-5 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-sm hover:border-indigo-500 hover:shadow-md transition-all text-left group"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 group-hover:scale-105 transition-transform">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                  Use a template
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Browse 200+ pre-made designer templates
                </p>
              </div>
            </Link>

            <label className="flex items-center gap-4 p-5 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all text-left group cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    const file = e.target.files[0];
                    const newId = `upload-${Date.now()}`;
                    const newProj: Project = {
                      id: newId,
                      title: file.name.replace(/\.[^/.]+$/, "") || "Uploaded Image",
                      thumbnailColor: "from-emerald-500 to-teal-600",
                      width: 1200,
                      height: 800,
                      updatedAt: "Just now",
                      pageCount: 1,
                    };
                    setProjects([newProj, ...projects]);
                    router.push(`/editor/${newId}`);
                  }
                }}
              />
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                <Upload className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                  Upload an image
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Import PNG, JPG or SVG to edit immediately
                </p>
              </div>
            </label>
          </section>

          {/* Template Categories Quick Slider / Section */}
          <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Quick Canvas Presets
                </h2>
                <p className="text-xs text-slate-500">
                  Select a preset to launch directly into the canvas
                </p>
              </div>
              <Link
                href="/templates"
                className="text-xs font-semibold text-violet-600 hover:text-violet-700 flex items-center gap-1"
              >
                All templates <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {CANVAS_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => {
                    setSelectedPreset(preset);
                    setNewDesignTitle(`New ${preset.name}`);
                    setIsCreateModalOpen(true);
                  }}
                  className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:border-violet-400 hover:bg-violet-50/50 dark:hover:bg-violet-950/30 transition-all text-center group"
                >
                  <div className="mb-2 p-2 rounded-lg bg-white dark:bg-slate-700 shadow-sm group-hover:scale-110 transition-transform">
                    {preset.icon}
                  </div>
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                    {preset.name}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5 font-mono">
                    {preset.width}&times;{preset.height}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Recent Designs Section */}
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Recent Designs</span>
                  <span className="text-xs font-normal text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                    {filteredProjects.length}
                  </span>
                </h2>
              </div>

              <div className="flex items-center gap-3">
                {/* Search Bar */}
                <div className="w-full sm:w-64">
                  <Input
                    placeholder="Search designs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    leftIcon={<Search className="h-4 w-4" />}
                    className="h-9"
                  />
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-0.5">
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    className={`rounded-md p-1.5 transition-colors ${
                      viewMode === "grid"
                        ? "bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-300 font-semibold"
                        : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                    }`}
                    aria-label="Grid view"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`rounded-md p-1.5 transition-colors ${
                      viewMode === "list"
                        ? "bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-300 font-semibold"
                        : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                    }`}
                    aria-label="List view"
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center">
                <div className="h-16 w-16 rounded-2xl bg-violet-50 dark:bg-violet-950/50 flex items-center justify-center text-violet-600 mb-4">
                  <FolderPlus className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {searchQuery ? "No matching designs found" : "No designs yet"}
                </h3>
                <p className="mt-1 text-sm text-slate-500 max-w-sm">
                  {searchQuery
                    ? `No projects matching "${searchQuery}". Try a different keyword.`
                    : "Create your very first visual design now and bring your ideas to life."}
                </p>
                <div className="mt-6 flex gap-3">
                  {searchQuery && (
                    <Button variant="outline" onClick={() => setSearchQuery("")}>
                      Clear Search
                    </Button>
                  )}
                  <Button
                    variant="primary"
                    onClick={() => setIsCreateModalOpen(true)}
                    leftIcon={<Plus className="h-4 w-4" />}
                  >
                    Create New Design
                  </Button>
                </div>
              </div>
            ) : viewMode === "grid" ? (
              /* Grid View */
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col"
                  >
                    {/* Thumbnail placeholder */}
                    <div
                      onClick={() => router.push(`/editor/${project.id}`)}
                      className={`relative aspect-[4/3] w-full bg-gradient-to-tr ${project.thumbnailColor} p-4 cursor-pointer flex flex-col justify-between overflow-hidden group-hover:opacity-95 transition-opacity`}
                    >
                      <div className="flex justify-between items-start">
                        <Badge variant="purple" className="bg-black/30 text-white text-[10px] backdrop-blur-md">
                          {project.width} &times; {project.height}
                        </Badge>
                        <span className="flex items-center gap-1 rounded bg-black/30 px-2 py-0.5 text-[10px] text-white font-medium backdrop-blur-md">
                          <Layers className="h-3 w-3" />
                          {project.pageCount} {project.pageCount > 1 ? "pages" : "page"}
                        </span>
                      </div>

                      <div className="text-center font-bold text-white drop-shadow-md text-sm px-2 line-clamp-2">
                        {project.title}
                      </div>

                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex justify-center">
                        <span className="bg-white/90 text-slate-900 text-xs font-semibold px-3 py-1 rounded-full shadow-md backdrop-blur-sm flex items-center gap-1">
                          Open in Editor <ExternalLink className="h-3 w-3" />
                        </span>
                      </div>
                    </div>

                    {/* Metadata & Actions */}
                    <div className="p-4 flex items-center justify-between">
                      <div className="min-w-0 flex-1 pr-2">
                        <h4
                          onClick={() => router.push(`/editor/${project.id}`)}
                          className="font-semibold text-sm text-slate-900 dark:text-white truncate cursor-pointer hover:text-violet-600 transition-colors"
                          title={project.title}
                        >
                          {project.title}
                        </h4>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                          <Clock className="h-3 w-3" />
                          <span>Edited {project.updatedAt}</span>
                        </div>
                      </div>

                      {/* Dropdown Menu */}
                      <DropdownMenu>
                        <DropdownMenuTrigger className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                          <MoreVertical className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="right">
                          <DropdownMenuItem onClick={() => handleStartRename(project)}>
                            <Edit2 className="h-3.5 w-3.5 mr-1" />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicate(project)}>
                            <Copy className="h-3.5 w-3.5 mr-1" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            destructive
                            onClick={() => handleDelete(project.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5 mr-1" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* List View */
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 shadow-sm">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group"
                  >
                    <div
                      onClick={() => router.push(`/editor/${project.id}`)}
                      className="flex items-center gap-4 min-w-0 flex-1 cursor-pointer"
                    >
                      <div
                        className={`h-12 w-16 rounded-lg bg-gradient-to-tr ${project.thumbnailColor} shrink-0 flex items-center justify-center shadow-xs`}
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-sm text-slate-900 dark:text-white truncate group-hover:text-violet-600 transition-colors">
                          {project.title}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                          <span>{project.width} &times; {project.height} px</span>
                          <span>•</span>
                          <span>{project.pageCount} page(s)</span>
                          <span>•</span>
                          <span>Edited {project.updatedAt}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => router.push(`/editor/${project.id}`)}
                        className="text-xs hidden sm:inline-flex"
                      >
                        Edit
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                          <MoreVertical className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="right">
                          <DropdownMenuItem onClick={() => handleStartRename(project)}>
                            <Edit2 className="h-3.5 w-3.5 mr-1" />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicate(project)}>
                            <Copy className="h-3.5 w-3.5 mr-1" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            destructive
                            onClick={() => handleDelete(project.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5 mr-1" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Create New Design Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Create New Design</DialogTitle>
            <DialogDescription>
              Choose a format preset or enter custom dimensions to start creating.
            </DialogDescription>
          </DialogHeader>

          {/* Design Title Input */}
          <div className="mb-4">
            <Input
              label="Design Title"
              value={newDesignTitle}
              onChange={(e) => setNewDesignTitle(e.target.value)}
              placeholder="e.g. Summer Promo 2026"
            />
          </div>

          {/* Modal Tabs */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 mb-4">
            <button
              type="button"
              onClick={() => setActiveModalTab("presets")}
              className={`pb-2 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
                activeModalTab === "presets"
                  ? "border-violet-600 text-violet-600"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              Popular Presets
            </button>
            <button
              type="button"
              onClick={() => setActiveModalTab("custom")}
              className={`pb-2 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
                activeModalTab === "custom"
                  ? "border-violet-600 text-violet-600"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              Custom Dimensions
            </button>
            <button
              type="button"
              onClick={() => setActiveModalTab("templates")}
              className={`pb-2 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
                activeModalTab === "templates"
                  ? "border-violet-600 text-violet-600"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              Recent Templates
            </button>
          </div>

          {/* Presets Tab Content */}
          {activeModalTab === "presets" && (
            <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1">
              {CANVAS_PRESETS.map((preset) => {
                const isSelected = selectedPreset.id === preset.id;
                return (
                  <div
                    key={preset.id}
                    onClick={() => setSelectedPreset(preset)}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? "border-violet-600 bg-violet-50/60 dark:bg-violet-950/40 shadow-xs"
                        : "border-slate-200 dark:border-slate-800 hover:border-slate-300"
                    }`}
                  >
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-800 shadow-xs">
                      {preset.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {preset.name}
                      </p>
                      <p className="text-[11px] text-slate-500 font-mono">
                        {preset.width} &times; {preset.height} px
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Custom Dimensions Tab Content */}
          {activeModalTab === "custom" && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Width (px)"
                  type="number"
                  min="50"
                  max="8000"
                  value={customWidth}
                  onChange={(e) => setCustomWidth(e.target.value)}
                  placeholder="1080"
                />
                <Input
                  label="Height (px)"
                  type="number"
                  min="50"
                  max="8000"
                  value={customHeight}
                  onChange={(e) => setCustomHeight(e.target.value)}
                  placeholder="1080"
                />
              </div>
              <p className="text-xs text-slate-500">
                Recommended aspect ratios: 1:1 (Square), 16:9 (Landscape), 9:16 (Story/Reel).
              </p>
            </div>
          )}

          {/* Templates Tab Content */}
          {activeModalTab === "templates" && (
            <div className="space-y-3 py-2">
              <p className="text-xs text-slate-500">
                Pick a starting starter template or visit the full gallery:
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div
                  onClick={() => {
                    setSelectedPreset(CANVAS_PRESETS[0]);
                    setNewDesignTitle("Social Showcase Promo");
                  }}
                  className="rounded-xl border border-slate-200 p-3 hover:border-violet-500 cursor-pointer bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800"
                >
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    Social Showcase Promo
                  </p>
                  <p className="text-[11px] text-slate-500">1080 &times; 1080 px</p>
                </div>
                <div
                  onClick={() => {
                    setSelectedPreset(CANVAS_PRESETS[3]);
                    setNewDesignTitle("Pitch Deck Master");
                  }}
                  className="rounded-xl border border-slate-200 p-3 hover:border-violet-500 cursor-pointer bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-800"
                >
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    Pitch Deck Master
                  </p>
                  <p className="text-[11px] text-slate-500">1920 &times; 1080 px</p>
                </div>
              </div>
              <div className="text-right pt-2">
                <Link
                  href="/templates"
                  className="text-xs font-semibold text-violet-600 hover:underline"
                >
                  Browse all 200+ templates &rarr;
                </Link>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleCreateDesign}
              className="px-6"
            >
              Create Design
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rename Dialog */}
      <Dialog
        open={Boolean(renamingProject)}
        onOpenChange={(open) => !open && setRenamingProject(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Design</DialogTitle>
            <DialogDescription>
              Enter a new name for your project.
            </DialogDescription>
          </DialogHeader>
          <div className="py-2">
            <Input
              label="Project Title"
              value={renameTitle}
              onChange={(e) => setRenameTitle(e.target.value)}
              placeholder="Design Title"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRenamingProject(null)}
            >
              Cancel
            </Button>
            <Button variant="default" onClick={handleConfirmRename}>
              Save Name
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
