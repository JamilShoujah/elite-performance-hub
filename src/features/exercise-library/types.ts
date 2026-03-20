export const ALL_EXERCISES_CATEGORY = "All";
export const BODY_WEIGHT_EQUIPMENT = "body weight";
export const EXERCISE_PAGE_SIZE = 24;

export interface Exercise {
  bodyParts: string[];
  category: string;
  equipment: string[];
  gifUrl: string;
  id: string;
  instructions: string[];
  name: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
}

export interface ExerciseCategoryOption {
  label: string;
  value: string;
}

export interface ExerciseApiItem {
  bodyParts: string[];
  equipments: string[];
  exerciseId: string;
  gifUrl: string;
  instructions: string[];
  name: string;
  secondaryMuscles: string[];
  targetMuscles: string[];
}

interface ExerciseApiMetadata {
  currentPage: number;
  nextPage: string | null;
  previousPage: string | null;
  totalExercises: number;
  totalPages: number;
}

export interface ExerciseApiListResponse {
  data: ExerciseApiItem[];
  metadata?: ExerciseApiMetadata;
  success: boolean;
}

export interface ExerciseApiDetailResponse {
  data: ExerciseApiItem;
  success: boolean;
}

export interface ExerciseTaxonomyResponse {
  data: Array<{ name: string }>;
  success: boolean;
}

export interface ExerciseCollectionResult {
  exercises: Exercise[];
  hasMore: boolean;
  totalExercises: number;
}
