import React, { useState } from "react";
import {
  X,
  Package,
  TrendingUp,
  TrendingDown,
  Save,
  AlertCircle
} from "lucide-react";
import { InventoryItem } from "../types/types";

interface UpdateInventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  setName: (v: string) => void;
  quantity: number;
  setQuantity: (v: number) => void;
  qtyReserved: number;
  setQtyReserved: (v: number) => void;
  qtyIncoming: number;
  setQtyIncoming: (v: number) => void;
  handleUpdate: (
    id: string,
    data: {
      name: string;
      quantity: number;
      qtyReserved: number;
      qtyIncoming: number;
    }
  ) => void;
  selectedId: string | null;
  item: InventoryItem | null;
}

const UpdateInventoryModal: React.FC<UpdateInventoryModalProps> = ({
  isOpen,
  onClose,
  name,
  setName,
  quantity,
  setQuantity,
  qtyReserved,
  setQtyReserved,
  qtyIncoming,
  setQtyIncoming,
  handleUpdate,
  selectedId,
  item
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  React.useEffect(() => {
    if (item) {
      setName(item.name || "");
      setQuantity(item.qtyOnHand);
      setQtyReserved(item.qtyReserved); // hoặc item.qtyReserved nếu có
      setQtyIncoming(item.available || 0);
    }
  }, [item, setName, setQtyIncoming, setQtyReserved, setQuantity]);
  const getStockStatus = () => {
    if (quantity <= qtyReserved) {
      return {
        color: "text-red-500",
        bg: "bg-red-50",
        text: "Cảnh báo: Tồn kho thấp"
      };
    } else if (quantity >= qtyIncoming) {
      return {
        color: "text-amber-500",
        bg: "bg-amber-50",
        text: "Cảnh báo: Tồn kho cao"
      };
    }
    return {
      color: "text-green-500",
      bg: "bg-green-50",
      text: "Tồn kho ổn định"
    };
  };

  const stockStatus = getStockStatus();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("selectedId:", selectedId);
    if (!selectedId) return;
    setIsSubmitting(true);
    try {
      await handleUpdate(selectedId, {
        name,
        quantity,
        qtyReserved,
        qtyIncoming
      });
      console.log("Update success");
      onClose(); // đóng modal sau khi update
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Cập Nhật Kho Hàng</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Stock Status Alert */}
        <div
          className={`mx-6 mt-6 p-3 rounded-lg ${stockStatus.bg} flex items-center space-x-2`}
        >
          <AlertCircle className={`w-5 h-5 ${stockStatus.color}`} />
          <span className={`text-sm font-medium ${stockStatus.color}`}>
            {stockStatus.text}
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tên Sản Phẩm
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Nhập tên sản phẩm"
              required
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Số Lượng Hiện Tại
            </label>
            <div className="relative">
              <Package className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="0"
                required
                min={0}
              />
            </div>
          </div>

          {/* Min and Max */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mức Tối Thiểu
              </label>
              <div className="relative">
                <TrendingDown className="absolute left-3 top-3.5 w-5 h-5 text-red-400" />
                <input
                  type="number"
                  value={qtyReserved}
                  onChange={(e) => setQtyReserved(Number(e.target.value))}
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="0"
                  min={0}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mức Tối Đa
              </label>
              <div className="relative">
                <TrendingUp className="absolute left-3 top-3.5 w-5 h-5 text-green-400" />
                <input
                  type="number"
                  value={qtyIncoming}
                  onChange={(e) => setQtyIncoming(Number(e.target.value))}
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="0"
                  min={0}
                  required
                />
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="pt-2">
            <div className="flex justify-between text-xs text-gray-600 mb-2">
              <span>Min: {qtyReserved}</span>
              <span>Current: {quantity}</span>
              <span>Max: {qtyIncoming}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  quantity <= qtyReserved
                    ? "bg-red-500"
                    : quantity >= qtyIncoming
                    ? "bg-amber-500"
                    : "bg-green-500"
                }`}
                style={{
                  width: `${Math.min(
                    100,
                    Math.max(0, (quantity / (qtyIncoming || 1)) * 100)
                  )}%`
                }}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Đang lưu...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Lưu Thay Đổi</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
};

export default UpdateInventoryModal;
