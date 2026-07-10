import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { Logo } from "../components/ui/Logo";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F8FC] px-4 text-center">
      <h1 className="mt-8 text-7xl sm:text-8xl font-extrabold text-[#2E3192]">
        404
      </h1>

      <h2 className="mt-4 text-xl sm:text-2xl font-extrabold text-gray-800">
        Página não encontrada
      </h2>

      <p className="mt-2 max-w-sm text-gray-500">
        O link que você acessou pode estar incorreto ou a página pode ter sido
        removida.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Link
          to="/"
          className="flex items-center justify-center gap-2 rounded-xl bg-[#2E3192] px-6 py-3 font-bold text-white hover:bg-[#242769] transition-colors"
        >
          <Home className="h-4 w-4" />
          Voltar ao início
        </Link>

        <button
          onClick={() => window.history.back()}
          className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-6 py-3 font-bold text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </button>
      </div>
    </div>
  );
}
