import UserMenu from "../components/Home/UserMenu";
import UserIcon from "../components/UserIcon";

function Home() {
  return (
    <div className="w-[calc(100vw - 256px)] ml-64">
      <section className="border-solid border-b-2 border-gray-700 p-5 bg-gray-800 flex">
        <UserIcon
          firstName={"Denis"}
          lastName={"Ermurachi"}
          image={"/public/images/user.webp"}
        />
        <UserMenu />
      </section>
      {/*Latest sesions. */}
    </div>
  );
}

export default Home;
