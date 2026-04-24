// components/Contract/ContractModal/ItemCard.tsx
import React from "react";
import { FaTimes, FaExclamationCircle } from "react-icons/fa";
import { ItemExtra } from "@/services/contract/contractService";

interface ItemCardProps {
  item: ItemExtra;
  index: number;
  showRemove: boolean;
  onItemChange: (
    index: number,
    field: keyof ItemExtra,
    value: string | number
  ) => void;
  onRemove: (index: number) => void;
  error?: string; // ✅ NEW
  maxQty?: number; // ✅ NEW
}

const ItemCard: React.FC<ItemCardProps> = ({
  item,
  index,
  showRemove,
  onItemChange,
  onRemove,
  error, // ✅ NEW
  maxQty // ✅ NEW
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(value);
  };

  const calculateAmount = () => {
    return item.qty * item.unitPrice;
  };

  return (
    <div
      className={`bg-white rounded-xl p-4 border-2 transition-all ${
        error
          ? "border-red-300 bg-red-50"
          : "border-emerald-100 hover:border-emerald-300 hover:shadow-md"
      }`}
    >
      <div className="grid grid-cols-12 gap-3 items-start">
        {/* Item Name */}
        <div className="col-span-4">
          <label className="block text-xs text-gray-600 font-semibold mb-1">
            Tên hàng hóa <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={item.itemName}
            onChange={(e) => onItemChange(index, "itemName", e.target.value)}
            placeholder="Nhập tên hàng hóa"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none text-sm font-medium"
            readOnly
          />
        </div>

        {/* Quantity */}
        <div className="col-span-2">
          <label className="block text-xs text-gray-600 font-semibold mb-1">
            Số lượng <span className="text-red-500">*</span>
            {maxQty && (
              <span className="text-emerald-600 ml-1 font-normal">
                (Max: {maxQty})
              </span>
            )}
          </label>
          <input
            type="number"
            value={item.qty}
            onChange={(e) =>
              onItemChange(index, "qty", parseInt(e.target.value) || 0)
            }
            className={`w-full px-3 py-2 rounded-lg border focus:ring-2 outline-none text-sm font-bold text-center ${
              error
                ? "border-red-300 focus:border-red-400 focus:ring-red-100 bg-white"
                : "border-gray-200 focus:border-emerald-400 focus:ring-emerald-100"
            }`}
            min="1"
            max={maxQty}
          />
        </div>

        {/* Unit Price */}
        <div className="col-span-3">
          <label className="block text-xs text-gray-600 font-semibold mb-1">
            Đơn giá <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={item.unitPrice}
            onChange={(e) =>
              onItemChange(index, "unitPrice", parseInt(e.target.value) || 0)
            }
            placeholder="0"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none text-sm font-bold"
            readOnly
          />
        </div>

        {/* Amount & Remove */}
        <div className="col-span-3 flex items-end gap-2">
          <div className="flex-1">
            <label className="block text-xs text-gray-600 font-semibold mb-1">
              Thành tiền
            </label>
            <div className="px-3 py-2 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-200">
              <p className="text-sm font-black text-emerald-600 text-center">
                {formatCurrency(calculateAmount())}
              </p>
            </div>
          </div>
          {showRemove && (
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Xóa hàng hóa"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* ✅ Error Message */}
      {error && (
        <div className="mt-3 flex items-center gap-2 text-red-600 text-xs font-semibold bg-red-100 px-3 py-2 rounded-lg border border-red-200">
          <FaExclamationCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default ItemCard;