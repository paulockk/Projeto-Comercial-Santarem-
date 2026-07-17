import {
  CLOUDINARY_CONFIG,
  MAX_IMAGE_SIZE_BYTES,
  ALLOWED_IMAGE_TYPES,
} from "../constants/cloudinary";

export class CloudinaryUploadError extends Error {}

function validateImageFile(file: File): void {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new CloudinaryUploadError(
      "Formato não permitido. Use JPEG, PNG ou WEBP.",
    );
  }
  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    throw new CloudinaryUploadError("A imagem deve ter no máximo 5MB.");
  }
}

export async function uploadImage(file: File): Promise<{ url: string }> {
  validateImageFile(file);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_CONFIG.uploadPreset);

  const response = await fetch(CLOUDINARY_CONFIG.uploadUrl, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new CloudinaryUploadError(
      "Falha ao enviar a imagem. Tente novamente.",
    );
  }

  const data = await response.json();
  return { url: data.secure_url };
}
