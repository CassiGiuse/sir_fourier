"use client";

import React, { useCallback, useMemo } from "react";
import Canvas from "./components/Canvas";
import Vector from "./models/Vector";
import { Typography, Box } from "@mui/material";
import { contextWrapper } from "@/utils/Drawable";
import chroma from "chroma-js";
import { convertBase } from "@/utils/Convertor";

export default function LabPage() {
  // Manteniamo lo stesso riferimento tra i render con useMemo
  const customVector = useMemo<Vector>(
    () =>
      new Vector({
        amplitude: 90,
        frequency: 0.0019,
        phi: 0,
        vectorColor: chroma.random().hex(),
      }),
    []
  );

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

      contextWrapper(
        ctx,
        {
          lineWidth: 1,
          strokeStyle: chroma("white").hex() + convertBase(50, 16),
        },
        () => {
          const canvasWidth = ctx.canvas.width;
          const canvasHeight = ctx.canvas.height;

          ctx.moveTo(canvasWidth / 2, 0);
          ctx.lineTo(canvasWidth / 2, canvasHeight);

          ctx.moveTo(0, canvasHeight / 2);
          ctx.lineTo(canvasWidth, canvasHeight / 2);
        }
      );

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

  const boxStyle = {
    width: "80%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <React.Fragment>
      <Typography variant="h4" sx={{ marginBottom: "5px" }}>
        Vettori!
      </Typography>
      <Box component={"div"} sx={boxStyle}>
        <Canvas draw={draw}></Canvas>
      </Box>
    </React.Fragment>
  );
}
