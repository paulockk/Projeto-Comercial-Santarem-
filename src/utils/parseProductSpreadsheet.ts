import * as XLSX from "xlsx";

export interface ProductSpreadsheetRow {
  name: string;
  categoryName: string;
  subcategory?: string;
  images: string[];
  price?: number;
  description?: string;
  brand?: string;
  featured: boolean;
  onSale: boolean;
  available: boolean;
}

function parseBoolean(value: unknown, defaultValue: boolean): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (normalized === "true" || normalized === "sim" || normalized === "1")
      return true;
    if (
      normalized === "false" ||
      normalized === "não" ||
      normalized === "nao" ||
      normalized === "0"
    )
      return false;
  }
  return defaultValue;
}

function parsePrice(value: unknown): number | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  const num =
    typeof value === "number"
      ? value
      : parseFloat(String(value).replace(",", "."));
  return Number.isNaN(num) ? undefined : num;
}

function parseImages(value: unknown): string[] {
  if (!value) return [];
  return String(value)
    .split("|")
    .map((url) => url.trim())
    .filter((url) => url.length > 0);
}

export async function parseProductSpreadsheet(
  file: File,
): Promise<ProductSpreadsheetRow[]> {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "array" });

  // Usa a aba "Produtos" se existir, senão a primeira aba do arquivo
  const sheetName = workbook.SheetNames.includes("Produtos")
    ? "Produtos"
    : workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const rawRows: Record<string, unknown>[] = XLSX.utils.sheet_to_json(sheet, {
    defval: "",
  });

  return rawRows
    .filter((row) => String(row.name ?? "").trim() !== "")
    .map((row) => ({
      name: String(row.name).trim(),
      categoryName: String(row.categoryName ?? "").trim(),
      subcategory: row.subcategory ? String(row.subcategory).trim() : undefined,
      images: parseImages(row.images),
      price: parsePrice(row.price),
      description: row.description ? String(row.description).trim() : undefined,
      brand: row.brand ? String(row.brand).trim() : undefined,
      featured: parseBoolean(row.featured, false),
      onSale: parseBoolean(row.onSale, false),
      available: parseBoolean(row.available, true),
    }));
}
