// DesignFlow - Shared Type Definitions
// Core document model types used across frontend, backend, and editor engine

// ============================================================
// Primitive Types
// ============================================================

export type Color = {
  r: number; // 0-255
  g: number; // 0-255
  b: number; // 0-255
  a: number; // 0-1
};

export type Point = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

export type Transform = {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number; // degrees, 0-360
  scaleX: number;
  scaleY: number;
};

export type Shadow = {
  color: Color;
  blur: number;
  offsetX: number;
  offsetY: number;
};

export type Border = {
  color: Color;
  width: number;
  style: 'solid' | 'dashed' | 'dotted';
};

// ============================================================
// Fill Types
// ============================================================

export type SolidFill = {
  type: 'solid';
  color: Color;
};

export type GradientStop = {
  offset: number; // 0-1
  color: Color;
};

export type LinearGradientFill = {
  type: 'linear-gradient';
  angle: number;
  stops: GradientStop[];
};

export type RadialGradientFill = {
  type: 'radial-gradient';
  centerX: number; // 0-1
  centerY: number; // 0-1
  radius: number;
  stops: GradientStop[];
};

export type Fill = SolidFill | LinearGradientFill | RadialGradientFill;

// ============================================================
// Text Types
// ============================================================

export type TextAlign = 'left' | 'center' | 'right' | 'justify';
export type VerticalAlign = 'top' | 'middle' | 'bottom';
export type FontWeight = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
export type FontStyle = 'normal' | 'italic';
export type TextDecoration = 'none' | 'underline' | 'strikethrough' | 'underline-strikethrough';

export type TextStyle = {
  fontFamily: string;
  fontSize: number;
  fontWeight: FontWeight;
  fontStyle: FontStyle;
  textDecoration: TextDecoration;
  color: Color;
  lineHeight: number; // multiplier, e.g. 1.5
  letterSpacing: number; // in px
  textAlign: TextAlign;
  verticalAlign: VerticalAlign;
};

// ============================================================
// Element Types (Discriminated Union)
// ============================================================

export type BaseElement = {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
  opacity: number; // 0-1
  locked: boolean;
  visible: boolean;
  shadow?: Shadow;
  border?: Border;
};

export type TextElement = BaseElement & {
  type: 'text';
  content: string;
  style: TextStyle;
  backgroundColor?: Color;
  padding: number;
};

export type ShapeType = 'rectangle' | 'circle' | 'ellipse' | 'triangle' | 'star' | 'polygon' | 'line' | 'arrow';

export type ShapeElement = BaseElement & {
  type: 'shape';
  shapeType: ShapeType;
  fill: Fill;
  stroke: Color;
  strokeWidth: number;
  cornerRadius: number;
  sides?: number; // for polygon
  innerRadius?: number; // for star
};

export type ImageElement = BaseElement & {
  type: 'image';
  src: string; // URL or asset reference
  assetId?: string;
  originalWidth: number;
  originalHeight: number;
  cropX: number;
  cropY: number;
  cropWidth: number;
  cropHeight: number;
  filters?: ImageFilters;
};

export type ImageFilters = {
  brightness: number; // -1 to 1
  contrast: number; // -1 to 1
  saturation: number; // -1 to 1
  blur: number; // 0+
  grayscale: boolean;
  sepia: boolean;
};

export type GroupElement = BaseElement & {
  type: 'group';
  children: DesignElement[];
};

export type DesignElement = TextElement | ShapeElement | ImageElement | GroupElement;

// ============================================================
// Background Types
// ============================================================

export type BackgroundConfig =
  | { type: 'color'; color: Color }
  | { type: 'image'; src: string; assetId?: string }
  | { type: 'gradient'; fill: LinearGradientFill | RadialGradientFill };

// ============================================================
// Page Type
// ============================================================

export type DesignPage = {
  id: string;
  name: string;
  background: BackgroundConfig;
  elements: DesignElement[];
  duration?: number; // for animated/video pages, in ms
};

// ============================================================
// Document Type
// ============================================================

export type CanvasPreset = {
  name: string;
  width: number;
  height: number;
  category: string;
};

export type ExportSettings = {
  format: 'png' | 'jpeg' | 'pdf' | 'svg';
  quality: number; // 0-1 for jpeg
  scale: number; // 1 = 1x, 2 = 2x
  transparentBackground: boolean;
  pageRange: 'all' | number[];
};

export type DesignDocument = {
  id: string;
  title: string;
  width: number;
  height: number;
  unit: 'px' | 'mm' | 'in';
  schemaVersion: number;
  version: number; // incremented on each save
  pages: DesignPage[];
  exportSettings: ExportSettings;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
};

// ============================================================
// Document Metadata (for dashboard/listings)
// ============================================================

export type DocumentMetadata = {
  id: string;
  title: string;
  width: number;
  height: number;
  ownerId: string;
  ownerName: string;
  thumbnailUrl?: string;
  pageCount: number;
  createdAt: string;
  updatedAt: string;
  lastOpenedAt?: string;
  isTemplate: boolean;
  templateCategory?: string;
  shareStatus: 'private' | 'shared' | 'public';
};

// ============================================================
// Template Types
// ============================================================

export type TemplateCategory =
  | 'social-media'
  | 'presentation'
  | 'poster'
  | 'youtube-thumbnail'
  | 'invitation'
  | 'resume'
  | 'business-card'
  | 'flyer'
  | 'instagram-story'
  | 'facebook-post'
  | 'twitter-post'
  | 'logo'
  | 'infographic'
  | 'custom';

