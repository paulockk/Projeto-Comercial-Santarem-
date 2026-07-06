import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { ArrowLeft, Save } from "lucide-react";
import {
  productSchema,
  type ProductSchemaData,
} from "../../schemas/product.schema";
import { useCategories } from "../../hooks/useCategories";
import { createProduct } from "../../services/product.service";
import { ImageUrlPreview } from "../../components/ui/ImageUrlPreview";
import { ROUTES } from "../../constants/routes";

export default function ProductNewPage() {
  const navigate = useNavigate();
  const { categories, isLoading: isLoadingCategories } = useCategories();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    mode: "onBlur",
    defaultValues: {
      featured: false,
      onSale: false,
      available: true,
      price: undefined,
    },
  });

  const imageUrl = watch("imageUrl");

  async function onSubmit(data: ProductSchemaData) {
    const category = categories.find((c) => c.id === data.categoryId);
    if (!category) {
      toast.error("Categoria inválida.");
      return;
    }

    setIsSubmitting(true);
    try {
      await createProduct({ ...data, categoryName: category.name });
      toast.success("Produto cadastrado com sucesso!");
      navigate(ROUTES.ADMIN_PRODUCTS);
    } catch {
      toast.error("Não foi possível salvar o produto. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl">
      <Link
        to={ROUTES.ADMIN_DASHBOARD}
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar ao dashboard
      </Link>

      <h1 className="text-2xl font-bold text-gray-900 mb-1">Novo produto</h1>
      <p className="text-gray-500 mb-6">
        Preencha os dados abaixo para cadastrar um item no catálogo.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card p-6 sm:p-8 space-y-6"
        noValidate
      >
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="label-field">
              Nome do produto *
            </label>
            <input
              id="name"
              className="input-field"
              placeholder="Ex: Ração Golden 15kg"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1.5">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="categoryId" className="label-field">
              Categoria *
            </label>
            <select
              id="categoryId"
              className="input-field"
              disabled={isLoadingCategories}
              {...register("categoryId")}
            >
              <option value="">Selecione uma categoria</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-sm text-red-600 mt-1.5">
                {errors.categoryId.message}
              </p>
            )}
            {!isLoadingCategories && categories.length === 0 && (
              <p className="text-sm text-amber-600 mt-1.5">
                Nenhuma categoria cadastrada.{" "}
                <Link
                  to={ROUTES.ADMIN_CATEGORIES_NEW}
                  className="underline font-medium"
                >
                  Criar categoria
                </Link>
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="imageUrl" className="label-field">
            URL da imagem *
          </label>
          <input
            id="imageUrl"
            className="input-field"
            placeholder="https://exemplo.com/foto-do-produto.jpg"
            {...register("imageUrl")}
          />
          {errors.imageUrl && (
            <p className="text-sm text-red-600 mt-1.5">
              {errors.imageUrl.message}
            </p>
          )}
          <p className="text-xs text-gray-400 mt-1.5">
            Cole o link de uma imagem do site do fabricante ou de onde o produto
            foi comprado.
          </p>

          <div className="mt-3">
            <ImageUrlPreview url={imageUrl} alt="Pré-visualização do produto" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="price" className="label-field">
              Preço (opcional)
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              className="input-field"
              placeholder="Ex: 189.90"
              {...register("price", { valueAsNumber: true })}
            />
            {errors.price && (
              <p className="text-sm text-red-600 mt-1.5">
                {errors.price.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="brand" className="label-field">
              Marca (opcional)
            </label>
            <input
              id="brand"
              className="input-field"
              placeholder="Ex: Golden"
              {...register("brand")}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="label-field">
            Descrição (opcional)
          </label>
          <textarea
            id="description"
            rows={4}
            className="input-field resize-none"
            placeholder="Detalhes sobre o produto..."
            {...register("description")}
          />
        </div>

        <div className="flex flex-wrap gap-6 pt-2 border-t border-gray-100">
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              {...register("featured")}
            />
            Produto em destaque
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              {...register("onSale")}
            />
            Produto em promoção
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              {...register("available")}
            />
            Disponível
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Link to={ROUTES.ADMIN_DASHBOARD} className="btn-secondary">
            Cancelar
          </Link>
          <button type="submit" disabled={isSubmitting} className="btn-primary">
            {isSubmitting ? (
              "Salvando..."
            ) : (
              <>
                <Save className="h-4 w-4" />
                Salvar produto
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
