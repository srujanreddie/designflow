# DesignFlow - Product Analysis & Functional Specification

> **Document Version:** 1.0.0  
> **Target Audience:** Engineering, Product, Design, QA  
> **Status:** Draft / Approved for Implementation  
> **Benchmark Platforms:** Canva, Figma, Adobe Express, Visme

---

## 1. Executive Summary & Vision

**DesignFlow** is a modern, accessible, web-based visual design and layout platform empowering non-professional and professional creators alike to craft high-impact social media graphics, presentations, marketing collateral, posters, and multi-page vector/raster documents. 

Emulating the effortless direct-manipulation workflows popularized by Canva and Adobe Express, DesignFlow emphasizes:
1. **Low Barrier to Entry**: Intuitive drag-and-drop mechanics, rich preset templates, and smart guides.
2. **Deterministic Document State**: Robust serializable document schema powering flawless undo/redo, autosave, and multi-user sync.
3. **High-Performance Direct Manipulation**: Sub-16ms render loop (60 FPS) canvas powered by Fabric.js and hardware-accelerated transforms.
4. **Frictionless Export**: Instant client-side and server-side raster/vector export across web and print formats.

---

## 2. Feature Inventory

### 2.1 Authentication & User Management
- **Identity Providers**: Email/Password, Magic Link, and OAuth 2.0 (Google, GitHub).
- **Session Handling**: JWT-based stateless tokens with secure HTTP-only refresh tokens.
- **Role-Based Access Control (RBAC)**: Team owner, Editor, Viewer, Guest.
- **Account Profiles**: Custom avatar, display name, organization branding defaults (default brand colors, font favorites).

### 2.2 Dashboard & Project Management
- **Design Workspace**: Central grid/list view displaying recent designs with dynamic canvas thumbnails.
- **Organization & Categorization**: User folders, team spaces, starred/favorite designs, and soft-delete Trash with 30-day retention.
- **Search & Filtering**: Real-time filtering by document type (Instagram Post, Presentation, Custom), orientation, tags, and last-modified dates.
- **Batch Operations**: Multi-selection for bulk moving, archiving, tagging, or deleting.

### 2.3 Template Discovery & Browsing
- **Categorized Catalogs**: Pre-sized canvases categorized into Social Media, Marketing, Office/Docs, Prints, and Presentations.
- **Template Preview Modal**: High-resolution multi-page previews, tag listing, and one-click "Use this template" deep cloning.
- **Custom User Templates**: Ability to publish any existing design as a reusable organizational template.

### 2.4 Design Editor (Canvas, Toolbars, Panels)
- **Top Bar**: Document title (inline editable), save status badge (`Saving...`, `All changes saved`), undo/redo history controls, zoom percentage dropdown, download/export trigger, and share modal trigger.
- **Left Navigation Drawer**: Collapsible icon sidebar to toggle feature drawers:
  - Templates
  - Elements & Shapes
  - Text & Typography Presets
  - Uploads / Media Library
  - Layers & Page Manager
  - Background & Canvas Settings
- **Contextual Context Bar**: Dynamic toolbar positioned directly above canvas or below top bar; updates automatically based on current selection (e.g., Font/Size/Color for Text; Stroke/Fill/Radius for Shapes; Filter/Crop/Flip for Images).
- **Infinite/Panned Canvas**: Artboard with crisp outer shadows, customizable boundary dimensions, zoom levels (10% to 500%), fit-to-screen (`Shift + 1`), selection zoom (`Shift + 2`), and pan tool (`Space + Drag`).
- **Snapping & Smart Alignment**: Real-time visual alignment guides (magenta crosshairs), object edge and center bounding snapping, and equidistant distribution hints.

