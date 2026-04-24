import React, { useState } from "react";

interface StatusPopupProps {
  isOpen: boolean;
  currentStatus: string;
  onClose: () => void;
  onSave: (newStatus: string) => void;
}

const statusOptions = [
  {
    value: "PENDING",
    label: "Đang xử lý",
    color: "bg-amber-100 border-amber-300 text-amber-700",
    icon: "⏳"
  },
  {
    value: "CONFIRMED",
    label: "Đã xác nhận",
    color: "bg-blue-100 border-blue-300 text-blue-700",
    icon: "✓"
  },
  {
    value: "DELIVERED",
    label: "Đã giao hàng",
    color: "bg-green-100 border-green-300 text-green-700",
    icon: "📦"
  },
  {
    value: "ALLOCATED",
    label: "Được phân bổ",
    color: "bg-purple-100 border-purple-300 text-purple-700",
    icon: "🎯"
  },
  {
    value: "CANCELLED",
    label: "Đã hủy",
    color: "bg-red-100 border-red-300 text-red-700",
    icon: "✕"
  }
];

const StatusPopup: React.FC<StatusPopupProps> = ({
  isOpen,
  currentStatus,
  onClose,
  onSave
}) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-[480px] p-8 animate-fadeIn transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Cập nhật trạng thái
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-all"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Current Status Badge */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2">Trạng thái hiện tại:</p>
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium ${
              statusOptions.find((s) => s.value === currentStatus)?.color ||
              "bg-gray-100"
            }`}
          >
            <span className="text-lg">
              {statusOptions.find((s) => s.value === currentStatus)?.icon}
            </span>
            <span>
              {statusOptions.find((s) => s.value === currentStatus)?.label}
            </span>
          </div>
        </div>

        {/* Status Options */}
        <div className="space-y-3 mb-8">
          {statusOptions.map((status) => (
            <label
              key={status.value}
              className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                selectedStatus === status.value
                  ? `${status.color} border-current shadow-sm scale-[1.02]`
                  : "bg-white border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="status"
                value={status.value}
                checked={selectedStatus === status.value}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-5 h-5 accent-blue-600"
              />
              <span className="text-2xl">{status.icon}</span>
              <span
                className={`font-semibold flex-1 ${
                  selectedStatus === status.value ? "" : "text-gray-700"
                }`}
              >
                {status.label}
              </span>
              {selectedStatus === status.value && (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </label>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-all hover:shadow-sm"
          >
            Hủy
          </button>
          <button
            onClick={() => onSave(selectedStatus)}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusPopup;
