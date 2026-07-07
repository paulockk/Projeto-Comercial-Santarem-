import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { ArrowLeft, ImagePlus, Save } from "lucide-react";
import {
  categorySchema,
  type CategorySchemaData,
} from "../../schemas/category.schema";
import { createCategory } from "../../services/category.service";
import { ImageUrlPreview } from "../../components/ui/ImageUrlPreview";
import { ROUTES } from "../../constants/routes";
import { FormActionBar } from "../../components/ui/FormActionBar";

export default function CategoryNewPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CategorySchemaData>({
    resolver: zodResolver(categorySchema),
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const imageUrl = watch("imageUrl");

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
    <div className="max-w-2xl mx-auto lg:mx-0 pb-6">
      <Link
        to={ROUTES.ADMIN_DASHBOARD}
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar ao dashboard
      </Link>

      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
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

        <div className="grid sm:grid-cols-[1fr_auto] gap-5 items-start">
          <div>
            <label htmlFor="imageUrl" className="label-field">
              URL da imagem (opcional)
            </label>
            <div className="relative">
              <ImagePlus className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                id="imageUrl"
                className="input-field pl-10"
                placeholder="https://exemplo.com/categoria.jpg"
                {...register("imageUrl")}
              />
            </div>
            {errors.imageUrl && (
              <p className="text-sm text-red-600 mt-1.5">
                {errors.imageUrl.message}
              </p>
            )}
          </div>

          <ImageUrlPreview url={imageUrl} alt="Pré-visualização da categoria" />
        </div>

        <FormActionBar>
          <Link
            to={ROUTES.ADMIN_DASHBOARD}
            className="btn-secondary w-full sm:w-auto"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full sm:w-auto"
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
        </FormActionBar>
      </form>
    </div>
  );
}
