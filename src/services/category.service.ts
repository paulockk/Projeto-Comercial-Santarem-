import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { COLLECTIONS } from "../constants/firebase";
import type { Category, CategoryFormData } from "../types/category.types";
import { uploadImage } from "./cloudinary.service";

const categoriesRef = collection(db, COLLECTIONS.CATEGORIES);

export class CategoryServiceError extends Error {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapDocToCategory(docSnap: any): Category {
  const data = docSnap.data();
  return {
    id: docSnap.id,
    name: data.name,
    description: data.description,
    icon: data.icon,
    imageUrl: data.imageUrl,
    imagePublicId: data.imagePublicId,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
}

export async function getAllCategories(): Promise<Category[]> {
  const snapshot = await getDocs(query(categoriesRef, orderBy("name", "asc")));
  return snapshot.docs.map(mapDocToCategory);
}

export async function getCategoryById(id: string): Promise<Category | null> {
  const snapshot = await getDoc(doc(db, COLLECTIONS.CATEGORIES, id));
  if (!snapshot.exists()) return null;
  return mapDocToCategory(snapshot);
}

export async function createCategory(input: CategoryFormData): Promise<string> {
  const now = Date.now();

  let imageUrl = "";
  let imagePublicId = "";

  if (input.image) {
    const uploaded = await uploadImage(input.image);
    imageUrl = uploaded.url;
    imagePublicId = uploaded.publicId;
  }

  const docRef = await addDoc(categoriesRef, {
    name: input.name,
    description: input.description ?? "",
    icon: input.icon ?? "",
    imageUrl,
    imagePublicId,
    createdAt: now,
    updatedAt: now,
  });

  return docRef.id;
}

export async function updateCategory(
  id: string,
  input: Partial<CategoryFormData>,
): Promise<void> {
  const payload: Record<string, unknown> = {
    updatedAt: Date.now(),
  };

  if (input.name !== undefined) payload.name = input.name;
  if (input.description !== undefined) payload.description = input.description;
  if (input.icon !== undefined) payload.icon = input.icon;

  if (input.image) {
    const uploaded = await uploadImage(input.image);
    payload.imageUrl = uploaded.url;
    payload.imagePublicId = uploaded.publicId;
  }

  await updateDoc(doc(db, COLLECTIONS.CATEGORIES, id), payload);
}

export async function deleteCategory(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTIONS.CATEGORIES, id));
}
