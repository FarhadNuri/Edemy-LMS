import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  helperText?: string;
};

export function Input({
  label,
  error,
  helperText,
  id,
  className = "",
  disabled,
  ...props
}: InputProps) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-ink mb-1.5">
          {label}
        </label>
      )}

      <input
        id={inputId}
        disabled={disabled}
        className={`w-full rounded-md border bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:bg-slate-50 disabled:text-muted disabled:cursor-not-allowed ${
          error
            ? "border-danger focus-visible:ring-danger"
            : "border-border focus-visible:ring-primary"
        } ${className}`}
        {...props}
      />

      {error ? (
        <p className="mt-1 text-xs text-danger">{error}</p>
      ) : helperText ? (
        <p className="mt-1 text-xs text-muted">{helperText}</p>
      ) : null}
    </div>
  );
}

