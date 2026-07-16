import { MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import StoreStatus from "../home/StoreStatus";

const mapsUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5908.613920091724!2d-48.804906468234336!3d-22.60501524128679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c0b760744d506d%3A0xec0e71a91b230a89!2sComercial%20Santarem!5e0!3m2!1spt-BR!2sbr!4v1783270201404!5m2!1spt-BR!2sbr";

export default function StoreLocation() {
  return (
    <section className="bg-surface-container-low px-7 py-12">
      <div className="mx-auto grid max-w-container-max gap-12 px-margin-mobile md:grid-cols-2 md:px-margin-desktop">
        <motion.div
          initial={{ opacity: 0, x: -90 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ scale: 1.02 }}
          className="hidden h-80 overflow-hidden rounded-3xl border-4 border-white shadow-lg md:block"
        >
          <iframe
            title="Localização Comercial Santarém"
            src={mapsUrl}
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="border-0"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 90 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h3
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-4 text-[28px] font-semibold text-[#2E3192]"
          >
            Visite nossa loja física
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <StoreStatus />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-6 leading-6 text-on-surface-variant"
          >
            Venha conhecer nossa loja e descubra uma ampla seleção de produtos
            para pets, jardinagem, piscinas e diversos outros segmentos.
          </motion.p>

          <div className="space-y-3">
            <motion.p
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex gap-3"
            >
              <MapPin className="text-[#2E3192]" />
              Av. Padre Salustio Rodrigues Machado, 485 - Centro, Lençóis
              Paulista - SP, 18682-080
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex gap-3"
            >
              <Phone className="text-[#2E3192]" />
              (14) 3263-1344
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              whileHover={{ scale: 1.02 }}
              className="mt-6 h-64 overflow-hidden rounded-2xl border-2 border-white shadow-md md:hidden"
            >
              <iframe
                title="Localização Comercial Santarém Mobile"
                src={mapsUrl}
                width="100%"
                height="100%"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="border-0"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
