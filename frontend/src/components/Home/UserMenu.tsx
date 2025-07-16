import MenuButton from "./MenuButton";

function UserMenu() {
  return (
    <div className="mx-auto">
      <p className="text-6xl text-white ">Wilkommen!</p>
      <div className="w-full flex justify-around">
        <MenuButton Content="<|" Type="Start" />
        <MenuButton Content="||" Type="Pause" />
        <MenuButton Content="Q" Type="Stop" />
      </div>
    </div>
  );
}

export default UserMenu;
