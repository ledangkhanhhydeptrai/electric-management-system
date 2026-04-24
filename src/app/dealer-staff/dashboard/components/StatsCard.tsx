import React from "react";

interface StatsCardProps {
  title: string;
  value: React.ReactNode;
  icon: React.ReactNode;
  gradient?: string;
  trend?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  gradient = "bg-gradient-to-br from-blue-400 to-indigo-600",
  trend
}) => (
  <div
    className={`relative overflow-hidden rounded-2xl ${gradient} p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}
  >
    <div className="flex items-center justify-between">
      <div className="text-white">
        <p className="text-sm font-medium opacity-90 mb-1">{title}</p>
        <h3 className="text-3xl font-bold mb-1">{value}</h3>
        {trend && <p className="text-xs opacity-80">{trend}</p>}
      </div>
      <div className="text-white text-4xl opacity-80">{icon}</div>
    </div>
    <div className="absolute -right-6 -bottom-6 text-white opacity-10 text-7xl">
      {icon}
    </div>
  </div>
);

export default StatsCard;
