"use client";

import React from "react";
import { FaTimes } from "react-icons/fa";

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AddDealerForm({ isOpen, onClose }: Props) {
  const [notificationOpen, setNotificationOpen] = React.useState(false);
  const [notificationMessage, setNotificationMessage] = React.useState("");
  const [notificationSeverity, setNotificationSeverity] = React.useState<
    "success" | "error"
  >("success");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/add-dealer", {
        method: "POST",
        body: formData
      });

      if (!res.ok) throw new Error("Đăng ký thất bại");

      const data = await res.json();
      setNotificationMessage(data.message || "Đăng ký thành công!");
      setNotificationSeverity("success");
      setNotificationOpen(true);
      e.currentTarget.reset();

      // Close modal after success (if onClose is provided)
      setTimeout(() => {
        if (onClose) onClose();
      }, 2000);
    } catch (error: unknown) {
      let message = "Đăng ký thất bại";
      if (error instanceof Error) message = error.message;
      setNotificationMessage(message);
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  // If not open, return null
  if (!isOpen) return null;

  return (
    <>
      {/* Modal Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white relative w-full max-w-6xl max-h-[95vh] overflow-auto">
          {/* Modal Header */}
          <div className="sticky top-0 bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 flex items-center justify-between z-10">
            <div>
              <h2 className="text-2xl font-bold">🌱 Đăng ký Đại lý Xe điện</h2>
              <p className="text-green-100 text-sm mt-1">
                Điền thông tin để đăng ký đại lý
              </p>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all duration-200"
              >
                <FaTimes size={24} />
              </button>
            )}
          </div>

          {/* Modal Content */}
          <div className="">
            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Thông tin cơ bản */}
                <div className="bg-green-50 p-4 rounded-xl">
                  <h2 className="text-xl font-semibold text-green-800 mb-4">
                    📋 Thông tin cơ bản
                  </h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Tên đại lý */}
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-green-700 mb-2">
                        Tên Đại lý <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="dealerName"
                        placeholder="VD: Đại lý VF8 Sài Gòn"
                        required
                        className="p-3 rounded-xl border border-green-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                      />
                    </div>

                    {/* Mã số thuế */}
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-green-700 mb-2">
                        Mã số thuế <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="taxCode"
                        placeholder="VD: 0123456789"
                        required
                        className="p-3 rounded-xl border border-green-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                      />
                    </div>

                    {/* Loại hình kinh doanh */}
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-green-700 mb-2">
                        Loại hình kinh doanh{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="businessType"
                        required
                        className="p-3 rounded-xl border border-green-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                      >
                        <option value="">-- Chọn loại hình --</option>
                        <option value="personal">Cá nhân</option>
                        <option value="company">Công ty TNHH</option>
                        <option value="corporation">Công ty Cổ phần</option>
                        <option value="partnership">Hợp danh</option>
                      </select>
                    </div>

                    {/* Năm thành lập */}
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-green-700 mb-2">
                        Năm thành lập
                      </label>
                      <input
                        type="number"
                        name="establishedYear"
                        placeholder="VD: 2020"
                        min="1900"
                        max="2025"
                        className="p-3 rounded-xl border border-green-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Thông tin liên hệ */}
                <div className="bg-blue-50 p-4 rounded-xl">
                  <h2 className="text-xl font-semibold text-green-800 mb-4">
                    📞 Thông tin liên hệ
                  </h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Email */}
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-green-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="vd@example.com"
                        required
                        className="p-3 rounded-xl border border-green-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                      />
                    </div>

                    {/* Số điện thoại */}
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-green-700 mb-2">
                        Số điện thoại <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="VD: 0901234567"
                        required
                        className="p-3 rounded-xl border border-green-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                      />
                    </div>

                    {/* Hotline */}
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-green-700 mb-2">
                        Hotline
                      </label>
                      <input
                        type="tel"
                        name="hotline"
                        placeholder="VD: 1900xxxx"
                        className="p-3 rounded-xl border border-green-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                      />
                    </div>

                    {/* Website */}
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-green-700 mb-2">
                        Website
                      </label>
                      <input
                        type="url"
                        name="website"
                        placeholder="https://example.com"
                        className="p-3 rounded-xl border border-green-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Địa chỉ */}
                <div className="bg-amber-50 p-4 rounded-xl">
                  <h2 className="text-xl font-semibold text-green-800 mb-4">
                    📍 Địa chỉ
                  </h2>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    {/* Tỉnh/Thành phố */}
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-green-700 mb-2">
                        Tỉnh/Thành phố <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="province"
                        required
                        className="p-3 rounded-xl border border-green-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                      >
                        <option value="">-- Chọn Tỉnh/TP --</option>
                        <option value="hochiminh">TP. Hồ Chí Minh</option>
                        <option value="hanoi">Hà Nội</option>
                        <option value="danang">Đà Nẵng</option>
                        <option value="cantho">Cần Thơ</option>
                        <option value="haiphong">Hải Phòng</option>
                      </select>
                    </div>

                    {/* Quận/Huyện */}
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-green-700 mb-2">
                        Quận/Huyện <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="district"
                        placeholder="VD: Quận 1"
                        required
                        className="p-3 rounded-xl border border-green-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                      />
                    </div>

                    {/* Phường/Xã */}
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-green-700 mb-2">
                        Phường/Xã
                      </label>
                      <input
                        type="text"
                        name="ward"
                        placeholder="VD: Phường Bến Nghé"
                        className="p-3 rounded-xl border border-green-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                      />
                    </div>

                    {/* Số nhà/Đường */}
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-green-700 mb-2">
                        Số nhà, Đường
                      </label>
                      <input
                        type="text"
                        name="street"
                        placeholder="VD: 123 Nguyễn Huệ"
                        className="p-3 rounded-xl border border-green-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                      />
                    </div>
                  </div>

                  {/* Địa chỉ chi tiết */}
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-green-700 mb-2">
                      Địa chỉ chi tiết <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="address"
                      rows={3}
                      placeholder="Nhập địa chỉ đầy đủ của showroom/đại lý"
                      required
                      className="p-3 rounded-xl border border-green-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition resize-none"
                    />
                  </div>
                </div>

                {/* Thông tin kinh doanh */}
                <div className="bg-purple-50 p-4 rounded-xl">
                  <h2 className="text-xl font-semibold text-green-800 mb-4">
                    💼 Thông tin kinh doanh
                  </h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Diện tích showroom */}
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-green-700 mb-2">
                        Diện tích showroom (m²)
                      </label>
                      <input
                        type="number"
                        name="showroomArea"
                        placeholder="VD: 500"
                        min="0"
                        className="p-3 rounded-xl border border-green-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                      />
                    </div>

                    {/* Số lượng nhân viên */}
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-green-700 mb-2">
                        Số lượng nhân viên
                      </label>
                      <input
                        type="number"
                        name="employeeCount"
                        placeholder="VD: 10"
                        min="0"
                        className="p-3 rounded-xl border border-green-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                      />
                    </div>

                    {/* Dòng xe kinh doanh */}
                    <div className="flex flex-col md:col-span-2">
                      <label className="text-sm font-medium text-green-700 mb-2">
                        Dòng xe quan tâm kinh doanh
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-3 rounded-xl border border-green-300 bg-white">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            name="carModels"
                            value="VF3"
                            className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-400"
                          />
                          <span className="text-sm">VF 3</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            name="carModels"
                            value="VF5"
                            className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-400"
                          />
                          <span className="text-sm">VF 5</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            name="carModels"
                            value="VF6"
                            className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-400"
                          />
                          <span className="text-sm">VF 6</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            name="carModels"
                            value="VF7"
                            className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-400"
                          />
                          <span className="text-sm">VF 7</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            name="carModels"
                            value="VF8"
                            className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-400"
                          />
                          <span className="text-sm">VF 8</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            name="carModels"
                            value="VF9"
                            className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-400"
                          />
                          <span className="text-sm">VF 9</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            name="carModels"
                            value="VFe34"
                            className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-400"
                          />
                          <span className="text-sm">VF e34</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            name="carModels"
                            value="other"
                            className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-400"
                          />
                          <span className="text-sm">Khác</span>
                        </label>
                      </div>
                    </div>

                    {/* Kinh nghiệm */}
                    <div className="flex flex-col md:col-span-2">
                      <label className="text-sm font-medium text-green-700 mb-2">
                        Kinh nghiệm trong lĩnh vực ô tô
                      </label>
                      <textarea
                        name="experience"
                        rows={3}
                        placeholder="Mô tả kinh nghiệm và thành tích của bạn trong lĩnh vực kinh doanh ô tô..."
                        className="p-3 rounded-xl border border-green-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Ghi chú */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-green-700 mb-2">
                    Ghi chú thêm
                  </label>
                  <textarea
                    name="notes"
                    rows={3}
                    placeholder="Thông tin bổ sung (nếu có)..."
                    className="p-3 rounded-xl border border-green-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-green-600 text-white font-semibold text-lg shadow-lg"
                >
                  ✅ Đăng ký ngay
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Notification - Outside Modal */}
      {notificationOpen && (
        <div className="fixed top-4 right-4 z-[60] animate-slide-in-right">
          <div
            className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl min-w-[300px] ${
              notificationSeverity === "success"
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            <span className="text-2xl">
              {notificationSeverity === "success" ? "✓" : "✕"}
            </span>
            <span className="font-bold flex-1">{notificationMessage}</span>
            <button
              onClick={() => setNotificationOpen(false)}
              className="text-white hover:text-gray-200 text-xl font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
