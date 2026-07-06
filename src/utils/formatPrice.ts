export function formatPrice(price?: number): string {
  if (price === undefined || price === null) return "Consulte o valor";

  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
