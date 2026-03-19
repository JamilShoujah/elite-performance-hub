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
              className="group rounded-sm border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-card-hover)]"
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm font-medium text-foreground">
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
