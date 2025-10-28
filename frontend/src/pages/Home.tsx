import UserMenu from "../components/Home/UserMenu";
import UserIcon from "../components/UserIcon";
import WeekOverView from "../components/Home/WeekOverView.tsx";

function Home() {
  return (
    <div className="w-[calc(100vw - 256px)] h-[100vh] ml-64 bg-gray-400">
      <section className="border-solid border-b-2 border-gray-700 p-5 h-65 bg-gray-800 grid grid-cols-2 grid-rows-1">
        <UserIcon
          className="max-w-fit ml-auto mr-0"
          userData={{
            firstName: "Denis",
            lastName: "Ermurachi",
            image: "/images/user.webp",
          }}
        />
        <UserMenu />
      </section>
      {/*Latest sesions. */}
      <section className="h-1/2 min-h-50 mt-20">
        {/*<Table Columns={Columns} Rows={Rows} />*/}
        <WeekOverView />
      </section>
    </div>
  );
}

export default Home;
