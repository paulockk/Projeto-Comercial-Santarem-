import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { ArrowLeft, ImagePlus, Save } from "lucide-react";
import {
  productSchema,
  type ProductSchemaData,
} from "../../schemas/product.schema";
import { useCategories } from "../../hooks/useCategories";
import { createProduct } from "../../services/product.service";
import { ImageUrlPreview } from "../../components/ui/ImageUrlPreview";
import { ROUTES } from "../../constants/routes";
import { Toggle } from "../../components/ui/Toggle";
import { FormActionBar } from "../../components/ui/FormActionBar";

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

  // eslint-disable-next-line react-hooks/incompatible-library
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
    <div className="max-w-3xl mx-auto lg:mx-0 pb-6">
      <Link
        to={ROUTES.ADMIN_DASHBOARD}
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar ao dashboard
      </Link>

      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          Novo produto
        </h1>
        <p className="text-gray-500 text-sm sm:text-base mt-1">
          Preencha os dados abaixo para cadastrar um item no catálogo.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card p-5 sm:p-8 space-y-7"
        noValidate
      >
        {/* Identificação */}
        <section className="space-y-5">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-primary-600">
            Identificação
          </h2>

          <div className="grid sm:grid-cols-2 gap-5">
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
        </section>

        <hr className="border-gray-100" />

        {/* Imagem */}
        <section className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-primary-600">
            Imagem do produto
          </h2>

          <div className="grid sm:grid-cols-[1fr_auto] gap-5 items-start">
            <div>
              <label htmlFor="imageUrl" className="label-field">
                URL da imagem *
              </label>
              <div className="relative">
                <ImagePlus className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  id="imageUrl"
                  className="input-field pl-10"
                  placeholder="https://exemplo.com/foto-do-produto.jpg"
                  {...register("imageUrl")}
                />
              </div>
              {errors.imageUrl && (
                <p className="text-sm text-red-600 mt-1.5">
                  {errors.imageUrl.message}
                </p>
              )}
              <p className="text-xs text-gray-400 mt-1.5">
                Cole o link de uma imagem do site do fabricante ou de onde o
                produto foi comprado.
              </p>
            </div>

            <ImageUrlPreview url={imageUrl} alt="Pré-visualização do produto" />
          </div>
        </section>

        <hr className="border-gray-100" />

        {/* Preço e marca */}
        <section className="space-y-5">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-primary-600">
            Detalhes comerciais
          </h2>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="price" className="label-field">
                Preço (opcional)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                  R$
                </span>
                <input
                  id="price"
                  type="number"
                  step="0.01"
                  className="input-field pl-9"
                  placeholder="189,90"
                  {...register("price", { valueAsNumber: true })}
                />
              </div>
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
        </section>

        <hr className="border-gray-100" />

        {/* Visibilidade */}
        <section className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-primary-600">
            Visibilidade
          </h2>

          <div className="grid sm:grid-cols-3 gap-4">
            <Toggle
              label="Em destaque"
              description="Aparece na home"
              {...register("featured")}
            />
            <Toggle
              label="Em promoção"
              description="Aparece na seção de ofertas"
              {...register("onSale")}
            />
            <Toggle
              label="Disponível"
              description="Visível no catálogo"
              {...register("available")}
            />
          </div>
        </section>

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
                Salvar produto
              </>
            )}
          </button>
        </FormActionBar>
      </form>
    </div>
  );
}
