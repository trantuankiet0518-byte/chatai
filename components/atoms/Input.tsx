import { InputHTMLAttributes, forwardRef } from "react";

import Icon from "./Icon";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
  error?: boolean;
}

const InputBase = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, error, className, ...props }, ref) => {
    return (
      <div className="relative">
        {icon ? (
          <Icon
            aria-hidden="true"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40 text-lg pointer-events-none"
            name={icon}
          />
        ) : null}
        <input
          ref={ref}
          aria-invalid={error || undefined}
          className={cn(
            "w-full rounded-lg bg-surface-container-lowest py-3 text-on-surface transition-all placeholder:text-on-surface-variant/30 focus:outline-none focus:ring-1",
            error
              ? "border border-error/50 focus:ring-error/40"
              : "border border-transparent focus:ring-primary/40",
            icon ? "pl-11 pr-4" : "px-4",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

InputBase.displayName = "Input";

export default InputBase;
