import React from "react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  total: number;
  bgColor: string;
  iconBgColor: string;
  gradientColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  total,
  bgColor,
  iconBgColor,
  gradientColor
}) => {
  const percentage = total > 0 ? (value / total) * 100 : 0;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 card-hover">
      <div className="flex items-center justify-between mb-4">
        <div className={`${iconBgColor} p-3 rounded-xl`}>{icon}</div>
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-600">{label}</p>
          <p className={`text-3xl font-black ${bgColor}`}>{value}</p>
        </div>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${gradientColor} rounded-full transition-all duration-700`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default StatCard;