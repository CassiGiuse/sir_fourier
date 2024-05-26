"use client";

import React, { useCallback, useMemo } from "react";
import Canvas from "./components/Canvas";
import Vector from "./models/Vector";
import chroma from "chroma-js";

export default function LabPage() {
  // Manteniamo lo stesso riferimento dell'array tra i render
  const points = useMemo<Array<number>>(() => [], []); // Inizializza l'array points con useMemo

  const customVector = useMemo<Vector>(() => new Vector(), []);

  customVector.setVectorColor(chroma("red").hex());

  // Utilizziamo useCallback per memorizzare la funzione draw
  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, time: number) => {
      time = -time;
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // pulisce canvas

      customVector
        .drawVector(ctx, time, {
          x: ctx.canvas.width / 4,
          y: ctx.canvas.height / 2,
        })
        .linkLineToOrdinateAxis();

      // Onda sinusoidale
      // ctx.beginPath();
      // for (let x = 0; x < points.length; x++) {
      //   ctx.lineTo(
      //     ctx.canvas.width / 2 + x,
      //     ctx.canvas.height / 2 + points[points.length - x]
      //   );
      // }
      // if (points.length > ctx.canvas.width) {
      //   points.splice(0, ctx.canvas.width / 2);
      // }
      // ctx.stroke();
    },
    [customVector]
  );

  return (
    <div style={{ border: "2px solid red" }}>
      <Canvas draw={draw}></Canvas>
    </div>
  );
}
