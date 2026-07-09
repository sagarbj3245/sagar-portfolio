"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

// Cycles through words with a small fade/slide. Static (first word) under reduced motion.
export function RotatingText({
  words,
  className,
  interval = 2200,
}: {
  words: string[];
  className?: string;
  interval?: number;
}) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [reduce, words.length, interval]);

  if (reduce) return <span className={className}>{words[0]}</span>;

  return (
    <span className="relative inline-block">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[i]}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className={`inline-block ${className ?? ""}`}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
