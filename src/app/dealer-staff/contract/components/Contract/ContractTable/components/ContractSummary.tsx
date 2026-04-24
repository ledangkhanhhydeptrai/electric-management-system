// components/ContractTable/ContractSummary.tsx
import { Contract } from "@/app/dealer-manager/contract/types/contract";
import React from "react";

interface ContractSummaryProps {
  contract: Contract;
}

const ContractSummary: React.FC<ContractSummaryProps> = ({ contract }) => {
  return (
    <div className="grid grid-cols-3 gap-3 mt-4">
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-3 text-white shadow-lg">
        <div className="text-xs font-semibold opacity-80 mb-1">Subtotal</div>
        <div className="text-sm font-bold">
          {(contract.subtotal / 1000000).toLocaleString("vi-VN")}M
        </div>
      </div>
      <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-xl p-3 text-white shadow-lg">
        <div className="text-xs font-semibold opacity-80 mb-1">Giảm giá</div>
        <div className="text-sm font-bold">
          -{(contract.discount / 1000000).toLocaleString("vi-VN")}M
        </div>
      </div>
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-3 text-white shadow-lg">
        <div className="text-xs font-semibold opacity-80 mb-1">
          VAT ({(contract.vat ).toFixed(0)}%)
        </div>
        <div className="text-sm font-bold">
          {(
            ((contract.subtotal - contract.discount) * contract.vat) /
            1000000
          ).toLocaleString("vi-VN")}
          M
        </div>
      </div>
    </div>
  );
};

export default ContractSummary;
