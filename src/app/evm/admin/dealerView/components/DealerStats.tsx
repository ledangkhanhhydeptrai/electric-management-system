// /components/dealers/components/DealerStats.tsx
"use client";
import React from "react";
import { Users } from "lucide-react";
import { Dealer } from "../types/types";

export default function DealerStats({ dealers }: { dealers: Dealer[] }) {
  // const newThisMonth = dealers.filter((d) => {
  //   const [year, month] = d.createdAt;
  //   const now = new Date();
  //   return year === now.getFullYear() && month === now.getMonth() + 1;
  // }).length;

  // const newThisWeek = dealers.filter((d) => {
  //   const date = new Date(d.createdAt[0], d.createdAt[1] - 1, d.createdAt[2]);
  //   const now = new Date();
  //   const diffTime = Math.abs(now.getTime() - date.getTime());
  //   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  //   return diffDays <= 7;
  // }).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 font-medium uppercase tracking-wide">
              Tổng đại lý
            </p>
            <p className="text-4xl font-bold text-gray-900 mt-2">
              {dealers.length}
            </p>
            <p className="text-xs text-gray-500 mt-1">Tất cả đại lý</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl shadow-lg">
            <Users className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      {/* <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 font-medium uppercase tracking-wide">
              Tuần này
            </p>
            <p className="text-4xl font-bold text-gray-900 mt-2">
              {newThisWeek}
            </p>
            <p className="text-xs text-gray-500 mt-1">Đại lý mới</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-2xl shadow-lg">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
        </div>
      </div> */}

      {/* <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 font-medium uppercase tracking-wide">
              Tháng này
            </p>
            <p className="text-4xl font-bold text-gray-900 mt-2">
              {newThisMonth}
            </p>
            <p className="text-xs text-gray-500 mt-1">Đại lý mới</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-2xl shadow-lg">
            <Clock className="w-8 h-8 text-white" />
          </div>
        </div>
      </div> */}
    </div>
  );
}
