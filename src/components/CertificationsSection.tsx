import { motion } from "framer-motion";
import { Award } from "lucide-react";

const certs = [
  "NASM Certified Personal Trainer",
  "Precision Nutrition Level 1",
  "Functional Movement Screen (FMS)",
  "Hyrox Race Coach Certified",
  "Corrective Exercise Specialist",
  "Sports Performance Enhancement",
];

const CertificationsSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Certified. Proven. Trusted.
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {certs.map((cert, i) => (
            <motion.div
              key={cert}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group bg-card p-5 rounded-sm border border-border hover:border-primary/40 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm font-medium text-foreground">{cert}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
