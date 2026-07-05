import { products } from "../../data/products";
import ProductCard from "../products/ProductCard";

export default function FeaturedProducts() {
  return (
    <section className="mx-auto max-w-container-max px-margin-mobile py-16 md:px-margin-desktop">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h3 className="mb-2 text-[28px] font-semibold text-primary">
            Destaques da Semana
          </h3>

          <p className="text-on-surface-variant">
            As melhores ofertas selecionadas para você.
          </p>
        </div>

        <button className="hidden font-semibold text-primary hover:underline md:flex">
          Ver todos
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}