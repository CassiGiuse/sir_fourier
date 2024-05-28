import React from "react";
import { Typography } from "@mui/material";

export default function VectorManager() {
  return (
    <form>
      <Typography variant="h5">Modifica / Crea vettore!</Typography>
      <label>
        <span>Ampiezza</span>
        <input type="text" className="" />
      </label>
      <label>
        <span>Frequenza</span>
        <input type="text" />
      </label>
      <label>
        <span>Phi</span>
        <input type="text" />
      </label>
      <Typography variant="h6">Opzionali</Typography>
    </form>
  );
}
