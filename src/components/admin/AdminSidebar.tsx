import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import { ADMIN_MENU } from "../../constants/adminMenu";
import { COMPANY } from "../../constants/company";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden animate-fade-in"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen w-72 bg-[#2E3192] z-50
          flex flex-col transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        `}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-white text-sm leading-tight">
              {COMPANY.name}
              <span className="block text-white/60 font-medium text-xs">
                Painel administrativo
              </span>
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-white/70 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {ADMIN_MENU.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={onClose}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                  isActive
                    ? "bg-white text-[#2E3192]"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-6 py-4 border-t border-white/10">
          <p className="text-xs text-white/50">{COMPANY.name} v2.4</p>
        </div>
      </aside>
    </>
  );
}
