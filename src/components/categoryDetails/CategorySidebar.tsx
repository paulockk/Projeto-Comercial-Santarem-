import { Link } from "react-router-dom";
import type { Category } from "../../types/category.types";
import { getIconComponent } from "../../utils/iconMap";
import { slugify } from "../../utils/slugify";

interface CategorySidebarProps {
  categories: Category[];
  activeSlug: string;
  whatsappUrl: string;
}

export default function CategorySidebar({
  categories,
  activeSlug,
}: CategorySidebarProps) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24">
        <div className="rounded-3xl border border-gray-100 bg-white p-3 shadow-sm">
          <div className="mb-3 px-3 pt-2">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-gray-400">
              Categorias
            </p>
          </div>

          <nav className="space-y-1.5">
            {categories.map((item) => {
              const CategoryIcon = getIconComponent(item.icon);
              const itemSlug = slugify(item.name);
              const isActive = itemSlug === activeSlug;

              return (
                <Link
                  key={item.id}
                  to={`/categoria/${itemSlug}`}
                  className={`group relative flex items-center gap-3 rounded-2xl px-3 py-3.5 text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-[#2E3192] text-white shadow-md shadow-[#2E3192]/20"
                      : "text-gray-700 hover:bg-[#2E3192]/5 hover:text-[#2E3192]"
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-[#E30613]/80" />
                  )}

                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${
                      isActive
                        ? "bg-white/15 text-white"
                        : "bg-[#2E3192]/8 text-[#2E3192] group-hover:bg-[#2E3192]/10"
                    }`}
                  >
                    <CategoryIcon size={21} />
                  </span>

                  <span className="leading-snug">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
}