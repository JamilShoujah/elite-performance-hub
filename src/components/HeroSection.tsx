import { motion } from "framer-motion";
import { Shield, TrendingUp, Target } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-foreground/75" />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-secondary-foreground leading-tight max-w-4xl mx-auto">
            Serious Training for{" "}
            <span className="text-gradient-green">Serious Results.</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 text-lg md:text-xl text-secondary-foreground/70 max-w-2xl mx-auto font-light"
        >
          Elite performance coaching for professionals, athletes, and high-achievers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="bg-primary text-primary-foreground px-8 py-4 text-sm font-bold tracking-wider uppercase rounded-sm glow-green hover:opacity-90 transition-opacity"
          >
            Apply for Coaching
          </a>
          <a
            href="#programs"
            className="border border-secondary-foreground/30 text-secondary-foreground px-8 py-4 text-sm font-medium tracking-wider uppercase rounded-sm hover:border-primary hover:text-primary transition-colors"
          >
            View Programs
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-8 text-secondary-foreground/50 text-xs tracking-widest uppercase"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span>Trusted by Athletes</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span>Proven Transformation Systems</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            <span>Structured Methodology</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
