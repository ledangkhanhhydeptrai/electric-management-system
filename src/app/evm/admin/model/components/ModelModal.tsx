import React from "react";
import {
  Banknote,
  Check,
  CheckCircleIcon,
  Calendar,
  Zap,
  Battery,
  Gauge,
  FileText,
  Car,
  Sparkles
} from "lucide-react";
import Modal from "./Modal";
import { Alert, Slide, SlideProps, Snackbar } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import Image from "next/image";

interface SlideTransitionProps
  extends Omit<SlideProps, "direction" | "children"> {
  children: React.ReactElement;
}

function SlideTransition({ children, ...props }: SlideTransitionProps) {
  return (
    <Slide {...props} direction="left">
      {children}
    </Slide>
  );
}

interface ModelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  basePrice: number;
  setBasePrice: (v: number) => void;
  name: string;
  setName: (v: string) => void;
  year: number;
  setYear: (v: number) => void;
  horsepower: number;
  setHorsepower: (v: number) => void;
  version: string;
  setVersion: (v: string) => void;
  rangeKm: number;
  setRangeKm: (v: number) => void;
  batteryCapacity: number;
  setBatteryCapacity: (v: number) => void;
  description: string;
  setDescription: (v: string) => void;
  imageFile: File | null;
  setImageFile: (v: File | null) => void;
}

