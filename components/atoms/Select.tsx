import { forwardRef, SelectHTMLAttributes } from "react";

import Icon from "@/components/atoms/Icon";
import { cn } from "@/lib/utils";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div className="group relative">
        <select
          ref={ref}
          className={cn(
            "ui-input w-full cursor-pointer appearance-none rounded-2xl px-6 py-4 pr-14 font-bold text-on-surface outline-none transition-all",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <Icon
          name="expand_more"
          className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors group-hover:text-primary"
        />
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
