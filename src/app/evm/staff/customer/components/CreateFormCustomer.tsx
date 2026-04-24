import React from "react";
import {
  X,
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Sparkles,
  CheckCircle,
  UserPlus
} from "lucide-react";

interface CreateFormCustomerProps {
  isOpen: boolean;
  fullName: string;
  setFullName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
  address: string;
  setAddress: (val: string) => void;
  dob: string;
  setDob: (val: string) => void;
  customerType: "INDIVIDUAL" | "COMPANY";
  setCustomerType: (val: "INDIVIDUAL" | "COMPANY") => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  onClose: () => void;
}

const CreateFormCustomer: React.FC<CreateFormCustomerProps> = ({
  isOpen,
  fullName,
  setFullName,
  email,
  setEmail,
  phone,
  setPhone,
  address,
  setAddress,
  dob,
  setDob,
  customerType,
  setCustomerType,
  handleSubmit,
  onClose
}) => {
  if (!isOpen) return null; // <-- thêm dòng này
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

        .modal-overlay {
          animation: modalFadeIn 0.3s ease-out;
        }

        .modal-content {
          animation: modalSlideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .shimmer-effect {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }

        .input-focus {
          transition: all 0.2s ease;
        }

        .input-focus:focus {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(99, 102, 241, 0.2);
        }
      `}</style>

      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Overlay */}
        <div
          className="modal-overlay fixed inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-900/40 to-pink-900/40 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Container */}
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="modal-content relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl transform">
            {/* Decorative Header Background */}
            <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-t-3xl overflow-hidden">
              <div className="shimmer-effect absolute inset-0 opacity-30"></div>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiIG9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
            </div>

            {/* Header */}
            <div className="relative px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl shadow-lg">
                    <Sparkles className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-white">
                      Tạo khách hàng mới
                    </h2>
                    <p className="text-indigo-100 text-sm font-medium mt-1">
                      Điền thông tin để thêm khách hàng vào hệ thống
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 p-2.5 rounded-xl transition-all hover:scale-110 hover:rotate-90"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
              className="px-8 py-6 space-y-6"
            >
              {/* Customer Type Selection */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-4">
                  Loại khách hàng <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setCustomerType("INDIVIDUAL")}
                    className={`relative p-5 rounded-2xl border-3 transition-all duration-300 ${
                      customerType === "INDIVIDUAL"
                        ? "border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-lg scale-105"
                        : "border-gray-200 bg-white hover:border-indigo-300 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-3 rounded-xl ${
                          customerType === "INDIVIDUAL"
                            ? "bg-gradient-to-br from-indigo-500 to-purple-600"
                            : "bg-gray-100"
                        }`}
                      >
                        <User
                          className={`w-6 h-6 ${
                            customerType === "INDIVIDUAL"
                              ? "text-white"
                              : "text-gray-400"
                          }`}
                        />
                      </div>
                      <div className="text-left">
                        <p
                          className={`font-bold ${
                            customerType === "INDIVIDUAL"
                              ? "text-indigo-700"
                              : "text-gray-600"
                          }`}
                        >
                          Cá nhân
                        </p>
                        <p className="text-xs text-gray-500">
                          Khách hàng cá nhân
                        </p>
                      </div>
                    </div>
                    {customerType === "INDIVIDUAL" && (
                      <CheckCircle className="absolute top-3 right-3 w-5 h-5 text-indigo-600" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setCustomerType("COMPANY")}
                    className={`relative p-5 rounded-2xl border-3 transition-all duration-300 ${
                      customerType === "COMPANY"
                        ? "border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg scale-105"
                        : "border-gray-200 bg-white hover:border-purple-300 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-3 rounded-xl ${
                          customerType === "COMPANY"
                            ? "bg-gradient-to-br from-purple-500 to-pink-600"
                            : "bg-gray-100"
                        }`}
                      >
                        <Building2
                          className={`w-6 h-6 ${
                            customerType === "COMPANY"
                              ? "text-white"
                              : "text-gray-400"
                          }`}
                        />
                      </div>
                      <div className="text-left">
                        <p
                          className={`font-bold ${
                            customerType === "COMPANY"
                              ? "text-purple-700"
                              : "text-gray-600"
                          }`}
                        >
                          Công ty
                        </p>
                        <p className="text-xs text-gray-500">
                          Khách hàng doanh nghiệp
                        </p>
                      </div>
                    </div>
                    {customerType === "COMPANY" && (
                      <CheckCircle className="absolute top-3 right-3 w-5 h-5 text-purple-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-indigo-50 rounded-2xl p-6 space-y-5">
                {/* Full Name */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                    <User className="w-4 h-4 text-indigo-600" />
                    {customerType === "COMPANY" ? "Tên công ty" : "Họ và tên"}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={
                      customerType === "COMPANY"
                        ? "Nhập tên công ty..."
                        : "Nhập họ và tên..."
                    }
                    className={`input-focus w-full px-5 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white text-gray-700 font-medium hover:border-indigo-300`}
                  />
                </div>

                {/* Email & Phone Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Email */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                      <Mail className="w-4 h-4 text-blue-600" />
                      Email
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@email.com"
                      className={`input-focus w-full px-5 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-gray-700 font-medium hover:border-blue-300`}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                      <Phone className="w-4 h-4 text-green-600" />
                      Số điện thoại
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0901234567"
                      className={`input-focus w-full px-5 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white text-gray-700 font-medium hover:border-green-300`}
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                    <MapPin className="w-4 h-4 text-orange-600" />
                    Địa chỉ
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Nhập địa chỉ chi tiết..."
                    rows={3}
                    className={`input-focus w-full px-5 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white text-gray-700 font-medium hover:border-orange-300 resize-none`}
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                    <Calendar className="w-4 h-4 text-pink-600" />
                    Ngày sinh / Ngày thành lập
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    
                    className={`input-focus w-full px-5 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all bg-white text-gray-700 font-medium hover:border-pink-300`}
                  />
                </div>
              </div>

              {/* Info Box */}
              <div className="mt-6 p-4 bg-indigo-50 border-l-4 border-indigo-500 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="bg-indigo-100 p-2 rounded-lg">
                    <UserPlus className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-indigo-900 mb-1">Lưu ý</h4>
                    <p className="text-sm text-indigo-700">
                      Vui lòng kiểm tra kỹ thông tin trước khi tạo. Thông tin
                      khách hàng sẽ được lưu vào hệ thống.
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t-2 border-gray-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all font-semibold hover:scale-105 hover:shadow-md"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="group px-8 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-xl hover:shadow-2xl transition-all font-bold flex items-center gap-2 hover:scale-105 shadow-lg shadow-indigo-500/50"
                >
                  <CheckCircle className="w-5 h-5 group-hover:animate-bounce" />
                  Tạo khách hàng
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateFormCustomer;
