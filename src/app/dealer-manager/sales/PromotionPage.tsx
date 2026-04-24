"use client";
import React, { useState } from "react";
import { Row, Col, Input, Select } from "antd";
import PromotionCard from "./components/PromotionCard";
import {
  Tag,
  Plus,
  Search,
  Filter,
  TrendingUp,
  Package,
  Calendar,
  CheckCircle2
} from "lucide-react";

const mockPromotions = [
  {
    id: "P001",
    title: "Khuyến mãi tháng 9",
    description: "Giảm 10% cho VF8",
    discount: "10%",
    status: "active"
  },
  {
    id: "P002",
    title: "Ưu đãi VF9",
    description: "Giảm 15% khi đặt trước",
    discount: "15%",
    status: "active"
  },
  {
    id: "P003",
    title: "Gói trải nghiệm lái thử",
    description: "Miễn phí lái thử 1 ngày",
    discount: "Miễn phí",
    status: "scheduled"
  }
];

const PromotionsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredPromotions = mockPromotions.filter((promo) => {
    const matchesSearch = promo.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || promo.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const totalPromotions = mockPromotions.length;
  const activePromotions = mockPromotions.filter(
    (p) => p.status === "active"
  ).length;
  const scheduledPromotions = mockPromotions.filter(
    (p) => p.status === "scheduled"
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/30 shadow-lg">
                <Tag size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Quản Lý Khuyến Mãi
                </h1>
                <p className="text-orange-100 text-sm md:text-base">
                  Tạo và quản lý các chương trình ưu đãi
                </p>
              </div>
            </div>
            <button className="bg-white hover:bg-gray-100 text-orange-600 px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center gap-2 group">
              <Plus
                size={20}
                className="group-hover:rotate-90 transition-transform duration-300"
              />
              <span className="hidden sm:inline">Tạo khuyến mãi</span>
            </button>
          </div>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Input
                size="large"
                placeholder="Tìm kiếm khuyến mãi..."
                prefix={<Search className="text-gray-400" size={20} />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-xl"
              />
            </div>
            <Select
              size="large"
              placeholder="Lọc theo trạng thái"
              value={filterStatus}
              onChange={setFilterStatus}
              className="w-full"
              options={[
                { label: "Tất cả", value: "all" },
                { label: "Đang hoạt động", value: "active" },
                { label: "Đã lên lịch", value: "scheduled" },
                { label: "Tạm dừng", value: "paused" },
                { label: "Hết hạn", value: "expired" }
              ]}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">
                  Tổng khuyến mãi
                </p>
                <p className="text-3xl font-bold text-blue-600">
                  {totalPromotions}
                </p>
              </div>
              <div className="bg-blue-500 p-3 rounded-xl">
                <Package className="text-white" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">
                  Đang hoạt động
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {activePromotions}
                </p>
              </div>
              <div className="bg-green-500 p-3 rounded-xl">
                <CheckCircle2 className="text-white" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">
                  Đã lên lịch
                </p>
                <p className="text-3xl font-bold text-purple-600">
                  {scheduledPromotions}
                </p>
              </div>
              <div className="bg-purple-500 p-3 rounded-xl">
                <Calendar className="text-white" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">
                  Tổng giá trị
                </p>
                <p className="text-3xl font-bold text-orange-600">~25%</p>
              </div>
              <div className="bg-orange-500 p-3 rounded-xl">
                <TrendingUp className="text-white" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Filter Info */}
        {(searchTerm || filterStatus !== "all") && (
          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-blue-600" />
              <p className="text-sm font-semibold text-blue-900">
                Hiển thị {filteredPromotions.length} kết quả
                {searchTerm && ` cho "${searchTerm}"`}
                {filterStatus !== "all" &&
                  ` (${
                    filterStatus === "active"
                      ? "Đang hoạt động"
                      : filterStatus === "scheduled"
                      ? "Đã lên lịch"
                      : filterStatus
                  })`}
              </p>
            </div>
          </div>
        )}

        {/* Promotions Grid */}
        {filteredPromotions.length > 0 ? (
          <Row gutter={[24, 24]}>
            {filteredPromotions.map((promo) => (
              <Col key={promo.id} xs={24} sm={12} lg={8}>
                <PromotionCard {...promo} />
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
                Không tìm thấy khuyến mãi
              </h3>
              <p className="text-gray-500">
                Thử điều chỉnh bộ lọc hoặc tìm kiếm với từ khóa khác
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterStatus("all");
                }}
                className="mt-4 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:shadow-xl transition-all"
              >
                Xóa bộ lọc
              </button>
            </div>
          </div>
        )}

        {/* Bottom Info */}
        <div className="mt-8 flex justify-between items-center text-gray-600">
          <span className="text-sm">
            Hiển thị{" "}
            <span className="font-bold text-gray-900">
              {filteredPromotions.length}
            </span>{" "}
            khuyến mãi
          </span>
          <button className="text-sm text-orange-600 hover:text-orange-700 font-semibold hover:underline">
            Xem tất cả →
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromotionsPage;