### 2.5 Text Editing & Typography
- **Hierarchy Presets**: Quick-add presets for Headings (H1), Subheadings (H2), and Body text.
- **Font Engine**: Web font integration (Google Fonts catalog), dynamic glyph rendering, custom OTF/TTF upload.
- **Styling Properties**: Font family, font size, bold, italic, underline, strikethrough, uppercase toggle, text alignment (left, center, right, justify).
- **Advanced Typesetting**: Letter spacing (tracking), line height (leading), stroke outline, text shadows, background highlight box, curved/arced text transforms.
- **Inline Text Editing**: Double-click direct canvas content editing with native caret, text selection range, and clipboard paste.

### 2.6 Shape & Element Tools
- **Vector Primitives**: Rectangles, rounded rectangles, circles, ellipses, triangles, stars, polygons, lines, arrows.
- **Customizable Properties**: Solid fill color, linear/radial gradients, stroke color, stroke width, stroke dash arrays, corner radius, drop shadows.
- **SVG Elements & Icons**: Searchable icon library (Lucide/Heroicons), editable fill colors for imported multi-path SVGs.

### 2.7 Image Handling (Upload, Crop, Resize)
- **Asset Pipeline**: Drag-and-drop local file ingestion (JPEG, PNG, WebP, SVG, GIF up to 25MB).
- **Direct Canvas Ingestion**: Ingest assets directly via OS file drop or paste buffer (`Ctrl + V`).
- **Non-Destructive Cropping**: Interactive bounding-box crop mask with aspect-ratio locking and double-click pan adjustment.
- **Image Filters & Color Grading**: Sliders for brightness, contrast, saturation, blur, grayscale, sepia, invert, and hue shift.
- **Frame & Mask Clipping**: Pre-made geometric frames (circle, arch, badge) where dragged images automatically snap and clip into shape.

### 2.8 Object Manipulation
- **Interactive Bounding Box**: 8-handle transform box (4 corner scale, 4 edge resize, top rotation handle).
- **Uniform Scaling**: Proportional scaling by default, unconstrained scaling holding `Shift`.
- **Rotation**: Smooth rotational snap every 15° when holding `Shift`.
- **Multi-Selection**: Rubber-band lasso selection or `Shift + Click` multi-select.
- **Grouping / Ungrouping**: Aggregate multiple objects into composite groups (`Ctrl + G`) with preserved relative coordinates; ungroup (`Ctrl + Shift + G`).
- **Locking**: Toggle object lock (`Ctrl + L`) to prevent accidental repositioning or deletion.
- **Distribution & Alignment**: Align Left, Center, Right, Top, Middle, Bottom; distribute horizontally and vertically.

### 2.9 Layer Management
- **Z-Index Hierarchy**: Dedicated visual panel listing all canvas elements from top to bottom.
- **Direct Reordering**: Drag-and-drop layer reordering, plus instant shortcuts: Bring to Front (`Ctrl + ]`), Send to Back (`Ctrl + [`).
- **Layer Visibility & Renaming**: Toggle layer hide/show (eye icon), layer lock (padlock icon), and double-click to rename elements.

### 2.10 Page Management (Multi-Page Documents)
- **Artboard Stack**: Vertical artboard presentation or horizontal thumbnail filmstrip.
- **Page Operations**: Add new blank page, duplicate existing page, delete page, reorder pages up/down.
- **Per-Page Attributes**: Custom dimensions or inherit global document dimensions; distinct page background colors.

### 2.11 Save & Autosave
- **Debounced Autosave**: Automatic sync triggered 1500ms after user interaction settles.
- **Offline Resiliency**: Optimistic UI updates with IndexedDB local caching; sync queue replay upon reconnection.
- **Revision History**: Named checkpoints and automatic incremental timestamps to restore earlier revisions.

### 2.12 Export Engine
- **Client-Side Vector/Raster**: Immediate rendering to PNG (1x, 2x, 3x retina scale), JPEG (quality slider 0-100%), and SVG.
- **Multi-Page PDF**: Paginated high-resolution PDF document compilation.
- **Selective Page Export**: Export All Pages (as separate zip files or consolidated PDF) or specify custom page ranges (e.g., `1, 3-5`).

