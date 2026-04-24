"use client";

import { FormEvent, useState } from "react";

export default function AddCarForm() {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState<
    "success" | "error"
  >("success");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/add-car", {
        method: "POST",
        body: formData
      });

      if (!res.ok) throw new Error("Thêm xe thất bại");

      const data = await res.json();
      setNotificationMessage(data.message || "Thêm xe thành công!");
      setNotificationSeverity("success");
      setNotificationOpen(true);

      setTimeout(() => e.currentTarget.reset(), 500);
    } catch (error: unknown) {
      let message = "Thêm xe thất bại";
      if (error instanceof Error) message = error.message;
      setNotificationMessage(message);
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-emerald-700 text-center">
          🚗 Thêm Xe Điện Mới
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Thông tin cơ bản */}
          <div className="bg-emerald-50 p-5 rounded-xl">
            <h2 className="text-xl font-semibold text-emerald-800 mb-4">
              📋 Thông tin cơ bản
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Mẫu xe */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-emerald-700 mb-2">
                  Mẫu xe <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="model"
                  placeholder="VD: VF8, VF9"
                  required
                  className="p-3 rounded-xl border border-emerald-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                />
              </div>

              {/* Dòng xe */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-emerald-700 mb-2">
                  Dòng xe <span className="text-red-500">*</span>
                </label>
                <select
                  name="carLine"
                  required
                  className="p-3 rounded-xl border border-emerald-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                >
                  <option value="">-- Chọn dòng xe --</option>
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="crossover">Crossover</option>
                  <option value="hatchback">Hatchback</option>
                  <option value="mpv">MPV</option>
                </select>
              </div>

              {/* Phiên bản */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-emerald-700 mb-2">
                  Phiên bản <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="version"
                  placeholder="VD: Standard, Plus, Eco"
                  required
                  className="p-3 rounded-xl border border-emerald-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                />
              </div>

              {/* Năm sản xuất */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-emerald-700 mb-2">
                  Năm sản xuất <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="year"
                  placeholder="VD: 2025"
                  min="2020"
                  max="2030"
                  required
                  className="p-3 rounded-xl border border-emerald-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                />
              </div>

              {/* Màu sắc */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-emerald-700 mb-2">
                  Màu sắc có sẵn
                </label>
                <input
                  type="text"
                  name="colors"
                  placeholder="VD: Trắng, Đen, Xanh, Đỏ"
                  className="p-3 rounded-xl border border-emerald-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                />
              </div>

              {/* Trạng thái */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-emerald-700 mb-2">
                  Trạng thái <span className="text-red-500">*</span>
                </label>
                <select
                  name="status"
                  required
                  className="p-3 rounded-xl border border-emerald-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                >
                  <option value="available">Có sẵn</option>
                  <option value="preorder">Đặt trước</option>
                  <option value="comingsoon">Sắp ra mắt</option>
                  <option value="soldout">Hết hàng</option>
                </select>
              </div>
            </div>
          </div>

          {/* Giá cả */}
          <div className="bg-blue-50 p-5 rounded-xl">
            <h2 className="text-xl font-semibold text-emerald-800 mb-4">
              💰 Thông tin giá
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
              {/* Giá niêm yết */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-emerald-700 mb-2">
                  Giá niêm yết (VNĐ) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="VD: 850000000"
                  required
                  className="p-3 rounded-xl border border-emerald-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                />
              </div>

              {/* Giá khuyến mãi */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-emerald-700 mb-2">
                  Giá khuyến mãi (VNĐ)
                </label>
                <input
                  type="number"
                  name="discountPrice"
                  placeholder="VD: 800000000"
                  className="p-3 rounded-xl border border-emerald-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                />
              </div>

              {/* Thuế VAT */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-emerald-700 mb-2">
                  Thuế VAT (%)
                </label>
                <input
                  type="number"
                  name="vat"
                  placeholder="VD: 10"
                  min="0"
                  max="100"
                  className="p-3 rounded-xl border border-emerald-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                />
              </div>
            </div>
          </div>

          {/* Thông số kỹ thuật */}
          <div className="bg-purple-50 p-5 rounded-xl">
            <h2 className="text-xl font-semibold text-emerald-800 mb-4">
              ⚙️ Thông số kỹ thuật
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
              {/* Dung lượng pin */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-emerald-700 mb-2">
                  Dung lượng pin (kWh)
                </label>
                <input
                  type="number"
                  name="batteryCapacity"
                  placeholder="VD: 87.7"
                  step="0.1"
                  className="p-3 rounded-xl border border-emerald-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                />
              </div>

              {/* Quãng đường di chuyển */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-emerald-700 mb-2">
                  Quãng đường (km)
                </label>
                <input
                  type="number"
                  name="range"
                  placeholder="VD: 471"
                  className="p-3 rounded-xl border border-emerald-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                />
              </div>

              {/* Công suất động cơ */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-emerald-700 mb-2">
                  Công suất (HP)
                </label>
                <input
                  type="number"
                  name="power"
                  placeholder="VD: 402"
                  className="p-3 rounded-xl border border-emerald-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                />
              </div>

              {/* Mô-men xoắn */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-emerald-700 mb-2">
                  Mô-men xoắn (Nm)
                </label>
                <input
                  type="number"
                  name="torque"
                  placeholder="VD: 620"
                  className="p-3 rounded-xl border border-emerald-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                />
              </div>

              {/* Tốc độ tối đa */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-emerald-700 mb-2">
                  Tốc độ tối đa (km/h)
                </label>
                <input
                  type="number"
                  name="topSpeed"
                  placeholder="VD: 200"
                  className="p-3 rounded-xl border border-emerald-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                />
              </div>

              {/* Thời gian tăng tốc */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-emerald-700 mb-2">
                  Tăng tốc 0-100km/h (s)
                </label>
                <input
                  type="number"
                  name="acceleration"
                  placeholder="VD: 5.5"
                  step="0.1"
                  className="p-3 rounded-xl border border-emerald-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                />
              </div>

              {/* Loại sạc */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-emerald-700 mb-2">
                  Loại sạc hỗ trợ
                </label>
                <input
                  type="text"
                  name="chargingType"
                  placeholder="VD: AC, DC Fast Charging"
                  className="p-3 rounded-xl border border-emerald-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                />
              </div>

              {/* Thời gian sạc */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-emerald-700 mb-2">
                  Thời gian sạc (phút)
                </label>
                <input
                  type="text"
                  name="chargingTime"
                  placeholder="VD: 30 phút (DC)"
                  className="p-3 rounded-xl border border-emerald-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                />
              </div>

              {/* Hệ dẫn động */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-emerald-700 mb-2">
                  Hệ dẫn động
                </label>
                <select
                  name="driveType"
                  className="p-3 rounded-xl border border-emerald-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                >
                  <option value="">-- Chọn --</option>
                  <option value="fwd">FWD - Cầu trước</option>
                  <option value="rwd">RWD - Cầu sau</option>
                  <option value="awd">AWD - 4 bánh</option>
                </select>
              </div>
            </div>
          </div>

          {/* Kích thước & Trọng lượng */}
          <div className="bg-amber-50 p-5 rounded-xl">
            <h2 className="text-xl font-semibold text-emerald-800 mb-4">
              📏 Kích thước & Trọng lượng
            </h2>

            <div className="grid md:grid-cols-4 gap-4">
              {/* Chiều dài */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-emerald-700 mb-2">
                  Chiều dài (mm)
                </label>
                <input
                  type="number"
                  name="length"
                  placeholder="VD: 4750"
                  className="p-3 rounded-xl border border-emerald-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                />
              </div>

              {/* Chiều rộng */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-emerald-700 mb-2">
                  Chiều rộng (mm)
                </label>
                <input
                  type="number"
                  name="width"
                  placeholder="VD: 1934"
                  className="p-3 rounded-xl border border-emerald-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                />
              </div>

              {/* Chiều cao */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-emerald-700 mb-2">
                  Chiều cao (mm)
                </label>
                <input
                  type="number"
                  name="height"
                  placeholder="VD: 1667"
                  className="p-3 rounded-xl border border-emerald-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                />
              </div>

              {/* Chiều dài cơ sở */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-emerald-700 mb-2">
                  Chiều dài cơ sở (mm)
                </label>
                <input
                  type="number"
                  name="wheelbase"
                  placeholder="VD: 2950"
                  className="p-3 rounded-xl border border-emerald-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                />
              </div>

              {/* Trọng lượng */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-emerald-700 mb-2">
                  Trọng lượng (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  placeholder="VD: 2100"
                  className="p-3 rounded-xl border border-emerald-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                />
              </div>

              {/* Số chỗ ngồi */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-emerald-700 mb-2">
                  Số chỗ ngồi
                </label>
                <select
                  name="seats"
                  className="p-3 rounded-xl border border-emerald-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                >
                  <option value="">-- Chọn --</option>
                  <option value="2">2 chỗ</option>
                  <option value="4">4 chỗ</option>
                  <option value="5">5 chỗ</option>
                  <option value="7">7 chỗ</option>
                  <option value="9">9 chỗ</option>
                </select>
              </div>

              {/* Dung tích cốp */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-emerald-700 mb-2">
                  Dung tích cốp (L)
                </label>
                <input
                  type="number"
                  name="trunkCapacity"
                  placeholder="VD: 376"
                  className="p-3 rounded-xl border border-emerald-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                />
              </div>

              {/* Khoảng sáng gầm */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-emerald-700 mb-2">
                  Khoảng sáng gầm (mm)
                </label>
                <input
                  type="number"
                  name="groundClearance"
                  placeholder="VD: 175"
                  className="p-3 rounded-xl border border-emerald-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                />
              </div>
            </div>
          </div>

          {/* Tính năng nổi bật */}
          <div className="bg-rose-50 p-5 rounded-xl">
            <h2 className="text-xl font-semibold text-emerald-800 mb-4">
              ✨ Tính năng nổi bật
            </h2>

            <div className="space-y-4">
              {/* Tính năng an toàn */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-emerald-700 mb-2">
                  Tính năng an toàn
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-3 rounded-xl border border-emerald-300 bg-white">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="safetyFeatures"
                      value="abs"
                      className="w-4 h-4 text-emerald-600 rounded"
                    />
                    <span className="text-sm">ABS</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="safetyFeatures"
                      value="ebd"
                      className="w-4 h-4 text-emerald-600 rounded"
                    />
                    <span className="text-sm">EBD</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="safetyFeatures"
                      value="esc"
                      className="w-4 h-4 text-emerald-600 rounded"
                    />
                    <span className="text-sm">ESC</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="safetyFeatures"
                      value="airbags"
                      className="w-4 h-4 text-emerald-600 rounded"
                    />
                    <span className="text-sm">Túi khí</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="safetyFeatures"
                      value="tpms"
                      className="w-4 h-4 text-emerald-600 rounded"
                    />
                    <span className="text-sm">TPMS</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="safetyFeatures"
                      value="adas"
                      className="w-4 h-4 text-emerald-600 rounded"
                    />
                    <span className="text-sm">ADAS</span>
                  </label>
                </div>
              </div>

              {/* Tính năng tiện nghi */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-emerald-700 mb-2">
                  Tính năng tiện nghi
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-3 rounded-xl border border-emerald-300 bg-white">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="comfortFeatures"
                      value="cruise"
                      className="w-4 h-4 text-emerald-600 rounded"
                    />
                    <span className="text-sm">Cruise Control</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="comfortFeatures"
                      value="parking"
                      className="w-4 h-4 text-emerald-600 rounded"
                    />
                    <span className="text-sm">Tự đỗ xe</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="comfortFeatures"
                      value="camera360"
                      className="w-4 h-4 text-emerald-600 rounded"
                    />
                    <span className="text-sm">Camera 360</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="comfortFeatures"
                      value="sunroof"
                      className="w-4 h-4 text-emerald-600 rounded"
                    />
                    <span className="text-sm">Cửa sổ trời</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="comfortFeatures"
                      value="leather"
                      className="w-4 h-4 text-emerald-600 rounded"
                    />
                    <span className="text-sm">Ghế da</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="comfortFeatures"
                      value="wireless"
                      className="w-4 h-4 text-emerald-600 rounded"
                    />
                    <span className="text-sm">Sạc không dây</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Mô tả và hình ảnh */}
          <div className="bg-indigo-50 p-5 rounded-xl">
            <h2 className="text-xl font-semibold text-emerald-800 mb-4">
              📝 Mô tả & Hình ảnh
            </h2>

            <div className="space-y-4">
              {/* Mô tả ngắn */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-emerald-700 mb-2">
                  Mô tả ngắn
                </label>
                <input
                  type="text"
                  name="shortDescription"
                  placeholder="VD: SUV điện cao cấp với công nghệ tiên tiến"
                  className="p-3 rounded-xl border border-emerald-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                />
              </div>

              {/* Mô tả chi tiết */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-emerald-700 mb-2">
                  Mô tả chi tiết
                </label>
                <textarea
                  name="description"
                  rows={4}
                  placeholder="Nhập mô tả chi tiết về thiết kế, công nghệ, trải nghiệm lái xe..."
                  className="p-3 rounded-xl border border-emerald-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition resize-none"
                />
              </div>

              {/* Hình ảnh chính */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-emerald-700 mb-2">
                  Hình ảnh chính (Thumbnail)
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="p-2 rounded-xl border border-emerald-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>

              {/* Gallery hình ảnh */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-emerald-700 mb-2">
                  Gallery hình ảnh (nhiều ảnh)
                </label>
                <input
                  type="file"
                  name="gallery"
                  accept="image/*"
                  multiple
                  className="p-2 rounded-xl border border-emerald-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Có thể chọn nhiều ảnh cùng lúc
                </p>
              </div>

              {/* Video URL */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-emerald-700 mb-2">
                  Video giới thiệu (YouTube URL)
                </label>
                <input
                  type="url"
                  name="videoUrl"
                  placeholder="https://youtube.com/watch?v=..."
                  className="p-3 rounded-xl border border-emerald-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                />
              </div>
            </div>
          </div>

          {/* Thông tin kho và bảo hành */}
          <div className="bg-teal-50 p-5 rounded-xl">
            <h2 className="text-xl font-semibold text-emerald-800 mb-4">
              📦 Kho & Bảo hành
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
              {/* Số lượng trong kho */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-emerald-700 mb-2">
                  Số lượng trong kho
                </label>
                <input
                  type="number"
                  name="stock"
                  placeholder="VD: 50"
                  min="0"
                  className="p-3 rounded-xl border border-emerald-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                />
              </div>

              {/* Mã SKU */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-emerald-700 mb-2">
                  Mã SKU
                </label>
                <input
                  type="text"
                  name="sku"
                  placeholder="VD: VF8-ECO-2025"
                  className="p-3 rounded-xl border border-emerald-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                />
              </div>

              {/* Thời gian giao xe */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-emerald-700 mb-2">
                  Thời gian giao xe (ngày)
                </label>
                <input
                  type="number"
                  name="deliveryTime"
                  placeholder="VD: 30"
                  min="0"
                  className="p-3 rounded-xl border border-emerald-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                />
              </div>

              {/* Bảo hành */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-emerald-700 mb-2">
                  Bảo hành xe (năm)
                </label>
                <input
                  type="number"
                  name="warrantyYears"
                  placeholder="VD: 10"
                  min="0"
                  className="p-3 rounded-xl border border-emerald-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                />
              </div>

              {/* Bảo hành pin */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-emerald-700 mb-2">
                  Bảo hành pin (năm)
                </label>
                <input
                  type="number"
                  name="batteryWarranty"
                  placeholder="VD: 10"
                  min="0"
                  className="p-3 rounded-xl border border-emerald-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                />
              </div>

              {/* Xuất xứ */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-emerald-700 mb-2">
                  Xuất xứ
                </label>
                <input
                  type="text"
                  name="origin"
                  placeholder="VD: Việt Nam"
                  className="p-3 rounded-xl border border-emerald-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                />
              </div>
            </div>
          </div>

          {/* Ghi chú */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-emerald-700 mb-2">
              Ghi chú thêm
            </label>
            <textarea
              name="notes"
              rows={3}
              placeholder="Thông tin bổ sung khác (nếu có)..."
              className="p-3 rounded-xl border border-emerald-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition resize-none"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300"
          >
            ✅ Thêm xe ngay
          </button>
        </form>
      </div>

      {/* Custom Notification */}
      {notificationOpen && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div
            className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl min-w-[300px] ${
              notificationSeverity === "success"
                ? "bg-emerald-600 text-white"
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

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
