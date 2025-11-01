import type { ReactNode, FC } from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "../utils/helpers.ts";
import { useState } from "react";

const extendButtonVariants = cva(
  "flex items-center justify-center transition-all duration-200 cursor-pointer",
  {
    variants: {
      color: {
        red: "bg-red-800",
        yellow: "bg-yellow-800",
        green: "bg-green-800",
        blue: "bg-blue-800",
        indigo: "bg-indigo-800",
        gray: "bg-gray-900",
      },
      extend_to: {
        left: "rounded-r-md",
        right: "rounded-l-md flex-row-reverse",
      },
    },
    defaultVariants: {
      color: "gray",
      extend_to: "left",
    },
  },
);

interface ExtendButtonProps extends VariantProps<typeof extendButtonVariants> {
  content?: ReactNode;
  className?: string;
  onClick?: () => void;
}

const ExtendButton: FC<ExtendButtonProps> = ({
  onClick,
  content,
  color,
  extend_to,
  className,
}) => {
  const [hovering, setHovering] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      role="button"
      onClick={onClick}
      className={` ${cn(extendButtonVariants({ color, extend_to }))} ${className}`}
    >
      <div
        className={
          (hovering ? "w-1.5" : "w-0") + " transition-[width] ease duration-150"
        }
      ></div>
      {content}
      <div
        className={
          (hovering ? "w-0" : "w-1.5") + " transition-[width] ease duration-150"
        }
      ></div>
    </div>
  );
};

export default ExtendButton;
