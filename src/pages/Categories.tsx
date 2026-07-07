import { useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import CategoryHero from "../components/categoryDetails/CategoryHero";
import CategoryProducts from "../components/categoryDetails/CategoryProducts";
import CategoryRightPanel from "../components/categoryDetails/CategoryRightPanel";
import CategorySidebar from "../components/categoryDetails/CategorySidebar";
import CategoryTopBar from "../components/categoryDetails/CategoryTopBar";

import { useCategories } from "../hooks/useCategories";
import { useProducts } from "../hooks/useProducts";
import { slugify } from "../utils/slugify";
import {
  buildCategoryInquiryMessage,
  buildWhatsappUrl,
} from "../utils/whatsapp";
import { COMPANY } from "../constants/company";
import { Spinner } from "../components/ui/Spinner";

export default function CategoryDetails() {
  const { slug } = useParams();

  const { categories, isLoading: isLoadingCategories } = useCategories();
  const { products, isLoading: isLoadingProducts } = useProducts();

  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Todos");

  const isLoading = isLoadingCategories || isLoadingProducts;

  const category = useMemo(
    () => categories.find((item) => slugify(item.name) === slug),
    [categories, slug],
  );

  const categoryProducts = useMemo(() => {
    if (!category) return [];
    return products.filter((p) => p.categoryId === category.id && p.available);
  }, [products, category]);

  // Usando "marca" como filtro no lugar da antiga "tag".
  // Se quiser manter tag separada de marca, dá pra adicionar um campo
  // `tag` opcional no schema de produto depois.
  const filterOptions = useMemo(() => {
    const brands = categoryProducts
      .map((p) => p.brand)
      .filter((b): b is string => !!b);
    return ["Todos", ...Array.from(new Set(brands))];
  }, [categoryProducts]);

  const filteredProducts = useMemo(() => {
    return categoryProducts.filter((product) => {
      const searchText = search.toLowerCase();
      const matchesSearch =
        product.name.toLowerCase().includes(searchText) ||
        (product.description ?? "").toLowerCase().includes(searchText) ||
        (product.brand ?? "").toLowerCase().includes(searchText);

      const matchesFilter =
        activeFilter === "Todos" || product.brand === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [categoryProducts, search, activeFilter]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!category) {
    return <Navigate to="/" replace />;
  }

  const whatsappUrl = buildWhatsappUrl(
    buildCategoryInquiryMessage(category.name),
  );
  function clearFilters() {
    setSearch("");
    setActiveFilter("Todos");
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F7F8FC] pt-20">
        <CategoryTopBar
          categoryTitle={category.name}
          search={search}
          setSearch={setSearch}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          filterOptions={filterOptions}
        />

        <section className="mx-auto grid max-w-container-max gap-5 px-4 py-7 md:px-margin-desktop lg:grid-cols-[220px_1fr_300px]">
          <CategorySidebar
            categories={categories}
            activeSlug={slug ?? ""}
            whatsappUrl={whatsappUrl}
          />

          <div className="space-y-6">
            <CategoryHero category={category} />

            <CategoryProducts
              products={filteredProducts}
              whatsappNumber={COMPANY.whatsapp}
              whatsappUrl={whatsappUrl}
              onClearFilters={clearFilters}
            />
          </div>

          <CategoryRightPanel
            category={category}
            whatsappNumber={COMPANY.whatsapp}
            whatsappUrl={whatsappUrl}
          />
        </section>
      </main>

      <Footer />
    </>
  );
}
