import PlusCircle from "../SVGs/PlusCircle.tsx";

type MenuButtonProps = {
  Type: string;
  OnHover: () => void;
  OnMouseLeave: () => void;
  OnClick: () => void;
};

function MenuButton({ OnHover, OnMouseLeave, OnClick, Type }: MenuButtonProps) {
  switch (Type) {
    case "Start":
      return (
        <button
          onMouseLeave={OnMouseLeave}
          onMouseEnter={OnHover}
          onClick={OnClick}
          className={
            "px-2 w-full h-10 rounded-2xl flex justify-center bg-green-600 text-white transition-all duration-100 " +
            "hover:bg-green-400 " +
            "hover:transform-[scale(1.1)] " +
            "cursor-pointer"
          }
        >
          <img className="self-center w-8" src="/icons/caret-right-fill.svg" />
        </button>
      );
      break;
    case "Stop":
      return (
        <button
          onMouseLeave={OnMouseLeave}
          onMouseEnter={OnHover}
          onClick={OnClick}
          className={
            "px-2 w-full h-10 rounded-2xl bg-red-600 text-white flex justify-center transition-all duration-100 hover:bg-red-500 " +
            "hover:transform-[scale(1.1)] " +
            "cursor-pointer"
          }
        >
          <img className="self-center w-5" src="/icons/square-fill.svg" />
        </button>
      );
      break;
    case "Pause":
      return (
        <button
          onMouseLeave={OnMouseLeave}
          onMouseEnter={OnHover}
          onClick={OnClick}
          className={
            "px-2 w-full h-10 rounded-2xl bg-yellow-500 text-white flex justify-center transition-all duration-100 hover:bg-yellow-300 " +
            "hover:transform-[scale(1.1)] " +
            "cursor-pointer"
          }
        >
          <img className="self-center w-8" src="/icons/pause-fill.svg" />
        </button>
      );
      break;
    case "Diverse":
      return (
        <button
          onMouseLeave={OnMouseLeave}
          onMouseEnter={OnHover}
          onClick={OnClick}
          className={
            "px-2 w-full h-10 rounded-2xl bg-violet-600 text-white flex justify-center items-center transition-all duration-100 hover:bg-violet-500 " +
            "hover:transform-[scale(1.1)] " +
            "cursor-pointer"
          }
        >
          <PlusCircle size={30} />
        </button>
      );
    default:
      console.warn("Undefinedn Button");
      return <></>;
      break;
  }
}

export default MenuButton;
