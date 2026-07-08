import { useState } from "react";
import { Link } from "react-router-dom";
import { FolderPlus, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useCategories } from "../../hooks/useCategories";
import { Spinner } from "../../components/ui/Spinner";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";
import { deleteCategory } from "../../services/category.service";
import { getIconComponent } from "../../utils/iconMap";
import { ROUTES } from "../../constants/routes";
import type { Category } from "../../types/category.types";

export default function CategoriesListPage() {
  const { categories, isLoading, refetch } = useCategories();
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!categoryToDelete) return;

    setIsDeleting(true);
    try {
      await deleteCategory(categoryToDelete.id);
      toast.success("Categoria excluída com sucesso.");
      setCategoryToDelete(null);
      refetch();
    } catch {
      toast.error("Não foi possível excluir a categoria.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2E3192]">
            Categorias
          </h1>
          <p className="text-gray-500 mt-1">
            {categories.length} categoria(s) cadastrada(s)
          </p>
        </div>
        <Link
          to={ROUTES.ADMIN_CATEGORIES_NEW}
          className="btn-primary w-full sm:w-auto"
        >
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
          {categories.map((category) => {
            const Icon = getIconComponent(category.icon);

            return (
              <div key={category.id} className="card p-4 flex gap-4">
                <div className="h-14 w-14 shrink-0 rounded-lg bg-[#2E3192]/10 flex items-center justify-center text-[#2E3192]">
                  <Icon className="h-6 w-6" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-bold text-gray-900 truncate">
                    {category.name}
                  </p>
                  {category.description && (
                    <p className="text-sm text-gray-500 line-clamp-1">
                      {category.description}
                    </p>
                  )}

                  <div className="flex items-center gap-2 mt-3">
                    <Link
                      to={ROUTES.ADMIN_CATEGORIES_EDIT.replace(
                        ":id",
                        category.id,
                      )}
                      className="flex items-center gap-1.5 text-xs font-bold text-[#2E3192] bg-[#2E3192]/10 hover:bg-[#2E3192]/15 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Editar
                    </Link>
                    <button
                      onClick={() => setCategoryToDelete(category)}
                      className="flex items-center gap-1.5 text-xs font-bold text-accent-600 bg-accent-50 hover:bg-accent-100 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!categoryToDelete}
        title="Excluir categoria?"
        description={`Tem certeza que deseja excluir "${categoryToDelete?.name}"? Os produtos dessa categoria não serão excluídos, mas ficarão sem categoria válida.`}
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setCategoryToDelete(null)}
      />
    </div>
  );
}
