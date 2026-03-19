import type { Exercise, ExerciseCategoryFilter } from "../types";

interface ExerciseFilters {
  category: ExerciseCategoryFilter;
  query: string;
}

function normalizeValue(value: string) {
  return value.trim().toLowerCase();
}

export function filterExercises(
  exerciseList: Exercise[],
  { category, query }: ExerciseFilters,
) {
  const normalizedQuery = normalizeValue(query);

  return exerciseList.filter((exercise) => {
    const matchesCategory =
      category === "All" || exercise.category === category;

    if (!matchesCategory) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const searchableText = [
      exercise.name,
      exercise.primaryMuscles,
      exercise.description,
      exercise.category,
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}
