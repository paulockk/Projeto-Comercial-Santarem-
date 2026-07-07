import { CheckCircle } from "lucide-react";
import type { Product } from "../../types/product.types";

interface Props {
  product: Product;
}

export default function ProductFeatures({ product }: Props) {
  const features = (product as { features?: string[] }).features;

  if (!features?.length) return null;

  return (
    <div className="mt-7">
      <h3 className="mb-4 text-xl font-extrabold text-[#2E3192]">
        Destaques do produto
      </h3>

      <ul className="grid gap-3 sm:grid-cols-2">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm"
          >
            <CheckCircle className="h-5 w-5 shrink-0 text-[#E30613]" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
