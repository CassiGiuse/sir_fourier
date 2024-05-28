"use client";

import React, { useState } from "react";
import { Typography, Stack, Button, ButtonGroup } from "@mui/material";
import "./style.css";
import Vector from "../models/Vector";

type SetVectorsFunction = React.Dispatch<React.SetStateAction<Array<Vector>>>;

export default function VectorManager({
  hItems,
  vector = null,
}: {
  hItems: SetVectorsFunction;
  vector?: Vector | null;
}) {
  const [vectorData, setVectorData] = useState(
    vector === null
      ? {
          amplitude: "",
          frequency: "",
          phi: "",
          vectorName: "",
          vectorColor: "#000000",
        }
      : {
          amplitude: vector.getAmplitude().toString(),
          frequency: vector.getFrequency().toString(),
          phi: vector.getInitialPhase().toString(),
          vectorName: vector.getVectorName(),
          vectorColor: vector.getVectorColor(),
        }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setVectorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddVector = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (vector !== null) return;

    const {
      amplitude,
      frequency,
      phi,
      vectorName,
      vectorColor,
    }: {
      amplitude: string;
      frequency: string;
      phi: string;
      vectorName: string;
      vectorColor: string;
    } = vectorData;

    const newVectorData = {
      amplitude: parseFloat(amplitude) || (Math.random() * 100),
      frequency: parseFloat(frequency) || (Math.random() / 100),
      phi: parseFloat(phi) || (Math.random() * 360),
      vectorName,
      vectorColor,
    };

    const newVector = new Vector(newVectorData);
    hItems((prev) => [...prev, newVector]);
    setVectorData({
      amplitude: "",
      frequency: "",
      phi: "",
      vectorName: "",
      vectorColor: "#000000",
    });
  };

  return (
    <form>
      <Typography variant="h5" sx={{ marginBottom: "5px" }}>
        Modifica / Crea vettore!
      </Typography>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
      >
        <div>
          <Typography variant="h6">Richiesti</Typography>
          <label className="flex flex-col m-2">
            <Typography variant="subtitle1">Ampiezza</Typography>
            <input
              type="number"
              className="vectorManager_input"
              required
              name="amplitude"
              value={vectorData.amplitude}
              onChange={handleInputChange}
            />
          </label>
          <label className="flex flex-col m-2 mt-3 mb-3">
            <Typography variant="subtitle1">Frequenza</Typography>
            <input
              type="number"
              className="vectorManager_input"
              required
              name="frequency"
              value={vectorData.frequency}
              onChange={handleInputChange}
            />
          </label>
          <label className="flex flex-col m-2 mb-3">
            <Typography variant="subtitle1">Phi</Typography>
            <input
              type="number"
              className="vectorManager_input"
              required
              name="phi"
              value={vectorData.phi}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <Typography variant="h6">Opzionali</Typography>
          <label className="flex flex-col m-2 mb-3">
            <Typography variant="subtitle1">Nome</Typography>
            <input
              type="text"
              className="vectorManager_input"
              name="vectorName"
              value={vectorData.vectorName}
              onChange={handleInputChange}
            />
          </label>
          <label className="flex flex-col m-2 mb-3">
            <Typography variant="subtitle1">Colore</Typography>
            <div className="flex items-center gap-2">
              <input
                type="color"
                className="vectorManager_input"
                name="vectorColor"
                value={vectorData.vectorColor}
                onChange={handleInputChange}
              />
              <span id="colorHex">{vectorData.vectorColor}</span>
            </div>
          </label>
        </div>
      </Stack>
      <button onClick={handleAddVector}>Cliccami per aggiungere!</button>
    </form>
  );
}
