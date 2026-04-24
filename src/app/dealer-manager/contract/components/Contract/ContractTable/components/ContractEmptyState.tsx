// components/ContractTable/ContractEmptyState.tsx
import React from "react";
import { FaFileContract } from "react-icons/fa";

const ContractEmptyState: React.FC = () => {
  return (
    <div className="text-center py-16">
      <div className="relative inline-block">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 blur-3xl opacity-20 animate-pulse" />
        <FaFileContract className="relative mx-auto text-gray-300 text-6xl mb-4 animate-bounce" />
      </div>
      <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
        Không tìm thấy hợp đồng
      </h3>
      <p className="text-gray-500 text-sm">
        Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác
      </p>
      <div className="mt-6">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 text-sm bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer">
          <FaFileContract />
          <span className="font-semibold">Tạo hợp đồng mới</span>
        </div>
      </div>
    </div>
  );
};

export default ContractEmptyState;
