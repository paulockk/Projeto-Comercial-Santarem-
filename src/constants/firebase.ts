export const COLLECTIONS = {
  PRODUCTS: "products",
  CATEGORIES: "categories",
  USERS: "users",
} as const;

export const STORAGE_PATHS = {
  PRODUCTS: "products",
  CATEGORIES: "categories",
  BANNER: "banner",
  LOGO: "logo",
} as const;

export const MAX_IMAGE_SIZE_MB = 5;
export const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
