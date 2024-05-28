import React, { useMemo } from "react";
import Vector from "../models/Vector";
import { Typography } from "@mui/material";

export default function VectorUI({ vector }: { vector: Vector }) {
  const vectorInfo = useMemo(() => vector.getVectorInfo(), [vector]);

  return (
    <div
      className="drop-shadow-lg p-4 rounded-lg inline-block"
      style={{
        backgroundColor: "#141414",
        minWidth: "400px",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          color: vectorInfo.vectorColor,
          marginBottom: "10px",
        }}
      >
        {vectorInfo.vectorName}
      </Typography>
      <div className="full-size display col item-left">
        <Typography paragraph align="left">
          Ym:{" "}
          <span
            style={{
              fontSize: "1.2em",
            }}
          >
            {vectorInfo.amplitude}
          </span>
        </Typography>
        <Typography paragraph align="left">
          ƒ:{" "}
          <span
            style={{
              fontSize: "1.2em",
            }}
          >
            {vectorInfo.frequency}
          </span>{" "}
          Hz?
        </Typography>
        <Typography paragraph align="left">
          φ:{" "}
          <span
            style={{
              fontSize: "1.2em",
            }}
          >
            {vectorInfo.phi}
          </span>{" "}
          rad
        </Typography>
        <Typography paragraph align="left">
          <span
            style={{
              fontSize: "1.2em",
            }}
          >
            {vector.toString()}
          </span>
        </Typography>
      </div>
    </div>
  );
}
