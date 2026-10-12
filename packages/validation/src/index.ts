// DesignFlow - Document Validation
// Runtime validation for design documents using Zod

import { z } from 'zod';

// ============================================================
// Primitive Schemas
// ============================================================

export const ColorSchema = z.object({
  r: z.number().min(0).max(255),
  g: z.number().min(0).max(255),
  b: z.number().min(0).max(255),
  a: z.number().min(0).max(1),
});

export const PointSchema = z.object({
  x: z.number(),
  y: z.number(),
});

export const ShadowSchema = z.object({
  color: ColorSchema,
  blur: z.number().min(0),
  offsetX: z.number(),
  offsetY: z.number(),
});

export const BorderSchema = z.object({
  color: ColorSchema,
  width: z.number().min(0),
  style: z.enum(['solid', 'dashed', 'dotted']),
});

// ============================================================
// Fill Schemas
// ============================================================

export const GradientStopSchema = z.object({
  offset: z.number().min(0).max(1),
  color: ColorSchema,
});

export const SolidFillSchema = z.object({
  type: z.literal('solid'),
  color: ColorSchema,
});

export const LinearGradientFillSchema = z.object({
  type: z.literal('linear-gradient'),
  angle: z.number(),
  stops: z.array(GradientStopSchema).min(2),
});

export const RadialGradientFillSchema = z.object({
  type: z.literal('radial-gradient'),
  centerX: z.number().min(0).max(1),
  centerY: z.number().min(0).max(1),
  radius: z.number().positive(),
  stops: z.array(GradientStopSchema).min(2),
});

export const FillSchema = z.discriminatedUnion('type', [
  SolidFillSchema,
  LinearGradientFillSchema,
  RadialGradientFillSchema,
]);

// ============================================================
// Text Style Schema
// ============================================================

export const TextStyleSchema = z.object({
  fontFamily: z.string().min(1),
  fontSize: z.number().positive().max(1000),
  fontWeight: z.enum(['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900']),
  fontStyle: z.enum(['normal', 'italic']),
  textDecoration: z.enum(['none', 'underline', 'strikethrough', 'underline-strikethrough']),
  color: ColorSchema,
  lineHeight: z.number().positive().max(10),
  letterSpacing: z.number().min(-50).max(200),
  textAlign: z.enum(['left', 'center', 'right', 'justify']),
  verticalAlign: z.enum(['top', 'middle', 'bottom']),
});

// ============================================================
// Element Schemas
// ============================================================

const BaseElementFields = {
  id: z.string().uuid(),
  name: z.string().max(255),
  x: z.number(),
  y: z.number(),
  width: z.number().positive(),
  height: z.number().positive(),
  rotation: z.number().min(0).max(360),
  scaleX: z.number(),
  scaleY: z.number(),
  opacity: z.number().min(0).max(1),
  locked: z.boolean(),
  visible: z.boolean(),
  shadow: ShadowSchema.optional(),
  border: BorderSchema.optional(),
};

export const TextElementSchema = z.object({
  ...BaseElementFields,
  type: z.literal('text'),
  content: z.string().max(50000),
  style: TextStyleSchema,
  backgroundColor: ColorSchema.optional(),
  padding: z.number().min(0),
});

export const ShapeElementSchema = z.object({
  ...BaseElementFields,
  type: z.literal('shape'),
  shapeType: z.enum(['rectangle', 'circle', 'ellipse', 'triangle', 'star', 'polygon', 'line', 'arrow']),
  fill: FillSchema,
  stroke: ColorSchema,
  strokeWidth: z.number().min(0),
  cornerRadius: z.number().min(0),
  sides: z.number().min(3).max(20).optional(),
  innerRadius: z.number().min(0).optional(),
});

export const ImageFiltersSchema = z.object({
  brightness: z.number().min(-1).max(1),
  contrast: z.number().min(-1).max(1),
  saturation: z.number().min(-1).max(1),
  blur: z.number().min(0),
  grayscale: z.boolean(),
  sepia: z.boolean(),
});

export const ImageElementSchema = z.object({
  ...BaseElementFields,
  type: z.literal('image'),
  src: z.string().min(1),
  assetId: z.string().optional(),
  originalWidth: z.number().positive(),
  originalHeight: z.number().positive(),
  cropX: z.number().min(0),
  cropY: z.number().min(0),
  cropWidth: z.number().positive(),
  cropHeight: z.number().positive(),
  filters: ImageFiltersSchema.optional(),
});

// Forward-declare group schema to handle recursive structure
export const DesignElementSchema: z.ZodType<any> = z.lazy(() =>
  z.discriminatedUnion('type', [
    TextElementSchema,
    ShapeElementSchema,
    ImageElementSchema,
    GroupElementSchema,
  ])
);

export const GroupElementSchema = z.object({
  ...BaseElementFields,
  type: z.literal('group'),
  children: z.array(DesignElementSchema).min(1),
});

// ============================================================
// Background Schema
// ============================================================

export const BackgroundConfigSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('color'), color: ColorSchema }),
  z.object({ type: z.literal('image'), src: z.string().min(1), assetId: z.string().optional() }),
  z.object({
    type: z.literal('gradient'),
    fill: z.union([LinearGradientFillSchema, RadialGradientFillSchema]),
  }),
]);

// ============================================================
// Page Schema
// ============================================================

export const DesignPageSchema = z.object({
  id: z.string().uuid(),
  name: z.string().max(255),
  background: BackgroundConfigSchema,
  elements: z.array(DesignElementSchema).max(1000),
  duration: z.number().positive().optional(),
});

// ============================================================
// Export Settings Schema
// ============================================================

export const ExportSettingsSchema = z.object({
  format: z.enum(['png', 'jpeg', 'pdf', 'svg']),
  quality: z.number().min(0).max(1),
  scale: z.number().min(0.1).max(4),
  transparentBackground: z.boolean(),
  pageRange: z.union([z.literal('all'), z.array(z.number().nonneg())]),
});

// ============================================================
// Document Schema
// ============================================================

export const DesignDocumentSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(500),
  width: z.number().positive().max(10000),
  height: z.number().positive().max(10000),
  unit: z.enum(['px', 'mm', 'in']),
  schemaVersion: z.number().int().positive(),
  version: z.number().int().nonnegative(),
  pages: z.array(DesignPageSchema).min(1).max(100),
  exportSettings: ExportSettingsSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// ============================================================
// Validation Helper Functions
// ============================================================

export function validateDocument(data: unknown) {
  return DesignDocumentSchema.safeParse(data);
}

export function validateElement(data: unknown) {
  return DesignElementSchema.safeParse(data);
}

export function validatePage(data: unknown) {
  return DesignPageSchema.safeParse(data);
}

// ============================================================
// Document Creation Helpers
// ============================================================

export const CreateDocumentRequestSchema = z.object({
  title: z.string().min(1).max(500),
  width: z.number().positive().max(10000),
  height: z.number().positive().max(10000),
  templateId: z.string().uuid().optional(),
});

export const UpdateDocumentRequestSchema = z.object({
  title: z.string().min(1).max(500).optional(),
  content: DesignDocumentSchema.partial().optional(),
});

export const ShareDocumentRequestSchema = z.object({
  email: z.string().email(),
  permission: z.enum(['viewer', 'commenter', 'editor']),
});

export type CreateDocumentRequest = z.infer<typeof CreateDocumentRequestSchema>;
export type UpdateDocumentRequest = z.infer<typeof UpdateDocumentRequestSchema>;
export type ShareDocumentRequest = z.infer<typeof ShareDocumentRequestSchema>;
