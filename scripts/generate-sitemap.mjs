import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { writeFileSync } from "fs";
import "dotenv/config";

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const SITE_URL = "https://comercialsantarem.com.br";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function generateSitemap() {
  const staticUrls = ["/", "/produtos", "/categorias"];

  const productsSnap = await getDocs(collection(db, "products"));
  const productUrls = productsSnap.docs.map((doc) => `/produtos/${doc.id}`);

  const categoriesSnap = await getDocs(collection(db, "categories"));
  const categoryUrls = categoriesSnap.docs.map(
    (doc) => `/categoria/${slugify(doc.data().name)}`,
  );

  const allUrls = [...staticUrls, ...productUrls, ...categoryUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map((url) => `  <url><loc>${SITE_URL}${url}</loc></url>`).join("\n")}
</urlset>`;

  writeFileSync("public/sitemap.xml", xml);
  console.log(`Sitemap gerado com ${allUrls.length} URLs.`);
}

generateSitemap();
