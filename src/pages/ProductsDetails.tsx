import { useParams } from "react-router-dom";
import { products } from "../data/products";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import Breadcrumb from "../components/productDetails/Breadcrumb";
import ProductGallery from "../components/productDetails/ProductGallery";
import ProductInfo from "../components/productDetails/ProductInfo";

export default function ProductsDetails() {
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#F7F8FC] px-4 py-28">
          <div className="mx-auto max-w-7xl rounded-3xl bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-[#2E3192]">
              Produto não encontrado
            </h1>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F7F8FC] px-4 pb-16 pt-24 md:px-8 md:pt-28">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb />

          <section className="grid gap-8 rounded-[28px] bg-white p-4 shadow-sm md:p-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
            <ProductGallery product={product} />
            <ProductInfo product={product} />
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}