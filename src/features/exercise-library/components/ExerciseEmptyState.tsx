import { Button } from "@/shared/components/ui/Button";

interface ExerciseEmptyStateProps {
  actionLabel?: string;
  description?: string;
  onAction: () => void;
  title?: string;
}

export function ExerciseEmptyState({
  actionLabel = "Reset filters",
  description = "Try a different search term or reset the active filters to browse the full library again.",
  onAction,
  title = "No exercises found",
}: ExerciseEmptyStateProps) {
  return (
    <div className="rounded-sm border border-dashed border-border bg-card/60 px-6 py-16 text-center">
      <h2 className="font-display text-2xl font-semibold text-foreground">
        {title}
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      <Button variant="outline" onClick={onAction} className="mt-6">
        {actionLabel}
      </Button>
    </div>
  );
}
