import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import BottomNav from "../components/layout/BottomNav";
import Hero from "../components/home/Hero";
import CategorySection from "../components/home/CategorySection";
import FeaturedProducts from "../components/home/FeaturedProducts";
import StoreLocation from "../components/home/StoreLocation";
import HistorySection from "../components/home/HistorySection";
import PromotionalBanner from "../components/home/PromotionalBanner";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    const scrollTo = (location.state as { scrollTo?: string })?.scrollTo;
    if (!scrollTo) return;

    function scrollToSection() {
      document
        .getElementById(scrollTo!)
        ?.scrollIntoView({ behavior: "smooth" });
    }

    // Primeira tentativa: logo após montar (cobre o caso "já na Home")
    const firstAttempt = setTimeout(scrollToSection, 100);

    // Segunda tentativa: depois que imagens abaixo tiveram tempo de carregar
    const secondAttempt = setTimeout(scrollToSection, 600);

    return () => {
      clearTimeout(firstAttempt);
      clearTimeout(secondAttempt);
    };
  }, [location.state]);

  return (
    <div className="min-h-screen bg-surface pb-4 font-jakarta text-on-surface">
      <Navbar />
      <main className="pt-16">
        <section id="inicio">
          <Hero />
          <PromotionalBanner />
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
