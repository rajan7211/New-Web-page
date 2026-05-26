
import { cva } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-slate-900 text-white",

        secondary: "bg-slate-100 text-slate-900",

        destructive: "bg-red-100 text-red-600",

        outline: "border border-slate-300 text-slate-900",

        ghost: "hover:bg-slate-100 text-slate-900",

        link: "text-slate-900 underline-offset-4 hover:underline",
      },
    },

    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  children,
  ...props
}) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      className={cn(
        badgeVariants({
          variant,
        }),
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

export { Badge, badgeVariants };


