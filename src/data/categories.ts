import { PawPrint, Waves, Shovel, Pill, Rabbit, Tractor, Star } from "lucide-react";
import type { Category } from "../assets/types/category";

export const categories: Category[] = [
  {
    id: 1,
    title: "Pet Shop",
    icon: PawPrint,
  },
  {
    id: 2,
    title: "Medicamentos",
    icon: Pill,
  },
  {
    id: 3,
    title: "Outros Animais",
    icon: Rabbit,
  },
  {
    id: 4,
    title: "Piscina",
    icon: Waves,
  },
  {
    id: 5,
    title: "Jardinagem",
    icon: Shovel,
  },
  {
    id: 6,
    title: "Agropecuaria",
    icon: Tractor,
  },
  {
    id: 7,
    title: "Destaques",
    icon: Star,
  },
];