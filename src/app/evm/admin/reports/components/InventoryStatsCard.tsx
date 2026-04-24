"use client";
import React from "react";

interface InventoryStatsCardProps {
  label: string;
  value: number;
}

export default function InventoryStatsCard({
  label,
  value
}: InventoryStatsCardProps) {
  return (
    <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-md text-center">
      <h2 className="text-gray-600">{label}</h2>
      <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
    </div>
  );
}
