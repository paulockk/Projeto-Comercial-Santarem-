import { useState, type KeyboardEvent } from "react";
import { X, Plus } from "lucide-react";

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export function TagInput({ value, onChange, placeholder }: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  function addTag() {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    if (value.includes(trimmed)) {
      setInputValue("");
      return;
    }
    onChange([...value, trimmed]);
    setInputValue("");
  }

  function removeTag(tag: string) {
    onChange(value.filter((t) => t !== tag));
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  }

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder ?? "Digite e pressione Enter"}
          className="input-field flex-1"
        />
        <button
          type="button"
          onClick={addTag}
          className="flex items-center justify-center px-4 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {value.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1.5 rounded-full bg-[#2E3192]/10 text-[#2E3192] px-3 py-1.5 text-sm font-semibold"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="hover:text-[#E30613]"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
