"use client";
import React, { useState } from "react";
import {
  Car,
  Hash,
  Send,
  Package,
  CheckCircle2,
  Info,
  TrendingUp
} from "lucide-react";

const RequestCarPage = () => {
  const [carModel, setCarModel] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Show success message
    setShowSuccess(true);

    // Reset form
    setCarModel("");
    setQuantity(1);

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-3xl p-8 shadow-2xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/30 shadow-lg">
            <Car size={32} className="text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Đặt Xe Từ Hãng
            </h1>
            <p className="text-green-100 text-lg">
              Gửi yêu cầu đặt hàng xe về kho
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium mb-1">
                Đơn đặt hàng
              </p>
              <p className="text-3xl font-bold text-blue-600">12</p>
            </div>
            <div className="bg-blue-500 p-3 rounded-xl">
              <Package className="text-white" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium mb-1">Đang chờ</p>
              <p className="text-3xl font-bold text-green-600">5</p>
            </div>
            <div className="bg-green-500 p-3 rounded-xl">
              <TrendingUp className="text-white" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium mb-1">Đã giao</p>
              <p className="text-3xl font-bold text-purple-600">7</p>
            </div>
            <div className="bg-purple-500 p-3 rounded-xl">
              <CheckCircle2 className="text-white" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
          >
            {/* Form Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                  <Send size={24} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Tạo yêu cầu mới
                </h2>
              </div>
            </div>

            {/* Form Body */}
            <div className="p-6 space-y-6">
              {/* Car Model Input */}
              <div className="flex flex-col">
                <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <Car size={16} className="text-green-600" />
                  Mẫu xe <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={carModel}
                  onChange={(e) => setCarModel(e.target.value)}
                  placeholder="VD: VinFast VF8, VF9..."
                  required
                  className="p-4 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-green-500 transition-all"
                />
                <p className="text-xs text-gray-500 mt-2">
                  🚗 Nhập chính xác tên mẫu xe cần đặt
                </p>
              </div>

              {/* Quantity Input */}
              <div className="flex flex-col">
                <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <Hash size={16} className="text-emerald-600" />
                  Số lượng <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={quantity}
                  min={1}
                  max={100}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  required
                  className="p-4 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-emerald-500 transition-all"
                />
                <p className="text-xs text-gray-500 mt-2">
                  📦 Số lượng xe cần đặt (tối thiểu 1, tối đa 100)
                </p>
              </div>

              {/* Summary */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 border-blue-600 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Info
                    size={20}
                    className="text-blue-600 flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <p className="text-sm font-bold text-blue-900 mb-1">
                      Tóm tắt đơn hàng
                    </p>
                    <p className="text-sm text-blue-800">
                      {carModel || "[Chưa chọn mẫu xe]"} - Số lượng: {quantity}{" "}
                      xe
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!carModel}
                className="w-full group px-8 py-4 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold shadow-xl hover:shadow-2xl hover:scale-[1.02] disabled:hover:scale-100 transform transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Send
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
                <span>Gửi yêu cầu đặt hàng</span>
              </button>
            </div>
          </form>
        </div>

        {/* Side Info */}
        <div className="space-y-6">
          {/* Guidelines */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Info size={20} className="text-blue-600" />
              <h3 className="font-bold text-gray-900">Hướng dẫn</h3>
            </div>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle2
                  size={16}
                  className="text-green-600 flex-shrink-0 mt-0.5"
                />
                <span>Kiểm tra kỹ tên mẫu xe trước khi gửi</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2
                  size={16}
                  className="text-green-600 flex-shrink-0 mt-0.5"
                />
                <span>Số lượng nên phù hợp với nhu cầu thực tế</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2
                  size={16}
                  className="text-green-600 flex-shrink-0 mt-0.5"
                />
                <span>Thời gian xử lý: 2-3 ngày làm việc</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2
                  size={16}
                  className="text-green-600 flex-shrink-0 mt-0.5"
                />
                <span>Bạn sẽ nhận thông báo khi đơn được duyệt</span>
              </li>
            </ul>
          </div>

          {/* Popular Models */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Car size={20} className="text-purple-600" />
              <h3 className="font-bold text-gray-900">Mẫu xe phổ biến</h3>
            </div>
            <div className="space-y-2">
              {[
                "VinFast VF8",
                "VinFast VF9",
                "VinFast VF7",
                "VinFast VFe34"
              ].map((model) => (
                <button
                  key={model}
                  type="button"
                  onClick={() => setCarModel(model)}
                  className="w-full text-left px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-xl border border-purple-200 transition-all font-medium text-gray-700"
                >
                  {model}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-right duration-300">
          <div className="min-w-[360px] rounded-2xl shadow-2xl border-2 bg-gradient-to-r from-green-500 to-emerald-500 border-green-600 p-6">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <CheckCircle2 size={24} className="text-white" />
              </div>
              <div>
                <p className="text-sm text-white/90 font-medium mb-1">
                  Thành công
                </p>
                <p className="text-white font-bold">
                  Đã gửi yêu cầu đặt {quantity} xe {carModel}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestCarPage;
