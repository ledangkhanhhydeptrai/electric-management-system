import React from "react";
import { getStatusConfig } from "../utils/order.util";

interface StatusBadgeProps {
  status: string;
  onEdit?: () => void; // nên để optional để có thể dùng Badge ở nhiều nơi
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, onEdit }) => {
  const config = getStatusConfig(status);

  return (
    <span
      onClick={onEdit}
      className={`px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text} ${
        onEdit ? "cursor-pointer hover:opacity-80 transition" : ""
      }`}
    >
      {config.label}
    </span>
  );
};

export default StatusBadge;
