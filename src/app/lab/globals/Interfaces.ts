import { FourierSeries } from "../models/FourierSeries";
import Vector from "../models/Vector";
import React from "react";

interface VectorContextType {
  currentVector: Vector | null;
  setCurrentVector: React.Dispatch<React.SetStateAction<null | Vector>>;
  modified: boolean;
  setModified: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SeriesContextType {
  currentSeries: FourierSeries | null;
  setCurrentSeries: React.Dispatch<React.SetStateAction<null | FourierSeries>>;
  modified: boolean;
  setModified: React.Dispatch<React.SetStateAction<boolean>>;
}

export type { VectorContextType, SeriesContextType };
