import type { ReactNode } from "react";
import FaTriangle from "./SVGs/FaTriangle.tsx";
import { useState } from "react";

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

  {
    /*TODO: Add a animation for onMouseEnter;*/
    /*TODO: Make the border-underline-light appear after the wrapper is entirely visible;*/
  }
  return (
    <div className="bg-gray-700 border-4 border-zinc-950 inborder-dark z-0">
      <div
        role="button"
        className={`py-3 px-4 w-full flex justify-between items-center space-x-1 z-20 text-white cursor-pointer ${open && "border-underline-light"}`}
        onClick={() => setOpen(!open)}
        onMouseEnter={() => {}}
      >
        <span className="h-full text-center text-2xl">{triggerContent}</span>
        <FaTriangle size={30} />
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