export type Template = {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  tags: string[];
  thumbnailUrl: string;
  previewUrl?: string;
  document: DesignDocument;
  isPremium: boolean;
  usageCount: number;
  createdAt: string;
};

// ============================================================
// Asset Types
// ============================================================

export type AssetType = 'image' | 'svg' | 'font' | 'video';

export type Asset = {
  id: string;
  ownerId: string;
  name: string;
  type: AssetType;
  mimeType: string;
  url: string;
  thumbnailUrl?: string;
  fileSize: number; // bytes
  width?: number;
  height?: number;
  createdAt: string;
};

// ============================================================
// User & Auth Types
// ============================================================

export type UserRole = 'user' | 'admin';

export type User = {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: UserRole;
  createdAt: string;
};

// ============================================================
// Sharing & Collaboration Types
// ============================================================

export type Permission = 'viewer' | 'commenter' | 'editor' | 'owner';

export type ShareInvitation = {
  id: string;
  documentId: string;
  invitedEmail: string;
  invitedUserId?: string;
  permission: Permission;
  invitedBy: string;
  createdAt: string;
  acceptedAt?: string;
};

export type Collaborator = {
  userId: string;
  userName: string;
  avatarUrl?: string;
  permission: Permission;
  isOnline: boolean;
  cursorPosition?: Point;
  cursorColor: string;
  lastActiveAt: string;
};

export type CollaborationEvent =
  | { type: 'cursor-move'; userId: string; position: Point }
  | { type: 'selection-change'; userId: string; elementIds: string[] }
  | { type: 'element-update'; elementId: string; changes: Partial<DesignElement> }
  | { type: 'element-add'; element: DesignElement; pageId: string }
  | { type: 'element-delete'; elementId: string; pageId: string }
  | { type: 'page-add'; page: DesignPage; index: number }
  | { type: 'page-delete'; pageId: string }
  | { type: 'user-join'; user: Collaborator }
  | { type: 'user-leave'; userId: string };

// ============================================================
// Version History Types
// ============================================================

export type DocumentRevision = {
  id: string;
  documentId: string;
  version: number;
  snapshot: DesignDocument;
  createdBy: string;
  createdAt: string;
  description?: string;
};

// ============================================================
// Comment Types
// ============================================================

export type Comment = {
  id: string;
  documentId: string;
  pageId: string;
  userId: string;
  userName: string;
  userAvatarUrl?: string;
  content: string;
  position: Point; // on canvas
  resolved: boolean;
  parentId?: string; // for replies
  createdAt: string;
  updatedAt: string;
};

// ============================================================
// API Response Types
// ============================================================

export type ApiResponse<T> = {
  success: true;
  data: T;
} | {
  success: false;
  error: string;
  code: string;
};

export type PaginatedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
};

// ============================================================
// Canvas Presets
// ============================================================

export const CANVAS_PRESETS: CanvasPreset[] = [
  // Social Media
  { name: 'Instagram Post', width: 1080, height: 1080, category: 'social-media' },
  { name: 'Instagram Story', width: 1080, height: 1920, category: 'social-media' },
  { name: 'Facebook Post', width: 1200, height: 630, category: 'social-media' },
  { name: 'Twitter Post', width: 1600, height: 900, category: 'social-media' },
  { name: 'LinkedIn Post', width: 1200, height: 627, category: 'social-media' },

  // Video
  { name: 'YouTube Thumbnail', width: 1280, height: 720, category: 'youtube-thumbnail' },
  { name: 'YouTube Banner', width: 2560, height: 1440, category: 'youtube-thumbnail' },

  // Print
  { name: 'Poster (18×24)', width: 1800, height: 2400, category: 'poster' },
  { name: 'Flyer (8.5×11)', width: 2550, height: 3300, category: 'flyer' },
  { name: 'Business Card', width: 1050, height: 600, category: 'business-card' },
  { name: 'Resume', width: 2480, height: 3508, category: 'resume' }, // A4 at 300dpi
  { name: 'Invitation', width: 1500, height: 2100, category: 'invitation' },

  // Presentation
  { name: 'Presentation (16:9)', width: 1920, height: 1080, category: 'presentation' },
  { name: 'Presentation (4:3)', width: 1024, height: 768, category: 'presentation' },

  // Logo
  { name: 'Logo', width: 500, height: 500, category: 'logo' },

  // Custom
  { name: 'Custom Size', width: 800, height: 600, category: 'custom' },
];

// ============================================================
// Default Values
// ============================================================

export const DEFAULT_COLORS = {
  white: { r: 255, g: 255, b: 255, a: 1 } as Color,
  black: { r: 0, g: 0, b: 0, a: 1 } as Color,
  transparent: { r: 0, g: 0, b: 0, a: 0 } as Color,
  primary: { r: 99, g: 66, b: 236, a: 1 } as Color,
};

export const DEFAULT_TEXT_STYLE: TextStyle = {
  fontFamily: 'Inter',
  fontSize: 24,
  fontWeight: 'normal',
  fontStyle: 'normal',
  textDecoration: 'none',
  color: DEFAULT_COLORS.black,
  lineHeight: 1.4,
  letterSpacing: 0,
  textAlign: 'left',
  verticalAlign: 'top',
};

export const DEFAULT_EXPORT_SETTINGS: ExportSettings = {
  format: 'png',
  quality: 0.92,
  scale: 1,
  transparentBackground: false,
  pageRange: 'all',
};

export const SCHEMA_VERSION = 1;

// ============================================================
// Utility Types
// ============================================================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type ElementType = DesignElement['type'];

export type ElementOfType<T extends ElementType> = Extract<DesignElement, { type: T }>;
