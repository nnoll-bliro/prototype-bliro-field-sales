"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/libs/utils";

const LoadingSpinner = () => (
  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold tracking-[-0.02em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary/85 text-primary-foreground hover:bg-primary/75 active:bg-primary/65",
        primary:
          "bg-primary/85 text-primary-foreground hover:bg-primary/75 active:bg-primary/65",
        destructive:
          "bg-destructive-subtle text-destructive-foreground hover:bg-destructive-subtle/70",
        outline:
          "border border-input bg-background text-foreground hover:border-muted-foreground hover:bg-muted",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-border active:bg-input/70",
        ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
        link: "h-auto rounded-none p-0 text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "min-h-12 px-5 text-base",
        sm: "min-h-11 px-4 text-sm",
        md: "min-h-12 px-5 text-base",
        lg: "min-h-14 px-6 text-base",
        icon: "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
      loading?: boolean;
      icon?: React.ElementType<{ className?: string }>;
    }
>(
  (
    {
      className,
      variant,
      size = "default",
      asChild = false,
      loading = false,
      icon: Icon,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = loading || props.disabled;

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          isDisabled && "cursor-not-allowed opacity-50",
        )}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...props}
        aria-disabled={isDisabled || undefined}
        disabled={asChild ? undefined : isDisabled}
        tabIndex={asChild && isDisabled ? -1 : props.tabIndex}
        onClick={(event) => {
          if (isDisabled) {
            event.preventDefault();
            event.stopPropagation();
            return;
          }
          props.onClick?.(event);
        }}
      >
        {loading ? (
          <>
            <LoadingSpinner />
            {children}
          </>
        ) : (
          <>
            {Icon && <Icon className="size-5" aria-hidden="true" />}
            {children}
          </>
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
