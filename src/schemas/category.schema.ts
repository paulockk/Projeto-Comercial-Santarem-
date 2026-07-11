import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "O nome é obrigatório").max(80, "Nome muito longo"),
  description: z.string().max(300, "Descrição muito longa").optional(),
  icon: z.string().min(1, "Selecione um ícone"),
  subcategories: z.array(z.string().min(1)),
});

export type CategorySchemaData = z.infer<typeof categorySchema>;
