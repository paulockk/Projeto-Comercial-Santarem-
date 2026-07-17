import {
  getAllCategories,
  createCategory,
  updateCategory,
} from "./category.service";
import { getAllProducts, createProduct } from "./product.service";
import type { Category } from "../types/category.types";
import type { ProductSpreadsheetRow } from "../utils/parseProductSpreadsheet";

export interface ImportLogEntry {
  type: "info" | "success" | "warning" | "error";
  message: string;
}

export interface ImportSummary {
  categoriesCreated: number;
  subcategoriesCreated: number;
  productsCreated: number;
  productsSkipped: number;
  errors: number;
}

function normalize(text: string): string {
  return text.trim().toLowerCase();
}

/**
 * Importa produtos de uma planilha para o Firestore de forma 100% aditiva:
 * - Nunca apaga produtos ou categorias existentes.
 * - Categoria: se já existir (por nome), reutiliza; se não existir, cria.
 * - Subcategoria: se já existir na categoria, reutiliza; se não, adiciona à lista.
 * - Produto: sempre é criado (novo documento), exceto se já existir um produto
 *   com o mesmo nome na mesma categoria — nesse caso é pulado, para evitar
 *   duplicar ao rodar a mesma planilha mais de uma vez.
 */
export async function importProductsFromSpreadsheet(
  rows: ProductSpreadsheetRow[],
  onLog: (entry: ImportLogEntry) => void,
): Promise<ImportSummary> {
  const summary: ImportSummary = {
    categoriesCreated: 0,
    subcategoriesCreated: 0,
    productsCreated: 0,
    productsSkipped: 0,
    errors: 0,
  };

  onLog({
    type: "info",
    message: "Carregando categorias e produtos existentes...",
  });

  // Cache local das categorias, indexado por nome normalizado
  const existingCategories = await getAllCategories();
  const categoryCache = new Map<string, Category>();
  existingCategories.forEach((cat) =>
    categoryCache.set(normalize(cat.name), cat),
  );

  // Cache dos produtos existentes, pra evitar duplicar (chave: categoria + nome)
  const existingProducts = await getAllProducts();
  const existingProductKeys = new Set(
    existingProducts.map(
      (p) => `${normalize(p.categoryId)}::${normalize(p.name)}`,
    ),
  );

  onLog({
    type: "info",
    message: `${existingCategories.length} categoria(s) e ${existingProducts.length} produto(s) já existentes encontrados.`,
  });

  for (const [index, row] of rows.entries()) {
    const rowLabel = `Linha ${index + 2} ("${row.name}")`; // +2 porque a linha 1 é o cabeçalho

    try {
      if (!row.categoryName) {
        onLog({
          type: "error",
          message: `${rowLabel}: categoria não informada, produto ignorado.`,
        });
        summary.errors++;
        continue;
      }

      // 1. Resolve (ou cria) a categoria
      const categoryKey = normalize(row.categoryName);
      let category = categoryCache.get(categoryKey);

      if (!category) {
        const newCategoryId = await createCategory({
          name: row.categoryName,
          icon: "PawPrint",
          subcategories: row.subcategory ? [row.subcategory] : [],
        });

        category = {
          id: newCategoryId,
          name: row.categoryName,
          icon: "PawPrint",
          subcategories: row.subcategory ? [row.subcategory] : [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        categoryCache.set(categoryKey, category);
        summary.categoriesCreated++;
        if (row.subcategory) summary.subcategoriesCreated++;

        onLog({
          type: "success",
          message: `${rowLabel}: categoria "${row.categoryName}" criada${row.subcategory ? ` com subcategoria "${row.subcategory}"` : ""}.`,
        });
      } else if (row.subcategory) {
        // 2. Categoria já existe — verifica se precisa adicionar a subcategoria
        const hasSubcategory = category.subcategories?.some(
          (sub) => normalize(sub) === normalize(row.subcategory!),
        );

        if (!hasSubcategory) {
          const updatedSubcategories = [
            ...(category.subcategories ?? []),
            row.subcategory,
          ];
          await updateCategory(category.id, {
            subcategories: updatedSubcategories,
          });

          category = { ...category, subcategories: updatedSubcategories };
          categoryCache.set(categoryKey, category);
          summary.subcategoriesCreated++;

          onLog({
            type: "success",
            message: `${rowLabel}: subcategoria "${row.subcategory}" adicionada à categoria "${category.name}".`,
          });
        }
      }

      // 3. Evita duplicar produto já existente (mesmo nome + mesma categoria)
      const productKey = `${normalize(category.id)}::${normalize(row.name)}`;
      if (existingProductKeys.has(productKey)) {
        onLog({
          type: "warning",
          message: `${rowLabel}: produto já existe nessa categoria, pulado.`,
        });
        summary.productsSkipped++;
        continue;
      }

      // 4. Cria o produto
      if (row.images.length === 0) {
        onLog({
          type: "warning",
          message: `${rowLabel}: sem imagem definida, produto criado sem foto (ajuste depois no admin).`,
        });
      }

      await createProduct({
        name: row.name,
        categoryId: category.id,
        categoryName: category.name,
        subcategory: row.subcategory,
        images: row.images,
        price: row.price,
        description: row.description,
        brand: row.brand,
        featured: row.featured,
        onSale: row.onSale,
        available: row.available,
      });

      existingProductKeys.add(productKey);
      summary.productsCreated++;
      onLog({
        type: "success",
        message: `${rowLabel}: produto criado com sucesso.`,
      });
    } catch (error) {
      summary.errors++;
      onLog({
        type: "error",
        message: `${rowLabel}: erro ao processar — ${(error as Error).message}`,
      });
    }
  }

  return summary;
}
