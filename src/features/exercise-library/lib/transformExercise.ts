import {
  ALL_EXERCISES_CATEGORY,
  type Exercise,
  type ExerciseApiItem,
  type ExerciseCategoryOption,
} from "../types";

function formatLabel(value: string) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

function formatLabels(values: string[]) {
  return values.map(formatLabel);
}

export function mapApiExerciseToExercise(exercise: ExerciseApiItem): Exercise {
  const bodyParts = formatLabels(exercise.bodyParts);

  return {
    bodyParts,
    category: bodyParts[0] ?? ALL_EXERCISES_CATEGORY,
    equipment: formatLabels(exercise.equipments),
    gifUrl: exercise.gifUrl,
    id: exercise.exerciseId,
    instructions: exercise.instructions,
    name: exercise.name,
    primaryMuscles: formatLabels(exercise.targetMuscles),
    secondaryMuscles: formatLabels(exercise.secondaryMuscles),
  };
}

export function mapCategoryOptions(bodyPartNames: string[]): ExerciseCategoryOption[] {
  return [
    { label: ALL_EXERCISES_CATEGORY, value: ALL_EXERCISES_CATEGORY },
    ...bodyPartNames
      .map((bodyPartName) => ({
        label: formatLabel(bodyPartName),
        value: bodyPartName,
      }))
      .sort((firstOption, secondOption) =>
        firstOption.label.localeCompare(secondOption.label),
      ),
  ];
}
