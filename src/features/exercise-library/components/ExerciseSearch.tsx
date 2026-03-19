import { Search } from "lucide-react";

import { Input } from "@/shared/components/ui/Input";

interface ExerciseSearchProps {
  onSearchChange: (value: string) => void;
  value: string;
}

export function ExerciseSearch({
  onSearchChange,
  value,
}: ExerciseSearchProps) {
  return (
    <div className="mx-auto mb-8 max-w-md">
      <label htmlFor="exercise-search" className="sr-only">
        Search exercises
      </label>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id="exercise-search"
          value={value}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search exercises..."
          className="pl-10"
        />
      </div>
    </div>
  );
}
