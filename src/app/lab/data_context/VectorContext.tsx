import { createContext, ReactNode, useState } from "react";
import Vector from "../models/Vector";
import { VectorContextType } from "../globals/Interfaces";

const VectorContext = createContext<VectorContextType | undefined>(undefined);

interface VectorProviderProps {
  children: ReactNode;
}

export const VectorProvider = ({ children }: VectorProviderProps) => {
  const [currentVector, setCurrentVector] = useState<null | Vector>(null);
  const [modified, setModified] = useState<boolean>(false);

  return (
    <VectorContext.Provider
      value={{ currentVector, setCurrentVector, modified, setModified }}
    >
      {children}
    </VectorContext.Provider>
  );
};

export default VectorContext;
