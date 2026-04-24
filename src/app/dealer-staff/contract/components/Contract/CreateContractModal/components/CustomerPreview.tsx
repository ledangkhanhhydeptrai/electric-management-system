// components/Contract/ContractModal/CustomerPreview.tsx
import React from "react";
import { CustomerVIP } from "@/app/evm/admin/customer/types/customer";

interface CustomerPreviewProps {
  customer: CustomerVIP;
}

const CustomerPreview: React.FC<CustomerPreviewProps> = ({ customer }) => {
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("vi-VN");
    } catch {
      return dateStr;
    }
  };

  const customerTypeConfig: {
    [key: string]: {
      emoji: string;
      label: string;
      bg: string;
      text: string;
    };
  } = {
    INDIVIDUAL: {
      emoji: "👤",
      label: "Cá nhân",
      bg: "bg-blue-100",
      text: "text-blue-700"
    },
    BUSINESS: {
      emoji: "🏢",
      label: "Doanh nghiệp",
      bg: "bg-purple-100",
      text: "text-purple-700"
    },
    VIP: {
      emoji: "⭐",
      label: "VIP",
      bg: "bg-yellow-100",
      text: "text-yellow-700"
    }
  };

  const typeConfig = customerTypeConfig[customer.customerType] || {
    emoji: "👤",
    label: customer.customerType,
    bg: "bg-gray-100",
    text: "text-gray-700"
  };

  return (
    <div className="mt-3 p-4 bg-white rounded-xl border-2 border-green-200 shadow-sm">
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-green-100">
          <h4 className="font-bold text-green-700 text-lg flex items-center gap-2">
            <span>{typeConfig.emoji}</span>
            <span>{customer.fullName}</span>
          </h4>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${typeConfig.bg} ${typeConfig.text}`}
          >
            {typeConfig.emoji} {typeConfig.label}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3">
            <div className="text-xs text-gray-600 mb-1">📧 Email</div>
            <div className="font-semibold text-gray-900 text-sm truncate">
              {customer.email}
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3">
            <div className="text-xs text-gray-600 mb-1">📱 Số điện thoại</div>
            <div className="font-semibold text-gray-900 text-sm">
              {customer.phone}
            </div>
          </div>

          {customer.address && (
            <div className="col-span-2 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3">
              <div className="text-xs text-gray-600 mb-1">📍 Địa chỉ</div>
              <div className="font-medium text-gray-900 text-sm">
                {customer.address}
              </div>
            </div>
          )}

          {customer.dob && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3">
              <div className="text-xs text-gray-600 mb-1">🎂 Ngày sinh</div>
              <div className="font-medium text-gray-900 text-sm">
                {formatDate(customer.dob)}
              </div>
            </div>
          )}

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3">
            <div className="text-xs text-gray-600 mb-1">📅 Ngày tạo</div>
            <div className="font-medium text-gray-900 text-sm">
              {formatDate(customer.createdAt)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPreview;
