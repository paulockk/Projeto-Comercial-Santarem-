interface OptimizeOptions {
  width?: number;
  height?: number;
  quality?: number;
}

// Gerador de URL para otimização de imagens usando o serviço Weserv.
export function optimizeImageUrl(
  url: string,
  options: OptimizeOptions = {},
): string {
  if (!url) return url;

  const { width = 600, height, quality = 75 } = options;

  if (url.startsWith("data:") || url.startsWith("blob:")) {
    return url;
  }

  const params = new URLSearchParams();
  params.set("url", url.replace(/^https?:\/\//, ""));
  params.set("w", String(width));
  if (height) params.set("h", String(height));
  params.set("fit", "cover");
  params.set("q", String(quality));
  params.set("output", "webp");

  return `https://images.weserv.nl/?${params.toString()}`;
}
