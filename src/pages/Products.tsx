import { useMemo, useState } from "react";
import { Search, X, SlidersHorizontal} from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Spinner } from "../components/ui/Spinner";
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";

import type { Product } from "../types/product.types";
import {
  buildWhatsappUrl,
  buildProductInquiryMessage,
} from "../utils/whatsapp";

import iconeWhatsApp from "../assets/images/iconeWhatsApp.png";

export default function Products() {
  const { products, isLoading: isLoadingProducts } = useProducts();
  const { categories, isLoading: isLoadingCategories } = useCategories();

  const [search, setSearch] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState<string>("Todos");
  const [showFilters, setShowFilters] = useState(false);

  const isLoading = isLoadingProducts || isLoadingCategories;

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => p.available)
      .filter((product) => {
        const searchText = search.toLowerCase();

        const matchesSearch =
          product.name.toLowerCase().includes(searchText) ||
          (product.description ?? "").toLowerCase().includes(searchText) ||
          (product.brand ?? "").toLowerCase().includes(searchText) ||
          product.categoryName.toLowerCase().includes(searchText);

        const matchesCategory =
          activeCategoryId === "Todos" ||
          product.categoryId === activeCategoryId;

        return matchesSearch && matchesCategory;
      });
  }, [products, search, activeCategoryId]);

  function clearFilters() {
    setSearch("");
    setActiveCategoryId("Todos");
  }

  const hasActiveFilters = search !== "" || activeCategoryId !== "Todos";

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F7F8FC] pt-[71px]">
        <div className="mx-auto max-w-container-max px-4 py-8 md:px-margin-desktop">
          <div className="mb-8">
            <span className="mb-3 inline-flex rounded-full bg-[#2E3192]/10 px-4 py-1.5 text-sm font-bold text-[#2E3192]">
              Catálogo
            </span>

            <h1 className="text-3xl font-extrabold text-[#2E3192] md:text-4xl">
              Todos os produtos
            </h1>

            <p className="mt-2 text-gray-500">
              {isLoading
                ? "Carregando produtos..."
                : `${filteredProducts.length} produto(s) encontrado(s)`}
            </p>
          </div>

          {/* Barra de busca e filtro */}
          <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar produtos..."
                  className="w-full rounded-xl border border-gray-200 bg-[#F7F8FC] py-3 pl-11 pr-10 text-sm font-medium text-gray-700 outline-none transition focus:border-[#2E3192]/40 focus:bg-white focus:ring-2 focus:ring-[#2E3192]/15"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => setShowFilters((prev) => !prev)}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-extrabold text-[#2E3192] transition hover:border-[#2E3192]/40 hover:bg-[#2E3192]/5 sm:w-auto"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Categorias

                {activeCategoryId !== "Todos" && (
                  <span className="h-2 w-2 rounded-full bg-[#E31E24]" />
                )}
              </button>
            </div>

            {/* Painel de categorias */}
            {showFilters && (
              <div className="mt-4 flex flex-wrap gap-2 border-t border-gray-100 pt-4">
                <button
                  type="button"
                  onClick={() => setActiveCategoryId("Todos")}
                  className={`rounded-full border px-4 py-2 text-sm font-extrabold transition ${
                    activeCategoryId === "Todos"
                      ? "border-[#2E3192] bg-[#2E3192] text-white"
                      : "border-gray-200 bg-white text-gray-600 hover:border-[#2E3192]/40 hover:text-[#2E3192]"
                  }`}
                >
                  Todos
                </button>

                {categories.map((cat) => (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => setActiveCategoryId(cat.id)}
                    className={`rounded-full border px-4 py-2 text-sm font-extrabold transition ${
                      activeCategoryId === cat.id
                        ? "border-[#2E3192] bg-[#2E3192] text-white"
                        : "border-gray-200 bg-white text-gray-600 hover:border-[#2E3192]/40 hover:text-[#2E3192]"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Produtos */}
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Spinner size="lg" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-sm">
              <p className="text-gray-500">Nenhum produto encontrado.</p>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-4 rounded-full bg-[#2E3192] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#232675]"
                >
                  Limpar filtros
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 justify-center gap-3 sm:grid-cols-[repeat(auto-fill,205px)] sm:gap-4">
              {filteredProducts.map((product) => (
                <ProductCatalogCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

interface ProductCatalogCardProps {
  product: Product;
}

function ProductCatalogCard({ product }: ProductCatalogCardProps) {
  return (
    <article className="group flex h-[380px] w-full flex-col overflow-hidden rounded-[18px] border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#2E3192]/30 hover:shadow-xl sm:h-[405px] sm:w-[205px]">
      <Link to={`/produtos/${product.id}`} className="block">
        <div className="relative flex h-[145px] items-center justify-center overflow-hidden bg-white p-3 sm:h-[175px]">
          {product.brand && (
            <span className="absolute left-3 top-3 z-10 max-w-[130px] truncate rounded-full bg-[#2E3192]/8 px-2.5 py-1 text-[10px] font-bold text-[#2E3192] sm:max-w-[165px]">
              {product.brand}
            </span>
          )}

          <img
            src={product.imageUrl}
            alt={product.name}
            className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col px-3 pb-4 pt-2 sm:px-4">
        <Link to={`/produtos/${product.id}`}>
          <h3 className="line-clamp-3 min-h-[64px] text-[14px] font-black leading-[21px] text-[#111827] transition group-hover:text-[#2E3192] sm:text-[15px] sm:leading-[22px]">
            {product.name}
          </h3>
        </Link>

        {product.description && (
          <p className="mt-2 line-clamp-2 min-h-[40px] text-[12px] font-medium leading-5 text-gray-600">
            {product.description}
          </p>
        )}

        <div className="mt-auto">
          <a
            href={buildWhatsappUrl(buildProductInquiryMessage(product))}
            target="_blank"
            rel="noreferrer"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-[#25D366] bg-white px-3 text-[12px] font-black text-[#168A43] shadow-sm transition hover:bg-[#E9FFF1] sm:text-[13px]"
          >
            <img
              src={iconeWhatsApp}
              alt="WhatsApp"
              className="h-7 w-7 shrink-0"
            />

            <span className="whitespace-nowrap">Consultar preço</span>
          </a>
        </div>
      </div>
    </article>
  );
}