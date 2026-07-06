import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  colorClass?: string;
}

export function StatCard({
  label,
  value,
  icon: Icon,
  colorClass = "bg-primary-50 text-primary-600",
}: StatCardProps) {
  return (
    <div className="card p-5 flex items-center gap-4">
      <div
        className={`h-12 w-12 rounded-lg flex items-center justify-center ${colorClass}`}
      >
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
