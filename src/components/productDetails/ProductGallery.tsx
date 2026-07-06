import type { Product } from "../../assets/types/product";

interface Props {
  product: Product;
}

export default function ProductGallery({ product }: Props) {
  return (
    <div className="rounded-[24px] bg-[#F1F3FA] p-3 md:p-5">
      <div className="relative overflow-hidden rounded-[22px] bg-white">
        {product.tag && (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-[#E30613] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-md">
            {product.tag}
          </span>
        )}

        <img
          src={product.image}
          alt={product.title}
          className="h-[260px] w-full object-cover sm:h-[340px] md:h-[420px] lg:h-[520px]"
        />
      </div>
    </div>
  );
}