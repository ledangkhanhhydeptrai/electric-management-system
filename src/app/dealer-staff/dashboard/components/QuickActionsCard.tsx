import React from "react";
import { FaShoppingCart, FaUsers, FaCar, FaChartLine } from "react-icons/fa";

interface QuickAction {
  icon: React.ReactNode;
  label: string;
  color: string;
  borderColor: string;
  hoverBorder: string;
  hoverBg: string;
  onClick?: () => void;
}

const QuickActionsCard: React.FC = () => {
  const actions: QuickAction[] = [
    {
      icon: (
        <FaShoppingCart className="text-2xl text-green-600 mb-2 group-hover:scale-110 transition-transform" />
      ),
      label: "Đơn hàng mới",
      color: "text-green-600",
      borderColor: "border-green-200",
      hoverBorder: "hover:border-green-400",
      hoverBg: "hover:bg-green-50"
    },
    {
      icon: (
        <FaUsers className="text-2xl text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
      ),
      label: "Khách hàng",
      color: "text-blue-600",
      borderColor: "border-blue-200",
      hoverBorder: "hover:border-blue-400",
      hoverBg: "hover:bg-blue-50"
    },
    {
      icon: (
        <FaCar className="text-2xl text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
      ),
      label: "Kho xe",
      color: "text-purple-600",
      borderColor: "border-purple-200",
      hoverBorder: "hover:border-purple-400",
      hoverBg: "hover:bg-purple-50"
    },
    {
      icon: (
        <FaChartLine className="text-2xl text-orange-600 mb-2 group-hover:scale-110 transition-transform" />
      ),
      label: "Báo cáo",
      color: "text-orange-600",
      borderColor: "border-orange-200",
      hoverBorder: "hover:border-orange-400",
      hoverBg: "hover:bg-orange-50"
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Thao tác nhanh</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action, idx) => (
          <button
            key={idx}
            onClick={action.onClick}
            className={`p-4 rounded-xl border-2 ${action.borderColor} ${action.hoverBorder} ${action.hoverBg} transition-all duration-200 group flex items-center gap-2`}
          >
            {action.icon}
            <p className="text-sm font-semibold text-gray-700">
              {action.label}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsCard;
