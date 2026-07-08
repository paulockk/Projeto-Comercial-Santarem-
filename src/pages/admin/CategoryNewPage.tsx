import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { ArrowLeft, Save } from "lucide-react";
import {
  categorySchema,
  type CategorySchemaData,
} from "../../schemas/category.schema";
import { createCategory } from "../../services/category.service";
import { IconPicker } from "../../components/admin/IconPicker";
import { ROUTES } from "../../constants/routes";
import { TagInput } from "../../components/admin/TagInput";

export default function CategoryNewPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CategorySchemaData>({
    resolver: zodResolver(categorySchema),
    defaultValues: { icon: "PawPrint", subcategories: [] },
  });

  async function onSubmit(data: CategorySchemaData) {
    setIsSubmitting(true);
    try {
      await createCategory(data);
      toast.success("Categoria cadastrada com sucesso!");
      navigate(ROUTES.ADMIN_CATEGORIES);
    } catch {
      toast.error("Não foi possível salvar a categoria. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto lg:mx-0 pb-10">
      <Link
        to={ROUTES.ADMIN_DASHBOARD}
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar ao dashboard
      </Link>

      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#2E3192]">
          Nova categoria
        </h1>
        <p className="text-gray-500 text-sm sm:text-base mt-1">
          Categorias ajudam a organizar os produtos do catálogo.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card p-5 sm:p-8 space-y-6"
        noValidate
      >
        <div>
          <label htmlFor="name" className="label-field">
            Nome da categoria *
          </label>
          <input
            id="name"
            className="input-field"
            placeholder="Ex: Ração para cães"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-red-600 mt-1.5">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="label-field">
            Descrição (opcional)
          </label>
          <textarea
            id="description"
            rows={3}
            className="input-field resize-none"
            placeholder="Breve descrição da categoria"
            {...register("description")}
          />
        </div>

        <div>
          <label className="label-field">Subcategorias (opcional)</label>
          <Controller
            name="subcategories"
            control={control}
            render={({ field }) => (
              <TagInput
                value={field.value ?? []}
                onChange={field.onChange}
                placeholder="Ex: Ração, Brinquedos, Higiene..."
              />
            )}
          />
          <p className="text-xs text-gray-400 mt-2">
            Essas opções aparecem como filtro dentro dos produtos dessa
            categoria.
          </p>
        </div>

        <div>
          <label className="label-field">Ícone da categoria *</label>
          <Controller
            name="icon"
            control={control}
            render={({ field }) => (
              <IconPicker value={field.value} onChange={field.onChange} />
            )}
          />
          <p className="text-xs text-gray-400 mt-2">
            Escolha o ícone que representa essa categoria no catálogo.
          </p>
        </div>

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2 border-t border-gray-100">
          <Link
            to={ROUTES.ADMIN_DASHBOARD}
            className="text-center px-5 py-3 rounded-xl border border-gray-200 font-bold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-white bg-[#2E3192] hover:bg-[#242769] transition-colors disabled:opacity-50"
          >
            {isSubmitting ? (
              "Salvando..."
            ) : (
              <>
                <Save className="h-4 w-4" />
                Salvar categoria
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
