"use client";
import React from "react";
import InventoryStatsCard from "./components/InventoryStatsCard";

const inventoryStats = {
  totalCars: 450,
  lowStock: 15,
  bestSellers: 5
};

export default function InventoryReportPage() {
  return (
    <main className="p-1 bg-white text-gray-900 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <InventoryStatsCard
          label="Total Cars"
          value={inventoryStats.totalCars}
        />
        <InventoryStatsCard label="Low Stock" value={inventoryStats.lowStock} />
        <InventoryStatsCard
          label="Best Sellers"
          value={inventoryStats.bestSellers}
        />
      </div>
    </main>
  );
}
