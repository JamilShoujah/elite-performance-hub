import { motion } from "framer-motion";
import { Award, Clock, Users } from "lucide-react";
import ahmedPortrait from "@/assets/ahmed-portrait.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[3/4] overflow-hidden rounded-sm">
              <img
                src={ahmedPortrait}
                alt="Ahmad Saad - Performance Coach"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-sm">
              <div className="font-display text-3xl font-bold">6+</div>
              <div className="text-xs uppercase tracking-widest">Years Coaching</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
              Built on Discipline.<br />
              <span className="text-gradient-green">Driven by Results.</span>
            </h2>

            <p className="mt-6 text-muted-foreground leading-relaxed">
              With over 6 years of experience training everyday fitness enthusiasts, busy professionals,
              and competitive athletes alike, Ahmad Saad delivers structured, results-driven
              coaching with zero shortcuts. Every program is built on science, refined through
              practice, and designed for lasting transformation — no matter your starting point.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Training for all levels — beginners to competitive athletes",
                "Structured, periodized training philosophy",
                "Results-driven mindset with measurable outcomes",
                "No shortcuts — only proven systems",
                "Personalized approach for every individual",
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <p className="text-sm text-foreground">{point}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-6">
              {[
                { icon: Award, label: "Certified Trainer" },
                { icon: Clock, label: "6+ Years" },
                { icon: Users, label: "200+ Trainees" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <item.icon className="w-4 h-4 text-primary" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
