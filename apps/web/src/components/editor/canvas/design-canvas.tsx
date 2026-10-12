'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Canvas,
  Rect,
  Circle,
  Triangle,
  Line,
  Polygon,
  FabricImage,
  IText,
  Point,
  FabricObject,
  Shadow,
} from 'fabric';
import {
  useEditorStore,
  selectActivePage,
  selectActiveElements,
} from '@/store/editor-store';
import { useCanvas } from '../canvas-context';
import type {
  DesignElement,
  ShapeElement,
  TextElement,
  ImageElement,
  Color,
} from '../../../../../../packages/shared-types/src';

// Helper to convert Color object to rgba string
function colorToRgba(color?: Color): string {
  if (!color) return 'rgba(0,0,0,0)';
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a ?? 1})`;
}

// Generate star polygon points
function getStarPoints(spikes = 5, outerRadius = 50, innerRadius = 25) {
  const points: { x: number; y: number }[] = [];
  let rot = (Math.PI / 2) * 3;
  let x = outerRadius;
  let y = outerRadius;
  const step = Math.PI / spikes;

  for (let i = 0; i < spikes; i++) {
    x = outerRadius + Math.cos(rot) * outerRadius;
    y = outerRadius + Math.sin(rot) * outerRadius;
    points.push({ x, y });
    rot += step;

    x = outerRadius + Math.cos(rot) * innerRadius;
    y = outerRadius + Math.sin(rot) * innerRadius;
    points.push({ x, y });
    rot += step;
  }
  return points;
}

// Custom arrow polygon points
function getArrowPoints(width = 120, height = 40) {
  const headWidth = Math.min(width * 0.4, 40);
  const stemHeight = height * 0.4;
  const stemY = (height - stemHeight) / 2;

  return [
    { x: 0, y: stemY },
    { x: width - headWidth, y: stemY },
    { x: width - headWidth, y: 0 },
    { x: width, y: height / 2 },
    { x: width - headWidth, y: height },
    { x: width - headWidth, y: stemY + stemHeight },
    { x: 0, y: stemY + stemHeight },
  ];
}

export function DesignCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasElRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);
  const { setCanvasInstance } = useCanvas();

  const isInternalUpdatingRef = useRef(false);
  const isSyncingSelectionRef = useRef(false);

  // Store state
  const doc = useEditorStore((s) => s.document);
  const activePage = useEditorStore(selectActivePage);
  const elements = useEditorStore(selectActiveElements);
  const selectedElementIds = useEditorStore((s) => s.selectedElementIds);
  const zoom = useEditorStore((s) => s.zoom);
  const panX = useEditorStore((s) => s.panX);
  const panY = useEditorStore((s) => s.panY);
  const showGrid = useEditorStore((s) => s.showGrid);
  const snapToGrid = useEditorStore((s) => s.snapToGrid);
  const gridSize = useEditorStore((s) => s.gridSize);

  // Store actions
  const selectElement = useEditorStore((s) => s.selectElement);
  const deselectAll = useEditorStore((s) => s.deselectAll);
  const updateElement = useEditorStore((s) => s.updateElement);
  const setZoom = useEditorStore((s) => s.setZoom);
  const setPan = useEditorStore((s) => s.setPan);

  const docWidth = doc?.width || 1080;
  const docHeight = doc?.height || 1080;

  // Track guides
  const [guides, setGuides] = useState<{ x?: number; y?: number }>({});

  // 1. Initialize Canvas on Mount
  useEffect(() => {
    if (!canvasElRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const initialWidth = container.clientWidth || 800;
    const initialHeight = container.clientHeight || 600;

    const fc = new Canvas(canvasElRef.current, {
      width: initialWidth,
      height: initialHeight,
      backgroundColor: '#f1f5f9', // Slate-100 neutral gray workspace
      preserveObjectStacking: true,
      selection: true,
    });

    fabricCanvasRef.current = fc;
    setCanvasInstance(fc);

    // Initial fit zoom calculation
    const padding = 80;
    const availableWidth = initialWidth - padding;
    const availableHeight = initialHeight - padding;
    const fitScale = Math.min(
      availableWidth / docWidth,
      availableHeight / docHeight,
      1
    );
    if (fitScale > 0) {
      setZoom(Math.round(fitScale * 100) / 100);
    }

    // Resize observer to update canvas dimensions
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          fc.setDimensions({ width, height });
          fc.requestRenderAll();
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      setCanvasInstance(null);
      fc.dispose();
      fabricCanvasRef.current = null;
    };
  }, []);

  // 2. Viewport Transform (Zoom & Pan & Center Page)
  useEffect(() => {
    const fc = fabricCanvasRef.current;
    const container = containerRef.current;
    if (!fc || !container) return;

    const containerWidth = fc.getWidth();
    const containerHeight = fc.getHeight();

    // Center the document page inside the viewport
    const translateX = (containerWidth - docWidth * zoom) / 2 + panX;
    const translateY = (containerHeight - docHeight * zoom) / 2 + panY;

    fc.setViewportTransform([zoom, 0, 0, zoom, translateX, translateY]);
    fc.requestRenderAll();
  }, [zoom, panX, panY, docWidth, docHeight]);

  // 3. Setup Canvas Event Listeners
  useEffect(() => {
    const fc = fabricCanvasRef.current;
    if (!fc) return;

    // Selection Events
    const handleSelectionCreated = (e: any) => {
      if (isInternalUpdatingRef.current || isSyncingSelectionRef.current) return;
      const selected = e.selected || [];
      if (selected.length === 1 && selected[0].elementId) {
        selectElement(selected[0].elementId, false);
      } else if (selected.length > 1) {
        const ids = selected.map((s: any) => s.elementId).filter(Boolean);
        if (ids.length > 0) {
          useEditorStore.setState({ selectedElementIds: ids });
        }
      }
    };

    const handleSelectionUpdated = (e: any) => {
      if (isInternalUpdatingRef.current || isSyncingSelectionRef.current) return;
      const selected = e.selected || [];
      if (selected.length === 1 && selected[0].elementId) {
        selectElement(selected[0].elementId, false);
      } else if (selected.length > 1) {
        const ids = selected.map((s: any) => s.elementId).filter(Boolean);
        if (ids.length > 0) {
          useEditorStore.setState({ selectedElementIds: ids });
        }
      }
    };

    const handleSelectionCleared = () => {
      if (isInternalUpdatingRef.current || isSyncingSelectionRef.current) return;
      deselectAll();
    };

    // Object Modification Events
    const handleObjectModified = (e: any) => {
      const target = e.target;
      if (!target || !target.elementId) return;

      isInternalUpdatingRef.current = true;

      const elementId = target.elementId;
      const scaleX = target.scaleX || 1;
      const scaleY = target.scaleY || 1;
      const newWidth = Math.round((target.width || 100) * scaleX);
      const newHeight = Math.round((target.height || 100) * scaleY);
      const newLeft = Math.round(target.left || 0);
      const newTop = Math.round(target.top || 0);
      const newAngle = Math.round(target.angle || 0);

      // Reset fabric object scale to 1 to match data model
      target.set({
        scaleX: 1,
        scaleY: 1,
        width: newWidth,
        height: newHeight,
      });

      const updates: any = {
        x: newLeft,
        y: newTop,
        width: newWidth,
        height: newHeight,
        rotation: newAngle,
      };

      if (target instanceof IText) {
        updates.content = target.text;
      }

      updateElement(elementId, updates);
      setGuides({});

      setTimeout(() => {
        isInternalUpdatingRef.current = false;
      }, 50);
    };

    // Live Moving & Alignment Guides
    const handleObjectMoving = (e: any) => {
      const target = e.target;
      if (!target || !target.elementId) return;

      const pageCenterX = docWidth / 2;
      const pageCenterY = docHeight / 2;
      const threshold = 6;

      const targetCenterX = (target.left || 0) + ((target.width || 0) * (target.scaleX || 1)) / 2;
      const targetCenterY = (target.top || 0) + ((target.height || 0) * (target.scaleY || 1)) / 2;

      let guideX: number | undefined;
      let guideY: number | undefined;

      // Snap to page center X
      if (Math.abs(targetCenterX - pageCenterX) < threshold) {
        target.set({
          left: pageCenterX - ((target.width || 0) * (target.scaleX || 1)) / 2,
        });
        guideX = pageCenterX;
      }

      // Snap to page center Y
      if (Math.abs(targetCenterY - pageCenterY) < threshold) {
        target.set({
          top: pageCenterY - ((target.height || 0) * (target.scaleY || 1)) / 2,
        });
        guideY = pageCenterY;
      }

      // Snap to Grid if enabled
      if (snapToGrid) {
        const left = target.left || 0;
        const top = target.top || 0;
        target.set({
          left: Math.round(left / gridSize) * gridSize,
          top: Math.round(top / gridSize) * gridSize,
        });
      }

      setGuides({ x: guideX, y: guideY });
    };

    // Double-click on text to enter edit mode
    const handleDoubleClick = (e: any) => {
      if (e.target && e.target instanceof IText) {
        e.target.enterEditing();
        e.target.selectAll();
        fc.requestRenderAll();
      }
    };

    // Mouse Wheel Zoom (Ctrl+Wheel or Trackpad pinch)
    let isPanning = false;
    let lastPosX = 0;
    let lastPosY = 0;

    const handleMouseWheel = (opt: any) => {
      const evt = opt.e;
      evt.preventDefault();
      evt.stopPropagation();

      if (evt.ctrlKey || evt.metaKey) {
        const delta = evt.deltaY;
        const currentZoom = useEditorStore.getState().zoom;
        const newZoom = delta > 0 ? Math.max(0.1, currentZoom - 0.05) : Math.min(5, currentZoom + 0.05);
        setZoom(Math.round(newZoom * 100) / 100);
      } else {
        // Pan with normal wheel
        const currentPanX = useEditorStore.getState().panX;
        const currentPanY = useEditorStore.getState().panY;
        setPan(currentPanX - evt.deltaX, currentPanY - evt.deltaY);
      }
    };

    // Middle Mouse or Space+Click Pan
    const handleMouseDown = (opt: any) => {
      const evt = opt.e;
      if (evt.button === 1 || evt.spaceKey || useEditorStore.getState().activeTool === 'pan') {
        isPanning = true;
        lastPosX = evt.clientX;
        lastPosY = evt.clientY;
        fc.selection = false;
      }
    };

    const handleMouseMove = (opt: any) => {
      if (isPanning) {
        const evt = opt.e;
        const deltaX = evt.clientX - lastPosX;
        const deltaY = evt.clientY - lastPosY;
        lastPosX = evt.clientX;
        lastPosY = evt.clientY;

        const currentPanX = useEditorStore.getState().panX;
        const currentPanY = useEditorStore.getState().panY;
        setPan(currentPanX + deltaX, currentPanY + deltaY);
      }
    };

    const handleMouseUp = () => {
      if (isPanning) {
        isPanning = false;
        fc.selection = true;
      }
      setGuides({});
    };

    fc.on('selection:created', handleSelectionCreated);
    fc.on('selection:updated', handleSelectionUpdated);
    fc.on('selection:cleared', handleSelectionCleared);
    fc.on('object:modified', handleObjectModified);
    fc.on('object:moving', handleObjectMoving);
    fc.on('mouse:dblclick', handleDoubleClick);
    fc.on('mouse:wheel', handleMouseWheel);
    fc.on('mouse:down', handleMouseDown);
    fc.on('mouse:move', handleMouseMove);
    fc.on('mouse:up', handleMouseUp);

    return () => {
      fc.off('selection:created', handleSelectionCreated);
      fc.off('selection:updated', handleSelectionUpdated);
      fc.off('selection:cleared', handleSelectionCleared);
      fc.off('object:modified', handleObjectModified);
      fc.off('object:moving', handleObjectMoving);
      fc.off('mouse:dblclick', handleDoubleClick);
      fc.off('mouse:wheel', handleMouseWheel);
      fc.off('mouse:down', handleMouseDown);
      fc.off('mouse:move', handleMouseMove);
      fc.off('mouse:up', handleMouseUp);
    };
  }, [snapToGrid, gridSize, docWidth, docHeight]);

  // 4. Sync Elements & Page to Fabric Objects
  useEffect(() => {
    const fc = fabricCanvasRef.current;
    if (!fc || isInternalUpdatingRef.current) return;

    let isCancelled = false;

    const renderCanvasScene = async () => {
      fc.clear();

      // Draw Workspace Page Boundary
      let pageBgColor = '#ffffff';
      if (activePage?.background.type === 'color') {
        pageBgColor = colorToRgba(activePage.background.color);
      }

      const pageRect = new Rect({
        left: 0,
        top: 0,
        width: docWidth,
        height: docHeight,
        fill: pageBgColor,
        selectable: false,
        evented: false,
        hoverCursor: 'default',
        shadow: new Shadow({
          color: 'rgba(0, 0, 0, 0.12)',
          blur: 24,
          offsetX: 0,
          offsetY: 8,
        }),
      });
      (pageRect as any).isPageBackground = true;
      fc.add(pageRect);

      // Create Fabric Objects for each element
      for (const el of elements) {
        if (!el.visible) continue;

        let obj: FabricObject | null = null;

        if (el.type === 'text') {
          const textEl = el as TextElement;
          const textObj = new IText(textEl.content || '', {
            left: textEl.x,
            top: textEl.y,
            width: textEl.width,
            fontSize: textEl.style.fontSize,
            fontFamily: textEl.style.fontFamily,
            fontWeight: textEl.style.fontWeight === 'bold' ? 'bold' : 'normal',
            fontStyle: textEl.style.fontStyle === 'italic' ? 'italic' : 'normal',
            underline: textEl.style.textDecoration?.includes('underline'),
            fill: colorToRgba(textEl.style.color),
            textAlign: textEl.style.textAlign || 'left',
            lineHeight: textEl.style.lineHeight || 1.4,
            angle: textEl.rotation || 0,
            opacity: textEl.opacity ?? 1,
            lockMovementX: textEl.locked,
            lockMovementY: textEl.locked,
            lockRotation: textEl.locked,
            lockScalingX: textEl.locked,
            lockScalingY: textEl.locked,
            hasControls: !textEl.locked,
          });
          obj = textObj;
        } else if (el.type === 'shape') {
          const shapeEl = el as ShapeElement;
          const fillStr =
            shapeEl.fill.type === 'solid'
              ? colorToRgba(shapeEl.fill.color)
              : '#6366f1';
          const strokeStr = colorToRgba(shapeEl.stroke);

          const commonProps = {
            left: shapeEl.x,
            top: shapeEl.y,
            angle: shapeEl.rotation || 0,
            opacity: shapeEl.opacity ?? 1,
            fill: fillStr,
            stroke: strokeStr,
            strokeWidth: shapeEl.strokeWidth || 0,
            lockMovementX: shapeEl.locked,
            lockMovementY: shapeEl.locked,
            lockRotation: shapeEl.locked,
            lockScalingX: shapeEl.locked,
            lockScalingY: shapeEl.locked,
            hasControls: !shapeEl.locked,
          };

          switch (shapeEl.shapeType) {
            case 'rectangle':
              obj = new Rect({
                ...commonProps,
                width: shapeEl.width,
                height: shapeEl.height,
                rx: shapeEl.cornerRadius || 0,
                ry: shapeEl.cornerRadius || 0,
              });
              break;

            case 'circle':
              obj = new Circle({
                ...commonProps,
                radius: Math.min(shapeEl.width, shapeEl.height) / 2,
              });
              break;

            case 'triangle':
              obj = new Triangle({
                ...commonProps,
                width: shapeEl.width,
                height: shapeEl.height,
              });
              break;

            case 'star':
              obj = new Polygon(
                getStarPoints(5, shapeEl.width / 2, shapeEl.width / 4),
                {
                  ...commonProps,
                }
              );
              break;

            case 'line':
              obj = new Line([0, 0, shapeEl.width, shapeEl.height || 0], {
                ...commonProps,
                strokeWidth: Math.max(shapeEl.strokeWidth || 3, 2),
                stroke: fillStr || strokeStr,
              });
              break;

            case 'arrow':
              obj = new Polygon(getArrowPoints(shapeEl.width, shapeEl.height), {
                ...commonProps,
              });
              break;

            default:
              obj = new Rect({
                ...commonProps,
                width: shapeEl.width,
                height: shapeEl.height,
              });
              break;
          }
        } else if (el.type === 'image') {
          const imgEl = el as ImageElement;
          try {
            const fabricImg = await FabricImage.fromURL(imgEl.src, {
              crossOrigin: 'anonymous',
            });
            if (isCancelled) return;

            fabricImg.set({
              left: imgEl.x,
              top: imgEl.y,
              scaleX: imgEl.width / (fabricImg.width || imgEl.width),
              scaleY: imgEl.height / (fabricImg.height || imgEl.height),
              angle: imgEl.rotation || 0,
              opacity: imgEl.opacity ?? 1,
              lockMovementX: imgEl.locked,
              lockMovementY: imgEl.locked,
              lockRotation: imgEl.locked,
              lockScalingX: imgEl.locked,
              lockScalingY: imgEl.locked,
              hasControls: !imgEl.locked,
            });
            obj = fabricImg;
          } catch (err) {
            console.error('Failed to load fabric image:', imgEl.src, err);
          }
        }

        if (obj) {
          (obj as any).elementId = el.id;
          fc.add(obj);
        }
      }

      // Re-apply active selection
      isSyncingSelectionRef.current = true;
      if (selectedElementIds.length > 0) {
        const selectableObjs = fc
          .getObjects()
          .filter((o: any) => selectedElementIds.includes(o.elementId));

        if (selectableObjs.length === 1) {
          fc.setActiveObject(selectableObjs[0]);
        }
      }
      fc.requestRenderAll();
      isSyncingSelectionRef.current = false;
    };

    renderCanvasScene();

    return () => {
      isCancelled = true;
    };
  }, [elements, activePage?.background, docWidth, docHeight]);

  // 5. Sync Selection from Store to Fabric
  useEffect(() => {
    const fc = fabricCanvasRef.current;
    if (!fc || isSyncingSelectionRef.current) return;

    isSyncingSelectionRef.current = true;
    if (selectedElementIds.length === 0) {
      fc.discardActiveObject();
    } else {
      const objs = fc
        .getObjects()
        .filter((o: any) => selectedElementIds.includes(o.elementId));

      if (objs.length === 1) {
        fc.setActiveObject(objs[0]);
      }
    }
    fc.requestRenderAll();
    isSyncingSelectionRef.current = false;
  }, [selectedElementIds]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden bg-slate-100 flex items-center justify-center select-none"
    >
      {/* Background Subtle Grid Pattern if enabled */}
      {showGrid && (
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: `radial-gradient(#6366f1 1px, transparent 1px)`,
            backgroundSize: `${gridSize * zoom * 2}px ${gridSize * zoom * 2}px`,
          }}
        />
      )}

      {/* Main Fabric Canvas */}
      <canvas ref={canvasElRef} />

      {/* Dynamic Alignment Guides */}
      {guides.x !== undefined && (
        <div
          className="absolute top-0 bottom-0 border-l border-dashed border-violet-500 pointer-events-none z-10"
          style={{
            left: `${guides.x * zoom + (containerRef.current?.clientWidth || 0) / 2 - (docWidth * zoom) / 2 + panX}px`,
          }}
        />
      )}
      {guides.y !== undefined && (
        <div
          className="absolute left-0 right-0 border-t border-dashed border-violet-500 pointer-events-none z-10"
          style={{
            top: `${guides.y * zoom + (containerRef.current?.clientHeight || 0) / 2 - (docHeight * zoom) / 2 + panY}px`,
          }}
        />
      )}

      {/* Viewport Info Overlay */}
      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs border border-slate-200/80 rounded-lg px-2.5 py-1 text-[11px] text-slate-500 shadow-xs pointer-events-none font-mono">
        {docWidth} × {docHeight} px • {Math.round(zoom * 100)}%
      </div>
    </div>
  );
}
