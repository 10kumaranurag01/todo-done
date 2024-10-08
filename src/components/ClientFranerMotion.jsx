"use client";

import { motion } from "framer-motion";

const MotionDiv = ({ children, transition, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
      transition={transition}
    >
      {children}
    </motion.div>
  );
};

export { MotionDiv, motion };
