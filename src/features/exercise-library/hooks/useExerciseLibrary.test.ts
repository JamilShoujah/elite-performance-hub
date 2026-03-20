import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import * as exerciseDb from "../services/exerciseDb";
import { BODY_WEIGHT_EQUIPMENT, ALL_EXERCISES_CATEGORY } from "../types";
import { useExerciseLibrary } from "./useExerciseLibrary";

vi.mock("../services/exerciseDb", () => ({
  fetchExerciseCategories: vi.fn(),
  fetchExercises: vi.fn(),
}));

describe("useExerciseLibrary", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();

    vi.mocked(exerciseDb.fetchExerciseCategories).mockResolvedValue([
      { label: ALL_EXERCISES_CATEGORY, value: ALL_EXERCISES_CATEGORY },
    ]);
    vi.mocked(exerciseDb.fetchExercises).mockResolvedValue({
      exercises: [],
      hasMore: false,
      totalExercises: 0,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("debounces rapid filter changes into a single exercises request", async () => {
    const { result } = renderHook(() => useExerciseLibrary());

    expect(exerciseDb.fetchExercises).not.toHaveBeenCalled();

    await act(async () => {
      vi.advanceTimersByTime(200);
      await Promise.resolve();
    });

    expect(exerciseDb.fetchExercises).toHaveBeenCalledTimes(1);

    await act(async () => {
      result.current.setSelectedCategory("back");
      result.current.setSelectedEquipment(BODY_WEIGHT_EQUIPMENT);
      result.current.setSelectedCategory("upper arms");
      result.current.setSelectedEquipment(null);
    });

    await act(async () => {
      vi.advanceTimersByTime(199);
      await Promise.resolve();
    });

    expect(exerciseDb.fetchExercises).toHaveBeenCalledTimes(1);

    await act(async () => {
      vi.advanceTimersByTime(1);
      await Promise.resolve();
    });

    expect(exerciseDb.fetchExercises).toHaveBeenCalledTimes(2);
    expect(vi.mocked(exerciseDb.fetchExercises).mock.calls.at(-1)?.[0]).toMatchObject({
      category: "upper arms",
      equipment: null,
      limit: 24,
      offset: 0,
      searchQuery: "",
    });
  });
});
