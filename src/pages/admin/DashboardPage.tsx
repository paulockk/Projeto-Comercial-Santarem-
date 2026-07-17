import { Link } from "react-router-dom";
import {
  Package,
  Tag,
  Star,
  Percent,
  XCircle,
  PlusCircle,
  FolderPlus,
  List,
} from "lucide-react";
import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";
import { Spinner } from "../../components/ui/Spinner";
import { formatPrice } from "../../utils/formatPrice";
import { ROUTES } from "../../constants/routes";

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

  const stats = [
    {
      label: "Total de produtos",
      value: products.length,
      icon: Package,
      color: "text-[#2E3192] bg-[#2E3192]/10",
    },
    {
      label: "Total de categorias",
      value: categories.length,
      icon: Tag,
      color: "text-[#2E3192] bg-[#2E3192]/10",
    },
    {
      label: "Em destaque",
      value: featuredCount,
      icon: Star,
      color: "text-amber-600 bg-amber-50",
    },
    {
      label: "Em promoção",
      value: onSaleCount,
      icon: Percent,
      color: "text-accent-600 bg-accent-50",
    },
    {
      label: "Indisponíveis",
      value: unavailableCount,
      icon: XCircle,
      color: "text-gray-500 bg-gray-100",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2E3192]">
          Dashboard
        </h1>
        <p className="text-gray-500 mt-1">Visão geral do catálogo.</p>
      </div>

      {/* Ações rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <Link
          to={ROUTES.ADMIN_PRODUCTS_NEW}
          className="card p-5 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all group"
        >
          <div className="h-12 w-12 rounded-xl bg-[#2E3192] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
            <PlusCircle className="h-6 w-6" />
          </div>
          <div>
            <p className="font-bold text-gray-900">Novo produto</p>
            <p className="text-sm text-gray-500">Cadastrar item no catálogo</p>
          </div>
        </Link>

        <Link
          to={ROUTES.ADMIN_CATEGORIES_NEW}
          className="card p-5 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all group"
        >
          <div className="h-12 w-12 rounded-xl  bg-[#E30613] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
            <FolderPlus className="h-6 w-6" />
          </div>
          <div>
            <p className="font-bold text-gray-900">Nova categoria</p>
            <p className="text-sm text-gray-500">Organizar os produtos</p>
          </div>
        </Link>

        <Link
          to={ROUTES.ADMIN_PRODUCTS}
          className="card p-5 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all group"
        >
          <div className="h-12 w-12 rounded-xl bg-gray-100 text-gray-700 flex items-center justify-center group-hover:scale-105 transition-transform">
            <List className="h-6 w-6" />
          </div>
          <div>
            <p className="font-bold text-gray-900">Ver produtos</p>
            <p className="text-sm text-gray-500">Editar ou remover itens</p>
          </div>
        </Link>

        <Link
          to={ROUTES.ADMIN_CATEGORIES}
          className="card p-5 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all group"
        >
          <div className="h-12 w-12 rounded-xl bg-gray-100 text-gray-700 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Tag className="h-6 w-6" />
          </div>
          <div>
            <p className="font-bold text-gray-900">Ver categorias</p>
            <p className="text-sm text-gray-500">
              Editar ou remover categorias
            </p>
          </div>
        </Link>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="card p-4 sm:p-5 flex items-center gap-3 sm:gap-4"
          >
            <div
              className={`h-10 w-10 sm:h-12 sm:w-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}
            >
              <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-gray-500 truncate">
                {label}
              </p>
              <p className="text-lg sm:text-2xl font-extrabold text-gray-900">
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="card p-6">
        <h2 className="font-extrabold text-[#2E3192] mb-4">
          Últimos produtos cadastrados
        </h2>
        {latestProducts.length === 0 ? (
          <p className="text-gray-500 text-sm">
            Nenhum produto cadastrado ainda.
          </p>
        ) : (
          <div className="divide-y divide-gray-100">
            {latestProducts.map((product) => (
              <Link
                key={product.id}
                to={ROUTES.ADMIN_PRODUCTS_EDIT.replace(":id", product.id)}
                className="flex items-center gap-4 py-3 hover:bg-gray-50 -mx-2 px-2 rounded-xl transition-colors"
              >
                <img
                  src={product.images[0] ?? ""}
                  alt={product.name}
                  className="h-12 w-12 rounded-lg object-contain border border-gray-200"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 truncate">
                    {product.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {product.categoryName}
                  </p>
                </div>
                <span className="text-sm font-bold text-gray-700">
                  {formatPrice(product.price)}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
