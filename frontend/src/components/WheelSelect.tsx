import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "../utils/helpers.ts";
import { type FC } from "react";
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

interface WheelSelectProps extends VariantProps<typeof WheelSelectVarients> {
  options: Array<string>;
  displayAtOnce: number;
}

const WheelSelect: FC<WheelSelectProps> = ({
  text_color,
  size,
  options,
  displayAtOnce,
}) => {
  const [itemsWindow, next, prev] = useCycleWheelView(options, displayAtOnce);

  return (
    <div
      onWheel={(e) => {
        if (e.deltaY > 0) next();
        else prev();
        //TODO: implement scrolling with request frame animation
      }}
      className={`${cn(WheelSelectVarients({ text_color, size }))} border-none`}
    >
      {itemsWindow.map((option, index) => (
        <span
          style={{
            width: `${option.scale}%`,
            fontSize: `${option.scale}%`,
          }}
          className={`relative m-0 py-1.5 border-underline-light transition-all cursor-pointer duration-150 hover:scale-105`}
          key={index}
        >
          <div className="absolute w-full h-[90%] left-0 top-[5%] border-l border-r bg-green-200/10"></div>
          {option.content}
        </span>
      ))}
    </div>
  );
};

export default WheelSelect;
