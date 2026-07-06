import type { Product } from "../../assets/types/product";
import iconeWhatsApp from "../../assets/images/iconeWhatsApp.png";

interface Props {
  product: Product;
}

export default function ProductWhatsAppButton({ product }: Props) {
  return (
    <a
      href={`https://wa.me/5593999999999?text=${encodeURIComponent(
        `Olá! Tenho interesse no produto: ${product.title}`
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-6 py-4 text-base font-extrabold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#1EBE5D] md:w-fit md:px-8"
    >
      <img src={iconeWhatsApp} alt="WhatsApp" className="h-7 w-7" />
      Consultar preço
    </a>
  );
}