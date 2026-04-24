"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Search,
  Package,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Clock,
  XCircle,
  Building2,
  ArrowLeft,
  FileText,
  Loader
} from "lucide-react";
import {
  DealerOrderData,
  getDealerOrderByDealerId,
  ItemProps
} from "@/services/dealerOrderService/dealerOrder";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";

const DealerIdOrder: React.FC = () => {
  useAuthGuard(["Staff"]);
  const { dealerId } = useParams();
  const router = useRouter();
  const [orders, setOrders] = useState<DealerOrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  // Mock data - thay bằng API call thực tế
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDealerOrderByDealerId(String(dealerId));
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

  // Format date
  const formatDate = (dateArray: number[]): string => {
    const [year, month, day, hour, minute] = dateArray;
    return `${day.toString().padStart(2, "0")}/${month
      .toString()
      .padStart(2, "0")}/${year} ${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    const statusConfig: Record<
      string,
      { label: string; color: string; icon: React.ReactNode }
    > = {
      APPROVED: {
        label: "Đã duyệt",
        color: "bg-gradient-to-r from-green-500 to-emerald-600",
        icon: <CheckCircle className="w-4 h-4" />
      },
      PENDING: {
        label: "Chờ duyệt",
        color: "bg-gradient-to-r from-yellow-500 to-amber-600",
        icon: <Clock className="w-4 h-4" />
      },
      REJECTED: {
        label: "Từ chối",
        color: "bg-gradient-to-r from-red-500 to-rose-600",
        icon: <XCircle className="w-4 h-4" />
      }
    };

    const config = statusConfig[status] || statusConfig.PENDING;
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-sm font-medium ${config.color} shadow-lg`}
      >
        {config.icon}
        {config.label}
      </span>
    );
  };

  // Get color display
  const getColorDisplay = (color: string) => {
    const colorMap: Record<string, { label: string; bg: string }> = {
      BLUE: { label: "Xanh dương", bg: "bg-blue-500" },
      RED: { label: "Đỏ", bg: "bg-red-500" },
      BLACK: { label: "Đen", bg: "bg-gray-900" },
      WHITE: { label: "Trắng", bg: "bg-gray-100 border border-gray-300" },
      SILVER: { label: "Bạc", bg: "bg-gray-400" }
    };

    const colorInfo = colorMap[color] || { label: color, bg: "bg-gray-500" };
    return (
      <div className="flex items-center gap-2">
        <div className={`w-6 h-6 rounded-full ${colorInfo.bg} shadow-md`}></div>
        <span className="text-sm text-gray-700">{colorInfo.label}</span>
      </div>
    );
  };

  // Toggle expand order
  const toggleExpand = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  // Navigate to detail page

  // Go back
  const handleGoBack = () => {
    router.back();
  };

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.staffName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) =>
        item.modelName.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      order.note.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "ALL" || order.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Calculate total quantity
  const getTotalQuantity = (items: ItemProps[]) => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  // Calculate statistics
  const totalOrders = orders.length;
  const totalVehicles = orders.reduce(
    (sum, order) => sum + getTotalQuantity(order.items),
    0
  );
  const approvedOrders = orders.filter((o) => o.status === "APPROVED").length;
  const pendingOrders = orders.filter((o) => o.status === "REQUESTED").length;

  const dealerName = orders.length > 0 ? orders[0].dealerName : "Dealer";

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-22 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-6 animate-fade-in">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-gray-50 text-gray-700 rounded-xl border-2 border-gray-200 hover:border-indigo-300 transition-all shadow-md hover:shadow-lg font-medium group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Quay lại
          </button>
        </div>

        {/* Header with Dealer Info */}
        <div className="mb-8 animate-fade-in">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {dealerName}
                </h1>
                <p className="text-gray-600 mt-1">
                  Quản lý đơn hàng của đại lý
                </p>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                <p className="text-sm text-gray-600 mb-1">Tổng đơn hàng</p>
                <p className="text-2xl font-bold text-blue-600">
                  {totalOrders}
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                <p className="text-sm text-gray-600 mb-1">Tổng số xe</p>
                <p className="text-2xl font-bold text-purple-600">
                  {totalVehicles}
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                <p className="text-sm text-gray-600 mb-1">Đã duyệt</p>
                <p className="text-2xl font-bold text-green-600">
                  {approvedOrders}
                </p>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-4 border border-yellow-100">
                <p className="text-sm text-gray-600 mb-1">Chờ duyệt</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {pendingOrders}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-6 border border-gray-100 animate-slide-up">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm theo nhân viên, model xe hoặc ghi chú..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
            >
              <option value="ALL">Tất cả trạng thái</option>
              <option value="APPROVED">Đã duyệt</option>
              <option value="PENDING">Chờ duyệt</option>
              <option value="REJECTED">Từ chối</option>
            </select>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-12 text-center border border-gray-100">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                Không tìm thấy đơn hàng nào
              </p>
            </div>
          ) : (
            filteredOrders.map((order, index) => (
              <div
                key={order.id}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl border border-gray-100 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Order Header */}
                <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                          <Package className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">
                            Đơn hàng #{order.id.slice(0, 8)}...
                          </h3>
                          <p className="text-sm text-gray-500">
                            {formatDate(order.createdAtOrder)}
                          </p>
                        </div>
                        {getStatusBadge(order.status)}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => toggleExpand(order.id)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl font-medium"
                      >
                        {expandedOrderId === order.id ? (
                          <>
                            <ChevronUp className="w-5 h-5" />
                            Thu gọn
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-5 h-5" />
                            Mở rộng
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Order Details - Expanded */}
                {expandedOrderId === order.id && (
                  <div className="p-6 space-y-6 animate-fadeIn">
                    {/* Note */}
                    {order.note && (
                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200">
                        <div className="flex items-start gap-3">
                          <FileText className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm text-gray-600 font-medium mb-1">
                              Ghi chú
                            </p>
                            <p className="text-gray-800">{order.note}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Items Table */}
                    <div>
                      <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Package className="w-5 h-5 text-blue-600" />
                        Chi tiết xe đặt hàng
                      </h4>
                      <div className="overflow-x-auto rounded-xl border border-gray-200">
                        <table className="w-full">
                          <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                            <tr>
                              <th className="px-6 py-4 text-left font-semibold">
                                Model xe
                              </th>
                              <th className="px-6 py-4 text-left font-semibold">
                                Màu sắc
                              </th>
                              <th className="px-6 py-4 text-center font-semibold">
                                Số lượng
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.items.map((item, itemIndex) => (
                              <tr
                                key={item.id}
                                className={`transition-colors hover:bg-blue-50 ${
                                  itemIndex !== order.items.length - 1
                                    ? "border-b border-gray-100"
                                    : ""
                                }`}
                              >
                                <td className="px-6 py-4">
                                  <span className="font-semibold text-gray-800">
                                    {item.modelName}
                                  </span>
                                </td>
                                <td className="px-6 py-4">
                                  {getColorDisplay(item.color)}
                                </td>
                                <td className="px-6 py-4 text-center">
                                  <span className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg">
                                    {item.quantity}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
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
          animation: fadeIn 0.3s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out backwards;
        }
      `}</style>
    </div>
  );
};

export default DealerIdOrder;
