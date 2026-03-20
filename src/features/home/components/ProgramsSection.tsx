import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

import { cn } from '@/shared/utils/cn';

import { programs, type Program } from '../content';
import { SectionHeading } from './SectionHeading';

function ProgramCard({ program }: { program: Program }) {
  return (
    <div
      className={cn(
        'group relative flex h-full flex-col rounded-sm border bg-card p-6 transition-all duration-300 hover:shadow-[var(--shadow-card-hover)]',
        program.isPopular
          ? 'border-primary shadow-[var(--shadow-elevated)]'
          : 'border-border hover:border-primary/40',
      )}
    >
      {program.isPopular ? (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-sm bg-primary px-4 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">
          Most Popular
        </div>
      ) : null}

      <div className="mb-4">
        <h3 className="font-display text-lg font-semibold text-foreground">{program.title}</h3>
        <p className="mt-1 text-xs text-muted-foreground">{program.sessions}</p>
      </div>

      <div className="mb-6">
        <span className="font-display text-3xl font-bold text-foreground">{program.price}</span>
        <span className="text-sm text-muted-foreground">{program.period}</span>
      </div>

      <p className="mb-4 text-xs italic text-muted-foreground">Best for: {program.bestFor}</p>

      <ul className="mb-6 space-y-3">
        {program.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-foreground">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <p className="mb-6 text-xs font-medium text-muted-foreground">{program.result}</p>

      <div className="mt-auto">
        <a
          href="#contact"
          className={cn(
            'block rounded-sm py-3 text-center text-sm font-bold uppercase tracking-wider transition-all',
            program.isPopular
              ? 'bg-primary text-primary-foreground hover:opacity-90'
              : 'border border-foreground text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground',
          )}
        >
          Apply Now
        </a>

        {program.isLimited ? (
          <p className="mt-3 text-center text-xs font-medium">Limited Availability</p>
        ) : null}
      </div>
    </div>
  );
}

export function ProgramsSection() {
  return (
    <section id="programs" className="bg-background py-24">
      <div className="container mx-auto px-6">
        <SectionHeading
          description="Select the program that matches your commitment level."
          title="Coaching Programs"
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {programs.map((program, index) => (
            <motion.div
              className="h-full"
              key={program.title}
              initial={{ opacity: 0, y: 30 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <ProgramCard program={program} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
