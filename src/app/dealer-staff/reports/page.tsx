"use client";
import React, { useState, useMemo } from "react";
import { Row, Col } from "antd";
import SalesChart from "./components/SalesChart";
import { 
  BarChartOutlined,
  TrophyOutlined,
  RiseOutlined,
  TeamOutlined,
  DollarOutlined,
  StarFilled,
  CrownOutlined,
  SearchOutlined,
  FilterOutlined
} from "@ant-design/icons";
import DebtsPage from "./DebtPage";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";

interface StaffSale {
  id: string;
  name: string;
  totalSales: number;
  monthlyTarget?: number;
  carsSold?: number;
  customerRating?: number;
  commission?: number;
}

const mockStaffSales: StaffSale[] = [
  { 
    id: "S001", 
    name: "Nguyen Van A", 
    totalSales: 1500000,
    monthlyTarget: 2000000,
    carsSold: 5,
    customerRating: 4.8,
    commission: 75000
  },
  { 
    id: "S002", 
    name: "Tran Thi B", 
    totalSales: 1200000,
    monthlyTarget: 2000000,
    carsSold: 4,
    customerRating: 4.5,
    commission: 60000
  },
  { 
    id: "S003", 
    name: "Le Van C", 
    totalSales: 900000,
    monthlyTarget: 2000000,
    carsSold: 3,
    customerRating: 4.3,
    commission: 45000
  },
  { 
    id: "S004", 
    name: "Pham Thi D", 
    totalSales: 800000,
    monthlyTarget: 2000000,
    carsSold: 2,
    customerRating: 4.6,
    commission: 40000
  },
  { 
    id: "S005", 
    name: "Hoang Van E", 
    totalSales: 700000,
    monthlyTarget: 2000000,
    carsSold: 2,
    customerRating: 4.2,
    commission: 35000
  }
];

