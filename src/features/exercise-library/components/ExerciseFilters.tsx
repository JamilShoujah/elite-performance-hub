import { cn } from "@/shared/utils/cn";

import {
  BODY_WEIGHT_EQUIPMENT,
  type ExerciseCategoryOption,
} from "../types";

interface ExerciseFiltersProps {
  categories: readonly ExerciseCategoryOption[];
  hasActiveFilters: boolean;
  onCategoryChange: (category: string) => void;
  onReset: () => void;
  onSelectedEquipmentChange: (equipment: string | null) => void;
  selectedCategory: string;
  selectedEquipment: string | null;
}

export function ExerciseFilters({
  categories,
  hasActiveFilters,
  onCategoryChange,
  onReset,
  onSelectedEquipmentChange,
  selectedCategory,
  selectedEquipment,
}: ExerciseFiltersProps) {
  const equipmentButtonClassName = (isActive: boolean) =>
    cn(
      "rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] transition-all",
      isActive
        ? "border-primary bg-primary text-primary-foreground"
        : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground",
    );

  return (
    <div className="mb-10 rounded-sm border border-border bg-card/60 p-4 sm:p-5">
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
              Filter Exercises
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Explore by body part or switch to bodyweight-only movements.
            </p>
          </div>

          {hasActiveFilters ? (
            <button
              type="button"
              onClick={onReset}
              className="shrink-0 text-[11px] font-medium uppercase tracking-[0.2em] text-primary transition-opacity hover:opacity-80"
            >
              Reset
            </button>
          ) : null}
        </div>

        <div className="space-y-4 sm:hidden">
          <div className="space-y-2">
            <label
              htmlFor="exercise-body-part-filter"
              className="block text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground"
            >
              Body Part
            </label>
            <select
              id="exercise-body-part-filter"
              value={selectedCategory}
              onChange={(event) => onCategoryChange(event.target.value)}
              className="w-full rounded-sm border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors focus:border-primary md:text-sm"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
              Equipment
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onSelectedEquipmentChange(null)}
                className={equipmentButtonClassName(selectedEquipment === null)}
              >
                All
              </button>
              <button
                type="button"
                onClick={() =>
                  onSelectedEquipmentChange(
                    selectedEquipment === BODY_WEIGHT_EQUIPMENT
                      ? null
                      : BODY_WEIGHT_EQUIPMENT,
                  )
                }
                className={equipmentButtonClassName(
                  selectedEquipment === BODY_WEIGHT_EQUIPMENT,
                )}
              >
                Bodyweight
              </button>
            </div>
          </div>
        </div>

        <div className="hidden gap-4 sm:grid lg:grid-cols-[minmax(0,1fr)_240px] lg:items-start">
          <div>
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
              Body Part
            </p>
            <div className="-mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
              <div className="flex min-w-max gap-2 sm:min-w-0 sm:flex-wrap">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    type="button"
                    onClick={() => onCategoryChange(category.value)}
                    className={cn(
                      "whitespace-nowrap",
                      equipmentButtonClassName(
                        selectedCategory === category.value,
                      ),
                    )}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
              Equipment
            </p>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
              <button
                type="button"
                onClick={() => onSelectedEquipmentChange(null)}
                className={equipmentButtonClassName(selectedEquipment === null)}
              >
                All Equipment
              </button>
              <button
                type="button"
                onClick={() =>
                  onSelectedEquipmentChange(
                    selectedEquipment === BODY_WEIGHT_EQUIPMENT
                      ? null
                      : BODY_WEIGHT_EQUIPMENT,
                  )
                }
                className={equipmentButtonClassName(
                  selectedEquipment === BODY_WEIGHT_EQUIPMENT,
                )}
              >
                Bodyweight Only
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
