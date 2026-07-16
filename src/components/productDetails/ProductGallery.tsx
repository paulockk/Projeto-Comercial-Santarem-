import type { Product } from "../../types/product.types";

interface Props {
  product: Product;
}

export default function ProductGallery({ product }: Props) {
  return (
    <div className="mx-auto aspect-square w-full max-w-[585px] rounded-[24px] bg-[#F1F3FA] p-3 md:p-5">
      <div className="relative h-full w-full overflow-hidden rounded-[22px] bg-white">
        {product.onSale && (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-[#E30613] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-md">
            Promoção
          </span>
        )}

        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-contain p-4 md:p-6"
        />
      </div>
    </div>
  );
}