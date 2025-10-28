import { test, expect } from "vitest";
import sessions from "../mocks/fixtures/action.all_sessions.json";

test("responds with the user", async () => {
  const response = await fetch("https://www.ttrack.com/lweek");
  const data = await response.json();
  expect(data).toEqual(sessions);
});
