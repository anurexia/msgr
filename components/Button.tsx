"use client";

import clsx from "clsx";

interface ButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type,
  children,
  onClick,
  fullWidth,
  secondary,
  danger,
  disabled,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        `flex justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-lg transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`,
        disabled && "cursor-default opacity-50",
        fullWidth && "w-full",
        secondary ? "text-neutral-900" : "text-neutral-50",
        danger && "bg-red-500 hover:bg-red-600 focus-visible:outline-red-600",
        !danger &&
          !secondary &&
          "bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600",
      )}
    >
      {children}
    </button>
  );
};
export default Button;