### 2.13 Sharing & Collaboration
- **Public/Private Sharing**: Public read-only view link with optional password protection.
- **Collaborator Invitations**: Invite collaborators via email with granular roles (Viewer vs Editor).
- **Presence & Live Cursors**: Real-time cursor coordinates, live object selection indicators, and concurrent edits synchronized over WebSockets.

### 2.14 Responsive Design & Viewport Support
- **Adaptive Workspace**: Collapsible sidebars and floating context toolbars to maximize canvas area on laptops (1280px), desktops (1920px+), and ultrawides.
- **Touch & Tablet Compatibility**: Touch-friendly anchor targets (minimum 44x44px hitboxes) and pinch-to-zoom gestures.

---

## 3. Detailed Workflow Descriptions

### 3.1 Workflow: Create Design from Scratch or Template

```
[Dashboard / Home]
       │
       ├──> Click "+ Create a design" ──> Select Preset / Custom Dimensions (e.g. 1080x1080)
       │                                            │
       └──> Browse Templates ──> Click Template ──> Duplicate as New Document
                                                    │
                                                    ▼
                                    [Initialize Editor Engine]
                                    - Load Fonts & Assets
                                    - Initialize Fabric.js Canvas
                                    - Start Autosave Worker
```

1. **Initial UI State**:
   - User is on Dashboard (`/app`). Header displays global navigation, search input, and "+ Create a design" CTA.
   - Main section presents a grid of recent designs and a horizontal carousel of preset dimensions (Instagram Post 1080x1080, Twitter Banner 1500x500, A4 Document 2480x3508).
2. **User Actions**:
   - User clicks "+ Create a design" -> Dropdown opens offering presets or a "Custom size" form (Width, Height, Unit: px/in/mm).
   - Alternatively, user searches "Sale flyer" in Template tab, hovers a card, and clicks "Customize this template".
3. **Resulting Changes**:
   - System calls `POST /api/designs` generating a new document record.
   - Router transitions to `/editor/[id]`.
   - Canvas initializes with specified pixel dimensions, centered in the viewport with a default zoom to fit (typically 60-80%).
4. **Available Controls**: Canvas dimension change prompt, zoom controls, preset picker.
5. **Expected Keyboard Shortcuts**: `Escape` (dismiss template modal), `Enter` (confirm custom dimensions).
6. **Refresh Persistence**: Document UUID is committed to database; refreshing `/editor/[id]` reloads the exact canvas state from server/IndexedDB.
7. **Loading/Empty States**:
   - Loading: Skeleton canvas artboard with pulsating center spinner.
   - Error: Toast notification ("Failed to initialize design") with "Back to Dashboard" button.

---

### 3.2 Workflow: Edit Text & Apply Typography

1. **Initial UI State**:
   - Canvas displays one or more elements. Text drawer is open on the left sidebar.
2. **User Actions**:
   - User clicks "Add a heading" or presses `T` on the keyboard.
   - User double-clicks an existing text box on canvas.
   - User types new copy, selects substring or whole box, and modifies font family to "Inter" and color to `#4F46E5`.
3. **Resulting Changes**:
   - On `T` click: An editable `fabric.IText` / `fabric.Textbox` object is spawned at viewport center with default copy "Add a heading".
   - Double-click enters inline editing mode: Native cursor appears, bounding transform handles switch to text-wrap handles, contextual bar highlights font dropdown, font size input, bold/italic buttons, alignment toggles, and color swatch.
   - As characters change, object height dynamically recalculates.
4. **Available Controls**: Font Family (Google Fonts popover), Font Size (+ / - / direct input), Bold (`B`), Italic (`I`), Underline (`U`), Strikethrough, Text Alignment, Letter Spacing slider, Line Height slider.
5. **Expected Keyboard Shortcuts**:
   - `T`: Spawn new text box
   - `Ctrl + B`: Toggle bold
   - `Ctrl + I`: Toggle italic
   - `Ctrl + U`: Toggle underline
   - `Escape`: Exit inline text editing mode, retaining selection on object
