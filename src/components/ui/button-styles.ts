import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap border border-transparent px-6 text-lg font-semibold transition-[color,background-color,border-color] duration-200 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-blue text-ink hover:bg-blue-bright",
        outline: "border-line bg-transparent text-paper hover:border-blue-bright hover:bg-panel",
        ghost: "bg-transparent text-paper hover:bg-panel",
      },
      size: {
        default: "h-12 min-h-12",
        lg: "h-14 min-h-14 px-7",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
