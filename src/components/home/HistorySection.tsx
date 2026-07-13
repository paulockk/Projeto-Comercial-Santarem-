import {
  Clock3,
  PawPrint,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";

const cards = [
  {
    icon: Clock3,
    title: "Mais de 40 anos",
    description:
      "Tradição e experiência atendendo gerações de clientes em Lençóis Paulista.",
    iconBackground: "bg-[#E9EEFF]",
    iconColor: "text-[#2E3192]",
  },
  {
    icon: PawPrint,
    title: "Grande variedade",
    description:
      "Produtos para pets, jardinagem, piscinas, agropecuária e muito mais.",
    iconBackground: "bg-[#E5F7E9]",
    iconColor: "text-[#209447]",
  },
  {
    icon: ShieldCheck,
    title: "Qualidade e confiança",
    description:
      "Produtos selecionados e atendimento próximo para você comprar com segurança.",
    iconBackground: "bg-[#E8F7FF]",
    iconColor: "text-[#168AAD]",
  },
 
];

export default function HistorySection() {
  return (
    <section
      id="sobre"
      className="w-full bg-surface-container-low px-4 py-14 md:py-20"
    >
      <div className="mx-auto w-full max-w-container-max px-margin-mobile md:px-margin-desktop">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.65fr] lg:items-start lg:gap-16">
          {/* Texto da história */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-xs font-extrabold uppercase tracking-[0.08em] text-[#E31E24] md:text-sm">
              Tradição que atravessa gerações
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#2E3192] md:text-4xl">
              Nossa história
            </h2>

            <div className="mt-6 space-y-5">
              <p className="text-sm leading-7 text-slate-600 md:text-base md:leading-8">
                Há mais de{" "}
                <strong className="font-bold text-slate-900">40 anos</strong>, a
                Comercial Santarém faz parte da história de Lençóis Paulista,
                construindo uma trajetória marcada pela confiança, qualidade e
                compromisso com seus clientes.
              </p>

              <p className="text-sm leading-7 text-slate-600 md:text-base md:leading-8">
                Ao longo dos anos, ampliamos nosso portfólio para oferecer
                produtos para pets, jardinagem, piscinas, agropecuária e muito
                mais, sempre mantendo um atendimento próximo, honesto e de
                qualidade.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#2E3192] text-white">
                <Clock3 size={24} strokeWidth={2} />
              </div>

              <div>
                <p className="text-sm font-bold text-[#2E3192]">
                  Desde a década de 1980
                </p>

                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  Atendendo famílias e profissionais da nossa região.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Cards */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {cards.map((card, index) => {
              const Icon = card.icon;

              return (
                <motion.article
                  key={card.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -6 }}
                  className={`group flex min-h-[220px] flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-[#2E3192]/20 hover:shadow-xl ${
                    index === cards.length - 1
                      ? "sm:col-span-2 xl:col-span-1"
                      : ""
                  }`}
                >
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${card.iconBackground} ${card.iconColor}`}
                  >
                    <Icon size={28} strokeWidth={2} />
                  </div>

                  <h3 className="mt-5 text-lg font-extrabold leading-tight text-[#111936]">
                    {card.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {card.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}