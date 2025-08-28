import DayType from "../../enums/DayType.ts";
import Table from "./TableComponent/Table.tsx";
import { TableColumn } from "./TableComponent/Table.tsx";
import AnimatedParagraph from "./AnimatedParagraph.tsx";

type RowData = {
  date: string;
  workhours: string;
  worked: string;
  pause: string;
  state: number;
};

type DayData = {
  //isCurrentDay: boolean;
  date: string;
  workhours: string;
  worked: string;
  pause: string;
  type: DayType;
};

type WeekOverViewProps = {
  weekNumber: number;
  days: DayData[];
};

function WeekOverView({ weekNumber, days }: WeekOverViewProps) {
  const Columns: TableColumn<RowData>[] = [
    { Name: "Date", Accesor: "date" },
    { Name: "Arbeitszeiten", Accesor: "workhours" },
    { Name: "Stunden gearbeitet", Accesor: "worked" },
    { Name: "Pause in minuten", Accesor: "pause" },
    { Name: "State", Accesor: "state" },
  ];

  const Rows: RowData[] = days.map((day) => {
    return {
      date: day.date,
      workhours: day.workhours,
      worked: day.worked,
      pause: day.pause,
      state: day.type,
    };
  });

  return (
    <div>
      <AnimatedParagraph
        content={`Wochenübersicht Wochennumme ${weekNumber}`}
        speed={30}
        color="text-black"
      />
      <Table Columns={Columns} Rows={Rows} />
    </div>
  );
}

export default WeekOverView;
export { DayType, type DayData };
