
import React from "react";
import { FaCar } from "react-icons/fa";
import { Order } from "../types/types";

interface OrderRowProps {
  order: Order;
}

const OrderRow: React.FC<OrderRowProps> = ({ order }) =>
  <tr className="hover:bg-green-50 transition-colors duration-200 group">
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-500 group-hover:scale-150 transition-transform" />
        <span className="text-sm font-bold text-green-600">
          {order.id}
        </span>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold shadow-md">
          {order.name.charAt(0)}
        </div>
        <span className="text-sm font-semibold text-gray-900">
          {order.name}
        </span>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center gap-2">
        <FaCar className="text-green-500" />
        <span className="text-sm font-medium text-gray-900">
          {order.car}
        </span>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span className="text-sm font-bold text-green-600">
        {order.price}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${order.color}`}
      >
        {order.icon}
        {order.status}
      </span>
    </td>
  </tr>;

export default OrderRow;
