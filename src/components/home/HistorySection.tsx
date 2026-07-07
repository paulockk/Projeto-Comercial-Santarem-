import {
  Clock3,
  PawPrint,
  ShieldCheck,
  CreditCard,
  BadgePercent,
} from "lucide-react";
import { motion } from "framer-motion";

const cards = [
  {
    icon: Clock3,
    title: "40+ anos",
    description: "Tradição e experiência atendendo gerações de clientes.",
  },
  {
    icon: PawPrint,
    title: "Grande variedade",
    description: "Produtos para pets, jardinagem, piscinas e muito mais.",
  },
  {
    icon: ShieldCheck,
    title: "Qualidade",
    description: "Produtos selecionados e atendimento com confiança.",
  },

  {
    icon: CreditCard,
    title: "Parcelamento Facilitado",
    description: "Compras acima de R$ 100 podem ser parceladas para facilitar o seu pagamento.",
  },
  {
    icon: BadgePercent,
    title: "5% de Desconto no PIX",
    description: "Economize 5% pagando suas compras via PIX.",
  },
];

export default function HistorySection() {
  return (
    <section className="mx-4 my-16 rounded-3xl bg-gray-50 py-16 shadow-sm md:mx-8">
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl"
        >
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
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.12,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                className="cursor-pointer rounded-2xl bg-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-xl"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#EEF2FF]">
                  <Icon
                    size={34}
                    className="text-[#2E3192]"
                    strokeWidth={2}
                  />
                </div>

                <h4 className="text-lg font-semibold text-gray-900">
                  {card.title}
                </h4>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}