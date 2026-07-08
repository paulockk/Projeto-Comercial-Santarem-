import { forwardRef, useState, useEffect } from "react";

interface ToggleProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  (
    { label, description, checked, defaultChecked, onChange, ...props },
    ref,
  ) => {
    const [isChecked, setIsChecked] = useState(!!defaultChecked || !!checked);

    useEffect(() => {
      if (checked !== undefined) setIsChecked(checked);
    }, [checked]);

    return (
      <label
        className={`flex items-start gap-3 cursor-pointer select-none rounded-xl border p-4 transition-colors ${
          isChecked
            ? "border-green-200 bg-green-50"
            : "border-gray-200 bg-white hover:bg-gray-50"
        }`}
      >
        <span className="relative inline-flex items-center shrink-0 mt-0.5">
          <input
            ref={ref}
            type="checkbox"
            className="peer sr-only"
            checked={checked}
            defaultChecked={defaultChecked}
            onChange={(e) => {
              setIsChecked(e.target.checked);
              onChange?.(e);
            }}
            {...props}
          />
          <span className="h-6 w-11 rounded-full bg-gray-300 peer-checked:bg-green-500 transition-colors duration-200" />
          <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 peer-checked:translate-x-5" />
        </span>

        <span>
          <span
            className={`block text-sm font-bold ${isChecked ? "text-green-700" : "text-gray-800"}`}
          >
            {label}
          </span>
          {description && (
            <span
              className={`block text-xs mt-0.5 ${isChecked ? "text-green-600" : "text-gray-400"}`}
            >
              {description}
            </span>
          )}
        </span>
      </label>
    );
  },
);

Toggle.displayName = "Toggle";
