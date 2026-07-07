import type { Product } from "../../types/product.types";
import iconeWhatsApp from "../../assets/images/iconeWhatsApp.png";
import {
  buildProductInquiryMessage,
  buildWhatsappUrl,
} from "../../utils/whatsapp";

interface Props {
  product: Product;
}

export default function ProductWhatsAppButton({ product }: Props) {
  const whatsappUrl = buildWhatsappUrl(buildProductInquiryMessage(product));

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-6 py-4 text-base font-extrabold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#1EBE5D] md:w-fit md:px-8"
    >
      <img src={iconeWhatsApp} alt="WhatsApp" className="h-7 w-7" />
      Consultar preço
    </a>
  );
}
