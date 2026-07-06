export interface Product {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  imageUrl: string;
  price?: number;
  description?: string;
  brand?: string;
  featured: boolean;
  onSale: boolean;
  available: boolean;
  createdAt: number;
  updatedAt: number;
}

export type ProductFormData = {
  name: string;
  categoryId: string;
  imageUrl: string;
  price?: number;
  description?: string;
  brand?: string;
  featured: boolean;
  onSale: boolean;
  available: boolean;
};
