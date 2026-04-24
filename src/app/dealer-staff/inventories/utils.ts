import { AlertTriangle, CheckCircle, Package } from "lucide-react";
import { InventoryItem, StockStatus } from "./types/types";

export const getStockStatus = (item: InventoryItem) => {
  // const { quantity, minLevel, maxLevel } = item;

  // if (quantity <= minLevel)
  //   return {
  //     status: "Thấp",
  //     color: "red",
  //     bgColor: "bg-red-100",
  //     textColor: "text-red-700",
  //     icon: AlertTriangle
  //   };

  // if (quantity >= maxLevel)
  //   return {
  //     status: "Đầy",
  //     color: "green",
  //     bgColor: "bg-green-100",
  //     textColor: "text-green-700",
  //     icon: CheckCircle
  //   };

  // return {
  //   status: "Bình thường",
  //   color: "blue",
  //   bgColor: "bg-blue-100",
  //   textColor: "text-blue-700",
  //   icon: Package
  // };
};

export const formatDate = (dateArray: number[]): string => {
  const [year, month, day, hour, minute, second] = dateArray;
  return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
};
