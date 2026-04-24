import React from "react";
import { Package, ShoppingCart } from "lucide-react";

interface ContractItem {
  itemName: string;
  qty: number;
  unitPrice: number;
  amount: number;
}

interface ContractItemsTableProps {
  items: ContractItem[];
}

export const ContractItemsTable: React.FC<ContractItemsTableProps> = ({
  items
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden backdrop-blur-lg bg-opacity-90">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <ShoppingCart className="w-6 h-6" />
          Chi tiết sản phẩm
        </h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                Tên sản phẩm
              </th>
              <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">
                Số lượng
              </th>
              <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">
                Đơn giá
              </th>
              <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">
                Thành tiền
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={index}
                className={`transition-colors hover:bg-blue-50 ${
                  index !== items.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Package className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-semibold text-gray-800">
                      {item.itemName}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg">
                    {item.qty}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="font-semibold text-gray-700">
                    {formatCurrency(item.unitPrice)}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {formatCurrency(item.amount)}
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