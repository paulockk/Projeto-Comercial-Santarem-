import { MessageCircle, ShieldCheck, Sparkles } from "lucide-react";

import type{ CategoryDetail } from "../../../src/types/category1.types";

interface CategoryHeroProps {
  category: CategoryDetail;
}

export default function CategoryHero({ category }: CategoryHeroProps) {
  const Icon = category.icon;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#2E3192] p-7 text-white shadow-lg md:p-10">
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10" />
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#E30613]/35" />

      <div className="relative grid gap-8 md:grid-cols-[1fr_210px] md:items-center">
        <div>
          <span className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-1.5 text-sm font-bold">
            Categoria
          </span>

          <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
            {category.title}
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-white/85">
            {category.subtitle}
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <ShieldCheck size={26} className="text-[#E30613]" />
              <span className="text-sm font-bold">Produtos de qualidade</span>
            </div>

            <div className="flex items-center gap-3">
              <Sparkles size={26} className="text-[#E30613]" />
              <span className="text-sm font-bold">Boas marcas</span>
            </div>

            <div className="flex items-center gap-3">
              <MessageCircle size={26} className="text-[#E30613]" />
              <span className="text-sm font-bold">Atendimento rápido</span>
            </div>
          </div>
        </div>

        <div className="hidden justify-center md:flex">
          <div className="flex h-44 w-44 items-center justify-center rounded-[2rem] bg-white/10 ring-1 ring-white/20">
            <Icon size={92} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}