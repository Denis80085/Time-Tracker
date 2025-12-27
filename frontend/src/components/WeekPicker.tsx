import { useState, useMemo } from "react";
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

  // Adjust if you want Monday as first day
  const normalizedStart = (startWeekday + 6) % 7;
  const totalCells = 35; // 5 weeks * 7 days

  for (let i = 0; i < totalCells; i++) {
    const dayOffset = i - normalizedStart;
    const date = new Date(year, month, dayOffset + 1);

    Grid.push({
      selected:
        date.getTime() >= selectedStart.getTime() &&
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
      className={`w-10 h-10 flex items-center justify-center hover:bg-gray-800 ${DayData.selected ? "bg-blue-900" : ""}`}
    >
      <span className={DayData.currentMonth ? "text-white" : "text-gray-400"}>
        {DayData.date.getDate()}
      </span>
    </div>
  );
};

// function SetFirstDayOfWeek(today: Date) {
//   let d = today.getDay();
//
//   let offset = d - 1;
//
//   today.setDate(today.getDate() - offset);
// }

function CurrentWeekToString(firstDay: Date, lastDay: Date) {
  return `${firstDay.getDate()}.${firstDay.getMonth() + 1}.${firstDay.getFullYear()}-${lastDay.getDate()}.${lastDay.getMonth() + 1}.${lastDay.getFullYear()}`;
}

const WeekPicker = () => {
  const [gridVisible, setGridVisible] = useState(false);
  const Start = useWeekControlStore((state) => state.start);
  const End = useWeekControlStore((state) => state.end);
  const [Month, setMonth] = useState(Start.getMonth());
  const [Year, setYear] = useState(Start.getFullYear());

  const Grid = useMemo(() => {
    const Days = getMonthDays(
      Start.getMonth(),
      Start.getFullYear(),
      Start,
      End,
    );
    console.log(Days);
    return Days.map((day, i) => {
      return (
        <DayBlock
          currentMonth={day.currentMonth}
          date={day.date}
          selected={day.selected}
          key={i}
        />
      );
    });
  }, [Month, Year, Start, End]);

  const FirstRow = () => {
    return (
      <>
        <div className="w-10 h-10 flex items-center justify-center border-b-1 border-gray-950">
          <span className={"text-gray-400"}>Mo</span>
        </div>
        <div className="w-10 h-10 flex items-center justify-center border-b-1 border-gray-950">
          <span className={"text-gray-400"}>Di</span>
        </div>
        <div className="w-10 h-10 flex items-center justify-center border-b-1 border-gray-950">
          <span className={"text-gray-400"}>Mi</span>
        </div>
        <div className="w-10 h-10 flex items-center justify-center border-b-1 border-gray-950">
          <span className={"text-gray-400"}>Do</span>
        </div>
        <div className="w-10 h-10 flex items-center justify-center border-b-1 border-gray-950">
          <span className={"text-gray-400"}>Fr</span>
        </div>
        <div className="w-10 h-10 flex items-center justify-center border-b-1 border-gray-950">
          <span className={"text-gray-400"}>Sa</span>
        </div>
        <div className="w-10 h-10 flex items-center justify-center border-b-1 border-gray-950">
          <span className={"text-gray-400"}>So</span>
        </div>
      </>
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
        <div className={`grid grid-rows-6 grid-cols-7`}>
          {FirstRow()}
          {Grid}
        </div>
        <div className="grid grid-cols-[1fr_2fr_1fr] gap-x-2 items-center">
          <ExtendButton
            className="hover:bg-gray-800"
            extend_to="right"
            content={<Arrow color="white" rotate={0} size={30} />}
            onClick={() => {}}
          />
          <span className="text-white text-center">
            {Intl.DateTimeFormat("de-DE", {
              month: "long",
              year: "numeric",
            }).format(Start)}
          </span>
          <ExtendButton
            className="hover:bg-gray-800"
            extend_to="left"
            content={<Arrow color="white" rotate={180} size={30} />}
            onClick={() => {}}
          />
        </div>
      </div>
    </>
  );
};

export default WeekPicker;
