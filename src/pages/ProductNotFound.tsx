import { Link } from "react-router-dom";
import { PackageX, Home, Grid3x3 } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function ProductNotFound() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen flex flex-col items-center justify-center bg-[#F7F8FC] px-4 pt-20 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#2E3192]/10 text-[#2E3192]">
          <PackageX className="h-10 w-10" />
        </div>

        <h1 className="mt-6 text-2xl sm:text-3xl font-extrabold text-[#2E3192]">
          Produto não encontrado
        </h1>

        <p className="mt-2 max-w-sm text-gray-500">
          Esse produto pode ter sido removido do catálogo ou o link que você
          acessou está incorreto.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            to="/produtos"
            className="flex items-center justify-center gap-2 rounded-xl bg-[#2E3192] px-6 py-3 font-bold text-white hover:bg-[#242769] transition-colors"
          >
            <Grid3x3 className="h-4 w-4" />
            Ver todos os produtos
          </Link>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-6 py-3 font-bold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Home className="h-4 w-4" />
            Voltar ao início
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
