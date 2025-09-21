import { type VariantProps, cva } from "class-variance-authority";
import type { FC } from "react";
import { cn } from "../utils/helpers.ts";

const badgeVarients = cva(
  "inline-flex items-center rounded-md font-medium inset-ring",
  {
    variants: {
      variant: {
        default: "bg-gray-400/10 text-gray-400 inset-ring-gray-400/20",
        red: "bg-red-400/10 text-red-400 inset-ring-red-400/20",
        yellow: "bg-yellow-400/10 text-yellow-500 inset-ring-yellow-400/20",
        green: "bg-green-400/10 text-green-400 inset-ring-green-400/20",
        blue: "bg-blue-400/10 text-blue-400 inset-ring-blue-400/30",
        indigo: "bg-indigo-400/10 text-indigo-400 inset-ring-indigo-400/30",
        gray: "bg-gray-400/10 text-gray-400 inset-ring-gray-400/20",
      },
      size: {
        small: "px-2.5 py-0.5 text-xs h-8",
        medium: "px-3 py-1 text-sm h-10",
        large: "px-4 py-2 text-lg h-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "small",
    },
  },
);

interface BadgeProps extends VariantProps<typeof badgeVarients> {
  text: string;
}

const Badge: FC<BadgeProps> = ({ variant, size, text }) => {
  return <span className={cn(badgeVarients({ variant, size }))}>{text}</span>;
};

export { Badge, badgeVarients };
