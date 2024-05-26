"use client";

import React, { useCallback, useMemo } from "react";
import Canvas from "./components/Canvas";

export default function LabPage() {
  // Manteniamo lo stesso riferimento dell'array tra i render
  const points = useMemo<Array<number>>(() => [], []); // Inizializza l'array points con useMemo

  // Utilizziamo useCallback per memorizzare la funzione draw
  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, frameCount: number) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      ctx.beginPath(); // Iniziamo un nuovo percorso
      const amp = 100;
      const x = amp * Math.cos(frameCount * 0.02);
      const y = amp * Math.sin(frameCount * 0.02);
      // Utilizzata per spostare il "pennello" (il punto di disegno) del contesto su un nuovo punto nel canvas, senza disegnare alcuna linea
      ctx.moveTo(ctx.canvas.width / 4, ctx.canvas.height / 2);
      // Disegna una linea dal punto specificato nel moveTo al nuovo punto specificato nel linea dal punto lineTo
      ctx.lineTo(x + ctx.canvas.width / 4, y + ctx.canvas.height / 2);
      points.push(y);
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2; // Impostiamo il colore del tratto
      ctx.stroke(); // Eseguiamo il disegno del percorso

      ctx.beginPath();
      for (let x = 0; x < points.length; x++) {
        ctx.lineTo(
          ctx.canvas.width / 2 + x,
          ctx.canvas.height / 2 + points[points.length - x]
        );
      }
      if (points.length > ctx.canvas.width) {
        points.splice(0, ctx.canvas.width / 2);
      }

      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2; // Impostiamo il colore del tratto
      ctx.stroke(); // Eseguiamo il disegno del percorso

      ctx.beginPath(); // Iniziamo un nuovo percorso
      ctx.moveTo(x + ctx.canvas.width / 4, y + ctx.canvas.height / 2);
      ctx.lineTo(ctx.canvas.width / 2, y + ctx.canvas.height / 2);
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2; // Impostiamo il colore del tratto
      ctx.stroke();
    },
    [points]
  );

  return (
    <div
      style={{ border: "2px solid red" }}
    >
      <Canvas draw={draw}></Canvas>
    </div>
  );
}
