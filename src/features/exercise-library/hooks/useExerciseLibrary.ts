import {
  startTransition,
  useDeferredValue,
  useEffect,
  useState,
} from "react";

import { fetchExerciseCategories, fetchExercises } from "../services/exerciseDb";
import {
  ALL_EXERCISES_CATEGORY,
  EXERCISE_PAGE_SIZE,
  type Exercise,
  type ExerciseCategoryOption,
} from "../types";

export function useExerciseLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const [selectedCategory, setSelectedCategory] =
    useState(ALL_EXERCISES_CATEGORY);
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(
    null,
  );
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null,
  );
  const [categories, setCategories] = useState<ExerciseCategoryOption[]>([
    { label: ALL_EXERCISES_CATEGORY, value: ALL_EXERCISES_CATEGORY },
  ]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loadMoreError, setLoadMoreError] = useState<string | null>(null);
  const [requestVersion, setRequestVersion] = useState(0);
  const [totalExercises, setTotalExercises] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    void fetchExerciseCategories(controller.signal)
      .then((nextCategories) => {
        startTransition(() => {
          setCategories(nextCategories);
        });
      })
      .catch((fetchError) => {
        if ((fetchError as DOMException).name === "AbortError") {
          return;
        }
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    setSelectedExercise(null);
    setError(null);
    setLoadMoreError(null);
    setIsLoading(true);

    void fetchExercises({
      category: selectedCategory,
      equipment: selectedEquipment,
      limit: EXERCISE_PAGE_SIZE,
      offset: 0,
      searchQuery: deferredSearchQuery,
      signal: controller.signal,
    })
      .then((result) => {
        startTransition(() => {
          setExercises(result.exercises);
          setHasMore(result.hasMore);
          setTotalExercises(result.totalExercises);
        });
      })
      .catch((fetchError) => {
        if ((fetchError as DOMException).name === "AbortError") {
          return;
        }

        setExercises([]);
        setHasMore(false);
        setTotalExercises(0);
        setError(
          "We couldn't load the live exercise library right now. Please try again.",
        );
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, [deferredSearchQuery, requestVersion, selectedCategory, selectedEquipment]);

  const loadMoreExercises = async () => {
    setLoadMoreError(null);
    setIsLoadingMore(true);

    try {
      const result = await fetchExercises({
        category: selectedCategory,
        equipment: selectedEquipment,
        limit: EXERCISE_PAGE_SIZE,
        offset: exercises.length,
        searchQuery: deferredSearchQuery,
      });

      startTransition(() => {
        setExercises((currentExercises) => [
          ...currentExercises,
          ...result.exercises,
        ]);
        setHasMore(result.hasMore);
        setTotalExercises(result.totalExercises);
      });
    } catch {
      setLoadMoreError(
        "We couldn't load more exercises right now. Please try again in a moment.",
      );
    } finally {
      setIsLoadingMore(false);
    }
  };

  const retryExercises = () => {
    setRequestVersion((currentVersion) => currentVersion + 1);
  };

  const resetFilters = () => {
    setError(null);
    setLoadMoreError(null);
    setSearchQuery("");
    setSelectedCategory(ALL_EXERCISES_CATEGORY);
    setSelectedEquipment(null);

    if (
      searchQuery.trim() === "" &&
      selectedCategory === ALL_EXERCISES_CATEGORY &&
      selectedEquipment === null
    ) {
      retryExercises();
    }
  };

  return {
    categories,
    error,
    exercises,
    hasMore,
    isLoading,
    isLoadingMore,
    loadMoreError,
    loadMoreExercises,
    resetFilters,
    retryExercises,
    searchQuery,
    selectedCategory,
    selectedEquipment,
    selectedExercise,
    totalExercises,
    setSearchQuery,
    setSelectedCategory,
    setSelectedEquipment,
    setSelectedExercise,
  };
}
