import DayType from "../enums/DayType.ts";
import { useState, useEffect, useCallback } from "react";
import { parseISO } from "date-fns";
import { delay } from "msw";

type DayFormated = {
  weekday: string;
  date: string;
  started_at: string;
  ended_at: string;
  type: DayType;
  worked: number;
  pause: number;
};

type DayData = {
  id: number;
  started_at: string;
  ended_at: string;
  pause: number; //in milliseconds
  type: number;
};

const FormatDay = (dayToFormate: DayData) => {
  const dateStarted = parseISO(dayToFormate.started_at);
  const dateEnded = parseISO(dayToFormate.ended_at);

  let formated: DayFormated = {
    weekday: Intl.DateTimeFormat("de-DE", {
      weekday: "short",
    }).format(dateStarted),
    date: Intl.DateTimeFormat("de-DE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(dateStarted),
    started_at: Intl.DateTimeFormat("de-DE", {
      hour: "numeric",
      minute: "2-digit",
    }).format(dateStarted),
    ended_at: Intl.DateTimeFormat("de-DE", {
      hour: "numeric",
      minute: "2-digit",
    }).format(dateEnded),
    type: dayToFormate.type,
    worked: dateEnded.getTime() - dateStarted.getTime() - dayToFormate.pause,
    pause: dayToFormate.pause,
  };

  return formated;
};

async function fetchWeek(from: string, to: string) {
  let daysFormated: DayFormated[] = [];
  const from_date = new Date(from);
  const to_date = new Date(to);

  const diffTime = Math.abs(to_date - from_date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

  for (let i = 0; i < diffDays; i++) {
    daysFormated.push({
      weekday: Intl.DateTimeFormat("de-DE", { weekday: "short" }).format(
        from_date,
      ),
      date: Intl.DateTimeFormat("de-DE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(from_date),
      started_at: "00:00",
      ended_at: "00:00",
      type: DayType.UNKNOWN,
      worked: 0,
      pause: 0,
    });

    from_date.setDate(from_date.getDate() + 1);
  }

  await fetch(
    `https://www.ttrack.com/week?start=${from.split("T")[0]}&end=${to.split("T")[0]}T23:59:59Z`,
  )
    .then((res) => res.json())
    .then((data: DayData[]) => {
      // daysFormated = data.map((day) => FormatDay(day));

      data.forEach((day) => {
        const formated = FormatDay(day);

        let i = daysFormated.findIndex((d) => d.date === formated.date);
        if (i !== -1) {
          daysFormated[i].type = formated.type;
          daysFormated[i].started_at = formated.started_at;
          daysFormated[i].ended_at = formated.ended_at;
          daysFormated[i].pause = formated.pause;
          daysFormated[i].worked = formated.worked;
        }
      });
    });

  return daysFormated;
}

function storeWeek(storageKey: string, week: DayFormated[]) {
  localStorage.setItem(storageKey, JSON.stringify(week));
}

function getWeekFromStorage(storageKey: string) {
  return JSON.parse(localStorage.getItem(storageKey) || "[]");
}

function useWeek(
  from: string = "",
  to: string = "",
): [DayFormated[], (from: string, to: string) => Promise<void>, boolean] {
  const [current, setCurrent] = useState<DayFormated[]>([]);
  const [loading, setLoading] = useState(false);
  const storageKey = `w_${from}_${to}`;

  const FetchAndSet = useCallback(async (f: string, t: string) => {
    setLoading(true);

    const week = getWeekFromStorage(storageKey);

    if (week.length > 0) {
      setCurrent(week);
      setLoading(false);
      return;
    }
    try {
      const days = await fetchWeek(f, t);
      storeWeek(storageKey, days);
      setCurrent(days);
    } catch (e) {
      console.error(e);
      setCurrent([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    FetchAndSet(from, to).catch((e) => {
      console.error(e);
    });
  }, [from, to, FetchAndSet]);

  const setWeek = async (newFrom: string, newTo: string) => {
    localStorage.removeItem(storageKey);
    await FetchAndSet(newFrom, newTo);
  };

  return [current, setWeek, loading];
}
// @ts-ignore
export { useWeek };
