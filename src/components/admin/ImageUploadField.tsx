import { useState, useRef } from "react";
import { Upload, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import {
  uploadImage,
  CloudinaryUploadError,
} from "../../services/cloudinary.service";

interface ImageUploadFieldProps {
  onUploaded: (url: string) => void;
}

export function ImageUploadField({ onUploaded }: ImageUploadFieldProps) {
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const { url } = await uploadImage(file);
      onUploaded(url);
      toast.success("Imagem enviada com sucesso!");
    } catch (err) {
      const message =
        err instanceof CloudinaryUploadError
          ? err.message
          : "Erro ao enviar imagem.";
      toast.error(message);
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="image-upload-input"
      />
      <label
        htmlFor="image-upload-input"
        className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 px-4 py-3 text-sm font-semibold text-gray-600 hover:border-[#2E3192] hover:text-[#2E3192] cursor-pointer transition-colors"
      >
        {isUploading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Upload className="h-4 w-4" />
            Ou envie um arquivo do seu dispositivo
          </>
        )}
      </label>
    </div>
  );
}
