import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/AuthContext";
import { PrivateRoute } from "./components/admin/PrivateRoute";
import AdminLayout from "./components/layout/AdminLayout";
import LoginPage from "./pages/admin/LoginPage";
import DashboardPage from "./pages/admin/DashboardPage";
import Home from "./pages/Home";
import { ROUTES } from "./constants/routes";
import ProductNewPage from "./pages/admin/ProductNewPage";
import ScrollToTop from "./components/common/ScrollToTop";
import ProductsListPage from "./pages/admin/ProductsListPage";
import CategoriesListPage from "./pages/admin/CategoriesListPage";
import CategoryNewPage from "./pages/admin/CategoryNewPage";
import ProductDetails from "./pages/ProductsDetails";
import CategoriesDetails from "./pages/CategoryDetails";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import CategoryEditPage from "./pages/admin/CategoryEditPage";
import ProductEditPage from "./pages/admin/ProductEditPage";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <Toaster position="top-right" />
        <Routes>
          {/* Rota pública */}
          <Route path={ROUTES.HOME} element={<Home />} />

          <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetails />} />
          <Route path={ROUTES.PRODUCTS} element={<Products />} />
          <Route path={ROUTES.CATEGORIES} element={<Categories />} />
          <Route
            path={ROUTES.CATEGORY_DETAIL}
            element={<CategoriesDetails />}
          />

          {/* Rota para páginas não encontradas */}
          <Route path="*" element={<NotFound />} />

          {/* Login do admin */}
          <Route path={ROUTES.ADMIN_LOGIN} element={<LoginPage />} />

          {/* Rotas protegidas do admin */}
          <Route element={<PrivateRoute />}>
            <Route element={<AdminLayout />}>
              <Route
                path={ROUTES.ADMIN_DASHBOARD}
                element={<DashboardPage />}
              />
              <Route
                path={ROUTES.ADMIN_PRODUCTS}
                element={<ProductsListPage />}
              />
              <Route
                path={ROUTES.ADMIN_PRODUCTS_NEW}
                element={<ProductNewPage />}
              />
              <Route
                path={ROUTES.ADMIN_CATEGORIES}
                element={<CategoriesListPage />}
              />
              <Route
                path={ROUTES.ADMIN_CATEGORIES_NEW}
                element={<CategoryNewPage />}
              />
              <Route
                path={ROUTES.ADMIN_PRODUCTS_EDIT}
                element={<ProductEditPage />}
              />
              <Route
                path={ROUTES.ADMIN_CATEGORIES_EDIT}
                element={<CategoryEditPage />}
              />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
