import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, X } from "lucide-react";
import { useEffect, useId } from "react";

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
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
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-sm border border-border bg-card"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-border bg-card p-6">
          <div>
            <h2 id={titleId} className="font-display text-2xl font-bold text-foreground">
              {exercise.name}
            </h2>
            <div className="mt-1 flex items-center gap-3">
              <span className="rounded-sm bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                {exercise.category}
              </span>
              <span className="text-xs text-muted-foreground">
                {exercise.primaryMuscles}
              </span>
            </div>
          </div>

          <button
            type="button"
            aria-label="Close exercise details"
            onClick={onClose}
            className="rounded-sm p-2 transition-colors hover:bg-muted"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        <div className="space-y-6 p-6">
          <div className="aspect-video overflow-hidden rounded-sm border border-border bg-muted">
            <img
              src={exercise.demoUrl}
              alt={`${exercise.name} demonstration`}
              className="h-full w-full object-cover"
            />
          </div>

          <p className="leading-relaxed text-muted-foreground">
            {exercise.description}
          </p>

          <div>
            <h3 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold text-foreground">
              <CheckCircle className="h-5 w-5 text-primary" />
              Form Tips
            </h3>
            <ul className="space-y-2">
              {exercise.tips.map((tip) => (
                <li
                  key={tip}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold text-foreground">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Common Mistakes
            </h3>
            <ul className="space-y-2">
              {exercise.commonMistakes.map((mistake) => (
                <li
                  key={mistake}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                  {mistake}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
