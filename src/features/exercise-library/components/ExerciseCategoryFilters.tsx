import { cn } from "@/shared/utils/cn";

import type { ExerciseCategoryFilter } from "../types";

interface ExerciseCategoryFiltersProps {
  categories: readonly ExerciseCategoryFilter[];
  onCategoryChange: (category: ExerciseCategoryFilter) => void;
  selectedCategory: ExerciseCategoryFilter;
}

export function ExerciseCategoryFilters({
  categories,
  onCategoryChange,
  selectedCategory,
}: ExerciseCategoryFiltersProps) {
  return (
    <div className="mb-12 flex flex-wrap justify-center gap-2">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onCategoryChange(category)}
          className={cn(
            "rounded-sm border px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all",
            selectedCategory === category
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-card text-muted-foreground hover:border-primary/40",
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
