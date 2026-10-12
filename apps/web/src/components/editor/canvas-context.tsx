'use client';

import React, { createContext, useContext, useRef, useState, useCallback } from 'react';
import type { Canvas } from 'fabric';

interface CanvasContextType {
  canvas: Canvas | null;
  setCanvasInstance: (canvas: Canvas | null) => void;
  exportCanvasAsDataURL: (options?: { format?: 'png' | 'jpeg'; quality?: number; multiplier?: number; transparent?: boolean }) => string | null;
  fitCanvasToScreen: () => void;
}

const CanvasContext = createContext<CanvasContextType>({
  canvas: null,
  setCanvasInstance: () => {},
  exportCanvasAsDataURL: () => null,
  fitCanvasToScreen: () => {},
});

export function CanvasProvider({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<Canvas | null>(null);
  const [, setRerender] = useState(0);

  const setCanvasInstance = useCallback((c: Canvas | null) => {
    canvasRef.current = c;
    setRerender((v) => v + 1);
  }, []);

  const exportCanvasAsDataURL = useCallback((options?: { format?: 'png' | 'jpeg'; quality?: number; multiplier?: number; transparent?: boolean }) => {
    const c = canvasRef.current;
    if (!c) return null;
    const format = options?.format || 'png';
    const quality = options?.quality ?? 0.95;
    const multiplier = options?.multiplier ?? 1;

    try {
      return c.toDataURL({
        format: format === 'png' ? 'png' : 'jpeg',
        quality,
        multiplier,
      });
    } catch (e) {
      console.error('Failed to export canvas as data URL:', e);
      return null;
    }
  }, []);

  const fitCanvasToScreen = useCallback(() => {
    // Handled in canvas or via store zoom
  }, []);

  return (
    <CanvasContext.Provider
      value={{
        canvas: canvasRef.current,
        setCanvasInstance,
        exportCanvasAsDataURL,
        fitCanvasToScreen,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
}

export function useCanvas() {
  return useContext(CanvasContext);
}
