export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  imageUrl?: string;
  createdAt: number;
  updatedAt: number;
}

export type CategoryFormData = {
  name: string;
  description?: string;
  icon?: string;
  imageUrl?: string;
};
