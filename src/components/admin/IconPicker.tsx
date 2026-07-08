import { AVAILABLE_ICONS } from "../../utils/iconMap";

interface IconPickerProps {
  value?: string;
  onChange: (iconName: string) => void;
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  return (
    <div className="grid grid-cols-6 sm:grid-cols-9 gap-2">
      {AVAILABLE_ICONS.map(({ name, Icon }) => {
        const isSelected = value === name;

        return (
          <button
            key={name}
            type="button"
            onClick={() => onChange(name)}
            title={name}
            className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-colors ${
              isSelected
                ? "border-[#2E3192] bg-[#2E3192] text-white"
                : "border-gray-200 bg-white text-gray-500 hover:border-[#2E3192] hover:text-[#2E3192]"
            }`}
          >
            <Icon className="h-5 w-5" />
          </button>
        );
      })}
    </div>
  );
}
