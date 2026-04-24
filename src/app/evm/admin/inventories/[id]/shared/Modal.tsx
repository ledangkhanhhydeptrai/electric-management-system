import React from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  maxWidth = "max-w-5xl" // Changed from max-w-4xl to max-w-5xl for larger modal
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={`relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-2xl border border-white/10 ${maxWidth} w-full max-h-[90vh] overflow-hidden animate-scale-in`}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-8 border-b border-white/10">
            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-700 to-slate-600 hover:from-red-500 hover:to-rose-600 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90 border border-white/10 shadow-lg"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="overflow-y-auto max-h-[calc(90vh-100px)] p-8">
          {children}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};