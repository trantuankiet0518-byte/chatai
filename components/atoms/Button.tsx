import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";

import Icon from "./Icon";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: string;
  iconPosition?: "left" | "right";
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-button-gradient text-on-primary font-bold hover:brightness-110 shadow-lg shadow-primary-container/10",
  secondary:
    "bg-surface-container-high text-on-surface hover:bg-surface-bright",
  ghost:
    "bg-transparent text-primary hover:bg-surface-container-high",
  danger:
    "bg-error-container text-on-error-container hover:brightness-110",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      icon,
      iconPosition = "right",
      children,
      className,
      type = "button",
      ...props
    },
    ref
  ) => {
    const iconNode = icon ? <Icon className="text-[1.1rem]" name={icon} /> : null;

    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {iconPosition === "left" ? iconNode : null}
        {children}
        {iconPosition === "right" ? iconNode : null}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
