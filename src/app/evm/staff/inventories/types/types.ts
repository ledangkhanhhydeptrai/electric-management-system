import React from "react";

export interface InventoryItem {
  id: string;
  name: string;
  qtyOnHand: number;
  qtyReserved: number;
  qtyIncoming: number;
  available: number;
  dealerId: string;
  dealerName: string;
  vehicleModelId: string;
  vehicleModelName: string;
  createdAt: string;
  updatedAt: string;
}

export interface InventoryItemDealer {
  id: string;
  name: string;
  quantity: number;
  minLevel: number;
  maxLevel: number;
  dealerId: string;
  dealerName: string;
  vehicleId: string;
  vehicleVin: string;
  vehicleCode: string;
  createdAt: number[];
  updatedAt: number[];
}
export interface StockStatus {
  status: string;
  color: string;
  bgColor: string;
  textColor: string;
  icon: React.ElementType;
}
