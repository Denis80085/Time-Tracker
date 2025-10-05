import { http, HttpResponse } from "msw";
import sessions from "../fixtures/action.all_sessions.json";

export const handlers = [
  http.get("https://www.ttrack.com/lweek", () => {
    return HttpResponse.json(sessions);
  }),
];
