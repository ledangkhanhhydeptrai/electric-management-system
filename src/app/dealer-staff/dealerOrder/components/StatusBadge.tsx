import React from "react";
import { CheckCircle, Clock, XCircle } from "lucide-react";

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusConfig: Record<
    string,
    { label: string; color: string; icon: React.ReactNode }
  > = {
    APPROVED: {
      label: "Đã duyệt",
      color: "bg-gradient-to-r from-green-500 to-emerald-600",
      icon: <CheckCircle className="w-4 h-4" />
    },
    PENDING: {
      label: "Chờ duyệt",
      color: "bg-gradient-to-r from-yellow-500 to-amber-600",
      icon: <Clock className="w-4 h-4" />
    },
    REJECTED: {
      label: "Từ chối",
      color: "bg-gradient-to-r from-red-500 to-rose-600",
      icon: <XCircle className="w-4 h-4" />
    }
  };

  const config = statusConfig[status] || statusConfig.PENDING;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-sm font-medium ${config.color} shadow-lg`}
    >
      {config.icon}
      {config.label}
    </span>
  );
};

export default StatusBadge;
