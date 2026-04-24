"use client";
import React, { useEffect } from "react";

type ManagerProps = {
  onClose: () => void;
  children: React.ReactNode;
  isOpen: boolean;
};

export default function Modal({ onClose, children, isOpen }: ManagerProps) {
  // 🚫 Chặn scroll nền khi mở modal
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // 🔄 Dọn dẹp khi component unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl z-10"
        >
          ✕
        </button>
        <div className="overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
