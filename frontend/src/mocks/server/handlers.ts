import { http, HttpResponse } from "msw";
import sessions from "../fixtures/action.all_sessions.json";

export const handlers = [
  http.get("https://www.ttrack.com/days", () => {
    return HttpResponse.json(sessions);
  }),

  http.get("https://www.ttrack.com/week", ({ request }) => {
    const Url = new URL(request.url);

    let start = Url.searchParams.get("start");
    let end = Url.searchParams.get("end");

    if (start === null && end === null) {
      return HttpResponse.json(sessions);
    }

    if (start === null) {
      start = "1970-01-01";
    }

    let SessionsInRange = [];
    if (end !== null) {
      let startDate = new Date(start);
      let endDate = new Date(end);

      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);

      if (startDate.getTime() > endDate.getTime()) {
        return new Response(null, {
          status: 400,
          statusText: "Bad Request. Start date must be before end date.",
        });
      }

      SessionsInRange = sessions.filter((session) => {
        let sessionDate = new Date(session.started_at);
        sessionDate.setHours(0, 0, 0, 0);
        const sessionTime = sessionDate.getTime();
        if (
          sessionTime >= startDate.getTime() &&
          sessionTime <= endDate.getTime()
        ) {
          return session;
        }
      });
    } else {
      let startDate = new Date(start);
      startDate.setHours(0, 0, 0, 0);

      SessionsInRange = sessions.filter((session) => {
        let sessionDate = new Date(session.started_at);
        sessionDate.setHours(0, 0, 0, 0);
        const sessionTime = sessionDate.getTime();
        if (sessionTime >= startDate.getTime()) {
          return session;
        }
      });
    }
    return HttpResponse.json(SessionsInRange);
  }),
];
