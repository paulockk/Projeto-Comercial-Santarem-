import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, DatabaseZap } from "lucide-react";
import toast from "react-hot-toast";
import { SEED_CATEGORIES } from "../../data/seedData";
import { createCategory } from "../../services/category.service";
import { createProduct } from "../../services/product.service";
import { ROUTES } from "../../constants/routes";

const PLACEHOLDER_IMAGE = "https://placehold.co/400x400?text=Produto";

export default function SeedPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  function addLog(message: string) {
    setLog((prev) => [...prev, message]);
  }

  async function handleSeed() {
    setIsRunning(true);
    setLog([]);

    try {
      for (const category of SEED_CATEGORIES) {
        const categoryId = await createCategory({
          name: category.name,
          description: category.description,
          icon: category.icon,
          imageUrl: "",
        });
        addLog(`Categoria criada: ${category.name}`);

        for (const product of category.products) {
          await createProduct({
            name: product.name,
            categoryId,
            categoryName: category.name,
            imageUrl: PLACEHOLDER_IMAGE,
            description: product.description,
            brand: product.brand,
            featured: false,
            onSale: false,
            available: true,
          });
          addLog(`  → Produto criado: ${product.name}`);
        }
      }

      toast.success("Importação concluída!");
    } catch (error) {
      toast.error("Erro durante a importação. Veja o log.");
      addLog(`ERRO: ${(error as Error).message}`);
    } finally {
      setIsRunning(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <Link
        to={ROUTES.ADMIN_DASHBOARD}
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar ao dashboard
      </Link>

      <h1 className="text-2xl font-bold text-gray-900 mb-1">
        Importar dados iniciais
      </h1>
      <p className="text-gray-500 mb-6">
        Isso vai criar {SEED_CATEGORIES.length} categorias e seus produtos no
        Firestore. Use apenas uma vez.
      </p>

      <div className="card p-6 space-y-4">
        <button
          onClick={handleSeed}
          disabled={isRunning}
          className="btn-primary w-full"
        >
          <DatabaseZap className="h-4 w-4" />
          {isRunning ? "Importando..." : "Rodar importação"}
        </button>

        {log.length > 0 && (
          <div className="bg-gray-900 text-gray-100 text-xs rounded-lg p-4 max-h-80 overflow-y-auto font-mono space-y-0.5">
            {log.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
