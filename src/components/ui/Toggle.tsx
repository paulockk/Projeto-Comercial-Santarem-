interface ToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function Toggle({ label, description, checked, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors ${
        checked
          ? "border-green-200 bg-green-50"
          : "border-gray-200 bg-white hover:bg-gray-50"
      }`}
    >
      <span className="relative inline-flex items-center shrink-0 mt-0.5">
        <span
          className={`h-6 w-11 rounded-full transition-colors duration-200 ${checked ? "bg-green-500" : "bg-gray-300"}`}
        />
        <span
          className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </span>

      <span>
        <span
          className={`block text-sm font-bold ${checked ? "text-green-700" : "text-gray-800"}`}
        >
          {label}
        </span>
        {description && (
          <span
            className={`block text-xs mt-0.5 ${checked ? "text-green-600" : "text-gray-400"}`}
          >
            {description}
          </span>
        )}
      </span>
    </button>
  );
}
