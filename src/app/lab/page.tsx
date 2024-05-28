"use client";

import React, { useCallback, useMemo } from "react";
import Vector from "./models/Vector";
import { Typography } from "@mui/material";
import CanvasManager from "./components/CanvasManager";
import VectorsPlayground from "./settings/VectorsPlayground";

export default function LabPage() {
  // Manteniamo lo stesso riferimento tra i render con useMemo
  const customVector = useMemo<Vector>(() => new Vector(), []);
  const MemoizedVectorsPlayground = React.memo(VectorsPlayground);

  const vectors = useMemo<Array<Vector>>(
    () => new Array<Vector>(customVector),
    [customVector]
  );

  // Utilizziamo useCallback per memorizzare la funzione draw
  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, time: number) => {
      time = -time; // anti orario
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // pulisce canvas
      const canvasWidth = ctx.canvas.width;
      const canvasHeight = ctx.canvas.height;

      Vector.drawAxxes(ctx);

      customVector
        .drawVector(ctx, time, {
          x: canvasWidth / 4,
          y: canvasHeight / 2,
        })
        .showLinkLine()
        .showSineWave();
    },
    [customVector]
  );

  return (
    <React.Fragment>
      <a id="back-to-top"></a>
      <Typography variant="h4" sx={{ marginBottom: "5px" }}>
        Vettori!
      </Typography>
      <CanvasManager draw={draw}>
        <MemoizedVectorsPlayground items={vectors}></MemoizedVectorsPlayground>
      </CanvasManager>
    </React.Fragment>
  );
}
