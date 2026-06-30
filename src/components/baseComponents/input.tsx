import { forwardRef } from "react";
import type { JSX, ComponentPropsWithoutRef } from "react";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  label?: string;
  error?: string;
  containerClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, containerClassName = "", className = "", id, ...props }, ref): JSX.Element => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    const baseStyles = `
      w-full px-4 py-3 rounded-xl border text-sm font-medium
      outline-none transition-all duration-300 ease-in-out
      bg-gray-50 border-gray-200 text-gray-900
      focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-500/10
      dark:bg-slate-800 dark:border-slate-700 dark:text-gray-100
      dark:focus:border-teal-400 dark:focus:bg-slate-900 dark:focus:ring-teal-400/10
    `;

    const errorStyles = error
      ? "border-red-500 focus:border-red-500 focus:ring-red-500/10 dark:border-red-500 dark:focus:border-red-500"
      : "";

    return (
      <div className={`flex flex-col gap-2 w-full ${containerClassName}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-semibold text-gray-700 dark:text-gray-300 select-none"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={`${baseStyles} ${errorStyles} ${className}`}
          {...props}
        />
        {error && (
          <span className="text-xs font-medium text-red-500">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;