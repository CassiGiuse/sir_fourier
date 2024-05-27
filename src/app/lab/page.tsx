"use client";

import React, { useCallback, useMemo, useState } from "react";
import Canvas from "./components/Canvas";
import Vector from "./models/Vector";
import { Typography, Box } from "@mui/material";
import Fab from "@mui/material/Fab";
import SettingsIcon from "@mui/icons-material/Settings";
import { AnimatePresence } from "framer-motion";
import FloatingMenu from "./components/FloatingMenu";

export default function LabPage() {
  // Manteniamo lo stesso riferimento tra i render con useMemo
  const customVector = useMemo<Vector>(() => new Vector(), []);
  const [menuOnView, setMenuView] = useState(false);
  const MemoizedFloatingMenu = React.memo(FloatingMenu);

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

  const boxStyle = {
    width: "80%",
    minHeight: "80dvh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  };

  const fabStyle = {
    position: "absolute",
    zIndex: 999,
    bottom: 0,
    right: 0,
    margin: "20px",
  };

  return (
    <React.Fragment>
      <a id="back-to-top"></a>
      <Typography variant="h4" sx={{ marginBottom: "5px" }}>
        Vettori!
      </Typography>
      <Box component={"div"} sx={boxStyle}>
        <Canvas draw={draw}></Canvas>
        <Fab
          color="primary"
          aria-label="open settings"
          sx={fabStyle}
          onClick={() => {
            setMenuView((prev) => !prev);
          }}
        >
          <SettingsIcon />
        </Fab>
        <AnimatePresence>
          {menuOnView && (
            <MemoizedFloatingMenu>
              <h1>Ciao!</h1>
            </MemoizedFloatingMenu>
          )}
        </AnimatePresence>
      </Box>
    </React.Fragment>
  );
}
