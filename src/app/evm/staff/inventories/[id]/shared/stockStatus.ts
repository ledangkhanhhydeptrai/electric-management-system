import { AlertCircle, CheckCircle, Activity } from "lucide-react";
import { InventoryItem } from "../../types/types";
import React from "react";

export interface StockStatus {
  status: string;
  color: string;
  icon: React.ElementType;
  bgColor: string;
  textColor: string;
  badgeBg: string;
  borderColor: string;
  glowColor: string;
}

export const getStockStatus = (item: InventoryItem): StockStatus => {
  const available = item.available || 0;
  const qtyOnHand = item.qtyOnHand || 0;

  if (available === 0) {
    return {
      status: "Hết hàng",
      color: "red",
      icon: AlertCircle,
      bgColor: "from-rose-500 via-pink-500 to-fuchsia-500",
      textColor: "text-rose-100",
      badgeBg: "bg-rose-500/20",
      borderColor: "border-rose-400/50",
      glowColor: "shadow-rose-500/60"
    };
  }

  const percentage = qtyOnHand > 0 ? (available / qtyOnHand) * 100 : 0;

  if (percentage < 30) {
    return {
      status: "Tồn kho thấp",
      color: "orange",
      icon: AlertCircle,
      bgColor: "from-orange-500 via-amber-500 to-yellow-500",
      textColor: "text-orange-100",
      badgeBg: "bg-orange-500/20",
      borderColor: "border-orange-400/50",
      glowColor: "shadow-orange-500/60"
    };
  } else if (percentage < 70) {
    return {
      status: "Tồn kho trung bình",
      color: "yellow",
      icon: Activity,
      bgColor: "from-yellow-500 via-amber-400 to-orange-400",
      textColor: "text-yellow-100",
      badgeBg: "bg-yellow-500/20",
      borderColor: "border-yellow-400/50",
      glowColor: "shadow-yellow-500/60"
    };
  }

  return {
    status: "Tồn kho tốt",
    color: "green",
    icon: CheckCircle,
    bgColor: "from-emerald-500 via-teal-500 to-cyan-500",
    textColor: "text-emerald-100",
    badgeBg: "bg-emerald-500/20",
    borderColor: "border-emerald-400/50",
    glowColor: "shadow-emerald-500/60"
  };
};