6. **Refresh Persistence**: Character content, font styles, and bounding box dimensions are serialized into document JSON and saved to remote store.
7. **Loading/Empty States**:
   - Font loading: When picking a new Google font, temporary font skeleton/fallback is rendered until webfont binary loads via WebFontLoader/FontFace API, then canvas triggers a re-render.

---

### 3.3 Workflow: Add and Style Geometric Shapes

1. **Initial UI State**: Canvas active. Left sidebar active on "Elements" drawer.
2. **User Actions**:
   - User clicks "Rounded Rectangle" primitive or drags it onto the canvas at coordinates `(250, 400)`.
   - User clicks the fill color tile on the contextual bar and selects `#10B981` (Emerald).
   - User drags the corner radius slider from `0px` to `16px`.
3. **Resulting Changes**:
   - Element is instantiated as a vector rect on canvas with transform handles active.
   - Contextual bar shifts to Shape properties: Fill Color, Stroke Color, Stroke Width, Corner Radius, Opacity, Layer Arrangement.
   - Dynamic guides appear as user drags the shape to snap to center axes of adjacent elements.
4. **Available Controls**: Fill picker (palette + hex input + eyedropper), stroke width slider, border style (solid, dashed), corner radius slider, transparency slider (0-100%).
5. **Expected Keyboard Shortcuts**:
   - `R`: Insert rectangle
   - `O`: Insert circle / ellipse
   - `L`: Insert line
   - `Delete` / `Backspace`: Remove selected shape
6. **Refresh Persistence**: Shape vector coordinates, path data, fill, stroke, and radius saved to document model.

---

### 3.4 Workflow: Upload and Manipulate Images

1. **Initial UI State**: Canvas active. "Uploads" drawer open.
2. **User Actions**:
   - User drags a local file `product.png` directly onto the browser window or clicks "Upload files" button.
   - File is uploaded to storage, thumbnail appears in uploads gallery.
   - User clicks thumbnail to place image on canvas, or drags it into an existing circular Frame element.
   - User clicks "Crop" on the contextual bar, adjusts crop window, and confirms.
3. **Resulting Changes**:
   - Upload drawer displays progress bar (0% -> 100%).
   - Image object is placed at canvas center or clipped into target Frame geometry.
   - Crop mode dims outer canvas, reveals crop bounding handles.
4. **Available Controls**: Upload button, Replace image, Crop, Flip Horizontal, Flip Vertical, Filter Presets, Sliders (Brightness, Contrast, Saturation, Blur).
5. **Expected Keyboard Shortcuts**:
   - `Double Click`: Enter crop mode
   - `Enter` (in crop mode): Commit crop
   - `Escape` (in crop mode): Discard crop changes
6. **Refresh Persistence**: Image URL, clip path, crop offsets (`cropX`, `cropY`, `scaleX`, `scaleY`), and filter matrix persisted.
7. **Loading/Empty States**:
   - Uploading: Upload card shows thumbnail skeleton with progress percentage and cancel button.
   - Error: "Image failed to upload. Files must be under 25MB (PNG, JPG, WebP)."

---

### 3.5 Workflow: Document Export (PNG, JPEG, PDF)

1. **Initial UI State**: User has an active multi-page or single-page design. Top bar displays "Export" / "Download" button.
2. **User Actions**:
   - User clicks "Export" button in top-right header.
   - Dropdown modal opens: File Type (`PNG`, `JPEG`, `PDF Standard`, `PDF Print`), Size/Scale (`0.5x`, `1x`, `2x`, `3x`), Transparent Background checkbox, Page selection (`All Pages`, `Page 1`, etc.).
   - User selects `PNG`, `2x`, and clicks "Download".
3. **Resulting Changes**:
   - Export modal displays progress spinner ("Preparing your design...").
   - Hidden high-resolution rasterization pipeline generates canvas raster buffer without UI overlays or selection boxes.
   - Browser initiates file download `DesignFlow-[Project-Title]-[Page-1].png`.
   - Success toast appears: "Design exported successfully!"
