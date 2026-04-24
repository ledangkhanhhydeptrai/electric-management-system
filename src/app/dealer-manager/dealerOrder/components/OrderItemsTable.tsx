import React from "react";
import { Package } from "lucide-react";
import { ItemProps } from "@/services/dealerOrderService/dealerOrder";
import ColorDisplay from "./ColorDisplay";

interface OrderItemsTableProps {
  items: ItemProps[];
}

const OrderItemsTable: React.FC<OrderItemsTableProps> = ({ items }) => {
  return (
    <div>
      <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Package className="w-5 h-5 text-blue-600" />
        Chi tiết xe đặt hàng
      </h4>
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">Model xe</th>
              <th className="px-6 py-4 text-left font-semibold">Màu sắc</th>
              <th className="px-6 py-4 text-center font-semibold">Số lượng</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={item.id}
                className={`transition-colors hover:bg-blue-50 ${
                  index !== items.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <td className="px-6 py-4">
                  <span className="font-semibold text-gray-800">
                    {item.modelName}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <ColorDisplay color={item.color} />
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg">
                    {item.quantity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderItemsTable;
