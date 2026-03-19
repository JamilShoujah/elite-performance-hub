import { describe, expect, it } from "vitest";

import { exercises } from "../data/exercises";
import { filterExercises } from "./filterExercises";

describe("filterExercises", () => {
  it("returns the full list when no filters are active", () => {
    expect(
      filterExercises(exercises, { category: "All", query: "" }),
    ).toHaveLength(exercises.length);
  });

  it("filters exercises by category", () => {
    const results = filterExercises(exercises, {
      category: "Mobility",
      query: "",
    });

    expect(results).toHaveLength(2);
    expect(results.every((exercise) => exercise.category === "Mobility")).toBe(
      true,
    );
  });

  it("matches the search query across multiple exercise fields", () => {
    const results = filterExercises(exercises, {
      category: "All",
      query: "triceps",
    });

    expect(results.map((exercise) => exercise.name)).toEqual([
      "Bench Press",
      "Overhead Press",
    ]);
  });
});
