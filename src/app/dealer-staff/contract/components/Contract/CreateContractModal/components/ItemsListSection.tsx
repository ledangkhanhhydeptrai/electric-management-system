// components/Contract/ContractModal/ItemsListSection.tsx
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { ItemExtra } from "@/services/contract/contractService";
import ItemCard from "./ItemCard";

interface ItemsListSectionProps {
  extraItems: ItemExtra[];
  setExtraItems: (val: ItemExtra[]) => void;
  maxQuantities?: { [itemName: string]: number }; // ✅ NEW
}

const ItemsListSection: React.FC<ItemsListSectionProps> = ({
  extraItems,
  setExtraItems,
  maxQuantities = {} // ✅ NEW
}) => {
  // ✅ Track errors for each item
  const [errors, setErrors] = useState<{ [key: number]: string }>({});

  // ✅ Validate quantity
  const validateQuantity = (itemName: string, qty: number): string | null => {
    if (qty <= 0) {
      return "Số lượng phải lớn hơn 0";
    }

    const maxQty = maxQuantities[itemName];
    if (maxQty && qty > maxQty) {
      return `Số lượng không được vượt quá ${maxQty} (từ đơn hàng)`;
    }

    return null;
  };

  const handleAddItem = () => {
    setExtraItems([...extraItems, { itemName: "", qty: 1, unitPrice: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = extraItems.filter((_, i) => i !== index);
    setExtraItems(newItems);
    
    // ✅ Clear error for removed item
    const newErrors = { ...errors };
    delete newErrors[index];
    setErrors(newErrors);
  };

  const handleItemChange = (
    index: number,
    field: keyof ItemExtra,
    value: string | number
  ) => {
    const newItems = [...extraItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setExtraItems(newItems);

    // ✅ Validate if quantity changed
    if (field === "qty") {
      const qty = Number(value);
      const itemName = newItems[index].itemName;
      const error = validateQuantity(itemName, qty);

      console.log("🔍 Validating:", {
        itemName,
        qty,
        maxQty: maxQuantities[itemName],
        error
      });

      if (error) {
        setErrors({ ...errors, [index]: error });
      } else {
        const newErrors = { ...errors };
        delete newErrors[index];
        setErrors(newErrors);
      }
    }

    // ✅ Also validate when item name changes (in case qty was already invalid)
    if (field === "itemName") {
      const qty = newItems[index].qty;
      const itemName = String(value);
      const error = validateQuantity(itemName, qty);

      if (error) {
        setErrors({ ...errors, [index]: error });
      } else {
        const newErrors = { ...errors };
        delete newErrors[index];
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-5 border-2 border-emerald-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-green-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
            5
          </div>
          <h3 className="text-lg font-bold text-gray-900">
            Danh sách hàng hóa <span className="text-red-500">*</span>
          </h3>
        </div>
        <button
          type="button"
          onClick={handleAddItem}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all text-sm font-bold"
        >
          <FaPlus /> Thêm hàng hóa
        </button>
      </div>

      <div className="space-y-3">
        {extraItems.map((item, index) => (
          <ItemCard
            key={index}
            item={item}
            index={index}
            showRemove={extraItems.length > 1}
            onItemChange={handleItemChange}
            onRemove={handleRemoveItem}
            error={errors[index]} // ✅ Pass error
            maxQty={maxQuantities[item.itemName]} // ✅ Pass maxQty for display
          />
        ))}

        {extraItems.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">📦</div>
            <p className="text-sm">
              Chưa có hàng hóa nào. Nhấn Thêm hàng hóa để bắt đầu.
            </p>
          </div>
        )}
      </div>

      {/* ✅ Info Box */}
      {Object.keys(maxQuantities).length > 0 && (
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs text-blue-700 font-medium">
            💡 <strong>Lưu ý:</strong> Số lượng không được vượt quá số lượng
            trong đơn hàng ban đầu.
          </p>
        </div>
      )}

      {/* ✅ Show errors summary */}
      {Object.keys(errors).length > 0 && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-xs text-red-700 font-bold">
            ⚠️ Có {Object.keys(errors).length} lỗi cần sửa
          </p>
        </div>
      )}
    </div>
  );
};

export default ItemsListSection;