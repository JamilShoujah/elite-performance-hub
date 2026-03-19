import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import { SiteFooter, SiteHeader } from "@/features/site-shell";

import { exerciseCategoryFilters } from "./types";
import { ExerciseCard } from "./components/ExerciseCard";
import { ExerciseCategoryFilters } from "./components/ExerciseCategoryFilters";
import { ExerciseDetailsModal } from "./components/ExerciseDetailsModal";
import { ExerciseEmptyState } from "./components/ExerciseEmptyState";
import { ExerciseSearch } from "./components/ExerciseSearch";
import { useExerciseLibrary } from "./hooks/useExerciseLibrary";

export function ExerciseLibraryPage() {
  const {
    filteredExercises,
    resetFilters,
    searchQuery,
    selectedCategory,
    selectedExercise,
    setSearchQuery,
    setSelectedCategory,
    setSelectedExercise,
  } = useExerciseLibrary();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="pb-24 pt-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h1 className="font-display text-3xl font-bold text-foreground md:text-5xl">
              Performance Exercise Library
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Browse our curated collection of performance-focused exercises.
              Click any exercise for detailed form tips.
            </p>
          </motion.div>

          <ExerciseSearch
            value={searchQuery}
            onSearchChange={setSearchQuery}
          />
          <ExerciseCategoryFilters
            categories={exerciseCategoryFilters}
            onCategoryChange={setSelectedCategory}
            selectedCategory={selectedCategory}
          />

          {filteredExercises.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredExercises.map((exercise, index) => (
                <ExerciseCard
                  key={exercise.name}
                  exercise={exercise}
                  index={index}
                  onSelect={setSelectedExercise}
                />
              ))}
            </div>
          ) : (
            <ExerciseEmptyState onReset={resetFilters} />
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedExercise ? (
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
