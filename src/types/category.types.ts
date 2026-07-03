export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  imageUrl?: string;
  imagePublicId?: string;
  createdAt: number;
  updatedAt: number;
}

export type CategoryFormData = Omit<
  Category,
  "id" | "createdAt" | "updatedAt" | "imageUrl" | "imagePublicId"
> & {
  image?: File | null;
};
