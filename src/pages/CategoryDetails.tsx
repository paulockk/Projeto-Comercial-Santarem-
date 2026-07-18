import { useMemo, useState } from "react";

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
import { Spinner } from "../components/ui/Spinner";
import BottomNav from "../components/layout/BottomNav";
import CategoryNotFound from "./CategoryNotFound";
import { useParams } from "react-router-dom";
import { SEO } from "../components/common/SEO";

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

  const filterOptions = useMemo(() => {
    const subcats = categoryProducts
      .map((p) => p.subcategory)
      .filter((s): s is string => !!s);
    return ["Todos", ...Array.from(new Set(subcats))];
  }, [categoryProducts]);

  const filteredProducts = useMemo(() => {
    return categoryProducts.filter((product) => {
      const searchText = search.toLowerCase();
      const matchesSearch =
        product.name.toLowerCase().includes(searchText) ||
        (product.description ?? "").toLowerCase().includes(searchText) ||
        (product.brand ?? "").toLowerCase().includes(searchText);

      const matchesFilter =
        activeFilter === "Todos" || product.subcategory === activeFilter;

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
    return <CategoryNotFound />;
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
      <SEO
        fullTitle={`${category.name} | Comercial Santarém`}
        description={
          category.description ||
          `Confira produtos de ${category.name} disponíveis na Comercial Santarém, em Lençóis Paulista.`
        }
        image={undefined}
        url={`/categoria/${slugify(category.name)}`}
      />
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
              category={category}
              onClearFilters={clearFilters}
            />
          </div>

          <CategoryRightPanel
            topProducts={categoryProducts}
            whatsappUrl={whatsappUrl}
          />
        </section>
      </main>
      <BottomNav />

      <Footer />
    </>
  );
}
