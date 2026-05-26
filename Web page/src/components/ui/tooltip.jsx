import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

function TooltipProvider({
  delayDuration = 0,
  skipDelayDuration = 300,
  ...props
}) {
  return (
    <TooltipPrimitive.Provider
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
      {...props}
    />
  );
}

function Tooltip(props) {
  return <TooltipPrimitive.Root {...props} />;
}

const TooltipTrigger = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <TooltipPrimitive.Trigger
        ref={ref}
        className={cn(className)}
        {...props}
      />
    );
  }
);
TooltipTrigger.displayName = TooltipPrimitive.Trigger.displayName;


const TooltipContent = React.forwardRef(
  (
    {
      className,
      sideOffset = 6,
      align = "center",
      ...props
    },
    ref
  ) => {
    return (
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          ref={ref}
          sideOffset={sideOffset}
          align={align}
          className={cn(
            "z-50 overflow-hidden rounded-md bg-foreground px-3 py-1.5 text-xs text-background shadow-md",
            "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            "data-[side=bottom]:slide-in-from-top-2",
            "data-[side=left]:slide-in-from-right-2",
            "data-[side=right]:slide-in-from-left-2",
            "data-[side=top]:slide-in-from-bottom-2",
            className
          )}
          {...props}
        >
          {props.children}

          <TooltipPrimitive.Arrow
            className="fill-foreground"
            width={10}
            height={6}
          />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    );
  }
);

TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
};











