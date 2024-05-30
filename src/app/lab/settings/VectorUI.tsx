import React, { useContext, useState, useEffect } from "react";
import Vector from "../models/Vector";
import { Typography } from "@mui/material";
import VectorContext from "../data_context/VectorContext";

export default function VectorUI({ vector }: { vector: Vector }) {
  const context = useContext(VectorContext);

  if (context === undefined) {
    throw new Error("VectorsPlayground must be used within a VectorProvider");
  }

  const { currentVector, setCurrentVector, modified } = context;

  // const vectorInfo = useMemo(() => vector.getVectorInfo(), [vector]);
  const [vectorInfo, setVectorInfo] = useState(vector.getVectorInfo());

  useEffect(() => {
    if (currentVector === null) return;
    if (currentVector !== vector) return;

    setVectorInfo(currentVector.getVectorInfo());
  }, [modified, currentVector, vector]);

  return (
    <div
      className="drop-shadow-lg p-4 rounded-lg inline-block"
      style={{
        backgroundColor: "#141414",
        minWidth: "400px",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: vectorInfo.vectorColor,
          marginBottom: "10px",
        }}
      >
        {vectorInfo.vectorName}
      </Typography>
      <div className="full-size display col item-left">
        <Typography paragraph align="left" sx={{ margin: 0 }}>
          Ym:{" "}
          <span
            style={{
              fontSize: "1.2em",
            }}
          >
            {vectorInfo.amplitude.toFixed(2)}
          </span>
        </Typography>
        <Typography paragraph align="left" sx={{ margin: 0 }}>
          ƒ:{" "}
          <span
            style={{
              fontSize: "1.2em",
            }}
          >
            {vectorInfo.frequency}
          </span>{" "}
          Hz
        </Typography>
        <Typography paragraph align="left" sx={{ margin: 0 }}>
          φ:{" "}
          <span
            style={{
              fontSize: "1.2em",
            }}
          >
            {vectorInfo.phi.toFixed(2)}
          </span>{" "}
          rad
        </Typography>
        <Typography paragraph align="left" sx={{ margin: 0 }}>
          <span
            style={{
              fontSize: "1.2em",
            }}
          >
            {vector.toString()}
          </span>
        </Typography>
        <button
          onClick={() => {
            setCurrentVector(vector);
          }}
        >
          Modifica
        </button>
      </div>
    </div>
  );
}
