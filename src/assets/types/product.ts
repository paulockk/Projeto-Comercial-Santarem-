export interface Product {
  id: number;
  title: string;
  category: string;
  image: string;
  tag?: string;

  description?: string;
  images?: string[];
  features?: string[];
  whatsappMessage?: string;
}