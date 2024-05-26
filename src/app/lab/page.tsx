"use client";

import React, { useCallback, useMemo } from "react";
import Canvas from "./components/Canvas";
import Vector from "./models/Vector";
import chroma from "chroma-js";

export default function LabPage() {
  // Manteniamo lo stesso riferimento tra i render con useMemo
  const customVector = useMemo<Vector>(() => new Vector(), []);

  /*
  test:
  {
    amplitude: 150,
    frequency: 0.009,
    phi: 90,
    vectorColor: chroma("red").hex(),
  }
  */

  // Utilizziamo useCallback per memorizzare la funzione draw
  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, time: number) => {
      time = -time; // anti orario
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // pulisce canvas

      customVector
        .drawVector(ctx, time, {
          x: ctx.canvas.width / 4,
          y: ctx.canvas.height / 2,
        })
        .showLinkLine()
        .showSineWave();
    },
    [customVector]
  );

  return (
    <div style={{ border: "2px solid red" }}>
      <Canvas draw={draw}></Canvas>
    </div>
  );
}
