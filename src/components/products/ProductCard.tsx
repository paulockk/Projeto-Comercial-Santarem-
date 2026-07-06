import { Link } from "react-router-dom";
import type { Product } from "../../assets/types/product";
import iconeWhatsApp from "../../assets/images/iconeWhatsApp.png";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-outline-variant bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/produtos/${product.id}`} className="block">
        <div className="relative h-48 overflow-hidden bg-surface-container">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />

          {product.tag && (
            <span className="absolute left-3 top-3 rounded-full bg-[#2E3192] px-3 py-1 text-xs font-semibold text-white shadow">
              {product.tag}
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link to={`/produtos/${product.id}`}>
          <h4 className="mb-4 min-h-[56px] text-lg font-semibold text-gray-800 transition hover:text-[#2E3192]">
            {product.title}
          </h4>
        </Link>

        <Link
          to={`/produtos/${product.id}`}
          className="mb-3 flex w-full items-center justify-center rounded-xl border border-[#2E3192] px-4 py-3 font-semibold text-[#2E3192] transition-all duration-300 hover:bg-[#2E3192] hover:text-white"
        >
          Ver detalhes
        </Link>

        <a
          href={`https://wa.me/5593999999999?text=${encodeURIComponent(
            `Olá! Tenho interesse no produto: ${product.title}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-[#1EBE5D] active:scale-95"
        >
          <img src={iconeWhatsApp} alt="Ícone do WhatsApp" className="size-8" />
          Consultar preço
        </a>
      </div>
    </div>
  );
}