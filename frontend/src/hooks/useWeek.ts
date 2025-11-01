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

  await fetch(`https://www.ttrack.com/week?start=${from}&end=${to}T23:59:59Z`)
    .then((res) => res.json())
    .then((data: DayData[]) => {
      daysFormated = data.map((day) => FormatDay(day));
    });

  await delay(1500);
  return daysFormated;
}

function useWeek(
  from: string,
  to: string,
): [DayFormated[], (from: string, to: string) => void, boolean] {
  const [current, setCurrent] = useState<DayFormated[]>([]);
  const [loading, setLoading] = useState(false);

  const FetchAndSet = useCallback(async (f: string, t: string) => {
    setLoading(true);

    try {
      const days = await fetchWeek(f, t);
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
  }, []);

  const setWeek = async (newFrom: string, newTo: string) => {
    await FetchAndSet(newFrom, newTo);
  };

  return [current, setWeek, loading];
}

export { useWeek };
