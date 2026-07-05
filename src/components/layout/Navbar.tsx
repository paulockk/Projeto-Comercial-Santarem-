import { Menu, Search, Phone, X } from "lucide-react";
import { useState } from "react";
import logoComercialSantarem from "../../assets/images/logoComercialSantarem.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = ["Início", "Produtos", "Categorias", "Sobre", "Contato"];

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#2E3192]/95 shadow-lg backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-container-max items-center justify-between px-4 md:px-margin-desktop">
        <a href="#" className="flex items-center gap-3 group">
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-white p-1 shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
            <img
              src={logoComercialSantarem}
              alt="Logo Comercial Santarém"
              className="h-full w-full object-contain"
            />
          </div>

          <div className="leading-tight">
            <h1 className="text-lg font-extrabold text-white md:text-xl">
              Comercial Santarém
            </h1>
            <span className="hidden text-xs font-medium text-white/70 sm:block">
              Pet • Piscina • Jardim
            </span>
          </div>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item, index) => (
            <a
              key={item}
              href="#"
              className={`relative text-sm font-semibold transition-colors duration-300 ${
                index === 0 ? "text-white" : "text-white/75 hover:text-white"
              }`}
            >
              {item}

              <span
                className={`absolute -bottom-2 left-0 h-[3px] rounded-full bg-[#E31E24] transition-all duration-300 ${
                  index === 0 ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white transition-all duration-300 hover:bg-white/20 hover:scale-105">
            <Search size={19} />
          </button>

          <a
            href="https://wa.me/5514999999999"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl bg-[#E31E24] px-4 py-2 text-sm font-bold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-red-700 hover:shadow-xl"
          >
            <Phone size={18} />
            Fale Conosco
          </a>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-white/20 md:hidden"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-white/10 bg-[#2E3192] px-4 py-4 shadow-xl md:hidden">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="rounded-xl px-4 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
              >
                {item}
              </a>
            ))}

            <a
              href="https://wa.me/5514999999999"
              target="_blank"
              rel="noreferrer"
              className="mt-2 rounded-xl bg-[#E31E24] px-4 py-3 text-center text-sm font-bold text-white shadow-md"
            >
              Fale Conosco
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}