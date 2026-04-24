import React, { useState } from "react";
import { Modal } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  CloseOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  StarOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  CalendarOutlined,
  MessageOutlined,
  EditOutlined
} from "@ant-design/icons";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "New" | "Active" | "Inactive";
  notes?: string;
  totalOrders?: number;
  totalSpent?: number;
  joinDate?: string;
  lastPurchase?: string;
}

interface Props {
  customer: Customer;
  className?: string;
}

const CustomerCard: React.FC<Props> = ({ customer }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showModal = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  // Enhanced customer data with defaults
  const enhancedCustomer = {
    ...customer,
    totalOrders: customer.totalOrders || Math.floor(Math.random() * 10) + 1,
    totalSpent:
      customer.totalSpent || Math.floor(Math.random() * 100000) + 10000,
    joinDate: customer.joinDate || "2024-01-15",
    lastPurchase: customer.lastPurchase || "2025-09-15"
  };

  const statusConfig: Record<
    Customer["status"],
    {
      color: string;
      icon: React.ReactNode;
      bg: string;
      text: string;
      border: string;
    }
  > = {
    New: {
      color: "cyan",
      icon: <StarOutlined className="text-xs" />,
      bg: "bg-cyan-100",
      text: "text-cyan-700",
      border: "border-cyan-300"
    },
    Active: {
      color: "green",
      icon: <CheckCircleOutlined className="text-xs" />,
      bg: "bg-green-100",
      text: "text-green-700",
      border: "border-green-300"
    },
    Inactive: {
      color: "red",
      icon: <CloseOutlined className="text-xs" />,
      bg: "bg-red-100",
      text: "text-red-700",
      border: "border-red-300"
    }
  };

  const config = statusConfig[customer.status];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  };

  return (
    <>
      {/* Customer Card */}
      <div
        onClick={showModal}
        className="group relative bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-blue-300 hover:-translate-y-2 cursor-pointer"
      >
        {/* Status Badge - Top Right */}
        <div className="absolute top-3 right-3 z-10">
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 ${config.bg} ${config.text} border-2 ${config.border} rounded-full text-xs font-bold shadow-md`}
          >
            {config.icon}
            <span>{customer.status}</span>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500 rounded-full -ml-12 -mb-12"></div>
        </div>

        {/* Content */}
        <div className="relative p-6">
          {/* Avatar & Name */}
          <div className="flex flex-col items-center mb-4">
            <div className="relative mb-3">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-xl group-hover:scale-110 transition-transform duration-300">
                {getInitials(customer.name)}
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg">
                <UserOutlined className="text-blue-600 text-sm" />
              </div>
            </div>

            <h2 className="text-lg font-bold text-gray-900 text-center mb-1 group-hover:text-blue-600 transition-colors">
              {customer.name}
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              ID: {customer.id}
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 rounded-lg p-2">
              <MailOutlined className="text-blue-500" />
              <span className="truncate flex-1">{customer.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 rounded-lg p-2">
              <PhoneOutlined className="text-green-500" />
              <span>{customer.phone}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 border border-blue-200">
              <div className="flex items-center gap-2 mb-1">
                <ShoppingCartOutlined className="text-blue-600" />
                <span className="text-xs text-gray-600 font-medium">
                  Đơn hàng
                </span>
              </div>
              <p className="text-xl font-bold text-gray-900">
                {enhancedCustomer.totalOrders}
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-3 border border-green-200">
              <div className="flex items-center gap-2 mb-1">
                <DollarOutlined className="text-green-600" />
                <span className="text-xs text-gray-600 font-medium">
                  Chi tiêu
                </span>
              </div>
              <p className="text-sm font-bold text-gray-900">
                {formatCurrency(enhancedCustomer.totalSpent)}
              </p>
            </div>
          </div>

          {/* View Details Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showModal();
            }}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform group-hover:scale-105"
          >
            Xem Chi Tiết
          </button>
        </div>

        {/* Hover Shine Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
        </div>
      </div>

      {/* Enhanced Modal */}
      <Modal
        open={isModalOpen}
        onCancel={handleClose}
        footer={null}
        width={800}
        closeIcon={<CloseOutlined className="text-xl" />}
        className="customer-modal"
        style={{ top: 20 }}
      >
        <div className="relative">
          {/* Modal Header with Gradient */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 -mx-6 -mt-6 px-8 py-6 mb-6 rounded-t-lg">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-xl border-2 border-white/30">
                {getInitials(customer.name)}
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {customer.name}
                </h2>
                <div className="flex items-center gap-3">
                  <div
                    className={`flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-xs font-bold text-white`}
                  >
                    {config.icon}
                    <span>{customer.status}</span>
                  </div>
                  <span className="text-blue-100 text-sm">
                    ID: {customer.id}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Content */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
                Thông Tin Liên Hệ
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <MailOutlined className="text-blue-600 text-lg" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Email</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {customer.email}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <PhoneOutlined className="text-green-600 text-lg" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">
                        Điện thoại
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        {customer.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
                Thống Kê
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border-2 border-blue-200 text-center">
                  <ShoppingCartOutlined className="text-blue-600 text-2xl mb-2" />
                  <p className="text-2xl font-bold text-gray-900 mb-1">
                    {enhancedCustomer.totalOrders}
                  </p>
                  <p className="text-xs text-gray-600 font-medium">Tổng đơn</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-4 border-2 border-green-200 text-center">
                  <DollarOutlined className="text-green-600 text-2xl mb-2" />
                  <p className="text-lg font-bold text-gray-900 mb-1">
                    {formatCurrency(enhancedCustomer.totalSpent)}
                  </p>
                  <p className="text-xs text-gray-600 font-medium">
                    Tổng chi tiêu
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-4 border-2 border-purple-200 text-center">
                  <CalendarOutlined className="text-purple-600 text-2xl mb-2" />
                  <p className="text-sm font-bold text-gray-900 mb-1">
                    {formatDate(enhancedCustomer.joinDate)}
                  </p>
                  <p className="text-xs text-gray-600 font-medium">
                    Ngày tham gia
                  </p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-red-100 rounded-xl p-4 border-2 border-orange-200 text-center">
                  <ClockCircleOutlined className="text-orange-600 text-2xl mb-2" />
                  <p className="text-sm font-bold text-gray-900 mb-1">
                    {formatDate(enhancedCustomer.lastPurchase)}
                  </p>
                  <p className="text-xs text-gray-600 font-medium">
                    Mua gần nhất
                  </p>
                </div>
              </div>
            </div>

            {/* Notes */}
            {customer.notes && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
                  Ghi Chú
                </h3>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-xl p-4">
                  <p className="text-gray-700">{customer.notes}</p>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
                Hành Động Nhanh
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <a
                  href={`mailto:${customer.email}`}
                  className="flex flex-col items-center gap-2 px-4 py-4 bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 rounded-xl transition-all hover:shadow-md"
                >
                  <MailOutlined className="text-blue-600 text-2xl" />
                  <span className="text-sm font-semibold text-gray-900">
                    Gửi Email
                  </span>
                </a>
                <a
                  href={`tel:${customer.phone}`}
                  className="flex flex-col items-center gap-2 px-4 py-4 bg-green-50 hover:bg-green-100 border-2 border-green-200 rounded-xl transition-all hover:shadow-md"
                >
                  <PhoneOutlined className="text-green-600 text-2xl" />
                  <span className="text-sm font-semibold text-gray-900">
                    Gọi điện
                  </span>
                </a>
                <button className="flex flex-col items-center gap-2 px-4 py-4 bg-purple-50 hover:bg-purple-100 border-2 border-purple-200 rounded-xl transition-all hover:shadow-md">
                  <MessageOutlined className="text-purple-600 text-2xl" />
                  <span className="text-sm font-semibold text-gray-900">
                    Nhắn tin
                  </span>
                </button>
                <button className="flex flex-col items-center gap-2 px-4 py-4 bg-orange-50 hover:bg-orange-100 border-2 border-orange-200 rounded-xl transition-all hover:shadow-md">
                  <EditOutlined className="text-orange-600 text-2xl" />
                  <span className="text-sm font-semibold text-gray-900">
                    Chỉnh sửa
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Custom Styles */}
      <style jsx global>{`
        .customer-modal .ant-modal-content {
          padding: 24px;
          border-radius: 20px;
          overflow: hidden;
        }

        .customer-modal .ant-modal-close {
          top: 16px;
          right: 16px;
        }

        .customer-modal .ant-modal-close-x {
          width: 40px;
          height: 40px;
          line-height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          transition: all 0.3s;
        }

        .customer-modal .ant-modal-close-x:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: rotate(90deg);
        }
      `}</style>
    </>
  );
};

export default CustomerCard;
