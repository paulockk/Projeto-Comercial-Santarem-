import {
  Bird,
  Leaf,
  PawPrint,
  Pill,
  Tractor,
  Waves,
  type LucideIcon,
} from "lucide-react";

export const ICON_MAP: Record<string, LucideIcon> = {
  PawPrint,
  Pill,
  Bird,
  Waves,
  Leaf,
  Tractor,
};

export function getIconComponent(iconName?: string): LucideIcon {
  if (!iconName || !ICON_MAP[iconName]) {
    return PawPrint;
  }
  return ICON_MAP[iconName];
}
