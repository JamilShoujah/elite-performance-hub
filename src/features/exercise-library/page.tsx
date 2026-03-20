import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { SiteFooter, SiteHeader } from "@/features/site-shell";
import { Button } from "@/shared/components/ui/Button";

import { ExerciseCard } from "./components/ExerciseCard";
import { ExerciseDetailsModal } from "./components/ExerciseDetailsModal";
import { ExerciseEmptyState } from "./components/ExerciseEmptyState";
import { ExerciseFilters } from "./components/ExerciseFilters";
import { ExerciseSearch } from "./components/ExerciseSearch";
import { useExerciseLibrary } from "./hooks/useExerciseLibrary";
import {
  ALL_EXERCISES_CATEGORY,
  BODY_WEIGHT_EQUIPMENT,
  type Exercise,
} from "./types";

export function ExerciseLibraryPage() {
  const navigate = useNavigate();
  const [opensDetailsAsPage, setOpensDetailsAsPage] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 767px)").matches
      : false,
  );
  const {
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
  } = useExerciseLibrary();

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const syncDetailsViewMode = (event: MediaQueryList | MediaQueryListEvent) => {
      setOpensDetailsAsPage(event.matches);
    };

    syncDetailsViewMode(mediaQuery);

    mediaQuery.addEventListener("change", syncDetailsViewMode);

    return () => {
      mediaQuery.removeEventListener("change", syncDetailsViewMode);
    };
  }, []);

  useEffect(() => {
    if (!opensDetailsAsPage || !selectedExercise) {
      return;
    }

    navigate(`/exercises/${selectedExercise.id}`, {
      state: { exercise: selectedExercise },
    });
    setSelectedExercise(null);
  }, [navigate, opensDetailsAsPage, selectedExercise, setSelectedExercise]);

  const handleSelectExercise = (exercise: Exercise) => {
    if (opensDetailsAsPage) {
      navigate(`/exercises/${exercise.id}`, { state: { exercise } });
      return;
    }

    setSelectedExercise(exercise);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="pb-24 pt-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h1 className="font-display text-3xl font-bold text-foreground md:text-5xl">
              Performance Exercise Library
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Browse live exercise data powered by ExerciseDB. Search by name or
              filter by body part, then switch to bodyweight-only exercises when
              you want zero-machinery movements.
            </p>
          </motion.div>

          <ExerciseSearch
            value={searchQuery}
            onSearchChange={setSearchQuery}
          />
          <ExerciseFilters
            categories={categories}
            hasActiveFilters={
              searchQuery.trim() !== "" ||
              selectedCategory !== ALL_EXERCISES_CATEGORY ||
              selectedEquipment !== null
            }
            onCategoryChange={setSelectedCategory}
            onReset={resetFilters}
            onSelectedEquipmentChange={setSelectedEquipment}
            selectedCategory={selectedCategory}
            selectedEquipment={selectedEquipment}
          />

          <div className="mb-6 text-center text-sm text-muted-foreground">
            {isLoading && exercises.length === 0
              ? "Loading live exercises..."
              : isRefreshing
                ? "Updating live exercises..."
              : `Showing ${exercises.length} of ${totalExercises} ${
                  selectedEquipment === BODY_WEIGHT_EQUIPMENT
                    ? "bodyweight exercises"
                    : "exercises"
                }`}
          </div>

          {error && exercises.length > 0 ? (
            <p className="mb-6 text-center text-sm text-destructive">{error}</p>
          ) : null}

          {error && exercises.length === 0 ? (
            <ExerciseEmptyState
              title="Live exercise library unavailable"
              description={error}
              actionLabel="Try again"
              onAction={retryExercises}
            />
          ) : isLoading && exercises.length === 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={`exercise-skeleton-${index}`}
                  className="h-[220px] animate-pulse rounded-sm border border-border bg-card/60"
                />
              ))}
            </div>
          ) : exercises.length > 0 ? (
            <>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {exercises.map((exercise, index) => (
                  <ExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    index={index}
                    onSelect={handleSelectExercise}
                  />
                ))}
              </div>

              {hasMore ? (
                <div className="mt-10 flex flex-col items-center gap-3">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={loadMoreExercises}
                    disabled={isLoadingMore}
                  >
                    {isLoadingMore ? "Loading more..." : "Load more exercises"}
                  </Button>

                  {loadMoreError ? (
                    <p className="text-sm text-destructive">{loadMoreError}</p>
                  ) : null}
                </div>
              ) : null}
            </>
          ) : (
            <ExerciseEmptyState onAction={resetFilters} />
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedExercise && !opensDetailsAsPage ? (
          <ExerciseDetailsModal
            exercise={selectedExercise}
            onClose={() => setSelectedExercise(null)}
          />
        ) : null}
      </AnimatePresence>

      <SiteFooter />
    </div>
  );
}
