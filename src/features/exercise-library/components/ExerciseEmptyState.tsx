import { Button } from "@/shared/components/ui/Button";

interface ExerciseEmptyStateProps {
  onReset: () => void;
}

export function ExerciseEmptyState({ onReset }: ExerciseEmptyStateProps) {
  return (
    <div className="rounded-sm border border-dashed border-border bg-card/60 px-6 py-16 text-center">
      <h2 className="font-display text-2xl font-semibold text-foreground">
        No exercises found
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
        Try a different search term or reset the active filters to browse the
        full library again.
      </p>
      <Button variant="outline" onClick={onReset} className="mt-6">
        Reset filters
      </Button>
    </div>
  );
}
