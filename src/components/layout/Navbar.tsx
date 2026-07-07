import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logoComercialSantarem from "../../assets/images/logoComercialSantarem.png";
import { COMPANY } from "../../constants/company";
import {
  buildGenericInquiryMessage,
  buildWhatsappUrl,
} from "../../utils/whatsapp";

const NAV_ITEMS = [
  { label: "Início", href: "/#inicio" },
  { label: "Produtos", href: "/#produtos" },
  { label: "Categorias", href: "/#categorias" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Contato", href: "/#contato" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappUrl = buildWhatsappUrl(buildGenericInquiryMessage());

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#2E3192]/95 shadow-lg backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-container-max items-center justify-between px-4 md:px-margin-desktop">
        <Link to="/" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-white p-1 shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
            <img
              src={logoComercialSantarem}
              alt="Logo Comercial Santarém"
              className="h-full w-full object-contain"
            />
          </div>

          <div className="leading-tight">
            <h1 className="text-lg font-extrabold text-white md:text-xl">
              {COMPANY.name}
            </h1>

            <span className="hidden text-xs font-medium text-white/70 sm:block">
              Pet • Piscina • Jardim
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_ITEMS.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              className={`group relative text-sm font-semibold transition-colors duration-300 ${
                index === 0 ? "text-white" : "text-white/75 hover:text-white"
              }`}
            >
              {item.label}
              <span
                className={`absolute -bottom-2 left-0 h-[3px] rounded-full bg-[#E31E24] transition-all duration-300 ${
                  index === 0 ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mr-6 flex items-center gap-2 rounded-xl bg-[#E31E24] px-4 py-2 text-sm font-bold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-red-700 hover:shadow-xl"
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
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
              >
                {item.label}
              </a>
            ))}

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsOpen(false)}
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
