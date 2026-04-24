"use client";
import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import {
  AlertTriangle,
  CheckCircle2,
  Calendar,
  DollarSign,
  Clock,
  FileText,
  TrendingDown,
  X,
  History
} from "lucide-react";

interface PaymentHistory {
  date: string;
  amount: number;
  note?: string;
}

interface Props {
  customer: string;
  debt: number;
  lastPayment: string;
  notes?: string;
  history?: PaymentHistory[];
}

const DebtCard: React.FC<Props> = ({
  customer,
  debt,
  lastPayment,
  notes,
  history
}) => {
  const [formattedDebt, setFormattedDebt] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setFormattedDebt(debt.toLocaleString("vi-VN"));
  }, [debt]);

  const FormattedPrice: React.FC<{ value: number }> = ({ value }) => (
    <span>{value.toLocaleString("vi-VN")}</span>
  );

  const hasDebt = debt > 0;
  const statusConfig = hasDebt
    ? {
        bg: "bg-gradient-to-r from-red-500 to-pink-500",
        text: "text-white",
        icon: <AlertTriangle size={14} />,
        label: "Chưa thanh toán",
        cardBg: "from-red-50 to-pink-50",
        border: "border-red-200",
        iconBg: "from-red-500 to-pink-500"
      }
    : {
        bg: "bg-gradient-to-r from-green-500 to-emerald-500",
        text: "text-white",
        icon: <CheckCircle2 size={14} className="fill-current" />,
        label: "Đã thanh toán",
        cardBg: "from-green-50 to-emerald-50",
        border: "border-green-200",
        iconBg: "from-green-500 to-emerald-500"
      };

  return (
    <>
      {/* Card Preview */}
      <div
        onClick={() => setIsOpen(true)}
        className={`group bg-white rounded-2xl shadow-md hover:shadow-2xl border border-gray-100 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2`}
      >
        {/* Header with Gradient */}
        <div
          className={`h-20 bg-gradient-to-r ${statusConfig.cardBg} p-4 border-b ${statusConfig.border} relative`}
        >
          <div className="absolute top-3 right-3">
            <div
              className={`${statusConfig.bg} px-3 py-1.5 rounded-full flex items-center gap-2 shadow-md`}
            >
              {statusConfig.icon}
              <span className="text-xs font-bold text-white">
                {statusConfig.label}
              </span>
            </div>
          </div>
        </div>

        {/* Avatar */}
        <div className="relative px-6 -mt-10 mb-4">
          <div
            className={`w-16 h-16 bg-gradient-to-br ${statusConfig.iconBg} rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-xl border-4 border-white`}
          >
            {customer.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          {/* Customer Name */}
          <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
            {customer}
          </h3>

          {/* Debt Amount */}
          <div className="flex items-center gap-2 mb-2">
            <div className={`bg-gradient-to-br ${statusConfig.cardBg} p-2 rounded-lg`}>
              <DollarSign
                size={16}
                className={hasDebt ? "text-red-600" : "text-green-600"}
              />
            </div>
            <div>
              <p className="text-xs text-gray-500">Công nợ</p>
              <p
                className={`font-bold text-lg ${
                  hasDebt ? "text-red-600" : "text-green-600"
                }`}
              >
                {formattedDebt} ₫
              </p>
            </div>
          </div>

          {/* Last Payment */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-3 pt-3 border-t border-gray-100">
            <Clock size={14} className="text-gray-400" />
            <span>Thanh toán: {lastPayment}</span>
          </div>
        </div>
      </div>

      {/* Enhanced Modal */}
      <Modal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={null}
        centered
        width={700}
        closeIcon={
          <div className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
            <X size={20} />
          </div>
        }
        className="debt-detail-modal"
      >
        <div className="flex flex-col gap-6 -m-6">
          {/* Modal Header */}
          <div
            className={`relative h-28 bg-gradient-to-r ${statusConfig.cardBg} p-6 border-b ${statusConfig.border}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${statusConfig.iconBg} rounded-2xl flex items-center justify-center text-white font-bold text-xl border-2 border-white/30 shadow-lg`}
                >
                  {customer.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    {customer}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Chi tiết công nợ khách hàng
                  </p>
                </div>
              </div>
              <div
                className={`${statusConfig.bg} px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg`}
              >
                {statusConfig.icon}
                <span className="text-sm font-bold text-white">
                  {statusConfig.label}
                </span>
              </div>
            </div>
          </div>

          {/* Modal Content */}
          <div className="px-8 pb-8 space-y-6">
            {/* Debt Info */}
            <div
              className={`bg-gradient-to-br ${statusConfig.cardBg} border ${statusConfig.border} rounded-2xl p-6`}
            >
              <div className="flex items-center gap-2 mb-4">
                <DollarSign
                  size={20}
                  className={hasDebt ? "text-red-600" : "text-green-600"}
                />
                <h3 className="font-bold text-gray-900">Thông tin công nợ</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <p className="text-xs text-gray-500 mb-1">Số tiền công nợ</p>
                  <p
                    className={`text-2xl font-bold ${
                      hasDebt ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    <FormattedPrice value={debt} /> ₫
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock size={14} className="text-gray-400" />
                    <p className="text-xs text-gray-500">Lần thanh toán cuối</p>
                  </div>
                  <p className="text-lg font-bold text-gray-900">
                    {lastPayment}
                  </p>
                </div>
              </div>
            </div>

            {/* Notes */}
            {notes && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <FileText size={20} className="text-blue-600" />
                  <h3 className="font-bold text-gray-900">Ghi chú</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">{notes}</p>
              </div>
            )}

            {/* Payment History */}
            {history && history.length > 0 && (
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <History size={20} className="text-purple-600" />
                  <h3 className="font-bold text-gray-900">
                    Lịch sử thanh toán ({history.length})
                  </h3>
                </div>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {history.map((h, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-xl p-4 shadow-sm border border-purple-100 hover:border-purple-300 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                            {idx + 1}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Calendar size={14} className="text-purple-600" />
                              <span className="text-sm font-semibold text-gray-900">
                                {h.date}
                              </span>
                            </div>
                            {h.note && (
                              <p className="text-xs text-gray-500">{h.note}</p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            <TrendingDown size={14} className="text-green-600" />
                            <p className="font-bold text-green-600">
                              <FormattedPrice value={h.amount} /> ₫
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl"
              >
                Đóng
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl">
                Ghi nhận thanh toán
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <style jsx global>{`
        .debt-detail-modal .ant-modal-content {
          padding: 0;
          overflow: hidden;
          border-radius: 1.5rem;
        }
        .debt-detail-modal .ant-modal-close {
          top: 1rem;
          right: 1rem;
        }
      `}</style>
    </>
  );
};

export default DebtCard;