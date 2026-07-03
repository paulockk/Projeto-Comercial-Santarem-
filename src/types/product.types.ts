export interface Product {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  imageUrl: string;
  imagePublicId: string;
  price?: number;
  description?: string;
  brand?: string;
  featured: boolean;
  onSale: boolean;
  available: boolean;
  createdAt: number;
  updatedAt: number;
}

export type ProductFormData = Omit<
  Product,
  | "id"
  | "createdAt"
  | "updatedAt"
  | "imageUrl"
  | "imagePublicId"
  | "categoryName"
> & {
  image?: File | null;
};
