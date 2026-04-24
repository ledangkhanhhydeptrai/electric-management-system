"use client";

import React from "react";
import { Modal } from "antd";
import {
  User,
  Mail,
  Phone,
  Clock,
  Calendar,
  MessageSquare,
  Star,
  MapPin,
  X,
  Send,
  PhoneCall,
  Eye,
  Edit2,
  History
} from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastVisit: string;
  status?: "Mới" | "Tiềm năng" | "VIP";
  notes?: string;
  interactions?: { date: string; note: string }[];
  address?: string;
  totalPurchases?: number;
}

interface Props {
  customer: Customer;
}

const CustomerCard: React.FC<Props> = ({ customer }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const getStatusConfig = (status: "Mới" | "Tiềm năng" | "VIP") => {
    switch (status) {
      case "VIP":
        return {
          bg: "bg-gradient-to-r from-purple-500 to-pink-500",
          text: "text-white",
          border: "border-purple-500",
          icon: <Star size={14} className="fill-current" />
        };
      case "Tiềm năng":
        return {
          bg: "bg-gradient-to-r from-blue-500 to-indigo-500",
          text: "text-white",
          border: "border-blue-500",
          icon: <Calendar size={14} />
        };
      case "Mới":
        return {
          bg: "bg-gradient-to-r from-green-500 to-emerald-500",
          text: "text-white",
          border: "border-green-500",
          icon: <User size={14} />
        };
    }
  };

  const statusConfig = customer.status
    ? getStatusConfig(customer.status)
    : null;

  return (
    <>
      {/* Card Preview */}
      <div
        onClick={() => setIsOpen(true)}
        className="group bg-white rounded-2xl shadow-md hover:shadow-2xl border border-gray-100 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2"
      >
        {/* Header with Gradient */}
        <div className="relative h-24 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-4">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          {statusConfig && (
            <div className="absolute top-4 right-4">
              <div
                className={`${statusConfig.bg} px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg`}
              >
                {statusConfig.icon}
                <span className="text-xs font-bold text-white">
                  {customer.status}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className="relative px-6 -mt-12 mb-4">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xl border-4 border-white">
            {customer.name.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          {/* Name */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
            {customer.name}
          </h3>

          {/* Info */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail size={16} className="text-blue-500" />
              <span className="truncate">{customer.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone size={16} className="text-green-500" />
              <span>{customer.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock size={16} className="text-orange-500" />
              <span>Ghé thăm: {customer.lastVisit}</span>
            </div>
          </div>

          {/* View Details Button */}
          <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-2.5 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
            <Eye size={18} />
            <span>Xem chi tiết</span>
          </button>
        </div>
      </div>

      {/* Enhanced Modal */}
      <Modal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={null}
        centered
        width={800}
        closeIcon={
          <div className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
            <X size={20} />
          </div>
        }
        className="customer-detail-modal"
      >
        <div className="flex flex-col gap-6 -m-6">
          {/* Header */}
          <div className="relative h-32 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6">
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white font-bold text-2xl border-2 border-white/30 shadow-lg">
                  {customer.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">
                    {customer.name}
                  </h2>
                  <p className="text-blue-100 text-sm">ID: {customer.id}</p>
                </div>
              </div>
              {statusConfig && (
                <div
                  className={`${statusConfig.bg} px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg`}
                >
                  {statusConfig.icon}
                  <span className="text-sm font-bold text-white">
                    {customer.status}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="px-8 pb-8 space-y-6">
            {/* Contact Info */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <User size={20} className="text-blue-600" />
                <h3 className="font-bold text-gray-900">Thông tin liên hệ</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Mail size={20} className="text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 font-medium mb-1">
                      Email
                    </p>
                    <p className="font-semibold text-gray-900 truncate">
                      {customer.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Phone size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">
                      Điện thoại
                    </p>
                    <p className="font-semibold text-gray-900">
                      {customer.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Clock size={20} className="text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">
                      Lần ghé thăm
                    </p>
                    <p className="font-semibold text-gray-900">
                      {customer.lastVisit}
                    </p>
                  </div>
                </div>

                {customer.address && (
                  <div className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <MapPin size={20} className="text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 font-medium mb-1">
                        Địa chỉ
                      </p>
                      <p className="font-semibold text-gray-900">
                        {customer.address}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Notes */}
            {customer.notes && (
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare size={20} className="text-purple-600" />
                  <h3 className="font-bold text-gray-900">Ghi chú</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {customer.notes}
                </p>
              </div>
            )}

            {/* Interaction History */}
            {customer.interactions && customer.interactions.length > 0 && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <History size={20} className="text-green-600" />
                  <h3 className="font-bold text-gray-900">
                    Lịch sử tương tác ({customer.interactions.length})
                  </h3>
                </div>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {customer.interactions.map((interaction, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-xl p-4 shadow-sm border border-green-100 hover:border-green-300 transition-colors"
                    >
                      <p className="text-gray-700 mb-2">{interaction.note}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar size={12} />
                        <span>{interaction.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-4">
              <a
                href={`mailto:${customer.email}`}
                className="group flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200 rounded-xl transition-all"
              >
                <div className="bg-blue-500 p-3 rounded-xl group-hover:scale-110 transition-transform">
                  <Send size={20} className="text-white" />
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  Gửi Email
                </span>
              </a>

              <a
                href={`tel:${customer.phone}`}
                className="group flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border border-green-200 rounded-xl transition-all"
              >
                <div className="bg-green-500 p-3 rounded-xl group-hover:scale-110 transition-transform">
                  <PhoneCall size={20} className="text-white" />
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  Gọi điện
                </span>
              </a>

              <button className="group flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border border-purple-200 rounded-xl transition-all">
                <div className="bg-purple-500 p-3 rounded-xl group-hover:scale-110 transition-transform">
                  <Edit2 size={20} className="text-white" />
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  Chỉnh sửa
                </span>
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <style jsx global>{`
        .customer-detail-modal .ant-modal-content {
          padding: 0;
          overflow: hidden;
          border-radius: 1.5rem;
        }
        .customer-detail-modal .ant-modal-close {
          top: 1rem;
          right: 1rem;
        }
      `}</style>
    </>
  );
};

export default CustomerCard;
