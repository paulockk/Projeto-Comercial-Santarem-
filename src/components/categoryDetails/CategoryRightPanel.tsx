import { Filter, MessageCircle, ShieldCheck, ShoppingBag } from "lucide-react";
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
  whatsappUrl,
}: CategoryRightPanelProps) {
  return (
    <aside className="space-y-4">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-5 text-xl font-extrabold text-[#2E3192]">
          Mais procurados
        </h2>

        <div className="space-y-4">
          {topProducts.slice(0, 5).map((product, index) => (
            <a
              key={product.id}
              href={buildWhatsappUrl(buildProductInquiryMessage(product))}
              target="_blank"
              rel="noreferrer"
              className="flex gap-3 rounded-xl p-2 transition hover:bg-[#F7F8FC]"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#2E3192] text-xs font-extrabold text-white">
                {index + 1}
              </span>

              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[#2E3192]/10">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-sm font-extrabold leading-5 text-gray-900">
                  {product.name}
                </h3>

                <p className="mt-1 text-xs font-bold text-[#E30613]">
                  Consultar preço
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-[#E30613] p-5 text-white shadow-lg shadow-[#E30613]/20">
        <div className="flex items-center gap-3">
          <MessageCircle size={34} />
          <div>
            <h3 className="text-lg font-extrabold">Precisa de ajuda?</h3>
            <p className="text-sm text-white/85">
              Fale com a gente pelo WhatsApp.
            </p>
          </div>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-5 flex h-11 items-center justify-center rounded-full bg-white text-sm font-extrabold text-[#E30613] transition hover:bg-gray-100"
        >
          Chamar no WhatsApp
        </a>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-[#2E3192]" size={25} />
            <p className="text-sm font-extrabold text-[#2E3192]">
              Produtos de qualidade
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Filter className="text-[#2E3192]" size={25} />
            <p className="text-sm font-extrabold text-[#2E3192]">
              Consulte disponibilidade
            </p>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck className="text-[#2E3192]" size={25} />
            <p className="text-sm font-extrabold text-[#2E3192]">
              Atendimento especializado
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
