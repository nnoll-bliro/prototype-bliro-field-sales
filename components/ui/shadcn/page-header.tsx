import * as React from "react";

import { cn } from "@/libs/utils";

const PageHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col justify-between gap-4 sm:flex-row sm:items-start",
      className,
    )}
    {...props}
  />
));
PageHeader.displayName = "PageHeader";

const PageHeaderContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("min-w-0 space-y-1", className)} {...props} />
));
PageHeaderContent.displayName = "PageHeaderContent";

const PageEyebrow = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-sm font-bold uppercase leading-5 tracking-[0.04em] text-muted-foreground",
      className,
    )}
    {...props}
  />
));
PageEyebrow.displayName = "PageEyebrow";

const PageTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-9 tracking-[-0.03rem] text-heading",
      className,
    )}
    {...props}
  />
));
PageTitle.displayName = "PageTitle";

const PageDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "max-w-2xl text-base leading-6 text-muted-foreground",
      className,
    )}
    {...props}
  />
));
PageDescription.displayName = "PageDescription";

const PageActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex shrink-0 items-center gap-2", className)}
    {...props}
  />
));
PageActions.displayName = "PageActions";

export {
  PageActions,
  PageDescription,
  PageEyebrow,
  PageHeader,
  PageHeaderContent,
  PageTitle,
};
