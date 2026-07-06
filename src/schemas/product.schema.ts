import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório").max(120, "Nome muito longo"),
  categoryId: z.string().min(1, "Selecione uma categoria"),
  price: z.number().positive("O preço deve ser maior que zero").optional(),
  description: z.string().max(1000, "Descrição muito longa").optional(),
  brand: z.string().max(80, "Nome da marca muito longo").optional(),
  featured: z.boolean(),
  onSale: z.boolean(),
  available: z.boolean(),
});
