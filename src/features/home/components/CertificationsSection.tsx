import { motion } from "framer-motion";
import { Award } from "lucide-react";

import { certifications } from "../content";
import { SectionHeading } from "./SectionHeading";

export function CertificationsSection() {
  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-6">
        <SectionHeading title="Certified. Proven. Trusted." />

        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((certification, index) => (
            <motion.div
              key={certification}
              className="group flex h-[180px] items-center justify-center rounded-sm border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-card-hover)]"
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="flex flex-col items-center gap-4 text-center">
                <Award className="h-7 w-7 shrink-0 text-primary" />
                <span className="text-sm font-medium leading-relaxed text-foreground">
                  {certification}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
