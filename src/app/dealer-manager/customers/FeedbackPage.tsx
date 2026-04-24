"use client";
import React from "react";
import FeedbackTable, { Feedback } from "./components/FeedbackTable";
import {
  MessageSquare,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Star,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";

const mockFeedback: Feedback[] = [
  {
    id: "F001",
    customer: "Nguyen Van A",
    content: "Xe giao chậm",
    status: "Pending",
    date: "2025-09-10",
    priority: "High"
  },
  {
    id: "F002",
    customer: "Tran Thi B",
    content: "Hài lòng dịch vụ",
    status: "Resolved",
    date: "2025-09-09",
    priority: "Low"
  },
  {
    id: "F003",
    customer: "Le Van C",
    content: "Xe có lỗi nhỏ",
    status: "Pending",
    date: "2025-09-08",
    priority: "Medium"
  }
];

const FeedbackPage = () => {
  // Calculate stats
  const totalFeedback = mockFeedback.length;
  const pendingCount = mockFeedback.filter((f) => f.status === "Pending").length;
  const resolvedCount = mockFeedback.filter((f) => f.status === "Resolved").length;
  const highPriorityCount = mockFeedback.filter(
    (f) => f.priority === "High"
  ).length;
  const positiveCount = mockFeedback.filter((f) =>
    f.content.toLowerCase().includes("hài lòng") ||
    f.content.toLowerCase().includes("tốt") ||
    f.content.toLowerCase().includes("hỗ trợ")
  ).length;
  const negativeCount = totalFeedback - positiveCount;

  return (
    <div className="">
      {/* Sticky Header */}
      <div className="top-0 z-40 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/30 shadow-lg">
              <MessageSquare size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Phản Hồi & Khiếu Nại
              </h1>
              <p className="text-purple-100 text-sm md:text-base">
                Theo dõi và xử lý phản hồi từ khách hàng
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">
                  Tổng phản hồi
                </p>
                <p className="text-3xl font-bold text-blue-600">
                  {totalFeedback}
                </p>
              </div>
              <div className="bg-blue-500 p-3 rounded-xl">
                <MessageSquare className="text-white" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-100 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">
                  Đang xử lý
                </p>
                <p className="text-3xl font-bold text-orange-600">
                  {pendingCount}
                </p>
              </div>
              <div className="bg-orange-500 p-3 rounded-xl">
                <Clock className="text-white" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">
                  Đã giải quyết
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {resolvedCount}
                </p>
              </div>
              <div className="bg-green-500 p-3 rounded-xl">
                <CheckCircle2 className="text-white" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border border-red-100 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">
                  Ưu tiên cao
                </p>
                <p className="text-3xl font-bold text-red-600">
                  {highPriorityCount}
                </p>
              </div>
              <div className="bg-red-500 p-3 rounded-xl">
                <AlertTriangle className="text-white" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Satisfaction Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Positive Feedback */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-3 rounded-xl">
                  <ThumbsUp className="text-green-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">
                    Phản hồi tích cực
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {positiveCount}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${(positiveCount / totalFeedback) * 100}%`
                }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {((positiveCount / totalFeedback) * 100).toFixed(0)}% tổng số phản hồi
            </p>
          </div>

          {/* Negative Feedback */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-3 rounded-xl">
                  <ThumbsDown className="text-red-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">
                    Phản hồi tiêu cực
                  </p>
                  <p className="text-2xl font-bold text-red-600">
                    {negativeCount}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-red-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${(negativeCount / totalFeedback) * 100}%`
                }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {((negativeCount / totalFeedback) * 100).toFixed(0)}% tổng số phản hồi
            </p>
          </div>

          {/* Response Rate */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-3 rounded-xl">
                  <TrendingUp className="text-purple-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">
                    Tỷ lệ giải quyết
                  </p>
                  <p className="text-2xl font-bold text-purple-600">
                    {((resolvedCount / totalFeedback) * 100).toFixed(0)}%
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${(resolvedCount / totalFeedback) * 100}%`
                }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {resolvedCount} / {totalFeedback} đã xử lý
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all flex items-center justify-between group">
            <div className="text-left">
              <p className="text-sm text-blue-100 mb-1">Phản hồi mới nhất</p>
              <p className="text-2xl font-bold">Xem tất cả</p>
            </div>
            <MessageSquare size={32} className="group-hover:scale-110 transition-transform" />
          </button>

          <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all flex items-center justify-between group">
            <div className="text-left">
              <p className="text-sm text-orange-100 mb-1">Ưu tiên cao</p>
              <p className="text-2xl font-bold">Xử lý ngay</p>
            </div>
            <AlertTriangle size={32} className="group-hover:scale-110 transition-transform" />
          </button>

          <button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all flex items-center justify-between group">
            <div className="text-left">
              <p className="text-sm text-green-100 mb-1">Báo cáo</p>
              <p className="text-2xl font-bold">Xuất dữ liệu</p>
            </div>
            <Star size={32} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Feedback Table */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 mb-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                <MessageSquare size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Danh Sách Phản Hồi
                </h2>
                <p className="text-purple-100 text-sm">
                  Quản lý và xử lý phản hồi
                </p>
              </div>
            </div>
          </div>

          <FeedbackTable feedbacks={mockFeedback} />
        </div>

        {/* Bottom Info */}
        <div className="text-center text-gray-600">
          <p className="text-sm">
            Tổng cộng <span className="font-bold text-gray-900">{totalFeedback}</span> phản hồi •{" "}
            <span className="font-bold text-orange-600">{pendingCount}</span> đang chờ xử lý
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;