import * as React from "react";

import { cn } from "@/libs/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex min-h-12 w-full rounded-lg border border-input bg-background px-4 py-2 text-base text-foreground transition-colors file:border-0 file:bg-transparent file:text-base file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:bg-secondary/50 disabled:opacity-60",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
