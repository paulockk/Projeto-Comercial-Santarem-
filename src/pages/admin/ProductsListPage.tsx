import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PlusCircle, Pencil, Trash2, Search, X } from "lucide-react";
import toast from "react-hot-toast";
import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";
import { Spinner } from "../../components/ui/Spinner";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";
import { formatPrice } from "../../utils/formatPrice";
import { deleteProduct } from "../../services/product.service";
import { ROUTES } from "../../constants/routes";
import type { Product } from "../../types/product.types";

export default function ProductsListPage() {
  const { products, isLoading, refetch } = useProducts();
  const { categories } = useCategories();

  const [search, setSearch] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState("Todos");
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchText = search.toLowerCase();
      const matchesSearch =
        product.name.toLowerCase().includes(searchText) ||
        (product.brand ?? "").toLowerCase().includes(searchText) ||
        product.categoryName.toLowerCase().includes(searchText);

      const matchesCategory =
        activeCategoryId === "Todos" || product.categoryId === activeCategoryId;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, activeCategoryId]);

  async function handleDelete() {
    if (!productToDelete) return;

    setIsDeleting(true);
    try {
      await deleteProduct(productToDelete.id);
      toast.success("Produto excluído com sucesso.");
      setProductToDelete(null);
      refetch();
    } catch {
      toast.error("Não foi possível excluir o produto.");
    } finally {
      setIsDeleting(false);
    }
  }

  const hasActiveFilters = search !== "" || activeCategoryId !== "Todos";

  function clearFilters() {
    setSearch("");
    setActiveCategoryId("Todos");
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2E3192]">
            Produtos
          </h1>
          <p className="text-gray-500 mt-1">
            {isLoading
              ? "Carregando..."
              : `${filteredProducts.length} de ${products.length} produto(s)`}
          </p>
        </div>
        <Link
          to={ROUTES.ADMIN_PRODUCTS_NEW}
          className="btn-primary w-full sm:w-auto bg-[#2E3192] hover:bg-[#242769] text-white font-bold px-5 py-3 rounded-xl inline-flex items-center justify-center gap-2 transition-colors"
        >
          <PlusCircle className="h-4 w-4" />
          Novo produto
        </Link>
      </div>

      {/* Busca e filtro */}
      <div className="mb-6 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome, marca ou categoria..."
            className="input-field pl-11"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <select
          value={activeCategoryId}
          onChange={(e) => setActiveCategoryId(e.target.value)}
          className="input-field sm:w-56"
        >
          <option value="Todos">Todas as categorias</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      ) : products.length === 0 ? (
        <div className="card p-10 text-center text-gray-500">
          Nenhum produto cadastrado ainda.
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="card p-10 text-center text-gray-500">
          <p>Nenhum produto encontrado.</p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="mt-3 text-sm font-bold text-[#2E3192] hover:underline"
            >
              Limpar filtros
            </button>
          )}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="card p-4 flex gap-4">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-16 w-16 rounded-lg object-cover border border-gray-200 flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <p className="font-bold text-gray-900 truncate">
                  {product.name}
                </p>
                <p className="text-sm text-gray-500">{product.categoryName}</p>
                <p className="text-sm font-bold text-gray-700 mt-1">
                  {formatPrice(product.price)}
                </p>

                <div className="flex items-center gap-2 mt-3">
                  <Link
                    to={ROUTES.ADMIN_PRODUCTS_EDIT.replace(":id", product.id)}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#2E3192] bg-[#2E3192]/10 hover:bg-[#2E3192]/15 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Editar
                  </Link>
                  <button
                    onClick={() => setProductToDelete(product)}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#E30613] bg-[#E30613]/10 hover:bg-[#E30613]/15 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!productToDelete}
        title="Excluir produto?"
        description={`Tem certeza que deseja excluir "${productToDelete?.name}"? Essa ação não pode ser desfeita.`}
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setProductToDelete(null)}
      />
    </div>
  );
}
