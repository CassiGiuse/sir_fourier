"use client"

import React from "react";
import { Fab, Box } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { AnimatePresence } from "framer-motion";
import Canvas from "./Canvas";
import { useState } from "react";
import FloatingMenu from "./FloatingMenu";

// Definizione del tipo della funzione draw
type DrawFunction = (ctx: CanvasRenderingContext2D, frameCount: number) => void;

interface CanvasProps {
  draw: DrawFunction; // Utilizziamo il tipo appena definito per la prop draw
  children: React.ReactNode;
}

export default function CanvasManager({ draw, children }: CanvasProps) {
  // Manteniamo lo stesso riferimento tra i render con useMemo
  const [menuOnView, setMenuView] = useState(false);
  const MemoizedFloatingMenu = React.memo(FloatingMenu);

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
            {children}
          </MemoizedFloatingMenu>
        )}
      </AnimatePresence>
    </Box>
  );
}
