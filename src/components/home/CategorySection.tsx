import { categories } from "../../data/categories";

export default function CategorySection() {
  return (
    <section className="relative z-20 mx-auto -mt-12 px-4 md:px-margin-desktop">
      <div className="overflow-x-auto overflow-y-visible py-4">
        <div className="grid grid-rows-2 grid-flow-col auto-cols-[160px] gap-4 md:grid-flow-row md:grid-rows-1 md:grid-cols-4 md:auto-cols-auto">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <div
                key={category.id}
                className="relative z-0 flex flex-col items-center gap-3 rounded-2xl border border-outline-variant bg-white p-6 shadow-md cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:z-10 hover:shadow-xl"
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
      </div>
    </section>
  );
}