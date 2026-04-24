import React from "react";
import { Users, Plus, TrendingUp } from "lucide-react";

interface HeaderProps {
  stats: {
    total: number;
    newThisMonth: number;
  };
  onAddClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ stats, onAddClick }) => {
  return (
    <div className="animate-fadeInUp">
      <div className="bg-white shadow-2xl p-6 md:p-8 border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Title & Stats */}
          <div className="flex items-start gap-4">
            <div className="bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 p-4 rounded-2xl shadow-lg shadow-indigo-500/30">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Quản Lý Khách Hàng
              </h1>
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-semibold shadow-sm">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2 animate-pulse" />
                  {stats.total} khách hàng
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                  <TrendingUp className="w-3 h-3 mr-1" />+
                  {stats.newThisMonth} tháng này
                </span>
              </div>
            </div>
          </div>

          {/* Add Button */}
          <button
            onClick={onAddClick}
            className="group px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:scale-105 transition-all duration-200 font-semibold flex items-center gap-2"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            Thêm khách hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
