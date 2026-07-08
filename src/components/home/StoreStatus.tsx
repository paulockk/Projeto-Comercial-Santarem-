export default function StoreStatus() {
  const now = new Date();

  const schedule = [
    null, // domingo
    { open: "07:30", close: "18:00", nextDay: "segunda-feira" },
    { open: "07:30", close: "18:00", nextDay: "terça-feira" },
    { open: "07:30", close: "18:00", nextDay: "quarta-feira" },
    { open: "07:30", close: "18:00", nextDay: "quinta-feira" },
    { open: "07:30", close: "18:00", nextDay: "sexta-feira" },
    { open: "07:30", close: "12:00", nextDay: "sábado" },
  ];

  function timeToMinutes(time: string) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  }

  function getNextOpenDay() {
    const currentDay = now.getDay();
    const todaySchedule = schedule[currentDay];

    // Se a loja estiver fechada hoje, verifica se há um horário de abertura mais tarde hoje.
    if (todaySchedule) {
      const openMinutes = timeToMinutes(todaySchedule.open);
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      if (currentMinutes < openMinutes) {
        return {
          dayName: "hoje",
          openTime: todaySchedule.open,
        };
      }
    }

    // procura o próximo dia de abertura nos próximos 7 dias.
    for (let i = 1; i <= 7; i++) {
      const nextDate = new Date(now);
      nextDate.setDate(now.getDate() + i);

      const day = nextDate.getDay();
      const daySchedule = schedule[day];

      if (daySchedule) {
        return {
          dayName: daySchedule.nextDay,
          openTime: daySchedule.open,
        };
      }
    }

    return null;
  }

  const currentDay = now.getDay();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const todaySchedule = schedule[currentDay];

  let isOpen = false;

  if (todaySchedule) {
    const openMinutes = timeToMinutes(todaySchedule.open);
    const closeMinutes = timeToMinutes(todaySchedule.close);

    isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;
  }

  const nextOpen = getNextOpenDay();

  return (
    <div
      className={`mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm font-semibold ${
        isOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          isOpen ? "animate-pulse bg-green-500" : "bg-red-500"
        }`}
      />

      {isOpen
        ? "Está aberto agora"
        : `Estamos fechados. Abre ${
            nextOpen?.dayName === "segunda-feira"
              ? "segunda-feira"
              : nextOpen?.dayName
          } às ${nextOpen?.openTime}`}
    </div>
  );
}
