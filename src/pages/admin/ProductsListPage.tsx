import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { useProducts } from "../../hooks/useProducts";
import { Spinner } from "../../components/ui/Spinner";
import { formatPrice } from "../../utils/formatPrice";
import { ROUTES } from "../../constants/routes";

export default function ProductsListPage() {
  const { products, isLoading } = useProducts();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Produtos</h1>
          <p className="text-gray-500 mt-1">
            {products.length} produto(s) cadastrado(s)
          </p>
        </div>
        <Link to={ROUTES.ADMIN_PRODUCTS_NEW} className="btn-primary">
          <PlusCircle className="h-4 w-4" />
          Novo produto
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      ) : products.length === 0 ? (
        <div className="card p-10 text-center text-gray-500">
          Nenhum produto cadastrado ainda.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="card p-4 flex gap-4">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-16 w-16 rounded-lg object-cover border border-gray-200 flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 truncate">
                  {product.name}
                </p>
                <p className="text-sm text-gray-500">{product.categoryName}</p>
                <p className="text-sm font-medium text-gray-700 mt-1">
                  {formatPrice(product.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
