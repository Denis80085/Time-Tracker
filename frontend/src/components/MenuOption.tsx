import { Link } from "react-router-dom";
import type { ReactNode } from "react";

type MenuOptionProps = {
  linkTo: string;
  iconSrc: string;
  children: ReactNode;
};

function MenuOption(menuOptionProps: MenuOptionProps) {
  return (
    <Link
      className="w-9/10 h-fit mx-auto py-2 flex items-center text-gray-400 hover:bg-gray-700 hover:text-white rounded-md"
      to={menuOptionProps.linkTo}
    >
      <img
        className="mr-6 pl-2 w-10"
        src={menuOptionProps.iconSrc}
        alt="icon"
      />
      <div className=" text-2xl ">{menuOptionProps.children}</div>
    </Link>
  );
}

export default MenuOption;
