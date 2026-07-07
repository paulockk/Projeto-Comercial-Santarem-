import { Link } from "react-router-dom";
import { useFeaturedProducts } from "../../hooks/useFeaturedProducts";
import { ROUTES } from "../../constants/routes";
import ProductCard from "../products/ProductCard";
import { Spinner } from "../ui/Spinner";

export default function FeaturedProducts() {
  const { products, isLoading } = useFeaturedProducts(4);

  if (!isLoading && products.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-container-max px-margin-mobile py-16 md:px-margin-desktop">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <h3 className="px-4 text-3xl font-bold text-[#2E3192] md:text-4xl">
            Produtos em Destaque
          </h3>

          <p className="mt-3 max-w-xl px-4 text-sm leading-relaxed text-on-surface-variant md:text-base">
            As melhores ofertas selecionadas para você.
          </p>
        </div>

        <Link
          to={ROUTES.PRODUCTS}
          className="flex items-center rounded-full border border-[#2E3192] px-5 py-2 text-sm font-semibold text-[#2E3192] transition hover:bg-[#2E3192] hover:text-white whitespace-nowrap"
        >
          Ver todos
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4 px-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
