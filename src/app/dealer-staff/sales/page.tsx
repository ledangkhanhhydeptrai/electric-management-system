"use client";
import React from "react";
import OrderTable from "./components/OrderTable";
import { 
  ShoppingCartOutlined, 
  CheckCircleOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  RiseOutlined
} from "@ant-design/icons";
import PromotionsPage from "./PromotionsPage";
import RequestCarPage from "./RequestCarPage";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";

const OrdersPage: React.FC = () => {
  useAuthGuard(["Staff"]);
  // Mock data - thay bằng data thực tế
  const orderStats = {
    total: 156,
    completed: 98,
    pending: 45,
    revenue: 4250000
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
      <div className="max-w-[1800px] mx-auto">
        
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-center gap-5 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl blur opacity-40"></div>
              <div className="relative p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl">
                <ShoppingCartOutlined className="text-white text-5xl" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-green-800 to-emerald-900">
                Quản Lý Đơn Hàng
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                Theo dõi và quản lý toàn bộ đơn đặt xe
              </p>
            </div>
          </div>
          <div className="h-1 w-32 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full"></div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Total Orders */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-green-300 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  Tổng đơn hàng
                </p>
                <p className="text-4xl font-black text-gray-900">
                  {orderStats.total}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <RiseOutlined className="text-green-600 text-xs" />
                  <span className="text-green-600 text-sm font-semibold">
                    +12% so với tháng trước
                  </span>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <ShoppingCartOutlined className="text-blue-600 text-3xl" />
              </div>
            </div>
          </div>

          {/* Completed Orders */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-green-300 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  Hoàn thành
                </p>
                <p className="text-4xl font-black text-gray-900">
                  {orderStats.completed}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-green-600 text-sm font-semibold">
                    {Math.round((orderStats.completed / orderStats.total) * 100)}% tỷ lệ thành công
                  </span>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <CheckCircleOutlined className="text-green-600 text-3xl" />
              </div>
            </div>
          </div>

          {/* Pending Orders */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-orange-300 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  Đang xử lý
                </p>
                <p className="text-4xl font-black text-gray-900">
                  {orderStats.pending}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <ClockCircleOutlined className="text-orange-600 text-xs" />
                  <span className="text-orange-600 text-sm font-semibold">
                    Cần xử lý ưu tiên
                  </span>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-br from-orange-100 to-amber-200 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <ClockCircleOutlined className="text-orange-600 text-3xl" />
              </div>
            </div>
          </div>

          {/* Revenue */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-purple-300 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  Doanh thu
                </p>
                <p className="text-3xl font-black text-gray-900">
                  {formatCurrency(orderStats.revenue)}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <RiseOutlined className="text-purple-600 text-xs" />
                  <span className="text-purple-600 text-sm font-semibold">
                    +18% tăng trưởng
                  </span>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-100 to-pink-200 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <DollarOutlined className="text-purple-600 text-3xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Orders Table Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200 overflow-hidden mb-10">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <ShoppingCartOutlined className="text-white text-2xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Danh Sách Đơn Hàng
                  </h2>
                  <p className="text-green-100 text-sm mt-1">
                    {orderStats.total} đơn hàng được tìm thấy
                  </p>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="flex items-center gap-3">
                <button className="px-5 py-2.5 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/30">
                  <span className="flex items-center gap-2">
                    <span>📥</span>
                    Xuất Excel
                  </span>
                </button>
                <button className="px-5 py-2.5 bg-white text-green-600 font-bold rounded-xl hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  <span className="flex items-center gap-2">
                    <span>➕</span>
                    Tạo Đơn Mới
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Table Content */}
          <div className="p-8">
            <OrderTable />
          </div>
        </div>

        {/* Promotions Section */}
        <div className="mb-10 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <PromotionsPage />
        </div>

        {/* Request Car Section */}
        <div className="animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          <RequestCarPage />
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out both;
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default OrdersPage;