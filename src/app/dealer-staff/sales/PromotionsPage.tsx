"use client";
import React, { useState, useMemo } from "react";
import PromotionCard from "./components/PromotionCard";
import { 
  GiftOutlined, 
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
  TagOutlined,
  StarFilled,
  ThunderboltOutlined,
  CalendarOutlined
} from "@ant-design/icons";

interface Promotion {
  id: string;
  title: string;
  description: string;
  discount?: string;
  validUntil?: string;
  featured?: boolean;
  type?: "discount" | "gift" | "special";
  minPurchase?: string;
}

const promotions: Promotion[] = [
  { 
    id: "P001", 
    title: "Giảm 10% cho VF8", 
    description: "Ưu đãi đặc biệt dành cho khách hàng đặt mua VinFast VF8 trong tháng này",
    discount: "10%",
    validUntil: "2025-09-30T23:59:59Z",
    featured: true,
    type: "discount",
    minPurchase: "$30,000"
  },
  {
    id: "P002",
    title: "Miễn phí đăng ký VF e34",
    description: "Tặng gói phí đăng ký và bảo hiểm trong năm đầu tiên cho VF e34",
    validUntil: "2025-10-15T23:59:59Z",
    type: "gift",
    minPurchase: "$18,000"
  },
  { 
    id: "P003", 
    title: "Ưu đãi mùa hè VF9", 
    description: "Combo ưu đãi đặc biệt với phụ kiện cao cấp và bảo dưỡng miễn phí",
    discount: "$5,000",
    validUntil: "2025-08-31T23:59:59Z",
    featured: true,
    type: "special",
    minPurchase: "$50,000"
  },
  {
    id: "P004",
    title: "Quà tặng sạc điện",
    description: "Tặng kèm bộ sạc gia đình trị giá $1,500 cho mọi đơn hàng",
    validUntil: "2025-12-31T23:59:59Z",
    type: "gift"
  },
  {
    id: "P005",
    title: "Trade-in xe cũ",
    description: "Thu cũ đổi mới với giá trị lên đến $8,000 khi đổi sang xe điện VinFast",
    discount: "$8,000",
    validUntil: "2025-11-30T23:59:59Z",
    type: "special"
  },
  {
    id: "P006",
    title: "Giảm 15% VF e34",
    description: "Chương trình khuyến mãi cuối năm dành riêng cho VF e34",
    discount: "15%",
    validUntil: "2025-12-25T23:59:59Z",
    type: "discount",
    minPurchase: "$15,000"
  }
];

const PromotionsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "discount" | "gift" | "special">("all");

  const filteredPromotions = useMemo(() => {
    return promotions.filter(promo => {
      const matchesSearch = promo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           promo.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === "all" || promo.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [searchTerm, filterType]);

  const stats = useMemo(() => {
    return {
      total: promotions.length,
      active: promotions.filter(p => {
        if (!p.validUntil) return true;
        return new Date(p.validUntil) > new Date();
      }).length,
      featured: promotions.filter(p => p.featured).length,
      expiringSoon: promotions.filter(p => {
        if (!p.validUntil) return false;
        const today = new Date();
        const validDate = new Date(p.validUntil);
        const diffDays = Math.ceil((validDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return diffDays <= 7 && diffDays >= 0;
      }).length
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50 to-purple-50 p-6 md:p-10">
      <div className="max-w-[1800px] mx-auto">
        
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-center gap-5 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-600 rounded-2xl blur opacity-40"></div>
              <div className="relative p-4 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl shadow-xl">
                <GiftOutlined className="text-white text-5xl" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-pink-800 to-purple-900">
                Quản Lý Khuyến Mãi
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                Tạo và quản lý các chương trình ưu đãi hấp dẫn
              </p>
            </div>
          </div>
          <div className="h-1 w-32 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full"></div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-pink-300 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  Tổng khuyến mãi
                </p>
                <p className="text-4xl font-black text-gray-900">{stats.total}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <TagOutlined className="text-blue-600 text-3xl" />
              </div>
            </div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-green-300 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  Đang hoạt động
                </p>
                <p className="text-4xl font-black text-gray-900">{stats.active}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <ThunderboltOutlined className="text-green-600 text-3xl" />
              </div>
            </div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-yellow-300 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  Nổi bật
                </p>
                <p className="text-4xl font-black text-gray-900">{stats.featured}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-yellow-100 to-orange-200 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <StarFilled className="text-yellow-600 text-3xl" />
              </div>
            </div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-orange-300 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  Sắp hết hạn
                </p>
                <p className="text-4xl font-black text-gray-900">{stats.expiringSoon}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-orange-100 to-red-200 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <CalendarOutlined className="text-orange-600 text-3xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Actions Bar */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6 mb-10">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <SearchOutlined className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="text"
                  placeholder="Tìm kiếm khuyến mãi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-4 focus:ring-pink-100 focus:border-pink-500 transition-all"
                />
              </div>
            </div>

            {/* Filters & Add Button */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Type Filter */}
              <div className="flex items-center gap-2 bg-gray-50 rounded-xl border-2 border-gray-300 p-1">
                <button
                  onClick={() => setFilterType("all")}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    filterType === "all"
                      ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Tất cả
                </button>
                <button
                  onClick={() => setFilterType("discount")}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    filterType === "discount"
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  🏷️ Giảm giá
                </button>
                <button
                  onClick={() => setFilterType("gift")}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    filterType === "gift"
                      ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  🎁 Quà tặng
                </button>
                <button
                  onClick={() => setFilterType("special")}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    filterType === "special"
                      ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  ⭐ Đặc biệt
                </button>
              </div>

              {/* Add Button */}
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold hover:from-pink-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5">
                <PlusOutlined className="text-lg" />
                Thêm Khuyến Mãi
              </button>
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchTerm || filterType !== "all") && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm">
                <FilterOutlined className="text-gray-500" />
                <span className="text-gray-600 font-medium">Đang lọc:</span>
                {searchTerm && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg font-medium">
                    {searchTerm}
                  </span>
                )}
                {filterType !== "all" && (
                  <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-lg font-medium capitalize">
                    {filterType}
                  </span>
                )}
                <span className="text-gray-500">• {filteredPromotions.length} kết quả</span>
              </div>
            </div>
          )}
        </div>

        {/* Promotions Grid */}
        {filteredPromotions.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPromotions.map((promo, index) => (
              <div
                key={promo.id}
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                <PromotionCard promo={promo} />
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <GiftOutlined className="text-pink-500 text-5xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Không tìm thấy khuyến mãi
              </h3>
              <p className="text-gray-600 mb-6">
                Không có khuyến mãi nào khớp với bộ lọc của bạn. Thử điều chỉnh tìm kiếm hoặc xóa bộ lọc.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilterType("all");
                  }}
                  className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all"
                >
                  Xóa bộ lọc
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold rounded-xl hover:from-pink-700 hover:to-purple-700 shadow-lg transition-all">
                  Tạo khuyến mãi mới
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default PromotionsPage;