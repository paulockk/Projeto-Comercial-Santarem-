import type { ElementType } from "react";

export interface CategoryProduct {
  name: string;
  description: string;
  tag: string;
  emoji: string;
}

export interface CategoryDetail {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  icon: ElementType;
  products: CategoryProduct[];
}