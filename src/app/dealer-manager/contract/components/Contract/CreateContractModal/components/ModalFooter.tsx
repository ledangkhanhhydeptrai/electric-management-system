// components/Contract/ContractModal/ModalFooter.tsx
import React from "react";

interface ModalFooterProps {
  itemsCount: number;
  onClose: () => void;
}

const ModalFooter: React.FC<ModalFooterProps> = ({ itemsCount, onClose }) => {
  return (
    <div className="border-t-2 border-gray-100 bg-gradient-to-r from-gray-50 to-slate-50 p-6 flex items-center justify-between">
      <div className="text-sm text-gray-600">
        <span className="font-medium">Tổng số hàng hóa:</span>{" "}
        <span className="font-bold text-indigo-600">{itemsCount}</span>
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 hover:border-gray-400 active:scale-95 transition-all duration-200 font-bold"
        >
          ❌ Hủy
        </button>
        <button
          type="submit"
          className="px-8 py-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-700 text-white rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 hover:-translate-y-1 active:translate-y-0 transition-all duration-200 font-bold flex items-center gap-2"
        >
          <span>✅</span>
          <span>Tạo hợp đồng</span>
        </button>
      </div>
    </div>
  );
};

export default ModalFooter;
