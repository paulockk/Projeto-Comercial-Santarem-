import { FaInstagram, FaFacebook} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-outline-variant bg-surface-container px-margin-mobile py-12 text-center">
      <div className="mx-auto flex max-w-container-max flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary-container text-xs font-bold text-white">
              CS
            </div>

            <span className="font-bold text-primary">
              Comercial Santarém
            </span>
          </div>

          <p className="max-w-xs text-sm text-on-surface-variant md:text-left">
            Cuidando do que é importante para você desde 2010.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm md:text-left">
          <span className="font-semibold uppercase tracking-wider text-primary">
            Contato
          </span>
          <span className="text-on-surface-variant">
            contato@comercialsantarem.com.br
          </span>
          <span className="text-on-surface-variant">
            (93) 99999-9999
          </span>
        </div>

        <div className="flex gap-4 text-primary">
          <FaInstagram />
          <FaFacebook />
        </div>
      </div>

      <p className="mt-8 border-t border-outline-variant pt-8 text-xs text-on-surface-variant">
        © 2024 Comercial Santarém. Todos os direitos reservados.
      </p>
    </footer>
  );
}