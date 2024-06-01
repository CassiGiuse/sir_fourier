import React from "react";
import SeriesList from "./SeriesList";
import { Stack } from "@mui/material";
import { FourierSeries } from "../models/FourierSeries";
import SeriesManager from "./SeriesManager";

type SetSeriesFunction = React.Dispatch<
  React.SetStateAction<Array<FourierSeries>>
>;

interface SeriesPlaygroundProps {
  items: Array<FourierSeries>;
  hItems: SetSeriesFunction;
}

export default function SeriesPlayground({
  items,
  hItems,
}: SeriesPlaygroundProps) {
  return (
    <Stack
      spacing={{ xs: 1, sm: 2 }}
      direction="column"
      useFlexGap
      flexWrap="wrap"
    >
      <SeriesList items={items} hItems={hItems}></SeriesList>
      <SeriesManager hItems={hItems}></SeriesManager>
    </Stack>
  );
}
