import { useState } from "react";
import { ImageOff } from "lucide-react";

interface ImageUrlPreviewProps {
  url?: string;
  alt?: string;
}

export function ImageUrlPreview({
  url,
  alt = "Pré-visualização",
}: ImageUrlPreviewProps) {
  const [hasError, setHasError] = useState(false);

  if (!url) {
    return (
      <div className="h-40 w-40 rounded-xl border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center text-gray-400">
        <ImageOff className="h-8 w-8" />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="h-40 w-40 rounded-xl border border-dashed border-red-300 bg-red-50 flex flex-col items-center justify-center text-red-400 text-center px-2">
        <ImageOff className="h-8 w-8 mb-1" />
        <span className="text-xs">Não foi possível carregar a imagem</span>
      </div>
    );
  }

  return (
    <img
      src={url}
      alt={alt}
      onError={() => setHasError(true)}
      className="h-40 w-40 rounded-xl border border-gray-200 object-cover"
    />
  );
}
