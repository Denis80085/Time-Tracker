import { create } from "zustand";

type WeekControlStore = {
  start: Date;
  end: Date;
  setNextWeek: () => void;
  setPreviousWeek: () => void;
};

function getWeekStart(date: Date) {
  const day = date.getDay();
  const diff = -1 * (day - 1);
  return new Date(date.setDate(date.getDate() + diff));
}

function getWeekEnd(date: Date) {
  let endDate = getWeekStart(date);
  endDate.setDate(endDate.getDate() + 6);
  return endDate;
}

export const useWeekControlStore = create<WeekControlStore>((set) => ({
  start: getWeekStart(new Date()),
  end: getWeekEnd(new Date()),
  setNextWeek: () => {
    set((state) => ({
      start: new Date(state.start.setDate(state.start.getDate() + 7)),
      end: new Date(state.end.setDate(state.end.getDate() + 7)),
    }));
  },
  setPreviousWeek: () => {
    set((state) => ({
      start: new Date(state.start.setDate(state.start.getDate() - 7)),
      end: new Date(state.end.setDate(state.end.getDate() - 7)),
    }));
  },
}));
