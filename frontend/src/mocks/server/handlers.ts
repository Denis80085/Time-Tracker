import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://test.com/session", () => {
    return HttpResponse.json([
      {
        id: 1,
        state: "completed",
        date: "2025-08-25",
        started_at: "8:00",
        ended_at: "17:00",
        pause_ms: 0,
        total_worked_ms: 0,
        day_type: 1,
      },
      {
        id: 2,
        state: "completed",
        date: "2025-08-25",
        started_at: "8:00",
        ended_at: "17:00",
        pause_ms: 0,
        total_worked_ms: 0,
        day_type: 1,
      },
      {
        id: 3,
        state: "completed",
        date: "2025-08-25",
        started_at: "8:00",
        ended_at: "17:00",
        pause_ms: 0,
        total_worked_ms: 0,
        day_type: 1,
      },
      {
        id: 4,
        state: "completed",
        date: "2025-08-25",
        started_at: "8:00",
        ended_at: "17:00",
        pause_ms: 0,
        total_worked_ms: 0,
        day_type: 1,
      },
      {
        id: 5,
        state: "completed",
        date: "2025-08-25",
        started_at: "8:00",
        ended_at: "17:00",
        pause_ms: 0,
        total_worked_ms: 0,
        day_type: 1,
      },
    ]);
  }),
];
