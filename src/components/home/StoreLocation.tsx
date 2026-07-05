import { MapPin, Phone } from "lucide-react";
import StoreStatus from "../home/StoreStatus";

const mapsUrl =
  "https://www.google.com/maps?q=Av.%20Padre%20Salustio%20Rodrigues%20Machado%2C%20485%20-%20Centro%2C%20Len%C3%A7%C3%B3is%20Paulista%20-%20SP%2C%2018682-080&output=embed";

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
