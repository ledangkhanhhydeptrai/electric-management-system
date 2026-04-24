// components/ContractTable/ContractCancelModal.tsx
import React from "react";

interface ContractCancelModalProps {
  isOpen: boolean;
  reason: string;
  onReasonChange: (reason: string) => void;
  onConfirm: () => void;
  onClose: () => void;
}

const ContractCancelModal: React.FC<ContractCancelModalProps> = ({
  isOpen,
  reason,
  onReasonChange,
  onConfirm,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white p-5 rounded-2xl shadow-2xl w-[380px]">
        <h3 className="text-base font-bold mb-3 text-gray-800">
          Lý do hủy hợp đồng
        </h3>
        <textarea
          value={reason}
          onChange={(e) => onReasonChange(e.target.value)}
          placeholder="Nhập lý do hủy..."
          className="w-full text-sm border border-gray-300 rounded-lg p-2 mb-3 focus:ring-2 focus:ring-red-400"
          rows={3}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-yellow-500 to-orange-600 text-white hover:from-yellow-600 hover:to-orange-700"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContractCancelModal;
