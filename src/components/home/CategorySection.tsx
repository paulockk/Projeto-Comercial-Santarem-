import { categories } from "../../data/categories";

export default function CategorySection() {
  return (
    <section className="relative z-20 mx-auto -mt-12 max-w-container-max px-margin-mobile md:px-margin-desktop">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <div
              key={category.id}
              className="group flex cursor-pointer flex-col items-center gap-3 rounded-2xl border border-outline-variant bg-white p-6 shadow-md transition hover:shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-fixed text-primary transition group-hover:scale-110">
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