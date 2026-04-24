"use client";
import React from "react";
import { CheckCircle, AlertCircle, X } from "lucide-react";

interface NotificationToastProps {
  open: boolean;
  message: string;
  severity: "success" | "error";
  onClose: () => void;
}

export default function NotificationToast({
  open,
  message,
  severity,
  onClose
}: NotificationToastProps) {
  React.useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  if (!open) return null;

  const config = {
    success: {
      bg: "bg-emerald-600",
      icon: CheckCircle,
      border: "border-emerald-400",
      progressBg: "bg-emerald-400"
    },
    error: {
      bg: "bg-red-600",
      icon: AlertCircle,
      border: "border-red-400",
      progressBg: "bg-red-400"
    }
  };

  const { bg, icon: Icon, border, progressBg } = config[severity];

  return (
    <>
      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes progress {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            transform: translateX(-4px);
          }
          20%,
          40%,
          60%,
          80% {
            transform: translateX(4px);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }

        .toast-enter {
          animation: slideInRight 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .toast-error {
          animation: slideInRight 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
            shake 0.5s ease-in-out 0.5s;
        }

        .progress-bar {
          animation: progress 5s linear;
        }

        .pulse-animation {
          animation: pulse 1.5s ease-in-out infinite;
        }
      `}</style>

      <div
        className={`fixed top-18 right-6 z-[99999] ${
          severity === "error" ? "toast-error" : "toast-enter"
        }`}
      >
        <div
          className={`${bg} text-white rounded-3xl shadow-2xl overflow-hidden border-4 ${border} min-w-[380px] max-w-md`}
        >
          {/* Main Content */}
          <div className="flex items-center gap-5 p-6">
            {/* Icon Container */}
            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white/30 backdrop-blur-sm flex items-center justify-center pulse-animation shadow-lg">
              <Icon className="w-9 h-9" strokeWidth={2.5} />
            </div>

            {/* Message */}
            <div className="flex-1 pr-2">
              <h3 className="font-bold text-lg mb-1">
                {severity === "success" ? "Thành công!" : "Có lỗi xảy ra!"}
              </h3>
              <p className="font-semibold text-sm leading-relaxed opacity-95">
                {message}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/30 transition-all duration-200 group"
            >
              <X
                className="w-6 h-6 group-hover:scale-110 group-hover:rotate-90 transition-all"
                strokeWidth={2.5}
              />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-black/20">
            <div className={`progress-bar h-full ${progressBg} shadow-inner`} />
          </div>
        </div>
      </div>
    </>
  );
}
