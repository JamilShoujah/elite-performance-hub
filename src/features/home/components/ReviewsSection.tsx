import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/shared/utils/cn";

import { reviews } from "../content";
import { SectionHeading } from "./SectionHeading";

const reviewTransition = {
  duration: 1.35,
  ease: [0.45, 0, 0.55, 1] as const,
};

function getWrappedReviewIndex(index: number) {
  return (index + reviews.length) % reviews.length;
}

function getReviewDirection(currentIndex: number, nextIndex: number) {
  const forwardDistance = (nextIndex - currentIndex + reviews.length) % reviews.length;
  const backwardDistance = (currentIndex - nextIndex + reviews.length) % reviews.length;

  return forwardDistance <= backwardDistance ? 1 : -1;
}

export function ReviewsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const showReview = (requestedIndex: number) => {
    const nextIndex = getWrappedReviewIndex(requestedIndex);

    if (nextIndex === activeIndex) {
      return;
    }

    setDirection(getReviewDirection(activeIndex, nextIndex));
    setActiveIndex(nextIndex);
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((currentIndex) => getWrappedReviewIndex(currentIndex + 1));
    }, 5000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const activeReview = reviews[activeIndex];

  const goToNext = () => {
    showReview(activeIndex + 1);
  };

  const goToPrevious = () => {
    showReview(activeIndex - 1);
  };

  return (
    <section id="reviews" className="bg-muted py-24">
      <div className="container mx-auto px-6">
        <SectionHeading title="Results Speak." />

        <div className="relative mx-auto max-w-3xl">
          <button
            type="button"
            aria-label="Show previous review"
            onClick={goToPrevious}
            className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card transition-colors hover:border-primary/40 md:left-0 md:-translate-x-14"
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>

          <button
            type="button"
            aria-label="Show next review"
            onClick={goToNext}
            className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card transition-colors hover:border-primary/40 md:right-0 md:translate-x-14"
          >
            <ChevronRight className="h-5 w-5 text-foreground" />
          </button>

          <div className="relative min-h-[320px] sm:min-h-[280px]">
            <AnimatePresence initial={false} mode="sync" custom={direction}>
              <motion.div
                key={`${activeReview.name}-${activeIndex}`}
                custom={direction}
                className="absolute inset-0 rounded-sm border border-border bg-card p-8 text-center md:p-12"
                initial={(currentDirection) => ({
                  opacity: 0,
                  x: currentDirection > 0 ? 16 : -16,
                  scale: 0.996,
                })}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  transition: reviewTransition,
                }}
                exit={(currentDirection) => ({
                  opacity: 0,
                  x: currentDirection > 0 ? -16 : 16,
                  scale: 0.996,
                  transition: reviewTransition,
                })}
              >
                <div className="mb-6 flex justify-center gap-1">
                  {Array.from({ length: activeReview.rating }).map((_, starIndex) => (
                    <Star
                      key={`${activeReview.name}-${starIndex}`}
                      className="h-5 w-5 fill-primary text-primary"
                    />
                  ))}
                </div>

                <blockquote className="text-lg font-light italic leading-relaxed text-foreground md:text-xl">
                  "{activeReview.text}"
                </blockquote>

                <p className="mt-6 font-display font-semibold text-foreground">
                  {activeReview.name}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {reviews.map((review, index) => (
              <button
                key={review.name}
                type="button"
                aria-label={`Show review ${index + 1}`}
                onClick={() => showReview(index)}
                className={cn(
                  "h-2.5 w-2.5 rounded-full transition-all",
                  index === activeIndex
                    ? "w-8 bg-primary"
                    : "bg-border hover:bg-muted-foreground",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
