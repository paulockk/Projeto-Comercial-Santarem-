import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit as firestoreLimit,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { COLLECTIONS } from "../constants/firebase";
import type { Product, ProductFormData } from "../types/product.types";

const productsRef = collection(db, COLLECTIONS.PRODUCTS);

export class ProductServiceError extends Error {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapDocToProduct(docSnap: any): Product {
  const data = docSnap.data();
  return {
    id: docSnap.id,
    name: data.name,
    categoryId: data.categoryId,
    categoryName: data.categoryName,
    subcategory: data.subcategory,
    imageUrl: data.imageUrl,
    price: data.price,
    description: data.description,
    brand: data.brand,
    featured: data.featured,
    onSale: data.onSale,
    available: data.available,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const snapshot = await getDocs(
    query(productsRef, orderBy("createdAt", "desc")),
  );
  return snapshot.docs.map(mapDocToProduct);
}

export async function getProductById(id: string): Promise<Product | null> {
  const snapshot = await getDoc(doc(db, COLLECTIONS.PRODUCTS, id));
  if (!snapshot.exists()) return null;
  return mapDocToProduct(snapshot);
}

export async function getProductsByCategory(
  categoryId: string,
): Promise<Product[]> {
  const snapshot = await getDocs(
    query(
      productsRef,
      where("categoryId", "==", categoryId),
      orderBy("createdAt", "desc"),
    ),
  );
  return snapshot.docs.map(mapDocToProduct);
}

export async function getFeaturedProducts(max = 8): Promise<Product[]> {
  const snapshot = await getDocs(
    query(
      productsRef,
      // where("featured", "==", true),
      // where("available", "==", true),
      orderBy("createdAt", "desc"),
      firestoreLimit(max),
    ),
  );
  return snapshot.docs.map(mapDocToProduct);
}

export async function getOnSaleProducts(max = 8): Promise<Product[]> {
  const snapshot = await getDocs(
    query(
      productsRef,
      where("onSale", "==", true),
      where("available", "==", true),
      orderBy("createdAt", "desc"),
      firestoreLimit(max),
    ),
  );
  return snapshot.docs.map(mapDocToProduct);
}

export async function getLatestProducts(max = 5): Promise<Product[]> {
  const snapshot = await getDocs(
    query(productsRef, orderBy("createdAt", "desc"), firestoreLimit(max)),
  );
  return snapshot.docs.map(mapDocToProduct);
}

interface CreateProductInput extends ProductFormData {
  categoryName: string;
}

export async function createProduct(
  input: CreateProductInput,
): Promise<string> {
  const now = Date.now();

  const docRef = await addDoc(productsRef, {
    name: input.name,
    categoryId: input.categoryId,
    categoryName: input.categoryName,
    subcategory: input.subcategory ?? "",
    imageUrl: input.imageUrl,
    price: input.price ?? null,
    description: input.description ?? "",
    brand: input.brand ?? "",
    featured: input.featured,
    onSale: input.onSale,
    available: input.available,
    createdAt: now,
    updatedAt: now,
  });

  return docRef.id;
}

interface UpdateProductInput extends Partial<ProductFormData> {
  categoryName?: string;
}

export async function updateProduct(
  id: string,
  input: UpdateProductInput,
): Promise<void> {
  const payload: Record<string, unknown> = { updatedAt: Date.now() };

  if (input.name !== undefined) payload.name = input.name;
  if (input.categoryId !== undefined) payload.categoryId = input.categoryId;
  if (input.categoryName !== undefined)
    payload.categoryName = input.categoryName;
  if (input.subcategory !== undefined) payload.subcategory = input.subcategory;
  if (input.imageUrl !== undefined) payload.imageUrl = input.imageUrl;
  if (input.price !== undefined) payload.price = input.price;
  if (input.description !== undefined) payload.description = input.description;
  if (input.brand !== undefined) payload.brand = input.brand;
  if (input.featured !== undefined) payload.featured = input.featured;
  if (input.onSale !== undefined) payload.onSale = input.onSale;
  if (input.available !== undefined) payload.available = input.available;

  await updateDoc(doc(db, COLLECTIONS.PRODUCTS, id), payload);
}

export async function deleteProduct(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTIONS.PRODUCTS, id));
}
