import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Spinner } from "../components/ui/Spinner";
import { useCategories } from "../hooks/useCategories";
import { useProducts } from "../hooks/useProducts";
import { getIconComponent } from "../utils/iconMap";
import { slugify } from "../utils/slugify";
import { SEO } from "../components/common/SEO";

export default function Categories() {
  const { categories, isLoading: isLoadingCategories } = useCategories();
  const { products, isLoading: isLoadingProducts } = useProducts();

  const isLoading = isLoadingCategories || isLoadingProducts;

  function countProducts(categoryId: string) {
    return products.filter((p) => p.categoryId === categoryId && p.available)
      .length;
  }

  return (
    <>
      <SEO
        fullTitle="Categorias"
        description="Explore os produtos organizados por categoria na Comercial Santarém, em Lençóis Paulista. Consulte disponibilidade pelo WhatsApp."
      />
      <Navbar />

      <main className="min-h-screen bg-[#F7F8FC] pt-20">
        <div className="mx-auto max-w-container-max px-4 py-8 md:px-margin-desktop">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-[#2E3192] md:text-4xl">
              Categorias
            </h1>
            <p className="mt-2 text-gray-500">
              Explore os produtos organizados por categoria.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Spinner size="lg" />
            </div>
          ) : categories.length === 0 ? (
            <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center">
              <p className="text-gray-500">
                Nenhuma categoria cadastrada ainda.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => {
                const Icon = getIconComponent(category.icon);
                const productCount = countProducts(category.id);

                return (
                  <Link
                    key={category.id}
                    to={`/categoria/${slugify(category.name)}`}
                    className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#2E3192]/10 text-[#2E3192] transition-colors group-hover:bg-[#2E3192] group-hover:text-white">
                      <Icon size={32} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-bold text-gray-800 group-hover:text-[#2E3192]">
                        {category.name}
                      </h3>
                      {category.description && (
                        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                          {category.description}
                        </p>
                      )}
                      <p className="mt-2 text-xs font-semibold text-[#2E3192]">
                        {productCount} produto(s)
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
