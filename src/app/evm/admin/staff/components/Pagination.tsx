import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalElements,
  pageSize,
  onPageChange
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Hiển thị{" "}
          <span className="font-semibold">{currentPage * pageSize + 1}</span> -{" "}
          <span className="font-semibold">
            {Math.min((currentPage + 1) * pageSize, totalElements)}
          </span>{" "}
          trong tổng số{" "}
          <span className="font-semibold">{totalElements}</span> nhân viên
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className={`p-2 rounded-lg transition-all duration-300 ${
              currentPage === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white border-2 border-blue-200 text-blue-600 hover:bg-blue-500 hover:text-white hover:scale-105"
            }`}
          >
            <ChevronLeft size={20} />
          </button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i;
            } else if (currentPage < 3) {
              pageNum = i;
            } else if (currentPage > totalPages - 3) {
              pageNum = totalPages - 5 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  currentPage === pageNum
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg scale-110"
                    : "bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-300"
                }`}
              >
                {pageNum + 1}
              </button>
            );
          })}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
            className={`p-2 rounded-lg transition-all duration-300 ${
              currentPage === totalPages - 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white border-2 border-blue-200 text-blue-600 hover:bg-blue-500 hover:text-white hover:scale-105"
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}