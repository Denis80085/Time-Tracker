import { create } from "zustand";

type WeekControlStore = {
  start: Date;
  end: Date;
  setNextWeek: () => void;
  setPreviousWeek: () => void;
};

function getWeekStart(date: Date) {
  let d = date.getDay();

  let offset = d - 1;

  date.setDate(date.getDate() - offset);
  return date;
}

function getWeekEnd(date: Date) {
  let endDate = getWeekStart(date);
  endDate.setDate(endDate.getDate() + 6);
  return endDate;
}

// function SetFirstDayOfWeek(today: Date) {
//   let d = today.getDay();
//
//   let offset = d - 1;
//
//   today.setDate(today.getDate() - offset);
// }

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
