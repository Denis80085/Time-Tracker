import { create } from "zustand";

type WeekControlStore = {
  start: Date;
  end: Date;
  setNextWeek: () => void;
  setPreviousWeek: () => void;
  setWeek: (start: Date, end: Date) => void;
  setWeekFromDate: (date: Date) => void;
};

function getWeekStart(date: Date) {
  let d = date.getDay();

  let offset = d > 0 ? d - 1 : 6;

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
  setWeek: (start: Date, end: Date) => {
    set({ start: new Date(start), end: new Date(end) });
  },
  setWeekFromDate: (date: Date) => {
    set({
      start: getWeekStart(new Date(date)),
      end: getWeekEnd(new Date(date)),
    });
    set((state) => {
      return state;
    });
  },
}));
