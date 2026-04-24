"use client";
import React, { useState } from "react";
import {
  X,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  Sparkles
} from "lucide-react";
import { Enum } from "@/services/auth/register/registerServices";

interface CreateAccountModalProps {
  onClose: () => void;
  onSubmit: (data: {
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
    roleType: Enum;
  }) => void;
}

export default function CreateAccountModal({
  onClose,
  onSubmit
}: CreateAccountModalProps) {
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const username = (form.elements.namedItem("username") as HTMLInputElement)
      .value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const phoneNumber = (
      form.elements.namedItem("phoneNumber") as HTMLInputElement
    ).value;
    const roleType = (form.elements.namedItem("roleType") as HTMLInputElement)
      .value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    const confirmPassword = (
      form.elements.namedItem("confirmPassword") as HTMLInputElement
    ).value;

    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    // Cast roleType (string from form) to Enum so it matches the onSubmit signature
    onSubmit({
      username,
      email,
      phoneNumber,
      password,
      roleType: roleType as Enum
    });
  };

  return (
    <>
      <style jsx global>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes modalSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }
        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(16, 185, 129, 0.6);
          }
        }

        .modal-backdrop {
          animation: modalFadeIn 0.3s ease-out;
        }
        .modal-content {
          animation: modalSlideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .shimmer-effect {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.4) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          background-size: 1000px 100%;
          animation: shimmer 2.5s infinite;
        }
        .float-icon {
          animation: float 3s ease-in-out infinite;
        }
        .smooth-scroll-form {
          scroll-behavior: smooth;
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
        }
        .smooth-scroll-form::-webkit-scrollbar {
          width: 6px;
        }
        .smooth-scroll-form::-webkit-scrollbar-track {
          background: transparent;
        }
        .smooth-scroll-form::-webkit-scrollbar-thumb {
          background-color: rgba(16, 185, 129, 0.3);
          border-radius: 10px;
        }
        .smooth-scroll-form::-webkit-scrollbar-thumb:hover {
          background-color: rgba(16, 185, 129, 0.5);
        }
        .input-focus {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .input-focus:focus {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.15);
        }
        .button-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .button-hover:hover {
          transform: translateY(-2px) scale(1.02);
        }
      `}</style>

      <div
        className="modal-backdrop fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
        onClick={onClose}
      >
        <div
          className="modal-content relative bg-white rounded-[2rem] shadow-2xl w-full max-w-3xl overflow-hidden border-2 border-emerald-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header - Phóng to */}
          <div className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 p-12 overflow-hidden">
            {/* Decorative Background */}
            <div className="shimmer-effect absolute inset-0 opacity-30"></div>
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-80 h-80 bg-white rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3" />
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white transition-all duration-300 hover:rotate-90 transform group z-10 hover:scale-110"
            >
              <X className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>

            {/* Title with Icon */}
            <div className="relative z-10 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl float-icon">
                  <UserPlus className="w-10 h-10 text-white" />
                </div>
              </div>
              <h2 className="text-5xl font-black text-white mb-3 tracking-tight">
                Tạo Tài Khoản Mới
              </h2>
            </div>
          </div>

          {/* Form - Phóng to */}
          <form
            onSubmit={handleSubmit}
            className="smooth-scroll-form p-10 space-y-6 max-h-[65vh] overflow-y-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Username */}
              <div className="relative group">
                <label className="block text-base font-bold text-gray-700 mb-3 items-center gap-2">
                  <User className="w-4 h-4 text-emerald-600" />
                  Tên người dùng <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Nhập tên người dùng"
                  className="input-focus w-full px-5 py-4 pl-12 rounded-2xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none font-medium text-base shadow-sm"
                  required
                />
                <User className="absolute left-4 bottom-4 w-5 h-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors pointer-events-none" />
              </div>

              {/* Email */}
              <div className="relative group">
                <label className="block text-base font-bold text-gray-700 mb-3 items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-600" />
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  className="input-focus w-full px-5 py-4 pl-12 rounded-2xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none font-medium text-base shadow-sm"
                  required
                />
                <Mail className="absolute left-4 bottom-4 w-5 h-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors pointer-events-none" />
              </div>
            </div>

            {/* Phone */}
            <div className="relative group">
              <label className="block text-base font-bold text-gray-700 mb-3 items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600" />
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="0123456789"
                className="input-focus w-full px-5 py-4 pl-12 rounded-2xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none font-medium text-base shadow-sm"
                required
              />
              <Phone className="absolute left-4 bottom-4 w-5 h-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors pointer-events-none" />
            </div>
            <select
              name="roleType"
              defaultValue=""
              className="w-full px-5 py-4 pl-12 pr-10 rounded-2xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none font-medium text-base shadow-sm appearance-none bg-white cursor-pointer"
              required
            >
              <option value="" disabled>
                Chọn vai trò
              </option>
              <option value="EVM_STAFF">Nhân viên EVM</option>
              <option value="DEALER_MANAGER">Quản lý đại lý</option>
              <option value="DEALER_STAFF">Nhân viên đại lý</option>
            </select>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Password */}
              <div className="relative group">
                <label className="block text-base font-bold text-gray-700 mb-3 items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-600" />
                  Mật khẩu <span className="text-red-500">*</span>
                </label>
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  className="input-focus w-full px-5 py-4 pl-12 pr-12 rounded-2xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none font-medium text-base shadow-sm"
                  required
                />
                <Lock className="absolute left-4 bottom-4 w-5 h-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 bottom-4 text-gray-400 hover:text-emerald-600 transition-colors"
                >
                  {showPass ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative group">
                <label className="block text-base font-bold text-gray-700 mb-3 items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-600" />
                  Xác nhận mật khẩu <span className="text-red-500">*</span>
                </label>
                <input
                  type={showPass ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="••••••••"
                  className="input-focus w-full px-5 py-4 pl-12 rounded-2xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none font-medium text-base shadow-sm"
                  required
                />
                <Lock className="absolute left-4 bottom-4 w-5 h-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors pointer-events-none" />
              </div>
            </div>

            {/* Info Box */}
            <div className="mt-6 p-5 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-emerald-500 rounded-xl shadow-lg flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-emerald-900 mb-1 text-base">
                    Lưu ý quan trọng
                  </h4>
                  <p className="text-sm text-emerald-700 leading-relaxed">
                    Mật khẩu nên có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường
                    và số để đảm bảo an toàn.
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons - Phóng to */}
            <div className="flex gap-5 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="button-hover flex-1 py-4 px-8 border-2 border-gray-300 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 text-base shadow-md"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="button-hover flex-1 py-4 px-8 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-800 text-white font-black rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-base flex items-center justify-center gap-2"
              >
                <UserPlus className="w-5 h-5" />
                Tạo tài khoản
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
