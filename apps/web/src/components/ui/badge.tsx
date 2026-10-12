import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "default"
  | "secondary"
  | "outline"
  | "success"
  | "warning"
  | "destructive"
  | "purple";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "bg-violet-100 text-violet-800 border-transparent dark:bg-violet-950 dark:text-violet-300",
  secondary:
    "bg-slate-100 text-slate-800 border-transparent dark:bg-slate-800 dark:text-slate-200",
  outline:
    "bg-transparent text-slate-700 border-slate-300 dark:border-slate-700 dark:text-slate-300",
  success:
    "bg-emerald-100 text-emerald-800 border-transparent dark:bg-emerald-950 dark:text-emerald-300",
  warning:
    "bg-amber-100 text-amber-800 border-transparent dark:bg-amber-950 dark:text-amber-300",
  destructive:
    "bg-rose-100 text-rose-800 border-transparent dark:bg-rose-950 dark:text-rose-300",
  purple:
    "bg-violet-600 text-white border-transparent",
};

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "default",
  children,
  ...props
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
