"use client";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
import { getOrderById, OrderData } from "@/services/orderService/order";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const OrderById: React.FC = () => {
  useAuthGuard(["Dealer Manager"]);
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = React.useState<OrderData | null>(null);
  React.useEffect(
    () => {
      const fetchData = async () => {
        try {
          const response = await getOrderById(String(id));
          if (response) {
            setData(response as OrderData);
          } else {
            setData(null);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchData();
    },
    [id]
  );
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(amount);
  };

  // Format date from array
  const formatDate = (dateString: string) => {
    if (!dateString) return "";

    // Tách phần ngày và giờ
    const [datePart, timePart] = dateString.split(" ");
    const [year, month, day] = datePart.split("-").map(Number);
    const [hour, minute, second] = timePart.split(":").map(Number);

    const date = new Date(year, month - 1, day, hour, minute, second);

    return new Intl.DateTimeFormat("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }).format(date);
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get status text
  const getStatusText = (status: string) => {
    switch (status) {
      case "PENDING":
        return "Chờ xử lý";
      case "COMPLETED":
        return "Hoàn thành";
      case "CANCELLED":
        return "Đã hủy";
      default:
        return status;
    }
  };
  const handleBack = () => {
    router.back(); // Quay lại trang trước đó
    // Hoặc dùng: window.history.back();
    // Hoặc navigate đến route cụ thể: navigate('/orders');
  };
  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="font-medium">Quay lại</span>
          </button>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="flex flex-col items-center justify-center py-20 px-4">
              {/* Error Icon */}
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-10 h-10 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Không tìm thấy dữ liệu
              </h3>
              <p className="text-gray-500 text-center max-w-md mb-6">
                Đơn hàng bạn đang tìm kiếm không tồn tại hoặc đã bị xóa khỏi hệ
                thống.
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => window.history.back()}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                >
                  Quay lại
                </button>
                <button
                  onClick={() => (window.location.href = "/orders")}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  Về trang chủ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="mt-21 bg-gray-50">
      <div className="">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span className="font-medium">Quay lại</span>
        </button>
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Chi tiết đơn hàng
              </h1>
              <p className="text-gray-500 mt-1">
                Mã đơn hàng: {data.orderNo}
              </p>
            </div>
            <span
              className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(
                data.status
              )}`}
            >
              {getStatusText(data.status)}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Ngày đặt hàng:</span>
              <span className="ml-2 font-medium">
                {formatDate(data.orderDate)}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Ngày tạo:</span>
              <span className="ml-2 font-medium">
                {formatDate(data.createdAt)}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Customer Info */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="ml-3 text-lg font-semibold text-gray-900">
                Khách hàng
              </h3>
            </div>
            <div className="space-y-2">
              <p className="text-gray-900 font-medium">
                {data.customerName}
              </p>
            </div>
          </div>

          {/* Staff Info */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="ml-3 text-lg font-semibold text-gray-900">
                Nhân viên
              </h3>
            </div>
            <div className="space-y-2">
              <p className="text-gray-900 font-medium">
                {data.staffName}
              </p>
            </div>
          </div>

          {/* Dealer Info */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="ml-3 text-lg font-semibold text-gray-900">
                Đại lý
              </h3>
            </div>
            <div className="space-y-3">
              <p className="text-gray-900 font-medium">
                {data.dealerName}
              </p>
              <button
                onClick={() =>
                  router.push(
                    `/dealer-manager/orders/${id}/dealer/${data.dealerId}`
                  )}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg group"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <span>Xem chi tiết đại lý</span>
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Sản phẩm trong đơn hàng
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    STT
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Tên sản phẩm
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                    Số lượng
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                    Đơn giá
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                    Giảm giá
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                    Thành tiền
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((item, index) =>
                  <tr key={item.id} className="border-b border-gray-100">
                    <td className="py-4 px-4 text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-xs text-gray-500">
                        {item.vehicleVin ? item.vehicleVin : "N/A"}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right text-sm text-gray-900">
                      {item.quantity}
                    </td>
                    <td className="py-4 px-4 text-right text-sm text-gray-900">
                      {formatCurrency(item.unitPrice)}
                    </td>
                    <td className="py-4 px-4 text-right text-sm text-red-600">
                      -{formatCurrency(item.discountAmount)}
                    </td>
                    <td className="py-4 px-4 text-right text-sm font-semibold text-gray-900">
                      {formatCurrency(item.lineTotal)}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Tổng kết đơn hàng
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Tổng số lượng:</span>
              <span className="font-medium">
                {data.items.reduce((sum, item) => sum + item.quantity, 0)} sản
                phẩm
              </span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tổng giảm giá:</span>
              <span className="font-medium text-red-600">
                -
                {formatCurrency(
                  data.items.reduce((sum, item) => sum + item.discountAmount, 0)
                )}
              </span>
            </div>
            <div className="border-t pt-3 flex justify-between text-xl font-bold text-gray-900">
              <span>Tổng cộng:</span>
              <span className="text-blue-600">
                {formatCurrency(data.totalPrice)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderById;
