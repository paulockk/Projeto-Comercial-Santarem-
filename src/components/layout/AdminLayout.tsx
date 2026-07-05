import { Outlet, Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";
import { ROUTES } from "../../constants/routes";
import { COMPANY } from "../../constants/company";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    toast.success("Você saiu da área administrativa.");
    navigate(ROUTES.ADMIN_LOGIN, { replace: true });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="container-custom flex items-center justify-between h-16">
          <Link to={ROUTES.ADMIN_DASHBOARD} className="font-bold text-gray-900">
            {COMPANY.name} <span className="text-primary-600">Admin</span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 hidden sm:inline">
              {user?.email}
            </span>
            <button onClick={handleLogout} className="btn-secondary text-sm">
              <LogOut className="h-4 w-4" />
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="container-custom py-8">
        <Outlet />
      </main>
    </div>
  );
}
