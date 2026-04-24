import React from "react";
import { Package } from "lucide-react";

interface HeaderProps {
  totalItems: number;
  message: string;
  onCreateInventory?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  totalItems,
  message,
}) => {
  return (
    <div className="max-w-7xl mx-auto mb-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-600 p-3 rounded-lg">
              <Package className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Hệ thống Quản lý Tồn kho
              </h1>
              <p className="text-gray-600 mt-1">{message}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">Tổng số kho</p>
              <p className="text-3xl font-bold text-blue-600">{totalItems}</p>
            </div>

            {/* <button
              onClick={onCreateInventory}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span className="font-semibold">Tạo kho</span>
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};
