import { COMPANY } from "../constants/company";

export function buildWhatsappUrl(message: string): string {
  return `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Mensagem genérica */
export function buildGenericInquiryMessage(): string {
  return "Olá! Gostaria de mais informações sobre os produtos.";
}

/** Mensagem personalizada para um produto específico. */
export function buildProductInquiryMessage(product: {
  name: string;
  price?: number;
}): string {
  let message = `Olá! Tenho interesse no produto ${product.name}.`;

  message += " Gostaria de saber mais informações e a disponibilidade.";

  return message;
}

/** Mensagem personalizada para uma categoria específica. */
export function buildCategoryInquiryMessage(categoryName: string): string {
  return `Olá! Gostaria de consultar produtos da categoria ${categoryName}.`;
}
