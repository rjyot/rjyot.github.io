"use client";

import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import { buttonVariants, type ButtonVariantProps } from "@/components/ui/button-styles";
import { cn } from "@/lib/utils";

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  ButtonVariantProps & {
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
