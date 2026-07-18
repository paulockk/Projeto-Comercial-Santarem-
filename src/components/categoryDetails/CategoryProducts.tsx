import { ChevronRight, Package } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "../../types/product.types";
import type { Category } from "../../types/category.types";
import {
  buildWhatsappUrl,
  buildProductInquiryMessage,
} from "../../utils/whatsapp";
import { slugify } from "../../utils/slugify";
import iconeWhatsApp from "../../assets/images/iconeWhatsApp.png";

const MAX_VISIBLE_PRODUCTS = 6;

interface CategoryProductsProps {
  products: Product[];
  category: Category;
  onClearFilters: () => void;
}

export default function CategoryProducts({
  products,
  category,
  onClearFilters,
}: CategoryProductsProps) {
  const visibleProducts = products.slice(0, MAX_VISIBLE_PRODUCTS);
  const hasMore = products.length > MAX_VISIBLE_PRODUCTS;

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

        {hasMore && (
          <Link
            to={`/produtos?categoria=${slugify(category.name)}`}
            className="hidden items-center gap-2 text-sm font-extrabold text-[#E30613] transition hover:underline md:flex"
          >
            Ver todos
            <ChevronRight size={17} />
          </Link>
        )}
      </div>

      {visibleProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-2 justify-center gap-3 sm:grid-cols-[repeat(auto-fill,205px)] sm:gap-4">
            {visibleProducts.map((product) => (
              <article
                key={product.id}
                className="group flex h-[380px] w-full flex-col overflow-hidden rounded-[18px] border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#2E3192]/30 hover:shadow-xl sm:h-[405px] sm:w-[205px]"
              >
                <Link to={`/produtos/${product.id}`} className="block">
                  <div className="relative flex h-[145px] items-center justify-center overflow-hidden bg-white p-3 sm:h-[175px]">
                    {product.brand && (
                      <span className="absolute left-3 top-3 z-10 max-w-[130px] truncate rounded-full bg-[#E30613]/8 px-2.5 py-1 text-[10px] font-bold text-[#E30613] sm:max-w-[165px]">
                        {product.brand}
                      </span>
                    )}

                    <img
                      src={product.images[0] ?? ""}
                      alt={product.name}
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>

                <div className="flex flex-1 flex-col px-3 pb-4 pt-2 sm:px-4">
                  <Link to={`/produtos/${product.id}`}>
                    <h3 className="line-clamp-3 min-h-[64px] text-[14px] font-black leading-[21px] text-[#111827] transition group-hover:text-[#2E3192] sm:text-[15px] sm:leading-[22px]">
                      {product.name}
                    </h3>
                  </Link>

                  {product.description && (
                    <p className="mt-2 line-clamp-2 min-h-[40px] text-[12px] font-medium leading-5 text-gray-600">
                      {product.description}
                    </p>
                  )}

                  <div className="mt-auto">
                    <a
                      href={buildWhatsappUrl(
                        buildProductInquiryMessage(product),
                      )}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-[#25D366] bg-white px-3 text-[12px] font-black text-[#168A43] shadow-sm transition hover:bg-[#E9FFF1] sm:text-[13px]"
                    >
                      <img
                        src={iconeWhatsApp}
                        alt="WhatsApp"
                        className="h-7 w-7 shrink-0"
                      />

                      <span className="whitespace-nowrap">Consultar preço</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {hasMore && (
            <Link
              to={`/produtos?categoria=${slugify(category.name)}`}
              className="flex items-center justify-center gap-2 rounded-full border-2 border-[#2E3192]/20 bg-white px-6 py-3 text-sm font-extrabold text-[#2E3192] transition hover:bg-[#2E3192] hover:text-white md:hidden"
            >
              Ver todos os {products.length} produtos
              <ChevronRight size={17} />
            </Link>
          )}
        </>
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
            className="mt-5 rounded-full bg-[#E30613] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#c9000b]"
          >
            Limpar filtros
          </button>
        </div>
      )}
    </section>
  );
}
