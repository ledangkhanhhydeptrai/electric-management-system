import React from "react";
import { Calendar, Filter, User, DollarSign } from "lucide-react";

import { OrderStats as OrderStatsType } from "../types/types";
import { formatCurrency } from "../utils/order.util";
interface OrderStatsProps {
  stats: OrderStatsType;
}

const OrderStats: React.FC<OrderStatsProps> = ({ stats }) => {
  const statCards = [
    {
      label: "Tổng đơn hàng",
      value: stats.total,
      icon: Calendar,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      valueColor: "text-gray-900"
    },
    {
      label: "Chờ xử lý",
      value: stats.pending,
      icon: Filter,
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
      valueColor: "text-yellow-600"
    },
    {
      label: "Đã giao",
      value: stats.delivered,
      icon: User,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      valueColor: "text-green-600"
    },
    {
      label: "Tổng doanh thu",
      value: formatCurrency(stats.totalRevenue),
      icon: DollarSign,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      valueColor: "text-purple-600"
    }
  ];

  return (
    <div className="ml-5 grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 overflow-x-hidden">
      {statCards.map((card, index) =>
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">
                {card.label}
              </p>
              <p className={`text-2xl font-bold ${card.valueColor}`}>
                {card.value}
              </p>
            </div>
            <div className={`${card.bgColor} p-3 rounded-lg`}>
              <card.icon className={`w-6 h-6 ${card.iconColor}`} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderStats;
