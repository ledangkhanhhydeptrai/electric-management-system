// components/ContractTable/ContractItemsTable.tsx
import { Contract } from "@/app/dealer-manager/contract/types/contract";
import React from "react";

interface ContractItemsTableProps {
  items: Contract["items"];
}

const ContractItemsTable: React.FC<ContractItemsTableProps> = ({ items }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
      <table className="w-full">
        <thead>
          <tr className="bg-gradient-to-r from-gray-100 to-blue-100">
            <th className="px-3 py-2 text-left text-xs font-bold text-gray-700 uppercase tracking-wider rounded-tl-lg">
              Tên sản phẩm/dịch vụ
            </th>
            <th className="px-3 py-2 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
              Số lượng
            </th>
            <th className="px-3 py-2 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
              Đơn giá
            </th>
            <th className="px-3 py-2 text-right text-xs font-bold text-gray-700 uppercase tracking-wider rounded-tr-lg">
              Thành tiền
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {items.map((item, idx) => (
            <tr
              key={idx}
              className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-colors duration-200"
            >
              <td className="px-3 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shadow">
                    {idx + 1}
                  </div>
                  <span className="text-xs font-medium text-gray-800">
                    {item.itemName}
                  </span>
                </div>
              </td>
              <td className="px-3 py-3 text-center">
                <span className="inline-flex items-center justify-center w-10 h-6 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs font-bold">
                  {item.qty}
                </span>
              </td>
              <td className="px-3 py-3 text-right">
                <span className="text-xs font-semibold text-gray-700">
                  {(item.unitPrice / 1000).toLocaleString("vi-VN")}K
                </span>
              </td>
              <td className="px-3 py-3 text-right">
                <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                  {(item.amount / 1000).toLocaleString("vi-VN")}K
                </span>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gradient-to-r from-gray-100 to-blue-100">
            <td
              colSpan={3}
              className="px-3 py-3 text-right text-xs font-bold text-gray-700"
            >
              Tổng cộng:
            </td>
            <td className="px-3 py-3 text-right">
              <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                {(
                  items.reduce((sum, item) => sum + item.amount, 0) / 1000
                ).toLocaleString("vi-VN")}
                K
              </span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ContractItemsTable;