4. **Available Controls**: Format select, scale factor slider/pills, transparency toggle, JPEG quality slider, page range selector, Download CTA.
5. **Expected Keyboard Shortcuts**: `Ctrl + Shift + E` (Trigger export dialog).
6. **Refresh Persistence**: Last selected export preferences stored in user local storage for reuse.
7. **Error States**: If canvas contains an image with CORS blocking rasterization, error displays: "Security error: One or more remote images cannot be exported due to cross-origin policies."

---

### 3.6 Workflow: Sharing & Real-time Collaboration

1. **Initial UI State**: Top bar displays "Share" button and connected user avatar pile.
2. **User Actions**:
   - User clicks "Share".
   - Modal presents: "Share this design", Link Access dropdown ("Only people invited", "Anyone with link can view", "Anyone with link can edit"), email invite input.
   - User invites `colleague@example.com` as "Editor" and copies public view link.
3. **Resulting Changes**:
   - Invitation record created in database.
   - If colleague opens link simultaneously, WebSocket connection connects room `room-[designId]`.
   - Colleague's cursor appears on canvas in real time with distinct name tag and color badge.
   - Elements selected by colleague display remote bounding box in collaborator's color.
4. **Available Controls**: Role dropdown (Viewer, Editor), Copy Link button, revoke access button.
5. **Keyboard Shortcuts**: `Escape` (close share modal).
6. **Refresh Persistence**: Access list and permissions persisted in PostgreSQL DB.

---

## 4. UI Component Inventory

### 4.1 Navigation & Global Header Components
| Component Name | Description | Key Props / State |
| :--- | :--- | :--- |
| `AppHeader` | Global shell top bar for dashboard and general platform navigation | `user`, `activeWorkspace`, `notificationsCount` |
| `EditorHeader` | Specialized editor bar with title editing, autosave state, undo/redo, export, share | `title`, `saveStatus: 'saved' \| 'saving' \| 'error'`, `canUndo`, `canRedo`, `collaborators[]` |
| `BreadcrumbNav` | Hierarchical navigation trail (e.g. Workspace > Marketing > Fall Campaign) | `items: { label: string, href: string }[]` |
| `UserMenuDropdown` | Profile trigger showing avatar, email, workspace switcher, and logout | `user`, `onSignOut()` |

### 4.2 Dashboard & Project Management Components
| Component Name | Description | Key Props / State |
| :--- | :--- | :--- |
| `ProjectCard` | Grid card representing a design; includes thumbnail, title, last modified, options menu | `id`, `title`, `thumbnailUrl`, `updatedAt`, `pageCount`, `onDelete()`, `onDuplicate()` |
| `ProjectGrid` | Responsive grid container with layout toggle (grid vs table/list) | `projects[]`, `isLoading`, `layout: 'grid' \| 'list'` |
| `ProjectFilters` | Search input, sort dropdown (date modified, title), and tag filters | `searchQuery`, `sortBy`, `filterTag`, `onChange()` |
| `FolderSidebar` | Left tree view for workspaces, personal projects, templates, trash | `activeFolderId`, `folders[]`, `onSelectFolder()` |
| `CreateDesignModal`| Dialog offering canvas presets and custom pixel dimension inputs | `isOpen`, `onClose()`, `onCreate(width, height, unit)` |

