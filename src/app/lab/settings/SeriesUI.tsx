import React, { useContext, useState, useEffect } from "react";
import { FourierSeries } from "../models/FourierSeries";
import { Typography } from "@mui/material";
import SeriesContext from "../data_context/SeriesContext";
import { motion } from "framer-motion";
import { Button, ButtonGroup } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { AutoFixHigh as ModifyIcon } from "@mui/icons-material";

type SetSeriesFunction = React.Dispatch<
  React.SetStateAction<Array<FourierSeries>>
>;

interface SeriesUI {
  item: FourierSeries;
  hItems: SetSeriesFunction;
}

export default function SeriesUI({ item, hItems }: SeriesUI) {
  const context = useContext(SeriesContext);

  if (context === undefined) {
    throw new Error("SeriesPlayground must be used within a SeriesProvider");
  }

  const { currentSeries, setCurrentSeries, modified } = context;

  const [seriesInfo, setSeriesInfo] = useState(item.getSeriesInfo());

  useEffect(() => {
    if (currentSeries === null) return;
    if (currentSeries !== item) return;

    setSeriesInfo(currentSeries.getSeriesInfo());
  }, [modified, currentSeries, item]);

  return (
    <motion.div
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
          color: seriesInfo.seriesColor,
          marginBottom: "10px",
        }}
      >
        {seriesInfo.seriesName}
      </Typography>
      <div className="full-size display col item-left">
        <Typography paragraph align="left" sx={{ margin: 0 }}>
          Ampiezza iniziale:{" "}
          <span
            style={{
              fontSize: "1.2em",
            }}
          >
            {seriesInfo.amplitude}
          </span>
        </Typography>
        <Typography paragraph align="left" sx={{ margin: 0 }}>
          ƒ0:{" "}
          <span
            style={{
              fontSize: "1.2em",
            }}
          >
            {seriesInfo.frequency.toFixed(5)}
          </span>{" "}
          Hz
        </Typography>
        <div className="w-full mt-2 flex justify-center items-center">
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button
              onClick={() => {
                setCurrentSeries(item);
              }}
            >
              <ModifyIcon></ModifyIcon>
            </Button>
            <Button
              onClick={() => {
                hItems((prev) => prev.filter((el) => el !== item));
              }}
            >
              <DeleteIcon></DeleteIcon>
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </motion.div>
  );
}
