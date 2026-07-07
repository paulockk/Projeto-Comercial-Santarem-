import { ChevronRight, Package } from "lucide-react";

import type { CategoryProduct } from "../../types/category";

interface CategoryProductsProps {
  products: CategoryProduct[];
  whatsappNumber: string;
  whatsappUrl: string;
  onClearFilters: () => void;
}

export default function CategoryProducts({
  products,
  whatsappNumber,
  whatsappUrl,
  onClearFilters,
}: CategoryProductsProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#2E3192]">
            Principais produtos
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {products.length} produto(s) encontrado(s)
          </p>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="hidden items-center gap-2 text-sm font-extrabold text-[#E30613] hover:underline md:flex"
        >
          Ver todos
          <ChevronRight size={17} />
        </a>
      </div>

      {products.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.name}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-36 items-center justify-center bg-gradient-to-br from-[#F7F8FC] to-[#2E3192]/10">
                <span className="text-6xl">{product.emoji}</span>
              </div>

              <div className="p-5">
                <span className="mb-3 inline-flex rounded-full bg-[#E30613]/10 px-3 py-1 text-xs font-extrabold text-[#E30613]">
                  {product.tag}
                </span>

                <h3 className="text-lg font-extrabold text-gray-900 group-hover:text-[#2E3192]">
                  {product.name}
                </h3>

                <p className="mt-2 min-h-[48px] text-sm leading-6 text-gray-500">
                  {product.description}
                </p>

                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                    `Olá! Gostaria de consultar: ${product.name}.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 flex h-10 items-center justify-center rounded-full border border-[#E30613] text-sm font-extrabold text-[#E30613] transition hover:bg-[#E30613] hover:text-white"
                >
                  Consultar
                </a>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-[#2E3192]/30 bg-white p-10 text-center">
          <Package className="mx-auto text-[#2E3192]" size={42} />

          <h3 className="mt-4 text-xl font-extrabold text-[#2E3192]">
            Nenhum produto encontrado
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Tente pesquisar por outro nome ou limpar os filtros.
          </p>

          <button
            type="button"
            onClick={onClearFilters}
            className="mt-5 rounded-full bg-[#E30613] px-6 py-3 text-sm font-extrabold text-white"
          >
            Limpar filtros
          </button>
        </div>
      )}
    </section>
  );
}