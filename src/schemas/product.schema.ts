import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório").max(120, "Nome muito longo"),
  categoryId: z.string().min(1, "Selecione uma categoria"),
  subcategory: z.string().optional(),
  imageUrl: z
    .string()
    .min(1, "A URL da imagem é obrigatória")
    .url("Digite uma URL válida (ex: https://...)"),
  price: z.preprocess(
    (val) => {
      if (val === "" || val === undefined || val === null) return undefined;
      if (typeof val === "number" && Number.isNaN(val)) return undefined;
      return val;
    },
    z
      .number({ error: "Digite um valor numérico" })
      .positive("O preço deve ser maior que zero")
      .optional(),
  ),
  description: z.string().max(1000, "Descrição muito longa").optional(),
  brand: z.string().max(80, "Nome da marca muito longo").optional(),
  featured: z.boolean(),
  onSale: z.boolean(),
  available: z.boolean(),
});

export type ProductSchemaData = z.infer<typeof productSchema>;
