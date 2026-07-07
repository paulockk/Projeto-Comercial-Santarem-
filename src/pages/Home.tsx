import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import BottomNav from "../components/layout/BottomNav";

import Hero from "../components/home/Hero";
import CategorySection from "../components/home/CategorySection";
import FeaturedProducts from "../components/home/FeaturedProducts";
import StoreLocation from "../components/home/StoreLocation";
import HistorySection from "../components/home/HistorySection";

export default function Home() {
  return (
    <div className="min-h-screen bg-surface pb-4 font-jakarta text-on-surface">
      <Navbar />

      <main className="pt-16">
        <section id="inicio">
          <Hero />
        </section>

        <section id="categorias" className="scroll-mt-20">
          <CategorySection />
        </section>

        <section id="produtos" className="scroll-mt-20">
          <FeaturedProducts />
        </section>

        <section id="contato" className="scroll-mt-20">
          <StoreLocation />
        </section>

        <section id="sobre" className="scroll-mt-20">
          <HistorySection />
        </section>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}