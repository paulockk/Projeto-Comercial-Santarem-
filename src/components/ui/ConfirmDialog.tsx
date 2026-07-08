import { AlertTriangle, X } from "lucide-react";

interface ConfirmDialogProps {
  title: string;
  description: string;
  isOpen: boolean;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  title,
  description,
  isOpen,
  isLoading,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 animate-fade-in"
        onClick={onCancel}
      />

      <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl animate-fade-in">
        <button
          onClick={onCancel}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-50 text-accent-600">
          <AlertTriangle className="h-6 w-6" />
        </div>

        <h3 className="mt-4 text-lg font-extrabold text-gray-900">{title}</h3>
        <p className="mt-1.5 text-sm text-gray-500">{description}</p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            className="btn-secondary flex-1"
            disabled={isLoading}
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 rounded-xl bg-[#E30613] px-5 py-2.5 font-bold text-white transition hover:bg-accent-600 disabled:opacity-50"
          >
            {isLoading ? "Excluindo..." : "Excluir"}
          </button>
        </div>
      </div>
    </div>
  );
}
