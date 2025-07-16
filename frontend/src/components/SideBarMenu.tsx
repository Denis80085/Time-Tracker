import MenuOption from "./MenuOption.tsx";

function SideBarMenu() {
  return (
    <nav className="fixed top-0 left-0 h-screen w-64 bg-gray-900 flex flex-col space-y-2">
      <MenuOption linkTo="/" iconSrc="/icons/house-door-fill.svg">
        Home
      </MenuOption>
      <MenuOption linkTo="/" iconSrc="/icons/table.svg">
        Alle Einträgen
      </MenuOption>
      <MenuOption linkTo="/" iconSrc="/icons/file-earmark-pdf-fill.svg">
        PDF Erstellen
      </MenuOption>
      <MenuOption linkTo="/" iconSrc="/icons/door-closed-fill.svg">
        Abmelden
      </MenuOption>
    </nav>
  );
}

export default SideBarMenu;
