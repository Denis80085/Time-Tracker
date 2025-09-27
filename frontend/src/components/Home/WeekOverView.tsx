import DayType from "../../enums/DayType.ts";
import Table from "./TableComponent/Table.tsx";
import { TableColumn } from "./TableComponent/Table.tsx";
import Badge from "../Badge.tsx";
import { type ReactNode } from "react";

type RowData = {
  date: string;
  workhours: string;
  worked: string;
  pause: number;
  state: ReactNode;
};

type DayData = {
  //isCurrentDay: boolean;
  date: string;
  workhours: string;
  worked: number; //in milliseconds
  pause: number; //in minutes
  type: DayType;
};

type WeekOverViewProps = {
  days: DayData[];
};

function WeekOverView({ days }: WeekOverViewProps) {
  const Columns: TableColumn<RowData>[] = [
    { Name: "Date", Accesor: "date" },
    { Name: "Arbeitszeiten", Accesor: "workhours" },
    { Name: "Arbeitsstunden ohne Pause", Accesor: "worked" },
    { Name: "Pause in minuten", Accesor: "pause" },
    { Name: "State", Accesor: "state", Render: (row) => row.state },
  ];

  let TotalWorkedMS = 0;
  days.forEach((day) => {
    TotalWorkedMS += day.worked;
  });

  function msToWorkTime(workedMiliseconds: number) {
    const seconds = Math.floor((workedMiliseconds / 1000) % 60);
    const minutes = Math.floor((workedMiliseconds / (1000 * 60)) % 60);
    const hours = Math.floor(workedMiliseconds / (1000 * 60 * 60));

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  const dayTypeToBadgeVariant = (dayType: DayType) => {
    switch (dayType) {
      case DayType.ARBEITSTAG:
        return (
          <Badge
            text={"ARBEITSTAG"}
            size={"huge"}
            variant={"green"}
            className="w-40"
          />
        );
      case DayType.KRANKTAG:
        return (
          <Badge
            text={"KRANKTAG"}
            size={"huge"}
            variant={"red"}
            className="w-40"
          />
        );
      case DayType.URLAUB:
        return (
          <Badge
            text={"URLAUB"}
            size={"huge"}
            variant={"blue"}
            className="w-40"
          />
        );
      case DayType.FEIERTAG:
        return (
          <Badge
            text={"FEIERTAG"}
            size={"huge"}
            variant={"indigo"}
            className="w-40"
          />
        );
      default:
        return (
          <Badge
            text={"UNANGETRAGEN"}
            size={"huge"}
            variant={"gray"}
            className="w-40"
          />
        );
    }
  };

  const Rows: RowData[] = days.map((day) => {
    return {
      date: day.date,
      workhours: day.workhours,
      worked: msToWorkTime(day.worked),
      pause: day.pause,
      state: dayTypeToBadgeVariant(day.type),
    };
  });

  return (
    <div
      className="w-full h-full px-5 py-3 my-4 flex flex-col
      bg-gray-500 border-3 border-gray-700
      scrollbar-thumb-only overflow-auto"
    >
      <div className="flex justify-between items-end mb-3">
        <h1 className="text-5xl text-white text-center w-full">
          Wochenübersicht
        </h1>
      </div>
      <Table Columns={Columns} Rows={Rows} />
      <div className="bg-gray-900 py-1.5 flex justify-center items-center space-x-2 border-t-1 border-t-gray-500">
        <p className="text-white text-2xl text-center">
          Gesamt Arbeitsstunden:
        </p>
        <Badge
          text={msToWorkTime(TotalWorkedMS)}
          size={"large"}
          variant={"green"}
        />
      </div>
    </div>
  );
}

export default WeekOverView;
export { DayType, type DayData };
