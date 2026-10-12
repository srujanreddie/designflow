// DesignFlow - Open Source Comprehensive Template Library
// Curated open-source design templates inspired by modern design workflows (Canva, Unsplash, Dribbble)

import { v4 as uuidv4 } from 'uuid';

export interface OpenSourceTemplate {
  id: string;
  name: string;
  category: 'Social Media' | 'Presentations' | 'Posters' | 'Marketing' | 'Business' | 'Thumbnails' | 'Documents';
  width: number;
  height: number;
  gradient: string;
  tag: string;
  tagVariant: 'default' | 'secondary' | 'purple' | 'warning' | 'success';
  description: string;
  elements: any[];
}

export const OPENSOURCE_TEMPLATES: OpenSourceTemplate[] = [
  // 1. Social Media: Summer Mega Sale
  {
    id: 'tpl-summer-sale',
    name: 'Summer Mega Sale (1080x1080)',
    category: 'Social Media',
    width: 1080,
    height: 1080,
    gradient: 'from-pink-500 via-rose-500 to-amber-500',
    tag: 'Trending',
    tagVariant: 'purple',
    description: 'High-energy e-commerce promotional banner with discount tag',
    elements: [
      {
        id: uuidv4(), type: 'shape', shapeType: 'rectangle', name: 'Background',
        x: 0, y: 0, width: 1080, height: 1080, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: true, visible: true,
        fill: { type: 'solid', color: { r: 244, g: 63, b: 94, a: 1 } },
        stroke: { r: 0, g: 0, b: 0, a: 0 }, strokeWidth: 0, cornerRadius: 0,
      },
      {
        id: uuidv4(), type: 'shape', shapeType: 'circle', name: 'Discount Badge',
        x: 760, y: 120, width: 220, height: 220, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: false, visible: true,
        fill: { type: 'solid', color: { r: 251, g: 191, b: 36, a: 1 } },
        stroke: { r: 255, g: 255, b: 255, a: 1 }, strokeWidth: 4, cornerRadius: 0,
      },
      {
        id: uuidv4(), type: 'text', name: 'Badge Text',
        x: 770, y: 180, width: 200, height: 80, rotation: -12, scaleX: 1, scaleY: 1,
        opacity: 1, locked: false, visible: true,
        content: '50% OFF',
        style: {
          fontFamily: 'Inter', fontSize: 38, fontWeight: '900', fontStyle: 'normal',
          textDecoration: 'none', color: { r: 17, g: 24, b: 39, a: 1 },
          lineHeight: 1.1, letterSpacing: 1, textAlign: 'center', verticalAlign: 'middle',
        },
        padding: 0,
      },
      {
        id: uuidv4(), type: 'text', name: 'Main Title',
        x: 90, y: 400, width: 900, height: 160, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: false, visible: true,
        content: 'SUMMER\nCOLLECTION',
        style: {
          fontFamily: 'Inter', fontSize: 78, fontWeight: 'bold', fontStyle: 'normal',
          textDecoration: 'none', color: { r: 255, g: 255, b: 255, a: 1 },
          lineHeight: 1.05, letterSpacing: 2, textAlign: 'left', verticalAlign: 'top',
        },
        padding: 0,
      },
      {
        id: uuidv4(), type: 'shape', shapeType: 'rectangle', name: 'CTA Button',
        x: 90, y: 740, width: 280, height: 70, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: false, visible: true,
        fill: { type: 'solid', color: { r: 255, g: 255, b: 255, a: 1 } },
        stroke: { r: 0, g: 0, b: 0, a: 0 }, strokeWidth: 0, cornerRadius: 16,
      },
      {
        id: uuidv4(), type: 'text', name: 'CTA Text',
        x: 90, y: 758, width: 280, height: 40, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: false, visible: true,
        content: 'SHOP NOW →',
        style: {
          fontFamily: 'Inter', fontSize: 22, fontWeight: 'bold', fontStyle: 'normal',
          textDecoration: 'none', color: { r: 244, g: 63, b: 94, a: 1 },
          lineHeight: 1, letterSpacing: 1, textAlign: 'center', verticalAlign: 'middle',
        },
        padding: 0,
      },
    ],
  },

  // 2. Social Media: Daily Inspiration Quote
  {
    id: 'tpl-daily-quote',
    name: 'Minimalist Quote Card (1080x1080)',
    category: 'Social Media',
    width: 1080,
    height: 1080,
    gradient: 'from-violet-600 via-indigo-600 to-purple-800',
    tag: 'Popular',
    tagVariant: 'purple',
    description: 'Elegant typography quote for Instagram, Twitter, and LinkedIn',
    elements: [
      {
        id: uuidv4(), type: 'shape', shapeType: 'rectangle', name: 'Background',
        x: 0, y: 0, width: 1080, height: 1080, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: true, visible: true,
        fill: { type: 'solid', color: { r: 248, g: 250, b: 252, a: 1 } },
        stroke: { r: 0, g: 0, b: 0, a: 0 }, strokeWidth: 0, cornerRadius: 0,
      },
      {
        id: uuidv4(), type: 'shape', shapeType: 'rectangle', name: 'Card Box',
        x: 120, y: 220, width: 840, height: 640, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: false, visible: true,
        fill: { type: 'solid', color: { r: 255, g: 255, b: 255, a: 1 } },
        stroke: { r: 226, g: 232, b: 240, a: 1 }, strokeWidth: 2, cornerRadius: 28,
      },
      {
        id: uuidv4(), type: 'text', name: 'Quote Symbol',
        x: 180, y: 280, width: 100, height: 80, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 0.25, locked: false, visible: true,
        content: '“',
        style: {
          fontFamily: 'Inter', fontSize: 120, fontWeight: 'bold', fontStyle: 'normal',
          textDecoration: 'none', color: { r: 99, g: 66, b: 236, a: 1 },
          lineHeight: 1, letterSpacing: 0, textAlign: 'left', verticalAlign: 'top',
        },
        padding: 0,
      },
      {
        id: uuidv4(), type: 'text', name: 'Quote Text',
        x: 180, y: 390, width: 720, height: 260, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: false, visible: true,
        content: 'Design is not just what it looks like and feels like. Design is how it works.',
        style: {
          fontFamily: 'Inter', fontSize: 36, fontWeight: '600', fontStyle: 'normal',
          textDecoration: 'none', color: { r: 15, g: 23, b: 42, a: 1 },
          lineHeight: 1.45, letterSpacing: -0.5, textAlign: 'left', verticalAlign: 'top',
        },
        padding: 0,
      },
      {
        id: uuidv4(), type: 'text', name: 'Author',
        x: 180, y: 690, width: 500, height: 40, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 0.7, locked: false, visible: true,
        content: '— Steve Jobs',
        style: {
          fontFamily: 'Inter', fontSize: 22, fontWeight: '500', fontStyle: 'italic',
          textDecoration: 'none', color: { r: 100, g: 116, b: 139, a: 1 },
          lineHeight: 1, letterSpacing: 1, textAlign: 'left', verticalAlign: 'top',
        },
        padding: 0,
      },
    ],
  },

  // 3. Presentations: Tech Startup Pitch Deck (1920x1080)
  {
    id: 'tpl-startup-pitch',
    name: 'Modern Startup Pitch Deck (16:9)',
    category: 'Presentations',
    width: 1920,
    height: 1080,
    gradient: 'from-slate-900 via-indigo-950 to-slate-900',
    tag: 'Pro',
    tagVariant: 'default',
    description: 'Sleek dark-mode investor pitch deck title slide',
    elements: [
      {
        id: uuidv4(), type: 'shape', shapeType: 'rectangle', name: 'Background',
        x: 0, y: 0, width: 1920, height: 1080, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: true, visible: true,
        fill: { type: 'solid', color: { r: 11, g: 15, b: 25, a: 1 } },
        stroke: { r: 0, g: 0, b: 0, a: 0 }, strokeWidth: 0, cornerRadius: 0,
      },
      {
        id: uuidv4(), type: 'text', name: 'Category Tag',
        x: 150, y: 260, width: 400, height: 40, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: false, visible: true,
        content: 'SERIES A INVESTOR DECK',
        style: {
          fontFamily: 'Inter', fontSize: 18, fontWeight: 'bold', fontStyle: 'normal',
          textDecoration: 'none', color: { r: 129, g: 140, b: 248, a: 1 },
          lineHeight: 1, letterSpacing: 4, textAlign: 'left', verticalAlign: 'top',
        },
        padding: 0,
      },
      {
        id: uuidv4(), type: 'text', name: 'Main Pitch Heading',
        x: 150, y: 340, width: 1200, height: 240, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: false, visible: true,
        content: 'Reimagining Design\nFor Global Teams.',
        style: {
          fontFamily: 'Inter', fontSize: 88, fontWeight: 'bold', fontStyle: 'normal',
          textDecoration: 'none', color: { r: 255, g: 255, b: 255, a: 1 },
          lineHeight: 1.1, letterSpacing: -2, textAlign: 'left', verticalAlign: 'top',
        },
        padding: 0,
      },
      {
        id: uuidv4(), type: 'text', name: 'Subtext',
        x: 150, y: 620, width: 800, height: 80, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 0.7, locked: false, visible: true,
        content: 'The next-generation collaborative graphic editor built for modern product teams.',
        style: {
          fontFamily: 'Inter', fontSize: 24, fontWeight: 'normal', fontStyle: 'normal',
          textDecoration: 'none', color: { r: 203, g: 213, b: 225, a: 1 },
          lineHeight: 1.5, letterSpacing: 0, textAlign: 'left', verticalAlign: 'top',
        },
        padding: 0,
      },
    ],
  },

  // 4. Thumbnails: High-CTR Tech YouTube Thumbnail (1280x720)
  {
    id: 'tpl-youtube-ctr',
    name: 'High-CTR YouTube Thumbnail (1280x720)',
    category: 'Thumbnails',
    width: 1280,
    height: 720,
    gradient: 'from-red-600 via-orange-600 to-amber-500',
    tag: 'High CTR',
    tagVariant: 'warning',
    description: 'High contrast thumbnail layout for tutorials and reviews',
    elements: [
      {
        id: uuidv4(), type: 'shape', shapeType: 'rectangle', name: 'Background',
        x: 0, y: 0, width: 1280, height: 720, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: true, visible: true,
        fill: { type: 'solid', color: { r: 17, g: 24, b: 39, a: 1 } },
        stroke: { r: 0, g: 0, b: 0, a: 0 }, strokeWidth: 0, cornerRadius: 0,
      },
      {
        id: uuidv4(), type: 'shape', shapeType: 'rectangle', name: 'Yellow Highlight Box',
        x: 60, y: 140, width: 580, height: 110, rotation: -3, scaleX: 1, scaleY: 1,
        opacity: 1, locked: false, visible: true,
        fill: { type: 'solid', color: { r: 250, g: 204, b: 21, a: 1 } },
        stroke: { r: 0, g: 0, b: 0, a: 0 }, strokeWidth: 0, cornerRadius: 8,
      },
      {
        id: uuidv4(), type: 'text', name: 'Top Banner Text',
        x: 75, y: 155, width: 550, height: 80, rotation: -3, scaleX: 1, scaleY: 1,
        opacity: 1, locked: false, visible: true,
        content: 'DON\'T BUY THIS!',
        style: {
          fontFamily: 'Inter', fontSize: 58, fontWeight: '900', fontStyle: 'normal',
          textDecoration: 'none', color: { r: 0, g: 0, b: 0, a: 1 },
          lineHeight: 1, letterSpacing: 1, textAlign: 'center', verticalAlign: 'middle',
        },
        padding: 0,
      },
      {
        id: uuidv4(), type: 'text', name: 'Bottom Big Text',
        x: 60, y: 300, width: 720, height: 260, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: false, visible: true,
        content: 'UNTIL YOU\nWATCH THIS.',
        style: {
          fontFamily: 'Inter', fontSize: 86, fontWeight: 'bold', fontStyle: 'normal',
          textDecoration: 'none', color: { r: 255, g: 255, b: 255, a: 1 },
          lineHeight: 1.05, letterSpacing: 0, textAlign: 'left', verticalAlign: 'top',
        },
        padding: 0,
      },
    ],
  },

  // 5. Posters: Modern Music & Tech Festival Poster (1200x1600)
  {
    id: 'tpl-music-festival',
    name: 'Indie Sound Festival Poster (1200x1600)',
    category: 'Posters',
    width: 1200,
    height: 1600,
    gradient: 'from-violet-600 via-purple-600 to-indigo-700',
    tag: 'Event',
    tagVariant: 'secondary',
    description: 'Dynamic event flyer layout with headline acts schedule',
    elements: [
      {
        id: uuidv4(), type: 'shape', shapeType: 'rectangle', name: 'Background',
        x: 0, y: 0, width: 1200, height: 1600, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: true, visible: true,
        fill: { type: 'solid', color: { r: 13, g: 17, b: 23, a: 1 } },
        stroke: { r: 0, g: 0, b: 0, a: 0 }, strokeWidth: 0, cornerRadius: 0,
      },
      {
        id: uuidv4(), type: 'text', name: 'Event Name',
        x: 80, y: 260, width: 1040, height: 260, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: false, visible: true,
        content: 'NEON WAVE\nFESTIVAL',
        style: {
          fontFamily: 'Inter', fontSize: 108, fontWeight: '900', fontStyle: 'normal',
          textDecoration: 'none', color: { r: 255, g: 255, b: 255, a: 1 },
          lineHeight: 0.95, letterSpacing: -2, textAlign: 'center', verticalAlign: 'middle',
        },
        padding: 0,
      },
    ],
  },

  // 6. Business: Executive Business Card (1050x600)
  {
    id: 'tpl-executive-card',
    name: 'Executive Dark Business Card (1050x600)',
    category: 'Business',
    width: 1050,
    height: 600,
    gradient: 'from-slate-900 to-indigo-900',
    tag: 'Classic',
    tagVariant: 'default',
    description: 'Clean luxury card layout with gold accent typography',
    elements: [
      {
        id: uuidv4(), type: 'shape', shapeType: 'rectangle', name: 'Card Base',
        x: 0, y: 0, width: 1050, height: 600, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: true, visible: true,
        fill: { type: 'solid', color: { r: 15, g: 23, b: 42, a: 1 } },
        stroke: { r: 0, g: 0, b: 0, a: 0 }, strokeWidth: 0, cornerRadius: 0,
      },
      {
        id: uuidv4(), type: 'text', name: 'Person Name',
        x: 90, y: 160, width: 600, height: 60, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: false, visible: true,
        content: 'ALEXANDER WRIGHT',
        style: {
          fontFamily: 'Inter', fontSize: 36, fontWeight: 'bold', fontStyle: 'normal',
          textDecoration: 'none', color: { r: 255, g: 255, b: 255, a: 1 },
          lineHeight: 1, letterSpacing: 3, textAlign: 'left', verticalAlign: 'top',
        },
        padding: 0,
      },
    ],
  },

  // 7. Documents: Modern Resume / CV (2480x3508 A4)
  {
    id: 'tpl-modern-resume',
    name: 'Modern Executive Resume (A4)',
    category: 'Documents',
    width: 2480,
    height: 3508,
    gradient: 'from-slate-800 via-slate-900 to-slate-950',
    tag: 'Career',
    tagVariant: 'success',
    description: 'Clean structured CV with left sidebar column and experience hierarchy',
    elements: [
      {
        id: uuidv4(), type: 'shape', shapeType: 'rectangle', name: 'Page BG',
        x: 0, y: 0, width: 2480, height: 3508, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: true, visible: true,
        fill: { type: 'solid', color: { r: 255, g: 255, b: 255, a: 1 } },
        stroke: { r: 0, g: 0, b: 0, a: 0 }, strokeWidth: 0, cornerRadius: 0,
      },
      {
        id: uuidv4(), type: 'shape', shapeType: 'rectangle', name: 'Left Sidebar',
        x: 0, y: 0, width: 780, height: 3508, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: true, visible: true,
        fill: { type: 'solid', color: { r: 241, g: 245, b: 249, a: 1 } },
        stroke: { r: 0, g: 0, b: 0, a: 0 }, strokeWidth: 0, cornerRadius: 0,
      },
      {
        id: uuidv4(), type: 'text', name: 'Candidate Name',
        x: 880, y: 220, width: 1400, height: 120, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: false, visible: true,
        content: 'EMILY WATSON',
        style: {
          fontFamily: 'Inter', fontSize: 68, fontWeight: 'bold', fontStyle: 'normal',
          textDecoration: 'none', color: { r: 15, g: 23, b: 42, a: 1 },
          lineHeight: 1, letterSpacing: 2, textAlign: 'left', verticalAlign: 'top',
        },
        padding: 0,
      },
      {
        id: uuidv4(), type: 'text', name: 'Candidate Title',
        x: 880, y: 340, width: 1400, height: 60, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: false, visible: true,
        content: 'Lead Product Designer & Design Systems Architect',
        style: {
          fontFamily: 'Inter', fontSize: 28, fontWeight: '600', fontStyle: 'normal',
          textDecoration: 'none', color: { r: 99, g: 66, b: 236, a: 1 },
          lineHeight: 1, letterSpacing: 1, textAlign: 'left', verticalAlign: 'top',
        },
        padding: 0,
      },
      {
        id: uuidv4(), type: 'text', name: 'Experience Title',
        x: 880, y: 520, width: 1400, height: 50, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: false, visible: true,
        content: 'WORK EXPERIENCE',
        style: {
          fontFamily: 'Inter', fontSize: 26, fontWeight: 'bold', fontStyle: 'normal',
          textDecoration: 'none', color: { r: 30, g: 41, b: 59, a: 1 },
          lineHeight: 1, letterSpacing: 3, textAlign: 'left', verticalAlign: 'top',
        },
        padding: 0,
      },
      {
        id: uuidv4(), type: 'text', name: 'Experience Details',
        x: 880, y: 600, width: 1400, height: 400, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 0.85, locked: false, visible: true,
        content: 'Senior Product Designer • Vercel (2022 - Present)\nLed design infrastructure for cloud deployment dashboard, improving conversion by 34%.\n\nProduct Designer • Stripe (2019 - 2022)\nArchitected unified dashboard components across 14 financial products worldwide.',
        style: {
          fontFamily: 'Inter', fontSize: 24, fontWeight: 'normal', fontStyle: 'normal',
          textDecoration: 'none', color: { r: 51, g: 65, b: 85, a: 1 },
          lineHeight: 1.7, letterSpacing: 0, textAlign: 'left', verticalAlign: 'top',
        },
        padding: 0,
      },
    ],
  },

  // 8. Marketing: Brand Logo Identity Kit (500x500)
  {
    id: 'tpl-logo-badge',
    name: 'Geometric Minimalist Logo (500x500)',
    category: 'Marketing',
    width: 500,
    height: 500,
    gradient: 'from-amber-400 via-orange-500 to-rose-600',
    tag: 'Brand',
    tagVariant: 'warning',
    description: 'Iconic vector emblem for modern software brands & creator identity',
    elements: [
      {
        id: uuidv4(), type: 'shape', shapeType: 'rectangle', name: 'Logo Background',
        x: 0, y: 0, width: 500, height: 500, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: true, visible: true,
        fill: { type: 'solid', color: { r: 15, g: 23, b: 42, a: 1 } },
        stroke: { r: 0, g: 0, b: 0, a: 0 }, strokeWidth: 0, cornerRadius: 0,
      },
      {
        id: uuidv4(), type: 'shape', shapeType: 'rectangle', name: 'Diamond Emblem',
        x: 175, y: 110, width: 150, height: 150, rotation: 45, scaleX: 1, scaleY: 1,
        opacity: 1, locked: false, visible: true,
        fill: { type: 'solid', color: { r: 99, g: 66, b: 236, a: 1 } },
        stroke: { r: 255, g: 255, b: 255, a: 1 }, strokeWidth: 4, cornerRadius: 24,
      },
      {
        id: uuidv4(), type: 'text', name: 'Brand Name',
        x: 50, y: 310, width: 400, height: 50, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: false, visible: true,
        content: 'NEXUS',
        style: {
          fontFamily: 'Inter', fontSize: 38, fontWeight: 'bold', fontStyle: 'normal',
          textDecoration: 'none', color: { r: 255, g: 255, b: 255, a: 1 },
          lineHeight: 1, letterSpacing: 8, textAlign: 'center', verticalAlign: 'middle',
        },
        padding: 0,
      },
      {
        id: uuidv4(), type: 'text', name: 'Tagline',
        x: 50, y: 375, width: 400, height: 30, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 0.6, locked: false, visible: true,
        content: 'STUDIO & LABS',
        style: {
          fontFamily: 'Inter', fontSize: 13, fontWeight: '600', fontStyle: 'normal',
          textDecoration: 'none', color: { r: 148, g: 163, b: 184, a: 1 },
          lineHeight: 1, letterSpacing: 4, textAlign: 'center', verticalAlign: 'middle',
        },
        padding: 0,
      },
    ],
  },
];
