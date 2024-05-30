import React from "react";
import Stack from "@mui/material/Stack";
import VectorList from "./VectorList";
import Vector from "../models/Vector";
import VectorManager from "./VectorManager";

type SetVectorsFunction = React.Dispatch<React.SetStateAction<Array<Vector>>>;

interface VectorListProps {
  items: Array<Vector>;
  hItems: SetVectorsFunction;
}

export default function VectorsPlayground({ items, hItems }: VectorListProps) {
  return (
    <Stack
      spacing={{ xs: 1, sm: 2 }}
      direction="row"
      useFlexGap
      flexWrap="wrap"
    >
      <VectorList items={items} hItems={hItems}></VectorList>
      <VectorManager hItems={hItems}></VectorManager>
    </Stack>
  );
}
