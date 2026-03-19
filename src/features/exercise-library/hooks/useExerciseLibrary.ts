import { useMemo, useState } from "react";

import { exercises } from "../data/exercises";
import { filterExercises } from "../lib/filterExercises";
import type { Exercise, ExerciseCategoryFilter } from "../types";

export function useExerciseLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<ExerciseCategoryFilter>("All");
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null,
  );

  const filteredExercises = useMemo(
    () =>
      filterExercises(exercises, {
        category: selectedCategory,
        query: searchQuery,
      }),
    [searchQuery, selectedCategory],
  );

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  return {
    filteredExercises,
    resetFilters,
    searchQuery,
    selectedCategory,
    selectedExercise,
    setSearchQuery,
    setSelectedCategory,
    setSelectedExercise,
  };
}
