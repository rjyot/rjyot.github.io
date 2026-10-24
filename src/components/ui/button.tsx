"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap border border-transparent px-6 text-lg font-semibold transition-colors focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-blue-bright disabled:pointer-events-none disabled:opacity-50",
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

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";
  const typeProps = asChild ? {} : { type: props.type ?? "button" };

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...typeProps}
      {...props}
    />
  );
}

export { Button, buttonVariants };
