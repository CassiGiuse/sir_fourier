"use client";

import React, { useCallback, useMemo, useState } from "react";
import Vector from "./models/Vector";
import { Typography, Slider } from "@mui/material";
import CanvasManager from "./components/CanvasManager";
import VectorsPlayground from "./settings/VectorsPlayground";
import { VectorProvider } from "./data_context/VectorContext";
import { FourierSeries } from "./models/FourierSeries";

export default function LabPage() {
  // Manteniamo lo stesso riferimento tra i render con useMemo
  const MemoizedVectorsPlayground = React.memo(VectorsPlayground);

  const [vectors, setVectors] = useState<Array<Vector>>([]);

  const [series, setSeries] = useState<Array<FourierSeries>>([
    new FourierSeries({ numberHarmonics: 10 }),
  ]);

  const [value, setValue] = useState<number>(10);

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

      series.forEach((crrSeries) => {
        crrSeries.drawSeries(ctx, time, {
          x: canvasWidth / 4,
          y: canvasHeight / 2,
        });
      });
    },
    [vectors, series]
  );

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    const value = Array.isArray(newValue) ? newValue[0] : newValue;
    setValue(value);
    series[0].setHarmonicsNumber(value);
  };

  return (
    <React.Fragment>
      <a id="back-to-top"></a>
      <Typography variant="h4" sx={{ marginBottom: "5px" }}>
        Vettori!
      </Typography>
      <Slider
        aria-label="Numero di armoniche"
        defaultValue={30}
        valueLabelDisplay="auto"
        shiftStep={30}
        step={5}
        marks
        min={5}
        max={110}
        value={value}
        onChange={handleSliderChange}
      />{" "}
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
