// components/ContractTable/ContractTableRow.tsx
import React from "react";
import {
  FaMoneyBillWave,
  FaCalendarAlt,
  FaCar
} from "react-icons/fa";

import { Car } from "@/app/evm/admin/cars/types";
import { CustomerVIP } from "@/app/evm/admin/customer/types/customer";
import ContractActions from "./ContractActions";
import ContractExpandedDetails from "./ContractExpandedDetails";
import StatusBadge from "../../StatusBadge";
import { Contract } from "@/app/dealer-manager/contract/types/contract";

interface ContractTableRowProps {
  contract: Contract;
  isExpanded: boolean;
  customers: CustomerVIP[];
  vehicles: Car[];
  onViewDetail: (id: string) => void;
  onEdit?: (contract: Contract) => void;
  onDelete?: (contract: Contract) => void;
  onDownload?: (id: string) => void;
  onToggleExpand: (id: string) => void;
  onOpenCancelModal: (id: string) => void;
}

const ContractTableRow: React.FC<ContractTableRowProps> = ({
  contract,
  isExpanded,
  customers,
  vehicles,
  onViewDetail,
  onEdit,
  onDelete,
  onDownload,
  onToggleExpand,
  onOpenCancelModal
}) => {
  const formatPrice = (contract: Contract) => {
    const totalValue =
      contract.total || contract.subtotal + contract.vat - contract.discount;
    return (totalValue / 1000000).toLocaleString("vi-VN");
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Chưa ký";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  };

  const getCustomerName = (contract: Contract) => {
    const customer = customers.find((c) => c.id === contract.buyerId);
    if (customer) return customer.fullName;
    if (contract.buyerId) return `KH-${contract.buyerId.slice(0, 8)}`;
    return "Không rõ khách hàng";
  };

  const getVehicleInfo = (contract: Contract) => {
    const vehicle = vehicles.find((v) => v.id === contract.vehicleId);
    if (vehicle) {
      return vehicle.vin || vehicle.modelName || `Xe-${vehicle.code}`;
    }
    return "Không rõ xe";
  };

  return (
    <React.Fragment>
      {/* Main row */}
      <tr className="group hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 ease-in-out">
        <td className="px-4 py-3 whitespace-nowrap">
          <div className="flex items-center gap-2">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              {contract.code}
            </span>
          </div>
        </td>
        <td className="px-4 py-3 whitespace-nowrap">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shadow-lg">
              {getCustomerName(contract).charAt(0)}
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-900">
                {getCustomerName(contract)}
              </div>
            </div>
          </div>
        </td>
        <td className="px-4 py-3 whitespace-nowrap">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-md">
              <FaCar className="text-white text-xs" />
            </div>
            <span className="text-xs font-medium text-gray-800">
              {getVehicleInfo(contract)}
            </span>
          </div>
        </td>
        <td className="px-4 py-3 whitespace-nowrap">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-md">
              <FaMoneyBillWave className="text-white text-xs" />
            </div>
            <div>
              <div className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                {formatPrice(contract)} triệu
              </div>
              <div className="text-xs text-gray-500">VND</div>
            </div>
          </div>
        </td>
        <td className="px-4 py-3 whitespace-nowrap">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-md">
              <FaCalendarAlt className="text-xs" />
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-900">
                {formatDate(contract.signedAt)}
              </div>
              <div className="text-xs text-gray-500">
                {contract.signedAt ? "Đã ký" : "Chưa ký"}
              </div>
            </div>
          </div>
        </td>
        <td className="px-4 py-3 whitespace-nowrap">
          <StatusBadge status={contract.status} />
        </td>
        <td className="px-4 py-3 whitespace-nowrap text-center">
          <ContractActions
            contract={contract}
            isExpanded={isExpanded}
            onViewDetail={onViewDetail}
            onEdit={onEdit}
            onDelete={onDelete}
            onDownload={onDownload}
            onToggleExpand={onToggleExpand}
            onOpenCancelModal={onOpenCancelModal}
          />
        </td>
      </tr>

      {/* Expanded details */}
      {isExpanded && <ContractExpandedDetails contract={contract} />}
    </React.Fragment>
  );
};

export default ContractTableRow;