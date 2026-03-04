import { motion } from "framer-motion";
import { Check } from "lucide-react";

const programs = [
  {
    title: "Online Performance Coaching",
    sessions: "10 Sessions",
    price: "$400",
    period: "/month",
    popular: false,
    bestFor: "Remote professionals seeking structured programming",
    features: [
      "Personalized training programs",
      "Weekly video check-ins",
      "Progressive overload tracking",
      "Recovery protocols",
      "Direct coach messaging",
    ],
    result: "Build elite-level fitness from anywhere.",
  },
  {
    title: "1-on-1 Private Coaching",
    sessions: "10 Sessions",
    price: "$350",
    period: "",
    popular: true,
    bestFor: "Athletes and executives who demand hands-on coaching",
    features: [
      "In-person training sessions",
      "Real-time form correction",
      "Performance assessments",
      "Custom periodization",
      "Priority scheduling",
    ],
    result: "Maximize performance with direct coaching.",
    limited: true,
  },
  {
    title: "Custom Workout Programming",
    sessions: "Monthly",
    price: "$200",
    period: "/month",
    popular: false,
    bestFor: "Self-driven individuals who need expert programming",
    features: [
      "Periodized training blocks",
      "Exercise video library access",
      "Monthly program updates",
      "Progress tracking tools",
    ],
    result: "Train with purpose. Every session counts.",
  },
  {
    title: "Performance Nutrition Planning",
    sessions: "Monthly",
    price: "$150",
    period: "/month",
    popular: false,
    bestFor: "Those ready to optimize fuel for performance",
    features: [
      "Macro-optimized meal plans",
      "Supplement guidance",
      "Body composition tracking",
      "Bi-weekly adjustments",
    ],
    result: "Fuel the machine. Optimize results.",
  },
];

const ProgramsSection = () => {
  return (
    <section id="programs" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Coaching Programs
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Select the program that matches your commitment level.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, i) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative group bg-card rounded-sm p-6 border transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] ${
                program.popular
                  ? "border-primary shadow-[var(--shadow-elevated)]"
                  : "border-border hover:border-primary/40"
              }`}
            >
              {program.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-sm uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <div className="mb-4">
                <h3 className="font-display text-lg font-semibold text-foreground">{program.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{program.sessions}</p>
              </div>

              <div className="mb-6">
                <span className="font-display text-3xl font-bold text-foreground">{program.price}</span>
                <span className="text-muted-foreground text-sm">{program.period}</span>
              </div>

              <p className="text-xs text-muted-foreground mb-4 italic">
                Best for: {program.bestFor}
              </p>

              <ul className="space-y-3 mb-6">
                {program.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <p className="text-xs text-muted-foreground mb-6 font-medium">{program.result}</p>

              <a
                href="#contact"
                className={`block text-center py-3 text-sm font-bold uppercase tracking-wider rounded-sm transition-all ${
                  program.popular
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "border border-foreground text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary"
                }`}
              >
                Apply Now
              </a>

              {program.limited && (
                <p className="mt-3 text-center text-xs text-primary font-medium">Limited Availability</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
