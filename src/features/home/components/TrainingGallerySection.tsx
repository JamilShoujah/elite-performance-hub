import { motion } from "framer-motion";

import { trainingGallery } from "../content";
import { SectionHeading } from "./SectionHeading";

export function TrainingGallerySection() {
  return (
    <section className="bg-muted py-24">
      <div className="container mx-auto px-6">
        <SectionHeading
          description="A glimpse into real coaching sessions and client training."
          title="Inside the Process."
        />

        <div className="grid gap-4 md:grid-cols-3">
          {trainingGallery.map((image, index) => (
            <motion.div
              key={image.src}
              className="group aspect-[3/2] overflow-hidden rounded-sm"
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
