import { LayoutDashboard, Package, Tag } from "lucide-react";
import { ROUTES } from "./routes";

export const ADMIN_MENU = [
  { label: "Dashboard", path: ROUTES.ADMIN_DASHBOARD, icon: LayoutDashboard },
  { label: "Produtos", path: ROUTES.ADMIN_PRODUCTS, icon: Package },
  { label: "Categorias", path: ROUTES.ADMIN_CATEGORIES, icon: Tag },
] as const;
