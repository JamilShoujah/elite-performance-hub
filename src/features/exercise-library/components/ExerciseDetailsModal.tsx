import { motion } from "framer-motion";
import {
  Activity,
  Dumbbell,
  ListOrdered,
  Target,
  X,
  type LucideIcon,
} from "lucide-react";
import { type ReactNode, useEffect, useId } from "react";

import type { Exercise } from "../types";

interface ExerciseDetailsModalProps {
  exercise: Exercise;
  onClose: () => void;
}

interface ExerciseDetailItemProps {
  children?: ReactNode;
  icon: LucideIcon;
  label: string;
  value?: string;
}

function ExerciseDetailItem({
  children,
  icon: Icon,
  label,
  value,
}: ExerciseDetailItemProps) {
  return (
    <div className="space-y-2">
      <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
        <Icon className="h-4 w-4 text-primary" />
        {label}
      </p>
      {children ?? (
        <p className="text-sm leading-relaxed text-foreground">{value}</p>
      )}
    </div>
  );
}

interface ExerciseTagListProps {
  compact?: boolean;
  items: string[];
  tone?: "outline" | "solid";
}

function ExerciseTagList({
  compact = false,
  items,
  tone = "outline",
}: ExerciseTagListProps) {
  return (
    <div className="flex flex-wrap gap-1.5 sm:gap-2">
      {items.map((item) => (
        <span
          key={item}
          className={
            tone === "solid"
              ? compact
                ? "rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary"
                : "rounded-full bg-primary/10 px-2.5 py-1.5 text-[11px] font-medium text-primary sm:px-3 sm:text-xs"
              : compact
                ? "rounded-full border border-primary/15 bg-primary/8 px-2.5 py-1 text-[11px] font-medium text-foreground"
                : "rounded-full border border-primary/15 bg-primary/8 px-2.5 py-1.5 text-[11px] font-medium text-foreground sm:px-3 sm:text-xs"
          }
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function formatInstructionText(instruction: string) {
  return instruction.replace(/^step\s*:?\s*\d+\s*/i, "").trim();
}

export function ExerciseDetailsModal({
  exercise,
  onClose,
}: ExerciseDetailsModalProps) {
  const titleId = useId();
  const equipmentItems =
    exercise.equipment.length > 0 ? exercise.equipment : ["Bodyweight"];

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
      className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/45 p-3 backdrop-blur-[6px] sm:items-center sm:p-4"
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
        className="h-[calc(100vh-0.75rem)] w-full max-w-5xl overflow-hidden rounded-sm border border-border/80 bg-background shadow-[var(--shadow-elevated)] sm:h-auto sm:max-h-[92vh]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-border/80 bg-background/95 px-4 py-4 backdrop-blur sm:px-6 sm:py-5">
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

        <div className="max-h-[calc(100vh-5rem)] overflow-y-auto sm:max-h-[calc(92vh-5.5rem)]">
          <div className="space-y-7 p-4 sm:p-6">
            <div className="lg:grid lg:grid-cols-[auto,minmax(0,1fr)] lg:items-center lg:gap-8">
              <div className="flex justify-center lg:justify-start">
                <div className="inline-flex max-w-full items-center justify-center rounded-sm border border-border/70 bg-muted/15 p-2 sm:p-3 lg:max-w-[360px]">
                  <img
                    src={exercise.gifUrl}
                    alt={`${exercise.name} demonstration`}
                    className="block h-auto w-auto max-h-[52vh] max-w-full object-contain sm:max-h-[58vh] lg:max-h-[44vh] xl:max-h-[48vh]"
                    style={{ imageRendering: "auto" }}
                  />
                </div>
              </div>

              <div className="mt-5 space-y-6 border-t border-border/70 pt-5 lg:mt-0 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                <div className="grid grid-cols-2 gap-3 sm:gap-x-8 sm:gap-y-5">
                  <ExerciseDetailItem icon={Activity} label="Body Parts">
                    <ExerciseTagList items={exercise.bodyParts} tone="solid" />
                  </ExerciseDetailItem>
                  <ExerciseDetailItem icon={Dumbbell} label="Equipment">
                    <ExerciseTagList items={equipmentItems} tone="solid" />
                  </ExerciseDetailItem>
                  <ExerciseDetailItem
                    icon={Target}
                    label="Primary Muscles"
                  >
                    <ExerciseTagList items={exercise.primaryMuscles} />
                  </ExerciseDetailItem>
                  {exercise.secondaryMuscles.length > 0 ? (
                    <ExerciseDetailItem
                      icon={Target}
                      label="Secondary Muscles"
                    >
                      <ExerciseTagList items={exercise.secondaryMuscles} />
                    </ExerciseDetailItem>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="border-t border-border/70 pt-6">
              <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                <ListOrdered className="h-5 w-5 text-primary" />
                How To Perform
              </h3>
              <ol className="space-y-3">
                {exercise.instructions.map((instruction, index) => (
                  <li
                    key={instruction}
                    className="grid grid-cols-[auto,1fr] gap-3 border-b border-border/60 pb-3 text-sm text-muted-foreground last:border-b-0 last:pb-0"
                  >
                    <span className="shrink-0 text-sm font-semibold text-primary">
                      {index + 1}:
                    </span>
                    <span className="leading-relaxed">
                      {formatInstructionText(instruction)}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
