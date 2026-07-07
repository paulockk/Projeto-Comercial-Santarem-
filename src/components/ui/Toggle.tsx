import { forwardRef } from "react";

interface ToggleProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ label, description, ...props }, ref) => {
    return (
      <label className="flex items-start gap-3 cursor-pointer select-none group">
        <span className="relative inline-flex items-center shrink-0 mt-0.5">
          <input
            ref={ref}
            type="checkbox"
            className="peer sr-only"
            {...props}
          />
          <span className="h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-primary-600 transition-colors duration-200" />
          <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 peer-checked:translate-x-5" />
        </span>
        <span>
          <span className="block text-sm font-medium text-gray-800 group-hover:text-gray-900">
            {label}
          </span>
          {description && (
            <span className="block text-xs text-gray-400 mt-0.5">
              {description}
            </span>
          )}
        </span>
      </label>
    );
  },
);

Toggle.displayName = "Toggle";
