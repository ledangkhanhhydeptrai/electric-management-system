import React, { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface SalesStatsCardProps {
  sales: number;
}

export default function SalesStatsCard({ sales }: SalesStatsCardProps) {
  const [displaySales, setDisplaySales] = useState(0);

  // Animation counter
  useEffect(() => {
    let start = 0;
    const end = sales;
    const duration = 1000; // 1s
    const step = Math.ceil(end / (duration / 16));

    const counter = setInterval(() => {
      start += step;
      if (start >= end) {
        start = end;
        clearInterval(counter);
      }
      setDisplaySales(start);
    }, 16);

    return () => clearInterval(counter);
  }, [sales]);

  return (
    <motion.div
      whileHover={{ scale: 1.07 }}
      className="relative overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 p-6 rounded-2xl shadow-xl text-white flex items-center gap-4"
    >
      {/* Glow background */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/30 via-purple-400/30 to-pink-400/30 blur-2xl" />

      {/* Icon */}
      <div className="relative  bg-white/20 rounded-full">
        <TrendingUp size={28} />
      </div>

      {/* Text */}
      <div className="relative">
        <h3 className="text-sm opacity-80">Tổng doanh số</h3>
        <p className="text-3xl font-extrabold drop-shadow-md">
          {new Intl.NumberFormat("vi-VN").format(displaySales)} ₫
        </p>
        <span className="text-xs opacity-70">+12% so với tháng trước</span>
      </div>
    </motion.div>
  );
}
