"use client";
import { Col, Row } from "antd";
import { FaCalendarAlt, FaCar, FaDollarSign, FaUser } from "react-icons/fa";
import { StatsCard } from "./components/StatsCard";
import { Order, OrdersTable } from "./components/OrdersTable";
import CustomersChart from "./components/CustomersChart";
import TestDriveCalendar from "./components/TestDriveCalendar";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";

const DashboardPage = () => {
  useAuthGuard(["Dealer Manager"]);
  const stats = [
    {
      title: "Doanh số",
      value: "4.5M VNĐ",
      icon: <FaDollarSign />,
      gradient: "bg-gradient-to-br from-green-400 to-emerald-600"
    },
    {
      title: "Đơn hàng mới",
      value: 12,
      icon: <FaCar />,
      gradient: "bg-gradient-to-br from-blue-400 to-indigo-600"
    },
    {
      title: "Khách hàng",
      value: 78,
      icon: <FaUser />,
      gradient: "bg-gradient-to-br from-purple-400 to-pink-600"
    },
    {
      title: "Lái thử",
      value: 5,
      icon: <FaCalendarAlt />,
      gradient: "bg-gradient-to-br from-orange-400 to-red-600"
    }
  ];

  const mockCustomerStats = [
    { label: "Khách hàng mới", value: 25 },
    { label: "Khách hàng tiềm năng", value: 40 },
    { label: "Lái thử", value: 5 }
  ];

  const mockOrders: Order[] = [
    {
      id: "O001",
      customer: "Nguyen Van A",
      carModel: "VinFast VF8",
      price: 1200000,
      status: "Pending",
      orderDate: "2025-09-10"
    },
    {
      id: "O002",
      customer: "Tran Thi B",
      carModel: "VinFast VF9",
      price: 1500000,
      status: "Completed",
      orderDate: "2025-09-09"
    },
    {
      id: "O003",
      customer: "Le Van C",
      carModel: "VinFast VF8",
      price: 1200000,
      status: "Cancelled",
      orderDate: "2025-09-08"
    }
  ];

  const mockTestDrives = [
    {
      id: "T001",
      customer: "Nguyen Van A",
      carModel: "VinFast VF8",
      date: "2025-09-10"
    },
    {
      id: "T002",
      customer: "Tran Thi B",
      carModel: "VinFast VF9",
      date: "2025-09-09"
    },
    {
      id: "T003",
      customer: "Le Van C",
      carModel: "VinFast VF8",
      date: "2025-09-08"
    }
  ];

  return (
    <div className="">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Dashboard Tổng Quan
        </h1>
        <p className="text-gray-600">
          Chào mừng trở lại! Đây là tổng quan hoạt động của bạn
        </p>
      </div>

      {/* Stats Cards */}
      <Row gutter={[24, 24]} className="mb-8">
        {stats.map((stat, idx) =>
          <Col key={idx} xs={24} sm={12} lg={6}>
            <StatsCard {...stat} />
          </Col>
        )}
      </Row>

      {/* Orders and Chart Row */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col xs={24} lg={16}>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-3" />
              Đơn hàng gần đây
            </h2>
            <OrdersTable orders={mockOrders} />
          </div>
        </Col>

        <Col xs={24} lg={8}>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full mr-3" />
              Thống kê khách hàng
            </h2>
            <CustomersChart data={mockCustomerStats} />
          </div>
        </Col>
      </Row>

      {/* Test Drive Calendar */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <span className="w-1 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full mr-3" />
          Lịch lái thử
        </h2>
        <TestDriveCalendar testDrives={mockTestDrives} />
      </div>
    </div>
  );
};

export default DashboardPage;
