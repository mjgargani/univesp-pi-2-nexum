import React from "react";

type ButtonStatus = "default" | "options" | "disabled";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  status?: ButtonStatus;
  icon?: React.ReactNode; 
  children: React.ReactNode;
}

const statusStyles: Record<ButtonStatus, string> = {
  default: "bg-[var(--brand)] text-[var(--text)]",
  options: "bg-[var(--brand)] text-[var(--text)]",
  disabled: "bg-[var(--brand)] text-[var(--text)] opacity-50 cursor-not-allowed",
};

export const Button: React.FC<ButtonProps> = ({
  status = "default",
  icon,
  children,
  className = "",
  ...props
}) => {
  const isDisabled = status === "disabled" || props.disabled;

  return (
    <button
      type="button"
      className={`
        flex items-center justify-center
        rounded-[8px]
        px-4 py-2
        border-none
        font-medium
        cursor-pointer
        ${statusStyles[status]}
        ${className}
      `}
      disabled={isDisabled}
      {...props}
    >
      {icon && (
        <span className="w-4 h-4 mr-2 flex items-center">{icon}</span>
      )}
      <span className="flex items-center">{children}</span>
    </button>
  );
};

export default Button;