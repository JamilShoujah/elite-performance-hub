import { describe, expect, it } from "vitest";

import { mapApiExerciseToExercise, mapCategoryOptions } from "./transformExercise";

describe("mapApiExerciseToExercise", () => {
  it("transforms the ExerciseDB API exercise into the app model", () => {
    const exercise = mapApiExerciseToExercise({
      bodyParts: ["upper arms"],
      equipments: ["body weight"],
      exerciseId: "abc123",
      gifUrl: "https://cdn.example.com/exercise.gif",
      instructions: ["Step one", "Step two"],
      name: "chin-up",
      secondaryMuscles: ["biceps brachii"],
      targetMuscles: ["latissimus dorsi"],
    });

    expect(exercise).toEqual({
      bodyParts: ["Upper Arms"],
      category: "Upper Arms",
      equipment: ["Body Weight"],
      gifUrl: "https://cdn.example.com/exercise.gif",
      id: "abc123",
      instructions: ["Step one", "Step two"],
      name: "chin-up",
      primaryMuscles: ["Latissimus Dorsi"],
      secondaryMuscles: ["Biceps Brachii"],
    });
  });
});

describe("mapCategoryOptions", () => {
  it("builds sorted category options with All at the top", () => {
    expect(mapCategoryOptions(["upper arms", "back"])).toEqual([
      { label: "All", value: "All" },
      { label: "Back", value: "back" },
      { label: "Upper Arms", value: "upper arms" },
    ]);
  });
});
