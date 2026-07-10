import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProductNotFound from "./ProductNotFound";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProductGallery from "../components/productDetails/ProductGallery";
import ProductInfo from "../components/productDetails/ProductInfo";
import ProductCard from "../components/products/ProductCard";
import { Spinner } from "../components/ui/Spinner";
import {
  getProductById,
  getProductsByCategory,
} from "../services/product.service";
import type { Product } from "../types/product.types";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;

    let isMounted = true;

    async function fetchProduct() {
      setIsLoading(true);
      setNotFound(false);

      try {
        const data = await getProductById(id!);

        if (!isMounted) return;

        if (!data) {
          setNotFound(true);
          return;
        }

        setProduct(data);

        const related = await getProductsByCategory(data.categoryId);
        if (isMounted) {
          setRelatedProducts(
            related.filter((p) => p.id !== data.id).slice(0, 4),
          );
        }
      } catch {
        if (isMounted) setNotFound(true);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchProduct();
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (notFound || !product) {
    return <ProductNotFound />;
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F7F8FC] pt-20">
        <div className="mx-auto max-w-container-max px-4 py-8 md:px-margin-desktop">
          <Link
            to="/"
            className="text-sm font-semibold text-[#2E3192] hover:underline"
          >
            ← Voltar
          </Link>

          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            <ProductGallery product={product} />
            <ProductInfo product={product} />
          </div>

          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="mb-6 text-2xl font-bold text-[#2E3192]">
                Produtos relacionados
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">
                {relatedProducts.map((related) => (
                  <ProductCard key={related.id} product={related} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
