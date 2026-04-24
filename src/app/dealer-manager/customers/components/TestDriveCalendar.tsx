"use client";
import React, { useState } from "react";
import {
  Calendar,
  User,
  Car,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  Eye,
  MapPin,
  Phone,
  Mail
} from "lucide-react";

export interface TestDrive {
  id: string;
  customer: string;
  carModel: string;
  date: string;
  time: string;
  status: "Pending" | "Confirmed" | "Completed";
  location?: string;
  customerPhone?: string;
  customerEmail?: string;
  notes?: string;
}

interface TestDriveCalendarProps {
  testDrives: TestDrive[];
}

const TestDriveCalendar: React.FC<TestDriveCalendarProps> = ({
  testDrives
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | TestDrive["status"]>("all");
  const [selectedTestDrive, setSelectedTestDrive] = useState<TestDrive | null>(null);

  const filteredTestDrives = testDrives.filter((testDrive) => {
    const matchesSearch =
      testDrive.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testDrive.carModel.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || testDrive.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusConfig = (status: TestDrive["status"]) => {
    switch (status) {
      case "Pending":
        return {
          bg: "bg-gradient-to-r from-yellow-500 to-orange-500",
          text: "text-white",
          icon: <Clock size={14} />,
          label: "Chờ xác nhận"
        };
      case "Confirmed":
        return {
          bg: "bg-gradient-to-r from-blue-500 to-indigo-500",
          text: "text-white",
          icon: <CheckCircle2 size={14} />,
          label: "Đã xác nhận"
        };
      case "Completed":
        return {
          bg: "bg-gradient-to-r from-green-500 to-emerald-500",
          text: "text-white",
          icon: <CheckCircle2 size={14} className="fill-current" />,
          label: "Hoàn thành"
        };
    }
  };

  // Calculate stats
  const pendingCount = testDrives.filter((t) => t.status === "Pending").length;
  const confirmedCount = testDrives.filter((t) => t.status === "Confirmed").length;
  const completedCount = testDrives.filter((t) => t.status === "Completed").length;

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 font-medium mb-1">
                Chờ xác nhận
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

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 font-medium mb-1">
                Đã xác nhận
              </p>
              <p className="text-2xl font-bold text-blue-600">
                {confirmedCount}
              </p>
            </div>
            <div className="bg-blue-500 p-2 rounded-lg">
              <CheckCircle2 className="text-white" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 font-medium mb-1">
                Hoàn thành
              </p>
              <p className="text-2xl font-bold text-green-600">
                {completedCount}
              </p>
            </div>
            <div className="bg-green-500 p-2 rounded-lg">
              <CheckCircle2 className="text-white fill-current" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Tìm kiếm khách hàng hoặc xe..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as "Pending" | "Confirmed" | "Completed")}
          className="px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-blue-500 bg-white transition-all"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="Pending">Chờ xác nhận</option>
          <option value="Confirmed">Đã xác nhận</option>
          <option value="Completed">Hoàn thành</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        {filteredTestDrives.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-orange-500 to-red-500">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2 text-white font-bold text-sm">
                      <Calendar size={16} />
                      <span>Mã lịch</span>
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
                      <Car size={16} />
                      <span>Mẫu xe</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2 text-white font-bold text-sm">
                      <Calendar size={16} />
                      <span>Ngày</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2 text-white font-bold text-sm">
                      <Clock size={16} />
                      <span>Thời gian</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2 text-white font-bold text-sm">
                      <Filter size={16} />
                      <span>Trạng thái</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <span className="text-white font-bold text-sm">Hành động</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTestDrives.map((testDrive, index) => {
                  const statusConfig = getStatusConfig(testDrive.status);

                  return (
                    <tr
                      key={testDrive.id}
                      className={`hover:bg-orange-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                            {index + 1}
                          </div>
                          <span className="font-semibold text-gray-900">
                            {testDrive.id}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {testDrive.customer.charAt(0)}
                          </div>
                          <span className="font-medium text-gray-900">
                            {testDrive.customer}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Car size={16} className="text-purple-500" />
                          <span className="font-medium text-gray-900">
                            {testDrive.carModel}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar size={14} className="text-blue-500" />
                          <span className="text-sm">{testDrive.date}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock size={14} className="text-green-500" />
                          <span className="text-sm font-semibold">
                            {testDrive.time}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className={`${statusConfig.bg} ${statusConfig.text} px-3 py-1.5 rounded-full font-semibold text-xs inline-flex items-center gap-2 shadow-sm`}
                        >
                          {statusConfig.icon}
                          <span>{statusConfig.label}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedTestDrive(testDrive)}
                          className="group px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg font-semibold text-xs transition-all shadow-sm hover:shadow-md flex items-center gap-2 mx-auto"
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
                <Calendar className="text-gray-400" size={48} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Không tìm thấy lịch lái thử
              </h3>
              <p className="text-gray-500">
                Thử điều chỉnh bộ lọc hoặc tìm kiếm
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
      </div>

      {/* Results Info */}
      <div className="flex justify-between items-center text-sm text-gray-600">
        <span>
          Hiển thị{" "}
          <span className="font-bold text-gray-900">
            {filteredTestDrives.length}
          </span>{" "}
          / {testDrives.length} lịch hẹn
        </span>
        {(searchTerm || filterStatus !== "all") && (
          <button
            onClick={() => {
              setSearchTerm("");
              setFilterStatus("all");
            }}
            className="text-orange-600 hover:text-orange-700 font-semibold hover:underline"
          >
            Xóa bộ lọc →
          </button>
        )}
      </div>

      {/* Detail Modal */}
      {selectedTestDrive && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedTestDrive(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 backdrop-blur-md p-2 rounded-lg">
                    <Calendar size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Chi tiết lịch lái thử
                    </h3>
                    <p className="text-orange-100 text-sm">
                      {selectedTestDrive.id}
                    </p>
                  </div>
                </div>
                <div
                  className={`${
                    getStatusConfig(selectedTestDrive.status).bg
                  } px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg`}
                >
                  {getStatusConfig(selectedTestDrive.status).icon}
                  <span className="text-sm font-bold text-white">
                    {getStatusConfig(selectedTestDrive.status).label}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              {/* Customer Info */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <User size={16} className="text-blue-600" />
                  <p className="text-sm font-bold text-gray-900">
                    Thông tin khách hàng
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-900 font-semibold">
                    {selectedTestDrive.customer}
                  </p>
                  {selectedTestDrive.customerPhone && (
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Phone size={14} className="text-green-500" />
                      <span>{selectedTestDrive.customerPhone}</span>
                    </div>
                  )}
                  {selectedTestDrive.customerEmail && (
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Mail size={14} className="text-blue-500" />
                      <span>{selectedTestDrive.customerEmail}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Appointment Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Car size={16} className="text-purple-600" />
                    <p className="text-sm font-bold text-gray-900">Mẫu xe</p>
                  </div>
                  <p className="text-gray-900 font-semibold">
                    {selectedTestDrive.carModel}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={16} className="text-green-600" />
                    <p className="text-sm font-bold text-gray-900">Ngày hẹn</p>
                  </div>
                  <p className="text-gray-900 font-semibold">
                    {selectedTestDrive.date}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock size={16} className="text-orange-600" />
                    <p className="text-sm font-bold text-gray-900">Thời gian</p>
                  </div>
                  <p className="text-gray-900 font-semibold">
                    {selectedTestDrive.time}
                  </p>
                </div>

                {selectedTestDrive.location && (
                  <div className="bg-gradient-to-br from-red-50 to-pink-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin size={16} className="text-red-600" />
                      <p className="text-sm font-bold text-gray-900">Địa điểm</p>
                    </div>
                    <p className="text-gray-900 font-semibold">
                      {selectedTestDrive.location}
                    </p>
                  </div>
                )}
              </div>

              {/* Notes */}
              {selectedTestDrive.notes && (
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle size={16} className="text-yellow-600" />
                    <p className="text-sm font-bold text-gray-900">Ghi chú</p>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedTestDrive.notes}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <button
                  onClick={() => setSelectedTestDrive(null)}
                  className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl"
                >
                  Đóng
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl">
                  Xác nhận lịch
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestDriveCalendar;