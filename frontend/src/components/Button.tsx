import { type VariantProps, cva } from "class-variance-authority";
import type { FC, HTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/helpers.ts";

const ButtonVariants = cva(
  "flex items-center justify-center rounded-md font-medium text-white cursor-pointer transition-colors duration-150 ",
  {
    variants: {
      variant: {
        default:
          "bg-gray-400/10 text-gray-400 hover:bg-gray-400 hover:text-gray-950",
        red: "bg-red-300/10 text-red-300 hover:bg-red-400 hover:text-red-950",
        yellow:
          "bg-yellow-400/10 text-yellow-500 hover:bg-yellow-400 hover:text-yellow-950",
        green:
          "bg-green-200/10 text-green-300 hover:bg-green-400 hover:text-green-950",
        blue: "bg-blue-400/10 text-blue-400 hover:bg-blue-400 hover:text-blue-950",
        indigo:
          "bg-indigo-400/10 text-indigo-400 hover:bg-indigo-400 hover:text-indigo-950",
        gray: "bg-gray-400/10 text-gray-400 hover:bg-gray-400 hover:text-gray-950",
      },
      size: {
        small: "px-2.5 py-1 text-xs h-8 ",
        medium: "px-3 py-1.5 text-sm h-10 ",
        large: "px-4 py-2.5 text-lg h-12 ",
        huge: "px-5 py-3 text-xl h-14 ",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "small",
    },
  },
);

interface ButtonProps
  extends VariantProps<typeof ButtonVariants>,
    HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

const Button: FC<ButtonProps> = ({
  variant,
  size,
  children,
  className,
  ...props
}) => {
  return (
    <button
      role={"button"}
      className={`w-fit h-fit inline-flex items-center justify-center ${cn(ButtonVariants({ variant, size, className }))}`}
      {...props}
    >
      {children ?? children}
    </button>
  );
};

export default Button;
