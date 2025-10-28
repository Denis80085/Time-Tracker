import { type ReactNode, useEffect } from "react";
import FaTriangle from "./SVGs/FaTriangle.tsx";
import Circle from "./SVGs/Circle.tsx";
import { useState, useRef, useMemo } from "react";

type DropDownInfoProps = {
  triggerContent: string;
  items?: ItemProps[];
  className?: string;
};

type ItemsWrapperProps = {
  children?: ReactNode;
  open: boolean;
};

type ItemProps = {
  parName: string;
  parContent: ReactNode;
};

const DropDownInfo = ({
  triggerContent,
  items,
  className,
}: DropDownInfoProps) => {
  const [open, setOpen] = useState(false);
  const rotate = useRef(0);
  const [Hovering, setHovering] = useState(false);
  const renderedItems = useMemo(
    () =>
      items?.map((item, i) => (
        <Item
          key={i}
          {...item}
          parName={item.parName}
          parContent={item.parContent}
        />
      )),
    [items],
  );

  const HandelClick = () => {
    setOpen(!open);
    open ? (rotate.current = 0) : (rotate.current = 90);
  };

  useEffect(() => {
    Hovering
      ? (rotate.current = open ? 90 : 0)
      : (rotate.current = open ? -45 : 45);
  }, [Hovering]);

  return (
    <div
      className={
        "bg-gray-800 border-4 border-zinc-950 inborder-dark z-0 " + className
      }
    >
      <div
        role="button"
        className={`py-3 px-4 w-full flex justify-center items-center space-x-1 text-white cursor-pointer
                    ${open && "border-underline-light"}`}
        onClick={HandelClick}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <span className="h-full text-center text-2xl grow-1">
          {triggerContent}
        </span>
        <FaTriangle size={30} rotate={String(rotate.current)} />
      </div>
      <ItemsWrapper open={open}>{renderedItems}</ItemsWrapper>
    </div>
  );
};

const ItemsWrapper = ({ children, open }: ItemsWrapperProps) => {
  return (
    <div
      role="listbox"
      className={`mx-[2px] my-0.5 rounded-b-[5px] transition-all bg-gray-700
      cursor-default duration-500 ease-in-out scrollbar-thumb-only 
      w-[calc(100% - 4px)] overflow-y-auto space-y-1 ${
        open ? "pb-1 max-h-35 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      {children}
    </div>
  );
};

const Item = ({ parName, parContent }: ItemProps) => {
  const [Hovering, setHovering] = useState(false);

  return (
    <div
      role="listitem"
      className={
        "px-2.5 py-1.5 flex space-x-1 w-full justify-between " +
        "items-center border-1 border-neutral-950 rounded-2xl " +
        "hover:border-neutral-200 transition-all duration-200"
      }
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Circle width={15} height={15} color={Hovering ? `#dd2286` : `#23d`} />
      <div
        className={
          "flex items-center font-bold uppercase pr-1.5 border-r-1 text-white transition-border duration-400 " +
          (Hovering ? "border-white" : "border-neutral-950")
        }
      >
        {parName}
      </div>
      <div className="grow-1 text-gray-50 text-end pl-3 ml-1">{parContent}</div>
    </div>
  );
};

export default DropDownInfo;
