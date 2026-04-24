// components/ContractTable/ContractTableHeader.tsx
import React from "react";
import {
  FaFileContract,
  FaUser,
  FaCar,
  FaMoneyBillWave,
  FaCalendarAlt
} from "react-icons/fa";

const ContractTableHeader: React.FC = () => {
  return (
    <thead>
      <tr className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <FaFileContract className="text-blue-200 text-xs" />
            Mã hợp đồng
          </div>
        </th>
        <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <FaUser className="text-blue-200 text-xs" />
            Khách hàng
          </div>
        </th>
        <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <FaCar className="text-blue-200 text-xs" />
            Phương tiện
          </div>
        </th>
        <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <FaMoneyBillWave className="text-blue-200 text-xs" />
            Giá trị
          </div>
        </th>
        <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-blue-200 text-xs" />
            Ngày ký
          </div>
        </th>
        <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">
          Trạng thái
        </th>
        <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider">
          Thao tác
        </th>
      </tr>
    </thead>
  );
};

export default ContractTableHeader;
