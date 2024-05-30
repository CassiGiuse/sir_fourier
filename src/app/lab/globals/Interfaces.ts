import Vector from "../models/Vector";
import React from "react";

interface VectorContextType {
  currentVector: Vector | null;
  setCurrentVector: React.Dispatch<React.SetStateAction<null | Vector>>;
  modified: boolean;
  setModified: React.Dispatch<React.SetStateAction<boolean>>;
}

export type { VectorContextType };
