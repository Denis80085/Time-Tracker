import UserMenu from "../components/Home/UserMenu";
import Table from "../components/Table";
import UserIcon from "../components/UserIcon";
import WK_Model from "../Model/WK_Model";

function Home() {
  let WK_Sessions = [
    new WK_Model("123", 12314, "Date", 23, 2, 1, 3, 34, 12),
    new WK_Model("123", 12314, "Date", 23, 2, 1, 3, 34, 12),
    new WK_Model("123", 12314, "Date", 23, 2, 1, 3, 34, 12),
    new WK_Model("123", 12314, "Date", 23, 2, 1, 3, 34, 12),
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
        <Table WorlSesions={WK_Sessions} />
      </section>
    </div>
  );
}

export default Home;
