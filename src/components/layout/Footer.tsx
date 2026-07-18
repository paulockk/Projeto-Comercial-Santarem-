import { FaInstagram, FaFacebookF } from "react-icons/fa";
import logoComercialSantarém from "../../assets/images/logoComercialSantarem.png";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 px-4 py-6 text-center">
      <div className="mx-auto flex max-w-container-max flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <div className="flex items-center gap-3">
            <img
              src={logoComercialSantarém}
              alt="Logo Comercial Santarém"
              className="h-12 w-12"
            />

            <span className="font-bold text-[#2E3192]">Comercial Santarém</span>
          </div>

          <p className="max-w-xs text-sm leading-6 text-gray-600 md:text-left">
            Cuidando do que é importante para você há mais de 50 anos.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm md:text-left">
          <span className="font-semibold uppercase tracking-wider text-[#2E3192]">
            Contato
          </span>

          <span className="text-gray-600">vcsantarem@msn.com</span>

          <span className="text-gray-600">(14) 3263-1344</span>
        </div>

        <div className="flex gap-4">
          <a
            href="https://www.instagram.com/comercialsantarem/?hl=pt"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Comercial Santarém"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 text-white transition hover:scale-110"
          >
            <FaInstagram size={20} />
          </a>

          <a
            href="https://www.facebook.com/comercialsantaremlp"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook Comercial Santarém"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2] text-white transition hover:scale-110"
          >
            <FaFacebookF size={18} />
          </a>
        </div>
      </div>

      <p className="mt-4 border-t border-gray-200 pt-3 text-xs text-gray-500">
        © 2026 Comercial Santarém. Todos os direitos reservados.
      </p>
    </footer>
  );
}
