// components/UpdatePasswordModal.tsx
"use client";
import { Account } from "@/app/types/Account/Account";
import React, { useState } from "react";

interface UpdatePasswordModalProps {
  account: Account;
  onClose: () => void;
  onUpdate: (formData: {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }) => void;
}

export default function UpdatePasswordModal({
  account,
  onClose,
  onUpdate
}: UpdatePasswordModalProps) {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-fadeInUp">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">
            🔐 Cập nhật mật khẩu
          </h2>
          <p className="text-emerald-50 text-sm mt-1">
            Tài khoản: {account.email}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Trường mật khẩu cũ */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mật khẩu cũ
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.oldPassword}
                onChange={(e) =>
                  setFormData({ ...formData, oldPassword: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="Nhập mật khẩu cũ"
                required
                minLength={6}
              />
            </div>
          </div>

          {/* Trường mật khẩu mới */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mật khẩu mới
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.newPassword}
                onChange={(e) =>
                  setFormData({ ...formData, newPassword: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="Nhập mật khẩu mới"
                required
                minLength={6}
              />
            </div>
          </div>

          {/* Trường xác nhận mật khẩu */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Xác nhận mật khẩu mới
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.confirmNewPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmNewPassword: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="Nhập lại mật khẩu mới"
                required
                minLength={6}
              />
            </div>
          </div>

          {/* Checkbox hiển thị mật khẩu */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
            />
            <label
              htmlFor="showPassword"
              className="ml-2 text-sm text-gray-700"
            >
              Hiển thị mật khẩu
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl"
            >
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}