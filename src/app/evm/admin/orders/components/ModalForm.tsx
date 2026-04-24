import React from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { ItemProps, OrderProps } from "@/services/orderService/order";
import { InventoryItem } from "../../inventories/types/types";
import { CustomerVIP } from "@/app/evm/admin/customer/types/customer";

interface OrderModalProps {
  customers: CustomerVIP[];
  isOpen: boolean;
  onClose: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  inventories: InventoryItem[];
  customerId: string;
  setCustomerId: (v: string) => void;
  items: ItemProps[];
  setItems: React.Dispatch<React.SetStateAction<ItemProps[]>>;
  mode: "create" | "edit";
  initialData?: OrderProps;
}

const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  handleSubmit,
  customerId,
  setCustomerId,
  items,
  setItems,
  inventories,
  mode = "create",
  initialData,
  customers
}) => {
  React.useEffect(() => {
    if (mode === "edit" && initialData) {
      setCustomerId(initialData.customerId);
      setItems(initialData.items || []);
    }
  }, [mode, initialData, setCustomerId, setItems]);

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      { inventoryId: "", discountAmount: 0, quantity: 1 }
    ]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length > 1) setItems(items.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white p-8">
          <div className="relative flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">
                  {mode === "edit" ? "✏️" : "🛒"}
                </div>
                <h2 className="text-3xl font-bold">
                  {mode === "edit" ? "Chỉnh sửa đơn hàng" : "Tạo đơn hàng mới"}
                </h2>
              </div>
              <p className="text-blue-50 text-sm">
                {mode === "edit"
                  ? "Cập nhật thông tin đơn hàng"
                  : "Điền thông tin để tạo đơn hàng mới"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-8 space-y-6 overflow-y-auto max-h-[calc(90vh-280px)]">
            {/* Basic Info */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                ℹ️ Thông tin cơ bản
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                  className="border p-2 rounded w-full"
                >
                  <option value="">-- Chọn khách hàng --</option>
                  {customers.map((c) => (
                    <option key={c.id} value={c.phone}>
                      {c.fullName} - {c.phone}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Items */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  📦 Chi tiết sản phẩm
                </h3>
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold flex items-center gap-2 text-sm"
                >
                  <Plus className="w-4 h-4" /> Thêm sản phẩm
                </button>
              </div>

              <div className="space-y-4">
                {items.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="bg-white border-2 border-gray-200 rounded-2xl p-5 hover:border-purple-300 transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                            {index + 1}
                          </div>
                          <span className="text-sm font-semibold text-gray-700">
                            Sản phẩm #{index + 1}
                          </span>
                        </div>
                        {items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(index)}
                            className="w-8 h-8 bg-red-100 hover:bg-red-200 rounded-lg flex items-center justify-center text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-bold mb-2">
                            Sản phẩm *
                          </label>
                          <select
                            value={item.inventoryId}
                            onChange={(e) =>
                              setItems((prev) =>
                                prev.map((it, i) =>
                                  i === index
                                    ? { ...it, inventoryId: e.target.value }
                                    : it
                                )
                              )
                            }
                            className="w-full px-5 py-3.5 border-2 rounded-xl border-gray-200 hover:border-gray-300 focus:ring-4 focus:ring-purple-100 focus:border-purple-500 outline-none"
                          >
                            <option value="">-- Chọn sản phẩm --</option>
                            {inventories.map((inv) => (
                              <option key={inv.id} value={inv.id}>
                                {inv.vehicleModelName}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-bold mb-2">
                            Số lượng *
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setItems((prev) =>
                                prev.map((it, i) =>
                                  i === index
                                    ? {
                                        ...it,
                                        quantity: Number(e.target.value)
                                      }
                                    : it
                                )
                              )
                            }
                            className="w-full px-5 py-3.5 border-2 rounded-xl border-gray-200 hover:border-gray-300 focus:ring-4 focus:ring-purple-100 focus:border-purple-500 outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-bold mb-2">
                            Giảm giá (VNĐ)
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={item.discountAmount}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setItems((prev) =>
                                prev.map((it, i) =>
                                  i === index
                                    ? {
                                        ...it,
                                        discountAmount: Number(e.target.value)
                                      }
                                    : it
                                )
                              )
                            }
                            className="w-full px-5 py-3.5 border-2 rounded-xl border-gray-200 hover:border-gray-300 focus:ring-4 focus:ring-purple-100 focus:border-purple-500 outline-none"
                          />
                        </div>
                      </div>

                      {/* {inventory && (
                        <div className="mt-4 space-y-3">
                          <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
                            <Package className="w-5 h-5 text-indigo-600" />
                            <div className="flex-1">
                              <p className="text-xs text-gray-600 mb-1">
                                Inventory ID
                              </p>
                              <p className="text-sm font-mono font-semibold text-indigo-600 break-all">
                                {item.inventoryId}
                              </p>
                            </div>
                          </div>
                        </div>
                      )} */}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 p-6 bg-gray-50/50 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white rounded-xl font-semibold flex items-center gap-2"
            >
              {mode === "edit" ? "💾 Cập nhật đơn hàng" : "✅ Tạo đơn hàng"}
            </button>
          </div>
        </form>

        {/* Footer */}
      </div>
    </div>
  );
};

export default OrderModal;
