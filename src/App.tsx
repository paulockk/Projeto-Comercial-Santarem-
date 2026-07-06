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

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" />
        <Routes>
          {/* Rota pública */}
          <Route path={ROUTES.HOME} element={<Home />} />

          {/* Outras rotas públicas (produtos, categorias, sobre, contato) virão aqui depois */}

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
                path={ROUTES.ADMIN_PRODUCTS_NEW}
                element={<ProductNewPage />}
              />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
