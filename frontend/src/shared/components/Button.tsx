import React from "react";

type ButtonVariant = "primary" | "ghost";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  const classes = ["btn", variant, className].filter(Boolean).join(" ");
  return <button className={classes} {...props} />;
}
