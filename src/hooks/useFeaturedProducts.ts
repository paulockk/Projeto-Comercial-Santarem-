import { useEffect, useState } from "react";
import type { Product } from "../types/product.types";
import { getFeaturedProducts } from "../services/product.service";

export function useFeaturedProducts(max = 4) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchProducts() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getFeaturedProducts(max);
        if (isMounted) setProducts(data);
      } catch {
        if (isMounted)
          setError("Não foi possível carregar os produtos em destaque.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchProducts();
    return () => {
      isMounted = false;
    };
  }, [max]);

  return { products, isLoading, error };
}
