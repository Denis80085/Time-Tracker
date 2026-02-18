import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "../utils/helpers.ts";
import { type FC } from "react";
import { useCycleWheelView } from "../hooks/useWheelView.ts";

const WheelSelectVarients = cva(
  "flex flex-col items-center justify-center overflow-auto gap-2",
  {
    variants: {
      variant: {
        default: "",
      },
      type: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
      type: "default",
    },
  },
);

interface WheelSelectProps extends VariantProps<typeof WheelSelectVarients> {
  options: Array<string>;
  displayAtOnce: number;
}

const WheelSelect: FC<WheelSelectProps> = ({
  variant,
  type,
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
      className={`${cn(WheelSelectVarients({ variant, type }))}`}
    >
      {itemsWindow.map((option, index) => (
        <span key={index} className="text-xl">
          {option}
        </span>
      ))}
    </div>
  );
};

export default WheelSelect;
