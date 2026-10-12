"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Sparkles,
  ArrowRight,
  Filter,
  Check,
  Layout,
  Share2,
  Tv,
  FileText,
  Image as ImageIcon,
} from "lucide-react";

interface Template {
  id: string;
  name: string;
  category: string;
  width: number;
  height: number;
  gradient: string;
  tag: string;
  tagVariant: "default" | "secondary" | "purple" | "warning" | "success";
  description: string;
}

const TEMPLATES: Template[] = [
  {
    id: "tpl-1",
    name: "Summer Sale Instagram Post",
    category: "Social Media",
    width: 1080,
    height: 1080,
    gradient: "from-pink-500 via-rose-500 to-amber-500",
    tag: "Trending",
    tagVariant: "purple",
    description: "Vibrant high-contrast discount banner with punchy typography",
  },
  {
    id: "tpl-2",
    name: "Minimalist Pitch Deck",
    category: "Presentations",
    width: 1920,
    height: 1080,
    gradient: "from-slate-900 via-indigo-950 to-slate-900",
    tag: "Pro",
    tagVariant: "default",
    description: "Sleek dark-mode investor pitch deck with clean metric layouts",
  },
  {
    id: "tpl-3",
    name: "Modern Conference Poster",
    category: "Posters",
    width: 1200,
    height: 1600,
    gradient: "from-violet-600 via-purple-600 to-indigo-700",
    tag: "Popular",
    tagVariant: "secondary",
    description: "Geometric typography layout for summits, events, and meetups",
  },
  {
    id: "tpl-4",
    name: "Podcast Cover Art",
    category: "Social Media",
    width: 1400,
    height: 1400,
    gradient: "from-cyan-500 via-blue-600 to-indigo-800",
    tag: "Audio",
    tagVariant: "default",
    description: "High impact cover badge for Spotify and Apple Podcasts",
  },
  {
    id: "tpl-5",
    name: "Company Annual Report",
    category: "Documents",
    width: 2480,
    height: 3508,
    gradient: "from-emerald-600 via-teal-700 to-slate-900",
    tag: "Corporate",
    tagVariant: "success",
    description: "Professional multi-column report cover with data callouts",
  },
  {
    id: "tpl-6",
    name: "Tech Review YouTube Thumbnail",
    category: "Social Media",
    width: 1280,
    height: 720,
    gradient: "from-red-600 via-orange-600 to-amber-500",
    tag: "High CTR",
    tagVariant: "warning",
    description: "Bold glowing text with split product comparison framing",
  },
  {
    id: "tpl-7",
    name: "Startup Roadmap Presentation",
    category: "Presentations",
    width: 1920,
    height: 1080,
    gradient: "from-blue-600 via-indigo-600 to-purple-700",
    tag: "Business",
    tagVariant: "default",
    description: "Timeline milestones and quarterly product delivery slides",
  },
  {
    id: "tpl-8",
    name: "Music Festival Event Flyer",
    category: "Posters",
    width: 1080,
    height: 1350,
    gradient: "from-fuchsia-600 via-pink-600 to-orange-500",
    tag: "New",
    tagVariant: "purple",
    description: "Psychedelic gradients with artist lineup typography list",
  },
  {
    id: "tpl-9",
    name: "LinkedIn Thought Leadership Quote",
    category: "Social Media",
    width: 1200,
    height: 627,
    gradient: "from-slate-800 via-slate-900 to-black",
    tag: "Editorial",
    tagVariant: "secondary",
    description: "Sophisticated serif typography for founder quotes and advice",
  },
  {
    id: "tpl-10",
    name: "Product Feature Release Sheet",
    category: "Documents",
    width: 2480,
    height: 3508,
    gradient: "from-violet-700 via-indigo-800 to-blue-900",
    tag: "Marketing",
    tagVariant: "default",
    description: "One-pager marketing collateral showcasing flagship features",
  },
  {
    id: "tpl-11",
    name: "Webinar Masterclass Slide",
    category: "Presentations",
    width: 1920,
    height: 1080,
    gradient: "from-teal-600 via-cyan-700 to-indigo-900",
    tag: "Education",
    tagVariant: "success",
    description: "Engaging educational slide deck with speaker bio and takeaways",
  },
  {
    id: "tpl-12",
    name: "Restaurant Menu Special",
    category: "Posters",
    width: 1080,
    height: 1920,
    gradient: "from-amber-600 via-orange-700 to-rose-900",
    tag: "Food & Drink",
    tagVariant: "warning",
    description: "Warm appetizing layout for digital menus, specials, and story posts",
  },
];

