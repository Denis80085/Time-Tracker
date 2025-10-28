import { test, expect } from "vitest";
import sessions from "../mocks/fixtures/action.all_sessions.json";

test("responds with the user", async () => {
  const response = await fetch("https://www.ttrack.com/days");
  const data = await response.json();
  expect(data).toEqual(sessions);
});

test("get week with no start and end", async () => {
  const response = await fetch("https://www.ttrack.com/week");
  const data = await response.json();
  expect(data).toEqual(sessions);
});

test("get week with only start", async () => {
  const startDate = "2025-09-01";
  const response = await fetch(
    `https://www.ttrack.com/week?start=${startDate}`,
  );
  const data = await response.json();

  const expectation = sessions.filter((session) => {
    if (
      new Date(session.started_at).getTime() >= new Date(startDate).getTime()
    ) {
      return session;
    }
  });
  expect(data).toEqual(expectation);
});

test("get week with only end", async () => {
  const endDate = "2025-09-03T23:59:59.999Z";
  const response = await fetch(`https://www.ttrack.com/week?end=${endDate}`);
  const data = await response.json();

  const expectation = sessions.filter((session) => {
    if (new Date(session.started_at).getTime() <= new Date(endDate).getTime()) {
      return session;
    }
  });
  expect(data).toEqual(expectation);
});

test("get week days from start to end", async () => {
  const startDate = "2025-08-26";
  const endDate = "2025-09-02";
  const response = await fetch(
    `https://www.ttrack.com/week?end=${endDate}&start=${startDate}`,
  );
  const data = await response.json();

  const startTime = new Date(startDate).getTime();
  const endTime = new Date(endDate).getTime();
  const expectation = sessions.filter((session) => {
    let sTime = new Date(session.started_at).getTime();

    if (sTime >= startTime && sTime <= endTime) {
      return session;
    }
  });
  expect(data).toEqual(expectation);
});

test("bad request start > end", async () => {
  const response = await fetch(
    `https://www.ttrack.com/week?end=2025-08-26&start=2025-09-02`,
  );

  expect(response.status).toEqual(400);
});
