import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export const CodeArea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    spellCheck={false}
    className={cn(
      "h-full w-full resize-none rounded-lg border border-forge-border bg-forge-bg/60 p-3.5 font-mono text-[13px] leading-relaxed text-forge-text placeholder:text-forge-faint outline-none transition-colors focus:border-ember-600/60",
      className
    )}
    {...props}
  />
));
CodeArea.displayName = "CodeArea";
