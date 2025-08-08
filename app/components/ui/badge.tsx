import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  `inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden
  rounded-md border px-1.5 py-1 text-xs whitespace-nowrap transition-colors
  focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50
  aria-invalid:border-destructive aria-invalid:ring-destructive/20
  dark:aria-invalid:ring-destructive/40`,
  {
    defaultVariants: {
      variant: "default",
    },
    variants: {
      variant: {
        default: `border-transparent bg-primary text-primary-foreground
        [a&,button&]:hover:bg-primary/75`,
        destructive: `border-transparent bg-destructive text-white
        focus-visible:ring-destructive/20 dark:bg-destructive/60
        dark:focus-visible:ring-destructive/40 [a&]:hover:bg-destructive/90`,
        outline: `text-foreground [a&]:hover:bg-accent
        [a&]:hover:text-accent-foreground`,
        secondary: `border-transparent bg-secondary text-secondary-foreground
        [a&,button&]:hover:bg-secondary/40`,
      },
    },
  },
);

function Badge({
  asChild = false,
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      className={cn(badgeVariants({ variant }), className)}
      data-slot="badge"
      {...props}
    />
  );
}

export { Badge };
