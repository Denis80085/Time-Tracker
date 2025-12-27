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
  const endDate = "2025-09-03";
  const response = await fetch(`https://www.ttrack.com/week?end=${endDate}`);
  const data = await response.json();

  const expectation = sessions.filter((session) => {
    let sDate = new Date(session.started_at);
    sDate.setHours(0, 0, 0, 0);
    if (sDate.getTime() <= new Date(endDate).getTime()) {
      return session;
    }
  });
  expect(data).toEqual(expectation);
});

test("get week days from start to end", async () => {
  const startDate = "2025-12-22";
  const endDate = "2025-12-28";
  const response = await fetch(
    `https://www.ttrack.com/week?end=${endDate}&start=${startDate}`,
  );
  const data = await response.json();

  let startD = new Date(startDate);
  let endD = new Date(endDate);
  startD.setHours(0, 0, 0, 0);
  endD.setHours(0, 0, 0, 0);
  const expectation = sessions.filter((session) => {
    let sDate = new Date(session.started_at);
    sDate.setHours(0, 0, 0, 0);
    if (
      sDate.getTime() >= startD.getTime() &&
      sDate.getTime() <= endD.getTime()
    ) {
      return session;
    }
  });
  expect(data).toEqual(expectation);
  expect(data.length).toEqual(7);
});

test("bad request start > end", async () => {
  const response = await fetch(
    `https://www.ttrack.com/week?end=2025-08-26&start=2025-09-02`,
  );

  expect(response.status).toEqual(400);
});
