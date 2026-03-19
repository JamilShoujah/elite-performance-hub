import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Textarea } from "@/shared/components/ui/Textarea";

import { fitnessLevels } from "../content";
import { SectionHeading } from "./SectionHeading";

const labelClassName =
  "mb-2 block text-xs uppercase tracking-widest text-muted-foreground";
const selectClassName =
  "w-full rounded-sm border border-border bg-muted px-4 py-3 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

function ApplicationReceivedState() {
  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.95 }}
      className="rounded-sm border border-primary bg-card p-12 text-center"
    >
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        <Send className="h-6 w-6 text-primary" />
      </div>
      <h3 className="font-display text-xl font-bold text-foreground">
        Application Received
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        We&apos;ll review your application and get back to you within 48 hours.
      </p>
    </motion.div>
  );
}

export function ContactSection() {
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasSubmitted(true);
  };

  return (
    <section id="contact" className="bg-muted py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-2xl">
          <SectionHeading
            className="mb-12"
            description="Serious about results? Let's talk."
            title="Apply to Train"
          />

          {hasSubmitted ? (
            <ApplicationReceivedState />
          ) : (
            <motion.form
              className="space-y-5 rounded-sm border border-border bg-card p-8 md:p-10"
              initial={{ opacity: 0, y: 20 }}
              onSubmit={handleSubmit}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClassName} htmlFor="contact-name">
                    Name
                  </label>
                  <Input
                    id="contact-name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className={labelClassName} htmlFor="contact-email">
                    Email
                  </label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className={labelClassName} htmlFor="contact-phone">
                  Phone
                </label>
                <Input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div>
                <label className={labelClassName} htmlFor="contact-goals">
                  Goals
                </label>
                <Textarea
                  id="contact-goals"
                  name="goals"
                  required
                  rows={4}
                  className="resize-none"
                  placeholder="What do you want to achieve?"
                />
              </div>

              <div>
                <label className={labelClassName} htmlFor="contact-level">
                  Current Fitness Level
                </label>
                <select id="contact-level" name="level" required className={selectClassName}>
                  <option value="">Select your level</option>
                  {fitnessLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>

              <Button type="submit" size="lg" className="w-full glow-green">
                Apply Now
              </Button>

              <div className="text-center">
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground transition-colors hover:text-primary"
                >
                  Or contact via WhatsApp →
                </a>
              </div>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}
