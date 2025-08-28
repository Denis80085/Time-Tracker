import UserMenu from "../components/Home/UserMenu";
import UserIcon from "../components/UserIcon";
import WeekOverView from "../components/Home/WeekOverView.tsx";
import { type DayData, DayType } from "../components/Home/WeekOverView.tsx";

function Home() {
  const Days: DayData[] = [
    {
      date: "Mo, 25.08.2025",
      workhours: "7:00-15:30",
      worked: "8",
      pause: "30",
      type: DayType.ARBEITSTAG,
    },
    {
      date: "Di, 26.08.2025",
      workhours: "7:00-15:30",
      worked: "8",
      pause: "30",
      type: DayType.ARBEITSTAG,
    },
    {
      date: "Mi, 27.08.2025",
      workhours: "7:00-15:30",
      worked: "8",
      pause: "30",
      type: DayType.ARBEITSTAG,
    },
    {
      date: "Do, 28.08.2025",
      workhours: "7:00-15:30",
      worked: "8",
      pause: "30",
      type: DayType.ARBEITSTAG,
    },
    {
      date: "Fr, 29.08.2025",
      workhours: "7:00-15:30",
      worked: "8",
      pause: "30",
      type: DayType.ARBEITSTAG,
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
        {/*<Table Columns={Columns} Rows={Rows} />*/}
        <WeekOverView weekNumber={1} days={Days} />
      </section>
    </div>
  );
}

export default Home;
