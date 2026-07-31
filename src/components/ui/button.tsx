import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[opacity,transform,background-color,color,border-color] duration-(--motion-fast) ease-(--ease-out) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-fg hover:bg-primary-hover shadow-soft",
        secondary:
          "bg-bg-elevated text-fg border border-border hover:border-border-strong hover:bg-bg",
        ghost: "bg-transparent text-fg hover:bg-bg-subtle",
        ink: "bg-bg-ink text-fg-on-ink hover:opacity-90",
        outlineInk:
          "border border-fg-on-ink/25 text-fg-on-ink hover:bg-fg-on-ink/10",
      },
      size: {
        sm: "h-9 px-3.5 text-sm rounded-sm",
        md: "h-11 px-5 text-sm rounded-md",
        lg: "h-12 px-6 text-base rounded-md",
        icon: "h-11 w-11 rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
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
