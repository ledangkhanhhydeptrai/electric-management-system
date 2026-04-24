// components/Contract/ContractModal/ContractModalHeader.tsx
import React from "react";
import { FaTimes } from "react-icons/fa";

interface ContractModalHeaderProps {
  contractId?: string;
  onClose: () => void;
}

const ContractModalHeader: React.FC<ContractModalHeaderProps> = ({
  contractId,
  onClose
}) => {
  return (
    <div className="relative bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 text-white p-6 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-white opacity-10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-white/20 rounded-2xl blur-lg group-hover:blur-xl transition-all"></div>
            <div className="relative w-14 h-14 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center text-3xl border-2 border-white/30 shadow-2xl group-hover:scale-110 transition-transform">
              📝
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold drop-shadow-md mb-1">
              Tạo hợp đồng mới
            </h2>
            <p className="text-purple-100 text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              {contractId
                ? `Hợp đồng: ${contractId}`
                : "Điền thông tin để tạo hợp đồng"}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white hover:bg-white/20 rounded-xl p-2.5 transition-all hover:rotate-90 duration-300"
        >
          <FaTimes size={24} />
        </button>
      </div>

      <style jsx>{`
        .bg-grid-white {
          background-image: linear-gradient(
              to right,
              rgba(255, 255, 255, 0.1) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0.1) 1px,
              transparent 1px
            );
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
};

export default ContractModalHeader;
