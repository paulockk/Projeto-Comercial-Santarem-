import { Filter, Flame, Headphones, ShieldCheck } from "lucide-react";
import type { Product } from "../../types/product.types";
import {
  buildWhatsappUrl,
  buildProductInquiryMessage,
} from "../../utils/whatsapp";

interface CategoryRightPanelProps {
  topProducts: Product[];
  whatsappUrl: string;
}

export default function CategoryRightPanel({
  topProducts,
}: CategoryRightPanelProps) {
  return (
    <aside className="space-y-4">
      <div className="rounded-[22px] border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center gap-2">
          <Flame
            size={24}
            className="animate-flame fill-[#E30613] text-[#E30613]"
          />

          <h2 className="text-xl font-extrabold text-[#2E3192]">
            Mais procurados
          </h2>
        </div>

        <div className="space-y-1">
          {topProducts.slice(0, 5).map((product, index) => (
            <a
              key={product.id}
              href={buildWhatsappUrl(buildProductInquiryMessage(product))}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-xl py-3 transition hover:translate-x-1"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#2E3192] text-xs font-extrabold text-white shadow-sm">
                {index + 1}
              </span>

              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden">
                <img
                  src={product.images[0] ?? ""}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-2 text-sm font-extrabold leading-5 text-gray-900">
                  {product.name}
                </h3>

                <p className="mt-1 text-xs font-extrabold text-[#E30613]">
                  Consultar preço
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-[18px] border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center gap-4 border-b border-gray-100 px-5 py-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#2E3192]/15 bg-[#F7F8FC]">
            <ShieldCheck className="text-[#2E3192]" size={24} />
          </div>

          <div>
            <p className="text-sm font-extrabold leading-5 text-[#2E3192]">
              Produtos de qualidade
            </p>
            <p className="text-xs font-medium text-gray-500">
              Selecionados para o melhor resultado
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 border-b border-gray-100 px-5 py-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#2E3192]/15 bg-[#F7F8FC]">
            <Filter className="text-[#2E3192]" size={24} />
          </div>

          <div>
            <p className="text-sm font-extrabold leading-5 text-[#2E3192]">
              Consulte disponibilidade
            </p>
            <p className="text-xs font-medium text-gray-500">
              Fale com nossa equipe
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 px-5 py-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#2E3192]/15 bg-[#F7F8FC]">
            <Headphones className="text-[#2E3192]" size={24} />
          </div>

          <div>
            <p className="text-sm font-extrabold leading-5 text-[#2E3192]">
              Atendimento especializado
            </p>
            <p className="text-xs font-medium text-gray-500">
              Estamos prontos para ajudar
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
