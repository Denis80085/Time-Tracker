import DayType from "../../enums/DayType.ts";
import Table from "./TableComponent/Table.tsx";
import { TableColumn } from "./TableComponent/Table.tsx";
import Badge from "../Badge.tsx";
import { type ReactNode } from "react";
import DateControl from "../DateControl.tsx";
import { useWeek } from "../../hooks/useWeek.ts";

type RowData = {
  date: string;
  workhours: string;
  worked: string;
  pause: number;
  state: ReactNode;
};

const Columns: TableColumn<RowData>[] = [
  { Name: "Datum", Accesor: "date" },
  { Name: "Arbeitszeiten", Accesor: "workhours" },
  { Name: "Arbeitsstunden ohne Pause", Accesor: "worked" },
  { Name: "Pause in minuten", Accesor: "pause" },
  { Name: "State", Accesor: "state", Render: (row) => row.state },
];

const msToWorkTime = (workedMiliseconds: number) => {
  const seconds = Math.floor((workedMiliseconds / 1000) % 60);
  const minutes = Math.floor((workedMiliseconds / (1000 * 60)) % 60);
  const hours = Math.floor(workedMiliseconds / (1000 * 60 * 60));

  return `${hours
    .toString()
    .padStart(
      2,
      "0",
    )}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

const dayTypeToBadgeVariant = (dayType: DayType) => {
  switch (dayType) {
    case DayType.ARBEITSTAG:
      return (
        <Badge
          text={"ARBEITSTAG"}
          size={"huge"}
          variant={"green"}
          className="w-44"
        />
      );
    case DayType.KRANKTAG:
      return (
        <Badge
          text={"KRANKTAG"}
          size={"huge"}
          variant={"red"}
          className="w-44"
        />
      );
    case DayType.URLAUB:
      return (
        <Badge
          text={"URLAUB"}
          size={"huge"}
          variant={"blue"}
          className="w-44"
        />
      );
    case DayType.FEIERTAG:
      return (
        <Badge
          text={"FEIERTAG"}
          size={"huge"}
          variant={"indigo"}
          className="w-44"
        />
      );
    default:
      return (
        <Badge
          text={"UNANGETRAGEN"}
          size={"huge"}
          variant={"gray"}
          className="w-44"
        />
      );
  }
};

function WeekOverView() {
  console.log("rendered");
  const [currentWeek, setWeek, isLoading] = useWeek("2025-08-25", "2025-08-30");

  const rowsData = currentWeek.map((day) => {
    return {
      date: `${day.weekday}, ${day.date}`,
      workhours: day.started_at + " - " + day.ended_at,
      worked: msToWorkTime(day.worked),
      pause: Math.round(day.pause / 1000 / 60),
      state: dayTypeToBadgeVariant(day.type),
    };
  });

  let totalWorked = 0;
  let date = "nothing yet";

  if (isLoading) {
    return <p>Loading...</p>; //TODO: Loading Component
  } else if (currentWeek.length > 0) {
    currentWeek.forEach((day) => {
      totalWorked += day.worked;
    });

    date = `${currentWeek[0].date} - ${currentWeek[currentWeek.length - 1].date}`;
  }

  return (
    <div
      className="w-full h-full px-5 py-3 my-4 flex flex-col
      bg-gray-500 border-3 border-gray-700
      scrollbar-thumb-only overflow-auto"
    >
      <div className="flex justify-between items-end mb-3">
        <DateControl
          date={date}
          onRightClick={() => setWeek("2025-09-01", "2025-09-07")}
          onLeftClick={() => setWeek("2025-08-25", "2025-08-30")}
        />
        <h1 className="text-5xl text-white text-center w-full">
          Wochenübersicht
        </h1>
      </div>
      <Table Columns={Columns} Rows={rowsData} />
      <div className="bg-gray-900 py-1.5 flex justify-center items-center space-x-2 border-t-1 border-t-gray-500">
        <p className="text-white text-2xl text-center">
          Gesamt Arbeitsstunden:
        </p>
        <Badge
          text={msToWorkTime(totalWorked)}
          size={"large"}
          variant={"green"}
        />
      </div>
    </div>
  );
}

export default WeekOverView;
