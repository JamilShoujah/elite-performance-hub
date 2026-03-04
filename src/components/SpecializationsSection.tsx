import { motion } from "framer-motion";
import { Flame, Activity, Move, Zap, Wind, Dumbbell, Gamepad2 } from "lucide-react";

const specializations = [
  { icon: Flame, title: "Hyrox Training", desc: "Race-specific conditioning and endurance programming." },
  { icon: Activity, title: "Core Development", desc: "Functional core strength for performance and injury prevention." },
  { icon: Move, title: "Mobility Optimization", desc: "Joint health, flexibility, and movement quality systems." },
  { icon: Zap, title: "Athletic Performance", desc: "Speed, power, and agility for competitive athletes." },
  { icon: Wind, title: "Conditioning Systems", desc: "Energy system development for peak cardiovascular output." },
  { icon: Dumbbell, title: "Functional Fitness", desc: "Real-world strength and movement patterns." },
  { icon: Gamepad2, title: "Esports Performance", desc: "Cognitive endurance, posture, and recovery for gamers." },
];

const SpecializationsSection = () => {
  return (
    <section id="specializations" className="py-24 bg-muted">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Performance Specializations
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Science-backed training systems tailored to your discipline.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {specializations.map((spec, i) => (
            <motion.div
              key={spec.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="group bg-card rounded-sm p-6 border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] cursor-default"
            >
              <spec.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{spec.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{spec.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecializationsSection;
