import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { SiteFooter, SiteHeader } from "@/features/site-shell";
import { Button } from "@/shared/components/ui/Button";

import { ExerciseDetailsContent } from "./components/ExerciseDetailsContent";
import { ExerciseEmptyState } from "./components/ExerciseEmptyState";
import { fetchExerciseById } from "./services/exerciseDb";
import type { Exercise } from "./types";

interface ExerciseDetailsLocationState {
  exercise?: Exercise;
}

export function ExerciseDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { exerciseId = "" } = useParams();
  const locationState = location.state as ExerciseDetailsLocationState | null;
  const [exercise, setExercise] = useState<Exercise | null>(
    locationState?.exercise?.id === exerciseId ? locationState.exercise : null,
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(exercise === null);
  const [requestVersion, setRequestVersion] = useState(0);

  useEffect(() => {
    if (!exerciseId) {
      setExercise(null);
      setError("We couldn't find this exercise.");
      setIsLoading(false);
      return;
    }

    if (locationState?.exercise?.id === exerciseId && requestVersion === 0) {
      setExercise(locationState.exercise);
      setError(null);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    setIsLoading(true);
    setError(null);

    void fetchExerciseById(exerciseId, controller.signal)
      .then((nextExercise) => {
        setExercise(nextExercise);
      })
      .catch((fetchError) => {
        if ((fetchError as DOMException).name === "AbortError") {
          return;
        }

        setExercise(null);
        setError(
          "We couldn't load this exercise right now. Please try again in a moment.",
        );
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, [exerciseId, locationState?.exercise, requestVersion]);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/exercises");
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="pb-24 pt-[calc(7rem+env(safe-area-inset-top))] sm:pt-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="sticky top-[calc(env(safe-area-inset-top)+5.5rem)] z-30 mb-6 rounded-sm border border-border/80 bg-background/95 p-2 shadow-[var(--shadow-card)] backdrop-blur md:static md:top-auto md:border-0 md:bg-transparent md:p-0 md:shadow-none">
            <Button
              type="button"
              variant="ghost"
              onClick={handleBack}
              className="w-full justify-start text-sm font-medium text-muted-foreground hover:bg-transparent hover:text-primary md:w-auto md:px-0"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Exercise Library
            </Button>
          </div>

          {error ? (
            <ExerciseEmptyState
              title="Exercise unavailable"
              description={error}
              actionLabel="Try again"
              onAction={() =>
                setRequestVersion((currentVersion) => currentVersion + 1)
              }
            />
          ) : isLoading || !exercise ? (
            <div className="rounded-sm border border-border bg-card/60 p-6 shadow-[var(--shadow-card)]">
              <div className="mb-6 h-8 w-2/3 animate-pulse rounded-sm bg-muted" />
              <div className="grid gap-6 lg:grid-cols-[320px,minmax(0,1fr)]">
                <div className="aspect-[4/5] animate-pulse rounded-sm bg-muted/70" />
                <div className="space-y-4">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={`exercise-detail-skeleton-${index}`}
                      className="h-4 animate-pulse rounded-sm bg-muted/70"
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="overflow-hidden rounded-sm border border-border/80 bg-card shadow-[var(--shadow-elevated)]">
              <div className="border-b border-border/80 bg-background/95 px-4 py-4 backdrop-blur sm:px-6 sm:py-5">
                <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                  {exercise.name}
                </h1>
              </div>

              <ExerciseDetailsContent exercise={exercise} />
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
