import React from "react";
import Stack from "@mui/material/Stack";
import VectorList from "./VectorList";
import Vector from "../models/Vector";
import VectorManager from "./VectorManager";

interface VectorListProps {
  items: Array<Vector>;
}

export default function VectorsPlayground({ items }: VectorListProps) {
  return (
    <div className="size-ful">
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
      >
        <VectorList items={items}></VectorList>
        <VectorManager></VectorManager>
      </Stack>
    </div>
  );
}
