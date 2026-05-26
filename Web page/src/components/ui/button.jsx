
import { cva } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-slate-900 text-white hover:bg-slate-800",

        outline:
          "border border-slate-300 bg-white hover:bg-slate-100",

        secondary:
          "bg-slate-100 text-slate-900 hover:bg-slate-200",

        ghost:
          "hover:bg-slate-100",

        destructive:
          "bg-red-500 text-white hover:bg-red-600",

        link:
          "text-slate-900 underline-offset-4 hover:underline",
      },

      size: {
        default: "h-10 px-4 py-2",

        sm: "h-8 px-3 text-xs",

        lg: "h-12 px-6",

        icon: "h-10 w-10",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(
        buttonVariants({
          variant,
          size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

export { Button, buttonVariants };