export default function ModelModal({
  isOpen,
  onClose,
  onSave,
  name,
  setName,
  year,
  setYear,
  horsepower,
  setHorsepower,
  version,
  setVersion,
  rangeKm,
  setRangeKm,
  batteryCapacity,
  setBatteryCapacity,
  basePrice,
  setBasePrice,
  description,
  setDescription,
  imageFile,
  setImageFile
}: ModelModalProps) {
  const [notification, setNotification] = React.useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };
  const handleClose = () => {
    setNotification((p) => ({ ...p, open: false }));
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Tạo Model Xe Điện Mới">
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const currentYear = new Date().getFullYear();

          // Validate năm sản xuất
          if (!year) {
            setNotification({
              open: true,
              message: "Vui lòng chọn năm sản xuất",
              severity: "error"
            });
            return;
          }

          if (year < currentYear) {
            setNotification({
              open: true,
              message: `Năm sản xuất không được nhỏ hơn năm hiện tại (${currentYear})`,
              severity: "error"
            });
          }

          // Validate tên model
          if (!name.trim()) {
            setNotification({
              open: true,
              message: "Vui lòng nhập tên model",
              severity: "error"
            });
            return;
          }

          onSave(e);
        }}
        className="space-y-5"
      >
        {/* Header với gradient */}
        {/* <div className="relative overflow-hidden bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 p-6 rounded-2xl shadow-xl">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16 blur-2xl"></div>
          <div className="relative">
            <label className="flex items-center gap-2 text-sm font-bold text-white/90 mb-3">
              <Factory className="w-5 h-5" />
              Nhà sản xuất <span className="text-yellow-300">*</span>
            </label>
            <select
              value={manufacturerId}
              onChange={(e) => setManufacturerId(Number(e.target.value))}
              required
              className="w-full px-4 py-3.5 border-0 rounded-xl bg-white/95 backdrop-blur text-gray-800 font-semibold focus:ring-4 focus:ring-purple-300 focus:outline-none transition-all shadow-lg"
            >
              <option value="">-- Chọn nhà sản xuất --</option>
              {manufacturers?.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.country})
                </option>
              ))}
            </select>
          </div>
        </div> */}

        {/* Thông tin cơ bản */}
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-base font-bold text-gray-800">
            <Sparkles className="w-5 h-5 text-purple-600" />
            Thông tin cơ bản
          </h3>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Car className="w-4 h-4 text-purple-600" />
              Tên Model <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="VD: Model S, ID.4, e-tron..."
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-400 transition-all outline-none placeholder:text-gray-400 hover:border-gray-300"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="w-4 h-4 text-emerald-600" />
                Năm sản xuất
              </label>
              <select
                value={year || ""}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl 
      focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 
      transition-all outline-none hover:border-gray-300"
              >
                <option value="">-- Chọn năm --</option>
                {Array.from(
                  { length: 30 },
                  (_, i) => new Date().getFullYear() - i
                ).map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Zap className="w-4 h-4 text-purple-600" />
                Phiên bản
              </label>
              <select
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-400 transition-all outline-none hover:border-gray-300"
              >
                <option value="">-- Chọn phiên bản --</option>
                <option value="ECO">🌿 Eco</option>
                <option value="PLUS">⭐ Plus</option>
                <option value="PREMIUM">💎 Premium</option>
              </select>
            </div>
          </div>
        </div>

        {/* Thông số kỹ thuật */}
        <div className="space-y-4 bg-gradient-to-br from-purple-50 to-indigo-50 p-5 rounded-2xl border border-purple-100">
          <h3 className="flex items-center gap-2 text-base font-bold text-gray-800">
            <Gauge className="w-5 h-5 text-purple-600" />
            Thông số kỹ thuật
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Gauge className="w-4 h-4 text-purple-600" />
                Công suất (HP)
              </label>
              <input
                type="number"
                value={horsepower}
                onChange={(e) => setHorsepower(Number(e.target.value))}
                placeholder="670"
                min="0"
                className="w-full px-4 py-3 bg-white border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-400 transition-all outline-none hover:border-purple-300"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Zap className="w-4 h-4 text-purple-600" />
                Phạm vi (km)
              </label>
              <input
                type="number"
                value={rangeKm}
                onChange={(e) => setRangeKm(Number(e.target.value))}
                placeholder="600"
                min="0"
                className="w-full px-4 py-3 bg-white border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-400 transition-all outline-none hover:border-purple-300"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Battery className="w-4 h-4 text-purple-600" />
                Dung lượng pin (kWh)
              </label>
              <input
                type="number"
                value={batteryCapacity}
                onChange={(e) => setBatteryCapacity(Number(e.target.value))}
                placeholder="100"
                min="0"
                step="0.1"
                className="w-full px-4 py-3 bg-white border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-400 transition-all outline-none hover:border-purple-300"
              />
            </div>
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
        {/* Giá bán */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-5 rounded-2xl border border-emerald-200">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
            <Banknote className="w-5 h-5 text-emerald-600" />
            Giá bán <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-600 font-bold text-lg">
              ₫
            </span>
            <input
              type="number"
              required
              min="0"
              step="1000"
              placeholder="1,500,000,000"
              value={basePrice}
              onChange={(e) => setBasePrice(+e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-white border-2 border-emerald-300 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all outline-none text-lg font-semibold text-gray-800 hover:border-emerald-400"
            />
          </div>
        </div>

        {/* Mô tả */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <FileText className="w-4 h-4 text-purple-600" />
            Mô tả chi tiết
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Mô tả về thiết kế, tính năng nổi bật, công nghệ đặc biệt..."
            className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-400 transition-all outline-none resize-none placeholder:text-gray-400 hover:border-gray-300"
          />
        </div>

        {/* Info Box */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 p-5 rounded-2xl shadow-lg">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-xl"></div>
          <div className="relative flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white mb-1">Mẹo nhỏ</p>
              <p className="text-sm text-white/90 leading-relaxed">
                Sau khi tạo Model, bạn có thể thêm nhiều phiên bản với giá và
                cấu hình khác nhau. Điều này giúp quản lý đa dạng sản phẩm dễ
                dàng hơn!
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all active:scale-95 border border-gray-200"
          >
            Hủy bỏ
          </button>
          <button
            type="submit"
            className="relative overflow-hidden px-8 py-3 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-700 hover:via-violet-700 hover:to-indigo-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95 group"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <Check className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Tạo Model</span>
          </button>
        </div>
      </form>

      <Snackbar
        open={notification.open}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={3000}
      >
        <Alert
          onClose={handleClose}
          severity={notification.severity}
          variant="filled"
          iconMapping={{ success: <CheckCircleIcon />, error: <ErrorIcon /> }}
          sx={{ boxShadow: 4 }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Modal>
  );
}
