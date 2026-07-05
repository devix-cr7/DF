import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "secondary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2 rounded-lg font-medium transition-all duration-200 active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none",
          size === "sm" ? "px-2.5 py-1.5 text-xs" : "px-3.5 py-2 text-sm",
          variant === "primary" &&
            "bg-forge-gradient text-forge-bg shadow-glow hover:brightness-110",
          variant === "secondary" &&
            "bg-forge-panel2 text-forge-text border border-forge-border hover:border-forge-borderHi hover:bg-forge-panel2/80",
          variant === "ghost" &&
            "text-forge-muted hover:text-forge-text hover:bg-forge-panel2",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
