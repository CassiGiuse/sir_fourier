import React, { useContext, useState } from "react";
import { FourierSeries } from "../models/FourierSeries";
import { Typography, Stack, Slider } from "@mui/material";
import SeriesContext from "../data_context/SeriesContext";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

type SetSeriesFunction = React.Dispatch<
  React.SetStateAction<Array<FourierSeries>>
>;

interface SeriesManagerProps {
  hItems: SetSeriesFunction;
}

export default function SeriesManager({ hItems }: SeriesManagerProps) {
  const context = useContext(SeriesContext);

  if (context === undefined) {
    throw new Error("SeriesPlayground must be used within a SeriesProvider");
  }

  const { currentSeries, setCurrentSeries, modified } = context;

  const {values, setValues} = useState(currentSeries?.getSeriesInfo() || {});

  return (
    <AnimatePresence>
      {currentSeries === null ? (
        <h1>Niente da mostrare!</h1>
      ) : (
        <motion.form>
          <Typography variant="h5" sx={{ marginBottom: "5px" }}>
            Modifica / Crea vettore!
          </Typography>
          <Stack
            spacing={{ xs: 1, sm: 2 }}
            direction="column"
            useFlexGap
            flexWrap="wrap"
          >
            <label className="flex flex-col m-2">
              <Typography variant="subtitle1">Ampiezza</Typography>
              <Slider
                aria-label="Ampiezza"
                defaultValue={30}
                valueLabelDisplay="auto"
                shiftStep={30}
                step={5}
                marks
                min={5}
                max={110}
                value={currentSeries.getAmplitude()}
                onChange={(event: Event, newValue: number | number[]) => {
                  const value = Array.isArray(newValue)
                    ? newValue[0]
                    : newValue;
                  currentSeries.setInitialAmplitude(value);
                }}
              />{" "}
            </label>
          </Stack>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
