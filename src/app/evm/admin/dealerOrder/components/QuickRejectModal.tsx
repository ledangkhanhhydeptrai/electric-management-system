import React from "react";
import { X, Ban, AlertTriangle } from "lucide-react";

interface QuickRejectModalProps {
  isOpen: boolean;
  orderName: string;
  reason: string;
  onClose: () => void;
  onReasonChange: (reason: string) => void;
  onConfirm: () => void;
}

export const QuickRejectModal: React.FC<QuickRejectModalProps> = ({
  isOpen,
  orderName,
  reason,
  onClose,
  onReasonChange,
  onConfirm
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-gradient-to-br from-red-900 via-rose-800 to-red-900 p-1 rounded-3xl max-w-md w-full shadow-2xl shadow-red-500/20 animate-scale-in">
        <div className="bg-gradient-to-br from-red-900/95 to-rose-800/95 rounded-3xl p-8 backdrop-blur-xl border border-white/10 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-400 hover:text-white transition-all duration-300 flex items-center justify-center group"
          >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-br from-red-500/20 to-rose-600/20 border border-red-500/30">
              <Ban className="w-10 h-10 text-red-400" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-center mb-3">
            <span className="bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent">
              Từ chối nhanh
            </span>
          </h3>

          {/* Message */}
          <p className="text-gray-300 text-center mb-6">
            Bạn có chắc chắn muốn{" "}
            <span className="font-semibold text-white">từ chối</span> đơn hàng
            của{" "}
            <span className="font-semibold text-red-400">{orderName}</span>?
          </p>

          {/* Reason Input */}
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Lý do từ chối <span className="text-red-400">*</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => onReasonChange(e.target.value)}
              placeholder="Nhập lý do từ chối đơn hàng..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition-all resize-none"
            />
          </div>

          {/* Warning Box */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
            <p className="text-red-400 text-sm flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>
                Hành động này sẽ từ chối đơn hàng và không thể hoàn tác!
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
              disabled={!reason.trim()}
              className="flex-1 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg hover:scale-105 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-red-500/30 hover:shadow-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Từ chối ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};