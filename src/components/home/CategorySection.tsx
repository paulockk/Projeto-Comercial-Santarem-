import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { useCategories } from "../../hooks/useCategories";
import { getIconComponent } from "../../utils/iconMap";
import { slugify } from "../../utils/slugify";
import { Spinner } from "../ui/Spinner";

const categoryColors = [
  {
    iconBackground: "bg-[#E9EEFF]",
    iconColor: "text-[#2E3192]",
  },
  {
    iconBackground: "bg-[#DFF8FC]",
    iconColor: "text-[#19A7CE]",
  },
  {
    iconBackground: "bg-[#E5F7E9]",
    iconColor: "text-[#209447]",
  },
  {
    iconBackground: "bg-[#FFF0E1]",
    iconColor: "text-[#F97316]",
  },
  {
    iconBackground: "bg-[#FFE9EB]",
    iconColor: "text-[#E31E24]",
  },
  {
    iconBackground: "bg-[#F2EAFB]",
    iconColor: "text-[#7C3DB5]",
  },
];

export default function CategorySection() {
  const { categories, isLoading } = useCategories();

  if (isLoading) {
    return (
      <section className="bg-[#F7F8FC] py-14">
        <div className="flex justify-center">
          <Spinner size="lg" />
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-[#F7F8FC] py-14 md:py-20">
      <div className="w-full px-4 sm:px-6 lg:px-12">
        {/* Cabeçalho */}
        <div className="mb-8 flex items-end justify-between gap-6 md:mb-10">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-[0.08em] text-[#E31E24] md:text-sm">
              Encontre facilmente
            </span>

            <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-[#2E3192] md:text-4xl">
              Compre por categoria
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500 md:text-base">
              Tudo o que você precisa separado por categoria.
            </p>
          </div>

          <Link
            to="/categorias"
            className="hidden shrink-0 items-center gap-2 text-sm font-bold text-[#2E3192] transition hover:text-[#E31E24] md:flex"
          >
            Ver todas as categorias
            <ArrowRight size={17} />
          </Link>
        </div>

        {/* Categorias */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 xl:grid-cols-6">
          {categories.map((category, index) => {
            const Icon = getIconComponent(category.icon);

            const colorStyle = categoryColors[index % categoryColors.length];

            const description =
              category.description?.trim() ||
              "Encontre produtos selecionados para suas necessidades.";
            return (
              <Link
                key={category.id}
                to={`/categoria/${slugify(category.name)}`}
                className="group flex min-h-[230px] flex-col items-center rounded-2xl border border-slate-200/80 bg-white px-4 py-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#2E3192]/20 hover:shadow-xl"
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 ${colorStyle.iconBackground} ${colorStyle.iconColor}`}
                >
                  <Icon size={31} strokeWidth={2.1} />
                </div>

                <h3 className="mt-5 text-base font-extrabold leading-tight text-[#111936]">
                  {category.name}
                </h3>

                <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-slate-500 md:text-sm">
                  {description}
                </p>

                <div className="mt-auto pt-5 text-[#2E3192] transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight size={18} strokeWidth={2.2} />
                </div>
              </Link>
            );
          })}
        </div>

        <Link
          to="/categorias"
          className="mt-7 flex items-center justify-center gap-2 rounded-xl border border-[#2E3192]/20 bg-white px-5 py-3 text-sm font-bold text-[#2E3192] transition hover:border-[#2E3192] md:hidden"
        >
          Ver todas as categorias
          <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  );
}
