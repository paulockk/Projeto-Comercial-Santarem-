import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Breadcrumb() {
  return (
    <Link
      to="/"
      className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#2E3192] shadow-sm transition hover:text-[#E30613]"
    >
      <ArrowLeft size={18} />
      Voltar para início
    </Link>
  );
}