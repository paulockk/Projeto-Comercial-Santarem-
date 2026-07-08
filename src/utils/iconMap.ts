import {
  Bird,
  Leaf,
  PawPrint,
  Pill,
  Tractor,
  Waves,
  Fish,
  Rabbit,
  Bone,
  Flower2,
  Sprout,
  Wheat,
  Milk,
  Egg,
  Scissors,
  ShieldPlus,
  Droplets,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export const ICON_MAP: Record<string, LucideIcon> = {
  PawPrint,
  Pill,
  Bird,
  Waves,
  Leaf,
  Tractor,
  Fish,
  Rabbit,
  Bone,
  Flower2,
  Sprout,
  Wheat,
  Milk,
  Egg,
  Scissors,
  ShieldPlus,
  Droplets,
  Wrench,
};

export const AVAILABLE_ICONS = Object.entries(ICON_MAP).map(([name, Icon]) => ({
  name,
  Icon,
}));

export function getIconComponent(iconName?: string): LucideIcon {
  if (!iconName || !ICON_MAP[iconName]) {
    return PawPrint;
  }
  return ICON_MAP[iconName];
}
