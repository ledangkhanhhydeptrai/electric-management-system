"use client";
import React, { useState } from "react";
import {
  MessageSquare,
  User,
  Calendar,
  CheckCircle2,
  Clock,
  Search,
  Eye,
  Filter,
  AlertCircle,
  X,
  ChevronDown
} from "lucide-react";

export interface Feedback {
  id: string;
  customer: string;
  content: string;
  status: "Pending" | "Resolved";
  date: string;
  priority?: "Low" | "Medium" | "High";
}

interface Props {
  feedbacks: Feedback[];
}

const FeedbackTable: React.FC<Props> = ({ feedbacks }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "Pending" | "Resolved"
  >("all");
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(
    null
  );

  const filteredFeedbacks = feedbacks.filter((feedback) => {
    const matchesSearch =
      feedback.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || feedback.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusConfig = (status: Feedback["status"]) => {
    switch (status) {
      case "Pending":
        return {
          bg: "bg-gradient-to-r from-yellow-500 to-orange-500",
          text: "text-white",
          icon: <Clock size={14} />,
          label: "Đang xử lý"
        };
      case "Resolved":
        return {
          bg: "bg-gradient-to-r from-green-500 to-emerald-500",
          text: "text-white",
          icon: <CheckCircle2 size={14} />,
          label: "Đã giải quyết"
        };
    }
  };

  const getPriorityConfig = (priority?: "Low" | "Medium" | "High") => {
    if (!priority) return null;
    switch (priority) {
      case "High":
        return { color: "text-red-600", bg: "bg-red-50", label: "Cao" };
      case "Medium":
        return {
          color: "text-orange-600",
          bg: "bg-orange-50",
          label: "Trung bình"
        };
      case "Low":
        return { color: "text-blue-600", bg: "bg-blue-50", label: "Thấp" };
    }
  };

  const pendingCount = feedbacks.filter((f) => f.status === "Pending").length;
  const resolvedCount = feedbacks.filter((f) => f.status === "Resolved").length;

  return (
    <div className="space-y-4">
      {/* Stats & Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Stats */}
        <div className="flex gap-4">
          <div className="flex-1 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 font-medium mb-1">
                  Đang xử lý
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {pendingCount}
                </p>
              </div>
              <div className="bg-orange-500 p-2 rounded-lg">
                <Clock className="text-white" size={20} />
              </div>
            </div>
          </div>

          <div className="flex-1 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 font-medium mb-1">
                  Đã giải quyết
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {resolvedCount}
                </p>
              </div>
              <div className="bg-green-500 p-2 rounded-lg">
                <CheckCircle2 className="text-white" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="flex-1 relative">
            <div className="absolute left-2 top-7 -translate-y-1/2 flex items-center justify-center w-10 h-10 bg-blue-500 rounded-xl pointer-events-none z-10">
              <Search className="text-white" size={20} />
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm phản hồi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-14 pl-[52px] pr-12 rounded-xl border-2 border-gray-200 bg-white hover:border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 shadow-sm hover:shadow-md placeholder:text-gray-400 text-[15px] font-medium text-gray-900"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Filter Select */}
          <div className="relative sm:w-[200px]">
            <div className="absolute left-2 top-7 -translate-y-1/2 flex items-center justify-center w-10 h-10 bg-pink-500 rounded-xl pointer-events-none z-10">
              <Filter className="text-white" size={20} />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as "Pending" | "Resolved")}
              className="w-full h-14 pl-[52px] pr-10 rounded-xl border-2 border-gray-200 bg-white hover:border-gray-300 focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all duration-300 shadow-sm hover:shadow-md appearance-none cursor-pointer text-[15px] font-medium text-gray-900"
            >
              <option value="all">Tất cả</option>
              <option value="Pending">Đang xử lý</option>
              <option value="Resolved">Đã giải quyết</option>
            </select>
            <div className="absolute right-3 top-7 -translate-y-1/2 pointer-events-none z-10">
              <ChevronDown className="text-gray-400" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        {filteredFeedbacks.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-blue-500 to-indigo-500">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2 text-white font-bold text-sm">
                      <MessageSquare size={16} />
                      <span>Mã</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2 text-white font-bold text-sm">
                      <User size={16} />
                      <span>Khách hàng</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2 text-white font-bold text-sm">
                      <MessageSquare size={16} />
                      <span>Nội dung</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2 text-white font-bold text-sm">
                      <Filter size={16} />
                      <span>Trạng thái</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2 text-white font-bold text-sm">
                      <Calendar size={16} />
                      <span>Ngày</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <span className="text-white font-bold text-sm">
                      Hành động
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredFeedbacks.map((feedback, index) => {
                  const statusConfig = getStatusConfig(feedback.status);
                  const priorityConfig = getPriorityConfig(feedback.priority);

                  return (
                    <tr
                      key={feedback.id}
                      className={`hover:bg-blue-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                            {index + 1}
                          </div>
                          <span className="font-semibold text-gray-900">
                            {feedback.id}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {feedback.customer.charAt(0)}
                          </div>
                          <span className="font-medium text-gray-900">
                            {feedback.customer}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-700 line-clamp-2 max-w-xs">
                          {feedback.content}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className={`${statusConfig.bg} ${statusConfig.text} px-3 py-1.5 rounded-full font-semibold text-xs inline-flex items-center gap-2 shadow-sm`}
                        >
                          {statusConfig.icon}
                          <span>{statusConfig.label}</span>
                        </div>
                        {priorityConfig && (
                          <div
                            className={`${priorityConfig.bg} ${priorityConfig.color} px-2 py-1 rounded-lg text-xs font-semibold mt-2 inline-block`}
                          >
                            {priorityConfig.label}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar size={14} className="text-blue-500" />
                          <span className="text-sm">{feedback.date}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedFeedback(feedback)}
                          className="group px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg font-semibold text-xs transition-all shadow-sm hover:shadow-md flex items-center gap-2 mx-auto"
                        >
                          <Eye size={14} />
                          <span>Chi tiết</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-16 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="bg-gray-100 p-6 rounded-full">
                <MessageSquare className="text-gray-400" size={48} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Không tìm thấy phản hồi
              </h3>
              <p className="text-gray-500">
                Thử điều chỉnh bộ lọc hoặc tìm kiếm
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterStatus("all");
                }}
                className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:shadow-xl transition-all"
              >
                Xóa bộ lọc
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results Info */}
      <div className="flex justify-between items-center text-sm text-gray-600">
        <span>
          Hiển thị{" "}
          <span className="font-bold text-gray-900">
            {filteredFeedbacks.length}
          </span>{" "}
          / {feedbacks.length} phản hồi
        </span>
        {(searchTerm || filterStatus !== "all") && (
          <button
            onClick={() => {
              setSearchTerm("");
              setFilterStatus("all");
            }}
            className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
          >
            Xóa bộ lọc →
          </button>
        )}
      </div>

      {/* Detail Modal (Simple) */}
      {selectedFeedback && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedFeedback(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 backdrop-blur-md p-2 rounded-lg">
                    <MessageSquare size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Chi tiết phản hồi
                    </h3>
                    <p className="text-blue-100 text-sm">
                      {selectedFeedback.id}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedFeedback(null)}
                  className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
                >
                  <AlertCircle size={20} className="text-white" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <User size={16} className="text-purple-600" />
                  <p className="text-sm font-bold text-gray-900">Khách hàng</p>
                </div>
                <p className="text-gray-900 font-semibold">
                  {selectedFeedback.customer}
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare size={16} className="text-blue-600" />
                  <p className="text-sm font-bold text-gray-900">Nội dung</p>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {selectedFeedback.content}
                </p>
              </div>

              <div className="flex gap-4">
                <div className="flex-1 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Filter size={16} className="text-green-600" />
                    <p className="text-sm font-bold text-gray-900">
                      Trạng thái
                    </p>
                  </div>
                  <div
                    className={`${
                      getStatusConfig(selectedFeedback.status).bg
                    } ${
                      getStatusConfig(selectedFeedback.status).text
                    } px-3 py-2 rounded-lg font-semibold text-sm inline-flex items-center gap-2`}
                  >
                    {getStatusConfig(selectedFeedback.status).icon}
                    <span>
                      {getStatusConfig(selectedFeedback.status).label}
                    </span>
                  </div>
                </div>

                <div className="flex-1 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={16} className="text-orange-600" />
                    <p className="text-sm font-bold text-gray-900">Ngày gửi</p>
                  </div>
                  <p className="text-gray-900 font-semibold">
                    {selectedFeedback.date}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedFeedback(null)}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackTable;