const StaffSalesPage = () => {
  useAuthGuard(["Staff"]);
  const [sales] = useState<StaffSale[]>(mockStaffSales);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"sales" | "cars" | "rating">("sales");

  // Sort and filter staff
  const sortedSales = useMemo(() => {
    const filtered = sales.filter(staff => 
      staff.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "sales":
          return b.totalSales - a.totalSales;
        case "cars":
          return (b.carsSold || 0) - (a.carsSold || 0);
        case "rating":
          return (b.customerRating || 0) - (a.customerRating || 0);
        default:
          return 0;
      }
    });
  }, [sales, searchTerm, sortBy]);

  // Calculate stats
  const stats = useMemo(() => {
    const totalRevenue = sales.reduce((sum, s) => sum + s.totalSales, 0);
    const totalCars = sales.reduce((sum, s) => sum + (s.carsSold || 0), 0);
    const avgRating = sales.reduce((sum, s) => sum + (s.customerRating || 0), 0) / sales.length;
    const totalCommission = sales.reduce((sum, s) => sum + (s.commission || 0), 0);
    const topPerformer = sales.reduce((max, s) => s.totalSales > max.totalSales ? s : max, sales[0]);

    return {
      totalRevenue,
      totalCars,
      avgRating: avgRating.toFixed(1),
      totalCommission,
      topPerformer,
      teamSize: sales.length
    };
  }, [sales]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const getRankBadge = (index: number) => {
    if (index === 0) return { icon: "🥇", color: "from-yellow-400 to-orange-500", text: "TOP 1" };
    if (index === 1) return { icon: "🥈", color: "from-gray-300 to-gray-400", text: "TOP 2" };
    if (index === 2) return { icon: "🥉", color: "from-orange-300 to-amber-400", text: "TOP 3" };
    return { icon: `#${index + 1}`, color: "from-gray-200 to-gray-300", text: `${index + 1}` };
  };

  const getPerformanceLevel = (percentage: number) => {
    if (percentage >= 90) return { label: "Xuất sắc", color: "text-green-600", bg: "bg-green-100" };
    if (percentage >= 75) return { label: "Tốt", color: "text-blue-600", bg: "bg-blue-100" };
    if (percentage >= 50) return { label: "Trung bình", color: "text-yellow-600", bg: "bg-yellow-100" };
    return { label: "Cần cải thiện", color: "text-red-600", bg: "bg-red-100" };
  };

  return (
    <div className="">
      <div className="max-w-[1800px] mx-auto">
        
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-center gap-5 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl blur opacity-40"></div>
              <div className="relative p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl">
                <BarChartOutlined className="text-white text-5xl" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-green-800 to-emerald-900">
                Doanh Số Nhân Viên
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                Theo dõi hiệu suất bán hàng của đội ngũ
              </p>
            </div>
          </div>
          <div className="h-1 w-32 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full"></div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-10">
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-green-300 transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl mb-3 group-hover:scale-110 transition-transform duration-300">
                <DollarOutlined className="text-green-600 text-3xl" />
              </div>
              <div className="text-3xl font-black text-gray-900 mb-1">{formatCurrency(stats.totalRevenue)}</div>
              <div className="text-sm text-gray-600 font-medium">Tổng doanh thu</div>
            </div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl mb-3 group-hover:scale-110 transition-transform duration-300">
                <TeamOutlined className="text-blue-600 text-3xl" />
              </div>
              <div className="text-4xl font-black text-gray-900 mb-1">{stats.teamSize}</div>
              <div className="text-sm text-gray-600 font-medium">Nhân viên</div>
            </div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-purple-300 transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-gradient-to-br from-purple-100 to-pink-200 rounded-2xl mb-3 group-hover:scale-110 transition-transform duration-300">
                <BarChartOutlined className="text-purple-600 text-3xl" />
              </div>
              <div className="text-4xl font-black text-gray-900 mb-1">{stats.totalCars}</div>
              <div className="text-sm text-gray-600 font-medium">Xe đã bán</div>
            </div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-yellow-300 transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-gradient-to-br from-yellow-100 to-orange-200 rounded-2xl mb-3 group-hover:scale-110 transition-transform duration-300">
                <StarFilled className="text-yellow-600 text-3xl" />
              </div>
              <div className="text-4xl font-black text-gray-900 mb-1">{stats.avgRating}★</div>
              <div className="text-sm text-gray-600 font-medium">Đánh giá TB</div>
            </div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-orange-300 transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-gradient-to-br from-orange-100 to-red-200 rounded-2xl mb-3 group-hover:scale-110 transition-transform duration-300">
                <RiseOutlined className="text-orange-600 text-3xl" />
              </div>
              <div className="text-3xl font-black text-gray-900 mb-1">{formatCurrency(stats.totalCommission)}</div>
              <div className="text-sm text-gray-600 font-medium">Hoa hồng</div>
            </div>
          </div>

          <div className="group bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col items-center text-center text-white h-full justify-center">
              <CrownOutlined className="text-5xl mb-2" />
              <div className="text-sm font-medium opacity-90 mb-1">Top Performer</div>
              <div className="font-bold">{stats.topPerformer?.name.split(" ").slice(-1)}</div>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6 mb-10">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <SearchOutlined className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="text"
                  placeholder="Tìm kiếm nhân viên..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all"
                />
              </div>
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-3">
              <FilterOutlined className="text-gray-500" />
              <div className="flex items-center gap-2 bg-gray-50 rounded-xl border-2 border-gray-300 p-1">
                <button
                  onClick={() => setSortBy("sales")}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    sortBy === "sales"
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  💰 Doanh số
                </button>
                <button
                  onClick={() => setSortBy("cars")}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    sortBy === "cars"
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  🚗 Số xe
                </button>
                <button
                  onClick={() => setSortBy("rating")}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    sortBy === "rating"
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  ⭐ Đánh giá
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Staff Performance Cards */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <TrophyOutlined className="text-yellow-600 text-3xl" />
            <h2 className="text-3xl font-bold text-gray-900">Bảng Xếp Hạng</h2>
          </div>

          <Row gutter={[24, 24]}>
            {sortedSales.map((staff, index) => {
              const rank = getRankBadge(index);
              const targetPercentage = staff.monthlyTarget 
                ? Math.round((staff.totalSales / staff.monthlyTarget) * 100)
                : 0;
              const performance = getPerformanceLevel(targetPercentage);

              return (
                <Col key={staff.id} xs={24} sm={12} lg={8} xl={6}>
                  <div
                    className="relative bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-green-300 hover:-translate-y-2 group"
                    style={{
                      animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                    }}
                  >
                    {/* Rank Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <div className={`w-12 h-12 bg-gradient-to-br ${rank.color} rounded-full flex items-center justify-center text-white font-bold shadow-lg text-lg`}>
                        {rank.icon}
                      </div>
                    </div>

                    {/* Header */}
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 pb-12">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg border-2 border-white/30">
                          {staff.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{staff.name}</h3>
                          <p className="text-green-100 text-sm">{staff.id}</p>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 -mt-6">
                      {/* Sales Amount */}
                      <div className="bg-white rounded-xl shadow-lg p-4 mb-4 border-2 border-green-200">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 font-medium mb-1">Tổng doanh số</p>
                          <p className="text-2xl font-black text-green-600">
                            {formatCurrency(staff.totalSales)}
                          </p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-600 font-medium">Mục tiêu tháng</span>
                          <span className={`text-xs font-bold px-2 py-1 rounded-full ${performance.bg} ${performance.color}`}>
                            {targetPercentage}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-1000"
                            style={{ width: `${Math.min(targetPercentage, 100)}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-gray-500">{formatCurrency(staff.totalSales)}</span>
                          <span className="text-xs text-gray-500">{formatCurrency(staff.monthlyTarget || 0)}</span>
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="bg-blue-50 rounded-lg p-3 text-center border border-blue-200">
                          <p className="text-2xl font-bold text-blue-900">{staff.carsSold}</p>
                          <p className="text-xs text-blue-700 font-medium">Xe bán</p>
                        </div>
                        <div className="bg-yellow-50 rounded-lg p-3 text-center border border-yellow-200">
                          <p className="text-2xl font-bold text-yellow-900">{staff.customerRating}★</p>
                          <p className="text-xs text-yellow-700 font-medium">Đánh giá</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3 text-center border border-green-200">
                          <p className="text-lg font-bold text-green-900">{formatCurrency(staff.commission || 0)}</p>
                          <p className="text-xs text-green-700 font-medium">Hoa hồng</p>
                        </div>
                      </div>

                      {/* Chart */}
                      <div className="mb-4">
                        <SalesChart total={staff.totalSales} />
                      </div>

                      {/* Action Button */}
                      <button className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl transform group-hover:scale-105">
                        Xem Chi Tiết
                      </button>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>

        {/* Debts Section */}
        <div className="animate-fadeIn" style={{ animationDelay: "0.3s" }}>
          <DebtsPage />
        </div>
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

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out both;
        }
      `}</style>
    </div>
  );
};

export default StaffSalesPage;