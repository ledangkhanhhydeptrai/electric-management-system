import React from "react";
import { Check } from "lucide-react";

interface ToastNotificationProps {
  message: string;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  message
}) => {
  return (
    <div className="fixed bottom-6 right-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50 animate-slideUp border border-gray-700">
      <div className="bg-green-500/20 p-2 rounded-lg">
        <Check className="w-5 h-5 text-green-400" />
      </div>
      <div>
        <p className="font-bold">{message}</p>
        <p className="text-xs text-gray-400">Đã lưu vào clipboard</p>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};
