import { MessageCircle } from "lucide-react";
import type { Product } from "../../assets/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-outline-variant bg-white transition hover:shadow-2xl">
      <div className="relative h-48 overflow-hidden bg-surface-container">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {product.tag && (
          <span className="absolute left-3 top-3 rounded bg-secondary-container px-2 py-1 text-xs font-semibold text-white">
            {product.tag}
          </span>
        )}
      </div>

      <div className="flex h-full flex-col p-4">
        <h4 className="mb-4 font-semibold text-on-surface">
          {product.title}
        </h4>

        <a
          href={`https://wa.me/5593999999999?text=${encodeURIComponent(
            `Olá! Tenho interesse no produto: ${product.title}`
          )}`}
          target="_blank"
          rel="noreferrer"
          className="mt-auto flex w-fit items-center gap-2 rounded-lg bg-green-100 px-4 py-2 text-sm font-semibold text-green-800 hover:bg-green-200"
        >
          <MessageCircle size={16} />
          Consultar Preço
        </a>
      </div>
    </div>
  );
}