import {
  Clock3,
  PawPrint,
  ShieldCheck,
  Store,
} from "lucide-react";

export default function HistorySection() {
  return (
    <section className="mx-4 my-16 rounded-3xl bg-gray-50 py-16 shadow-sm md:mx-8">
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <div className="max-w-4xl">
          <h3 className="mb-4 text-[28px] font-semibold text-[#2E3192]">
            Nossa História
          </h3>

          <p className="mb-6 text-base leading-8 text-gray-700">
            Há mais de <strong>40 anos</strong>, a Comercial Santarém faz parte
            da história de Lençóis Paulista, construindo uma trajetória marcada
            pela confiança, qualidade e compromisso com seus clientes.
          </p>

          <p className="text-base leading-8 text-gray-700">
            Ao longo dos anos, ampliamos nosso portfólio para oferecer produtos
            para pets, jardinagem, piscinas, utilidades e muito mais. Nosso
            compromisso continua sendo proporcionar um atendimento próximo,
            honesto e de qualidade para toda a comunidade.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <Clock3
              size={40}
              className="mx-auto mb-4 text-[#2E3192]"
              strokeWidth={2}
            />
            <h4 className="text-lg font-semibold text-gray-900">
              40+ anos
            </h4>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Tradição e experiência atendendo gerações de clientes.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <PawPrint
              size={40}
              className="mx-auto mb-4 text-[#2E3192]"
              strokeWidth={2}
            />
            <h4 className="text-lg font-semibold text-gray-900">
              Grande variedade
            </h4>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Produtos para pets, jardinagem, piscinas e muito mais.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <ShieldCheck
              size={40}
              className="mx-auto mb-4 text-[#2E3192]"
              strokeWidth={2}
            />
            <h4 className="text-lg font-semibold text-gray-900">
              Qualidade
            </h4>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Produtos selecionados e atendimento com confiança.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <Store
              size={40}
              className="mx-auto mb-4 text-[#2E3192]"
              strokeWidth={2}
            />
            <h4 className="text-lg font-semibold text-gray-900">
              Atendimento
            </h4>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Uma equipe pronta para ajudar você a encontrar o que precisa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}