### 4.3 Editor Canvas & Workspace Components
| Component Name | Description | Key Props / State |
| :--- | :--- | :--- |
| `EditorCanvas` | Core viewport hosting Fabric.js canvas, gesture handlers, and drop targets | `width`, `height`, `zoom`, `activePageId`, `isPanning` |
| `CanvasRuler` | Horizontal and vertical pixel rulers with cursor tracking indicators | `zoom`, `scrollOffset`, `unit: 'px'` |
| `ContextualToolbar`| Dynamic bar providing element-specific properties depending on selection | `selectedType: 'text' \| 'image' \| 'shape' \| 'multi' \| 'none'`, `attributes` |
| `LeftToolDock` | Slim icon strip toggling full side panels (Templates, Elements, Text, Uploads, Layers) | `activeTab`, `onTabChange()` |
| `ElementsPanel` | Searchable list of vector shapes, lines, frames, and icons | `onAddShape(type)`, `onAddIcon(svgUrl)` |
| `TypographyPanel` | Typography presets (Heading, Subheading, Body) and font style library | `onAddText(preset)` |
| `UploadsPanel` | Upload drop area, storage usage indicator, grid of user uploaded assets | `uploads[]`, `onUpload(file)`, `onSelectAsset(asset)` |
| `LayersPanel` | Vertical reorderable list of canvas objects with visibility/lock controls | `layers[]`, `selectedLayerId`, `onReorder()`, `onToggleLock()` |
| `PageManagerBar` | Bottom strip displaying page thumbnails, add page button, page duplicate | `pages[]`, `activePageIndex`, `onSelectPage()`, `onAddPage()` |
| `ZoomControls` | Canvas footer widget with zoom in/out, percentage display, zoom-to-fit | `zoom`, `onZoomIn()`, `onZoomOut()`, `onFitScreen()` |

### 4.4 Modals & Dialog Components
| Component Name | Description | Key Props / State |
| :--- | :--- | :--- |
| `ExportModal` | Dialog for choosing export formats (PNG, JPG, PDF), scale, and pages | `isOpen`, `onClose()`, `onExport(options)` |
| `ShareModal` | Collaboration and access permission configuration dialog | `isOpen`, `onClose()`, `shareUrl`, `collaborators[]`, `onInvite()` |
| `KeyboardShortcutsModal`| Cheat sheet modal showing all editor hotkeys | `isOpen`, `onClose()` |
| `ConfirmDialog` | Reusable modal for destructive actions (delete design, delete page) | `title`, `message`, `confirmText`, `onConfirm()`, `isOpen` |

---

## 5. Functional Requirements (FR-001 to FR-035)

