import { useMemo, useState } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/products/ProductCard";
import { Spinner } from "../components/ui/Spinner";
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";

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

      <main className="min-h-screen bg-[#F7F8FC] pt-20">
        <div className="mx-auto max-w-container-max px-4 py-8 md:px-margin-desktop">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-[#2E3192] md:text-4xl">
              Todos os produtos
            </h1>
            <p className="mt-2 text-gray-500">
              {isLoading
                ? "Carregando..."
                : `${filteredProducts.length} produto(s) encontrado(s)`}
            </p>
          </div>

          {/* Barra de busca e filtro */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar produtos..."
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E3192]/30"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <button
              onClick={() => setShowFilters((prev) => !prev)}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 sm:w-auto"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Categoria
              {activeCategoryId !== "Todos" && (
                <span className="h-2 w-2 rounded-full bg-[#E31E24]" />
              )}
            </button>
          </div>

          {/* Painel de categorias */}
          {showFilters && (
            <div className="mb-6 flex flex-wrap gap-2 rounded-xl border border-gray-100 bg-white p-4 animate-fade-in">
              <button
                onClick={() => setActiveCategoryId("Todos")}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeCategoryId === "Todos"
                    ? "bg-[#2E3192] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Todos
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryId(cat.id)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    activeCategoryId === cat.id
                      ? "bg-[#2E3192] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}

          {/* Grid de produtos */}
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Spinner size="lg" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center">
              <p className="text-gray-500">Nenhum produto encontrado.</p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-3 text-sm font-semibold text-[#2E3192] hover:underline"
                >
                  Limpar filtros
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
