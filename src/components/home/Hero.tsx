import heroDesktop from "../../assets/images/hero-desktop.png";
import heroMobile from "../../assets/images/hero-mobile.png";

export default function Hero() {
  return (
    <section className="relative h-[560px] overflow-hidden md:h-[650px]">
      {/* Desktop */}
      <img
        src={heroDesktop}
        alt="Comercial Santarém"
        className="absolute inset-0 hidden h-full w-full object-cover md:block"
      />

      {/* Mobile */}
      <img
        src={heroMobile}
        alt="Comercial Santarém"
        className="absolute inset-0 h-full w-full object-cover md:hidden"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />

      {/* Conteúdo */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-start px-6 pt-20 md:items-center md:px-12 md:pt-0">
        <div className="max-w-xl">
          {/* Título */}
          <h1 className="mb-5 text-4xl font-extrabold leading-tight text-white md:text-6xl">
            Tudo para seu
            <br />
            <span className="text-white">Pet,</span>{" "}
            <span className="text-sky-400">Piscina</span>
            <br />
            <span className="text-white">e</span>{" "}
            <span className="text-green-400">Jardim!</span>
          </h1>

          {/* Botões */}
          <div className="mt-44 flex flex-wrap gap-6">
            <button className="rounded-xl bg-[#E31E24] px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-red-700">
              Ver Ofertas
            </button>

            <button className="rounded-xl border border-white/30 bg-[#2E3192] px-8 py-4 font-semibold text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-[#23257A]">
              Nossa Loja
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
