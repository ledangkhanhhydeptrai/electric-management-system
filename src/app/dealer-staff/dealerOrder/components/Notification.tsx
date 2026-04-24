import React from "react";
import { CheckCircle, AlertCircle, X } from "lucide-react";

export interface NotificationProps {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  open,
  message,
  severity,
  onClose
}) => {
  if (!open) return null;

  return (
    <div className="fixed top-6 right-6 z-50 animate-slide-in-right">
      <div
        className={`bg-white rounded-xl shadow-2xl border-2 p-4 min-w-80 max-w-md ${severity ===
        "success"
          ? "border-emerald-200"
          : "border-red-200"}`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 ${severity ===
            "success"
              ? "bg-gradient-to-br from-emerald-500 to-teal-500"
              : "bg-gradient-to-br from-red-500 to-rose-500"}`}
          >
            {severity === "success"
              ? <CheckCircle size={20} className="text-white" />
              : <AlertCircle size={20} className="text-white" />}
          </div>
          <div className="flex-1">
            <div
              className={`font-bold mb-1 ${severity === "success"
                ? "text-emerald-900"
                : "text-red-900"}`}
            >
              {severity === "success" ? "Thành công!" : "Lỗi!"}
            </div>
            <div className="text-sm text-gray-600">
              {message}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
