// components/CreateInventoryModal.tsx
"use client";
import React, { useMemo } from "react";
import {
  X,
  Package,
  CheckCircle,
  Car as CarIcon,
  Hash,
  Sparkles,
  AlertCircle
} from "lucide-react";
import { Car } from "../../cars/types";
import { Dealer } from "../../dealerView/types/types";
import { Alert, Slide, SlideProps, Snackbar } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { Models } from "@/services/vehicleModel/vehicle";

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

interface CreateInventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    dealerId: string;
    vehicleId: string;
    modelId: string;
    quantity: number;
  }) => Promise<void>;
  model: Models[];
  dealers: Dealer[];
  vehicles: Car[];
  dealerId: string;
  setDealerId: (v: string) => void;
  vehicleId: string;
  setVehicleId: (v: string) => void;
  modelId: string;
  setModelId: (v: string) => void;
  quantity: number;
  setQuantity: (v: number) => void;
}

export const CreateInventoryModal: React.FC<CreateInventoryModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  dealers,
  vehicles,
  model,
  dealerId,
  setDealerId,
  vehicleId,
  setVehicleId,
  modelId,
  setModelId,
  quantity,
  setQuantity
}) => {
  const [notification, setNotification] = React.useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  // ✅ FILTER VEHICLES BY SELECTED MODEL
  const filteredVehicles = useMemo(() => {
    if (!modelId) return vehicles;

    // Filter vehicles that belong to selected model
    return vehicles.filter((vehicle) => {
      // Assuming vehicle has a modelId or code that starts with model name
      // Adjust this logic based on your actual data structure
      const selectedModel = model.find((m) => m.id === modelId);
      if (!selectedModel) return false;

      // Option 1: If vehicle has modelId field
      // return vehicle.modelId === modelId;

      // Option 2: If vehicle code starts with model name (e.g., VF8, VF9)
      return vehicle.code
        .toUpperCase()
        .startsWith(selectedModel.name.toUpperCase());
    });
  }, [modelId, vehicles, model]);

  const handleClose = () => {
    setNotification((p) => ({ ...p, open: false }));
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    switch (name) {
      case "dealerId":
        setDealerId(value);
        break;
      case "vehicleId":
        setVehicleId(value);
        break;
      case "modelId":
        setModelId(value);
        // ✅ Reset vehicleId when model changes
        setVehicleId("");
        break;
      case "quantity":
        setQuantity(Number(value));
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!dealerId || !vehicleId || !modelId || quantity <= 0) {
      setNotification({
        open: true,
        message: "Vui lòng điền đầy đủ thông tin",
        severity: "error"
      });
      return;
    }

    try {
      await onSubmit({ dealerId, vehicleId, modelId, quantity });
      setNotification({
        open: true,
        message: "Tạo inventory thành công",
        severity: "success"
      });

      // Reset form
      setQuantity(0);
      setDealerId("");
      setVehicleId("");
      setModelId("");

      onClose();
    } catch (err) {
      console.error(err);
      setNotification({
        open: true,
        message: "Tạo inventory thất bại",
        severity: "error"
      });
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          onClick={handleClose}
        />

        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative overflow-hidden">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-t-3xl">
              <div className="absolute inset-0 opacity-20 bg-white/10" />
            </div>
            <div className="relative px-8 py-6">
              <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <div className="bg-white/20 p-3 rounded-2xl shadow-lg">
                    <Package className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white flex items-center gap-2">
                      Điều phối Sản Phẩm Mới
                      <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
                    </h2>
                    <p className="text-blue-100 text-sm mt-1">
                      Thêm xe vào kho hàng của đại lý
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="text-white hover:bg-white/20 rounded-xl p-2 transition-all duration-200 hover:scale-110"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="px-8 pb-8 pt-4 space-y-6 relative"
            >
              <div className="bg-gray-50 rounded-2xl p-6 space-y-5">
                {/* Dealer */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                    Đại lý <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="dealerId"
                    value={dealerId}
                    onChange={handleChange}
                    required
                    className="select-focus-ring w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-gray-700 font-medium appearance-none cursor-pointer hover:border-blue-300"
                  >
                    <option value="">🏢 Chọn đại lý...</option>
                    {dealers.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Model */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                    <CarIcon className="w-4 h-4 text-indigo-600" />
                    Mẫu xe <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="modelId"
                    value={modelId}
                    onChange={handleChange}
                    required
                    className="select-focus-ring w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white text-gray-700 font-medium appearance-none cursor-pointer hover:border-indigo-300"
                  >
                    <option value="">🚗 Chọn mẫu xe...</option>
                    {model.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Vehicle - WITH FILTER */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                    <Package className="w-4 h-4 text-purple-600" />
                    Xe cụ thể <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="vehicleId"
                    value={vehicleId}
                    onChange={handleChange}
                    required
                    disabled={!modelId}
                    className={`select-focus-ring w-full px-5 py-3.5 border-2 rounded-xl transition-all font-medium appearance-none ${
                      !modelId
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                        : "bg-white text-gray-700 cursor-pointer border-gray-200 hover:border-purple-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    }`}
                  >
                    <option value="">
                      {!modelId
                        ? "⚠️ Vui lòng chọn mẫu xe trước..."
                        : "🚙 Chọn xe..."}
                    </option>
                    {filteredVehicles.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.vin} ({v.code})
                      </option>
                    ))}
                  </select>

                  {/* Info message */}
                  {modelId && filteredVehicles.length === 0 && (
                    <div className="mt-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <span className="text-sm text-amber-700 font-medium">
                        Không có xe nào thuộc mẫu này
                      </span>
                    </div>
                  )}

                  {modelId && filteredVehicles.length > 0 && (
                    <div className="mt-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-blue-700 font-medium">
                        Tìm thấy <strong>{filteredVehicles.length}</strong> xe
                        phù hợp
                      </span>
                    </div>
                  )}
                </div>

                {/* Quantity */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                    <Hash className="w-4 h-4 text-green-600" />
                    Số lượng <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={quantity}
                    min={1}
                    onChange={handleChange}
                    required
                    className="input-focus-ring w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white text-gray-700 font-semibold text-lg hover:border-green-300"
                    placeholder="Nhập số lượng..."
                  />
                  {quantity > 0 && (
                    <div className="mt-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-700 font-medium">
                        Sẽ thêm <strong>{quantity}</strong> xe vào kho
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t-2 border-gray-200">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all font-semibold hover:scale-105 hover:shadow-md"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="group px-8 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-2xl transition-all font-bold flex items-center gap-2 hover:scale-105 shadow-lg shadow-blue-500/50"
                >
                  <CheckCircle className="w-5 h-5 group-hover:animate-bounce" />
                  Điều phối
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Notification */}
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
            iconMapping={{
              success: <CheckCircle />,
              error: <ErrorIcon />
            }}
            sx={{
              borderRadius: "12px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              fontWeight: "600"
            }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};
