"use client";
import React from "react";
import TestDriveCalendar from "./components/TestDriveCalendar";
import {
  CarOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  RiseOutlined,
  TrophyOutlined,
  ThunderboltOutlined
} from "@ant-design/icons";

const TestDrivePage = () => {
  // Mock statistics - replace with real data
  const stats = {
    totalAppointments: 47,
    scheduled: 18,
    completed: 25,
    cancelled: 4,
    thisWeek: 12,
    conversionRate: 68
  };

  // Mock upcoming appointments
  const upcomingAppointments = [
    {
      id: "TD001",
      customer: "Nguyen Van A",
      car: "VinFast VF8",
      date: "Hôm nay",
      time: "09:00",
      status: "confirmed"
    },
    {
      id: "TD002",
      customer: "Tran Thi B",
      car: "VinFast VF9",
      date: "Hôm nay",
      time: "14:00",
      status: "confirmed"
    },
    {
      id: "TD003",
      customer: "Le Van C",
      car: "VinFast e34",
      date: "Mai",
      time: "10:30",
      status: "pending"
    }
  ];

  // Top cars for test drive
  const topCars = [
    { name: "VinFast VF8", count: 28, percentage: 45 },
    { name: "VinFast VF9", count: 18, percentage: 29 },
    { name: "VinFast e34", count: 16, percentage: 26 }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-10">
          {/* Total Appointments */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl mb-3 group-hover:scale-110 transition-transform duration-300">
                <CalendarOutlined className="text-blue-600 text-3xl" />
              </div>
              <div className="text-4xl font-black text-gray-900 mb-1">
                {stats.totalAppointments}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Tổng lịch hẹn
              </div>
              <div className="flex items-center gap-1 mt-2">
                <RiseOutlined className="text-green-600 text-xs" />
                <span className="text-green-600 text-xs font-semibold">
                  Tháng này
                </span>
              </div>
            </div>
          </div>

          {/* Scheduled */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-orange-300 transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl mb-3 group-hover:scale-110 transition-transform duration-300">
                <ClockCircleOutlined className="text-orange-600 text-3xl" />
              </div>
              <div className="text-4xl font-black text-gray-900 mb-1">
                {stats.scheduled}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Đã đặt lịch
              </div>
              <div className="text-orange-600 text-xs font-semibold mt-2">
                Chờ xử lý
              </div>
            </div>
          </div>

          {/* Completed */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-green-300 transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl mb-3 group-hover:scale-110 transition-transform duration-300">
                <CheckCircleOutlined className="text-green-600 text-3xl" />
              </div>
              <div className="text-4xl font-black text-gray-900 mb-1">
                {stats.completed}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Đã hoàn thành
              </div>
              <div className="text-green-600 text-xs font-semibold mt-2">
                {Math.round((stats.completed / stats.totalAppointments) * 100)}%
                tổng
              </div>
            </div>
          </div>

          {/* This Week */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-purple-300 transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-gradient-to-br from-purple-100 to-pink-200 rounded-2xl mb-3 group-hover:scale-110 transition-transform duration-300">
                <ThunderboltOutlined className="text-purple-600 text-3xl" />
              </div>
              <div className="text-4xl font-black text-gray-900 mb-1">
                {stats.thisWeek}
              </div>
              <div className="text-sm text-gray-600 font-medium">Tuần này</div>
              <div className="text-purple-600 text-xs font-semibold mt-2">
                Sắp tới
              </div>
            </div>
          </div>

          {/* Conversion Rate */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-yellow-300 transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-gradient-to-br from-yellow-100 to-orange-200 rounded-2xl mb-3 group-hover:scale-110 transition-transform duration-300">
                <TrophyOutlined className="text-yellow-600 text-3xl" />
              </div>
              <div className="text-4xl font-black text-gray-900 mb-1">
                {stats.conversionRate}%
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Tỷ lệ chốt
              </div>
              <div className="text-yellow-600 text-xs font-semibold mt-2">
                Xuất sắc
              </div>
            </div>
          </div>

          {/* Quick Action */}
          <div className="group bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <div className="flex flex-col items-center justify-center text-center text-white h-full">
              <div className="text-5xl mb-2">📅</div>
              <div className="font-bold text-lg">Đặt lịch</div>
              <div className="text-sm opacity-90 mt-1">Tạo mới</div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          {/* Upcoming Appointments */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-6 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl text-white">
                  <ClockCircleOutlined className="text-2xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Lịch Sắp Tới
                  </h2>
                  <p className="text-sm text-gray-600">
                    {upcomingAppointments.length} cuộc hẹn
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border-2 border-blue-200 hover:border-blue-400 transition-all hover:shadow-md"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                          {appointment.customer
                            .split(" ")
                            .map((w) => w[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-sm">
                            {appointment.customer}
                          </p>
                          <p className="text-xs text-gray-600">
                            {appointment.id}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`px-2 py-1 rounded-lg text-xs font-bold ${
                          appointment.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {appointment.status === "confirmed"
                          ? "✓ Xác nhận"
                          : "⏳ Chờ"}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                      <CarOutlined className="text-blue-600" />
                      <span className="font-semibold">{appointment.car}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-gray-600">
                        <CalendarOutlined />
                        <span>{appointment.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <ClockCircleOutlined />
                        <span className="font-bold">{appointment.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg">
                Xem tất cả lịch hẹn
              </button>
            </div>
          </div>

          {/* Popular Cars */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-6 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl text-white">
                  <TrophyOutlined className="text-2xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Xe Được Lái Thử Nhiều Nhất
                  </h2>
                  <p className="text-sm text-gray-600">
                    Top 3 dòng xe phổ biến
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {topCars.map((car, index) => (
                  <div key={car.name} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg ${
                            index === 0
                              ? "bg-gradient-to-br from-yellow-400 to-orange-500"
                              : index === 1
                              ? "bg-gradient-to-br from-gray-300 to-gray-400"
                              : "bg-gradient-to-br from-orange-300 to-amber-400"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{car.name}</p>
                          <p className="text-sm text-gray-600">
                            {car.count} lượt lái thử
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black text-gray-900">
                          {car.percentage}%
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          index === 0
                            ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                            : index === 1
                            ? "bg-gradient-to-r from-gray-400 to-gray-500"
                            : "bg-gradient-to-r from-orange-400 to-amber-500"
                        }`}
                        style={{ width: `${car.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-200">
                    <div className="text-2xl font-black text-blue-900">
                      {stats.totalAppointments}
                    </div>
                    <div className="text-xs text-blue-700 font-medium mt-1">
                      Tổng lượt
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
                    <div className="text-2xl font-black text-green-900">
                      {stats.conversionRate}%
                    </div>
                    <div className="text-xs text-green-700 font-medium mt-1">
                      Chốt thành công
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4 text-center border border-purple-200">
                    <div className="text-2xl font-black text-purple-900">
                      4.8★
                    </div>
                    <div className="text-xs text-purple-700 font-medium mt-1">
                      Đánh giá TB
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Calendar */}
        <div className="animate-fadeIn">
          <TestDriveCalendar />
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default TestDrivePage;
