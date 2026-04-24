// /components/dealers/components/DealerSearchBar.tsx
"use client";
import React from "react";
import { Search, X } from "lucide-react";

export default function DealerSearchBar({
  value,
  onChange,
  // onAdd
}: {
  value: string;
  onChange: (v: string) => void;
  // onAdd: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="w-full md:flex-1 relative">
        <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Tìm kiếm theo tên, email, số điện thoại, địa chỉ..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="clear search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* <div className="flex gap-3">
        <button
          onClick={() => onAdd()}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg font-medium"
        >
          <Plus className="w-5 h-5" />
          Thêm đại lý
        </button>
      </div> */}
    </div>
  );
}
