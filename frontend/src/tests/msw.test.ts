import { test, expect } from "vitest";

test("responds with the user", async () => {
  const response = await fetch("https://www.ttrack.com/lweek");
  const data = await response.json();
  expect(data).toEqual([
    {
      id: 1,
      state: "completed",
      date: "2025-08-25",
      started_at: "08:00",
      ended_at: "16:30",
      pause: 1800000,
      worked: 28800000,
      type: 1,
    },
    {
      id: 2,
      state: "completed",
      date: "2025-08-26",
      started_at: "09:00",
      ended_at: "17:15",
      pause: 3600000,
      worked: 26100000,
      type: 1,
    },
    {
      id: 3,
      state: "completed",
      date: "2025-08-27",
      started_at: "08:15",
      ended_at: "16:45",
      pause: 1800000,
      worked: 27900000,
      type: 2,
    },
    {
      id: 4,
      state: "completed",
      date: "2025-08-28",
      started_at: "08:00",
      ended_at: "12:00",
      pause: 900000,
      worked: 13500000,
      type: 3,
    },
    {
      id: 5,
      state: "completed",
      date: "2025-08-29",
      started_at: "10:00",
      ended_at: "15:30",
      pause: 1800000,
      worked: 18900000,
      type: 4,
    },
  ]);
});
