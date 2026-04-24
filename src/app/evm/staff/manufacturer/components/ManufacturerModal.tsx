import React from "react";

interface ManufacturerModalProps {
  code: string;
  setCode: (val: string) => void;
  name: string;
  setName: (val: string) => void;
  country: string;
  setCountry: (val: string) => void;
  errors: Record<string, string>;
  handleSubmit: () => void;
  onClose: () => void;
  editingId: number | null;
}

export const ManufacturerModal: React.FC<ManufacturerModalProps> = ({
  code,
  setCode,
  name,
  setName,
  country,
  setCountry,
  errors,
  handleSubmit,
  onClose,
  editingId
}) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header với gradient hiện đại */}
        <div className="relative bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 text-white p-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24 blur-2xl"></div>
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl">
                {editingId ? "✏️" : "🚗"}
              </div>
              <h2 className="text-3xl font-bold">
                {editingId ? "Chỉnh sửa hãng xe" : "Thêm hãng xe mới"}
              </h2>
            </div>
            <p className="text-emerald-50 text-sm ml-15">
              {editingId ? "Cập nhật thông tin hãng xe" : "Điền thông tin để thêm hãng xe mới vào hệ thống"}
            </p>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8 space-y-6 overflow-y-auto max-h-[calc(90vh-280px)]">
          {/* Code Input */}
          <div className="group">
            <label className="block text-sm font-bold text-gray-700 mb-2 items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              Mã hãng xe
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={code}
                onChange={e => setCode(e.target.value)}
                className={`w-full px-5 py-3.5 border-2 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-200 outline-none bg-gray-50 focus:bg-white ${
                  errors.code
                    ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                placeholder="VD: VF8, VF3, VF5"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                🏷️
              </div>
            </div>
            {errors.code && (
              <div className="flex items-center gap-2 mt-2 text-red-600 text-sm animate-in slide-in-from-top-1 duration-200">
                <span className="text-xs">⚠️</span>
                <p>{errors.code}</p>
              </div>
            )}
          </div>

          {/* Name Input */}
          <div className="group">
            <label className="block text-sm font-bold text-gray-700 mb-2 items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              Tên hãng xe
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className={`w-full px-5 py-3.5 border-2 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-200 outline-none bg-gray-50 focus:bg-white ${
                  errors.name
                    ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                placeholder="VD: Vinfast"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                🏢
              </div>
            </div>
            {errors.name && (
              <div className="flex items-center gap-2 mt-2 text-red-600 text-sm animate-in slide-in-from-top-1 duration-200">
                <span className="text-xs">⚠️</span>
                <p>{errors.name}</p>
              </div>
            )}
          </div>

          {/* Country Input */}
          <div className="group">
            <label className="block text-sm font-bold text-gray-700 mb-2 items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              Quốc gia
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={country}
                onChange={e => setCountry(e.target.value)}
                className={`w-full px-5 py-3.5 border-2 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-200 outline-none bg-gray-50 focus:bg-white ${
                  errors.country
                    ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                placeholder="VD: Vietnam"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                🌍
              </div>
            </div>
            {errors.country && (
              <div className="flex items-center gap-2 mt-2 text-red-600 text-sm animate-in slide-in-from-top-1 duration-200">
                <span className="text-xs">⚠️</span>
                <p>{errors.country}</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer với buttons */}
        <div className="border-t border-gray-100 p-6 bg-gray-50/50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 hover:border-gray-400 active:scale-95 transition-all duration-200 font-semibold"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-600 text-white rounded-xl hover:shadow-xl hover:shadow-emerald-500/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 font-semibold flex items-center gap-2"
          >
            {editingId ? (
              <>
                <span>💾</span>
                <span>Cập nhật</span>
              </>
            ) : (
              <>
                <span>➕</span>
                <span>Thêm mới</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};