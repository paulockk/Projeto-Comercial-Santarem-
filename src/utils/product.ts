import type { Product } from "../types/product.types";

// Retorna a primeira imagem do produto, ou uma string vazia se não houver imagens
export function getPrimaryImage(
  product: Partial<Product> & { imageUrl?: string },
): string {
  return product.images?.[0] ?? product.imageUrl ?? "";
}
