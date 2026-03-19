import { motion } from "framer-motion";
import { Instagram, MessageCircle } from "lucide-react";

import { Button } from "@/shared/components/ui/Button";
import { socialLinks } from "@/features/site-shell/config";
import { SectionHeading } from "./SectionHeading";

const whatsappLink =
  socialLinks.find((link) => link.label === "WhatsApp")?.href ??
  "https://wa.link/pb8vri";

const instagramLink =
  socialLinks.find((link) => link.label === "Instagram")?.href ??
  "https://www.instagram.com/its_coach_ahmad/";

export function ContactSection() {
  return (
    <section id="contact" className="bg-muted py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-2xl">
          <SectionHeading
            className="mb-12"
            description="Serious about results? Reach out directly and start the conversation with the coach."
            title="Apply to Train"
          />

          <motion.div
            className="rounded-sm border border-border bg-card p-8 text-center md:p-10"
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground">
              Choose the channel that feels easiest for you. WhatsApp is the
              fastest way to get a reply, and Instagram is there if you prefer
              to reach out through social.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Button asChild size="lg" className="glow-green w-full">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  Message on WhatsApp
                </a>
              </Button>

              <Button asChild variant="outline" size="lg" className="w-full">
                <a href={instagramLink} target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-4 w-4" />
                  Reach out on Instagram
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
