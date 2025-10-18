import { type ReactNode, useEffect } from "react";
import FaTriangle from "./SVGs/FaTriangle.tsx";
import { useState, useRef } from "react";

type DropDownInfoProps = {
  triggerContent: string;
  items?: ItemProps[];
};

type ItemsWrapperProps = {
  children?: ReactNode;
  open: boolean;
};

type ItemProps = {
  parName: string;
  parContent: string;
};

const DropDownInfo = ({ triggerContent, items }: DropDownInfoProps) => {
  const [open, setOpen] = useState(false);
  const rotate = useRef(0);
  const [Hovering, setHovering] = useState(false);

  const HandelClick = () => {
    setOpen(!open);
    open ? (rotate.current = 0) : (rotate.current = 90);
  };

  useEffect(() => {
    Hovering
      ? (rotate.current = open ? 90 : 0)
      : (rotate.current = open ? -45 : 135);
  }, [Hovering]);

  {
    /*TODO: Add a animation for onMouseEnter;*/
  }
  return (
    <div className="bg-gray-700 border-4 border-zinc-950 inborder-dark z-0">
      <div
        role="button"
        className={`py-3 px-4 w-full flex justify-between items-center space-x-1 text-white cursor-pointer
                    ${open && "border-underline-light"}`}
        onClick={HandelClick}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <span className="h-full text-center text-2xl">{triggerContent}</span>
        <FaTriangle size={30} rotate={String(rotate.current)} />
      </div>
      <ItemsWrapper open={open}>
        {items?.map((item, index) => (
          <Item
            key={index}
            parName={item.parName}
            parContent={item.parContent}
          />
        ))}
      </ItemsWrapper>
    </div>
  );
};

const ItemsWrapper = ({ children, open }: ItemsWrapperProps) => {
  return (
    <div
      className={`px-4 transition-all cursor-default duration-500 ease-in-out scrollbar-thumb-only w-full overflow-auto ${
        open ? "pb-2 max-h-35 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      {children}
    </div>
  );
};

const Item = ({ parName, parContent }: ItemProps) => {
  return (
    <div>
      <span>{parName}</span>
      <span>{parContent}</span>
    </div>
  );
};

export default DropDownInfo;
