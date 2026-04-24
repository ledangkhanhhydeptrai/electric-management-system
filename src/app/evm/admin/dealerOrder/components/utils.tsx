import React from "react";
import { CheckCircle, Clock, XCircle, AlertTriangle } from "lucide-react";
import { ItemProps } from "@/services/dealerOrderService/dealerOrder";

// 🔹 Định dạng ngày giờ DD/MM/YYYY HH:mm
export const formatDate = (dateArray: number[]): string => {
  const [year, month, day, hour, minute] = dateArray;
  return `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year} ${hour
    .toString()
    .padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
};

// 🔹 Tính tổng số lượng sản phẩm
export const getTotalQuantity = (items: ItemProps[]): number => {
  return items.reduce((sum, item) => sum + item.quantity, 0);
};

// 🔹 Component StatusBadge
interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusConfig: Record<
    string,
    { label: string; color: string; icon: React.ReactNode; glow: string }
  > = {
    APPROVED: {
      label: "Đã duyệt",
      color: "bg-gradient-to-r from-green-500 to-emerald-600",
      icon: <CheckCircle className="w-4 h-4" />,
      glow: "shadow-green-500/50"
    },
    REQUESTED: {
      label: "Chờ duyệt",
      color: "bg-gradient-to-r from-yellow-500 to-amber-600",
      icon: <Clock className="w-4 h-4" />,
      glow: "shadow-yellow-500/50"
    },
    REJECTED: {
      label: "Từ chối",
      color: "bg-gradient-to-r from-red-500 to-rose-600",
      icon: <XCircle className="w-4 h-4" />,
      glow: "shadow-red-500/50"
    }
  };

  const config = statusConfig[status] || {
    label: "Không xác định",
    color: "bg-gradient-to-r from-gray-500 to-slate-600",
    icon: <AlertTriangle className="w-4 h-4" />,
    glow: "shadow-gray-500/50"
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-white text-sm font-semibold ${config.color} shadow-md ${config.glow} hover:-translate-y-0.5 transition-all duration-300`}
    >
      {config.icon}
      {config.label}
    </span>
  );
};

// 🔹 Component ColorDisplay
interface ColorDisplayProps {
  color: string;
}

export const ColorDisplay: React.FC<ColorDisplayProps> = ({ color }) => {
  const colorMap: Record<string, { label: string; bg: string }> = {
    BLUE: { label: "Xanh dương", bg: "bg-blue-500" },
    RED: { label: "Đỏ", bg: "bg-red-500" },
    BLACK: { label: "Đen", bg: "bg-gray-900" },
    WHITE: { label: "Trắng", bg: "bg-gray-100 border border-gray-300" },
    SILVER: { label: "Bạc", bg: "bg-gray-400" }
  };

  const colorInfo = colorMap[color] || { label: color, bg: "bg-gray-500" };

  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-6 h-6 rounded-full ${colorInfo.bg} shadow-md ring-1 ring-gray-300`}
      />
      <span className="text-sm font-medium text-gray-800">
        {colorInfo.label}
      </span>
    </div>
  );
};
