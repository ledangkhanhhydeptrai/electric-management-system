import React from "react";
import { X } from "lucide-react";
import { Staff } from "@/services/staffService/staff";
import { Dealer } from "../../dealerView/types/types";

interface FormData {
  fullName: string;
  position: string;
  title: string;
  workLocation: string;
  dealerId: string;
}

interface StaffModalProps {
  show: boolean;
  editingStaff: Staff | null;
  formData: FormData;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onFormChange: (formData: FormData) => void;
  dealers: Dealer[];
}

export default function StaffModal({
  show,
  editingStaff,
  formData,
  onClose,
  onSubmit,
  onFormChange,
  dealers
}: StaffModalProps) {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-lg shadow-2xl transform transition-all duration-300 animate-slideUp"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-6 rounded-t-3xl">
          <h2 className="text-2xl font-bold text-white">
            {editingStaff ? "✏️ Chỉnh Sửa Nhân Viên" : "➕ Thêm Nhân Viên Mới"}
          </h2>
          <p className="text-blue-100 text-sm mt-1">
            {editingStaff
              ? "Cập nhật thông tin nhân viên"
              : "Điền thông tin để thêm nhân viên mới"}
          </p>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-white/20 rounded-xl transition-all duration-300"
          >
            <X size={24} className="text-white" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-8">
          <div className="mb-6">
            <label className="block mb-3 text-sm font-bold text-gray-700 uppercase tracking-wide">
              Họ và Tên <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={e =>
                onFormChange({ ...formData, fullName: e.target.value })}
              placeholder="Nhập họ và tên nhân viên"
              required
              className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-3 text-sm font-bold text-gray-700 uppercase tracking-wide">
              Đại lý <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.dealerId}
              onChange={e =>
                onFormChange({ ...formData, dealerId: e.target.value })}
              required
              className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white cursor-pointer"
            >
              <option value="" disabled>
                Chọn đại lý
              </option>
              {dealers.map(dealer =>
                <option key={dealer.id} value={dealer.id}>
                  {dealer.name}
                </option>
              )}
            </select>
          </div>
          <div className="mb-6">
            <label className="block mb-3 text-sm font-bold text-gray-700 uppercase tracking-wide">
              Vị trí <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.position}
              onChange={e =>
                onFormChange({ ...formData, position: e.target.value })}
              placeholder="Nhập vị trí"
              required
              className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-3 text-sm font-bold text-gray-700 uppercase tracking-wide">
              Chức vụ <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={e =>
                onFormChange({ ...formData, title: e.target.value })}
              placeholder="Nhập chức vụ"
              required
              className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-3 text-sm font-bold text-gray-700 uppercase tracking-wide">
              Nơi làm việc <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.workLocation}
              onChange={e =>
                onFormChange({ ...formData, workLocation: e.target.value })}
              placeholder="Nhập nơi làm việc"
              required
              className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
            />
          </div>
          <div className="flex gap-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-semibold text-gray-700 transition-all duration-300"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              {editingStaff ? "💾 Cập Nhật" : "✨ Thêm Mới"}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
