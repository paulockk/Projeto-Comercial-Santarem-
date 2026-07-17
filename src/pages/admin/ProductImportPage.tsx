import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  parseProductSpreadsheet,
  type ProductSpreadsheetRow,
} from "../../utils/parseProductSpreadsheet";
import {
  importProductsFromSpreadsheet,
  type ImportLogEntry,
  type ImportSummary,
} from "../../services/productImport.service";
import { ROUTES } from "../../constants/routes";

const logIcon = {
  info: <Info className="h-4 w-4 text-gray-400 shrink-0" />,
  success: <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />,
  warning: <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />,
  error: <XCircle className="h-4 w-4 text-red-500 shrink-0" />,
};

export default function ProductImportPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [rows, setRows] = useState<ProductSpreadsheetRow[] | null>(null);
  const [fileName, setFileName] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const [log, setLog] = useState<ImportLogEntry[]>([]);
  const [summary, setSummary] = useState<ImportSummary | null>(null);

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setSummary(null);
    setLog([]);

    try {
      const parsed = await parseProductSpreadsheet(file);
      if (parsed.length === 0) {
        toast.error(
          "Nenhum produto encontrado na planilha. Confira o formato das colunas.",
        );
        setRows(null);
        return;
      }
      setRows(parsed);
      toast.success(`${parsed.length} produto(s) encontrado(s) na planilha.`);
    } catch {
      toast.error(
        "Não foi possível ler o arquivo. Confirme que é um .xlsx válido.",
      );
      setRows(null);
    }
  }

  async function handleImport() {
    if (!rows) return;

    setIsImporting(true);
    setLog([]);
    setSummary(null);

    const result = await importProductsFromSpreadsheet(rows, (entry) => {
      setLog((prev) => [...prev, entry]);
    });

    setSummary(result);
    setIsImporting(false);

    if (result.errors === 0) {
      toast.success("Importação concluída com sucesso!");
    } else {
      toast.error(
        `Importação concluída com ${result.errors} erro(s). Veja o log abaixo.`,
      );
    }
  }

  function reset() {
    setRows(null);
    setFileName("");
    setLog([]);
    setSummary(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
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
          Importar produtos em massa
        </h1>
        <p className="text-gray-500 text-sm sm:text-base mt-1">
          Envie uma planilha (.xlsx) para cadastrar vários produtos de uma vez.
          Categorias e subcategorias que ainda não existirem serão criadas
          automaticamente. Nada é apagado ou sobrescrito — produtos já
          cadastrados nunca são removidos.
        </p>
      </div>

      <div className="card p-5 sm:p-8 space-y-6">
        {!rows ? (
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileSelect}
              className="hidden"
              id="spreadsheet-input"
            />
            <label
              htmlFor="spreadsheet-input"
              className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gray-300 px-6 py-12 text-center cursor-pointer hover:border-[#2E3192] hover:bg-[#2E3192]/5 transition-colors"
            >
              <Upload className="h-8 w-8 text-gray-400" />
              <span className="text-sm font-bold text-gray-700">
                Clique para selecionar a planilha
              </span>
              <span className="text-xs text-gray-400">
                Formato .xlsx, com as colunas: name, categoryName, subcategory,
                images, price, description, brand, featured, onSale, available
              </span>
            </label>
          </div>
        ) : (
          <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-4">
            <FileSpreadsheet className="h-6 w-6 text-[#2E3192] shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-gray-800 truncate">
                {fileName}
              </p>
              <p className="text-xs text-gray-500">
                {rows.length} produto(s) prontos para importar
              </p>
            </div>
            <button
              onClick={reset}
              className="text-xs font-bold text-gray-500 hover:text-gray-700"
            >
              Trocar arquivo
            </button>
          </div>
        )}

        {rows && !summary && (
          <button
            onClick={handleImport}
            disabled={isImporting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2E3192] px-5 py-3 font-bold text-white hover:bg-[#242769] transition-colors disabled:opacity-50"
          >
            {isImporting
              ? "Importando..."
              : `Importar ${rows.length} produto(s)`}
          </button>
        )}

        {summary && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl bg-green-50 p-3 text-center">
              <p className="text-2xl font-extrabold text-green-700">
                {summary.productsCreated}
              </p>
              <p className="text-xs text-green-600">Produtos criados</p>
            </div>
            <div className="rounded-xl bg-amber-50 p-3 text-center">
              <p className="text-2xl font-extrabold text-amber-700">
                {summary.productsSkipped}
              </p>
              <p className="text-xs text-amber-600">Já existiam</p>
            </div>
            <div className="rounded-xl bg-blue-50 p-3 text-center">
              <p className="text-2xl font-extrabold text-blue-700">
                {summary.categoriesCreated}
              </p>
              <p className="text-xs text-blue-600">Categorias criadas</p>
            </div>
            <div className="rounded-xl bg-red-50 p-3 text-center">
              <p className="text-2xl font-extrabold text-red-700">
                {summary.errors}
              </p>
              <p className="text-xs text-red-600">Erros</p>
            </div>
          </div>
        )}

        {log.length > 0 && (
          <div className="max-h-80 space-y-1.5 overflow-y-auto rounded-xl border border-gray-100 bg-gray-50 p-4">
            {log.map((entry, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-xs text-gray-600"
              >
                {logIcon[entry.type]}
                <span>{entry.message}</span>
              </div>
            ))}
          </div>
        )}

        {summary && (
          <button
            onClick={reset}
            className="w-full rounded-xl border border-gray-200 px-5 py-3 font-bold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Importar outra planilha
          </button>
        )}
      </div>
    </div>
  );
}
