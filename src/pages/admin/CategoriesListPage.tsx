import { Link } from "react-router-dom";
import { FolderPlus } from "lucide-react";
import { useCategories } from "../../hooks/useCategories";
import { Spinner } from "../../components/ui/Spinner";
import { ROUTES } from "../../constants/routes";

export default function CategoriesListPage() {
  const { categories, isLoading } = useCategories();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categorias</h1>
          <p className="text-gray-500 mt-1">
            {categories.length} categoria(s) cadastrada(s)
          </p>
        </div>
        <Link to={ROUTES.ADMIN_CATEGORIES_NEW} className="btn-primary">
          <FolderPlus className="h-4 w-4" />
          Nova categoria
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      ) : categories.length === 0 ? (
        <div className="card p-10 text-center text-gray-500">
          Nenhuma categoria cadastrada ainda.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="card p-4 flex items-center gap-4">
              {category.imageUrl ? (
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="h-14 w-14 rounded-lg object-cover border border-gray-200"
                />
              ) : (
                <div className="h-14 w-14 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600 font-bold">
                  {category.name.charAt(0)}
                </div>
              )}
              <div>
                <p className="font-semibold text-gray-900">{category.name}</p>
                {category.description && (
                  <p className="text-sm text-gray-500 line-clamp-1">
                    {category.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
