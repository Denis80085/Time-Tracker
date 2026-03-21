import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "../utils/helpers.ts";
import { type FC, useEffect } from "react";
import { useCycleWheelView } from "../hooks/useWheelView.ts";

const WheelSelectVarients = cva(
  "grid grid-cols-1 overflow-auto px-2 py-1 text-center place-items-center",
  {
    variants: {
      text_color: {
        default: "text-white",
        gray: "text-gray-900",
        yellow: "text-yellow-400",
        blue: "text-blue-500",
        light: "text-neutral-100",
        green: "text-green-300",
      },
      size: {
        xl: "text-xl",
        lg: "text-lg",
        md: "text-md",
        sm: "text-sm",
      },
    },
    defaultVariants: {
      text_color: "default",
      size: "xl",
    },
  },
);

type WheelSelectOption = {
  label: string;
  value: any;
  index: number;
};

interface WheelSelectProps extends VariantProps<typeof WheelSelectVarients> {
  options: Array<WheelSelectOption>;
  displayAtOnce: number;
  selected?: number;
  selectionChanged?: (i?: WheelSelectOption) => void;
}

const WheelSelect: FC<WheelSelectProps> = ({
  text_color,
  size,
  options,
  displayAtOnce,
  selected,
  selectionChanged,
}) => {
  const [itemsWindow, selectedItem, next, prev, select] = useCycleWheelView(
    options,
    displayAtOnce,
  );

  useEffect(() => {
    if (selected != null) select(selected);
  }, [options, selected]);

  useEffect(() => {
    if (!selectedItem || !selectionChanged) return;

    selectionChanged({
      label: selectedItem.content.label,
      value: selectedItem.content.value,
      index: selectedItem.content.index,
    });
  }, [selectedItem]);

  const textColor_inBorder = {
    default: "inborder-light",
    gray: "inborder-gray",
    yellow: "inborder-yellow",
    blue: "inborder-blue",
    light: "inborder-light",
    green: "inborder-green",
  };

  return (
    <div
      onWheel={async (e) => {
        if (e.deltaY > 0) next();
        else prev();
        //TODO: implement scrolling with request frame animation
      }}
      className={`${cn(WheelSelectVarients({ text_color, size }))} border-none`}
    >
      {itemsWindow.map((option, index) => (
        <div
          className="relative m-0 cursor-pointer transition-transform duration-24 hover:scale-105"
          key={index}
          style={{
            width: `${option.scale}%`,
          }}
          onClick={() => {
            select(options.indexOf(option.content));
          }}
        >
          <p
            style={{
              fontSize: `${option.scale}%`,
            }}
            className={`z-100 py-2.5 size-full ${option.isSelected ? "" : "border-underline-light"}`}
          >
            {option.content.label}
          </p>
          <div
            className={`z-0 absolute w-full h-[90%] left-0 top-[5%] ${option.isSelected && text_color ? textColor_inBorder[text_color] : "border-l border-r"} bg-green-200/10`}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default WheelSelect;
