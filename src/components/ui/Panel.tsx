import { type HTMLAttributes, type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "../../lib/utils";

export function Panel({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl border border-forge-border bg-forge-panel/80 shadow-panel backdrop-blur-sm transition-[border-color,box-shadow] duration-300",
        "hover:border-ember-600/30 hover:shadow-[0_0_0_1px_rgba(217,123,43,0.08),0_8px_24px_-12px_rgba(0,0,0,0.5)]",
        className
      )}
      {...props}
    />
  );
}

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  label: string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, active, label, ...props }, ref) => (
    <button
      ref={ref}
      aria-label={label}
      title={label}
      className={cn(
        "grid h-8 w-8 place-items-center rounded-lg text-forge-muted transition-all duration-200 hover:text-forge-text hover:bg-forge-panel2 active:scale-90 disabled:opacity-30 disabled:pointer-events-none",
        active && "text-ember-400 bg-forge-panel2",
        className
      )}
      {...props}
    />
  )
);
IconButton.displayName = "IconButton";
