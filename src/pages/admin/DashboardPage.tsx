import { Package, Tag, Star, Percent, XCircle } from "lucide-react";
import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";
import { StatCard } from "../../components/ui/StatCard";
import { Spinner } from "../../components/ui/Spinner";
import { formatPrice } from "../../utils/formatPrice";

export default function DashboardPage() {
  const { products, isLoading: isLoadingProducts } = useProducts();
  const { categories, isLoading: isLoadingCategories } = useCategories();

  const isLoading = isLoadingProducts || isLoadingCategories;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  const featuredCount = products.filter((p) => p.featured).length;
  const onSaleCount = products.filter((p) => p.onSale).length;
  const unavailableCount = products.filter((p) => !p.available).length;
  const latestProducts = [...products]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Visão geral do catálogo.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          label="Total de produtos"
          value={products.length}
          icon={Package}
        />
        <StatCard
          label="Total de categorias"
          value={categories.length}
          icon={Tag}
          colorClass="bg-secondary-100 text-secondary-600"
        />
        <StatCard
          label="Em destaque"
          value={featuredCount}
          icon={Star}
          colorClass="bg-yellow-50 text-yellow-600"
        />
        <StatCard
          label="Em promoção"
          value={onSaleCount}
          icon={Percent}
          colorClass="bg-red-50 text-red-600"
        />
        <StatCard
          label="Indisponíveis"
          value={unavailableCount}
          icon={XCircle}
          colorClass="bg-gray-100 text-gray-600"
        />
      </div>

      <div className="card p-6">
        <h2 className="font-semibold text-gray-900 mb-4">
          Últimos produtos cadastrados
        </h2>

        {latestProducts.length === 0 ? (
          <p className="text-gray-500 text-sm">
            Nenhum produto cadastrado ainda.
          </p>
        ) : (
          <div className="divide-y divide-gray-100">
            {latestProducts.map((product) => (
              <div key={product.id} className="flex items-center gap-4 py-3">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-12 w-12 rounded-lg object-cover border border-gray-200"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {product.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {product.categoryName}
                  </p>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {formatPrice(product.price)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
