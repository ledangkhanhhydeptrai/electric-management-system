"use client";
import React from "react";
import TestDriveCalendar, { TestDrive } from "./components/TestDriveCalendar";
import {
  Calendar,
  Car,
  Clock,
  CheckCircle2,

  TrendingUp,
  MapPin,
  Plus,
  Download,
  Activity,
  AlertCircle
} from "lucide-react";

const mockTestDrives: TestDrive[] = [
  {
    id: "TD001",
    customer: "Nguyen Van A",
    carModel: "VinFast VF8",
    date: "2025-09-10",
    time: "09:00",
    status: "Pending",
    location: "Showroom Hà Nội"
  },
  {
    id: "TD002",
    customer: "Tran Thi B",
    carModel: "VinFast VF9",
    date: "2025-09-11",
    time: "14:00",
    status: "Confirmed",
    location: "Showroom TP.HCM"
  },
  {
    id: "TD003",
    customer: "Le Van C",
    carModel: "VinFast VF8",
    date: "2025-09-09",
    time: "10:30",
    status: "Completed",
    location: "Showroom Đà Nẵng"
  }
];

const TestDrivePage = () => {
  // Calculate stats
  const totalTestDrives = mockTestDrives.length;
  const pendingCount = mockTestDrives.filter(
    (t) => t.status === "Pending"
  ).length;
  const confirmedCount = mockTestDrives.filter(
    (t) => t.status === "Confirmed"
  ).length;
  const completedCount = mockTestDrives.filter(
    (t) => t.status === "Completed"
  ).length;

  // Popular models
  const modelCounts = mockTestDrives.reduce((acc, drive) => {
    acc[drive.carModel] = (acc[drive.carModel] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const popularModels = Object.entries(modelCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/30 shadow-lg">
                <Calendar size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Quản Lý Lịch Lái Thử
                </h1>
                <p className="text-blue-100 text-sm md:text-base">
                  Lên lịch và theo dõi các buổi lái thử xe
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="hidden md:flex gap-2">
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/30 text-white font-semibold transition-all flex items-center gap-2">
                <Download size={18} />
                <span>Xuất lịch</span>
              </button>
              <button className="bg-white hover:bg-gray-100 px-4 py-2 rounded-xl text-blue-600 font-bold transition-all shadow-lg flex items-center gap-2">
                <Plus size={18} />
                <span>Đặt lịch mới</span>
              </button>
            </div>
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
                  Tổng lịch hẹn
                </p>
                <p className="text-3xl font-bold text-blue-600">
                  {totalTestDrives}
                </p>
                <p className="text-xs text-gray-500 mt-1">Tháng này</p>
              </div>
              <div className="bg-blue-500 p-3 rounded-xl">
                <Calendar className="text-white" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-100 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">
                  Chờ xác nhận
                </p>
                <p className="text-3xl font-bold text-orange-600">
                  {pendingCount}
                </p>
                <p className="text-xs text-gray-500 mt-1">Cần xử lý</p>
              </div>
              <div className="bg-orange-500 p-3 rounded-xl">
                <Clock className="text-white" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">
                  Đã xác nhận
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {confirmedCount}
                </p>
                <p className="text-xs text-gray-500 mt-1">Sắp diễn ra</p>
              </div>
              <div className="bg-green-500 p-3 rounded-xl">
                <CheckCircle2 className="text-white" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">
                  Hoàn thành
                </p>
                <p className="text-3xl font-bold text-purple-600">
                  {completedCount}
                </p>
                <p className="text-xs text-gray-500 mt-1">Thành công</p>
              </div>
              <div className="bg-purple-500 p-3 rounded-xl">
                <CheckCircle2 className="text-white fill-current" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Activity size={20} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Lịch hẹn hôm nay
                </h3>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold hover:underline">
                Xem tất cả →
              </button>
            </div>

            <div className="space-y-4">
              {mockTestDrives
                .filter((drive) => drive.status !== "Completed")
                .slice(0, 3)
                .map((drive) => (
                  <div
                    key={drive.id}
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {drive.customer.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {drive.customer}
                            </p>
                            <p className="text-xs text-gray-500">{drive.id}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Car size={14} className="text-purple-500" />
                            <span>{drive.carModel}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock size={14} className="text-orange-500" />
                            <span>{drive.time}</span>
                          </div>
                          {drive.location && (
                            <div className="flex items-center gap-2 text-gray-600 col-span-2">
                              <MapPin size={14} className="text-red-500" />
                              <span>{drive.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                          drive.status === "Confirmed"
                            ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                            : "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                        }`}
                      >
                        {drive.status === "Confirmed"
                          ? "Đã xác nhận"
                          : "Chờ xác nhận"}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="space-y-4">
            {/* Popular Models */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Car size={20} className="text-purple-600" />
                <h3 className="font-bold text-gray-900">Xe được yêu thích</h3>
              </div>
              <div className="space-y-3">
                {popularModels.map(([model, count], index) => (
                  <div
                    key={model}
                    className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                        {index + 1}
                      </div>
                      <span className="font-semibold text-gray-900 text-sm">
                        {model}
                      </span>
                    </div>
                    <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {count} lượt
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={20} className="text-green-600" />
                <h3 className="font-bold text-gray-900">Thống kê</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">
                      Tỷ lệ hoàn thành
                    </span>
                    <span className="text-sm font-bold text-green-600">
                      {((completedCount / totalTestDrives) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${(completedCount / totalTestDrives) * 100}%`
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Đặt trước</span>
                    <span className="text-sm font-bold text-blue-600">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full w-[85%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Hài lòng</span>
                    <span className="text-sm font-bold text-purple-600">
                      92%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-[92%]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-l-4 border-orange-500 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertCircle
                  size={20}
                  className="text-orange-600 flex-shrink-0 mt-0.5"
                />
                <div>
                  <p className="text-sm font-bold text-orange-900 mb-1">
                    💡 Mẹo quản lý
                  </p>
                  <p className="text-xs text-orange-800 leading-relaxed">
                    Xác nhận lịch sớm giúp khách hàng chuẩn bị tốt hơn và giảm
                    tỷ lệ hủy lịch.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 mb-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                <Calendar size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Lịch Lái Thử Chi Tiết
                </h2>
                <p className="text-orange-100 text-sm">
                  Quản lý toàn bộ lịch hẹn
                </p>
              </div>
            </div>
          </div>

          <TestDriveCalendar testDrives={mockTestDrives} />
        </div>

        {/* Bottom Info */}
        <div className="text-center text-gray-600">
          <p className="text-sm">
            Tổng cộng{" "}
            <span className="font-bold text-gray-900">{totalTestDrives}</span>{" "}
            lịch hẹn •{" "}
            <span className="font-bold text-orange-600">{pendingCount}</span>{" "}
            chờ xác nhận •{" "}
            <span className="font-bold text-green-600">{completedCount}</span>{" "}
            hoàn thành
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestDrivePage;
