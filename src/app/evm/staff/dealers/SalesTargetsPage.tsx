"use client";
import React from "react";

export default function SalesTargetsPage() {
  const targets = [
    { dealer: "Đại lý Hà Nội", target: 200, achieved: 150 },
    { dealer: "Đại lý Đà Nẵng", target: 120, achieved: 95 },
    { dealer: "Đại lý TP.HCM", target: 250, achieved: 220 }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-[#1f2540]">
        🎯 Chỉ tiêu doanh số
      </h1>
      <table className="w-full bg-white rounded-lg shadow overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Đại lý</th>
            <th className="p-3 text-left">Chỉ tiêu</th>
            <th className="p-3 text-left">Đã đạt</th>
          </tr>
        </thead>
        <tbody>
          {targets.map((t, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-3">{t.dealer}</td>
              <td className="p-3">{t.target}</td>
              <td className="p-3">{t.achieved}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
