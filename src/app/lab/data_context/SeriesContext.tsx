import { createContext, ReactNode, useState } from "react";
import Vector from "../models/Vector";
import { SeriesContextType } from "../globals/Interfaces";
import { FourierSeries } from "../models/FourierSeries";

const SeriesContext = createContext<SeriesContextType | undefined>(undefined);

interface VectorProviderProps {
  children: ReactNode;
}

export const SeriesProvider = ({ children }: VectorProviderProps) => {
  const [currentSerires, setCurrentSeries] = useState<null | FourierSeries>(
    null
  );
  const [modified, setModified] = useState<boolean>(false);

  return (
    <SeriesContext.Provider
      value={{
        currentSeries: currentSerires,
        setCurrentSeries: setCurrentSeries,
        modified,
        setModified,
      }}
    >
      {children}
    </SeriesContext.Provider>
  );
};

export default SeriesContext;
