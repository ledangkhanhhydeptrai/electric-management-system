import React from "react";
import { FaPlus } from "react-icons/fa";

interface DashboardHeaderProps {
  onCreateOrder: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onCreateOrder }) => {
  return (
    <div className="flex items-center justify-between bg-white rounded-2xl shadow-lg p-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent flex items-center gap-3">
          <span className="text-4xl">🌱</span>
          Dealer Staff Dashboard
        </h1>
        <p className="text-gray-600 mt-1 ml-12">
          Chào mừng trở lại! Đây là tổng quan hoạt động của bạn
        </p>
      </div>
      <button
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
        onClick={onCreateOrder}
      >
        <FaPlus />
        Tạo đơn mới
      </button>
    </div>
  );
};

export default DashboardHeader;