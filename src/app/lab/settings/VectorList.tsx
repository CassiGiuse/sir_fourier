import React from "react";
import Vector from "../models/Vector";
import VectorUI from "./VectorUI";
import { motion, AnimatePresence } from "framer-motion";
import { Typography, listItemClasses } from "@mui/material";

type SetVectorsFunction = React.Dispatch<React.SetStateAction<Array<Vector>>>;
interface VectorListProps {
  items: Array<Vector>;
  hItems: SetVectorsFunction;
}

export default function VectorList({ items, hItems }: VectorListProps) {
  return (
    <motion.div
      layout
      className="border-gray-200 border-b-2 p-2 rounded w-full flex gap-2 overflow-x-scroll scrollbar scrollbar-thumb-slate-300"
    >
      <AnimatePresence>
        {items.length > 0 ? (
          items.map((item: Vector, index) => (
            <VectorUI key={index} vector={item} hItems={hItems}></VectorUI>
          ))
        ) : (
          <Typography variant="h4">Niente da caricare!</Typography>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
