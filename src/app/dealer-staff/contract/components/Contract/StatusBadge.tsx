import React from "react";
import { FaEdit, FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Contract } from "../../types/contract";

interface StatusBadgeProps {
  status: Contract["status"];
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const styles: Record<Contract["status"], React.ReactNode> = {
    DRAFT: "bg-gray-100 text-gray-800 border-gray-300",
    PENDING: "bg-blue-100 text-blue-800 border-blue-300",
    COMPLETED: "bg-green-100 text-green-800 border-green-300",
    CANCELLED: "bg-red-100 text-red-800 border-red-300"
  };

  const icons: Record<Contract["status"], React.ReactNode> = {
    DRAFT: <FaEdit className="inline mr-1" />,
    PENDING: <FaClock className="inline mr-1" />,
    COMPLETED: <FaCheckCircle className="inline mr-1" />,
    CANCELLED: <FaTimesCircle className="inline mr-1" />
  };

  const labels: Record<Contract["status"], React.ReactNode> = {
    DRAFT: "Nháp",
    PENDING: "Đang thực hiện",
    COMPLETED: "Hoàn thành",
    CANCELLED: "Đã hủy"
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center border ${styles[
        status
      ]}`}
    >
      {icons[status]}
      {labels[status]}
    </span>
  );
};

export default StatusBadge;
