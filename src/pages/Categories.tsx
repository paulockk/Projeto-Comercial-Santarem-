import { useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import CategoryHero from "../components/categoryDetails/CategoryHero";
import CategoryProducts from "../components/categoryDetails/CategoryProducts";
import CategoryRightPanel from "../components/categoryDetails/CategoryRightPanel";
import CategorySidebar from "../components/categoryDetails/CategorySidebar";
import CategoryTopBar from "../components/categoryDetails/CategoryTopBar";

import { categories } from "../data/";

const WHATSAPP_NUMBER = "5500000000000";

export default function CategoryDetails() {
  const { slug } = useParams();

  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Todos");

  const category = categories.find((item) => item.slug === slug);

  const filterOptions = useMemo(() => {
    if (!category) return ["Todos"];

    const tags = category.products.map((product) => product.tag);

    return ["Todos", ...Array.from(new Set(tags))];
  }, [category]);

  const filteredProducts = useMemo(() => {
    if (!category) return [];

    return category.products.filter((product) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        product.name.toLowerCase().includes(searchText) ||
        product.description.toLowerCase().includes(searchText) ||
        product.tag.toLowerCase().includes(searchText);

      const matchesFilter =
        activeFilter === "Todos" || product.tag === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [category, search, activeFilter]);

  if (!category) {
    return <Navigate to="/categoria/pet-shop" replace />;
  }

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Olá! Gostaria de consultar produtos da categoria ${category.title}.`
  )}`;

  function clearFilters() {
    setSearch("");
    setActiveFilter("Todos");
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F7F8FC] pt-20">
        <CategoryTopBar
          categoryTitle={category.title}
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
            activeSlug={category.slug}
            whatsappUrl={whatsappUrl}
          />

          <div className="space-y-6">
            <CategoryHero category={category} />

            <CategoryProducts
              products={filteredProducts}
              whatsappNumber={WHATSAPP_NUMBER}
              whatsappUrl={whatsappUrl}
              onClearFilters={clearFilters}
            />
          </div>

          <CategoryRightPanel
            category={category}
            whatsappNumber={WHATSAPP_NUMBER}
            whatsappUrl={whatsappUrl}
          />
        </section>
      </main>

      <Footer />
    </>
  );
}