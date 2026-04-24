import React, { useState } from "react";
import {
  X,
  Car,
  DollarSign,
  Package,
  Battery,
  Navigation,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface CarFormData {
  model: string;
  price: string;
  stock: string;
  battery: string;
  range: string;
  status: string;
}

interface CarFormErrors {
  model?: string;
  price?: string;
  stock?: string;
  battery?: string;
  range?: string;
}

export default function AddCarForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<CarFormData>({
    model: "",
    price: "",
    stock: "",
    battery: "",
    range: "",
    status: "Còn hàng"
  });
  const [errors, setErrors] = useState<CarFormErrors>({});

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: CarFormErrors = {};

    if (!formData.model.trim()) {
      newErrors.model = "Vui lòng nhập tên model xe";
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "Vui lòng nhập giá hợp lệ";
    }

    if (!formData.stock || parseInt(formData.stock) < 0) {
      newErrors.stock = "Vui lòng nhập số lượng hợp lệ";
    }

    if (!formData.battery.trim()) {
      newErrors.battery = "Vui lòng nhập dung lượng pin";
    }

    if (!formData.range || parseFloat(formData.range) <= 0) {
      newErrors.range = "Vui lòng nhập quãng đường hợp lệ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof CarFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Handle submit
  const handleSubmit = () => {
    if (validateForm()) {
      // Simulate API call
      console.log("Submitting:", formData);

      // Show success message
      setShowSuccess(true);

      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          model: "",
          price: "",
          stock: "",
          battery: "",
          range: "",
          status: "Còn hàng"
        });
        setIsOpen(false);
        setShowSuccess(false);
      }, 2000);
    }
  };

  // Reset form when closing
  const handleClose = () => {
    setIsOpen(false);
    setFormData({
      model: "",
      price: "",
      stock: "",
      battery: "",
      range: "",
      status: "Còn hàng"
    });
    setErrors({});
    setShowSuccess(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
      >
        <Car className="w-5 h-5" />
        Thêm xe mới
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                  <Car className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Thêm Xe Điện Mới</h2>
                  <p className="text-blue-100 text-sm">
                    Điền thông tin xe VinFast
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Success Message */}
            {showSuccess && (
              <div className="mx-6 mt-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 animate-slideDown">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-green-900">Thành công!</h4>
                  <p className="text-sm text-green-700">
                    Xe mới đã được thêm vào hệ thống.
                  </p>
                </div>
              </div>
            )}

            {/* Form Content */}
            <div className="p-6 space-y-6">
              {/* Model Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tên Model <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    placeholder="VinFast VF8"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.model ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.model && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.model}
                  </p>
                )}
              </div>

              {/* Price and Stock Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Price */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Giá bán (USD) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="45000"
                      min="0"
                      step="1000"
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        errors.price ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.price}
                    </p>
                  )}
                </div>

                {/* Stock */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tồn kho <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      placeholder="12"
                      min="0"
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        errors.stock ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>
                  {errors.stock && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.stock}
                    </p>
                  )}
                </div>
              </div>

              {/* Battery and Range Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Battery */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Dung lượng pin <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Battery className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="battery"
                      value={formData.battery}
                      onChange={handleChange}
                      placeholder="87.7 kWh"
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        errors.battery ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>
                  {errors.battery && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.battery}
                    </p>
                  )}
                </div>

                {/* Range */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Quãng đường (km) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      name="range"
                      value={formData.range}
                      onChange={handleChange}
                      placeholder="446"
                      min="0"
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        errors.range ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>
                  {errors.range && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.range}
                    </p>
                  )}
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Trạng thái
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="Còn hàng">Còn hàng</option>
                  <option value="Sắp hết">Sắp hết</option>
                  <option value="Hết hàng">Hết hàng</option>
                </select>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Lưu ý
                </h4>
                <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                  <li>Các trường có dấu (*) là bắt buộc</li>
                  <li>Giá bán tính bằng USD</li>
                  <li>Quãng đường tính bằng km</li>
                  <li>Dung lượng pin ghi theo định dạng: XX.X kWh</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={showSuccess}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {showSuccess ? "Đang lưu..." : "Thêm xe"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from { 
            opacity: 0;
            transform: translateY(-10px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
