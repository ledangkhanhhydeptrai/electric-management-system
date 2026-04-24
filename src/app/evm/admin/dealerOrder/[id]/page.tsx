"use client";
import React, { useState, useEffect } from "react";
import {
  Package,
  Calendar,
  Clock,
  User,
  Building2,
  FileText,
  CheckCircle,
  AlertCircle,
  XCircle,
  Loader,
  ArrowLeft
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import {
  DealerOrderData,
  getDealerOrderById
} from "@/services/dealerOrderService/dealerOrder";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";

const DealerOrderById: React.FC = () => {
  useAuthGuard(["Administrator"]);
  const [orderData, setOrderData] = useState<DealerOrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useParams();
  useEffect(
    () => {
      const fetchData = async () => {
        try {
          const response = await getDealerOrderById(String(id));
          if (response) {
            setOrderData(response as DealerOrderData);
          } else {
            setOrderData(null);
          }
        } catch (error) {
          console.log("Error:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    },
    [id]
  );

  const formatDate = (dateArray: number[]) => {
    const [year, month, day, hour, minute] = dateArray;
    return `${day.toString().padStart(2, "0")}/${month
      .toString()
      .padStart(2, "0")}/${year} ${hour
      .toString()
      .padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
  };

  const getStatusConfig = (status: string) => {
    const configs: Record<
      string,
      { label: string; color: string; icon: React.ReactNode; bg: string }
    > = {
      APPROVED: {
        label: "Đã Phê Duyệt",
        color: "text-green-600",
        icon: <CheckCircle className="w-5 h-5" />,
        bg: "bg-green-50 border-green-200"
      },
      PENDING: {
        label: "Chờ Xử Lý",
        color: "text-yellow-600",
        icon: <Clock className="w-5 h-5" />,
        bg: "bg-yellow-50 border-yellow-200"
      },
      REJECTED: {
        label: "Từ Chối",
        color: "text-red-600",
        icon: <XCircle className="w-5 h-5" />,
        bg: "bg-red-50 border-red-200"
      },
      PROCESSING: {
        label: "Đang Xử Lý",
        color: "text-blue-600",
        icon: <Loader className="w-5 h-5 animate-spin" />,
        bg: "bg-blue-50 border-blue-200"
      }
    };
    return configs[status] || configs.PENDING;
  };

  const getColorName = (color: string) => {
    const colors: Record<string, string> = {
      BLUE: "Xanh Dương",
      RED: "Đỏ",
      WHITE: "Trắng",
      BLACK: "Đen",
      SILVER: "Bạc",
      GREY: "Xám"
    };
    return colors[color] || color;
  };

  const getColorStyle = (color: string) => {
    const styles: Record<string, string> = {
      BLUE: "bg-blue-500",
      RED: "bg-red-500",
      WHITE: "bg-gray-100 border border-gray-300",
      BLACK: "bg-gray-900",
      SILVER: "bg-gray-300",
      GREY: "bg-gray-500"
    };
    return styles[color] || "bg-gray-400";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">
            Đang tải thông tin đơn hàng...
          </p>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">
            Không tìm thấy thông tin đơn hàng
          </p>
        </div>
      </div>
    );
  }

  const statusConfig = getStatusConfig(orderData.status);

  return (
    <div className="mt-22 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="">
        <div className="mb-6 animate-fade-in">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-gray-50 text-gray-700 rounded-xl border-2 border-gray-200 hover:border-indigo-300 transition-all shadow-md hover:shadow-lg font-medium group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Quay lại
          </button>
        </div>
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Chi Tiết Đơn Hàng
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Mã đơn hàng: {orderData.id.slice(0, 8)}...
              </p>
            </div>
          </div>
        </div>

        {/* Status Card */}
        <div
          className={`${statusConfig.bg} border-2 rounded-2xl p-6 mb-6 animate-slide-up`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={statusConfig.color}>
                {statusConfig.icon}
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">
                  Trạng thái đơn hàng
                </p>
                <p className={`text-xl font-bold ${statusConfig.color}`}>
                  {statusConfig.label}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Dealer & Staff Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Dealer Info */}
            <div
              onClick={() =>
                router.push(
                  `/evm/admin/dealerOrder/${orderData.id}/dealer/${orderData.dealerId}`
                )}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100 animate-slide-up hover:-translate-y-1 hover:shadow-2xl hover:bg-white/90 transition-all duration-300 ease-out"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Thông Tin Đại Lý
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Tên đại lý:</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {orderData.dealerName}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-gray-600">Mã đại lý:</span>
                      <span className="text-sm font-mono text-gray-700">
                        {orderData.dealerId.slice(0, 13)}...
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Staff Info */}
            <div
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100 animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <User className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Nhân Viên Phụ Trách
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">
                        Tên nhân viên:
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {orderData.staffName}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-gray-600">
                        Mã nhân viên:
                      </span>
                      <span className="text-sm font-mono text-gray-700">
                        {orderData.staffId.slice(0, 13)}...
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Info */}
          <div className="space-y-6">
            {/* Created Date */}
            <div
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100 animate-slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 font-medium mb-1">
                    Ngày tạo đơn
                  </p>
                  <p className="text-base font-bold text-gray-900">
                    {formatDate(orderData.createdAtOrder)}
                  </p>
                </div>
              </div>
            </div>

            {/* Expected Delivery */}
          </div>
        </div>

        {/* Order Items */}
        <div
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100 mb-6 animate-slide-up"
          style={{ animationDelay: "0.5s" }}
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Package className="w-6 h-6 text-indigo-600" />
            Danh Sách Sản Phẩm
          </h3>
          <div className="space-y-4">
            {orderData.items.map((item, index) =>
              <div
                key={item.id}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border-2 border-gray-200 hover:border-indigo-300 transition-all duration-300 hover:shadow-lg"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 mb-3">
                      {item.modelName}
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-600">Màu sắc:</span>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-6 h-6 rounded-full ${getColorStyle(
                              item.color
                            )} shadow-md`}
                          />
                          <span className="text-sm font-semibold text-gray-900">
                            {getColorName(item.color)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-600">Số lượng:</span>
                        <div className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg font-bold text-sm shadow-md">
                          {item.quantity} xe
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Total Summary */}
          <div className="mt-6 pt-6 border-t-2 border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-700">
                Tổng số lượng:
              </span>
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-xl font-bold text-xl shadow-lg">
                {orderData.items.reduce(
                  (sum, item) => sum + item.quantity,
                  0
                )}{" "}
                xe
              </div>
            </div>
          </div>
        </div>

        {/* Note Section */}
        {orderData.note &&
          <div
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100 animate-slide-up"
            style={{ animationDelay: "0.7s" }}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Ghi Chú
                </h3>
                <p className="text-gray-700 leading-relaxed bg-amber-50 rounded-lg p-4 border border-amber-200">
                  {orderData.note}
                </p>
              </div>
            </div>
          </div>}
      </div>

      <style jsx>{`
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

export default DealerOrderById;
