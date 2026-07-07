import { Outlet, useNavigate } from "react-router-dom";
import { LogOut, Menu } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";
import { ROUTES } from "../../constants/routes";
import { AdminSidebar } from "../../components/admin/AdminSidebar";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  async function handleLogout() {
    await logout();
    toast.success("Você saiu da área administrativa.");
    navigate(ROUTES.ADMIN_LOGIN, { replace: true });
  }

  return (
    <div className="lg:flex min-h-screen">
      <AdminSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 min-w-0">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="text-gray-500 hover:text-gray-700 lg:hidden"
              aria-label="Abrir menu"
            >
              <Menu className="h-6 w-6" />
            </button>

            <div className="hidden lg:block" />

            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-sm text-gray-500 hidden sm:inline truncate max-w-[180px]">
                {user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 sm:px-4 py-2 rounded-xl inline-flex items-center gap-2 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