| ID | Module | Requirement Description | Priority |
| :--- | :--- | :--- | :--- |
| **FR-001** | Auth | Users must be able to sign up and authenticate via Email/Password and OAuth (Google, GitHub). | P0 |
| **FR-002** | Auth | System must issue JWT access tokens with silent refresh token rotation and session revocation. | P0 |
| **FR-003** | Dashboard | Users must be able to view a paginated/infinite-scroll grid of their owned and shared designs. | P0 |
| **FR-004** | Dashboard | Users must be able to create a blank design by providing custom pixel dimensions or choosing standard presets. | P0 |
| **FR-005** | Dashboard | Users must be able to clone, rename, and soft-delete designs into a Trash bin. | P0 |
| **FR-006** | Editor Core | Canvas must initialize a hardware-accelerated Fabric.js viewport centered in the browser window. | P0 |
| **FR-007** | Editor Core | Canvas must support interactive zoom (10% to 500%) via scroll-wheel and pan via `Spacebar + Drag`. | P0 |
| **FR-008** | Object Mgmt | Users must be able to select, move, scale (proportional and free), rotate, and delete canvas objects. | P0 |
| **FR-009** | Object Mgmt | System must render an interactive 8-handle bounding box around single and multi-selected objects. | P0 |
| **FR-010** | Object Mgmt | System must provide multi-object selection via click-drag lasso box and `Shift + Click`. | P0 |
| **FR-011** | Text | Users must be able to add editable text boxes with custom font family, font size, color, weight, and alignment. | P0 |
| **FR-012** | Text | System must support direct on-canvas double-click inline text editing. | P0 |
| **FR-013** | Text | System must dynamically load web fonts asynchronously from Google Fonts without freezing the canvas. | P1 |
| **FR-014** | Shapes | Users must be able to insert geometric shapes (rect, circle, triangle, star, line) with configurable fill and stroke. | P0 |
| **FR-015** | Shapes | Rectangles must support interactive corner radius adjustments (0 to 100px). | P1 |
| **FR-016** | Media | Users must be able to upload raster images (PNG, JPEG, WebP) up to 25MB via file picker or drag-and-drop. | P0 |
| **FR-017** | Media | Users must be able to non-destructively crop images using an interactive clipping rect. | P1 |
| **FR-018** | Media | Images must support non-destructive image filters (brightness, contrast, saturation, blur). | P2 |
| **FR-019** | Layers | Users must be able to change object Z-index: Bring Forward, Send Backward, Bring to Front, Send to Back. | P0 |
| **FR-020** | Layers | Users must be able to inspect a Layers tree panel, toggle visibility, and toggle lock state. | P1 |
| **FR-021** | Grouping | Users must be able to group multiple objects (`Ctrl + G`) and ungroup composite groups (`Ctrl + Shift + G`). | P1 |
| **FR-022** | Alignment | System must calculate and display real-time smart snap guidelines when dragging objects near canvas edges or centers. | P1 |
| **FR-023** | History | System must implement full undo and redo functionality (`Ctrl + Z`, `Ctrl + Y`) using a Command pattern stack. | P0 |
| **FR-024** | Persistence | System must automatically autosave changes to the server debounced at 1500ms after user modifications. | P0 |
| **FR-025** | Persistence | System must cache document JSON in IndexedDB to prevent data loss during network interruptions. | P1 |
| **FR-026** | Export | System must export canvas to PNG and JPEG at configurable scales (1x, 2x, 3x) directly in the browser. | P0 |
| **FR-027** | Export | System must support transparent background PNG export. | P1 |
| **FR-028** | Export | System must export multi-page designs to compiled PDF documents. | P1 |
| **FR-029** | Multi-Page | Users must be able to add, reorder, duplicate, and delete multiple artboard pages within a single design document. | P1 |
| **FR-030** | Templates | Users must be able to browse a curated template gallery, filter by category, and clone a template into their workspace. | P1 |
| **FR-031** | Templates | Users must be able to mark their own designs as reusable templates. | P2 |
| **FR-032** | Collab | Users must be able to generate public view links and invite specific users via email with Editor/Viewer roles. | P1 |
| **FR-033** | Collab | System must synchronize real-time edits, cursor positions, and selections across concurrent active sessions via Yjs/WebSockets. | P2 |
| **FR-034** | Keyboard | Platform must provide standard hotkeys for all primary operations (Copy, Cut, Paste, Duplicate, Delete, Group, Zoom). | P0 |
| **FR-035** | Brand Kit | Users must be able to save brand color palettes and quickly apply them to canvas elements. | P2 |

---

## 6. Non-Functional Requirements (NFRs)

### 6.1 Performance Requirements
- **Canvas Framerate**: The canvas manipulation loop (drag, scale, rotate) must maintain at least **55-60 FPS** on standard modern hardware (Intel i5 / 8GB RAM or equivalent).
- **Initial Editor Boot Time**: Time-to-Interactive (TTI) for an editor session with up to 50 canvas objects must not exceed **1.8 seconds** on broadband connections.
- **Autosave Latency**: Autosave payloads must be processed and acknowledged by the backend in under **300ms** (p95).
- **Client-Side Export Speed**: Single-page 1080x1080 PNG 2x export must render in under **800ms** on the client.

### 6.2 Security Requirements
- **Data Protection**: All communication must be enforced over TLS 1.3. Stored assets in S3 must be private, accessible only through time-limited pre-signed URLs (maximum 15-minute TTL).
- **Content Sanitization**: All user-submitted SVGs must be strictly sanitized using DOMPurify on both client and server to prevent SVG-based Stored Cross-Site Scripting (XSS).
- **Authorization Enforcement**: Every API route mutating a document must authenticate the caller and verify project ownership or explicit RBAC editor privileges.
- **Rate Limiting**: Public upload and export endpoints must be rate-limited (e.g., max 60 requests/minute per authenticated user IP).

