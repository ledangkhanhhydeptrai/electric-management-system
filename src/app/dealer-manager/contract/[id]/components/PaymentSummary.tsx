import React from "react";
import { CreditCard, Tag, Receipt, DollarSign, Wallet } from "lucide-react";

interface PaymentSummaryProps {
  subtotal: number;
  discount: number;
  vat: number;
  total: number;
  deposit: number;
  notes?: string;
}

export const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  subtotal,
  discount,
  vat,
  total,
  deposit,
  notes
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(amount);
  };

  const remaining = total - deposit;

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden backdrop-blur-lg bg-opacity-90">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Receipt className="w-6 h-6" />
          Tổng kết thanh toán
        </h2>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Subtotal */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-gray-700">Tạm tính</span>
          </div>
          <span className="text-lg font-bold text-gray-800">
            {formatCurrency(subtotal)}
          </span>
        </div>

        {/* Discount */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-rose-50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <Tag className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-gray-700">Giảm giá</span>
          </div>
          <span className="text-lg font-bold text-red-600">
            -{formatCurrency(discount)}
          </span>
        </div>

        {/* VAT */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Receipt className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-gray-700">VAT ({vat}%)</span>
          </div>
          <span className="text-lg font-bold text-blue-600">
            {formatCurrency((subtotal - discount) * (vat / 100))}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t-2 border-dashed border-gray-300 my-4"></div>

        {/* Total */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-800">Tổng cộng</span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {formatCurrency(total)}
          </span>
        </div>

        {/* Deposit */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-gray-700">Đã đặt cọc</span>
          </div>
          <span className="text-lg font-bold text-green-600">
            {formatCurrency(deposit)}
          </span>
        </div>

        {/* Remaining */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border-2 border-orange-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-gray-700">Còn lại</span>
          </div>
          <span className="text-xl font-bold text-orange-600">
            {formatCurrency(remaining)}
          </span>
        </div>

        {/* Notes */}
        {notes && (
          <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-200">
            <p className="text-sm font-semibold text-gray-600 mb-2">
              📝 Ghi chú:
            </p>
            <p className="text-gray-700">{notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};