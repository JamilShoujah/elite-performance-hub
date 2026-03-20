import { specializations } from "../content";
import { SectionHeading } from "./SectionHeading";

export function SpecializationsSection() {
  return (
    <section id="specializations" className="bg-muted py-24">
      <div className="container mx-auto px-6">
        <SectionHeading
          description="Science-backed training systems tailored to your discipline."
          title="Performance Specializations"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {specializations.map((specialization) => (
            <div
              key={specialization.title}
              className="group cursor-default rounded-sm border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-[var(--shadow-card-hover)]"
            >
              <specialization.icon className="mb-4 h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />
              <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
                {specialization.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {specialization.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
