export const exerciseCategories = [
  "Upper Body",
  "Lower Body",
  "Core",
  "Mobility",
  "Conditioning",
  "Full Body",
] as const;

export const exerciseCategoryFilters = ["All", ...exerciseCategories] as const;

export type ExerciseCategory = (typeof exerciseCategories)[number];
export type ExerciseCategoryFilter = (typeof exerciseCategoryFilters)[number];

export interface Exercise {
  category: ExerciseCategory;
  commonMistakes: string[];
  demoUrl: string;
  description: string;
  name: string;
  primaryMuscles: string;
  tips: string[];
}
