import React, { useState } from "react";
import { X, User, Key, ChevronDown, Briefcase, MapPin } from "lucide-react";
import { Account } from "@/app/types/Account/Account";

interface CreateStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    fullName: string;
    accountId: string;
    position: string;
    workLocation: string;
    title: string;
  }) => void;
  accounts: Account[];
}

const CreateStaffModal: React.FC<CreateStaffModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  accounts
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    accountId: "",
    position: "",
    title: "",
    workLocation: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      fullName: "",
      accountId: "",
      position: "",
      title: "",
      workLocation: ""
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <User className="w-6 h-6" />
            Tạo nhân viên mới
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Full Name */}
          <div className="relative group">
            <label className="block text-base font-bold text-gray-700 mb-3 items-center gap-2">
              <User className="w-4 h-4 text-emerald-600" />
              Họ và tên <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Nguyễn Văn A"
              className="w-full px-5 py-4 pl-12 rounded-2xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none font-medium text-base shadow-sm"
              required
            />
            <User className="absolute left-4 bottom-4 w-5 h-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors pointer-events-none" />
          </div>

          {/* Account ID */}
          <div className="relative group">
            <label className="block text-base font-bold text-gray-700 mb-3 items-center gap-2">
              <Key className="w-4 h-4 text-emerald-600 inline-block mr-1" />
              Tài khoản <span className="text-red-500">*</span>
            </label>

            <select
              name="accountId"
              value={formData.accountId}
              onChange={handleChange}
              className="w-full px-5 py-4 pl-12 pr-10 rounded-2xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none font-medium text-base shadow-sm appearance-none bg-white cursor-pointer"
              required
            >
              <option value="" disabled>
                Chọn tài khoản
              </option>
              {accounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.username} — {acc.email}
                </option>
              ))}
            </select>

            <Key className="absolute left-4 top-[58px] w-5 h-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors pointer-events-none" />
            <ChevronDown className="absolute right-4 top-[58px] w-5 h-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors pointer-events-none" />
          </div>
          <div className="relative group">
            <label className="block text-base font-bold text-gray-700 mb-3 items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-600" />
              Vị trí <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="Nhân viên kinh doanh"
              className="w-full px-5 py-4 pl-12 rounded-2xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none font-medium text-base shadow-sm"
              required
            />
            <Briefcase className="absolute left-4 bottom-4 w-5 h-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors pointer-events-none" />
          </div>
          <div className="relative group">
            <label className="block text-base font-bold text-gray-700 mb-3 items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-600" />
              Chức vụ <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Nhân viên kinh doanh"
              className="w-full px-5 py-4 pl-12 rounded-2xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none font-medium text-base shadow-sm"
              required
            />
            <Briefcase className="absolute left-4 bottom-4 w-5 h-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors pointer-events-none" />
          </div>
          <div className="relative group">
            <label className="block text-base font-bold text-gray-700 mb-3 items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              Địa điểm <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="workLocation"
              value={formData.workLocation}
              onChange={handleChange}
              placeholder="Nhập nơi làm việc"
              className="w-full px-5 py-4 pl-12 rounded-2xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none font-medium text-base shadow-sm"
              required
            />
            <MapPin className="absolute left-4 bottom-4 w-5 h-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors pointer-events-none" />
          </div>
          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-2xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold hover:from-emerald-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all"
            >
              Tạo mới
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStaffModal;
