import React from "react";
import {
  Package,
  Percent,
  X,
  TrendingDown,
  CheckCircle,
  Minus,
  Plus,
  Save
} from "lucide-react";

interface StatusPopupDiscountAmountProps {
  onUpdate: () => void;
  quantity: number;
  setQuantity: (value: number) => void;
  discountAmount: number;
  setDiscountAmount: (value: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

const StatusPopupDiscountAmount: React.FC<StatusPopupDiscountAmountProps> = ({
  onUpdate,
  quantity,
  setQuantity,
  discountAmount,
  setDiscountAmount,
  isOpen = true,
  onClose
}) => {
  if (!isOpen) return null;

  const formatCurrency = (amount: number) => amount.toLocaleString("vi-VN");

  const handleQuantityChange = (value: string) => {
    const numValue = parseInt(value) || 0;
    setQuantity(numValue);
  };

  const handleDiscountChange = (value: string) => {
    const numValue = parseInt(value.replace(/\D/g, "")) || 0;
    setDiscountAmount(numValue);
  };

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleSave = () => {
    onUpdate(); // gọi update
    onClose();  // đóng popup
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={handleOverlayClick}
    >
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-scale-in border border-gray-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white drop-shadow-lg">
                  Cập nhật đơn hàng
                </h3>
                <p className="text-sm text-white/90 font-medium">
                  Chỉnh sửa số lượng & giảm giá
                </p>
              </div>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-200 hover:rotate-90"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Quantity Card */}
          <div className="group relative bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-5 border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 overflow-hidden">
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-blue-600 uppercase">
                    Số lượng
                  </p>
                  <p className="text-sm text-blue-500 font-medium">
                    Nhập số lượng sản phẩm
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="w-11 h-11 bg-white border-2 border-blue-300 rounded-xl flex items-center justify-center text-blue-600 hover:bg-blue-100 hover:border-blue-400 transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <Minus className="w-5 h-5" />
                </button>

                <div className="flex-1 relative">
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(e.target.value)}
                    min="1"
                    className="w-full px-4 py-3 text-center text-2xl font-black bg-white border-2 rounded-xl text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all border-blue-300"
                    placeholder="0"
                  />
                </div>

                <button
                  onClick={incrementQuantity}
                  className="w-11 h-11 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-5 pt-4 border-t border-blue-200">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-blue-600 font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    Tổng số lượng
                  </p>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 rounded-lg border border-blue-300">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold text-blue-700">
                      {quantity} SP
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Discount Amount Card */}
          <div className="group relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 border-2 border-purple-200 hover:border-purple-300 transition-all duration-300 overflow-hidden">
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <TrendingDown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-purple-600 uppercase">
                    Giảm giá
                  </p>
                  <p className="text-sm text-purple-500 font-medium">
                    Nhập số tiền giảm giá
                  </p>
                </div>
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={formatCurrency(discountAmount)}
                  onChange={(e) => handleDiscountChange(e.target.value)}
                  className="w-full px-4 py-3 pr-12 text-center text-2xl font-black bg-white border-2 rounded-xl text-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all border-purple-300"
                  placeholder="0"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl font-bold text-purple-400">
                  đ
                </span>
              </div>

              <div className="mt-5 pt-4 border-t border-purple-200">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-purple-600 font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                    Số tiền được giảm
                  </p>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-100 rounded-lg border border-purple-300">
                    <Percent className="w-3 h-3 text-purple-600" />
                    <span className="text-xs font-bold text-purple-700">
                      {formatCurrency(discountAmount)} đ
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-100 hover:border-gray-400 active:scale-95 transition-all duration-200"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusPopupDiscountAmount;
