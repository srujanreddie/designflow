// DesignFlow - Open Source Comprehensive Template Library
// Curated open-source design templates inspired by modern design workflows (Canva, Unsplash, Dribbble)

import { v4 as uuidv4 } from 'uuid';

export interface OpenSourceTemplate {
  id: string;
  name: string;
  category: 'Social Media' | 'Presentations' | 'Posters' | 'Marketing' | 'Business' | 'Thumbnails' | 'Documents' | 'Planners' | 'Branding' | 'E-Commerce';
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

  // 9. DesignBundles Best Seller: Instagram Carousel Puzzle / Real Estate Listing
  {
    id: 'tpl-db-realestate-post',
    name: 'Modern Real Estate Property Showcase (1080x1080)',
    category: 'Social Media',
    width: 1080,
    height: 1080,
    gradient: 'from-amber-700 via-stone-800 to-stone-900',
    tag: 'DesignBundles Hit',
    tagVariant: 'warning',
    description: 'Luxury modern home listing template with price badge, specs grid & contact',
    elements: [
      {
        id: uuidv4(), type: 'shape', shapeType: 'rectangle', name: 'Background',
        x: 0, y: 0, width: 1080, height: 1080, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: true, visible: true,
        fill: { type: 'solid', color: { r: 28, g: 25, b: 23, a: 1 } },
        stroke: { r: 0, g: 0, b: 0, a: 0 }, strokeWidth: 0, cornerRadius: 0,
      },
      {
        id: uuidv4(), type: 'shape', shapeType: 'rectangle', name: 'Image Placeholder Frame',
        x: 60, y: 60, width: 960, height: 540, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: false, visible: true,
        fill: { type: 'solid', color: { r: 41, g: 37, b: 36, a: 1 } },
        stroke: { r: 214, g: 180, b: 121, a: 1 }, strokeWidth: 2, cornerRadius: 16,
      },
      {
        id: uuidv4(), type: 'shape', shapeType: 'rectangle', name: 'Price Tag Badge',
        x: 90, y: 90, width: 280, height: 60, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: false, visible: true,
        fill: { type: 'solid', color: { r: 180, g: 130, b: 60, a: 1 } },
        stroke: { r: 255, g: 255, b: 255, a: 1 }, strokeWidth: 1, cornerRadius: 8,
      },
      {
        id: uuidv4(), type: 'text', name: 'Price Text',
        x: 90, y: 104, width: 280, height: 35, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: false, visible: true,
        content: 'FOR SALE • $1,250,000',
        style: {
          fontFamily: 'Inter', fontSize: 18, fontWeight: 'bold', fontStyle: 'normal',
          textDecoration: 'none', color: { r: 255, g: 255, b: 255, a: 1 },
          lineHeight: 1, letterSpacing: 2, textAlign: 'center', verticalAlign: 'middle',
        },
        padding: 0,
      },
      {
        id: uuidv4(), type: 'text', name: 'Property Title',
        x: 60, y: 640, width: 960, height: 100, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: false, visible: true,
        content: 'THE WILLOW RESIDENCE',
        style: {
          fontFamily: 'Inter', fontSize: 52, fontWeight: 'bold', fontStyle: 'normal',
          textDecoration: 'none', color: { r: 245, g: 245, b: 244, a: 1 },
          lineHeight: 1.1, letterSpacing: 3, textAlign: 'left', verticalAlign: 'top',
        },
        padding: 0,
      },
      {
        id: uuidv4(), type: 'text', name: 'Specs Details',
        x: 60, y: 740, width: 960, height: 80, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 0.85, locked: false, visible: true,
        content: '4 BEDROOMS  •  3.5 BATHROOMS  •  3,450 SQ FT  •  BEVERLY HILLS, CA',
        style: {
          fontFamily: 'Inter', fontSize: 20, fontWeight: '600', fontStyle: 'normal',
          textDecoration: 'none', color: { r: 214, g: 180, b: 121, a: 1 },
          lineHeight: 1.4, letterSpacing: 2, textAlign: 'left', verticalAlign: 'top',
        },
        padding: 0,
      },
      {
        id: uuidv4(), type: 'shape', shapeType: 'rectangle', name: 'Schedule Tour Button',
        x: 60, y: 880, width: 340, height: 70, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: false, visible: true,
        fill: { type: 'solid', color: { r: 214, g: 180, b: 121, a: 1 } },
        stroke: { r: 0, g: 0, b: 0, a: 0 }, strokeWidth: 0, cornerRadius: 12,
      },
      {
        id: uuidv4(), type: 'text', name: 'Button Text',
        x: 60, y: 902, width: 340, height: 35, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: false, visible: true,
        content: 'SCHEDULE A TOUR →',
        style: {
          fontFamily: 'Inter', fontSize: 18, fontWeight: 'bold', fontStyle: 'normal',
          textDecoration: 'none', color: { r: 28, g: 25, b: 23, a: 1 },
          lineHeight: 1, letterSpacing: 2, textAlign: 'center', verticalAlign: 'middle',
        },
        padding: 0,
      },
    ],
  },

