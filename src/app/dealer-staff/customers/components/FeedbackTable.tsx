"use client";
import React, { useState, useMemo } from "react";
import { Table, Modal } from "antd";
import {
  CommentOutlined,
  SearchOutlined,
  FilterOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  StarOutlined,
  WarningOutlined,
  SmileOutlined,
  FrownOutlined,
  CloseOutlined,
  UserOutlined,
  CalendarOutlined
} from "@ant-design/icons";

interface Feedback {
  id: string;
  customer: string;
  type: "Feedback" | "Complaint";
  message: string;
  status: "New" | "In Progress" | "Resolved";
  date?: string;
  priority?: "Low" | "Medium" | "High";
  rating?: number;
}

const mockFeedbacks: Feedback[] = [
  {
    id: "F001",
    customer: "Nguyen Van A",
    type: "Feedback",
    message: "Dịch vụ tốt, nhân viên tư vấn nhiệt tình. Xe giao đúng hẹn.",
    status: "Resolved",
    date: "2025-09-15T10:30:00Z",
    priority: "Low",
    rating: 5
  },
  {
    id: "F002",
    customer: "Tran Thi B",
    type: "Complaint",
    message:
      "Xe giao chậm hơn so với hẹn ban đầu. Cần cải thiện quy trình giao hàng.",
    status: "In Progress",
    date: "2025-10-12T14:20:00Z",
    priority: "High",
    rating: 2
  },
  {
    id: "F003",
    customer: "Le Van C",
    type: "Feedback",
    message:
      "Giá cả hợp lý, xe chất lượng tốt. Rất hài lòng với dịch vụ sau bán hàng.",
    status: "Resolved",
    date: "2025-09-20T09:15:00Z",
    priority: "Low",
    rating: 4
  },
  {
    id: "F004",
    customer: "Pham Thi D",
    type: "Complaint",
    message:
      "Một số tính năng của xe chưa được hướng dẫn rõ ràng khi bàn giao.",
    status: "New",
    date: "2025-10-16T16:45:00Z",
    priority: "Medium",
    rating: 3
  },
  {
    id: "F005",
    customer: "Hoang Van E",
    type: "Feedback",
    message:
      "Showroom đẹp, xe trưng bày đa dạng. Nhân viên tư vấn chuyên nghiệp.",
    status: "Resolved",
    date: "2025-09-28T11:00:00Z",
    priority: "Low",
    rating: 5
  }
];

