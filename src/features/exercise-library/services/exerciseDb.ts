import { mapApiExerciseToExercise, mapCategoryOptions } from "../lib/transformExercise";
import {
  ALL_EXERCISES_CATEGORY,
  EXERCISE_PAGE_SIZE,
  type ExerciseCollectionResult,
  type Exercise,
  type ExerciseApiDetailResponse,
  type ExerciseApiListResponse,
  type ExerciseCategoryOption,
  type ExerciseTaxonomyResponse,
} from "../types";

const EXERCISE_DB_BASE_URL =
  typeof window === "undefined"
    ? "https://example.com/api/exercisedb/"
    : new URL("/api/exercisedb/", window.location.origin).toString();
const exerciseCategoriesCache = new Map<string, ExerciseCategoryOption[]>();
const exercisesCache = new Map<string, ExerciseCollectionResult>();
const exerciseDetailsCache = new Map<string, Exercise>();

interface FetchExercisesOptions {
  category: string;
  equipment?: string | null;
  limit?: number;
  offset?: number;
  searchQuery?: string;
  signal?: AbortSignal;
}

function createApiUrl(pathname: string) {
  return new URL(pathname, `${EXERCISE_DB_BASE_URL}/`);
}

function buildExercisesUrl({
  category,
  equipment,
  limit = EXERCISE_PAGE_SIZE,
  offset = 0,
  searchQuery = "",
}: FetchExercisesOptions) {
  const trimmedSearchQuery = searchQuery.trim();
  const trimmedEquipment = equipment?.trim() ?? "";
  const hasCategoryFilter = category !== ALL_EXERCISES_CATEGORY;
  const hasEquipmentFilter = trimmedEquipment !== "";

  if (
    (trimmedSearchQuery && (hasCategoryFilter || hasEquipmentFilter)) ||
    (hasCategoryFilter && hasEquipmentFilter)
  ) {
    const url = createApiUrl("exercises/filter");
    if (trimmedSearchQuery) {
      url.searchParams.set("search", trimmedSearchQuery);
    }
    if (hasCategoryFilter) {
      url.searchParams.set("bodyParts", category);
    }
    if (hasEquipmentFilter) {
      url.searchParams.set("equipment", trimmedEquipment);
    }
    url.searchParams.set("limit", String(limit));
    url.searchParams.set("offset", String(offset));
    url.searchParams.set("sortBy", "name");
    url.searchParams.set("sortOrder", "asc");
    return url;
  }

  if (trimmedSearchQuery) {
    const url = createApiUrl("exercises/search");
    url.searchParams.set("q", trimmedSearchQuery);
    url.searchParams.set("limit", String(limit));
    url.searchParams.set("offset", String(offset));
    return url;
  }

  if (hasEquipmentFilter) {
    const url = createApiUrl(
      `equipments/${encodeURIComponent(trimmedEquipment)}/exercises`,
    );
    url.searchParams.set("limit", String(limit));
    url.searchParams.set("offset", String(offset));
    return url;
  }

  if (hasCategoryFilter) {
    const url = createApiUrl(`bodyparts/${encodeURIComponent(category)}/exercises`);
    url.searchParams.set("limit", String(limit));
    url.searchParams.set("offset", String(offset));
    return url;
  }

  const url = createApiUrl("exercises");
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("offset", String(offset));
  url.searchParams.set("sortBy", "name");
  url.searchParams.set("sortOrder", "asc");
  return url;
}

async function parseJsonResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`ExerciseDB request failed with status ${response.status}.`);
  }

  return response.json() as Promise<T>;
}

export async function fetchExerciseCategories(
  signal?: AbortSignal,
): Promise<ExerciseCategoryOption[]> {
  const requestUrl = createApiUrl("bodyparts");
  const cacheKey = requestUrl.toString();
  const cachedCategories = exerciseCategoriesCache.get(cacheKey);

  if (cachedCategories) {
    return cachedCategories;
  }

  const response = await fetch(requestUrl, { signal });
  const payload = await parseJsonResponse<ExerciseTaxonomyResponse>(response);

  if (!payload.success) {
    throw new Error("ExerciseDB categories request was not successful.");
  }

  const categories = mapCategoryOptions(payload.data.map((bodyPart) => bodyPart.name));
  exerciseCategoriesCache.set(cacheKey, categories);
  return categories;
}

export async function fetchExercises({
  category,
  equipment,
  limit = EXERCISE_PAGE_SIZE,
  offset = 0,
  searchQuery = "",
  signal,
}: FetchExercisesOptions): Promise<ExerciseCollectionResult> {
  const requestUrl = buildExercisesUrl({
    category,
    equipment,
    limit,
    offset,
    searchQuery,
  });
  const cacheKey = requestUrl.toString();
  const cachedExercises = exercisesCache.get(cacheKey);

  if (cachedExercises) {
    return cachedExercises;
  }

  const response = await fetch(requestUrl, { signal });
  const payload = await parseJsonResponse<ExerciseApiListResponse>(response);

  if (!payload.success) {
    throw new Error("ExerciseDB exercises request was not successful.");
  }

  const result = {
    exercises: payload.data.map(mapApiExerciseToExercise),
    hasMore: Boolean(payload.metadata?.nextPage),
    totalExercises: payload.metadata?.totalExercises ?? payload.data.length,
  };

  exercisesCache.set(cacheKey, result);
  return result;
}

export async function fetchExerciseById(
  exerciseId: string,
  signal?: AbortSignal,
): Promise<Exercise> {
  const trimmedExerciseId = exerciseId.trim();

  if (!trimmedExerciseId) {
    throw new Error("Exercise id is required.");
  }

  const requestUrl = createApiUrl(`exercises/${encodeURIComponent(trimmedExerciseId)}`);
  const cacheKey = requestUrl.toString();
  const cachedExercise = exerciseDetailsCache.get(cacheKey);

  if (cachedExercise) {
    return cachedExercise;
  }

  const response = await fetch(requestUrl, { signal });
  const payload = await parseJsonResponse<ExerciseApiDetailResponse>(response);

  if (!payload.success) {
    throw new Error("ExerciseDB exercise details request was not successful.");
  }

  const exercise = mapApiExerciseToExercise(payload.data);
  exerciseDetailsCache.set(cacheKey, exercise);
  return exercise;
}
