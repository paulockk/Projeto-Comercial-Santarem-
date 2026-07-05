import { categories } from "../../data/categories";

export default function CategorySection() {
  return (
    <section className="relative z-20 mx-auto -mt-12 overflow-x-auto px-4 md:px-margin-desktop">
      <div className="grid grid-rows-2 grid-flow-col auto-cols-[160px] gap-4 md:grid-flow-row md:grid-rows-1 md:grid-cols-4 md:auto-cols-auto">
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <div
              key={category.id}
              className="flex flex-col items-center gap-3 rounded-2xl border border-outline-variant bg-white p-6 shadow-md"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-fixed text-primary">
                <Icon size={32} />
              </div>

              <span className="font-semibold text-on-surface">
                {category.title}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
