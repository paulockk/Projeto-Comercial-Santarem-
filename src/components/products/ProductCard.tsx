import { Link } from "react-router-dom";
import type { Product } from "../../types/product.types";
import {
  buildWhatsappUrl,
  buildProductInquiryMessage,
} from "../../utils/whatsapp";
import { formatPrice } from "../../utils/formatPrice";

interface ProductCard {
  product: Product;
}

export default function ProductCardCompact({ product }: ProductCard) {
  const whatsappUrl = buildWhatsappUrl(buildProductInquiryMessage(product));

  return (
    <div className="group flex w-40 shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-lg sm:w-48">
      <Link to={`/produtos/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-white p-3">
          <img
            src={product.images[0] ?? ""}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
          />

          {product.onSale && (
            <span className="absolute left-2 top-2 rounded-full bg-[#E30613] px-2 py-0.5 text-[10px] font-bold text-white">
              Promoção
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-3">
        <Link to={`/produtos/${product.id}`}>
          <h4 className="line-clamp-2 min-h-[2.5rem] text-sm font-bold text-gray-800 group-hover:text-[#2E3192]">
            {product.name}
          </h4>
        </Link>

        {product.description && (
          <p className="mt-1 line-clamp-2 text-xs leading-snug text-gray-400">
            {product.description}
          </p>
        )}

        {product.price !== null && (
          <p className="mt-2 text-sm font-extrabold text-gray-800">
            {formatPrice(product.price)}
          </p>
        )}

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 flex items-center justify-center rounded-lg bg-[#25D366] px-2 py-2 text-xs font-bold text-white transition hover:bg-[#1EBE5D]"
        >
          Consultar
        </a>
      </div>
    </div>
  );
}
