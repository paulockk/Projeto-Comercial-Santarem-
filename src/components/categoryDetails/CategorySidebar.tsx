import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
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
  whatsappUrl,
}: CategorySidebarProps) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 space-y-2">
        {categories.map((item) => {
          const CategoryIcon = getIconComponent(item.icon);
          const itemSlug = slugify(item.name);
          const isActive = itemSlug === activeSlug;

          return (
            <Link
              key={item.id}
              to={`/categoria/${itemSlug}`}
              className={`flex items-center gap-3 rounded-xl border px-4 py-4 text-sm font-extrabold transition ${
                isActive
                  ? "border-[#2E3192] bg-[#2E3192] text-white shadow-lg shadow-[#2E3192]/20"
                  : "border-gray-200 bg-white text-[#2E3192] hover:border-[#2E3192] hover:bg-[#2E3192]/5"
              }`}
            >
              <CategoryIcon
                size={22}
                className={isActive ? "text-white" : "text-[#E30613]"}
              />
              {item.name}
            </Link>
          );
        })}

        <div className="mt-6 overflow-hidden rounded-2xl bg-[#2E3192] p-5 text-white">
          <h3 className="text-xl font-extrabold">
            Dúvidas sobre algum produto?
          </h3>
          <p className="mt-2 text-sm leading-6 text-white/80">
            Fale com a gente pelo WhatsApp e consulte disponibilidade.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#E30613] px-4 py-2 text-sm font-extrabold text-white transition hover:bg-red-700"
          >
            <MessageCircle size={18} />
            Chamar agora
          </a>
        </div>
      </div>
    </aside>
  );
}
