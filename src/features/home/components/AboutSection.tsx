import { motion } from "framer-motion";

import coachPortrait from "@/assets/ahmed-portrait.jpg";

import { aboutHighlights, coachMetrics } from "../content";

export function AboutSection() {
  return (
    <section id="about" className="bg-background py-24">
      <div className="container mx-auto px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <div className="aspect-[3/4] overflow-hidden rounded-sm">
              <img
                src={coachPortrait}
                alt="Ahmad Saad - Performance Coach"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 rounded-sm bg-primary p-6 text-primary-foreground">
              <div className="font-display text-3xl font-bold">6+</div>
              <div className="text-xs uppercase tracking-widest">Years Coaching</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <h2 className="font-display text-3xl font-bold leading-tight text-foreground md:text-5xl">
              Built on Discipline.
              <br />
              <span className="text-gradient-green">Driven by Results.</span>
            </h2>

            <p className="mt-6 leading-relaxed text-muted-foreground">
              With over 6 years of experience training everyday fitness
              enthusiasts, busy professionals, and competitive athletes alike,
              Ahmad Saad delivers structured, results-driven coaching with zero
              shortcuts. Every program is built on science, refined through
              practice, and designed for lasting transformation — no matter your
              starting point.
            </p>

            <div className="mt-8 space-y-4">
              {aboutHighlights.map((highlight) => (
                <div key={highlight} className="flex items-start gap-3">
                  <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <p className="text-sm text-foreground">{highlight}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-6">
              {coachMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <metric.icon className="h-4 w-4 text-primary" />
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
