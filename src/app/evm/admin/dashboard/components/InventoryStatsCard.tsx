"use client";
import React from "react";
import { FaCar } from "react-icons/fa";

interface Props {
  totalCars: number;
  lowStock: number;
}

export default function InventoryStatsCard({ totalCars, lowStock }: Props) {
  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition">
      <div className="flex items-center gap-4">
        <FaCar className="text-indigo-400 text-3xl" />
        <div>
          <p className="text-xl font-bold text-white">{totalCars}</p>
          <p className="text-sm text-gray-300">Total Cars</p>
          <p className="text-sm text-gray-400 mt-1">Low Stock: {lowStock}</p>
        </div>
      </div>
    </div>
  );
}
