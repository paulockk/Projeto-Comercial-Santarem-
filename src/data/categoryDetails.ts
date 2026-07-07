import {
  Bird,
  Leaf,
  PawPrint,
  Pill,
  Tractor,
  Waves,
} from "lucide-react";

import type { CategoryDetail } from "../types/";

export const categories: CategoryDetail[] = [
  {
    slug: "pet-shop",
    title: "Pet Shop",
    subtitle: "Tudo para o conforto, alimentação e cuidado do seu pet.",
    description:
      "Produtos para cães e gatos: rações, acessórios, higiene, brinquedos e itens para o dia a dia.",
    icon: PawPrint,
    products: [
      {
        name: "Rações para cães",
        description: "Opções para filhotes, adultos, raças pequenas e grandes.",
        tag: "Rações",
        emoji: "🐶",
      },
      {
        name: "Rações para gatos",
        description: "Alimentação completa para gatos filhotes e adultos.",
        tag: "Rações",
        emoji: "🐱",
      },
      {
        name: "Petiscos e sachês",
        description: "Produtos para agradar e complementar a rotina.",
        tag: "Alimentos",
        emoji: "🥫",
      },
      {
        name: "Camas e casinhas",
        description: "Mais conforto para o descanso do seu pet.",
        tag: "Conforto",
        emoji: "🛏️",
      },
      {
        name: "Brinquedos",
        description: "Itens para diversão e gasto de energia.",
        tag: "Acessórios",
        emoji: "🎾",
      },
      {
        name: "Coleiras e guias",
        description: "Acessórios para passeio com segurança.",
        tag: "Acessórios",
        emoji: "🦮",
      },
      {
        name: "Shampoo e higiene",
        description: "Produtos para banho, limpeza e cuidado.",
        tag: "Higiene",
        emoji: "🧴",
      },
      {
        name: "Comedouros e bebedouros",
        description: "Produtos práticos para alimentação diária.",
        tag: "Acessórios",
        emoji: "🥣",
      },
    ],
  },
  {
    slug: "medicamentos-veterinarios",
    title: "Medicamentos Veterinários",
    subtitle: "Produtos para cuidado, prevenção e bem-estar animal.",
    description:
      "Produtos veterinários para auxiliar na saúde dos animais. Consulte disponibilidade e orientação adequada.",
    icon: Pill,
    products: [
      {
        name: "Vermífugos",
        description: "Produtos para controle de vermes em animais.",
        tag: "Prevenção",
        emoji: "💊",
      },
      {
        name: "Antipulgas",
        description: "Auxilia na proteção contra pulgas.",
        tag: "Prevenção",
        emoji: "🛡️",
      },
      {
        name: "Anticarrapatos",
        description: "Produtos para proteção contra carrapatos.",
        tag: "Prevenção",
        emoji: "🐾",
      },
      {
        name: "Vitaminas",
        description: "Suplementação para saúde e vitalidade.",
        tag: "Suplementos",
        emoji: "⭐",
      },
      {
        name: "Suplementos",
        description: "Reforço nutricional para necessidades específicas.",
        tag: "Suplementos",
        emoji: "🦴",
      },
      {
        name: "Pomadas veterinárias",
        description: "Opções para cuidados externos.",
        tag: "Cuidados",
        emoji: "🧴",
      },
      {
        name: "Shampoos medicinais",
        description: "Banho e higiene com finalidade específica.",
        tag: "Higiene",
        emoji: "🚿",
      },
      {
        name: "Cuidados para ferimentos",
        description: "Produtos para limpeza e cuidado de machucados.",
        tag: "Cuidados",
        emoji: "➕",
      },
    ],
  },
  {
    slug: "outros-animais",
    title: "Outros Animais",
    subtitle: "Produtos para aves, peixes, roedores e animais de criação.",
    description:
      "Rações, sementes, acessórios e itens de cuidado para outros tipos de animais.",
    icon: Bird,
    products: [
      {
        name: "Rações para aves",
        description: "Alimentos para pássaros e aves domésticas.",
        tag: "Aves",
        emoji: "🐦",
      },
      {
        name: "Misturas de sementes",
        description: "Opções variadas para alimentação de aves.",
        tag: "Aves",
        emoji: "🌾",
      },
      {
        name: "Rações para peixes",
        description: "Alimentos para peixes ornamentais e criação.",
        tag: "Peixes",
        emoji: "🐟",
      },
      {
        name: "Rações para coelhos",
        description: "Produtos para coelhos e pequenos animais.",
        tag: "Roedores",
        emoji: "🐰",
      },
      {
        name: "Rações para galinhas",
        description: "Alimentação para aves de quintal.",
        tag: "Criação",
        emoji: "🐔",
      },
      {
        name: "Bebedouros",
        description: "Modelos para diferentes tipos de animais.",
        tag: "Acessórios",
        emoji: "💧",
      },
      {
        name: "Comedouros",
        description: "Itens para alimentação prática.",
        tag: "Acessórios",
        emoji: "🥣",
      },
      {
        name: "Acessórios para criação",
        description: "Produtos úteis para manejo diário.",
        tag: "Acessórios",
        emoji: "📦",
      },
    ],
  },
  {
    slug: "piscina",
    title: "Piscina",
    subtitle: "Produtos para limpeza, tratamento e manutenção da piscina.",
    description: "Tudo para manter a água limpa, tratada e pronta para uso.",
    icon: Waves,
    products: [
      {
        name: "Cloro",
        description: "Produto essencial para tratamento da água.",
        tag: "Tratamento",
        emoji: "🧪",
      },
      {
        name: "Algicida",
        description: "Auxilia no controle e prevenção de algas.",
        tag: "Tratamento",
        emoji: "🟢",
      },
      {
        name: "Clarificante",
        description: "Ajuda a deixar a água mais cristalina.",
        tag: "Tratamento",
        emoji: "💧",
      },
      {
        name: "Elevador de pH",
        description: "Produto para ajuste do pH da água.",
        tag: "Correção",
        emoji: "⬆️",
      },
      {
        name: "Redutor de pH",
        description: "Auxilia quando o pH está elevado.",
        tag: "Correção",
        emoji: "⬇️",
      },
      {
        name: "Limpa borda",
        description: "Produto para limpeza das bordas.",
        tag: "Limpeza",
        emoji: "🧽",
      },
      {
        name: "Kit teste",
        description: "Itens para verificar cloro e pH.",
        tag: "Teste",
        emoji: "🧫",
      },
      {
        name: "Peneiras e escovas",
        description: "Acessórios para limpeza manual.",
        tag: "Acessórios",
        emoji: "🧹",
      },
    ],
  },
  {
    slug: "jardinagem",
    title: "Jardinagem",
    subtitle: "Tudo para cuidar das plantas, jardim e quintal.",
    description:
      "Produtos para plantio, adubação, manutenção de jardins e cuidado com plantas.",
    icon: Leaf,
    products: [
      {
        name: "Terra vegetal",
        description: "Produto básico para plantio.",
        tag: "Plantio",
        emoji: "🌱",
      },
      {
        name: "Substratos",
        description: "Opções para diferentes tipos de plantas.",
        tag: "Plantio",
        emoji: "🪴",
      },
      {
        name: "Adubos",
        description: "Auxiliam no desenvolvimento das plantas.",
        tag: "Nutrição",
        emoji: "🌿",
      },
      {
        name: "Fertilizantes",
        description: "Produtos para crescimento e fortalecimento.",
        tag: "Nutrição",
        emoji: "✨",
      },
      {
        name: "Vasos",
        description: "Modelos para plantas internas e externas.",
        tag: "Acessórios",
        emoji: "🏺",
      },
      {
        name: "Regadores",
        description: "Itens práticos para irrigação diária.",
        tag: "Acessórios",
        emoji: "💦",
      },
      {
        name: "Pulverizadores",
        description: "Para aplicação de soluções em plantas.",
        tag: "Ferramentas",
        emoji: "🧴",
      },
      {
        name: "Ferramentas de jardim",
        description: "Luvas, pás, tesouras e acessórios.",
        tag: "Ferramentas",
        emoji: "🧤",
      },
    ],
  },
  {
    slug: "agropecuaria",
    title: "Agropecuária",
    subtitle: "Produtos para sítio, campo, criação e manejo animal.",
    description:
      "Rações, suplementos e itens para animais de criação e rotina rural.",
    icon: Tractor,
    products: [
      {
        name: "Rações para cavalos",
        description: "Produtos para alimentação de equinos.",
        tag: "Rações",
        emoji: "🐴",
      },
      {
        name: "Rações para bovinos",
        description: "Alimentação para gado e produção.",
        tag: "Rações",
        emoji: "🐄",
      },
      {
        name: "Rações para galinhas",
        description: "Produtos para aves de quintal.",
        tag: "Rações",
        emoji: "🐔",
      },
      {
        name: "Rações para porcos",
        description: "Opções para suínos e criação rural.",
        tag: "Rações",
        emoji: "🐷",
      },
      {
        name: "Sal mineral",
        description: "Suplementação para animais de produção.",
        tag: "Suplementos",
        emoji: "🧂",
      },
      {
        name: "Suplementos agropecuários",
        description: "Reforço nutricional e manejo animal.",
        tag: "Suplementos",
        emoji: "⭐",
      },
      {
        name: "Cochos e baldes",
        description: "Itens para alimentação e água.",
        tag: "Acessórios",
        emoji: "🪣",
      },
      {
        name: "Ferramentas rurais",
        description: "Produtos úteis para rotina no campo.",
        tag: "Ferramentas",
        emoji: "🛠️",
      },
    ],
  },
];