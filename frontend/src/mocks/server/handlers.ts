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
      start = "0001-01-01";
    }

    let SessionsInRange = [];
    if (end !== null) {
      const startDate = new Date(start).getTime();
      const endDate = new Date(end).getTime();

      if (startDate > endDate) {
        return new Response(null, {
          status: 400,
          statusText: "Bad Request. Start date must be before end date.",
        });
      }

      SessionsInRange = sessions.filter((session) => {
        let sessionDate = new Date(session.started_at).getTime();

        if (sessionDate >= startDate && sessionDate <= endDate) {
          return session;
        }
      });
    } else {
      const startDate = new Date(start).getTime();
      SessionsInRange = sessions.filter((session) => {
        let sessionDate = new Date(session.started_at);
        if (sessionDate.getTime() >= startDate) {
          return session;
        }
      });
    }
    return HttpResponse.json(SessionsInRange);
  }),
];
