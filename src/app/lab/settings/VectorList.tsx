import React from "react";
import Vector from "../models/Vector";
import VectorUI from "./VectorUI";

interface VectorListProps {
  items: Array<Vector>;
}

export default function VectorList({ items }: VectorListProps) {
  return (
    <div className="border-gray-200 border-2 p-2 rounded w-full flex gap-2 overflow-x-scroll scrollbar scrollbar-thumb-slate-300">
      {items.map((item: Vector, index) => (
        <VectorUI key={index} vector={item}></VectorUI>
      ))}
    </div>
  );
}
