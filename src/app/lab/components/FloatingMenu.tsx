import { motion } from "framer-motion";
import React from "react";

interface FloatingMenuProps {
  children: React.ReactNode;
}

function FloatingMenu({ children }: FloatingMenuProps) {
  return (
    <motion.div
      className="absolute top-0 left-0 size-full z-999 backdrop-blur-md"
      initial={{ left: "-100%" }}
      animate={{ left: 0 }}
      exit={{ left: "-100%" }}
    >
      <div className="wrapper size-full">{children}</div>
    </motion.div>
  );
}

export default FloatingMenu;
