import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { ROUTES } from "../../constants/routes";
import { useFeaturedProducts } from "../../hooks/useFeaturedProducts";
import ProductCard from "../products/ProductCard";
import { Spinner } from "../ui/Spinner";

export default function FeaturedProducts() {
  const { products, isLoading } = useFeaturedProducts(4);

  if (!isLoading && products.length === 0) {
    return null;
  }

  return (
    <section
      id="produtos"
      className="w-full bg-white py-14 md:py-20"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12">
        {/* Cabeçalho */}
        <div className="mb-8 flex items-end justify-between gap-6 md:mb-10">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-[0.08em] text-[#E31E24] md:text-sm">
              Destaques
            </span>

            <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-[#2E3192] md:text-4xl">
              Produtos em destaque
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500 md:text-base">
              Confira alguns dos produtos mais procurados pelos nossos clientes.
            </p>
          </div>

          <Link
            to={ROUTES.PRODUCTS}
            className="hidden shrink-0 items-center gap-2 text-sm font-bold text-[#2E3192] transition hover:text-[#E31E24] md:flex"
          >
            Ver todos os produtos
            <ArrowRight size={17} strokeWidth={2.2} />
          </Link>
        </div>

        {/* Conteúdo */}
        {isLoading ? (
          <div className="flex min-h-[260px] items-center justify-center">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Botão mobile */}
        {!isLoading && (
          <Link
            to={ROUTES.PRODUCTS}
            className="mt-8 flex items-center justify-center gap-2 rounded-xl border border-[#2E3192]/20 bg-white px-5 py-3 text-sm font-bold text-[#2E3192] transition hover:border-[#2E3192] hover:bg-[#2E3192] hover:text-white md:hidden"
          >
            Ver todos os produtos
            <ArrowRight size={17} strokeWidth={2.2} />
          </Link>
        )}
      </div>
    </section>
  );
}