### 6.3 Accessibility (a11y) Requirements
- **Keyboard Operability**: All workspace shell controls, modals, and panel drawers must be navigable via standard `Tab`, `Shift + Tab`, and `Enter`/`Space` interactions.
- **Screen Reader Support**: All tool buttons must feature explicit `aria-label` tags and reflect toggled state (`aria-pressed`, `aria-expanded`).
- **Contrast Ratios**: Dashboard and editor shell typography and icons must strictly comply with WCAG 2.1 AA standards (minimum 4.5:1 for normal text).

### 6.4 Scalability & Reliability
- **Concurrent Collaborators**: Architecture must support up to **20 concurrent active editors** per document room without degradation in CRDT convergence.
- **Document Model Size**: Document schema must efficiently compress or paginate page nodes to comfortably support documents with up to **50 artboard pages** and **1,000+ objects**.
- **High Availability**: Stateless API server layer and database replication must achieve a 99.9% uptime objective.

---

## 7. Implementation Priorities

```
┌────────────────────────────────────────────────────────────────────────┐
│                      P0: Minimum Viable Product (MVP)                  │
│  - Auth (Email + OAuth)           - Core Canvas (Fabric.js)            │
│  - Blank Project Creation          - Text, Shapes, Image Upload        │
│  - Basic Object Transforms        - Undo / Redo Command Stack          │
│  - Debounced Autosave to DB       - Single-Page PNG / JPEG Export      │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                          P1: Important Foundations                     │
│  - Multi-Page Artboards           - Smart Alignment & Snapping         │
│  - Image Cropping Mask            - Layers Reordering Panel            │
│  - Grouping & Ungrouping          - IndexedDB Local Resilience         │
│  - PDF Document Export            - Template Library & Cloning         │
│  - Read/Write Share Permissions   - Google Fonts Browser               │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                         P2: Differentiators & Polish                   │
│  - Real-Time Yjs WebSockets Sync  - Remote Multi-Cursor Presence       │
│  - Image Filter Adjustments       - Custom Brand Kit Palettes          │
│  - Vector SVG Path Ingestion      - Revision History Restores          │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                         P3: Future Enhancements                        │
│  - AI Inpainting & Background Removal - Complex Vector Pen Tool        │
│  - Animated Canvas Transitions (GIF/MP4) - Plugin Extension Ecosystem │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 8. Open Questions & Architectural Decisions

1. **Canvas Rendering Abstraction: Fabric.js vs. Custom PixiJS/Canvas2D Engine**
   - *Question*: Fabric.js provides immediate rich object models and text editing, but can face performance overhead when document object count exceeds 1,500 items.
   - *Resolution*: Adopt Fabric.js v6 (latest TypeScript release) for MVP through P2 due to its mature text-editing engine (`fabric.Textbox`) and SVG serialization. If complex multi-thousand node vector illustration is needed in P3, migrate rendering layer to PixiJS/WebGL while retaining document model.
2. **Document Model: Monolithic Document JSON vs. Normalized Relational Pages**
   - *Question*: Should autosave send the complete document JSON every cycle, or send page-level delta diffs?
   - *Resolution*: For MVP/P1, persist entire document JSON with debouncing (standard size is typically <200KB). For real-time collaboration (P2), shift to atomic CRDT updates via Yjs where only modified binary state vectors are transmitted.
3. **Export Engine: Client Canvas Rasterization vs. Headless Server-Side Worker**
   - *Question*: Client-side `canvas.toDataURL()` is instantaneous and cost-free, but mobile devices or large 300 DPI multi-page print documents can crash memory.
   - *Resolution*: Hybrid approach. Direct single-page PNG/JPEG exports under 4K resolution run directly on client canvas. Multi-page high-resolution PDF print exports enqueue a background job processed by a Node.js worker using `@resvg/resvg-js` and `pdf-lib`.
4. **Font Licensing and Loading Strategy**
   - *Question*: How to handle custom uploaded fonts during export across different environments?
   - *Resolution*: Store uploaded font TTF/WOFF2 files in S3 and inject `@font-face` rules dynamically into the DOM before triggering rasterization.
