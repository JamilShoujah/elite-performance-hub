import { motion } from "framer-motion";

import type { Exercise } from "../types";

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
  onSelect: (exercise: Exercise) => void;
}

export function ExerciseCard({
  exercise,
  index,
  onSelect,
}: ExerciseCardProps) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      onClick={() => onSelect(exercise)}
      className="group rounded-sm border border-border bg-card p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-card-hover)]"
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className="font-display text-lg font-semibold text-foreground">
          {exercise.name}
        </h3>
        <span className="shrink-0 rounded-sm bg-muted px-2 py-1 text-xs text-muted-foreground">
          {exercise.category}
        </span>
      </div>

      <p className="mb-2 text-xs font-medium text-primary">
        {exercise.primaryMuscles}
      </p>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {exercise.description}
      </p>
      <p className="mt-3 text-xs text-primary/70 transition-colors group-hover:text-primary">
        Click for details →
      </p>
    </motion.button>
  );
}
