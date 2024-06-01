"use client";

import React, { useCallback, useMemo, useState } from "react";
import Vector from "./models/Vector";
import { Typography, Slider } from "@mui/material";
import CanvasManager from "./components/CanvasManager";
import VectorsPlayground from "./settings/VectorsPlayground";
import { VectorProvider } from "./data_context/VectorContext";
import { SeriesProvider } from "./data_context/SeriesContext";
import { FourierSeries } from "./models/FourierSeries";
import SeriesPlayground from "./settings/SeriesPlayground";

export default function LabPage() {
  // Manteniamo lo stesso riferimento tra i render con useMemo
  const MemoizedVectorsPlayground = React.memo(VectorsPlayground);
  const MemoizedSeriesPlayground = React.memo(SeriesPlayground);

  const [vectors, setVectors] = useState<Array<Vector>>([new Vector()]);

  const [series, setSeries] = useState<Array<FourierSeries>>([
    new FourierSeries({ numberHarmonics: 10 }),
  ]);

  // Utilizziamo useCallback per memorizzare la funzione draw
  const drawVectorPlayground = useCallback(
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

  const drawFourierPlayground = useCallback(
    (ctx: CanvasRenderingContext2D, time: number) => {
      time = -time;
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // pulisce canvas
      const canvasWidth = ctx.canvas.width;
      const canvasHeight = ctx.canvas.height;

      Vector.drawAxxes(ctx);

      series.forEach((crrSeries) => {
        crrSeries.drawSeries(ctx, time, {
          x: canvasWidth / 4,
          y: canvasHeight / 2,
        });
      });
    },
    [series]
  );

  return (
    <React.Fragment>
      <a id="back-to-top"></a>
      <Typography variant="h4" sx={{ marginBottom: "5px" }}>
        Vettori!
      </Typography>
      <CanvasManager draw={drawVectorPlayground}>
        <VectorProvider>
          <MemoizedVectorsPlayground
            items={vectors}
            hItems={setVectors}
          ></MemoizedVectorsPlayground>
        </VectorProvider>
      </CanvasManager>
      <Typography variant="h4" sx={{ marginBottom: "5px", marginTop: "10px" }}>
        Serie di Fourier!
      </Typography>
      <CanvasManager draw={drawFourierPlayground}>
        <SeriesProvider>
          <MemoizedSeriesPlayground
            items={series}
            hItems={setSeries}
          ></MemoizedSeriesPlayground>
        </SeriesProvider>
      </CanvasManager>
    </React.Fragment>
  );
}
