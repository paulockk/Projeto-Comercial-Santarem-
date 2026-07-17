import { Link } from "react-router-dom";
import { useFeaturedProducts } from "../../hooks/useFeaturedProducts";
import { ROUTES } from "../../constants/routes";
import { Spinner } from "../ui/Spinner";
import ProductCarousel from "../ui/ProductCarousel";

export default function FeaturedProducts() {
  const { products, isLoading } = useFeaturedProducts(12);

  if (!isLoading && products.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-container-max px-7 py-16">
      <div className="mb-8 flex items-end justify-between gap-4 px-4 md:px-margin-desktop">
        <div>
          <h3 className="text-3xl font-bold text-[#2E3192] md:text-4xl">
            Produtos em Destaque
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-on-surface-variant md:text-base">
            As melhores ofertas selecionadas para você.
          </p>
        </div>

        <Link
          to={ROUTES.PRODUCTS}
          className="hidden shrink-0 items-center rounded-full border border-[#2E3192] px-5 py-2 text-sm font-semibold text-[#2E3192] transition hover:bg-[#2E3192] hover:text-white sm:flex whitespace-nowrap"
        >
          Ver todos
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="relative">
          <ProductCarousel products={products} />
        </div>
      )}

      <div className="mt-6 px-4 sm:hidden">
        <Link
          to={ROUTES.PRODUCTS}
          className="flex items-center justify-center rounded-full border border-[#2E3192] px-5 py-2 text-sm font-semibold text-[#2E3192] transition hover:bg-[#2E3192] hover:text-white"
        >
          Ver todos
        </Link>
      </div>
    </section>
  );
}
