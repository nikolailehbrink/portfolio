import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
  `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full
  border-2 font-bold ring-offset-background transition-colors
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
  focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`,
  {
    variants: {
      variant: {
        default: [
          `border-sky-400 bg-sky-500 text-blue-950 shadow-sky-300
          hover:bg-sky-400`,
        ],
        secondary: [
          `border-orange-400 bg-orange-500 text-orange-950 shadow-orange-300
          hover:bg-orange-400`,
        ],
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: [
          `border-input bg-background hover:bg-accent
          hover:text-accent-foreground`,
        ],
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "px-5 py-2",
        sm: "h-10 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "size-10 rounded-lg",
        shadow: "px-5 py-2 shadow-[4px_4px_0_0_rgba(0,0,0,0.3)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
