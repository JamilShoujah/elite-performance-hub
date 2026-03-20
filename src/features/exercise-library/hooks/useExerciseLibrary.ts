import {
  startTransition,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from "react";

import { fetchExerciseCategories, fetchExercises } from "../services/exerciseDb";
import {
  ALL_EXERCISES_CATEGORY,
  EXERCISE_PAGE_SIZE,
  type Exercise,
  type ExerciseCategoryOption,
} from "../types";

const FILTER_REQUEST_DEBOUNCE_MS = 200;

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
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loadMoreError, setLoadMoreError] = useState<string | null>(null);
  const [requestVersion, setRequestVersion] = useState(0);
  const [totalExercises, setTotalExercises] = useState(0);
  const latestRequestIdRef = useRef(0);
  const hasVisibleExercisesRef = useRef(false);

  useEffect(() => {
    hasVisibleExercisesRef.current = exercises.length > 0;
  }, [exercises.length]);

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
    const currentRequestId = latestRequestIdRef.current + 1;
    latestRequestIdRef.current = currentRequestId;

    const timeoutId = window.setTimeout(() => {
      setSelectedExercise(null);
      setError(null);
      setLoadMoreError(null);

      if (hasVisibleExercisesRef.current) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      void fetchExercises({
        category: selectedCategory,
        equipment: selectedEquipment,
        limit: EXERCISE_PAGE_SIZE,
        offset: 0,
        searchQuery: deferredSearchQuery,
        signal: controller.signal,
      })
        .then((result) => {
          if (
            controller.signal.aborted ||
            currentRequestId !== latestRequestIdRef.current
          ) {
            return;
          }

          startTransition(() => {
            setExercises(result.exercises);
            setHasMore(result.hasMore);
            setTotalExercises(result.totalExercises);
          });
        })
        .catch((fetchError) => {
          if (
            (fetchError as DOMException).name === "AbortError" ||
            currentRequestId !== latestRequestIdRef.current
          ) {
            return;
          }

          if (!hasVisibleExercisesRef.current) {
            setExercises([]);
            setHasMore(false);
            setTotalExercises(0);
          }

          setError(
            "We couldn't refresh the live exercise library right now. Please try again.",
          );
        })
        .finally(() => {
          if (
            !controller.signal.aborted &&
            currentRequestId === latestRequestIdRef.current
          ) {
            setIsLoading(false);
            setIsRefreshing(false);
          }
        });
    }, FILTER_REQUEST_DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
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
    isRefreshing,
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
