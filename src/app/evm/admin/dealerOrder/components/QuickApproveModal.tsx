import React from "react";
import { X, Zap } from "lucide-react";

interface QuickApproveModalProps {
  isOpen: boolean;
  orderName: string;
  onClose: () => void;
  onConfirm: () => void;
}

export const QuickApproveModal: React.FC<QuickApproveModalProps> = ({
  isOpen,
  orderName,
  onClose,
  onConfirm
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-gradient-to-br from-green-900 via-emerald-800 to-green-900 p-1 rounded-3xl max-w-md w-full shadow-2xl shadow-green-500/20 animate-scale-in">
        <div className="bg-gradient-to-br from-green-900/95 to-emerald-800/95 rounded-3xl p-8 backdrop-blur-xl border border-white/10 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-400 hover:text-white transition-all duration-300 flex items-center justify-center group"
          >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-500/30">
              <Zap className="w-10 h-10 text-green-400" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-center mb-3">
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Phê duyệt nhanh
            </span>
          </h3>

          {/* Message */}
          <p className="text-gray-300 text-center mb-6">
            Bạn có chắc chắn muốn{" "}
            <span className="font-semibold text-white">phê duyệt nhanh</span>{" "}
            đơn hàng của{" "}
            <span className="font-semibold text-green-400">{orderName}</span>?
          </p>

          {/* Info Box */}
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-6">
            <p className="text-green-400 text-sm flex items-start gap-2">
              <Zap className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>
                Chức năng phê duyệt nhanh sẽ tự động xử lý đơn hàng mà không cần
                xem chi tiết!
              </span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white font-medium transition-all duration-300"
            >
              Hủy bỏ
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg hover:scale-105 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-green-500/30 hover:shadow-green-500/50"
            >
              Phê duyệt ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};