import React from "react";
import { Package } from "lucide-react";

export const EmptyState: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-12 text-center">
      <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        Không tìm thấy kết quả
      </h3>
      <p className="text-gray-500">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
    </div>
  );
};
