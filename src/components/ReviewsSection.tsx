import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const reviews = [
  {
    name: "Omar K.",
    text: "Ahmad's coaching transformed my fitness in 3 months. His structured approach is unlike anything I've experienced.",
    rating: 5,
  },
  {
    name: "Sarah M.",
    text: "I came in overworked and undertrained. Ahmad built a system that fit my schedule and pushed me to results I didn't think were possible.",
    rating: 5,
  },
  {
    name: "Youssef A.",
    text: "As a Hyrox competitor, I needed specialized training. Ahmad's programming took 8 minutes off my race time in one season.",
    rating: 5,
  },
  {
    name: "Layla H.",
    text: "Professional, disciplined, results-driven. Ahmad doesn't waste your time — every session has purpose. Best investment in myself.",
    rating: 5,
  },
  {
    name: "Khaled R.",
    text: "I've worked with many trainers. Ahmad is the only one who treated my goals like his own. Genuine, focused, and effective.",
    rating: 5,
  },
];

const ReviewsSection = () => {
  const [active, setActive] = useState(0);

  const scrollNext = useCallback(() => {
    setActive((prev) => (prev + 1) % reviews.length);
  }, []);

  const scrollPrev = useCallback(() => {
    setActive((prev) => (prev - 1 + reviews.length) % reviews.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(scrollNext, 5000);
    return () => clearInterval(interval);
  }, [scrollNext]);

  return (
    <section id="reviews" className="py-24 bg-muted">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Results Speak.
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-14 z-10 w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center hover:border-primary/40 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>

          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-14 z-10 w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center hover:border-primary/40 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>

          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-card p-8 md:p-12 rounded-sm border border-border text-center"
          >
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: reviews[active].rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>
            <blockquote className="text-lg md:text-xl text-foreground leading-relaxed font-light italic">
              "{reviews[active].text}"
            </blockquote>
            <p className="mt-6 font-display font-semibold text-foreground">{reviews[active].name}</p>
          </motion.div>

          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === active ? "bg-primary w-8" : "bg-border hover:bg-muted-foreground"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
