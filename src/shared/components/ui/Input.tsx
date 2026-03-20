import * as React from "react";

import { cn } from "@/shared/utils/cn";

const Input = React.forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<"input">>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "w-full rounded-sm border border-border bg-muted px-4 py-3 text-base text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60 md:text-sm",
        className,
      )}
      {...props}
    />
  ),
);

Input.displayName = "Input";

export { Input };
