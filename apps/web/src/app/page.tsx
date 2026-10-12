import * as React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MousePointerClick,
  Sparkles,
  Users2,
  Download,
  ArrowRight,
  Layout,
  Share2,
  Palette,
  FileText,
  MonitorPlay,
  Presentation,
  CheckCircle2,
} from "lucide-react";

export default function HomePage() {
  const features = [
    {
      icon: <MousePointerClick className="h-6 w-6 text-violet-600" />,
      title: "Drag & Drop Editor",
      description:
        "Intuitive vector canvas with fluid snapping, multi-layer manipulation, and precise pixel alignment.",
      bg: "bg-violet-50 dark:bg-violet-950/40",
    },
    {
      icon: <Sparkles className="h-6 w-6 text-indigo-600" />,
      title: "Templates Library",
      description:
        "Hundreds of professionally crafted designs ready to customize for your brand, campaigns, and social media.",
      bg: "bg-indigo-50 dark:bg-indigo-950/40",
    },
    {
      icon: <Users2 className="h-6 w-6 text-purple-600" />,
      title: "Real-time Collaboration",
      description:
        "Collaborate with your team seamlessly. Share live drafts, leave comments, and edit simultaneously.",
      bg: "bg-purple-50 dark:bg-purple-950/40",
    },
    {
      icon: <Download className="h-6 w-6 text-fuchsia-600" />,
      title: "Export Anywhere",
      description:
        "High-resolution exports in PNG, JPG, SVG, and print-ready PDF formats with custom scaling and transparency.",
      bg: "bg-fuchsia-50 dark:bg-fuchsia-950/40",
    },
  ];

  const templateCategories = [
    {
      name: "Social Media",
      count: "120+ Templates",
      dimensions: "1080 x 1080 px",
      icon: <Share2 className="h-6 w-6 text-pink-500" />,
      gradient: "from-pink-500/10 via-rose-500/10 to-orange-500/10",
      accent: "border-pink-200 dark:border-pink-900",
    },
    {
      name: "Presentations",
      count: "80+ Templates",
      dimensions: "1920 x 1080 px",
      icon: <Presentation className="h-6 w-6 text-violet-500" />,
      gradient: "from-violet-500/10 via-purple-500/10 to-indigo-500/10",
      accent: "border-violet-200 dark:border-violet-900",
    },
    {
      name: "Marketing & Posters",
      count: "95+ Templates",
      dimensions: "1200 x 630 px",
      icon: <Palette className="h-6 w-6 text-cyan-500" />,
      gradient: "from-cyan-500/10 via-teal-500/10 to-emerald-500/10",
      accent: "border-cyan-200 dark:border-cyan-900",
    },
    {
      name: "Documents & Reports",
      count: "45+ Templates",
      dimensions: "A4 / 2480 x 3508 px",
      icon: <FileText className="h-6 w-6 text-blue-500" />,
      gradient: "from-blue-500/10 via-indigo-500/10 to-sky-500/10",
      accent: "border-blue-200 dark:border-blue-900",
    },
    {
      name: "YouTube & Video Covers",
      count: "60+ Templates",
      dimensions: "1280 x 720 px",
      icon: <MonitorPlay className="h-6 w-6 text-amber-500" />,
      gradient: "from-amber-500/10 via-orange-500/10 to-red-500/10",
      accent: "border-amber-200 dark:border-amber-900",
    },
    {
      name: "Web & UI Layouts",
      count: "70+ Templates",
      dimensions: "1440 x 900 px",
      icon: <Layout className="h-6 w-6 text-emerald-500" />,
      gradient: "from-emerald-500/10 via-green-500/10 to-teal-500/10",
      accent: "border-emerald-200 dark:border-emerald-900",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-violet-50/50 via-white to-slate-50 dark:from-violet-950/20 dark:via-slate-950 dark:to-slate-950 py-20 lg:py-28">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-200/40 via-transparent to-transparent dark:from-violet-900/20" />
          
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 mb-6">
              <Badge variant="purple" className="px-3 py-1 text-xs">
                ✨ Next-Gen Web Design Studio
              </Badge>
              <span className="text-xs text-slate-500 font-medium">
                Fast, responsive, vector-first
              </span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl dark:text-white max-w-4xl mx-auto leading-tight">
              Design anything.{" "}
              <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Publish anywhere.
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Empower your creativity with a lightning-fast visual studio. Build
              eye-catching social graphics, pitch decks, flyers, and branding assets
              in seconds.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="primary"
                  rightIcon={<ArrowRight className="h-5 w-5" />}
                  className="w-full sm:w-auto shadow-lg shadow-violet-500/25 px-8"
                >
                  Start Designing Free
                </Button>
              </Link>
              <Link href="/templates">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto px-8"
                >
                  Explore Templates
                </Button>
              </Link>
            </div>

            {/* Quick social proof / perks */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>Instant SVG & PDF exports</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>Modern WebGL & Canvas</span>
              </div>
            </div>

            {/* Hero App Mockup Preview */}
            <div className="mt-14 relative mx-auto max-w-5xl rounded-2xl border border-slate-200/80 bg-white/70 p-3 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
              <div className="overflow-hidden rounded-xl bg-slate-900 aspect-[16/9] flex items-center justify-center relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/60 via-slate-900 to-indigo-950/80" />
                
                {/* Decorative canvas UI mock */}
                <div className="relative z-10 w-4/5 h-4/5 rounded-lg border border-white/10 bg-slate-800/80 shadow-2xl flex flex-col overflow-hidden">
                  <div className="h-9 border-b border-white/10 bg-slate-900/90 flex items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                      <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      Summer_Campaign_2026.flow
                    </span>
                    <Badge variant="purple" className="text-[10px] py-0 px-2">
                      Live Canvas
                    </Badge>
                  </div>
                  <div className="flex-1 flex items-center justify-center p-6 bg-slate-950/50">
                    <div className="w-72 h-44 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 p-6 flex flex-col justify-between shadow-xl transform group-hover:scale-105 transition-transform duration-300">
                      <span className="text-xs font-bold uppercase tracking-wider text-white/80">
                        DesignFlow Studio
                      </span>
                      <h4 className="text-xl font-black text-white leading-tight">
                        Create Bold Visuals In Minutes
                      </h4>
                      <div className="flex items-center justify-between text-[11px] text-white/90">
                        <span>1080 &times; 1080 px</span>
                        <span className="rounded bg-white/20 px-2 py-0.5 font-semibold">
                          Edit
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-20 bg-white dark:bg-slate-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <Badge variant="default" className="mb-3">
                Core Features
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                Built for creators, marketers, and teams
              </h2>
              <p className="mt-3 text-slate-600 dark:text-slate-400">
                Everything you need to craft high-impact creative collateral without the steep learning curve.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 bg-slate-50/50 dark:bg-slate-900/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div
                      className={`h-12 w-12 rounded-xl flex items-center justify-center mb-5 ${feature.bg}`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Template Categories Preview */}
        <section className="py-20 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200/80 dark:border-slate-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <Badge variant="default" className="mb-3">
                  Inspiration Ready
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                  Explore Template Categories
                </h2>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                  Select a category to jump right into a pre-configured canvas preset.
                </p>
              </div>
              <Link href="/templates" className="mt-4 md:mt-0">
                <Button variant="outline" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  View All Templates
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {templateCategories.map((cat) => (
                <Link
                  key={cat.name}
                  href={`/templates?category=${encodeURIComponent(cat.name)}`}
                  className={`group relative overflow-hidden rounded-2xl border p-6 bg-white dark:bg-slate-900 hover:shadow-xl transition-all duration-200 ${cat.accent}`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-50 group-hover:opacity-100 transition-opacity`}
                  />
                  <div className="relative z-10 flex items-start justify-between">
                    <div>
                      <div className="h-10 w-10 rounded-lg bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center mb-4">
                        {cat.icon}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-violet-600 transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">{cat.dimensions}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {cat.count}
                    </Badge>
                  </div>
                  <div className="relative z-10 mt-6 flex items-center text-xs font-semibold text-violet-600 dark:text-violet-400 group-hover:translate-x-1 transition-transform">
                    <span>Browse collection</span>
                    <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-gradient-to-br from-violet-600 via-indigo-700 to-purple-800 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
          
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Ready to elevate your visual identity?
            </h2>
            <p className="mt-4 text-base sm:text-xl text-violet-100 max-w-2xl mx-auto">
              Join thousands of creators building standout marketing designs, social graphics, and presentations with DesignFlow.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-white text-violet-900 hover:bg-slate-100 shadow-xl font-bold px-8"
                  rightIcon={<ArrowRight className="h-5 w-5 text-violet-900" />}
                >
                  Create Blank Design
                </Button>
              </Link>
              <Link href="/templates">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 text-white hover:bg-white/10 px-8"
                >
                  Browse Templates
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