  // 10. DesignBundles Best Seller: Small Business Order Thank You Card
  {
    id: 'tpl-db-thankyou-card',
    name: 'E-commerce Order Thank You Card (1200x800)',
    category: 'E-Commerce',
    width: 1200,
    height: 800,
    gradient: 'from-rose-100 via-pink-200 to-purple-200',
    tag: 'Packaging Hit',
    tagVariant: 'purple',
    description: 'Etsy and Shopify packaging insert thank-you card with social discount',
    elements: [
      {
        id: uuidv4(), type: 'shape', shapeType: 'rectangle', name: 'Background',
        x: 0, y: 0, width: 1200, height: 800, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: true, visible: true,
        fill: { type: 'solid', color: { r: 254, g: 242, b: 242, a: 1 } },
        stroke: { r: 0, g: 0, b: 0, a: 0 }, strokeWidth: 0, cornerRadius: 0,
      },
      {
        id: uuidv4(), type: 'shape', shapeType: 'rectangle', name: 'Inner Card',
        x: 50, y: 50, width: 1100, height: 700, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: false, visible: true,
        fill: { type: 'solid', color: { r: 255, g: 255, b: 255, a: 1 } },
        stroke: { r: 251, g: 207, b: 232, a: 1 }, strokeWidth: 2, cornerRadius: 24,
      },
      {
        id: uuidv4(), type: 'text', name: 'Script Pre-header',
        x: 100, y: 120, width: 1000, height: 50, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: false, visible: true,
        content: 'Y A Y !  Y O U R  O R D E R  I S  H E R E',
        style: {
          fontFamily: 'Inter', fontSize: 18, fontWeight: 'bold', fontStyle: 'normal',
          textDecoration: 'none', color: { r: 244, g: 63, b: 94, a: 1 },
          lineHeight: 1, letterSpacing: 5, textAlign: 'center', verticalAlign: 'middle',
        },
        padding: 0,
      },
      {
        id: uuidv4(), type: 'text', name: 'Thank You Heading',
        x: 100, y: 190, width: 1000, height: 120, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: false, visible: true,
        content: 'Thank You For Your Order!',
        style: {
          fontFamily: 'Inter', fontSize: 62, fontWeight: '900', fontStyle: 'normal',
          textDecoration: 'none', color: { r: 15, g: 23, b: 42, a: 1 },
          lineHeight: 1.1, letterSpacing: -1, textAlign: 'center', verticalAlign: 'middle',
        },
        padding: 0,
      },
      {
        id: uuidv4(), type: 'text', name: 'Gratitude Message',
        x: 200, y: 320, width: 800, height: 100, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 0.8, locked: false, visible: true,
        content: 'Your support means the world to our small studio. We hope your items bring a smile to your day!',
        style: {
          fontFamily: 'Inter', fontSize: 22, fontWeight: 'normal', fontStyle: 'normal',
          textDecoration: 'none', color: { r: 71, g: 85, b: 105, a: 1 },
          lineHeight: 1.5, letterSpacing: 0, textAlign: 'center', verticalAlign: 'top',
        },
        padding: 0,
      },
      {
        id: uuidv4(), type: 'shape', shapeType: 'rectangle', name: 'Discount Box',
        x: 350, y: 440, width: 500, height: 120, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: false, visible: true,
        fill: { type: 'solid', color: { r: 253, g: 242, b: 248, a: 1 } },
        stroke: { r: 244, g: 114, b: 182, a: 1 }, strokeWidth: 2, cornerRadius: 16,
      },
      {
        id: uuidv4(), type: 'text', name: 'Discount Code',
        x: 350, y: 465, width: 500, height: 40, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: false, visible: true,
        content: 'ENJOY 20% OFF YOUR NEXT ORDER',
        style: {
          fontFamily: 'Inter', fontSize: 16, fontWeight: 'bold', fontStyle: 'normal',
          textDecoration: 'none', color: { r: 190, g: 24, b: 93, a: 1 },
          lineHeight: 1, letterSpacing: 2, textAlign: 'center', verticalAlign: 'middle',
        },
        padding: 0,
      },
      {
        id: uuidv4(), type: 'text', name: 'Coupon Code Word',
        x: 350, y: 505, width: 500, height: 40, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: false, visible: true,
        content: 'USE CODE: THANKYOU20',
        style: {
          fontFamily: 'Inter', fontSize: 24, fontWeight: '900', fontStyle: 'normal',
          textDecoration: 'none', color: { r: 15, g: 23, b: 42, a: 1 },
          lineHeight: 1, letterSpacing: 3, textAlign: 'center', verticalAlign: 'middle',
        },
        padding: 0,
      },
      {
        id: uuidv4(), type: 'text', name: 'Social Handle',
        x: 100, y: 640, width: 1000, height: 40, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 0.6, locked: false, visible: true,
        content: 'TAG US TO BE FEATURED: @YOURBRANDNAME • WWW.YOURSTORE.COM',
        style: {
          fontFamily: 'Inter', fontSize: 14, fontWeight: 'bold', fontStyle: 'normal',
          textDecoration: 'none', color: { r: 100, g: 116, b: 139, a: 1 },
          lineHeight: 1, letterSpacing: 2, textAlign: 'center', verticalAlign: 'middle',
        },
        padding: 0,
      },
    ],
  },

