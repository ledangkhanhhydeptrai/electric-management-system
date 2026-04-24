// components/ContractTable/ContractActions.tsx
import { Contract } from "@/app/dealer-manager/contract/types/contract";
import React from "react";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaChevronDown,
  FaChevronUp,
  FaDownload,
  FaBan
} from "react-icons/fa";


interface ContractActionsProps {
  contract: Contract;
  isExpanded: boolean;
  onViewDetail: (id: string) => void;
  onEdit?: (contract: Contract) => void;
  onDelete?: (contract: Contract) => void;
  onDownload?: (id: string) => void;
  onToggleExpand: (id: string) => void;
  onOpenCancelModal: (id: string) => void;
}

const ContractActions: React.FC<ContractActionsProps> = ({
  contract,
  isExpanded,
  onViewDetail,
  onEdit,
  onDelete,
  onDownload,
  onToggleExpand,
  onOpenCancelModal
}) => {
  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      {/* Nút xem chi tiết */}
      <button
        onClick={() => onViewDetail(contract.id)}
        className="group relative p-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-md hover:shadow-xl transform hover:scale-110 transition-all duration-300"
        title="Xem chi tiết"
      >
        <FaEye className="text-sm" />
      </button>

      {/* Nút download */}
      {onDownload && (
        <button
          onClick={() => onDownload(contract.id)}
          className="group relative p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-md hover:shadow-xl transform hover:scale-110 transition-all duration-300"
          title="Tải xuống"
        >
          <FaDownload className="text-sm" />
        </button>
      )}

      {/* Nút expand/collapse */}
      <button
        onClick={() => onToggleExpand(contract.id)}
        className="group relative p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700 shadow-md hover:shadow-xl transform hover:scale-110 transition-all duration-300"
        title={isExpanded ? "Thu gọn" : "Mở rộng"}
      >
        {isExpanded ? (
          <FaChevronUp className="text-sm" />
        ) : (
          <FaChevronDown className="text-sm" />
        )}
      </button>

      {/* Nút hủy */}
      <button
        onClick={() => onOpenCancelModal(contract.id)}
        className="p-2 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-600 text-white hover:from-yellow-600 hover:to-orange-700 shadow-md hover:shadow-xl transform hover:scale-110 transition-all duration-300"
        title="Hủy hợp đồng"
      >
        <FaBan className="text-sm" />
      </button>

      {/* Nút sửa */}
      {onEdit && (
        <button
          onClick={() => onEdit(contract)}
          className="group relative p-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700 shadow-md hover:shadow-xl transform hover:scale-110 transition-all duration-300"
          title="Chỉnh sửa"
        >
          <FaEdit className="text-sm" />
        </button>
      )}

      {/* Nút xóa */}
      {onDelete && (
        <button
          onClick={() => onDelete(contract)}
          className="group relative p-2 rounded-lg bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-red-600 hover:to-rose-700 shadow-md hover:shadow-xl transform hover:scale-110 transition-all duration-300"
          title="Xóa"
        >
          <FaTrash className="text-sm" />
        </button>
      )}
    </div>
  );
};

export default ContractActions;