import {
  ColorEnum,
  UpdateVehicle,
  UpdateVehicleById
} from "@/services/vehicle/vehicle";
import React, { useState } from "react";
// import { Car } from "../types";
interface UpdateProps {
  isOpen: boolean;
  carData: UpdateVehicle;
  onUpdate: (updatedData: UpdateVehicle) => void;
  onCancel: () => void;
}
const UpdateCarForm = ({
  carData,
  onUpdate,
  onCancel,
  isOpen
}: UpdateProps) => {
  const [id, setId] = useState(carData.id || "");
  const [color, setColor] = useState<ColorEnum>(
    (carData.color as ColorEnum) || "GREEN"
  );
  const [status, setStatus] = useState(carData.status || "IN_FACTORY");
  const [rangeKm, setRangeKm] = useState(carData.rangeKm || 0);
  const [version, setVersion] = useState(carData.version);
  // const [data, setData] = React.useState<Car[]>([]);
  React.useEffect(() => {
    // const fetchData = async () => {
    //   const response = await getAllVehicle();
    //   if (Array.isArray(response)) {
    //     setData(response);
    //   } else {
    //     setData([]);
    //   }
    // };
    // fetchData();
  }, []);
  const colors = [
    { value: "RED", label: "Đỏ" },
    { value: "GREEN", label: "Xanh lá" },
    { value: "BLUE", label: "Xanh dương" },
    { value: "WHITE", label: "Trắng" },
    { value: "BLACK", label: "Đen" },
    { value: "SILVER", label: "Bạc" },
    { value: "GREY", label: "Xám" },
    { value: "GOLDEN", label: "Vàng kim" }
  ];
  const statuses = [
    { value: "IN_FACTORY", label: "Trong nhà máy" },
    { value: "IN_TRANSIT", label: "Đang vận chuyển" },
    { value: "IN_STOCK", label: "Trong kho" }, // hoặc "Sẵn hàng"
    { value: "ALLOCATED", label: "Đã phân bổ" }, // hoặc "Đã gán cho đại lý"
    { value: "SOLD", label: "Đã bán" }
  ];
  const versions = [
    { value: "ECO", label: "Thân thiện" },
    { value: "PLUS", label: "Bản nâng cấp" }, // hoặc "Bản Plus"
    { value: "PREMIUM", label: "Bản cao cấp" }
  ];

  const handleSubmit = async () => {
    try {
      const updated = await UpdateVehicleById({
        id,
        color,
        status,
        rangeKm,
        version
      });
      console.log("Updated:", updated);
      if (!updated) {
        console.warn("No data returned from UpdateVehicleById");
        return;
      }
      // Assert and narrow the returned value to UpdateVehicle before calling onUpdate
      const updatedData = updated as UpdateVehicle;
      // alert("Bạn đã cập nhật thành công");
      onUpdate(updatedData);
      window.location.reload();
    } catch (error) {
      console.error("Error", error);
    }
  };

  // const handleReset = () => {
  //   setColor(carData?.color || "GREEN");
  //   setStatus(carData?.status || "IN_FACTORY");
  //   setRangeKm(carData?.rangeKm || 0);
  // };

  // const formatCurrency = (value: number) => {
  //   return new Intl.NumberFormat("vi-VN", {
  //     style: "currency",
  //     currency: "VND"
  //   }).format(value);
  // };
  if (!isOpen) {
    return null;
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50">
      <div className="bg-white w-full max-w-2xl mx-auto rounded-2xl shadow-xl animate-fadeIn max-h-[90vh] overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Cập nhật thông tin xe
            </h1>
            <p className="text-gray-600">
              Chỉnh sửa thông tin chi tiết của xe trong hệ thống
            </p>
          </div>

          <div className="space-y-6">
            {/* <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ID Xe
              </label>
              <select
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              >
                <option value="">-- Chọn ID xe --</option>
                {data.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.vin}>
                    {vehicle.vin} {vehicle.modelName}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-gray-500">
                Chọn ID xe cần cập nhật
              </p>
            </div> */}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Màu sắc
              </label>
              <select
                value={color}
                onChange={(e) => setColor(e.target.value as ColorEnum)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              >
                {colors.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Trạng thái
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              >
                {statuses.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phiên bản
              </label>
              <select
                value={version}
                onChange={(e) =>
                  setVersion(e.target.value as "ECO" | "PLUS" | "PREMIUM")
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              >
                {versions.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phạm vi hoạt động (km)
              </label>
              <input
                type="number"
                value={rangeKm}
                onChange={(e) => setRangeKm(Number(e.target.value))}
                min="0"
                step="1000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
              <p className="mt-1 text-sm text-gray-600">
                {Number(rangeKm).toLocaleString("vi-VN")} km
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-lg hover:shadow-xl"
              >
                Cập nhật
              </button>
              {/* <button
                onClick={handleReset}
                className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Đặt lại
              </button> */}
              {onCancel && (
                <button
                  onClick={onCancel}
                  className="flex-1 bg-red-100 text-red-700 py-3 px-6 rounded-lg font-semibold hover:bg-red-200 transition"
                >
                  Hủy
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UpdateCarForm;
