import type { ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

interface SectionHeadingProps {
  className?: string;
  description?: ReactNode;
  title: ReactNode;
}

export function SectionHeading({
  className,
  description,
  title,
}: SectionHeadingProps) {
  return (
    <div className={cn("mx-auto mb-16 text-center", className)}>
      <h2 className="font-display text-3xl font-bold text-foreground md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}
