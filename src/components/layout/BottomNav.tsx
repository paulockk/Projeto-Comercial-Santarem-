import { FaWhatsapp } from "react-icons/fa";

function isStoreOpen() {
  const now = new Date();

  const day = now.getDay(); // 0 domingo, 1 segunda...
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const currentMinutes = hour * 60 + minutes;

  const openTime = 7 * 60 + 30; // 07:30
  const closeWeekday = 18 * 60; // 18:00
  const closeSaturday = 12 * 60; // 12:00

  // Domingo fechado
  if (day === 0) return false;

  // Segunda a sexta
  if (day >= 1 && day <= 5) {
    return currentMinutes >= openTime && currentMinutes < closeWeekday;
  }

  // Sábado
  if (day === 6) {
    return currentMinutes >= openTime && currentMinutes < closeSaturday;
  }

  return false;
}

export default function BottomNav() {
  const open = isStoreOpen();

  return (
    <div className="fixed bottom-6 right-5 z-50 flex items-center gap-3">
      <div
        className={`rounded-2xl px-4 py-3 text-sm font-bold shadow-xl ${
          open ? "bg-green-100 text-green-800" : "bg-red-100 text-red-700"
        }`}
      >
        <div className="flex items-center gap-2">
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              open ? "bg-green-500" : "bg-red-500"
            }`}
          />

          {open ? "Estamos abertos" : "Estamos fechados"}
        </div>

        <p className="mt-1 text-xs font-medium opacity-80">
          {open
            ? "Atendimento pelo WhatsApp"
            : "Responderemos no próximo horário"}
        </p>
      </div>

      <a
        href="https://wa.me/5514981421678?text=Olá! Gostaria de saber mais sobre os produtos."
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-all duration-300 hover:scale-110"
      >
        <FaWhatsapp size={34} />
      </a>
    </div>
  );
}
