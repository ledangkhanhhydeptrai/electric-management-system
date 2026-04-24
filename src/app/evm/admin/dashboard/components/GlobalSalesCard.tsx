"use client";
import React, { useEffect, useState } from "react";
import { FaDollarSign } from "react-icons/fa";

interface Props {
  totalSales: number;
  monthlySales: number;
}

export default function GlobalSalesCard({ totalSales, monthlySales }: Props) {
  const [formattedTotal, setFormattedTotal] = useState("");
  const [formattedMonthly, setFormattedMonthly] = useState("");

  useEffect(() => {
    setFormattedTotal(totalSales.toLocaleString());
    setFormattedMonthly(monthlySales.toLocaleString());
  }, [totalSales, monthlySales]);

  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition">
      <div className="flex items-center gap-4">
        <FaDollarSign className="text-green-400 text-3xl" />
        <div>
          <p className="text-xl font-bold text-white">${formattedTotal}</p>
          <p className="text-sm text-gray-300">Total Sales</p>
          <p className="text-sm text-gray-400 mt-1">
            Monthly: ${formattedMonthly}
          </p>
        </div>
      </div>
    </div>
  );
}
