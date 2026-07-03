export interface Product {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  imageUrl: string;
  imagePath: string; // caminho no Storage, útil para deletar depois
  price?: number;
  description?: string;
  brand?: string;
  featured: boolean;
  onSale: boolean;
  available: boolean;
  createdAt: number; // timestamp
  updatedAt: number;
}

export type ProductFormData = Omit<
  Product,
  "id" | "createdAt" | "updatedAt" | "imageUrl" | "imagePath" | "categoryName"
> & {
  image?: File | null;
};
