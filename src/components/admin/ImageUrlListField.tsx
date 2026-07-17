import { useState } from "react";
import { X, Plus, ArrowUp, ArrowDown } from "lucide-react";
import { ImageUploadField } from "./ImageUploadField";

interface ImageUrlListFieldProps {
  value: string[];
  onChange: (urls: string[]) => void;
}

export function ImageUrlListField({ value, onChange }: ImageUrlListFieldProps) {
  const [inputValue, setInputValue] = useState("");

  function addUrl() {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    onChange([...value, trimmed]);
    setInputValue("");
  }

  function removeUrl(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  function moveUrl(index: number, direction: -1 | 1) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= value.length) return;
    const updated = [...value];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    onChange(updated);
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addUrl();
            }
          }}
          placeholder="https://exemplo.com/foto.jpg"
          className="input-field flex-1"
        />
        <button
          type="button"
          onClick={addUrl}
          className="flex items-center justify-center px-4 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <ImageUploadField
        onUploaded={(url: string) => onChange([...value, url])}
      />

      {value.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {value.map((url, index) => (
            <div
              key={`${url}-${index}`}
              className="group relative overflow-hidden rounded-xl border border-gray-200"
            >
              <img
                src={url}
                alt={`Imagem ${index + 1}`}
                className="h-28 w-full bg-gray-50 object-cover"
              />

              {index === 0 && (
                <span className="absolute left-2 top-2 rounded-full bg-[#2E3192] px-2 py-0.5 text-[10px] font-bold text-white">
                  Principal
                </span>
              )}

              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/50 px-2 py-1 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => moveUrl(index, -1)}
                    disabled={index === 0}
                    className="text-white disabled:opacity-30"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveUrl(index, 1)}
                    disabled={index === value.length - 1}
                    className="text-white disabled:opacity-30"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeUrl(index)}
                  className="text-white hover:text-red-400"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-gray-400">
          Nenhuma imagem adicionada ainda.
        </p>
      )}

      <p className="text-xs text-gray-400">
        A primeira imagem (marcada como "Principal") é a que aparece nos cards
        do catálogo. Use as setas para reordenar.
      </p>
    </div>
  );
}
