"use client";
import React, { useState, useMemo } from "react";
import { Row, Col } from "antd";
import {
  UserOutlined,
  SearchOutlined,
  FilterOutlined,
  PlusOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  CommentOutlined,
  CarOutlined,
  RiseOutlined
} from "@ant-design/icons";
import CustomerCard from "./components/CustomerCard";
import FeedbackPage from "./FeedbackPage";
import TestDrivePage from "./TestDrivePage";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "New" | "Active" | "Inactive";
}

const mockCustomers: Customer[] = [
  {
    id: "C001",
    name: "Nguyen Van A",
    email: "a@gmail.com",
    phone: "0123456789",
    status: "Active"
  },
  {
    id: "C002",
    name: "Tran Thi B",
    email: "b@gmail.com",
    phone: "0987654321",
    status: "New"
  },
  {
    id: "C003",
    name: "Le Van C",
    email: "c@gmail.com",
    phone: "0911223344",
    status: "Inactive"
  },
  {
    id: "C004",
    name: "Pham Thi D",
    email: "d@gmail.com",
    phone: "0988776655",
    status: "Active"
  },
  {
    id: "C005",
    name: "Hoang Van E",
    email: "e@gmail.com",
    phone: "0912345678",
    status: "New"
  },
  {
    id: "C006",
    name: "Vo Thi F",
    email: "f@gmail.com",
    phone: "0934567890",
    status: "Active"
  }
];

const CustomersPage = () => {
  useAuthGuard(["Staff"]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "New" | "Active" | "Inactive"
  >("All");
  const [customers] = useState<Customer[]>(mockCustomers);

  const filtered = useMemo(() => {
    return customers.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search);
      const matchesStatus = statusFilter === "All" || c.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter, customers]);

  const stats = useMemo(() => {
    return {
      total: customers.length,
      active: customers.filter((c) => c.status === "Active").length,
      new: customers.filter((c) => c.status === "New").length,
      inactive: customers.filter((c) => c.status === "Inactive").length,
      growthRate: 12 // Mock growth rate
    };
  }, [customers]);

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-[1800px] mx-auto">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-center gap-5 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl blur opacity-40"></div>
              <div className="relative p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl">
                <UserOutlined className="text-white text-5xl" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900">
                Quản Lý Khách Hàng
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                Theo dõi và chăm sóc khách hàng hiệu quả
              </p>
            </div>
          </div>
          <div className="h-1 w-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-10">
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  Tổng KH
                </p>
                <p className="text-4xl font-black text-gray-900">
                  {stats.total}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <RiseOutlined className="text-green-600 text-xs" />
                  <span className="text-green-600 text-sm font-semibold">
                    +{stats.growthRate}%
                  </span>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <TeamOutlined className="text-blue-600 text-3xl" />
              </div>
            </div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-green-300 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  Đang hoạt động
                </p>
                <p className="text-4xl font-black text-gray-900">
                  {stats.active}
                </p>
                <div className="text-green-600 text-sm font-semibold mt-2">
                  {Math.round((stats.active / stats.total) * 100)}% tổng
                </div>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <CheckCircleOutlined className="text-green-600 text-3xl" />
              </div>
            </div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-yellow-300 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  Khách mới
                </p>
                <p className="text-4xl font-black text-gray-900">{stats.new}</p>
                <div className="text-yellow-600 text-sm font-semibold mt-2">
                  Cần chăm sóc
                </div>
              </div>
              <div className="p-4 bg-gradient-to-br from-yellow-100 to-orange-200 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <ClockCircleOutlined className="text-yellow-600 text-3xl" />
              </div>
            </div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-red-300 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  Không hoạt động
                </p>
                <p className="text-4xl font-black text-gray-900">
                  {stats.inactive}
                </p>
                <div className="text-red-600 text-sm font-semibold mt-2">
                  Cần kích hoạt
                </div>
              </div>
              <div className="p-4 bg-gradient-to-br from-red-100 to-pink-200 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <CloseCircleOutlined className="text-red-600 text-3xl" />
              </div>
            </div>
          </div>

          <div className="group bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <div className="flex flex-col items-center justify-center h-full text-white">
              <PlusOutlined className="text-4xl mb-2" />
              <p className="font-bold text-lg">Thêm KH</p>
              <p className="text-sm text-purple-100 mt-1">Tạo mới</p>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6 mb-10">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <SearchOutlined className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="text"
                  placeholder="Tìm theo tên, email, số điện thoại..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Status Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-gray-50 rounded-xl border-2 border-gray-300 p-1">
                <button
                  onClick={() => setStatusFilter("All")}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    statusFilter === "All"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Tất cả
                </button>
                <button
                  onClick={() => setStatusFilter("Active")}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    statusFilter === "Active"
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  ✓ Hoạt động
                </button>
                <button
                  onClick={() => setStatusFilter("New")}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    statusFilter === "New"
                      ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  ★ Mới
                </button>
                <button
                  onClick={() => setStatusFilter("Inactive")}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    statusFilter === "Inactive"
                      ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  ✕ Không hoạt động
                </button>
              </div>

              {(search || statusFilter !== "All") && (
                <button
                  onClick={clearFilters}
                  className="px-5 py-3 rounded-xl border-2 border-gray-300 text-gray-700 bg-gray-50 hover:bg-gray-100 font-medium transition-all"
                >
                  Xóa bộ lọc
                </button>
              )}
            </div>
          </div>

          {/* Active Filters Display */}
          {(search || statusFilter !== "All") && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm">
                <FilterOutlined className="text-gray-500" />
                <span className="text-gray-600 font-medium">Đang lọc:</span>
                {search && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg font-medium">
                    {search}
                  </span>
                )}
                {statusFilter !== "All" && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg font-medium">
                    {statusFilter}
                  </span>
                )}
                <span className="text-gray-500">
                  • {filtered.length} kết quả
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Customers Grid */}
        {filtered.length === 0 ? (
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200 p-12 text-center mb-10">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <UserOutlined className="text-blue-500 text-5xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Không tìm thấy khách hàng
              </h3>
              <p className="text-gray-600 mb-6">
                Không có khách hàng nào khớp với bộ lọc của bạn. Thử điều chỉnh
                tìm kiếm hoặc xóa bộ lọc.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all"
                >
                  Xóa bộ lọc
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 shadow-lg transition-all">
                  Thêm khách hàng mới
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-10">
            <Row gutter={[24, 24]}>
              {filtered.map((customer, index) => (
                <Col key={customer.id} xs={24} sm={12} md={8} lg={6}>
                  <div
                    style={{
                      animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both`
                    }}
                  >
                    <CustomerCard customer={customer} />
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        )}

        {/* Feedback Section */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl shadow-lg">
              <CommentOutlined className="text-white text-3xl" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Phản Hồi & Khiếu Nại
              </h2>
              <p className="text-gray-600 mt-1">
                Quản lý feedback từ khách hàng
              </p>
            </div>
          </div>
          <div className="animate-fadeIn">
            <FeedbackPage />
          </div>
        </div>

        {/* Test Drive Section */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg">
              <CarOutlined className="text-white text-3xl" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Lái Thử Xe</h2>
              <p className="text-gray-600 mt-1">
                Quản lý lịch lái thử và đặt hẹn
              </p>
            </div>
          </div>
          <div className="animate-fadeIn" style={{ animationDelay: "0.2s" }}>
            <TestDrivePage />
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out both;
        }
      `}</style>
    </div>
  );
};

export default CustomersPage;
