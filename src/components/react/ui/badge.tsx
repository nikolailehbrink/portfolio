import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  `inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden
  rounded-md border px-1.5 py-1 text-xs whitespace-nowrap transition-colors
  focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50
  aria-invalid:border-destructive aria-invalid:ring-destructive/20
  dark:aria-invalid:ring-destructive/40`,
  {
    variants: {
      variant: {
        default: `border-transparent bg-primary text-primary-foreground
        [a&,button&]:hover:bg-primary/75`,
        secondary: `border-transparent bg-secondary text-secondary-foreground
        [a&,button&]:hover:bg-secondary/40`,
        destructive: `border-transparent bg-destructive text-white
        focus-visible:ring-destructive/20 dark:bg-destructive/60
        dark:focus-visible:ring-destructive/40 [a&]:hover:bg-destructive/90`,
        outline: `text-foreground [a&]:hover:bg-accent
        [a&]:hover:text-accent-foreground`,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
