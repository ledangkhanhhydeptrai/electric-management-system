"use client";
import React, { useState, useEffect } from "react";

export interface TestDrive {
  id: string;
  customer: string;
  carModel: string;
  date: string; // ISO string "YYYY-MM-DD"
  status?: "Pending" | "Confirmed" | "Completed";
}

interface Props {
  testDrives: TestDrive[];
}

// Màu trạng thái
const statusColors: Record<string, string> = {
  Pending: "bg-yellow-400",
  Confirmed: "bg-blue-500",
  Completed: "bg-green-500",
};

const TestDriveCalendar: React.FC<Props> = ({ testDrives }) => {
  // Chỉ render trên client
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  // State tháng/năm
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [monthLabel, setMonthLabel] = useState("");

  useEffect(() => {
    // Tính nhãn tháng/năm client-side
    setMonthLabel(
      new Date(currentYear, currentMonth).toLocaleString("vi-VN", {
        month: "long",
        year: "numeric",
      })
    );
  }, [currentMonth, currentYear]);

  if (!isClient) return null; // tránh SSR mismatch

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else setCurrentMonth(currentMonth - 1);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else setCurrentMonth(currentMonth + 1);
  };

  const getEventsForDay = (day: number) => {
    const dayStr = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
    return testDrives.filter((td) => td.date.startsWith(dayStr));
  };

  const weekdays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  return (
    <div className="w-full overflow-x-auto text-black">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
          onClick={prevMonth}
        >
          Prev
        </button>
        <h2 className="text-lg font-bold">{monthLabel}</h2>
        <button
          className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
          onClick={nextMonth}
        >
          Next
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-1 text-center font-semibold mb-1">
        {weekdays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 gap-2">
        {/* Empty days */}
        {Array.from({ length: firstDayOfMonth }).map((_, idx) => (
          <div key={`empty-${idx}`}></div>
        ))}

        {Array.from({ length: daysInMonth }, (_, idx) => {
          const day = idx + 1;
          const events = getEventsForDay(day);
          const isToday =
            day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear();

          return (
            <div
              key={day}
              className={`border border-gray-300 p-2 rounded min-h-[80px] flex flex-col ${
                isToday ? "bg-gradient-to-r from-orange-300 to-pink-300" : ""
              }`}
            >
              <div className="text-sm font-bold mb-1 text-black">{day}</div>
              <div className="flex flex-col gap-1 overflow-y-auto max-h-[60px]">
                {events.map((e) => (
                  <span
                    key={e.id}
                    className={`text-xs px-1 py-0.5 rounded ${
                      e.status ? statusColors[e.status] : "bg-orange-500"
                    } font-semibold text-black`}
                    title={`${e.carModel} - ${e.customer}`}
                  >
                    {e.carModel} - {e.customer}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-4 flex-wrap text-sm">
        {Object.entries(statusColors).map(([status, color]) => (
          <div key={status} className="flex items-center gap-1">
            <span className={`w-3 h-3 rounded-full ${color}`}></span>
            <span>{status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestDriveCalendar;
