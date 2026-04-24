import React from "react";
import {
  Users,
  Building2,
  User,
  Mail,
  Phone,
  Search,
  Filter,
  AlertCircle,
  RefreshCw,
  X
} from "lucide-react";

interface SearchFiltersProps {
  filterType: "ALL" | "INDIVIDUAL" | "COMPANY";
  setFilterType: (type: "ALL" | "INDIVIDUAL" | "COMPANY") => void;
  filterFullName: string;
  setFilterFullName: (value: string) => void;
  filterEmail: string;
  setFilterEmail: (value: string) => void;
  filterPhone: string;
  setFilterPhone: (value: string) => void;
  showAdvanced: boolean;
  setShowAdvanced: (value: boolean) => void;
  handleSearch: () => void;
  handleClearFilters: () => void;
  isSearching: boolean;
  stats: {
    total: number;
    individual: number;
    company: number;
  };
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  filterType,
  setFilterType,
  filterFullName,
  setFilterFullName,
  filterEmail,
  setFilterEmail,
  filterPhone,
  setFilterPhone,
  showAdvanced,
  setShowAdvanced,
  handleSearch,
  handleClearFilters,
  isSearching,
  stats
}) => {
  const hasActiveFilters =
    filterType !== "ALL" ||
    filterFullName.trim() !== "" ||
    filterEmail.trim() !== "" ||
    filterPhone.trim() !== "";

  return (
    <div
      className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100 animate-fadeInUp"
      style={{ animationDelay: "0.2s" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-xl shadow-lg">
            <Filter className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Bộ lọc & Tìm kiếm
            </h3>
            <p className="text-sm text-gray-500">
              Tìm kiếm khách hàng nhanh chóng
            </p>
          </div>
        </div>

        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all"
          >
            <X className="w-4 h-4" />
            Xóa tất cả
          </button>
        )}
      </div>

      {/* Type Filter Pills */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Loại khách hàng
        </label>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setFilterType("ALL")}
            className={`group px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 flex items-center gap-2 ${
              filterType === "ALL"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-md"
            }`}
          >
            <Users className="w-4 h-4" />
            Tất cả
            {filterType === "ALL" && (
              <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                {stats.total}
              </span>
            )}
          </button>

          <button
            onClick={() => setFilterType("INDIVIDUAL")}
            className={`group px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 flex items-center gap-2 ${
              filterType === "INDIVIDUAL"
                ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-md"
            }`}
          >
            <User className="w-4 h-4" />
            Cá nhân
            {filterType === "INDIVIDUAL" && (
              <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                {stats.individual}
              </span>
            )}
          </button>

          <button
            onClick={() => setFilterType("COMPANY")}
            className={`group px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 flex items-center gap-2 ${
              filterType === "COMPANY"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-md"
            }`}
          >
            <Building2 className="w-4 h-4" />
            Công ty
            {filterType === "COMPANY" && (
              <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                {stats.company}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Quick Search */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Tìm kiếm nhanh
        </label>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
          <input
            type="text"
            placeholder="🔍 Tìm số điện thoại..."
            value={filterPhone}
            onChange={(e) => setFilterPhone(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all shadow-sm hover:shadow-md text-gray-700 font-medium placeholder:text-gray-400"
          />
          {filterPhone && (
            <button
              onClick={() => setFilterPhone("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="mb-4 flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors group"
      >
        <Filter className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
        {showAdvanced ? "Ẩn" : "Hiện"} bộ lọc nâng cao
        <span
          className={`transform transition-transform ${
            showAdvanced ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="mb-6 p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border-2 border-gray-100 space-y-4 animate-fadeInUp">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 items-center gap-2">
                <User className="w-4 h-4 text-gray-500" />
                Họ và tên
              </label>
              <input
                type="text"
                placeholder="Nguyễn Văn A"
                value={filterFullName}
                onChange={(e) => setFilterFullName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all shadow-sm hover:shadow-md bg-white"
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                Email
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                value={filterEmail}
                onChange={(e) => setFilterEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all shadow-sm hover:shadow-md bg-white"
              />
            </div>

            {/* Phone Input */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2 items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" />
                Số điện thoại
              </label>
              <input
                type="tel"
                placeholder="0901234567"
                value={filterPhone}
                onChange={(e) => setFilterPhone(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all shadow-sm hover:shadow-md bg-white"
              />
            </div>
          </div>

          {/* Info Note */}
          <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="bg-blue-100 p-1 rounded-lg flex-shrink-0">
              <AlertCircle className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-xs text-blue-700">
              <span className="font-semibold">Mẹo:</span> Nhấn{" "}
              <kbd className="px-2 py-0.5 bg-white rounded border border-blue-300 text-blue-800 font-mono text-xs">
                Enter
              </kbd>{" "}
              để tìm kiếm nhanh
            </p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleSearch}
          disabled={isSearching}
          className="flex-1 min-w-[200px] group relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

          <span className="relative flex items-center justify-center gap-2">
            {isSearching ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Đang tìm kiếm...
              </>
            ) : (
              <>
                <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Tìm kiếm
              </>
            )}
          </span>
        </button>

        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="px-6 py-4 rounded-xl font-bold bg-white border-2 border-gray-200 text-gray-700 hover:border-red-500 hover:text-red-600 hover:bg-red-50 transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            <X className="w-5 h-5" />
            Xóa bộ lọc
          </button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-6 pt-6 border-t-2 border-gray-100">
          <div className="flex items-start gap-3">
            <span className="text-sm font-semibold text-gray-500 flex-shrink-0 mt-1">
              🏷️ Đang lọc:
            </span>
            <div className="flex flex-wrap gap-2">
              {filterType !== "ALL" && (
                <span className="group inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm font-semibold border-2 border-indigo-200 hover:border-indigo-300 transition-all">
                  {filterType === "INDIVIDUAL" ? (
                    <>
                      <User className="w-3.5 h-3.5" /> Cá nhân
                    </>
                  ) : (
                    <>
                      <Building2 className="w-3.5 h-3.5" /> Công ty
                    </>
                  )}
                  <button
                    onClick={() => setFilterType("ALL")}
                    className="ml-1 p-0.5 hover:bg-indigo-200 rounded-full transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}

              {filterFullName && (
                <span className="group inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full text-sm font-semibold border-2 border-blue-200 hover:border-blue-300 transition-all">
                  <User className="w-3.5 h-3.5" />
                  Tên: {filterFullName}
                  <button
                    onClick={() => setFilterFullName("")}
                    className="ml-1 p-0.5 hover:bg-blue-200 rounded-full transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}

              {filterEmail && (
                <span className="group inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-semibold border-2 border-purple-200 hover:border-purple-300 transition-all">
                  <Mail className="w-3.5 h-3.5" />
                  Email: {filterEmail}
                  <button
                    onClick={() => setFilterEmail("")}
                    className="ml-1 p-0.5 hover:bg-purple-200 rounded-full transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}

              {filterPhone && (
                <span className="group inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-sm font-semibold border-2 border-green-200 hover:border-green-300 transition-all">
                  <Phone className="w-3.5 h-3.5" />
                  SĐT: {filterPhone}
                  <button
                    onClick={() => setFilterPhone("")}
                    className="ml-1 p-0.5 hover:bg-green-200 rounded-full transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
