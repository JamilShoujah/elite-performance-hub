import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { socialProofStats } from "../content";

interface CountUpStatProps {
  suffix: string;
  value: number;
}

function CountUpStat({ suffix, value }: CountUpStatProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!containerRef.current || hasStarted) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) {
      return;
    }

    let animationFrame = 0;
    const duration = 1500;
    const startTime = performance.now();

    const animate = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.round(progress * value));

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [hasStarted, value]);

  return (
    <div ref={containerRef} className="text-center">
      <div className="font-display text-4xl font-bold text-foreground md:text-5xl">
        {count}
        {suffix}
      </div>
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="border-y border-border bg-muted py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {socialProofStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <CountUpStat suffix={stat.suffix} value={stat.value} />
              <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
