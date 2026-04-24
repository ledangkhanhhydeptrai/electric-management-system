import React from "react";
type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
  isOpen: boolean;
};
export default function Modal({ onClose, children, isOpen }: ModalProps) {
  if (isOpen !== true) {
    return null;
  }
  return (
    <div className="-mt-10 fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="mt-10 bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
