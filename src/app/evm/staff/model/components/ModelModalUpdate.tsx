import React from "react";
import {
  X,
  Car,
  Calendar,
  Battery,
  FileText,
  Gauge,
  Route,
  AlertCircle,
  CheckCircle2,
  Banknote
} from "lucide-react";

// Mock Modal component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
}

function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Car className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">{title}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-xl transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}
interface EVModel {
  id: string;
  name: string;
}

interface ModelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => Promise<void>;
  editingModel: EVModel;
  name: string;
  setName: (v: string) => void;
  basePrice: number;
  setBasePrice: (v: number) => void;
  year: number;
  setYear: (v: number) => void;
  horsepower: number;
  setHorsepower: (v: number) => void;
  rangeKm: number;
  setRangeKm: (v: number) => void;
  batteryCapacity: number;
  setBatteryCapacity: (v: number) => void;
  description: string;
  setDescription: (v: string) => void;
}

export default function ModelModalUpdate({
  isOpen,
  onClose,
  onSave,
  name,
  setName,
  year,
  setYear,
  horsepower,
  setHorsepower,
  rangeKm,
  setRangeKm,
  batteryCapacity,
  setBatteryCapacity,
  description,
  setDescription,
  basePrice,
  setBasePrice
}: ModelModalProps) {
  const [notification, setNotification] = React.useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const handleClose = () => {
    setNotification((p) => ({ ...p, open: false }));
    onClose();
  };

  const handleSubmit = () => {
    onSave();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Cập nhật Model">
      <div className="space-y-6">
        {/* Model Name & Version */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative group">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <Car className="w-4 h-4 text-blue-600" />
              Tên Model
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Car className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-blue-600 transition-colors pointer-events-none" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="VD: Model S, VF8..."
                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none hover:border-gray-300 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Year & Horsepower */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative group">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <Calendar className="w-4 h-4 text-green-600" />
              Năm sản xuất
            </label>
            <div className="relative">
              <Calendar className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-green-600 transition-colors pointer-events-none" />
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                placeholder="2024"
                min={2000}
                max={2030}
                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none hover:border-gray-300 font-medium"
              />
            </div>
          </div>

          <div className="relative group">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <Gauge className="w-4 h-4 text-orange-600" />
              Mã lực (HP)
            </label>
            <div className="relative">
              <Gauge className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-orange-600 transition-colors pointer-events-none" />
              <input
                type="number"
                value={horsepower}
                onChange={(e) => setHorsepower(Number(e.target.value))}
                placeholder="VD: 670"
                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all outline-none hover:border-gray-300 font-medium"
              />
            </div>
          </div>
          <div>
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
                value={basePrice}
                onChange={(e) => setBasePrice(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        {/* Range & Battery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative group">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <Route className="w-4 h-4 text-teal-600" />
              Quãng đường (km)
            </label>
            <div className="relative">
              <Route className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-teal-600 transition-colors pointer-events-none" />
              <input
                type="number"
                value={rangeKm}
                onChange={(e) => setRangeKm(Number(e.target.value))}
                placeholder="VD: 600"
                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all outline-none hover:border-gray-300 font-medium"
              />
            </div>
          </div>

          <div className="relative group">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <Battery className="w-4 h-4 text-emerald-600" />
              Dung lượng pin (kWh)
            </label>
            <div className="relative">
              <Battery className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-emerald-600 transition-colors pointer-events-none" />
              <input
                type="number"
                value={batteryCapacity}
                onChange={(e) => setBatteryCapacity(Number(e.target.value))}
                placeholder="VD: 100"
                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none hover:border-gray-300 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="relative group">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
            <FileText className="w-4 h-4 text-gray-600" />
            Mô tả
          </label>
          <div className="relative">
            <FileText className="w-5 h-5 text-gray-400 absolute left-4 top-4 group-focus-within:text-gray-600 transition-colors pointer-events-none" />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Nhập mô tả chi tiết về model..."
              className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-gray-500 focus:ring-4 focus:ring-gray-100 transition-all outline-none hover:border-gray-300 resize-none font-medium"
            />
          </div>
        </div>

        {/* Info Box */}
        <div className="relative bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-5 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-2xl"></div>
          <div className="relative flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-xl">
              <AlertCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-900 mb-1">
                Lưu ý quan trọng
              </p>
              <p className="text-sm text-blue-700 leading-relaxed">
                Sau khi cập nhật Model, các thông số kỹ thuật sẽ được áp dụng
                cho tất cả các phiên bản liên quan. Hãy kiểm tra kỹ trước khi
                lưu.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t-2 border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="group px-6 py-3 border-2 border-gray-300 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all font-semibold text-gray-700 flex items-center gap-2"
          >
            <X className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            Hủy bỏ
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="group relative px-8 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl font-semibold transition-all overflow-hidden shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
            <div className="relative flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Cập nhật Model
            </div>
          </button>
        </div>
      </div>

      {/* Notification Snackbar */}
      {notification.open && (
        <div className="fixed top-4 right-4 z-50">
          <div
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl ${
              notification.severity === "success"
                ? "bg-gradient-to-r from-green-500 to-emerald-500"
                : "bg-gradient-to-r from-red-500 to-rose-500"
            } text-white`}
          >
            {notification.severity === "success" ? (
              <CheckCircle2 className="w-6 h-6" />
            ) : (
              <AlertCircle className="w-6 h-6" />
            )}
            <span className="font-semibold">{notification.message}</span>
            <button
              onClick={handleClose}
              className="ml-2 p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
