import React from "react";
import {
  X,
  Car,
  Hash,
  Calendar,
  Battery,
  Gauge,
  Users,
  Shield,
  Palette,
  CheckCircle,
  FileText
} from "lucide-react";
import { Models } from "@/services/vehicleModel/vehicle";
import Image from "next/image";
interface AddCarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCar: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  vin: string;
  setVin: (v: string) => void;
  mfgDate: string;
  setMfgDate: (v: string) => void;
  batteryKwh: number;
  setBatteryKwh: (v: number) => void;
  rangeKm: number;
  setRangeKm: (v: number) => void;
  seat: number;
  setSeat: (v: number) => void;
  version: string;
  setVersion: (v: string) => void;
  baseWarrantyMonths: number;
  setBaseWarrantyMonths: (v: number) => void;
  color: string;
  setColor: (v: string) => void;
  vehiclemodel: Models[];
  modelId: string;
  setModelId: (v: string) => void;
  imageFile: File | null;
  setImageFile: (v: File | null) => void;
}

export default function AddCarModal({
  isOpen,
  onClose,
  onAddCar,
  vin,
  setVin,
  mfgDate,
  setMfgDate,
  batteryKwh,
  setBatteryKwh,
  rangeKm,
  setRangeKm,
  seat,
  setSeat,
  baseWarrantyMonths,
  setBaseWarrantyMonths,
  color,
  setColor,
  modelId,
  setModelId,
  vehiclemodel,
  version,
  setVersion,
  imageFile,
  setImageFile
}: AddCarModalProps) {
  function validateCarForm({
    vin,
    mfgDate,
    batteryKwh,
    rangeKm,
    seat,
    baseWarrantyMonths,
    color,
    version,
    modelId
  }: {
    vin: string;
    mfgDate: string;
    batteryKwh: number;
    rangeKm: number;
    seat: number;
    baseWarrantyMonths: number;
    color: string;
    version: string;
    modelId: string;
  }) {
    const vinPattern = /^[A-Z0-9]{17}$/;
    if (!vinPattern.test(vin)) {
      alert("VIN phải đúng 17 ký tự và chỉ gồm chữ (A-Z) và số (0-9)");
      return false;
    }

    // 2. Ngày sản xuất: không được lớn hơn ngày hôm nay
    const today = new Date().toISOString().split("T")[0];
    if (!mfgDate || mfgDate > today) {
      alert("Ngày sản xuất không được lớn hơn ngày hiện tại");
      return false;
    }

    // 3. Battery KWh > 0
    if (batteryKwh <= 0) {
      alert("Dung lượng pin phải lớn hơn 0 kWh");
      return false;
    }

    // 4. Range Km > 0
    if (rangeKm <= 0) {
      alert("Quãng đường phải lớn hơn 0 km");
      return false;
    }

    // 5. Seats: 2-9
    if (seat < 2 || seat > 9) {
      alert("Số chỗ ngồi phải từ 2 đến 9");
      return false;
    }

    // 6. Base Warranty >= 0
    if (baseWarrantyMonths < 0) {
      alert("Bảo hành phải >= 0 tháng");
      return false;
    }

    // 7. Color & Version phải chọn
    if (!color || color === "--") {
      alert("Vui lòng chọn màu sắc");
      return false;
    }

    if (!version || version === "--") {
      alert("Vui lòng chọn phiên bản");
      return false;
    }

    // 8. Model phải chọn
    if (!modelId) {
      alert("Vui lòng chọn model xe");
      return false;
    }

    // Nếu tất cả đều hợp lệ
    return true;
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !validateCarForm({
        vin,
        mfgDate,
        batteryKwh,
        rangeKm,
        seat,
        baseWarrantyMonths,
        color,
        version,
        modelId
      })
    ) {
      return;
    }
    onAddCar(e);
  };
  // const handleGenerateVin = () => {
  //   if (!modelId) {
  //     alert("Vui lòng chọn model trước khi tạo VIN");
  //     return;
  //   }

  //   const response = generateVin(modelId);
  //   setVin(response);
  // };
  if (!isOpen) return null;
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
      {/* Modal Container */}
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-slideUp">
        {/* Header - Fixed */}
        <div className="flex-shrink-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
              <Car className="w-6 h-6" />
            </div>

            <div>
              <h2 className="text-2xl font-bold">Thêm Xe Mới</h2>
              <p className="text-blue-100 text-sm">
                Điền đầy đủ thông tin xe điện
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-6">
              {/* Thông tin cơ bản */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Car className="w-5 h-5 text-blue-600" />
                  Thông tin cơ bản
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Model <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        required
                        value={modelId || ""}
                        onChange={(e) => setModelId(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
                      >
                        <option value="" disabled>
                          -- Select Model --
                        </option>
                        {vehiclemodel.map((model) => (
                          <option key={model.id} value={model.id}>
                            {model.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {/* VIN */}
                  {/* VIN Field */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                      <Hash className="w-4 h-4 text-blue-600" />
                      VIN (Vehicle Identification Number)
                      <span className="text-red-500">*</span>
                    </label>

                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <Hash className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                      </div>

                      {/* ✅ UPDATE: Placeholder không gợi ý VF */}
                      <input
                        type="text"
                        required
                        placeholder="ABC12345678901234" // ← Không bắt đầu bằng VF
                        value={vin}
                        onChange={(e) => setVin(e.target.value.toUpperCase())} // ← Auto uppercase
                        maxLength={17} // ← Limit 17 chars
                        className="w-full pl-12 pr-32 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 hover:border-gray-300 transition-all duration-200 text-gray-900 placeholder:text-gray-400 bg-white shadow-sm uppercase" // ← Force uppercase display
                      />

                      {/* <button
                        type="button"
                        onClick={handleGenerateVin}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium px-4 py-2 rounded-lg text-sm shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 flex items-center gap-1.5"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                        Generate
                      </button> */}
                    </div>

                    {/* ✅ NEW: Real-time validation feedback */}
                    {/* {vin && (
                      <div
                        className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg ${
                          /^[A-Z0-9]{17}$/.test(vin)
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {/^[A-Z0-9]{17}$/.test(vin) ? (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            <span>VIN hợp lệ ({vin.length}/17 ký tự)</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-4 h-4" />
                            <span>
                              {vin.length < 17
                                ? `Cần thêm ${17 - vin.length} ký tự (${
                                    vin.length
                                  }/17)`
                                : `Quá dài! Chỉ cần 17 ký tự (${vin.length}/17)`}
                            </span>
                          </>
                        )}
                      </div>
                    )} */}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ngày sản xuất <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        required
                        value={mfgDate}
                        onChange={(e) => setMfgDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Price */}
                  {/* <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Giá bán (VND) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Banknote className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        required
                        min="0"
                        step="1000"
                        placeholder="45000"
                        value={price || ""}
                        onChange={e => setPrice(+e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div> */}
                </div>
              </div>

              {/* Thông số kỹ thuật */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Battery className="w-5 h-5 text-green-600" />
                  Thông số kỹ thuật
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Battery */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Dung lượng pin (kWh){" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Battery className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        required
                        min="0"
                        step="0.1"
                        placeholder="87.7"
                        value={batteryKwh || ""}
                        onChange={(e) => setBatteryKwh(+e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Range */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Quãng đường di chuyển/sạc{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Gauge className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        required
                        min="0"
                        placeholder="446"
                        value={rangeKm || ""}
                        onChange={(e) => setRangeKm(+e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Seats */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Số chỗ ngồi <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        required
                        min="2"
                        max="9"
                        placeholder="5"
                        value={seat || ""}
                        onChange={(e) => setSeat(+e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Thông tin bổ sung */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                  Thông tin bổ sung
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Warranty */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Bảo hành (tháng) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        required
                        min="0"
                        placeholder="36"
                        value={baseWarrantyMonths || ""}
                        onChange={(e) =>
                          setBaseWarrantyMonths(Number(e.target.value))
                        }
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <FileText className="w-4 h-4 text-purple-600" />
                      Hình ảnh Model
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full px-4 py-2 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-400 transition-all outline-none hover:border-gray-300"
                    />
                    {imageFile && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-600 mb-1">Xem trước:</p>
                        <div className="w-32 h-32 relative rounded-xl overflow-hidden border border-gray-300 shadow-sm">
                          <Image
                            src={URL.createObjectURL(imageFile)}
                            alt="Preview"
                            className="object-cover w-full h-full"
                            width={300}
                            height={300}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Color */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Màu sắc <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Palette className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        required
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
                      >
                        <option value="--">Chọn màu</option>
                        <option value="WHITE">Trắng</option>
                        <option value="BLACK">Đen</option>
                        <option value="BLUE">Xanh Dương</option>
                        <option value="RED">Đỏ</option>
                        <option value="SILVER">Bạc</option>
                        <option value="GREY">Xám</option>
                        <option value="GREEN">Xanh lá</option>
                        <option value="GOLDEN">Vàng kim</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phiên bản <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Palette className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        required
                        value={version}
                        onChange={(e) => setVersion(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
                      >
                        <option value="--">Chọn phiên bản</option>
                        <option value="PLUS">Plus</option>
                        <option value="ECO">Eco</option>
                        <option value="PREMIUM">Premium</option>
                      </select>
                    </div>
                  </div>
                  {/* Status */}

                  {/* Manufacturer ID */}
                  {/* <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ID Nhà sản xuất <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        required
                        value={manufacturerId || ""}
                        onChange={(e) =>
                          setManufacturerId(Number(e.target.value))
                        }
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
                      >
                        <option value="" disabled>
                          -- Select Manufacturer --
                        </option>
                        {manufacturers.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name} {item.country}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div> */}

                  {/* Model ID */}
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">
                      Lưu ý quan trọng
                    </h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>
                        • Các trường có dấu (
                        <span className="text-red-500">*</span>) là bắt buộc
                      </li>
                      <li>• VIN phải là mã duy nhất không trùng lặp</li>
                      <li>• Kiểm tra kỹ thông số kỹ thuật trước khi lưu</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons - Sticky */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-semibold"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-semibold shadow-lg hover:shadow-xl"
                >
                  Lưu xe mới
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

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

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        /* Custom scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 8px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}
