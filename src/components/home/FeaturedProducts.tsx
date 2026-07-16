import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useFeaturedProducts } from "../../hooks/useFeaturedProducts";
import { ROUTES } from "../../constants/routes";
import ProductCard from "../products/ProductCard";
import { Spinner } from "../ui/Spinner";

export default function FeaturedProducts() {
  const { products, isLoading } = useFeaturedProducts(12);
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(direction: "left" | "right") {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }

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
          <button
            type="button"
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#2E3192] shadow-lg hover:bg-gray-50 lg:flex"
            aria-label="Produtos anteriores"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div
            ref={scrollRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-4 md:px-margin-desktop [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <button
            type="button"
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#2E3192] shadow-lg hover:bg-gray-50 lg:flex"
            aria-label="Próximos produtos"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
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
