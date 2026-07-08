export interface Category {
  id: string;
  name: string;
  description?: string;
  icon: string;
  subcategories: string[];
  createdAt: number;
  updatedAt: number;
}

export type CategoryFormData = {
  name: string;
  description?: string;
  icon: string;
  subcategories: string[];
};
