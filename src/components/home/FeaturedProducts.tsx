import { products } from "../../data/products";
import ProductCard from "../products/ProductCard";

export default function FeaturedProducts() {
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
        <button className="flex items-center rounded-full border border-[#2E3192] px-5 py-2 text-sm font-semibold text-[#2E3192] transition hover:bg-[#2E3192] hover:text-white">
          Ver todos
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4 px-4">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
