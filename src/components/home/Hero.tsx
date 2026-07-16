import { MapPin, ShoppingBag } from "lucide-react";

import heroDesktop from "../../assets/images/hero-desktop.png";
import heroMobile from "../../assets/images/Hero-mobile.png";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Imagem desktop */}
      <img
        src={heroDesktop}
        alt="Produtos para pet, piscina e jardim da Comercial Santarém"
        className="absolute inset-0 hidden h-full w-full object-cover object-center md:block"
      />

      {/* Imagem mobile */}
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
      <div className="relative z-10 flex min-h-[100svh] w-full items-start px-5 pb-10 pt-28 sm:px-8 md:items-center md:px-10 md:pb-0 md:pt-16 lg:px-16 xl:px-24">
        <div className="w-full max-w-[560px]">
          <h1 className="text-[44px] font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-[58px] lg:text-[64px] xl:text-[70px]">
            Tudo para
            <br />
            seu <span className="text-[#44D177]">Pet,</span>
            <br />
            <span className="text-[#20AEEF]">Piscina</span>
            <br className="sm:hidden" /> e{" "}
            <span className="text-[#44D177]">Jardim!</span>
          </h1>

          <p className="mt-6 max-w-md text-base font-medium leading-relaxed text-white/90 md:text-lg">
            Produtos de qualidade para cuidar do que faz parte da sua vida.
          </p>

          {/* Botões */}
          <div className="mt-12 grid w-full grid-cols-2 gap-3 sm:mt-8 sm:flex sm:flex-wrap sm:gap-4">
            <a
              href="#produtos"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#E31E24] px-3 py-3 text-center text-sm font-bold text-white shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-1 hover:bg-[#C9181E] hover:shadow-xl sm:min-h-14 sm:gap-3 sm:px-7 sm:py-4 sm:text-base"
            >
              <ShoppingBag
                size={19}
                strokeWidth={2.2}
                className="shrink-0"
              />

              <span>Ver produtos</span>
            </a>

            <a
              href="#contato"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/70 bg-white/10 px-3 py-3 text-center text-sm font-bold text-white shadow-lg backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#2E3192] sm:min-h-14 sm:gap-3 sm:px-7 sm:py-4 sm:text-base"
            >
              <MapPin
                size={19}
                strokeWidth={2.2}
                className="shrink-0"
              />

              <span>Conhecer loja</span>
            </a>
          </div>
        </div>
      </div>

      {/* Indicador para descer — desktop */}
      <a
        href="#produtos"
        aria-label="Ir para os produtos"
        className="absolute bottom-20 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/80 transition hover:text-white md:flex"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.2em]">
          Explorar
        </span>

        <span className="flex h-9 w-6 justify-center rounded-full border-2 border-white/70 pt-1.5">
          <span className="h-2 w-1 animate-bounce rounded-full bg-white" />
        </span>
      </a>
    </section>
  );
}