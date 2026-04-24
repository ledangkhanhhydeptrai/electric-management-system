// components/ContractTable/ContractExpandedDetails.tsx
import React from "react";
import { FaBox, FaStickyNote } from "react-icons/fa";

import ContractItemsTable from "./ContractItemsTable";
import ContractSummary from "./ContractSummary";
import { Contract } from "@/app/dealer-manager/contract/types/contract";

interface ContractExpandedDetailsProps {
  contract: Contract;
}

const ContractExpandedDetails: React.FC<ContractExpandedDetailsProps> = ({
  contract
}) => {
  return (
    <tr className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
      <td colSpan={7} className="px-6 py-4">
        <div className="space-y-4 animate-fadeIn">
          {/* Title với icon đẹp */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
              <FaBox className="text-base" />
            </div>
            <h3 className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Chi tiết sản phẩm/dịch vụ
            </h3>
          </div>

          {/* Items table */}
          <ContractItemsTable items={contract.items} />

          {/* Notes section */}
          {contract.notes && (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-3 border-l-4 border-amber-400 shadow-sm">
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-md flex-shrink-0">
                  <FaStickyNote className="text-xs" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-amber-800 mb-1">
                    Ghi chú
                  </h4>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    {contract.notes}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Summary cards */}
          <ContractSummary contract={contract} />
        </div>
      </td>
    </tr>
  );
};

export default ContractExpandedDetails;
