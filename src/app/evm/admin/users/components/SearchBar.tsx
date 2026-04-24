"use client";
import React from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export default function SearchBar({
  searchTerm,
  onSearchChange
}: SearchBarProps) {
  return (
    <>
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .search-input:focus + .search-border {
          animation: shimmer 2s infinite linear;
        }
      `}</style>

      <div className="mt-8 relative group">
        {/* Animated Border */}
        <div className="search-border absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 opacity-0 group-focus-within:opacity-20 blur transition-opacity duration-300" />

        <div className="relative bg-white rounded-2xl shadow-lg border-2 border-gray-200 group-focus-within:border-emerald-400 transition-all duration-300">
          {/* Search Icon */}
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors duration-300">
            <Search className="w-5 h-5" strokeWidth={2.5} />
          </div>

          {/* Input */}
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, email hoặc số điện thoại..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input w-full pl-14 pr-14 py-4 bg-transparent text-gray-800 placeholder-gray-400 font-medium focus:outline-none"
          />

          {/* Clear Button */}
          {searchTerm && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-600 transition-all duration-200 transform hover:scale-110"
              style={{ animation: "scaleIn 0.3s ease-out" }}
            >
              <X className="w-4 h-4" strokeWidth={2.5} />
            </button>
          )}
        </div>

        {/* Search Results Hint */}
        {searchTerm && (
          <div
            className="absolute -bottom-6 left-0 text-xs text-emerald-600 font-medium"
            style={{ animation: "slideDown 0.3s ease-out" }}
          >
            <span className="inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Đang tìm kiếm...
            </span>
          </div>
        )}
      </div>
    </>
  );
}
