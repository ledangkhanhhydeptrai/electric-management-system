import React from "react";
import { FaChartLine } from "react-icons/fa";
import StatsCard from "./StatsCard";
import { StatsData } from "../types/types";



interface StatsSectionProps {
  stats: StatsData[];
}

const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <FaChartLine className="text-green-600 text-xl" />
        <h2 className="text-xl font-bold text-gray-800">Thống kê tổng quan</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatsCard key={idx} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default StatsSection;
