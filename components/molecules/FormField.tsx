import { InputHTMLAttributes } from "react";

import Input from "@/components/atoms/Input";
import Icon from "@/components/atoms/Icon";
import { cn } from "@/lib/utils";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: string;
  icon?: string;
}

export default function FormField({ label, name, error, icon, className = "", ...props }: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", error && "data-[invalid=true]:text-error")} data-invalid={!!error}>
      <label
        htmlFor={name}
        className="text-[0.6875rem] font-semibold tracking-[0.05em] uppercase text-primary/80"
      >
        {label}
      </label>
      <Input
        id={name}
        name={name}
        icon={icon}
        error={!!error}
        className={className}
        {...props}
      />
      {error && (
        <p className="flex items-center gap-1 text-xs text-error">
          <Icon name="error" className="text-sm" />
          {error}
        </p>
      )}
    </div>
  );
}
