import type { Product } from "../../assets/types/product";
import ProductFeatures from "./ProductFeatures";
import ProductWhatsAppButton from "./ProductWhatsAppButton";
import { Truck, CreditCard, BadgePercent } from "lucide-react";

interface Props {
  product: Product;
}

export default function ProductInfo({ product }: Props) {
  return (
    <div className="flex flex-col justify-center py-2 md:py-4">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-[#2E3192]/10 px-4 py-1.5 text-sm font-bold text-[#2E3192]">
          {product.category}
        </span>

        <span className="rounded-full bg-[#E30613]/10 px-4 py-1.5 text-sm font-bold text-[#E30613]">
          Consulte disponibilidade
        </span>
      </div>

      <h1 className="text-3xl font-extrabold leading-tight text-[#2E3192] md:text-5xl">
        {product.title}
      </h1>

      {product.description && (
        <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600 md:text-lg md:leading-8">
          {product.description}
        </p>
      )}

      <div className="mt-6 rounded-2xl border border-[#2E3192]/10 bg-[#F7F8FC] p-4">
        <p className="font-semibold text-gray-800">
          Produto selecionado da Comercial Santarém.
        </p>

        <p className="mt-1 text-sm text-gray-500">
          Consulte preço, estoque e opções disponíveis diretamente com a loja.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2E3192]/10">
            <Truck className="text-[#2E3192]" size={24} />
          </div>

          <div>
            <p className="font-semibold text-[#2E3192]">
              Entrega rápida
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Disponível somente em Lençóis Paulista.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2E3192]/10">
            <CreditCard className="text-[#2E3192]" size={24} />
          </div>

          <div>
            <p className="font-semibold text-[#2E3192]">
              Parcelamento facilitado
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Compras acima de R$ 100 podem ser parceladas.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:col-span-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <BadgePercent className="text-green-600" size={24} />
          </div>

          <div>
            <p className="font-semibold text-[#2E3192]">
              5% de desconto no PIX
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Aproveite 5% de desconto pagando via PIX.
            </p>
          </div>
        </div>
      </div>

      <ProductFeatures product={product} />

      <ProductWhatsAppButton product={product} />
    </div>
  );
}