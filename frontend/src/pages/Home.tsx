import UserMenu from "../components/Home/UserMenu";
import UserIcon from "../components/UserIcon";
import Table from "../components/Home/TableComponent/Table";
import { TableColumn } from "../components/Home/TableComponent/Table";

type RowData = {
  date: string;
  workhours: string;
  worked: string;
  pause: string;
  state: string;
};

function Home() {
  const Columns: TableColumn<RowData>[] = [
    { Name: "Date", Accesor: "date" },
    { Name: "Arbeitszeiten", Accesor: "workhours" },
    { Name: "Stunden gearbeitet", Accesor: "worked" },
    { Name: "Pause in minuten", Accesor: "pause" },
    { Name: "State", Accesor: "state" },
  ];
  const Rows: RowData[] = [
    {
      date: "Mo, 2022-01-01",
      workhours: "7:00-15:00",
      worked: "8:00",
      pause: "30",
      state: "Running",
    },
    {
      date: "Di, 2022-01-02",
      workhours: "7:00-15:00",
      worked: "8:00",
      pause: "30",
      state: "Running",
    },
    {
      date: "Mi, 2022-01-03",
      workhours: "7:00-15:00",
      worked: "8:00",
      pause: "30",
      state: "Running",
    },
    {
      date: "Do, 2022-01-04",
      workhours: "7:00-15:00",
      worked: "8:00",
      pause: "30",
      state: "Running",
    },
    {
      date: "Fr, 2022-01-05",
      workhours: "7:00-12:00",
      worked: "5:00",
      pause: "30",
      state: "Running",
    },
  ];

  return (
    <div className="w-[calc(100vw - 256px)] h-[100vh] ml-64 bg-gray-400">
      <section className="border-solid border-b-2 border-gray-700 p-5 bg-gray-800 flex">
        <UserIcon
          firstName={"Denis"}
          lastName={"Ermurachi"}
          image={"/images/user.webp"}
        />
        <UserMenu />
      </section>
      {/*Latest sesions. */}
      <section className="py-5 px-2 h-100">
        <Table Columns={Columns} Rows={Rows} />
      </section>
    </div>
  );
}

export default Home;
