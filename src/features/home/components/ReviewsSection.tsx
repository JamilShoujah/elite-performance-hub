import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/shared/utils/cn";

import { reviews } from "../content";
import { SectionHeading } from "./SectionHeading";

export function ReviewsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) =>
        currentIndex === reviews.length - 1 ? 0 : currentIndex + 1,
      );
    }, 5000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const activeReview = reviews[activeIndex];

  const goToNext = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === reviews.length - 1 ? 0 : currentIndex + 1,
    );
  };

  const goToPrevious = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? reviews.length - 1 : currentIndex - 1,
    );
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
            className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card transition-colors hover:border-primary/40 md:-translate-x-14"
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>

          <button
            type="button"
            aria-label="Show next review"
            onClick={goToNext}
            className="absolute right-0 top-1/2 z-10 flex h-10 w-10 translate-x-4 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card transition-colors hover:border-primary/40 md:translate-x-14"
          >
            <ChevronRight className="h-5 w-5 text-foreground" />
          </button>

          <motion.div
            key={activeReview.name}
            className="rounded-sm border border-border bg-card p-8 text-center md:p-12"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
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

          <div className="mt-8 flex justify-center gap-2">
            {reviews.map((review, index) => (
              <button
                key={review.name}
                type="button"
                aria-label={`Show review ${index + 1}`}
                onClick={() => setActiveIndex(index)}
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
