// /components/dealers/components/DealerEmptyState.tsx
"use client";
import React from "react";
import { AlertCircle, X, Plus } from "lucide-react";

export default function DealerEmptyState({
  searchQuery,
  onClear,
  onAdd
}: {
  searchQuery?: string;
  onClear?: () => void;
  onAdd?: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-16 text-center">
      <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
        <AlertCircle className="w-12 h-12 text-blue-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        {searchQuery ? "Không tìm thấy kết quả" : "Chưa có đại lý nào"}
      </h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        {searchQuery
          ? `Không tìm thấy đại lý nào phù hợp với từ khóa "${searchQuery}"`
          : "Bắt đầu bằng cách thêm đại lý đầu tiên của bạn"}
      </p>
      {searchQuery ? (
        <button
          onClick={onClear}
          className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-all inline-flex items-center gap-2 shadow-lg font-bold"
        >
          <X className="w-5 h-5" />
          Xóa tìm kiếm
        </button>
      ) : (
        <button
          onClick={onAdd}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all inline-flex items-center gap-2 shadow-lg font-bold"
        >
          <Plus className="w-5 h-5" />
          Thêm đại lý mới
        </button>
      )}
    </div>
  );
}
