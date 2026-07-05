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
    <div className="min-h-screen bg-surface pb-24 font-jakarta text-on-surface">
      <Navbar />

      <main className="pt-16">
        <Hero />
        <CategorySection />
        <FeaturedProducts />
        <StoreLocation />
        <HistorySection />
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
