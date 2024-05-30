"use client";

import React, { useCallback, useMemo, useState } from "react";
import Vector from "./models/Vector";
import { Typography } from "@mui/material";
import CanvasManager from "./components/CanvasManager";
import VectorsPlayground from "./settings/VectorsPlayground";
import { VectorProvider } from "./data_context/VectorContext";

export default function LabPage() {
  // Manteniamo lo stesso riferimento tra i render con useMemo
  const customVector = useMemo<Vector>(() => new Vector(), []);
  const MemoizedVectorsPlayground = React.memo(VectorsPlayground);

  const [vectors, setVectors] = useState<Array<Vector>>([customVector]);

  // Utilizziamo useCallback per memorizzare la funzione draw
  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, time: number) => {
      time = -time; // anti orario
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // pulisce canvas
      const canvasWidth = ctx.canvas.width;
      const canvasHeight = ctx.canvas.height;

      Vector.drawAxxes(ctx);

      vectors.forEach((vector) => {
        vector
          .drawVector(ctx, time, {
            x: canvasWidth / 4,
            y: canvasHeight / 2,
          })
          .showLinkLine()
          .showSineWave();
      });
    },
    [vectors]
  );

  return (
    <React.Fragment>
      <a id="back-to-top"></a>
      <Typography variant="h4" sx={{ marginBottom: "5px" }}>
        Vettori!
      </Typography>
      <CanvasManager draw={draw}>
        <VectorProvider>
          <MemoizedVectorsPlayground
            items={vectors}
            hItems={setVectors}
          ></MemoizedVectorsPlayground>
        </VectorProvider>
      </CanvasManager>
    </React.Fragment>
  );
}
