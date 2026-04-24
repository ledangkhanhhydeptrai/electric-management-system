import React from "react";
import { X, Truck, Package, MessageSquare } from "lucide-react";
import { InventoryItem } from "../types/types";

interface DispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: InventoryItem | null;
  onSubmit: (data: DispatchFormData) => void;
  dealers?: Array<{ id: string; name: string }>;
}

export interface DispatchFormData {
  inventoryId: string;
  sourceDealerId: string;
  targetDealerId: string;
  quantity: number;
  expectedDate: string;
  notes: string;
}

export const DispatchModal: React.FC<DispatchModalProps> = ({
  isOpen,
  onClose,
  item,
  onSubmit,
  dealers = []
}) => {
  const [formData, setFormData] = React.useState<DispatchFormData>({
    inventoryId: "",
    sourceDealerId: "",
    targetDealerId: "",
    quantity: 1,
    expectedDate: "",
    notes: ""
  });

  // Reset form khi mở modal với item mới
  React.useEffect(() => {
    if (item && isOpen) {
      setFormData({
        inventoryId: item.id,
        sourceDealerId: item.dealerId || "",
        targetDealerId: "",
        quantity: 1,
        expectedDate: "",
        notes: ""
      });
    }
  }, [item, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Truck className="w-7 h-7" />
            Điều phối xe
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Thông tin xe hiện tại */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600" />
              Thông tin xe
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase">
                  Tên xe
                </label>
                <p className="text-base font-semibold text-gray-900 mt-1">
                  {item.name}
                </p>
              </div>
              {/* <div>
                <label className="text-xs font-bold text-gray-600 uppercase">
                  Mã xe
                </label>
                <p className="text-base font-semibold text-gray-900 mt-1">
                  {item.vehicleCode}
                </p>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase">
                  VIN
                </label>
                <p className="text-sm font-mono text-gray-900 mt-1">
                  {item.vehicleVin}
                </p>
              </div> */}
              {/* <div>
                <label className="text-xs font-bold text-gray-600 uppercase">
                  Số lượng hiện tại
                </label>
                <p className="text-2xl font-bold text-blue-600 mt-1">
                  {item.quantity}{" "}
                  <span className="text-sm text-gray-500">xe</span>
                </p>
              </div> */}
            </div>
          </div>

          {/* Form điều phối */}
          <div className="space-y-5">
            {/* Đại lý nguồn */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Đại lý nguồn *
              </label>
              <input
                type="text"
                value={item.dealerName}
                disabled
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl bg-gray-100 text-gray-700 font-semibold cursor-not-allowed"
              />
            </div>

            {/* Đại lý đích */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Đại lý đích *
              </label>
              <select
                value={formData.targetDealerId}
                onChange={(e) =>
                  setFormData({ ...formData, targetDealerId: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                required
              >
                <option value="">-- Chọn đại lý đích --</option>
                {dealers
                  .filter((d) => d.id !== formData.sourceDealerId)
                  .map((dealer) => (
                    <option key={dealer.id} value={dealer.id}>
                      {dealer.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Số lượng và Ngày dự kiến */}
            {/* <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Số lượng xe *
                </label>
                <input
                  type="number"
                  min="1"
                  max={item.quantity}
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      quantity: parseInt(e.target.value) || 1
                    })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Tối đa: {item.quantity} xe
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Ngày dự kiến chuyển *
                </label>
                <input
                  type="date"
                  value={formData.expectedDate}
                  onChange={(e) =>
                    setFormData({ ...formData, expectedDate: e.target.value })
                  }
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  required
                />
              </div>
            </div> */}

            {/* Ghi chú */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Ghi chú
              </label>
              <textarea
                rows={4}
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="Nhập ghi chú về lý do điều phối, yêu cầu đặc biệt..."
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
            >
              Xác nhận điều phối
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