const CATEGORIES = [
  "All",
  "Social Media",
  "Presentations",
  "Posters",
  "Documents",
];

function TemplatesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [selectedCategory, setSelectedCategory] = React.useState(initialCategory);
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredTemplates = TEMPLATES.filter((tpl) => {
    const matchesCategory =
      selectedCategory === "All" || tpl.category === selectedCategory;
    const matchesQuery =
      tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const handleUseTemplate = (template: Template) => {
    // Navigate to editor with template ID
    router.push(`/editor/tpl-${template.id}`);
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <Header />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="purple" className="px-3 py-1">
              <Sparkles className="h-3 w-3 mr-1 inline" /> 200+ Designer Templates
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Pick a template. Make it your own.
            </h1>
            <p className="text-base text-slate-600 dark:text-slate-400">
              Explore customizable layouts crafted for high conversions, social engagement,
              and standout presentations.
            </p>
          </div>

          {/* Search & Category Filter Section */}
          <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Category Filter Tabs */}
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? "bg-violet-600 text-white shadow-sm shadow-violet-500/20"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Search Bar */}
              <div className="w-full md:w-72">
                <Input
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<Search className="h-4 w-4" />}
                  className="h-10"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span>
                Showing <strong>{filteredTemplates.length}</strong> templates
              </span>
              {selectedCategory !== "All" && (
                <button
                  type="button"
                  onClick={() => setSelectedCategory("All")}
                  className="text-violet-600 hover:underline cursor-pointer"
                >
                  Reset category filter
                </button>
              )}
            </div>
          </div>

          {/* Templates Grid (1-4 columns based on screen size) */}
          {filteredTemplates.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
              <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400 mb-3">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                No templates matched your query
              </h3>
              <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                Try searching for something else or switch to the "All" category.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
              >
                Clear all filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Preview Thumbnail */}
                  <div
                    className={`relative aspect-[4/3] w-full bg-gradient-to-tr ${template.gradient} p-4 flex flex-col justify-between overflow-hidden`}
                  >
                    <div className="flex items-center justify-between">
                      <Badge variant={template.tagVariant} className="text-[10px]">
                        {template.tag}
                      </Badge>
                      <span className="text-[10px] font-mono text-white/90 bg-black/30 backdrop-blur-md px-2 py-0.5 rounded">
                        {template.width} &times; {template.height}
                      </span>
                    </div>

                    {/* Placeholder decorative typography preview */}
                    <div className="text-center p-2">
                      <div className="text-white font-black text-sm drop-shadow-md line-clamp-2">
                        {template.name}
                      </div>
                      <p className="text-[11px] text-white/80 line-clamp-1 mt-1 font-medium">
                        {template.category}
                      </p>
                    </div>

                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex justify-center pb-1">
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => handleUseTemplate(template)}
                        className="bg-white text-slate-900 hover:bg-slate-100 shadow-lg text-xs"
                      >
                        Use this template
                      </Button>
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1 group-hover:text-violet-600 transition-colors">
                        {template.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {template.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-400">
                        {template.category}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleUseTemplate(template)}
                        className="text-xs text-violet-600 hover:text-violet-700 p-0 h-auto font-semibold"
                        rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
                      >
                        Use template
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function TemplatesPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-slate-50 dark:bg-slate-950" />}>
      <TemplatesContent />
    </React.Suspense>
  );
}
