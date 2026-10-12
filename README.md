# DesignFlow 🎨

> Advanced Canva-like Graphic Design Platform built from scratch with Next.js 15, Fabric.js v6, TypeScript, Tailwind CSS, Zustand, and PostgreSQL/Prisma.

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![Fabric.js](https://img.shields.io/badge/Fabric.js-6.x-blue)](https://fabricjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)](https://www.prisma.io/)

---

## 🌟 Overview

**DesignFlow** is a full-featured, production-ready web graphics editor inspired by modern design tools like Canva. Built with a modular monolith architecture, it provides an interactive multi-page design canvas, project management dashboard, template discovery engine, layer hierarchy, real-time transformations, asset uploads, and versatile client/server export pipelines.

---

## ✨ Features

### 1. Interactive Design Canvas (Fabric.js v6)
- **High-DPI Canvas Rendering**: Precise vector transformations and sub-pixel alignment.
- **Rich Shape Tools**: Rectangles, circles, triangles, stars, polygons, lines, and arrows with fill, stroke, and corner radius control.
- **Typography Engine**: Inline and panel-based text editing, custom font families, weights, styles, alignments, letter-spacing, and line-height.
- **Media & Asset Management**: Image uploads, aspect-ratio-preserving resizing, rotation, opacity, and positioning.
- **Layer & Hierarchy Control**: Visual layer panel with bring to front, send to back, reorder, visibility toggle, and locking.
- **Interactive Guides & Snapping**: Real-time alignment guides (center, boundary) and optional dot grid.
- **Multi-page Support**: Add, duplicate, delete, and switch between multiple pages within a single design.
- **Undo / Redo Architecture**: Command-pattern history stack supporting seamless undo/redo across all actions.
- **Global Keyboard Shortcuts**: `Ctrl+Z`, `Ctrl+Y`, `Ctrl+C`, `Ctrl+V`, `Ctrl+D`, `Delete`, `Ctrl+A`, `Escape`, and tool hotkeys (`V`, `T`, `R`, `H`).

### 2. User Dashboard & Project Organization
- **Workspace Navigation**: Project list and grid views, search, and category filtering.
- **Quick Canvas Presets**: Instagram Post, Instagram Story, YouTube Thumbnail, 16:9 Presentation, Flyer, Business Card, and Custom Dimensions.
- **Design CRUD Operations**: Create blank designs, duplicate, rename, and soft-delete projects.

### 3. Template Discovery Catalog
- **Curated Starter Templates**: Pre-configured editable templates across Social Media, Presentations, Posters, YouTube Thumbnails, and Business Cards.
- **Independent Copy Workflow**: Using a template creates an independent clone with freshly re-indexed elements.

### 4. Export & Rendering Pipeline
- **PNG & JPEG Export**: Configurable scale multipliers (1x, 2x, 3x) and quality sliders.
- **Vector PDF Generation**: Multi-format document compilation using `jspdf`.
- **Transparent Backgrounds**: Seamless PNG alpha-channel exports for graphics and stickers.

### 5. Persistence & Concurrency
- **Debounced Autosave**: Automatic background saving with conflict detection (optimistic concurrency).
- **Relational Schema**: Comprehensive PostgreSQL schema powered by Prisma supporting Users, Documents, Shares, Revisions, Assets, Comments, and Activities.

---

## 🏗️ Architecture

```text
design-platform/
├── apps/
│   └── web/                   # Next.js App Router Frontend
│       ├── src/
│       │   ├── app/           # App routes (/dashboard, /editor/[id], /templates, /api)
│       │   ├── components/    # UI design system and editor panels
│       │   │   ├── editor/    # Canvas, toolbar, sidebar, and panels
│       │   │   ├── layout/    # Header, footer, navigation
│       │   │   └── ui/        # Buttons, inputs, dialogs, badges, tooltips
│       │   ├── hooks/         # useAutosave, useKeyboardShortcuts
│       │   ├── lib/           # Utility helpers
│       │   └── store/         # Zustand central editor store
├── packages/
│   ├── document-model/        # Document & page model factories, serialization, cloning
│   ├── editor-engine/         # Command pattern undo/redo engine
│   ├── shared-types/          # Canonical TypeScript design primitives
│   └── validation/            # Zod runtime schemas
├── server/
│   ├── api/                   # API contracts
│   ├── services/              # Document, template, asset services
│   └── storage/               # Asset storage handlers
├── prisma/
│   └── schema.prisma          # Database schema (PostgreSQL)
├── docs/                      # Architectural docs, product analysis & roadmap
├── docker-compose.yml         # Postgres 16, Redis 7, MinIO local services
└── .env.example
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or later (v20+ recommended)
- **npm**: v9+ or **pnpm** / **yarn**
- **Docker & Docker Compose** (optional, for local PostgreSQL/MinIO/Redis)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/srujanreddie/designflow.git
   cd designflow
   ```

2. **Install dependencies**:
   ```bash
   cd apps/web
   npm install --legacy-peer-deps
   ```

3. **Configure Environment Variables**:
   ```bash
   cp ../../.env.example .env
   ```

4. **Launch Local Infrastructure (Optional)**:
   ```bash
   docker-compose up -d
   ```

5. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to start designing.

---

## 📋 Comprehensive Documentation

Detailed documentation is available in the [`docs/`](./docs) directory:
- [Product Analysis & Workflows](./docs/product-analysis.md)
- [System Architecture & Data Flow](./docs/architecture.md)
- [Implementation Roadmap & Milestones](./docs/implementation-roadmap.md)

---

## 📄 License

MIT License. Created by [SRUJAN REDDY](https://github.com/srujanreddie).
