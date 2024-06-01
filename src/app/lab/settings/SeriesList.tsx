import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typography } from "@mui/material";
import { FourierSeries } from "../models/FourierSeries";
import SeriesUI from "./SeriesUI";

type SetSeriesFunction = React.Dispatch<
  React.SetStateAction<Array<FourierSeries>>
>;

interface SeriesListProps {
  items: Array<FourierSeries>;
  hItems: SetSeriesFunction;
}

export default function SeriesList({ items, hItems }: SeriesListProps) {
  return (
    <motion.div
      layout
      className="border-gray-200 border-b-2 p-2 rounded w-full flex gap-2 overflow-x-scroll scrollbar scrollbar-thumb-slate-300"
    >
      <AnimatePresence>
        {items.length > 0 ? (
          items.map((item: FourierSeries, index) => (
            <SeriesUI key={index} item={item} hItems={hItems}></SeriesUI>
          ))
        ) : (
          <Typography variant="h4">Niente da caricare!</Typography>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
