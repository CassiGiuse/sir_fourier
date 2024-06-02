"use client";

import React, { useCallback, useState } from "react";
import Vector from "./models/Vector";
import { Typography, Slider, Box, Stack } from "@mui/material";
import CanvasManager from "./components/CanvasManager";
import VectorsPlayground from "./settings/VectorsPlayground";
import { VectorProvider } from "./data_context/VectorContext";
import { FourierSeries } from "./models/FourierSeries";
import SeriesPlayground from "./settings/SeriesPlayground";
import Canvas from "./components/Canvas";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function LabPage() {
  const MemoizedVectorsPlayground = React.memo(VectorsPlayground);
  const MemoizedSeriesPlayground = React.memo(SeriesPlayground);

  const [vectors, setVectors] = useState<Array<Vector>>([new Vector()]);

  const [waveType, setWaveType] = useState("dente di sega");
  const [series, setSeries] = useState(
    new FourierSeries({ numberHarmonics: 10, seriesName: waveType })
  );

  const [amplitude, setAmplitude] = useState(series.getAmplitude());
  const [frequency, setFrequency] = useState(series.getFrequency());
  const [numHarm, setHarmonics] = useState(series.getNumberHarmonics());

  const drawVectorPlayground = useCallback(
    (ctx: CanvasRenderingContext2D, time: number) => {
      time = -time;
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
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
    },
    [vectors]
  );

  const drawFourierPlayground = useCallback(
    (ctx: CanvasRenderingContext2D, time: number) => {
      time = -time;
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      const canvasWidth = ctx.canvas.width;
      const canvasHeight = ctx.canvas.height;

      Vector.drawAxxes(ctx);

      series.drawSeries(ctx, time, {
        x: canvasWidth / 4,
        y: canvasHeight / 2,
      });
    },
    [series]
  );

  const boxStyle = {
    width: "60%",
    minHeight: "80dvh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  };

  const handleWaveTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newWaveType = event.target.value;
    setWaveType(newWaveType);
    setSeries(
      new FourierSeries({
        ...series.getSeriesInfo(),
        seriesName: newWaveType,
      })
    );
  };

  return (
    <React.Fragment>
      <a id="back-to-top"></a>
      <Typography variant="h4" sx={{ marginBottom: "5px" }}>
        Vettori!
      </Typography>
      <CanvasManager draw={drawVectorPlayground}>
        <VectorProvider>
          <MemoizedVectorsPlayground
            items={vectors}
            hItems={setVectors}
          ></MemoizedVectorsPlayground>
        </VectorProvider>
      </CanvasManager>
      <Typography variant="h4" sx={{ marginBottom: "5px", marginTop: "10px" }}>
        Serie di Fourier!
      </Typography>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row-reverse"
        useFlexGap
        flexWrap="wrap"
        sx={{ width: "90%" }}
      >
        <Box component={"div"} sx={boxStyle}>
          <Canvas draw={drawFourierPlayground}></Canvas>
        </Box>
        <form className="w-1/3">
          <Stack
            spacing={{ xs: 1, sm: 2 }}
            direction="column"
            useFlexGap
            flexWrap="wrap"
          >
            <label className="flex flex-col m-2">
              <Typography variant="subtitle1">Opzioni</Typography>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Tipo di onda
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={waveType}
                  onChange={handleWaveTypeChange}
                >
                  <FormControlLabel
                    value="quadrata"
                    control={<Radio />}
                    label="quadrata"
                  />
                  <FormControlLabel
                    value="triangolare"
                    control={<Radio />}
                    label="triangolare"
                  />
                  <FormControlLabel
                    value="dente di sega"
                    control={<Radio />}
                    label="dente di sega"
                  />
                </RadioGroup>
              </FormControl>
            </label>
            <label className="flex flex-col m-2">
              <Typography variant="subtitle1">Ampiezza {amplitude}</Typography>
              <Slider
                aria-label="Ampiezza"
                defaultValue={30}
                valueLabelDisplay="auto"
                step={5}
                marks
                min={5}
                max={110}
                value={amplitude}
                onChange={(_, newValue) => {
                  const value = Array.isArray(newValue)
                    ? newValue[0]
                    : newValue;
                  setAmplitude(value);
                  series.setInitialAmplitude(value);
                  const seriesInfo = series.getSeriesInfo();
                  setSeries(
                    new FourierSeries({
                      ...seriesInfo,
                      initialAmplitude: value,
                    })
                  );
                }}
              />
            </label>
            <label className="flex flex-col m-2">
              <Typography variant="subtitle1">Frequenza {frequency}</Typography>
              <Slider
                aria-label="Frequenza"
                defaultValue={5}
                step={1}
                min={1}
                max={100}
                valueLabelDisplay="auto"
                value={frequency}
                onChange={(_, newValue) => {
                  const value = Array.isArray(newValue)
                    ? newValue[0]
                    : newValue;
                  setFrequency(value);
                  series.setInitialFrequency(value / 1000);
                  const seriesInfo = series.getSeriesInfo();
                  setSeries(
                    new FourierSeries({
                      ...seriesInfo,
                      initialFrequency: value / 1000,
                    })
                  );
                }}
              />
            </label>
            <label className="flex flex-col m-2">
              <Typography variant="subtitle1">
                Numero Armoniche {numHarm}
              </Typography>
              <Slider
                aria-label="Armoniche"
                defaultValue={numHarm}
                step={1}
                min={1}
                max={30}
                valueLabelDisplay="auto"
                value={numHarm}
                onChange={(_, newValue) => {
                  const value = Array.isArray(newValue)
                    ? newValue[0]
                    : newValue;
                  setHarmonics(value);
                  series.setHarmonicsNumber(value);
                  const seriesInfo = series.getSeriesInfo();
                  setSeries(
                    new FourierSeries({
                      ...seriesInfo,
                      numberHarmonics: value,
                    })
                  );
                }}
              />
            </label>
          </Stack>
        </form>
      </Stack>
    </React.Fragment>
  );
}
