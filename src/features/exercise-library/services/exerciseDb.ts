import { mapApiExerciseToExercise, mapCategoryOptions } from "../lib/transformExercise";
import {
  ALL_EXERCISES_CATEGORY,
  EXERCISE_PAGE_SIZE,
  type ExerciseCollectionResult,
  type ExerciseApiListResponse,
  type ExerciseCategoryOption,
  type ExerciseTaxonomyResponse,
} from "../types";

const EXERCISE_DB_BASE_URL = "https://www.exercisedb.dev/api/v1";

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
  const response = await fetch(createApiUrl("bodyparts"), { signal });
  const payload = await parseJsonResponse<ExerciseTaxonomyResponse>(response);

  if (!payload.success) {
    throw new Error("ExerciseDB categories request was not successful.");
  }

  return mapCategoryOptions(payload.data.map((bodyPart) => bodyPart.name));
}

export async function fetchExercises({
  category,
  equipment,
  limit = EXERCISE_PAGE_SIZE,
  offset = 0,
  searchQuery = "",
  signal,
}: FetchExercisesOptions): Promise<ExerciseCollectionResult> {
  const response = await fetch(
    buildExercisesUrl({ category, equipment, limit, offset, searchQuery }),
    { signal },
  );
  const payload = await parseJsonResponse<ExerciseApiListResponse>(response);

  if (!payload.success) {
    throw new Error("ExerciseDB exercises request was not successful.");
  }

  return {
    exercises: payload.data.map(mapApiExerciseToExercise),
    hasMore: Boolean(payload.metadata?.nextPage),
    totalExercises: payload.metadata?.totalExercises ?? payload.data.length,
  };
}
