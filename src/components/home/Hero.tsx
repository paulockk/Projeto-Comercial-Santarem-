import { MapPin, ShoppingBag } from "lucide-react";

import heroDesktop from "../../assets/images/hero-desktop.png";
import heroMobile from "../../assets/images/Hero-mobile.png";

export default function Hero() {
  return (
    <section className="relative min-h-[600px] overflow-hidden md:min-h-[520px] lg:min-h-[580px]">
      {/* Imagem para desktop */}
      <img
        src={heroDesktop}
        alt="Produtos para pet, piscina e jardim da Comercial Santarém"
        className="absolute inset-0 hidden h-full w-full object-cover object-center md:block"
      />

      {/* Imagem para mobile */}
      <img
        src={heroMobile}
        alt="Produtos para pet, piscina e jardim da Comercial Santarém"
        className="absolute inset-0 h-full w-full object-cover object-center md:hidden"
      />

      {/* Overlay desktop */}
      <div className="absolute inset-0 hidden bg-gradient-to-r from-[#061A43]/95 via-[#061A43]/60 to-transparent md:block" />

      {/* Overlay mobile */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#061A43]/90 via-[#061A43]/55 to-black/20 md:hidden" />

      {/* Conteúdo */}
      <div className="relative z-10 flex min-h-[600px] items-start px-5 pt-16 sm:px-8 md:min-h-[520px] md:items-center md:px-8 md:pt-0 lg:min-h-[580px] lg:px-12">
        <div className="max-w-[520px]">
          {/* Título */}
          <h1 className="text-[44px] font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-[58px] lg:text-[64px]">
            Tudo para
            <br />
            seu <span className="text-[#44D177]">Pet,</span>
            <br />
            <span className="text-[#20AEEF]">Piscina</span>
            <br className="sm:hidden" /> e{" "}
            <span className="text-[#44D177]">Jardim!</span>
          </h1>

          {/* Descrição */}
          <p className="mt-6 max-w-md text-base font-medium leading-relaxed text-white/90 md:text-lg">
            Produtos de qualidade para cuidar
            <br className="hidden sm:block" />
            do que faz parte da sua vida.
          </p>

          {/* Botões — escondidos no mobile */}
          <div className="mt-8 hidden gap-4 sm:flex">
            <a
              href="#produtos"
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-xl bg-[#E31E24] px-7 py-4 text-base font-bold text-white shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-1 hover:bg-[#C9181E] hover:shadow-xl"
            >
              <ShoppingBag size={20} strokeWidth={2.2} />
              Ver produtos
            </a>

            <a
              href="#contato"
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-xl border border-white/70 bg-white/10 px-7 py-4 text-base font-bold text-white shadow-lg backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#2E3192]"
            >
              <MapPin size={20} strokeWidth={2.2} />
              Conhecer a loja
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
