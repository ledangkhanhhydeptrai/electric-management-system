import React from "react";

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  iconBgColor: string;
  valueColor: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  iconBgColor,
  valueColor
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">
            {label}
          </p>
          <h2 className={`text-3xl font-bold ${valueColor}`}>
            {value}
          </h2>
        </div>
        <div className={`${iconBgColor} p-3 rounded-full`}>
          {icon}
        </div>
      </div>
    </div>
  );
};
