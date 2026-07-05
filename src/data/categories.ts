import { PawPrint, ShoppingBag, Waves, Fish } from "lucide-react";
import type { Category } from "../assets/types/category";

export const categories: Category[] = [
  {
    id: 1,
    title: "Rações",
    icon: PawPrint,
  },
  {
    id: 2,
    title: "Acessórios",
    icon: ShoppingBag,
  },
  {
    id: 3,
    title: "Piscina",
    icon: Waves,
  },
  {
    id: 4,
    title: "Aquarismo",
    icon: Fish,
  },
];