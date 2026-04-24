"use client";
import React from "react";
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

interface NotificationProps {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
  onClose: () => void;
}

export default function Notification({
  open,
  message,
  severity,
  onClose
}: NotificationProps) {
  React.useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
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
    },
    info: {
      bg: "bg-blue-600",
      icon: Info,
      border: "border-blue-400",
      progressBg: "bg-blue-400"
    },
    warning: {
      bg: "bg-orange-600",
      icon: AlertTriangle,
      border: "border-orange-400",
      progressBg: "bg-orange-400"
    }
  };

  const { bg, icon: Icon, border, progressBg } = config[severity];

  return (
    <>
      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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

        .notification-enter {
          animation: slideInRight 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .progress-bar {
          animation: progress 4s linear;
        }
      `}</style>

      <div className="fixed top-6 right-6 z-[100000] notification-enter">
        <div
          className={`relative ${bg} text-white rounded-2xl shadow-2xl overflow-hidden border-2 ${border} min-w-[320px] max-w-md`}
        >
          {/* Content */}
          <div className="flex items-center gap-4 p-5">
            {/* Icon */}
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
              <Icon className="w-7 h-7" strokeWidth={2.5} />
            </div>

            {/* Message */}
            <p className="flex-1 font-bold text-base leading-relaxed pr-2 drop-shadow-sm">
              {message}
            </p>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/30 transition-colors group"
            >
              <X
                className="w-5 h-5 group-hover:scale-110 transition-transform"
                strokeWidth={2.5}
              />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="h-1.5 bg-black/20">
            <div className={`progress-bar h-full ${progressBg}`} />
          </div>
        </div>
      </div>
    </>
  );
}
