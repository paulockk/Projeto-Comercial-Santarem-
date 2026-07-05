import { MapPin, Phone } from "lucide-react";
import StoreStatus from "../home/StoreStatus";

const mapsUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5908.613920091724!2d-48.804906468234336!3d-22.60501524128679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c0b760744d506d%3A0xec0e71a91b230a89!2sComercial%20Santarem!5e0!3m2!1spt-BR!2sbr!4v1783270201404!5m2!1spt-BR!2sbr";

export default function StoreLocation() {
  return (
    <section className="bg-surface-container-low px-4 py-12">
      <div className="mx-auto grid max-w-container-max gap-12 px-margin-mobile md:grid-cols-2 md:px-margin-desktop">
        <div className="hidden h-80 overflow-hidden rounded-3xl border-4 border-white shadow-lg md:block">
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
        </div>

        <div>
          <h3 className="mb-4 text-[28px] font-semibold text-[#2E3192]">
            Visite nossa loja física
          </h3>
          <StoreStatus />
          <p className="mb-6 leading-6 text-on-surface-variant">
            Venha conhecer nossa loja e descubra uma ampla seleção de produtos
            para pets, jardinagem, piscinas e diversos outros segmentos.
          </p>

          <div className="space-y-3">
            <p className="flex gap-3">
              <MapPin className="text-[#2E3192]" />
              Av. Padre Salustio Rodrigues Machado, 485 - Centro, Lençóis
              Paulista - SP, 18682-080
            </p>

            <p className="flex gap-3">
              <Phone className="text-[#2E3192]" />
              (14) 3263-1344
            </p>

            <div className="mt-6 h-64 overflow-hidden rounded-2xl border-2 border-white shadow-md md:hidden">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
