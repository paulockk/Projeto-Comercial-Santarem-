import { MapPin, Phone } from "lucide-react";

export default function StoreLocation() {
  return (
    <section className="bg-surface-container-low py-12">
      <div className="mx-auto grid max-w-container-max gap-12 px-margin-mobile md:grid-cols-2 md:px-margin-desktop">
        <div className="flex h-64 items-center justify-center rounded-3xl border-4 border-white bg-surface-container-highest shadow-lg">
          <MapPin size={64} className="text-slate-400" />
        </div>

        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-800">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            Aberto agora até às 19:00
          </div>

          <h3 className="mb-4 text-[28px] font-semibold text-primary">
            Visite nossa loja física
          </h3>

          <p className="mb-6 leading-6 text-on-surface-variant">
            Estamos localizados no coração de Santarém para melhor atender você
            e seu pet. Venha conferir nosso estoque completo.
          </p>

          <div className="space-y-3">
            <p className="flex gap-3">
              <MapPin className="text-primary" />
              Av. Principal, 123 - Centro, Santarém - PA
            </p>

            <p className="flex gap-3">
              <Phone className="text-primary" />
              (93) 99999-9999
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}