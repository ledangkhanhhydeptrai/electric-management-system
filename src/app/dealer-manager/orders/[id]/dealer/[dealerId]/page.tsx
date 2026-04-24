"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  ArrowLeft,
  Search,
  Filter,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign,
  ShoppingCart,
  Calendar,
  User,
  Building2,
  Sparkles,
  FileText
} from "lucide-react";
import {
  getAllOrderByDealerId,
  OrderData
} from "@/services/orderService/order";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";

const DealerOrderByDealerId: React.FC = () => {
  useAuthGuard(["Dealer Manager"])
  const { dealerId } = useParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [loading, setLoading] = useState(true);

  // Mock data - Replace with actual API call
  const [orders, setOrders] = useState<OrderData[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllOrderByDealerId(String(dealerId));
        if (Array.isArray(response)) {
          setOrders(response);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dealerId]);

  const getStatusConfig = (status: string) => {
    const configs = {
      PENDING: {
        label: "Chờ xử lý",
        icon: Clock,
        gradient: "from-amber-500 to-orange-600",
        bgGradient: "from-amber-500/20 to-orange-500/20",
        borderColor: "border-amber-400/50",
        textColor: "text-amber-400",
        dotColor: "bg-amber-500"
      },
      COMPLETED: {
        label: "Hoàn thành",
        icon: CheckCircle,
        gradient: "from-emerald-500 to-green-600",
        bgGradient: "from-emerald-500/20 to-green-500/20",
        borderColor: "border-emerald-400/50",
        textColor: "text-emerald-400",
        dotColor: "bg-emerald-500"
      },
      CANCELLED: {
        label: "Đã hủy",
        icon: XCircle,
        gradient: "from-red-500 to-rose-600",
        bgGradient: "from-red-500/20 to-rose-500/20",
        borderColor: "border-red-400/50",
        textColor: "text-red-400",
        dotColor: "bg-red-500"
      }
    };

    return (
      configs[status as keyof typeof configs] || {
        label: status,
        icon: Package,
        gradient: "from-blue-500 to-indigo-600",
        bgGradient: "from-blue-500/20 to-indigo-500/20",
        borderColor: "border-blue-400/50",
        textColor: "text-blue-400",
        dotColor: "bg-blue-500"
      }
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const [datePart, timePart] = dateString.split(" ");
    const [year, month, day] = datePart.split("-").map(Number);
    const [hour, minute] = timePart.split(":").map(Number);
    const date = new Date(year, month - 1, day, hour, minute);
    return new Intl.DateTimeFormat("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }).format(date);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.staffName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "ALL" || order.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const stats = React.useMemo(() => {
    const totalOrders = orders.length;

    const draftOrders = orders.filter((o) => o.status === "DRAFT").length;
    const pendingOrders = orders.filter((o) => o.status === "PENDING").length;
    const confirmedOrders = orders.filter(
      (o) => o.status === "CONFIRMED"
    ).length;
    const allocatedOrders = orders.filter(
      (o) => o.status === "ALLOCATED"
    ).length;
    const deliveredOrders = orders.filter(
      (o) => o.status === "DELIVERED"
    ).length;
    const cancelledOrders = orders.filter(
      (o) => o.status === "CANCELLED"
    ).length;

    // Tổng doanh thu tính cho các đơn đã giao
    const totalRevenue = orders
      .filter((o) => o.status === "DELIVERED")
      .reduce((sum, o) => sum + o.totalPrice, 0);

    return {
      totalOrders,
      draftOrders,
      pendingOrders,
      confirmedOrders,
      allocatedOrders,
      deliveredOrders,
      cancelledOrders,
      totalRevenue
    };
  }, [orders]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block mb-8">
            <div className="w-32 h-32 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <ShoppingCart className="w-12 h-12 text-blue-400 animate-pulse" />
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-white text-xl font-bold animate-pulse">
              Đang tải danh sách đơn hàng...
            </p>
            <div className="flex items-center justify-center gap-2">
              <div
                className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-20 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="group mb-6 flex items-center gap-3 text-white hover:text-blue-400 transition-all duration-300 font-semibold bg-white/10 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/20 hover:bg-white/20 hover:border-blue-500/50 transform hover:scale-105"
        >
          <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-2 transition-transform" />
          <span>Quay lại</span>
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div>
              <h1 className="text-5xl font-black text-white mb-3 flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/30">
                  <ShoppingCart className="w-8 h-8 text-white" />
                </div>
                Đơn Hàng Đại Lý
              </h1>
              <p className="text-gray-400 text-lg">
                Quản lý và theo dõi tất cả đơn hàng
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 backdrop-blur-xl rounded-2xl p-4 border border-blue-500/30">
                <p className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
                  Tổng đơn
                </p>
                <p className="text-3xl font-black text-white">
                  {stats.totalOrders}
                </p>
              </div>
              <div className="bg-gradient-to-br from-amber-600/20 to-orange-600/20 backdrop-blur-xl rounded-2xl p-4 border border-amber-500/30">
                <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                  Chờ xử lý
                </p>
                <p className="text-3xl font-black text-white">
                  {stats.pendingOrders}
                </p>
              </div>
              <div className="bg-gradient-to-br from-emerald-600/20 to-green-600/20 backdrop-blur-xl rounded-2xl p-4 border border-emerald-500/30">
                <p className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                  Đã giao
                </p>
                <p className="text-3xl font-black text-white">
                  {stats.deliveredOrders}
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-xl rounded-2xl p-4 border border-purple-500/30">
                <p className="text-purple-400 text-xs font-bold uppercase tracking-wider mb-1">
                  Doanh thu
                </p>
                <p className="text-2xl font-black text-white">
                  {formatCurrency(stats.totalRevenue).slice(0, -2)}
                </p>
              </div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo mã đơn, khách hàng, nhân viên..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilterStatus("ALL")}
                className={`px-6 py-4 rounded-2xl font-semibold transition-all flex items-center gap-2 ${
                  filterStatus === "ALL"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30"
                    : "bg-white/10 backdrop-blur-xl border border-white/20 text-gray-300 hover:bg-white/20"
                }`}
              >
                <Filter className="w-4 h-4" />
                Tất cả
              </button>
              <button
                onClick={() => setFilterStatus("PENDING")}
                className={`px-6 py-4 rounded-2xl font-semibold transition-all ${
                  filterStatus === "PENDING"
                    ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-500/30"
                    : "bg-white/10 backdrop-blur-xl border border-white/20 text-gray-300 hover:bg-white/20"
                }`}
              >
                Chờ xử lý
              </button>
              <button
                onClick={() => setFilterStatus("COMPLETED")}
                className={`px-6 py-4 rounded-2xl font-semibold transition-all ${
                  filterStatus === "COMPLETED"
                    ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg shadow-emerald-500/30"
                    : "bg-white/10 backdrop-blur-xl border border-white/20 text-gray-300 hover:bg-white/20"
                }`}
              >
                Hoàn thành
              </button>
            </div>
          </div>
        </div>

        {/* Orders Grid */}
        {filteredOrders.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredOrders.map((order, index) => {
              const statusConfig = getStatusConfig(order.status);
              const StatusIcon = statusConfig.icon;
              const totalQuantity = order.items.reduce(
                (sum, item) => sum + item.quantity,
                0
              );

              return (
                <div
                  key={order.id}
                  className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2"
                  style={{
                    animation: `slideUp 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-bl-full blur-2xl" />

                  {/* Header */}
                  <div className="relative flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <FileText className="w-5 h-5 text-blue-400" />
                        <h3 className="text-xl font-black text-white group-hover:text-blue-400 transition-colors">
                          {order.orderNo}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(order.orderDate)}</span>
                      </div>
                    </div>
                    <div
                      className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${statusConfig.gradient} rounded-full shadow-lg`}
                    >
                      <StatusIcon className="w-4 h-4 text-white" />
                      <span className="text-white text-sm font-bold">
                        {statusConfig.label}
                      </span>
                    </div>
                  </div>

                  {/* Customer & Staff Info */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div
                      className={`bg-gradient-to-br ${statusConfig.bgGradient} backdrop-blur-sm rounded-xl p-4 border ${statusConfig.borderColor}`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <User className={`w-4 h-4 ${statusConfig.textColor}`} />
                        <span className="text-gray-300 text-xs font-medium">
                          Khách hàng
                        </span>
                      </div>
                      <p className="text-white text-sm font-bold">
                        {order.customerName}
                      </p>
                    </div>
                    <div
                      className={`bg-gradient-to-br ${statusConfig.bgGradient} backdrop-blur-sm rounded-xl p-4 border ${statusConfig.borderColor}`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Building2
                          className={`w-4 h-4 ${statusConfig.textColor}`}
                        />
                        <span className="text-gray-300 text-xs font-medium">
                          Nhân viên
                        </span>
                      </div>
                      <p className="text-white text-sm font-bold">
                        {order.staffName}
                      </p>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-blue-400" />
                        <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">
                          Chi tiết đơn hàng
                        </span>
                      </div>
                      <span className="text-blue-400 font-bold text-sm">
                        {totalQuantity} sản phẩm
                      </span>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-3" />
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-emerald-400" />
                        <span className="text-gray-300 text-sm font-medium">
                          Tổng tiền:
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black text-emerald-400">
                          {formatCurrency(order.totalPrice)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <ShoppingCart className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-3">
              Không tìm thấy đơn hàng
            </h3>
            <p className="text-gray-400 text-lg mb-6">
              Không có đơn hàng nào phù hợp với tiêu chí tìm kiếm
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterStatus("ALL");
              }}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all transform hover:scale-105"
            >
              Xóa bộ lọc
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="mt-10 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-bold">
                  Hệ thống quản lý đơn hàng
                </p>
                <p className="text-gray-400 text-sm">Cập nhật thời gian thực</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © 2025 EV Management System
              </p>
              <p className="text-gray-500 text-xs">Premium Electric Vehicles</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
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

export default DealerOrderByDealerId;
