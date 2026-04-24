"use client";

import React, { useState } from "react";
import {
  FaDollarSign,
  FaShoppingCart,
  FaUsers,
  FaCar,
  FaCheckCircle,
  FaClock,
  FaTimesCircle
} from "react-icons/fa";
import DashboardHeader from "./components/DashboardHeader";
import StatsSection from "./components/StatsSection";
import OrdersTable from "./components/OrdersTable";
import QuickActionsCard from "./components/QuickActionsCard";
import AddDealerForm from "./components/form/AddDealerForm";
import { Order, StatsData } from "./types/types";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";

export default function DashboardPage() {
  useAuthGuard(["Staff"]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Stats data
  const stats: StatsData[] = [
    {
      title: "Tổng doanh thu",
      value: "$127.5K",
      icon: <FaDollarSign />,
      gradient: "bg-gradient-to-br from-green-400 to-emerald-600",
      trend: "+12.5% so với tháng trước"
    },
    {
      title: "Đơn hàng mới",
      value: "156",
      icon: <FaShoppingCart />,
      gradient: "bg-gradient-to-br from-blue-400 to-indigo-600",
      trend: "+8 đơn hôm nay"
    },
    {
      title: "Khách hàng",
      value: "2,543",
      icon: <FaUsers />,
      gradient: "bg-gradient-to-br from-purple-400 to-pink-600",
      trend: "+23 khách hàng mới"
    },
    {
      title: "Xe đã bán",
      value: "89",
      icon: <FaCar />,
      gradient: "bg-gradient-to-br from-orange-400 to-red-600",
      trend: "Tháng này"
    }
  ];

  // Orders data
  const orders: Order[] = [
    {
      id: "#DH001",
      name: "Nguyễn Văn A",
      car: "VF8",
      price: "$25,000",
      status: "Hoàn tất",
      color: "text-green-800 bg-green-100 border border-green-300",
      icon: <FaCheckCircle />
    },
    {
      id: "#DH002",
      name: "Trần Thị B",
      car: "VF9",
      price: "$45,000",
      status: "Đang xử lý",
      color: "text-yellow-800 bg-yellow-100 border border-yellow-300",
      icon: <FaClock />
    },
    {
      id: "#DH003",
      name: "Lê Văn C",
      car: "VF5",
      price: "$18,000",
      status: "Hủy",
      color: "text-red-800 bg-red-100 border border-red-300",
      icon: <FaTimesCircle />
    },
    {
      id: "#DH004",
      name: "Phạm Thị D",
      car: "VF6",
      price: "$22,000",
      status: "Hoàn tất",
      color: "text-green-800 bg-green-100 border border-green-300",
      icon: <FaCheckCircle />
    },
    {
      id: "#DH005",
      name: "Hoàng Văn E",
      car: "VF7",
      price: "$32,000",
      status: "Đang xử lý",
      color: "text-yellow-800 bg-yellow-100 border border-yellow-300",
      icon: <FaClock />
    }
  ];

  return (
    <div className="">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <DashboardHeader onCreateOrder={() => setIsModalOpen(true)} />

        {/* Stats Cards */}
        <StatsSection stats={stats} />

        {/* Orders Table */}
        <OrdersTable orders={orders} />

        {/* Quick Actions Card */}
        <QuickActionsCard />
      </div>

      {/* Direct use of AddDealerForm */}
      <AddDealerForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
