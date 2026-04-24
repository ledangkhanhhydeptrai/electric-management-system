import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down";
  gradient: string;
}

export default function StatsCard({
  icon,
  label,
  value,
  change,
  trend,
  gradient
}: StatsCardProps) {
  const isPositive = trend === "up";

  return (
    <div
      className={`group relative bg-gradient-to-br ${gradient} rounded-2xl shadow-xl hover:shadow-2xl transition-all p-6 overflow-hidden`}
    >
      {/* Decorative blur */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg">
            {icon}
          </div>
          {change && (
            <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full font-semibold text-sm text-white">
              {isPositive ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
              {change}%
            </div>
          )}
        </div>

        <h3 className="text-4xl font-bold text-white mb-2">{value}</h3>
        <p className="text-white/90 text-sm font-medium">{label}</p>
      </div>
    </div>
  );
}
