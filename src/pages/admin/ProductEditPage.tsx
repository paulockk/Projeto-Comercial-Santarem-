import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams, Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ArrowLeft, Save } from "lucide-react";
import {
  productSchema,
  type ProductSchemaData,
} from "../../schemas/product.schema";
import { useCategories } from "../../hooks/useCategories";
import { getProductById, updateProduct } from "../../services/product.service";
import { ImageUrlPreview } from "../../components/ui/ImageUrlPreview";
import { Toggle } from "../../components/ui/Toggle";
import { Spinner } from "../../components/ui/Spinner";
import { ROUTES } from "../../constants/routes";

export default function ProductEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { categories, isLoading: isLoadingCategories } = useCategories();

  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProductSchemaData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(productSchema) as any,
    mode: "onBlur",
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const imageUrl = watch("imageUrl");
  const categoryId = watch("categoryId");
  const selectedCategory = categories.find((c) => c.id === categoryId);
  const availableSubcategories = selectedCategory?.subcategories ?? [];

  useEffect(() => {
    if (!id) return;

    async function loadProduct() {
      try {
        const product = await getProductById(id!);
        if (!product) {
          setNotFound(true);
          return;
        }

        reset({
          name: product.name,
          categoryId: product.categoryId,
          subcategory: product.subcategory,
          imageUrl: product.imageUrl,
          price: product.price,
          description: product.description,
          brand: product.brand,
          featured: product.featured,
          onSale: product.onSale,
          available: product.available,
        });
      } catch {
        setNotFound(true);
      } finally {
        setIsLoadingProduct(false);
      }
    }

    loadProduct();
  }, [id, reset]);

  async function onSubmit(data: ProductSchemaData) {
    if (!id) return;

    const category = categories.find((c) => c.id === data.categoryId);
    if (!category) {
      toast.error("Categoria inválida.");
      return;
    }

    setIsSubmitting(true);
    try {
      await updateProduct(id, { ...data, categoryName: category.name });
      toast.success("Produto atualizado com sucesso!");
      navigate(ROUTES.ADMIN_PRODUCTS);
    } catch {
      toast.error("Não foi possível salvar as alterações.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoadingProduct) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (notFound) {
    return <Navigate to={ROUTES.ADMIN_PRODUCTS} replace />;
  }

  return (
    <div className="max-w-3xl mx-auto lg:mx-0 pb-10">
      <Link
        to={ROUTES.ADMIN_PRODUCTS}
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar para produtos
      </Link>

      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#2E3192]">
          Editar produto
        </h1>
        <p className="text-gray-500 text-sm sm:text-base mt-1">
          Atualize as informações do produto.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card p-5 sm:p-8 space-y-8"
        noValidate
      >
        <div className="space-y-5">
          <h2 className="text-xs font-bold uppercase tracking-wide text-[#2E3192]">
            Identificação
          </h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="name" className="label-field">
                Nome do produto *
              </label>
              <input id="name" className="input-field" {...register("name")} />
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
              {availableSubcategories.length > 0 && (
                <div>
                  <label htmlFor="subcategory" className="label-field">
                    Subcategoria (opcional)
                  </label>
                  <select
                    id="subcategory"
                    className="input-field"
                    {...register("subcategory")}
                  >
                    <option value="">Nenhuma</option>
                    {availableSubcategories.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {errors.categoryId && (
                <p className="text-sm text-red-600 mt-1.5">
                  {errors.categoryId.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <hr className="border-gray-100" />
        <div className="space-y-5">
          <h2 className="text-xs font-bold uppercase tracking-wide text-[#2E3192]">
            Imagem do produto
          </h2>

          <div>
            <label htmlFor="imageUrl" className="label-field">
              URL da imagem *
            </label>
            <input
              id="imageUrl"
              className="input-field"
              {...register("imageUrl")}
            />
            {errors.imageUrl && (
              <p className="text-sm text-red-600 mt-1.5">
                {errors.imageUrl.message}
              </p>
            )}
          </div>

          <ImageUrlPreview url={imageUrl} alt="Pré-visualização do produto" />
        </div>
        <hr className="border-gray-100" />
        <div className="space-y-5">
          <h2 className="text-xs font-bold uppercase tracking-wide text-[#2E3192]">
            Detalhes comerciais
          </h2>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="price" className="label-field">
                Preço (opcional)
              </label>
              <input
                id="price"
                type="number"
                step="0.01"
                className="input-field"
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
              {...register("description")}
            />
          </div>
        </div>
        <hr className="border-gray-100" />
        <div className="grid sm:grid-cols-3 gap-4">
          <Controller
            name="featured"
            control={control}
            render={({ field }) => (
              <Toggle
                label="Em destaque"
                description="Aparece na home"
                checked={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="onSale"
            control={control}
            render={({ field }) => (
              <Toggle
                label="Em promoção"
                description="Aparece na seção de ofertas"
                checked={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="available"
            control={control}
            render={({ field }) => (
              <Toggle
                label="Disponível"
                description="Visível no catálogo"
                checked={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2 border-t border-gray-100">
          <Link
            to={ROUTES.ADMIN_PRODUCTS}
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
                Salvar alterações
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
