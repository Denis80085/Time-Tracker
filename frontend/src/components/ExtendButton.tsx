import type { ReactNode, FC } from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "../utils/helpers.ts";

const extendButtonVariants = cva("flex items-center justify-center", {
  variants: {
    color: {
      red: "bg-red-400/10 text-red-400",
      yellow: "bg-yellow-400/10 text-yellow-500",
      green: "bg-green-400/10 text-green-400",
      blue: "bg-blue-400/10 text-blue-400",
      indigo: "bg-indigo-400/10 text-indigo-400",
      gray: "bg-gray-400/10 text-gray-400",
    },
    extend_to: {
      right: "",
      left: "",
    },
  },
  defaultVariants: {
    color: "red",
    extend_to: "left",
  },
});

interface ExtendButtonProps extends VariantProps<typeof extendButtonVariants> {
  content?: ReactNode;
  className?: string;
}

const ExtendButton: FC<ExtendButtonProps> = ({
  content,
  color,
  extend_to,
  className,
}) => {
  return (
    <div
      role="button"
      className={`${cn(extendButtonVariants({ color, extend_to }))} ${className}`}
    >
      {content}
    </div>
  );
};

export default ExtendButton;
