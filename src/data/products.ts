import type { Product } from "../assets/types/product"

export const products: Product[] = [
  {
    id: 1,
    title: "Ração Premium Adulto 15kg",
    category: "Rações",
    tag: "Novo",
    image:
      "https://images.unsplash.com/photo-1589924691106-073b19f553c2?auto=format&fit=crop&w=600&q=80",
    description:
      "Ração premium indicada para cães adultos, desenvolvida para fornecer uma alimentação equilibrada, saudável e nutritiva.",
    features: [
      "Embalagem de 15kg",
      "Alta digestibilidade",
      "Vitaminas e minerais",
      "Proteínas de alta qualidade",
    ],
    whatsappMessage: "Olá! Gostaria de consultar o preço da Ração Premium Adulto 15kg.",
  },

  {
    id: 2,
    title: "Casinha para Cachorro",
    category: "Acessórios",
    tag: "Oferta",
    image:
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80",
    description:
      "Casinha resistente para cães de pequeno e médio porte, produzida com material durável e fácil de limpar.",
    features: [
      "Material resistente",
      "Fácil montagem",
      "Proteção contra chuva",
      "Ideal para áreas externas",
    ],
    whatsappMessage: "Olá! Gostaria de consultar o preço da Casinha para Cachorro.",
  },

  {
    id: 3,
    title: "Cloro de Piscina 10kg",
    category: "Piscinas",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
    ],
    description:
      "Cloro granulado para tratamento da água da piscina, proporcionando limpeza e eliminação de bactérias.",
    features: [
      "Balde de 10kg",
      "Alta concentração",
      "Fácil aplicação",
      "Ideal para piscinas residenciais",
    ],
    whatsappMessage: "Olá! Gostaria de consultar o preço do Cloro de Piscina 10kg.",
  },

  {
    id: 4,
    title: "Coleira Ergonômica Soft-Touch",
    category: "Acessórios",
    image:
      "https://images.unsplash.com/photo-1591768793355-74d75b11ed39?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1591768793355-74d75b11ed39?auto=format&fit=crop&w=600&q=80",
    ],
    description:
      "Coleira confortável e ajustável para cães, produzida com material macio e resistente para o dia a dia.",
    features: [
      "Material Soft-Touch",
      "Ajustável",
      "Fecho reforçado",
      "Diversos tamanhos",
    ],
    whatsappMessage: "Olá! Gostaria de consultar o preço da Coleira Ergonômica Soft-Touch.",
  },
];