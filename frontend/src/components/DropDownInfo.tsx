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

  return (
    <div className="px-4 py-3 bg-gray-700 border-4 border-zinc-950 cursor-pointer inborder-dark z-0">
      <div
        role="button"
        className={
          "w-full flex justify-between items-center space-x-1 z-20 text-white"
        }
        onClick={() => setOpen(!open)}
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
      className={`transition-all cursor-default duration-500 ease-in-out scrollbar-thumb-only w-full overflow-auto ${
        open ? "max-h-35 opacity-100" : "max-h-0 opacity-0"
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
