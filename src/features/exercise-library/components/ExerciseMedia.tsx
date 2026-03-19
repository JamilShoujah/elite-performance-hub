import { ImageOff } from "lucide-react";
import { useEffect, useState } from "react";

interface ExerciseMediaProps {
  alt: string;
  src: string;
}

export function ExerciseMedia({ alt, src }: ExerciseMediaProps) {
  const [hasMediaError, setHasMediaError] = useState(false);

  useEffect(() => {
    setHasMediaError(false);
  }, [src]);

  if (!src || hasMediaError) {
    return (
      <div className="flex w-[280px] max-w-full flex-col items-center justify-center gap-3 rounded-sm border border-dashed border-border bg-muted/20 px-6 py-12 text-center sm:w-[320px]">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <ImageOff className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">GIF not found</p>
          <p className="text-xs leading-relaxed text-muted-foreground">
            The exercise demo is unavailable for this movement right now.
          </p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasMediaError(true)}
      className="block h-auto w-auto max-h-[52vh] max-w-full object-contain sm:max-h-[58vh] lg:max-h-[44vh] xl:max-h-[48vh]"
      style={{ imageRendering: "auto" }}
    />
  );
}
