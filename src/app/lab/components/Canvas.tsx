"use client";

import useCanvas from "@/hooks/useCanvas";
import React, { useRef, useEffect } from "react";

// Definizione del tipo della funzione draw
type DrawFunction = (ctx: CanvasRenderingContext2D, frameCount: number) => void;

interface CanvasProps {
  draw: DrawFunction; // Utilizziamo il tipo appena definito per la prop draw
}

export default function Canvas({ draw }: CanvasProps) {
  
  const canvasRef = useCanvas({ draw });

  return <canvas ref={canvasRef} width={700} height={300}></canvas>;
}
