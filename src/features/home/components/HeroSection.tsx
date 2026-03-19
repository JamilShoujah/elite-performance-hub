import { motion } from "framer-motion";

import heroBackground from "@/assets/hero-bg.jpg";

import { heroTrustSignals } from "../content";

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      <div className="absolute inset-0 bg-foreground/75" />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight text-secondary-foreground sm:text-5xl md:text-7xl">
            Serious Training for{" "}
            <span className="text-gradient-green">Serious Results.</span>
          </h1>
        </motion.div>

        <motion.p
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mx-auto mt-6 max-w-2xl text-lg font-light text-secondary-foreground/70 md:text-xl"
        >
          Performance coaching for everyone — from beginners to competitive
          athletes.
        </motion.p>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#contact"
            className="glow-green rounded-sm bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-90"
          >
            Apply for Coaching
          </a>
          <a
            href="#programs"
            className="rounded-sm border border-secondary-foreground/30 px-8 py-4 text-sm font-medium uppercase tracking-wider text-secondary-foreground transition-colors hover:border-primary hover:text-primary"
          >
            View Programs
          </a>
        </motion.div>

        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-8 text-xs uppercase tracking-widest text-secondary-foreground/50"
        >
          {heroTrustSignals.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <item.icon className="h-4 w-4 text-primary" />
              <span>{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
