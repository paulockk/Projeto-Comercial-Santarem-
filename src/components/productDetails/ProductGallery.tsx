import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "../../types/product.types";

interface Props {
  product: Product;
}

export default function ProductGallery({ product }: Props) {
  const images = product.images?.length ? product.images : [];
  const [activeIndex, setActiveIndex] = useState(0);

  function goTo(index: number) {
    if (images.length === 0) return;
    setActiveIndex((index + images.length) % images.length);
  }

  return (
    <div className="rounded-[24px] bg-[#F1F3FA] p-3 md:p-5">
      <div className="relative overflow-hidden rounded-[22px] bg-white">
        {product.onSale && (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-[#E30613] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-md">
            Promoção
          </span>
        )}

        {images.length > 0 ? (
          <img
            src={images[activeIndex]}
            alt={`${product.name} - imagem ${activeIndex + 1}`}
            className="h-[260px] w-full object-contain bg-white sm:h-[340px] md:h-[420px] lg:h-[520px]"
          />
        ) : (
          <div className="flex h-[260px] items-center justify-center text-gray-300 sm:h-[340px] md:h-[420px] lg:h-[520px]">
            Sem imagem
          </div>
        )}

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#2E3192] shadow-md hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#2E3192] shadow-md hover:bg-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((img, index) => (
            <button
              key={img + index}
              type="button"
              onClick={() => goTo(index)}
              className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-colors ${
                index === activeIndex
                  ? "border-[#2E3192]"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={img}
                alt={`Miniatura ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
