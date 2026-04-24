"use client";
import React from "react";
import { Row, Col } from "antd";
import OrdersTable, { Order } from "./components/OrdersTable";
import PromotionCard from "./components/PromotionCard";
import RequestCarPage from "./RequestCarPage";
import { FaPlus } from "react-icons/fa";
import {
  ShoppingCart,
  Tag,
  TrendingUp,
  Package,
  CheckCircle2,
  XCircle,
  Clock
} from "lucide-react";
import Modal from "../Modal";
import AddPromoForm from "./formPromotion/page";
import EnhancedSalesForm from "./form/page";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";

const mockOrders: Order[] = [
  {
    id: "O001",
    customer: "Nguyen Van A",
    carModel: "VinFast VF8",
    price: 1200000,
    status: "Pending",
    orderDate: "2025-09-10"
  },
  {
    id: "O002",
    customer: "Tran Thi B",
    carModel: "VinFast VF9",
    price: 1500000,
    status: "Completed",
    orderDate: "2025-09-09"
  },
  {
    id: "O003",
    customer: "Le Van C",
    carModel: "VinFast VF8",
    price: 1200000,
    status: "Cancelled",
    orderDate: "2025-09-08"
  }
];

const mockPromotions = [
  {
    id: "P001",
    title: "Khuyến mãi tháng 9",
    description: "Giảm 10% cho VF8",
    discount: "10%"
  },
  {
    id: "P002",
    title: "Ưu đãi VF9",
    description: "Giảm 15% khi đặt trước",
    discount: "15%"
  },
  {
    id: "P003",
    title: "Gói trải nghiệm lái thử",
    description: "Miễn phí lái thử 1 ngày",
    discount: "Miễn phí"
  }
];

const OrdersPage = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
useAuthGuard(["Dealer Manager"]);
  // Calculate stats
  const totalOrders = mockOrders.length;
  const completedOrders = mockOrders.filter(
    (o) => o.status === "Completed"
  ).length;
  const pendingOrders = mockOrders.filter((o) => o.status === "Pending").length;
  const cancelledOrders = mockOrders.filter(
    (o) => o.status === "Cancelled"
  ).length;
  const totalRevenue = mockOrders
    .filter((o) => o.status === "Completed")
    .reduce((sum, o) => sum + o.price, 0);

  return (
    <div className="space-y-8">
      {/* Orders Section */}
      <div>
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 mb-6 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/30 shadow-lg">
                <ShoppingCart size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Quản Lý Đơn Hàng
                </h1>
                <p className="text-blue-100 text-lg">
                  Theo dõi và quản lý tất cả đơn hàng bán xe
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(true)}
              className="bg-white hover:bg-gray-100 text-blue-600 px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center gap-2 group"
            >
              <FaPlus className="group-hover:rotate-90 transition-transform duration-300" />
              Tạo đơn mới
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-500/80 p-2 rounded-lg">
                  <Package size={20} className="text-white" />
                </div>
                <span className="text-sm font-medium text-blue-100">
                  Tổng đơn hàng
                </span>
              </div>
              <p className="text-3xl font-bold text-white">{totalOrders}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-green-500/80 p-2 rounded-lg">
                  <CheckCircle2 size={20} className="text-white" />
                </div>
                <span className="text-sm font-medium text-blue-100">
                  Hoàn thành
                </span>
              </div>
              <p className="text-3xl font-bold text-white">{completedOrders}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-yellow-500/80 p-2 rounded-lg">
                  <Clock size={20} className="text-white" />
                </div>
                <span className="text-sm font-medium text-blue-100">
                  Đang xử lý
                </span>
              </div>
              <p className="text-3xl font-bold text-white">{pendingOrders}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-red-500/80 p-2 rounded-lg">
                  <XCircle size={20} className="text-white" />
                </div>
                <span className="text-sm font-medium text-blue-100">
                  Đã hủy
                </span>
              </div>
              <p className="text-3xl font-bold text-white">{cancelledOrders}</p>
            </div>
          </div>
        </div>

        {/* Revenue Card */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-green-600 p-3 rounded-xl">
                <TrendingUp size={28} className="text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">
                  Tổng doanh thu (Đã hoàn thành)
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {totalRevenue.toLocaleString("vi-VN")} VNĐ
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Tỷ lệ hoàn thành</p>
              <p className="text-2xl font-bold text-gray-900">
                {totalOrders > 0
                  ? Math.round((completedOrders / totalOrders) * 100)
                  : 0}
                %
              </p>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <OrdersTable orders={mockOrders} />
        </div>

        <div className="mt-4 flex justify-between items-center text-gray-600">
          <span className="text-sm">
            Hiển thị{" "}
            <span className="font-bold text-gray-900">{mockOrders.length}</span>{" "}
            đơn hàng
          </span>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold hover:underline">
            Xem tất cả →
          </button>
        </div>
      </div>

      {/* Promotions Section */}
      <div>
        {/* Header */}
        <div className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 rounded-3xl p-8 mb-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/30 shadow-lg">
                <Tag size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Quản Lý Khuyến Mãi
                </h1>
                <p className="text-orange-100 text-lg">
                  Tạo và quản lý các chương trình ưu đãi
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white hover:bg-gray-100 text-orange-600 px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center gap-2 group"
            >
              <FaPlus className="group-hover:rotate-90 transition-transform duration-300" />
              Tạo khuyến mãi
            </button>
          </div>
        </div>

        {/* Promotions Grid */}
        <Row gutter={[24, 24]} className="mb-8">
          {mockPromotions.map((promo) => (
            <Col key={promo.id} xs={24} sm={12} lg={8}>
              <PromotionCard {...promo} />
            </Col>
          ))}
        </Row>

        <div className="text-center text-gray-600">
          <span className="text-sm">
            Hiển thị{" "}
            <span className="font-bold text-gray-900">
              {mockPromotions.length}
            </span>{" "}
            chương trình khuyến mãi
          </span>
        </div>
      </div>

      {/* Request Car Section */}
      <div className="mt-12">
        <RequestCarPage />
      </div>

      {/* Modals */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <EnhancedSalesForm />
      </Modal>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddPromoForm />
      </Modal>
    </div>
  );
};

export default OrdersPage;
