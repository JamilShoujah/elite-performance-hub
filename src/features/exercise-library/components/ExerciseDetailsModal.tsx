import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useId } from "react";

import { ExerciseDetailsContent } from "./ExerciseDetailsContent";
import type { Exercise } from "../types";

interface ExerciseDetailsModalProps {
  exercise: Exercise;
  onClose: () => void;
}

export function ExerciseDetailsModal({
  exercise,
  onClose,
}: ExerciseDetailsModalProps) {
  const titleId = useId();

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-secondary/72 px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-[calc(env(safe-area-inset-top)+0.75rem)] backdrop-blur-[6px] sm:items-center sm:p-4"
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="flex h-full w-full max-w-5xl flex-col overflow-hidden rounded-sm border border-border/80 bg-background shadow-[var(--shadow-elevated)] sm:h-auto sm:max-h-[92dvh]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border/80 bg-background/95 px-4 py-4 backdrop-blur sm:px-6 sm:py-5">
          <div className="min-w-0">
            <h2
              id={titleId}
              className="font-display text-2xl font-bold text-foreground sm:text-3xl"
            >
              {exercise.name}
            </h2>
          </div>

          <button
            type="button"
            aria-label="Close exercise details"
            onClick={onClose}
            className="shrink-0 rounded-sm p-2 transition-colors hover:bg-muted"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <ExerciseDetailsContent exercise={exercise} />
        </div>
      </motion.div>
    </motion.div>
  );
}
