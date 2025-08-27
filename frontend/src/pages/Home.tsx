import UserMenu from "../components/Home/UserMenu";
import UserIcon from "../components/UserIcon";
import Table from "../components/Home/TableComponent/Table";
import { TableColumn } from "../components/Home/TableComponent/Table";

type RowData = {
  date: string;
  startTime: string;
  endTime: string;
  state: string;
};

function Home() {
  const Columns: TableColumn<RowData>[] = [
    { Name: "Date", Accesor: "date" },
    { Name: "Start Time", Accesor: "startTime" },
    { Name: "End Time", Accesor: "endTime" },
    { Name: "State", Accesor: "state" },
  ];
  const Rows: RowData[] = [
    {
      date: "2022-01-01",
      startTime: "12:00",
      endTime: "13:00",
      state: "Running",
    },
    {
      date: "2022-01-01",
      startTime: "12:00",
      endTime: "13:00",
      state: "Running",
    },
    {
      date: "2022-01-01",
      startTime: "12:00",
      endTime: "13:00",
      state: "Running",
    },
    {
      date: "2022-01-01",
      startTime: "12:00",
      endTime: "13:00",
      state: "Running",
    },
  ];

  return (
    <div className="w-[calc(100vw - 256px)] h-[100vh] ml-64 bg-gray-400">
      <section className="border-solid border-b-2 border-gray-700 p-5 bg-gray-800 flex">
        <UserIcon
          firstName={"Denis"}
          lastName={"Ermurachi"}
          image={"/public/images/user.webp"}
        />
        <UserMenu />
      </section>
      {/*Latest sesions. */}
      <section>
        <Table Columns={Columns} Rows={Rows} />
      </section>
    </div>
  );
}

export default Home;
