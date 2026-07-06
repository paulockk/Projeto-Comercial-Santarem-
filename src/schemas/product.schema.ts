import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório").max(120, "Nome muito longo"),
  categoryId: z.string().min(1, "Selecione uma categoria"),
  imageUrl: z
    .string()
    .min(1, "A URL da imagem é obrigatória")
    .url("Digite uma URL válida (ex: https://...)"),
  price: z
    .union([z.number(), z.nan()])
    .optional()
    .transform((val) =>
      val === undefined || Number.isNaN(val) ? undefined : val,
    ),
  description: z.string().max(1000, "Descrição muito longa").optional(),
  brand: z.string().max(80, "Nome da marca muito longo").optional(),
  featured: z.boolean(),
  onSale: z.boolean(),
  available: z.boolean(),
});

export type ProductSchemaData = z.infer<typeof productSchema>;
