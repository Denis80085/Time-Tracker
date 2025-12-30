import { useState, useMemo, useCallback } from "react";
import ExtendButton from "./ExtendButton.tsx";
import Arrow from "./SVGs/Arrow.tsx";
import { useWeekControlStore } from "../stores/storeWeekControl.ts";

type Day = {
  selected: boolean;
  currentMonth: boolean;
  date: Date;
};

// type WeekPickerProps = {
//   date?: Date;
//   onWeekSelected?: () => void;
// };

const getMonthDays = (
  month: number,
  year: number,
  selectedStart: Date,
  selectedEnd: Date,
) => {
  let Grid: Array<Day> = [];
  const firstDayOfMonth = new Date(year, month, 1);
  const startWeekday = firstDayOfMonth.getDay(); // 0 = Sunday, 1 = Monday...
  const normalizedStart = (startWeekday + 6) % 7;
  const totalCells = 42; // 6 weeks * 7 days

  for (let i = 0; i < totalCells; i++) {
    const dayOffset = i - normalizedStart;
    const date = new Date(year, month, dayOffset + 1);
    const startCompare = new Date(selectedStart);
    startCompare.setHours(0, 0, 0, 0);
    Grid.push({
      selected:
        date.getTime() >= startCompare.getTime() &&
        date.getTime() <= selectedEnd.getTime(),
      date: date,
      currentMonth: date.getMonth() === month,
    });
  }

  return Grid;
};

const DayBlock = (DayData: Day) => {
  return (
    <div
      className={`w-10 h-10 flex items-center justify-center relative bg-square-blick ${DayData.currentMonth ? "text-white" : "text-gray-400"} hover:text-white`} //hover:bg-gray-800 `}
    >
      {DayData.selected ? (
        <>
          <div className="absolute top-0 left-0 w-full h-full rounded-full bg-blue-700/10 z-[-10] transform-[scale(0.85)] border-2 border-blue-400" />
          <span className="z-30">{DayData.date.getDate()}</span>
        </>
      ) : (
        <span>{DayData.date.getDate()}</span>
      )}
    </div>
  );
};

function CurrentWeekToString(firstDay: Date, lastDay: Date) {
  const f = Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(firstDay);
  const l = Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(lastDay);

  return `${f}-${l}`;
}

const WeekPicker = () => {
  const [gridVisible, setGridVisible] = useState(false);
  const Start = useWeekControlStore((state) => state.start);
  const End = useWeekControlStore((state) => state.end);
  const [localDate, setLocalDate] = useState(Start); // for Month and Year

  const toNextLocalMonth = useCallback(() => {
    setLocalDate(
      new Date(localDate.getFullYear(), localDate.getMonth() + 1, 1),
    );
  }, [localDate]);

  const toPrevLocalMonth = useCallback(() => {
    setLocalDate(
      new Date(localDate.getFullYear(), localDate.getMonth() - 1, 1),
    );
  }, [localDate]);

  const Days = useMemo(() => {
    if (!gridVisible) {
      if (
        Start.getMonth() !== localDate.getMonth() ||
        Start.getFullYear() !== localDate.getFullYear()
      ) {
        setLocalDate(Start);
      }
      return [];
    }
    return getMonthDays(
      localDate.getMonth(),
      localDate.getFullYear(),
      Start,
      End,
    );
  }, [localDate, Start, End, gridVisible]);

  const Grid = useMemo(() => {
    console.log("Grid rerendered");
    if (!Days.length) return;

    let Weeks: Day[][] = [];

    for (let i = 0; i < Days.length; i += 7) {
      Weeks.push(Days.slice(i, i + 7));
    }
    return Weeks.map((day, i) => {
      return (
        <div
          key={i}
          className="grid grid-cols-7 border-1 border-transparent hover:inborder-blue"
        >
          {day.map((d, j) => {
            return (
              <DayBlock
                key={j}
                date={d.date}
                selected={d.selected}
                currentMonth={d.currentMonth}
              />
            );
          })}
        </div>
      );
    });
  }, [Days]);

  const FirstRow = () => {
    return (
      <div className="grid grid-cols-7 mb-0.5 border-b-1 border-gray-950">
        <div className="w-10 h-10 flex items-center justify-center">
          <span className={"text-gray-400"}>Mo</span>
        </div>
        <div className="w-10 h-10 flex items-center justify-center">
          <span className={"text-gray-400"}>Di</span>
        </div>
        <div className="w-10 h-10 flex items-center justify-center">
          <span className={"text-gray-400"}>Mi</span>
        </div>
        <div className="w-10 h-10 flex items-center justify-center">
          <span className={"text-gray-400"}>Do</span>
        </div>
        <div className="w-10 h-10 flex items-center justify-center">
          <span className={"text-gray-400"}>Fr</span>
        </div>
        <div className="w-10 h-10 flex items-center justify-center">
          <span className={"text-gray-400"}>Sa</span>
        </div>
        <div className="w-10 h-10 flex items-center justify-center">
          <span className={"text-gray-400"}>So</span>
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        className="h-full w-full flex items-center justify-center px-2 cursor-pointer date-picker-anchor transition-colors duration-250 hover:bg-gray-800"
        onClick={() => setGridVisible(!gridVisible)}
      >
        <span className="text-white text-center">
          {CurrentWeekToString(Start, End)}
        </span>
      </div>
      <div
        className={`overflow-clip rounded-md border-1 border-zinc-950 transition-transform duration-200 origin-top mt-0.5 bg-gray-900 dp-grid-position ${
          gridVisible ? "transform scale-y-100 " : "transform scale-y-0"
        }`}
      >
        <div className={`grid grid-rows-[auto_repeat(6,_1fr)] columns-5xl`}>
          {FirstRow()}
          {Grid}
        </div>
        <div className="grid mt-0.5 grid-cols-[1fr_2fr_1fr] gap-x-2 items-center">
          <ExtendButton
            className="hover:bg-gray-800"
            extend_to="right"
            content={<Arrow color="white" rotate={0} size={30} />}
            onClick={() => toPrevLocalMonth()}
          />
          <span className="text-white text-center">
            {Intl.DateTimeFormat("de-DE", {
              month: "long",
              year: "numeric",
            }).format(localDate)}
          </span>
          <ExtendButton
            className="hover:bg-gray-800"
            extend_to="left"
            content={<Arrow color="white" rotate={180} size={30} />}
            onClick={() => toNextLocalMonth()}
          />
        </div>
      </div>
    </>
  );
};

export default WeekPicker;
