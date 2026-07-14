import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Product } from "../../types/product.types";
import iconeWhatsApp from "../../assets/images/iconeWhatsApp.png";
import {
  buildWhatsappUrl,
  buildProductInquiryMessage,
} from "../../utils/whatsapp";
import { optimizeImageUrl } from "../../utils/imageOptimizer";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const whatsappUrl = buildWhatsappUrl(buildProductInquiryMessage(product));

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="card-shine group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-outline-variant bg-white shadow-sm transition-shadow duration-300 hover:shadow-2xl"
    >
      <Link to={`/produtos/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-[#F7F8FC] p-4">
          <img
            src={optimizeImageUrl(product.imageUrl, {
              width: 400,
              height: 400,
            })}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-110"
          />

          {product.onSale && (
            <span className="absolute left-3 top-3 rounded-full bg-[#2E3192] px-3 py-1 text-xs font-semibold text-white shadow">
              Promoção
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4 pt-2">
        <Link to={`/produtos/${product.id}`}>
          <h4 className="mb-4 min-h-[56px] text-lg font-semibold text-gray-800 transition-colors duration-300 group-hover:text-[#2E3192]">
            {product.name}
          </h4>
        </Link>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[#1EBE5D] active:scale-95"
        >
          <img src={iconeWhatsApp} alt="WhatsApp" className="h-8 w-8" />
          Consultar preço
        </a>
      </div>
    </motion.div>
  );
}
