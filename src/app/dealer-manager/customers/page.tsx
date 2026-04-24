"use client";
import React, { useState } from "react";
import { Row, Col, Input } from "antd";
import CustomerCard from "./components/CustomerCard";
import { Feedback } from "./components/FeedbackTable";
import TestDriveCalendar, { TestDrive } from "./components/TestDriveCalendar";
import {
  Users,
  Search,
  MessageSquare,
  Calendar,
  UserPlus,
  TrendingUp,
  CheckCircle2,
  Activity,
  Star,
  Download,
  Plus
} from "lucide-react";
import FeedbackPage from "./FeedbackPage";
import { useAuthGuard } from "../../hooks/useAuthGuard";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastVisit: string;
  status?: "Mới" | "Tiềm năng" | "VIP";
}

const mockCustomers: Customer[] = [
  {
    id: "C001",
    name: "Nguyen Van A",
    email: "a@gmail.com",
    phone: "0909123456",
    lastVisit: "2025-09-10",
    status: "VIP"
  },
  {
    id: "C002",
    name: "Tran Thi B",
    email: "b@gmail.com",
    phone: "0909876543",
    lastVisit: "2025-09-09",
    status: "Tiềm năng"
  },
  {
    id: "C003",
    name: "Le Van C",
    email: "c@gmail.com",
    phone: "0909345678",
    lastVisit: "2025-09-08",
    status: "Mới"
  }
];

const mockFeedbacks: Feedback[] = [
  {
    id: "F001",
    customer: "Nguyen Van A",
    content: "Dịch vụ tốt",
    date: "2025-09-10",
    status: "Resolved",
    priority: "Low"
  },
  {
    id: "F002",
    customer: "Tran Thi B",
    content: "Xe giao chậm",
    date: "2025-09-09",
    status: "Pending",
    priority: "High"
  },
  {
    id: "F003",
    customer: "Le Van C",
    content: "Hỗ trợ nhiệt tình",
    date: "2025-09-08",
    status: "Resolved",
    priority: "Medium"
  }
];

const mockTestDrives: TestDrive[] = [
  {
    id: "T001",
    customer: "Nguyen Van A",
    carModel: "VinFast VF8",
    date: "2025-09-10",
    time: "10:00 AM",
    status: "Confirmed"
  },
  {
    id: "T002",
    customer: "Tran Thi B",
    carModel: "VinFast VF9",
    date: "2025-09-09",
    time: "2:00 PM",
    status: "Pending"
  },
  {
    id: "T003",
    customer: "Le Van C",
    carModel: "VinFast VF8",
    date: "2025-09-08",
    time: "11:30 AM",
    status: "Completed"
  }
];

const CustomersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  useAuthGuard(["Dealer Manager"]);
  const filteredCustomers = mockCustomers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate stats
  const totalCustomers = mockCustomers.length;
  const newCustomers = mockCustomers.filter((c) => c.status === "Mới").length;
  const vipCustomers = mockCustomers.filter((c) => c.status === "VIP").length;
  const pendingFeedbacks = mockFeedbacks.filter(
    (f) => f.status === "Pending"
  ).length;
  const upcomingTestDrives = mockTestDrives.filter(
    (t) => t.status === "Confirmed" || t.status === "Pending"
  ).length;
  const completedTestDrives = mockTestDrives.filter(
    (t) => t.status === "Completed"
  ).length;

  return (
    <div className="">
      {/* Sticky Header */}
      <div className="relative top-0 z-40 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/30 shadow-lg">
                <Users size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Quản Lý Khách Hàng
                </h1>
                <p className="text-orange-100 text-sm md:text-base">
                  Theo dõi và chăm sóc khách hàng
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="hidden md:flex gap-2">
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/30 text-white font-semibold transition-all flex items-center gap-2">
                <Download size={18} />
                <span>Xuất dữ liệu</span>
              </button>
              <button className="bg-white hover:bg-gray-100 px-4 py-2 rounded-xl text-orange-600 font-bold transition-all shadow-lg flex items-center gap-2">
                <Plus size={18} />
                <span>Thêm KH</span>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div>
            <Input
              size="large"
              placeholder="Tìm kiếm khách hàng..."
              prefix={<Search className="text-gray-400" size={20} />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">
                  Tổng khách hàng
                </p>
                <p className="text-3xl font-bold text-blue-600">
                  {totalCustomers}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  ↑ 12% so với tháng trước
                </p>
              </div>
              <div className="bg-blue-500 p-3 rounded-xl">
                <Users className="text-white" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">
                  KH mới (tháng)
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {newCustomers}
                </p>
                <p className="text-xs text-gray-500 mt-1">{vipCustomers} VIP</p>
              </div>
              <div className="bg-green-500 p-3 rounded-xl">
                <UserPlus className="text-white" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">
                  Phản hồi chờ
                </p>
                <p className="text-3xl font-bold text-purple-600">
                  {pendingFeedbacks}
                </p>
                <p className="text-xs text-gray-500 mt-1">Cần xử lý ngay</p>
              </div>
              <div className="bg-purple-500 p-3 rounded-xl">
                <MessageSquare className="text-white" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">
                  Lịch lái thử
                </p>
                <p className="text-3xl font-bold text-orange-600">
                  {upcomingTestDrives}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {completedTestDrives} hoàn thành
                </p>
              </div>
              <div className="bg-orange-500 p-3 rounded-xl">
                <Calendar className="text-white" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Activity Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Activity size={20} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Hoạt động gần đây
                </h3>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold hover:underline">
                Xem tất cả →
              </button>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: <UserPlus size={16} className="text-green-600" />,
                  bg: "bg-green-50",
                  text: "Khách hàng mới: Nguyen Van D đã đăng ký",
                  time: "5 phút trước"
                },
                {
                  icon: <MessageSquare size={16} className="text-purple-600" />,
                  bg: "bg-purple-50",
                  text: "Phản hồi mới từ Tran Thi B",
                  time: "15 phút trước"
                },
                {
                  icon: <Calendar size={16} className="text-orange-600" />,
                  bg: "bg-orange-50",
                  text: "Lịch lái thử VF9 đã được xác nhận",
                  time: "1 giờ trước"
                },
                {
                  icon: <CheckCircle2 size={16} className="text-blue-600" />,
                  bg: "bg-blue-50",
                  text: "Đơn hàng #ORD001 đã hoàn thành",
                  time: "2 giờ trước"
                }
              ].map((activity, index) => (
                <div
                  key={index}
                  className={`${activity.bg} rounded-xl p-4 flex items-start gap-3 hover:shadow-md transition-all`}
                >
                  <div className="mt-0.5">{activity.icon}</div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">{activity.text}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={20} className="text-green-600" />
                <h3 className="font-bold text-gray-900">Thống kê nhanh</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Tỷ lệ hài lòng</span>
                  <span className="text-sm font-bold text-green-600">95%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full w-[95%]"></div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-600">
                    Thời gian phản hồi
                  </span>
                  <span className="text-sm font-bold text-blue-600">2.5h</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full w-[80%]"></div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-600">
                    Tỷ lệ chuyển đổi
                  </span>
                  <span className="text-sm font-bold text-purple-600">68%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-[68%]"></div>
                </div>
              </div>
            </div>

            {/* Top Customers */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Star size={20} className="text-yellow-500 fill-current" />
                <h3 className="font-bold text-gray-900">Top khách hàng</h3>
              </div>
              <div className="space-y-3">
                {mockCustomers.slice(0, 3).map((customer, index) => (
                  <div
                    key={customer.id}
                    className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">
                        {customer.name}
                      </p>
                      <p className="text-xs text-gray-500">{customer.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 mb-8 overflow-hidden">
          <div className="flex overflow-x-auto">
            {[
              {
                key: "overview",
                label: "Tổng quan",
                icon: <Activity size={18} />
              },
              {
                key: "customers",
                label: "Khách hàng",
                icon: <Users size={18} />
              },
              {
                key: "feedback",
                label: "Phản hồi",
                icon: <MessageSquare size={18} />
              },
              {
                key: "testdrive",
                label: "Lịch lái thử",
                icon: <Calendar size={18} />
              }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 px-6 py-4 font-semibold transition-all flex items-center justify-center gap-2 ${
                  activeTab === tab.key
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "customers" && (
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-6 mb-6 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                  <Users size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Danh Sách Khách Hàng
                  </h2>
                  <p className="text-blue-100 text-sm">
                    Hiển thị {filteredCustomers.length} khách hàng
                  </p>
                </div>
              </div>
            </div>

            {filteredCustomers.length > 0 ? (
              <Row gutter={[24, 24]}>
                {filteredCustomers.map((c) => (
                  <Col key={c.id} xs={24} sm={12} lg={8}>
                    <CustomerCard customer={c} />
                  </Col>
                ))}
              </Row>
            ) : (
              <div className="bg-white rounded-2xl p-16 text-center shadow-lg">
                <div className="flex flex-col items-center gap-4">
                  <div className="bg-gray-100 p-6 rounded-full">
                    <Search className="text-gray-400" size={48} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Không tìm thấy khách hàng
                  </h3>
                  <p className="text-gray-500">Thử tìm kiếm với từ khóa khác</p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "feedback" && (
          <div className="mb-8">
            <FeedbackPage />
          </div>
        )}

        {activeTab === "testdrive" && (
          <div className="mb-8">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 mb-6 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                  <Calendar size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Lịch Lái Thử
                  </h2>
                  <p className="text-orange-100 text-sm">
                    Quản lý lịch hẹn lái thử xe
                  </p>
                </div>
              </div>
            </div>

            <TestDriveCalendar testDrives={mockTestDrives} />
          </div>
        )}

        {/* Bottom Info */}
        <div className="mt-8 text-center text-gray-600">
          <p className="text-sm">
            Tổng cộng{" "}
            <span className="font-bold text-gray-900">{totalCustomers}</span>{" "}
            khách hàng •{" "}
            <span className="font-bold text-green-600">{newCustomers}</span> mới
            tháng này •{" "}
            <span className="font-bold text-purple-600">{vipCustomers}</span>{" "}
            VIP
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;
