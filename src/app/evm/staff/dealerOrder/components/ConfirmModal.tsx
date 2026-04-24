import React from "react";
import { X, ThumbsUp, AlertTriangle } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  action: "APPROVED" | "REJECTED" | null;
  orderName: string;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  action,
  orderName,
  onClose,
  onConfirm
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-1 rounded-3xl max-w-md w-full shadow-2xl shadow-blue-500/20 animate-scale-in">
        <div className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 rounded-3xl p-8 backdrop-blur-xl border border-white/10 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-400 hover:text-white transition-all duration-300 flex items-center justify-center group"
          >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div
              className={`w-20 h-20 rounded-2xl flex items-center justify-center ${
                action === "APPROVED"
                  ? "bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-500/30"
                  : "bg-gradient-to-br from-red-500/20 to-rose-600/20 border border-red-500/30"
              }`}
            >
              {action === "APPROVED" ? (
                <ThumbsUp className="w-10 h-10 text-green-400" />
              ) : (
                <AlertTriangle className="w-10 h-10 text-red-400" />
              )}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-center mb-3">
            <span
              className={`bg-gradient-to-r ${
                action === "APPROVED"
                  ? "from-green-400 to-emerald-400"
                  : "from-red-400 to-rose-400"
              } bg-clip-text text-transparent`}
            >
              Xác nhận {action === "APPROVED" ? "phê duyệt" : "từ chối"}
            </span>
          </h3>

          {/* Message */}
          <p className="text-gray-300 text-center mb-6">
            Bạn có chắc chắn muốn{" "}
            <span className="font-semibold text-white">
              {action === "APPROVED" ? "phê duyệt" : "từ chối"}
            </span>{" "}
            đơn hàng của{" "}
            <span className="font-semibold text-blue-400">{orderName}</span>?
          </p>

          {/* Warning for reject */}
          {action === "REJECTED" && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
              <p className="text-red-400 text-sm flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  Hành động này sẽ từ chối đơn hàng và không thể hoàn tác!
                </span>
              </p>
            </div>
          )}

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
              className={`flex-1 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg hover:scale-105 ${
                action === "APPROVED"
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-green-500/30 hover:shadow-green-500/50"
                  : "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-red-500/30 hover:shadow-red-500/50"
              }`}
            >
              {action === "APPROVED" ? "Phê duyệt" : "Từ chối"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};