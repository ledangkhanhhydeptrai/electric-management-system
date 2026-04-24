"use client";
import { Account, UpdateAccountDTO } from "@/app/types/Account/Account";
import { X, Save, User, Phone } from "lucide-react";
import React, { useState } from "react";

interface UpdateAccountModalProps {
  account: Account;
  onClose: () => void;
  onUpdate: (id: string, payload: UpdateAccountDTO) => void;
}

export default function UpdateAccountModal({
  account,
  onClose,
  onUpdate
}: UpdateAccountModalProps) {
  const [formData, setFormData] = useState({
    username: account.username || "",
    phoneNumber: account.phoneNumber || ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: UpdateAccountDTO = {
      ...formData
    };
    onUpdate(account.id, payload);
  };

  return (
    <>
      <style jsx>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .modal-backdrop {
          animation: modalFadeIn 0.3s ease-out;
        }

        .modal-content {
          animation: modalSlideIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>

      <div
        className="modal-backdrop fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <div
          className="modal-content bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="relative bg-gradient-to-br from-emerald-500 via-teal-500 to-green-600 px-8 py-6 text-white overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            </div>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-200 hover:rotate-90 transform group"
            >
              <X
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
            </button>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <User className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold">Cập nhật thành viên</h2>
              </div>
              <p className="text-emerald-100 text-sm ml-1">
                Điều chỉnh thông tin người tham gia bảo vệ môi trường
              </p>
            </div>
          </div>

          {/* Modal Body */}
          <form onSubmit={handleSubmit}>
            <div
              className="p-8 space-y-6 max-h-[65vh] overflow-y-auto"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#10b981 #f1f5f9"
              }}
            >
              {/* Username Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                  <User className="w-4 h-4 text-emerald-600" />
                  Username
                </label>
                <div className="relative group">
                  <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Tên người dùng"
                    className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3.5 focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all outline-none text-gray-700 font-medium group-hover:border-gray-300"
                    required
                  />
                </div>
              </div>

              {/* Phone Number Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  Số điện thoại
                </label>
                <div className="relative group">
                  <input
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="0123456789"
                    className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3.5 focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all outline-none text-gray-700 font-medium group-hover:border-gray-300"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-8 py-6 bg-gradient-to-br from-gray-50 to-gray-100 border-t-2 border-gray-200 flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-white hover:bg-gray-100 text-gray-700 rounded-2xl font-bold transition-all duration-200 border-2 border-gray-300 hover:border-gray-400 shadow-md hover:shadow-lg"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="group px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
              >
                <Save className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Lưu thay đổi
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
