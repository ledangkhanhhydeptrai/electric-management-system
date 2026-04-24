"use client";
import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/vi";
import { Modal } from "antd";
import {
  CalendarOutlined,
  LeftOutlined,
  RightOutlined,
  CarOutlined,
  ClockCircleOutlined,
  UserOutlined,
  PlusOutlined,
  CloseOutlined,
  CheckCircleOutlined
} from "@ant-design/icons";

dayjs.locale("vi");

interface Event {
  id: string;
  date: string;
  title: string;
  customer: string;
  car: string;
  time?: string;
  status?: "Scheduled" | "Completed" | "Cancelled";
}

const mockEvents: Event[] = [
  { 
    id: "TD001",
    date: "2025-10-12", 
    title: "Nguyen Van A - VinFast VF8",
    customer: "Nguyen Van A",
    car: "VinFast VF8",
    time: "09:00",
    status: "Scheduled"
  },
  { 
    id: "TD002",
    date: "2025-10-15", 
    title: "Tran Thi B - VinFast VF9",
    customer: "Tran Thi B",
    car: "VinFast VF9",
    time: "14:00",
    status: "Scheduled"
  },
  { 
    id: "TD003",
    date: "2025-10-15", 
    title: "Le Van C - VinFast e34",
    customer: "Le Van C",
    car: "VinFast e34",
    time: "16:00",
    status: "Completed"
  },
  { 
    id: "TD004",
    date: "2025-10-20", 
    title: "Pham Thi D - VinFast VF8",
    customer: "Pham Thi D",
    car: "VinFast VF8",
    time: "10:30",
    status: "Scheduled"
  }
];

const TestDriveCalendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const startOfMonth = currentMonth.startOf("month");
  const endOfMonth = currentMonth.endOf("month");
  const startDayOfWeek = startOfMonth.day();
  const daysInMonth = endOfMonth.date();

  const prevMonth = () => setCurrentMonth(currentMonth.subtract(1, "month"));
  const nextMonth = () => setCurrentMonth(currentMonth.add(1, "month"));
  const goToToday = () => setCurrentMonth(dayjs());

  const getEventsForDay = (day: number) => {
    const dateStr = startOfMonth.date(day).format("YYYY-MM-DD");
    return mockEvents.filter((e) => e.date === dateStr);
  };

  const getEventsForSelectedDate = () => {
    if (!selectedDate) return [];
    const dateStr = selectedDate.format("YYYY-MM-DD");
    return mockEvents.filter((e) => e.date === dateStr);
  };

  const handleDayClick = (day: number) => {
    const date = startOfMonth.date(day);
    setSelectedDate(date);
    const events = getEventsForDay(day);
    if (events.length > 0) {
      setIsModalOpen(true);
    }
  };

  const stats = {
    total: mockEvents.length,
    scheduled: mockEvents.filter(e => e.status === "Scheduled").length,
    completed: mockEvents.filter(e => e.status === "Completed").length,
    thisMonth: mockEvents.filter(e => dayjs(e.date).isSame(currentMonth, "month")).length
  };

  const getStatusConfig = (status?: string) => {
    switch (status) {
      case "Completed":
        return { bg: "bg-green-100", text: "text-green-700", border: "border-green-300", icon: <CheckCircleOutlined /> };
      case "Cancelled":
        return { bg: "bg-red-100", text: "text-red-700", border: "border-red-300", icon: <CloseOutlined /> };
      default:
        return { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-300", icon: <ClockCircleOutlined /> };
    }
  };

  // Create calendar grid with empty cells for days before month starts
  const calendarDays = [];
  
  // Add empty cells for days before month starts
  for (let i = 0; i < startDayOfWeek; i++) {
    calendarDays.push(null);
  }
  
  // Add actual days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const isToday = (day: number | null) => {
    if (!day) return false;
    return startOfMonth.date(day).isSame(dayjs(), "day");
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">Tổng lịch hẹn</p>
              <p className="text-3xl font-black text-gray-900">{stats.total}</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl">
              <CalendarOutlined className="text-blue-600 text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">Đã đặt lịch</p>
              <p className="text-3xl font-black text-gray-900">{stats.scheduled}</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl">
              <ClockCircleOutlined className="text-orange-600 text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">Đã hoàn thành</p>
              <p className="text-3xl font-black text-gray-900">{stats.completed}</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-xl">
              <CheckCircleOutlined className="text-green-600 text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-5 shadow-lg cursor-pointer hover:shadow-xl transition-all">
          <div className="flex flex-col items-center justify-center h-full text-white">
            <PlusOutlined className="text-3xl mb-2" />
            <p className="font-bold text-lg">Thêm lịch</p>
          </div>
        </div>
      </div>

      {/* Calendar Card */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Calendar Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <CalendarOutlined className="text-white text-3xl" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white capitalize">
                  {currentMonth.format("MMMM YYYY")}
                </h2>
                <p className="text-blue-100 mt-1">
                  {stats.thisMonth} lịch hẹn trong tháng này
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={prevMonth}
                className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all text-white backdrop-blur-sm"
              >
                <LeftOutlined className="text-xl" />
              </button>
              <button
                onClick={goToToday}
                className="px-5 py-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all text-white font-semibold backdrop-blur-sm border border-white/30"
              >
                Hôm nay
              </button>
              <button
                onClick={nextMonth}
                className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all text-white backdrop-blur-sm"
              >
                <RightOutlined className="text-xl" />
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Body */}
        <div className="p-8">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-3 mb-4">
            {["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"].map((day) => (
              <div key={day} className="text-center font-bold text-gray-700 py-3">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-3">
            {calendarDays.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} className="h-28"></div>;
              }

              const events = getEventsForDay(day);
              const today = isToday(day);

              return (
                <div
                  key={day}
                  onClick={() => handleDayClick(day)}
                  className={`relative border-2 rounded-2xl p-3 h-28 flex flex-col transition-all duration-300 cursor-pointer ${
                    today
                      ? "border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg"
                      : events.length > 0
                      ? "border-green-300 bg-white hover:border-green-400 hover:shadow-lg hover:-translate-y-1"
                      : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
                  }`}
                >
                  {/* Day Number */}
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`font-bold text-lg ${
                        today
                          ? "text-blue-600"
                          : events.length > 0
                          ? "text-gray-900"
                          : "text-gray-600"
                      }`}
                    >
                      {day}
                    </span>
                    {events.length > 0 && (
                      <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full">
                        {events.length}
                      </span>
                    )}
                  </div>

                  {/* Event Indicators */}
                  <div className="flex flex-col gap-1 overflow-hidden">
                    {events.slice(0, 2).map((event) => {
                      const config = getStatusConfig(event.status);
                      return (
                        <div
                          key={event.id}
                          className={`px-2 py-1 ${config.bg} ${config.text} border ${config.border} rounded-lg text-xs font-semibold truncate flex items-center gap-1`}
                          title={event.title}
                        >
                          <CarOutlined className="text-xs flex-shrink-0" />
                          <span className="truncate">{event.time}</span>
                        </div>
                      );
                    })}
                    {events.length > 2 && (
                      <div className="text-xs text-gray-500 font-semibold text-center">
                        +{events.length - 2} lịch nữa
                      </div>
                    )}
                  </div>

                  {/* Today Indicator */}
                  {today && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                      •
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={700}
        closeIcon={<CloseOutlined className="text-xl" />}
        className="testdrive-modal"
      >
        {selectedDate && (
          <div>
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 -mx-6 -mt-6 px-8 py-6 mb-6">
              <h2 className="text-3xl font-bold text-white mb-2 capitalize">
                {selectedDate.format("dddd, DD MMMM YYYY")}
              </h2>
              <p className="text-blue-100">
                {getEventsForSelectedDate().length} lịch hẹn lái thử
              </p>
            </div>

            {/* Events List */}
            <div className="space-y-4">
              {getEventsForSelectedDate().length > 0 ? (
                getEventsForSelectedDate().map((event) => {
                  const config = getStatusConfig(event.status);
                  return (
                    <div
                      key={event.id}
                      className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200 hover:border-blue-300 transition-all"
                    >
                      {/* Event Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white">
                            <CarOutlined className="text-2xl" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{event.car}</h3>
                            <p className="text-sm text-gray-600">Mã: {event.id}</p>
                          </div>
                        </div>
                        <div className={`px-4 py-2 ${config.bg} ${config.text} border-2 ${config.border} rounded-xl font-bold text-sm flex items-center gap-2`}>
                          {config.icon}
                          {event.status}
                        </div>
                      </div>

                      {/* Event Details */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <UserOutlined className="text-blue-600" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 font-medium">Khách hàng</p>
                            <p className="text-sm font-bold text-gray-900">{event.customer}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <ClockCircleOutlined className="text-green-600" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 font-medium">Giờ hẹn</p>
                            <p className="text-sm font-bold text-gray-900">{event.time}</p>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200">
                        <button className="flex-1 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all">
                          Xem chi tiết
                        </button>
                        <button className="flex-1 py-2 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all">
                          Liên hệ
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12">
                  <CalendarOutlined className="text-6xl text-gray-300 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Không có lịch hẹn
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Chưa có lịch lái thử nào trong ngày này
                  </p>
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg">
                    Thêm lịch hẹn
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Custom Styles */}
      <style jsx global>{`
        .testdrive-modal .ant-modal-content {
          padding: 24px;
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
};

export default TestDriveCalendar;