import { COMPANY } from "../constants/company";

export function buildWhatsappUrl(productName?: string): string {
  const baseMessage = productName
    ? `Olá! Tenho interesse no produto ${productName}. Gostaria de saber o valor e mais informações.`
    : "Olá! Gostaria de mais informações sobre os produtos.";

  const encodedMessage = encodeURIComponent(baseMessage);
  return `https://wa.me/${COMPANY.whatsapp}?text=${encodedMessage}`;
}