const FeedbackTable: React.FC = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<
    "All" | "Feedback" | "Complaint"
  >("All");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "New" | "In Progress" | "Resolved"
  >("All");
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredData = useMemo(() => {
    return mockFeedbacks.filter((item) => {
      const matchSearch =
        item.customer.toLowerCase().includes(search.toLowerCase()) ||
        item.message.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === "All" || item.type === typeFilter;
      const matchStatus =
        statusFilter === "All" || item.status === statusFilter;
      return matchSearch && matchType && matchStatus;
    });
  }, [search, typeFilter, statusFilter]);

  const stats = useMemo(() => {
    return {
      total: mockFeedbacks.length,
      feedback: mockFeedbacks.filter((f) => f.type === "Feedback").length,
      complaint: mockFeedbacks.filter((f) => f.type === "Complaint").length,
      new: mockFeedbacks.filter((f) => f.status === "New").length,
      inProgress: mockFeedbacks.filter((f) => f.status === "In Progress")
        .length,
      resolved: mockFeedbacks.filter((f) => f.status === "Resolved").length
    };
  }, []);

  const handleViewDetail = (record: Feedback) => {
    setSelectedFeedback(record);
    setIsModalOpen(true);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getTypeConfig = (type: "Feedback" | "Complaint") => {
    return type === "Feedback"
      ? {
          icon: <SmileOutlined className="text-xs" />,
          bg: "bg-blue-100",
          text: "text-blue-700",
          border: "border-blue-300"
        }
      : {
          icon: <FrownOutlined className="text-xs" />,
          bg: "bg-red-100",
          text: "text-red-700",
          border: "border-red-300"
        };
  };

  const getStatusConfig = (status: Feedback["status"]) => {
    switch (status) {
      case "New":
        return {
          icon: <StarOutlined className="text-xs" />,
          bg: "bg-yellow-100",
          text: "text-yellow-700",
          border: "border-yellow-300"
        };
      case "In Progress":
        return {
          icon: <ClockCircleOutlined className="text-xs" />,
          bg: "bg-orange-100",
          text: "text-orange-700",
          border: "border-orange-300"
        };
      case "Resolved":
        return {
          icon: <CheckCircleOutlined className="text-xs" />,
          bg: "bg-green-100",
          text: "text-green-700",
          border: "border-green-300"
        };
    }
  };

  const getPriorityConfig = (priority?: string) => {
    switch (priority) {
      case "High":
        return { icon: "🔴", text: "Cao", color: "text-red-600" };
      case "Medium":
        return { icon: "🟡", text: "Trung bình", color: "text-orange-600" };
      default:
        return { icon: "🟢", text: "Thấp", color: "text-green-600" };
    }
  };

  const columns = [
    {
      title: "Mã",
      dataIndex: "id",
      key: "id",
      width: 100,
      render: (text: string) => (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <span className="font-bold text-gray-900">{text}</span>
        </div>
      )
    },
    {
      title: "Khách hàng",
      dataIndex: "customer",
      key: "customer",
      width: 180,
      render: (text: string) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
            {text
              .split(" ")
              .map((w) => w[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)}
          </div>
          <div>
            <div className="font-semibold text-gray-900">{text}</div>
            <div className="text-xs text-gray-500">Khách hàng</div>
          </div>
        </div>
      )
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      width: 140,
      render: (type: "Feedback" | "Complaint") => {
        const config = getTypeConfig(type);
        return (
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 ${config.bg} ${config.text} border-2 ${config.border} rounded-lg font-bold text-xs`}
          >
            {config.icon}
            <span>{type}</span>
          </div>
        );
      }
    },
    {
      title: "Nội dung",
      dataIndex: "message",
      key: "message",
      render: (text: string) => (
        <div className="text-sm text-gray-700 max-w-md">
          {text.length > 80 ? `${text.substring(0, 80)}...` : text}
        </div>
      )
    },
    {
      title: "Độ ưu tiên",
      dataIndex: "priority",
      key: "priority",
      width: 130,
      render: (priority?: string) => {
        const config = getPriorityConfig(priority);
        return (
          <div className="flex items-center gap-2">
            <span className="text-lg">{config.icon}</span>
            <span className={`font-semibold text-sm ${config.color}`}>
              {config.text}
            </span>
          </div>
        );
      }
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (status: Feedback["status"]) => {
        const config = getStatusConfig(status);
        return (
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 ${config.bg} ${config.text} border-2 ${config.border} rounded-lg font-bold text-xs`}
          >
            {config.icon}
            <span>{status}</span>
          </div>
        );
      }
    },
    {
      title: "Thao tác",
      key: "action",
      width: 120,
      render: (_: unknown, record: Feedback) => (
        <button
          onClick={() => handleViewDetail(record)}
          className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold rounded-lg border-2 border-blue-200 transition-all hover:shadow-md flex items-center gap-2"
        >
          <EyeOutlined />
          Xem
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-gray-200">
          <div className="text-center">
            <div className="text-3xl font-black text-gray-900">
              {stats.total}
            </div>
            <div className="text-xs text-gray-600 font-medium mt-1">
              Tổng số
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 shadow-md border-2 border-blue-200">
          <div className="text-center">
            <div className="text-3xl font-black text-blue-900">
              {stats.feedback}
            </div>
            <div className="text-xs text-blue-700 font-medium mt-1">
              Phản hồi
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 shadow-md border-2 border-red-200">
          <div className="text-center">
            <div className="text-3xl font-black text-red-900">
              {stats.complaint}
            </div>
            <div className="text-xs text-red-700 font-medium mt-1">
              Khiếu nại
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 shadow-md border-2 border-yellow-200">
          <div className="text-center">
            <div className="text-3xl font-black text-yellow-900">
              {stats.new}
            </div>
            <div className="text-xs text-yellow-700 font-medium mt-1">Mới</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 shadow-md border-2 border-orange-200">
          <div className="text-center">
            <div className="text-3xl font-black text-orange-900">
              {stats.inProgress}
            </div>
            <div className="text-xs text-orange-700 font-medium mt-1">
              Đang xử lý
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 shadow-md border-2 border-green-200">
          <div className="text-center">
            <div className="text-3xl font-black text-green-900">
              {stats.resolved}
            </div>
            <div className="text-xs text-green-700 font-medium mt-1">
              Đã giải quyết
            </div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Search */}
          <div className="flex-1 w-full lg:max-w-md">
            <div className="relative">
              <SearchOutlined className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Tìm kiếm theo mã, khách hàng, nội dung..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Type Filter */}
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl border-2 border-gray-300 p-1">
              <button
                onClick={() => setTypeFilter("All")}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  typeFilter === "All"
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => setTypeFilter("Feedback")}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  typeFilter === "Feedback"
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                😊 Phản hồi
              </button>
              <button
                onClick={() => setTypeFilter("Complaint")}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  typeFilter === "Complaint"
                    ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                😟 Khiếu nại
              </button>
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setStatusFilter(
                  e.target.value as "All" | "New" | "In Progress" | "Resolved"
                )
              }
              className="px-4 py-3 rounded-xl border-2 border-gray-300 bg-gray-50 text-gray-900 font-semibold focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all cursor-pointer"
            >
              <option value="All">Tất cả trạng thái</option>
              <option value="New">⭐ Mới</option>
              <option value="In Progress">⏰ Đang xử lý</option>
              <option value="Resolved">✅ Đã giải quyết</option>
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {(search || typeFilter !== "All" || statusFilter !== "All") && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2 text-sm">
              <FilterOutlined className="text-gray-500" />
              <span className="text-gray-600 font-medium">Đang lọc:</span>
              {search && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg font-medium">
                  {search}
                </span>
              )}
              {typeFilter !== "All" && (
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg font-medium">
                  {typeFilter}
                </span>
              )}
              {statusFilter !== "All" && (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg font-medium">
                  {statusFilter}
                </span>
              )}
              <span className="text-gray-500">
                • {filteredData.length} kết quả
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <Table
          dataSource={filteredData}
          columns={columns}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showTotal: (total) => `Tổng ${total} mục`,
            showSizeChanger: true
          }}
          className="modern-feedback-table"
          locale={{
            emptyText: (
              <div className="py-12 text-center">
                <CommentOutlined className="text-6xl text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Không tìm thấy kết quả
                </h3>
                <p className="text-gray-600">Thử điều chỉnh bộ lọc của bạn</p>
              </div>
            )
          }}
        />
      </div>

      {/* Detail Modal */}
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={700}
        closeIcon={<CloseOutlined className="text-xl" />}
        className="feedback-modal"
      >
        {selectedFeedback && (
          <div>
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 -mx-6 -mt-6 px-8 py-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Chi Tiết {selectedFeedback.type}
                  </h2>
                  <p className="text-blue-100">Mã: {selectedFeedback.id}</p>
                </div>
                <div
                  className={`px-4 py-2 ${
                    getStatusConfig(selectedFeedback.status).bg
                  } ${getStatusConfig(selectedFeedback.status).text} border-2 ${
                    getStatusConfig(selectedFeedback.status).border
                  } rounded-xl font-bold flex items-center gap-2`}
                >
                  {getStatusConfig(selectedFeedback.status).icon}
                  {selectedFeedback.status}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <UserOutlined className="text-blue-600" />
                  Thông tin khách hàng
                </h3>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <p className="text-gray-900 font-semibold text-lg">
                    {selectedFeedback.customer}
                  </p>
                </div>
              </div>

              {/* Message */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <CommentOutlined className="text-blue-600" />
                  Nội dung chi tiết
                </h3>
                <div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-500">
                  <p className="text-gray-700 leading-relaxed">
                    {selectedFeedback.message}
                  </p>
                </div>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CalendarOutlined className="text-gray-600" />
                    <span className="text-sm text-gray-600 font-medium">
                      Ngày tạo
                    </span>
                  </div>
                  <p className="text-gray-900 font-semibold">
                    {formatDate(selectedFeedback.date)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <WarningOutlined className="text-gray-600" />
                    <span className="text-sm text-gray-600 font-medium">
                      Độ ưu tiên
                    </span>
                  </div>
                  <p className="text-gray-900 font-semibold flex items-center gap-2">
                    <span className="text-xl">
                      {getPriorityConfig(selectedFeedback.priority).icon}
                    </span>
                    {getPriorityConfig(selectedFeedback.priority).text}
                  </p>
                </div>
              </div>

              {/* Rating */}
              {selectedFeedback.rating && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Đánh giá
                  </h3>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-2xl ${
                          star <= selectedFeedback.rating!
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                    <span className="ml-2 text-gray-600 font-semibold">
                      {selectedFeedback.rating}/5
                    </span>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg">
                  Đánh dấu đã giải quyết
                </button>
                <button className="flex-1 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-all">
                  Liên hệ khách hàng
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Custom Styles */}
      <style jsx global>{`
        .modern-feedback-table .ant-table {
          background: transparent;
        }

        .modern-feedback-table .ant-table-thead > tr > th {
          background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
          border-bottom: 3px solid #3b82f6;
          font-weight: 700;
          padding: 16px;
          color: #1f2937;
        }

        .modern-feedback-table .ant-table-tbody > tr > td {
          padding: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .modern-feedback-table .ant-table-tbody > tr:hover > td {
          background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
        }

        .feedback-modal .ant-modal-content {
          padding: 24px;
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
};

export default FeedbackTable;