  // 11. DesignBundles Best Seller: Daily & Weekly Productivity Planner
  {
    id: 'tpl-db-daily-planner',
    name: 'Daily Productivity & Self-Care Planner (A4 2480x3508)',
    category: 'Planners',
    width: 2480,
    height: 3508,
    gradient: 'from-teal-600 via-emerald-600 to-slate-900',
    tag: 'Printable',
    tagVariant: 'success',
    description: 'Printable daily schedule tracker with Top 3 Priorities, Water & Habits check',
    elements: [
      {
        id: uuidv4(), type: 'shape', shapeType: 'rectangle', name: 'Page Base',
        x: 0, y: 0, width: 2480, height: 3508, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: true, visible: true,
        fill: { type: 'solid', color: { r: 250, g: 250, b: 249, a: 1 } },
        stroke: { r: 0, g: 0, b: 0, a: 0 }, strokeWidth: 0, cornerRadius: 0,
      },
      {
        id: uuidv4(), type: 'text', name: 'Planner Title',
        x: 150, y: 180, width: 1200, height: 100, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: false, visible: true,
        content: 'DAILY PLANNER',
        style: {
          fontFamily: 'Inter', fontSize: 76, fontWeight: '900', fontStyle: 'normal',
          textDecoration: 'none', color: { r: 20, g: 83, b: 45, a: 1 },
          lineHeight: 1, letterSpacing: 6, textAlign: 'left', verticalAlign: 'top',
        },
        padding: 0,
      },
      {
        id: uuidv4(), type: 'shape', shapeType: 'rectangle', name: 'Top 3 Box',
        x: 150, y: 380, width: 1000, height: 500, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: false, visible: true,
        fill: { type: 'solid', color: { r: 255, g: 255, b: 255, a: 1 } },
        stroke: { r: 229, g: 231, b: 235, a: 1 }, strokeWidth: 2, cornerRadius: 20,
      },
      {
        id: uuidv4(), type: 'text', name: 'Top Priorities Header',
        x: 190, y: 420, width: 900, height: 50, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: false, visible: true,
        content: 'TODAY’S TOP 3 PRIORITIES',
        style: {
          fontFamily: 'Inter', fontSize: 28, fontWeight: 'bold', fontStyle: 'normal',
          textDecoration: 'none', color: { r: 20, g: 83, b: 45, a: 1 },
          lineHeight: 1, letterSpacing: 2, textAlign: 'left', verticalAlign: 'top',
        },
        padding: 0,
      },
      {
        id: uuidv4(), type: 'text', name: 'Priority List Placeholders',
        x: 190, y: 500, width: 900, height: 320, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 0.7, locked: false, visible: true,
        content: '1.  _____________________________________\n\n2.  _____________________________________\n\n3.  _____________________________________',
        style: {
          fontFamily: 'Inter', fontSize: 26, fontWeight: 'normal', fontStyle: 'normal',
          textDecoration: 'none', color: { r: 107, g: 114, b: 128, a: 1 },
          lineHeight: 1.8, letterSpacing: 1, textAlign: 'left', verticalAlign: 'top',
        },
        padding: 0,
      },
      {
        id: uuidv4(), type: 'shape', shapeType: 'rectangle', name: 'Schedule Block',
        x: 1250, y: 380, width: 1080, height: 2600, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: false, visible: true,
        fill: { type: 'solid', color: { r: 255, g: 255, b: 255, a: 1 } },
        stroke: { r: 229, g: 231, b: 235, a: 1 }, strokeWidth: 2, cornerRadius: 20,
      },
      {
        id: uuidv4(), type: 'text', name: 'Hourly Schedule Header',
        x: 1300, y: 420, width: 900, height: 50, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: false, visible: true,
        content: 'HOURLY SCHEDULE & TASKS',
        style: {
          fontFamily: 'Inter', fontSize: 28, fontWeight: 'bold', fontStyle: 'normal',
          textDecoration: 'none', color: { r: 20, g: 83, b: 45, a: 1 },
          lineHeight: 1, letterSpacing: 2, textAlign: 'left', verticalAlign: 'top',
        },
        padding: 0,
      },
      {
        id: uuidv4(), type: 'text', name: 'Schedule Hours',
        x: 1300, y: 510, width: 980, height: 2400, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 0.65, locked: false, visible: true,
        content: '07:00 AM  •  _____________________________\n08:00 AM  •  _____________________________\n09:00 AM  •  _____________________________\n10:00 AM  •  _____________________________\n11:00 AM  •  _____________________________\n12:00 PM  •  _____________________________\n01:00 PM  •  _____________________________\n02:00 PM  •  _____________________________\n03:00 PM  •  _____________________________\n04:00 PM  •  _____________________________\n05:00 PM  •  _____________________________\n06:00 PM  •  _____________________________\n07:00 PM  •  _____________________________\n08:00 PM  •  _____________________________',
        style: {
          fontFamily: 'Inter', fontSize: 26, fontWeight: '500', fontStyle: 'normal',
          textDecoration: 'none', color: { r: 75, g: 85, b: 99, a: 1 },
          lineHeight: 2.3, letterSpacing: 1, textAlign: 'left', verticalAlign: 'top',
        },
        padding: 0,
      },
    ],
  },

  // 12. DesignBundles Best Seller: Brand Guidelines & Aesthetic Moodboard
  {
    id: 'tpl-db-brand-moodboard',
    name: 'Aesthetic Brand Moodboard & Style Guide (1920x1080)',
    category: 'Branding',
    width: 1920,
    height: 1080,
    gradient: 'from-amber-200 via-rose-300 to-indigo-300',
    tag: 'Agency Kit',
    tagVariant: 'purple',
    description: 'Designer mood board with color swatches, font pairing & brand mission',
    elements: [
      {
        id: uuidv4(), type: 'shape', shapeType: 'rectangle', name: 'Canvas Base',
        x: 0, y: 0, width: 1920, height: 1080, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: true, visible: true,
        fill: { type: 'solid', color: { r: 247, g: 245, b: 240, a: 1 } },
        stroke: { r: 0, g: 0, b: 0, a: 0 }, strokeWidth: 0, cornerRadius: 0,
      },
      {
        id: uuidv4(), type: 'text', name: 'Brand Guide Title',
        x: 100, y: 100, width: 900, height: 60, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: false, visible: true,
        content: 'BRAND IDENTITY & STYLE GUIDE',
        style: {
          fontFamily: 'Inter', fontSize: 32, fontWeight: 'bold', fontStyle: 'normal',
          textDecoration: 'none', color: { r: 40, g: 35, b: 30, a: 1 },
          lineHeight: 1, letterSpacing: 4, textAlign: 'left', verticalAlign: 'top',
        },
        padding: 0,
      },
      // Color Swatches
      {
        id: uuidv4(), type: 'shape', shapeType: 'circle', name: 'Color Swatch 1',
        x: 100, y: 220, width: 120, height: 120, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: false, visible: true,
        fill: { type: 'solid', color: { r: 184, g: 153, b: 120, a: 1 } },
        stroke: { r: 255, g: 255, b: 255, a: 1 }, strokeWidth: 4, cornerRadius: 0,
      },
      {
        id: uuidv4(), type: 'shape', shapeType: 'circle', name: 'Color Swatch 2',
        x: 250, y: 220, width: 120, height: 120, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: false, visible: true,
        fill: { type: 'solid', color: { r: 219, g: 193, b: 172, a: 1 } },
        stroke: { r: 255, g: 255, b: 255, a: 1 }, strokeWidth: 4, cornerRadius: 0,
      },
      {
        id: uuidv4(), type: 'shape', shapeType: 'circle', name: 'Color Swatch 3',
        x: 400, y: 220, width: 120, height: 120, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: false, visible: true,
        fill: { type: 'solid', color: { r: 104, g: 110, b: 95, a: 1 } },
        stroke: { r: 255, g: 255, b: 255, a: 1 }, strokeWidth: 4, cornerRadius: 0,
      },
      {
        id: uuidv4(), type: 'shape', shapeType: 'circle', name: 'Color Swatch 4',
        x: 550, y: 220, width: 120, height: 120, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: false, visible: true,
        fill: { type: 'solid', color: { r: 44, g: 48, b: 40, a: 1 } },
        stroke: { r: 255, g: 255, b: 255, a: 1 }, strokeWidth: 4, cornerRadius: 0,
      },
      // Editorial typography showcase
      {
        id: uuidv4(), type: 'text', name: 'Serif Headline Preview',
        x: 100, y: 440, width: 800, height: 160, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, locked: false, visible: true,
        content: 'Timeless Elegance\nMeets Pure Form.',
        style: {
          fontFamily: 'Inter', fontSize: 62, fontWeight: 'bold', fontStyle: 'italic',
          textDecoration: 'none', color: { r: 44, g: 48, b: 40, a: 1 },
          lineHeight: 1.15, letterSpacing: -1, textAlign: 'left', verticalAlign: 'top',
        },
        padding: 0,
      },
      {
        id: uuidv4(), type: 'text', name: 'Brand Values',
        x: 100, y: 640, width: 750, height: 120, rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 0.8, locked: false, visible: true,
        content: 'Crafted for sustainable luxury lifestyles. Grounded in intentional simplicity, earthy neutral palettes, and high-end tactile typography.',
        style: {
          fontFamily: 'Inter', fontSize: 22, fontWeight: 'normal', fontStyle: 'normal',
          textDecoration: 'none', color: { r: 85, g: 80, b: 72, a: 1 },
          lineHeight: 1.6, letterSpacing: 0, textAlign: 'left', verticalAlign: 'top',
        },
        padding: 0,
      },
    ],
  },
];
