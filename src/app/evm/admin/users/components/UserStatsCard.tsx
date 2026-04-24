"use client";
import React from "react";
import { Account } from "@/app/types/Account/Account";
import { Users, CheckCircle, XCircle } from "lucide-react";

interface UserStatsCardsProps {
  data: Account[];
}

export default function UserStatsCards({ data }: UserStatsCardsProps) {
  const totalUsers = data.length;
  const activeUsers = data.filter((u) => u.isActive).length;
  const inactiveUsers = data.filter((u) => !u.isActive).length;

  const stats = [
    {
      icon: Users,
      value: totalUsers,
      label: "Tổng người dùng",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      borderColor: "border-blue-200"
    },
    {
      icon: CheckCircle,
      value: activeUsers,
      label: "Đang hoạt động",
      color: "from-emerald-500 to-green-600",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
      borderColor: "border-emerald-200"
    },
    {
      icon: XCircle,
      value: inactiveUsers,
      label: "Không hoạt động",
      color: "from-gray-500 to-slate-600",
      bgColor: "bg-gray-50",
      iconColor: "text-gray-600",
      borderColor: "border-gray-200"
    }
  ];

  return (
    <>
      <style jsx>{`
        @keyframes countUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="group relative bg-white rounded-2xl p-6 shadow-lg border-2 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer overflow-hidden"
            style={{
              animation: `countUp 0.6s ease-out ${index * 0.1}s both`,
              borderColor: stat.borderColor.replace("border-", "")
            }}
          >
            {/* Background Gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
            />

            {/* Content */}
            <div className="relative flex items-center gap-4">
              <div
                className={`relative w-14 h-14 rounded-2xl ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity`}
                />
                <stat.icon
                  className={`w-7 h-7 ${stat.iconColor} relative z-10`}
                  strokeWidth={2.5}
                />
              </div>

              <div className="flex-1">
                <p className="text-3xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600 font-medium mt-0.5">
                  {stat.label}
                </p>
              </div>
            </div>

            {/* Hover indicator */}
            <div
              className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
            />
          </div>
        ))}
      </div>
    </>
  );
}
