import React from "react";
import {
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Cake,
  Clock,
  Edit2,
  Trash2,
  Eye
} from "lucide-react";
import { CustomerVIP } from "../types/customer";

interface CustomerCardProps {
  customer: CustomerVIP;
  index: number;
  onView: (id: string) => void;
  onEdit: (customer: CustomerVIP) => void;
  onDelete: (id: string) => void;
  formatDate: (dateString: string) => string;
}

const getCustomerTypeConfig = (type: "INDIVIDUAL" | "COMPANY") => {
  if (type === "INDIVIDUAL") {
    return {
      label: "Cá nhân",
      icon: <User className="w-4 h-4" />,
      bgColor: "bg-gradient-to-r from-blue-50 to-cyan-50",
      textColor: "text-blue-700",
      borderColor: "border-blue-200",
      badgeColor: "bg-gradient-to-r from-blue-500 to-cyan-600"
    };
  }
  return {
    label: "Công ty",
    icon: <Building2 className="w-4 h-4" />,
    bgColor: "bg-gradient-to-r from-purple-50 to-pink-50",
    textColor: "text-purple-700",
    borderColor: "border-purple-200",
    badgeColor: "bg-gradient-to-r from-purple-500 to-pink-600"
  };
};

const CustomerCard: React.FC<CustomerCardProps> = ({
  customer,
  index,
  onView,
  onEdit,
  onDelete,
  formatDate
}) => {
  const typeConfig = getCustomerTypeConfig(customer.customerType);

  return (
    <div
      className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden card-hover"
      style={{
        animation: `slideIn 0.4s ease-out ${index * 0.1}s backwards`
      }}
    >
      {/* Card Header */}
      <div
        className={`${typeConfig.bgColor} px-6 py-4 border-b-2 ${typeConfig.borderColor}`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div
              className={`${typeConfig.badgeColor} p-3 rounded-xl shadow-lg`}
            >
              {customer.customerType === "INDIVIDUAL"
                ? <User className="w-6 h-6 text-white" />
                : <Building2 className="w-6 h-6 text-white" />}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {customer.fullName}
              </h3>
              <span
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${typeConfig.textColor} ${typeConfig.bgColor} border ${typeConfig.borderColor}`}
              >
                {typeConfig.icon}
                {typeConfig.label}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              className="p-2 hover:bg-white rounded-lg transition-colors"
              title="Xem chi tiết"
              onClick={() => onView(customer.id)}
            >
              <Eye className="w-4 h-4 text-gray-600" />
            </button>
            <button
              className="p-2 hover:bg-white rounded-lg transition-colors"
              title="Chỉnh sửa"
              onClick={() => onEdit(customer)}
            >
              <Edit2 className="w-4 h-4 text-blue-600" />
            </button>
            <button
              className="p-2 hover:bg-white rounded-lg transition-colors"
              title="Xóa"
              onClick={() => onDelete(customer.id)}
            >
              <Trash2 className="w-4 h-4 text-red-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 space-y-4">
        {/* Contact Info */}
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Mail className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-gray-500 mb-1">Email</p>
              <p className="text-sm font-medium text-gray-900">
                {customer.email}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <Phone className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-gray-500 mb-1">
                Số điện thoại
              </p>
              <p className="text-sm font-medium text-gray-900">
                {customer.phone}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-orange-100 p-2 rounded-lg">
              <MapPin className="w-4 h-4 text-orange-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-gray-500 mb-1">
                Địa chỉ
              </p>
              <p className="text-sm font-medium text-gray-900">
                {customer.address}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-pink-100 p-2 rounded-lg">
              <Cake className="w-4 h-4 text-pink-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-gray-500 mb-1">
                Ngày sinh
              </p>
              <p className="text-sm font-medium text-gray-900">
                {formatDate(customer.dob)}
              </p>
            </div>
          </div>
        </div>

        {/* Timestamps */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar className="w-3 h-3" />
              <span>
                Tạo: {formatDate(customer.createdAt)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3" />
              <span>
                Cập nhật: {formatDate(customer.lastModifiedAt)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;
