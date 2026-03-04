import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useState } from "react";

const reviews = [
  {
    name: "Omar K.",
    text: "Ahmed's coaching transformed my athletic performance in 3 months. His structured approach is unlike anything I've experienced.",
    rating: 5,
  },
  {
    name: "Sarah M.",
    text: "I came in overworked and undertrained. Ahmed built a system that fit my schedule and pushed me to results I didn't think were possible.",
    rating: 5,
  },
  {
    name: "Youssef A.",
    text: "As a Hyrox competitor, I needed specialized training. Ahmed's programming took 8 minutes off my race time in one season.",
    rating: 5,
  },
  {
    name: "Layla H.",
    text: "Professional, disciplined, results-driven. Ahmed doesn't waste your time — every session has purpose. Best investment in myself.",
    rating: 5,
  },
  {
    name: "Khaled R.",
    text: "I've worked with many trainers. Ahmed is the only one who treated my goals like his own. Genuine, focused, and effective.",
    rating: 5,
  },
];

const ReviewsSection = () => {
  const [active, setActive] = useState(0);

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

        <div className="max-w-3xl mx-auto">
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
