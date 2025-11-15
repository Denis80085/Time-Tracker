import { useWeek } from "../hooks/useWeek";
import { test, expect } from "vitest";
import { waitFor } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react";

test("1. get 2 weeks", async () => {
  const from = "2025-11-03";
  const to = "2025-11-17";

  const { result } = renderHook(() => useWeek(from, to));

  await waitFor(() => {
    const [, , loading] = result.current;
    if (loading) throw new Error("still loading");
  });

  const [current, , loading] = result.current;
  expect(loading).toBe(false);
  expect(Array.isArray(current)).toBe(true);
  expect(current.length).toEqual(15); // inclusive range: 03..17 is 15 days
});

test("2. 1 existent -> not existent -> back", async () => {
  const from = "2025-09-01";
  const to = "2025-09-05";
  const next_from = "2028-09-08";
  const next_to = "2028-09-12";

  const { result } = renderHook(() => useWeek(from, to));

  await waitFor(() => {
    const [, , loading] = result.current;
    if (loading) throw new Error("still loading");
  });

  const [current, setWeek, loading] = result.current;

  expect(loading).toBe(false);
  current.forEach((day) => {
    expect(
      new Date(day.date) < new Date(from) && new Date(day.date) > new Date(to),
    ).toBe(false);
    expect(day.type).toBeGreaterThanOrEqual(0);
    expect(day.worked).toBeGreaterThan(0);
    expect(day.pause).toBeGreaterThan(0);
    expect(day.started_at).not.toBe("00:00");
    expect(day.ended_at).not.toBe("00:00");
  });
  expect(current.length).toEqual(5);

  await act(async () => {
    await setWeek(next_from, next_to);
  });

  await waitFor(() => {
    const [, , loadingAfter] = result.current;
    if (loadingAfter) throw new Error("still loading after setWeek");
  });

  const [currentNew, ,] = result.current;

  expect(currentNew.length).toEqual(5);
  currentNew.forEach((day) => {
    expect(
      new Date(day.date) < new Date(next_from) &&
        new Date(day.date) > new Date(next_to),
    ).toBe(false);
    expect(day.type).toBe(-1);
    expect(day.worked).toBe(0);
    expect(day.pause).toBe(0);
    expect(day.started_at).toBe("00:00");
    expect(day.ended_at).toBe("00:00");
  });
});

test("3. unvalid dates", async () => {
  const from = "wdf1";
  const to = "2we";

  const { result } = renderHook(() => useWeek(from, to));

  await waitFor(() => {
    const [, , loading] = result.current;
    if (loading) throw new Error("still loading");
  });

  const [current, ,] = result.current;

  expect(current.length).toBe(0);
});
