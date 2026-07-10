import { Headphones, ShieldCheck, Sparkles } from "lucide-react";
import type { Category } from "../../types/category.types";
import { getIconComponent } from "../../utils/iconMap";
import Image from "../../assets/images/FundoCatAgropecuaria1.png";

interface CategoryHeroProps {
  category: Category;
}

export default function CategoryHero({ category }: CategoryHeroProps) {
  const Icon = getIconComponent(category.icon);

  return (
    <section className="relative overflow-hidden rounded-[24px] bg-[#2E3192] text-white shadow-xl">
      {/* Imagem de fundo */}
      <img
        src={Image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-right"
      />

      {/* Camada azul suave, sem divisão reta */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(46,49,146,0.98) 0%, rgba(46,49,146,0.94) 28%, rgba(46,49,146,0.72) 48%, rgba(46,49,146,0.35) 68%, rgba(46,49,146,0.08) 100%)",
        }}
      />

      {/* Escurece levemente para dar profundidade */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.18) 100%)",
        }}
      />

   

      <div className="relative grid min-h-[250px] gap-6 px-7 py-7 md:grid-cols-[1fr_150px] md:items-center md:px-10 lg:grid-cols-[1fr_165px]">
        <div className="max-w-2xl">
          <span className="mb-4 inline-flex items-center rounded-full bg-white/15 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide backdrop-blur-md">
            Categoria
          </span>

          <h1 className="text-4xl font-black leading-none tracking-tight drop-shadow-sm md:text-5xl">
            {category.name}
          </h1>

          {category.description && (
            <p className="mt-4 max-w-xl text-base font-semibold leading-7 text-white/95">
              {category.description}
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="flex min-w-[180px] items-center gap-3 rounded-2xl bg-white/12 px-4 py-3 backdrop-blur-md ring-1 ring-white/15">
              <ShieldCheck size={22} className="shrink-0 text-white/90" />
              <span className="text-sm font-extrabold leading-snug">
                Produtos de qualidade
              </span>
            </div>

            <div className="flex min-w-[150px] items-center gap-3 rounded-2xl bg-white/12 px-4 py-3 backdrop-blur-md ring-1 ring-white/15">
              <Sparkles size={22} className="shrink-0 text-white/90" />
              <span className="text-sm font-extrabold leading-snug">
                Boas marcas
              </span>
            </div>

            <div className="flex min-w-[170px] items-center gap-3 rounded-2xl bg-white/12 px-4 py-3 backdrop-blur-md ring-1 ring-white/15">
              <Headphones size={22} className="shrink-0 text-white/90" />
              <span className="text-sm font-extrabold leading-snug">
                Atendimento rápido
              </span>
            </div>
          </div>
        </div>

        {/* Ícone do trator */}
        <div className="hidden justify-center md:flex">
          <div className="flex h-28 w-28 items-center justify-center rounded-[24px] bg-white/18 shadow-lg ring-1 ring-white/25 backdrop-blur-md lg:h-32 lg:w-32">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#2E3192] shadow-md lg:h-20 lg:w-20">
              {/* eslint-disable-next-line react-hooks/static-components */}
              <Icon size={48} className="text-white lg:size-[56px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}