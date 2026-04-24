import React from "react";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number;
  description: string;
  icon: LucideIcon;
  gradientFrom: string;
  gradientTo: string;
  borderColor: string;
  shadowColor: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  description,
  icon: Icon,
  gradientFrom,
  gradientTo,
  borderColor,
  shadowColor
}) => {
  return (
    <div
      className={`group relative bg-gradient-to-br ${gradientFrom} ${gradientTo} backdrop-blur-md rounded-2xl p-6 border-2 ${borderColor} hover:shadow-2xl ${shadowColor} transition-all duration-300 hover:-translate-y-2`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientTo} group-hover:from-opacity-20 group-hover:to-opacity-20 rounded-2xl transition-all duration-300`}
      />
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div
            className={`w-16 h-16 bg-gradient-to-br ${gradientFrom.replace("/20", "")} ${gradientTo.replace("/20", "")} rounded-xl flex items-center justify-center shadow-2xl ${shadowColor} group-hover:scale-110 transition-all duration-300 border-2 ${borderColor}`}
          >
            <Icon className="w-8 h-8 text-white" />
          </div>
          <div className="text-right">
            <p className={`text-xs ${borderColor.replace("border-", "text-").replace("/40", "/300")} font-semibold uppercase mb-1`}>
              {title}
            </p>
            <p className="text-5xl font-black text-white drop-shadow-2xl">
              {value}
            </p>
          </div>
        </div>
        <p className={`text-sm ${borderColor.replace("border-", "text-").replace("/40", "/200")} font-medium`}>
          {description}
        </p>
      </div>
    </div>
  );
};