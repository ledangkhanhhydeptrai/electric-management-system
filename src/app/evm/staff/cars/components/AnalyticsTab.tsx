import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { SalesData, Car } from "../types";

interface AnalyticsTabProps {
  salesData: SalesData[];
  cars: Car[];
}

export default function AnalyticsTab({ salesData, cars }: AnalyticsTabProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6">
          Doanh thu theo tháng ($1000)
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="revenue"
              fill="#3b82f6"
              name="Doanh thu ($1000)"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Hiển thị thông số kỹ thuật của xe */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cars.slice(0, 3).map((car, index) =>
          <div
            key={car.vin || index}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <h4 className="font-bold text-gray-900 mb-4">
              VIN: {car.vin}
            </h4>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Mã xe:</span>
                <span className="font-semibold text-gray-900">
                  {car.code}
                </span>
              </div>
              {/* <div className="flex justify-between">
                <span className="text-gray-500">Giá:</span>
                <span className="font-semibold text-gray-900">${car.price.toLocaleString("vi-VN")}</span>
              </div> */}
              <div className="flex justify-between">
                <span className="text-gray-500">Pin:</span>
                <span className="font-semibold text-gray-900">
                  {car.batteryKwh} kWh
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Quãng đường:</span>
                <span className="font-semibold text-gray-900">
                  {car.rangeKm} km
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Số ghế:</span>
                <span className="font-semibold text-gray-900">
                  {car.seat} chỗ
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Bảo hành:</span>
                <span className="font-semibold text-gray-900">
                  {car.baseWarrantyMonths} tháng
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Màu:</span>
                <span className="font-semibold text-gray-900">
                  {car.color}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Trạng thái:</span>
                <span className="font-semibold text-gray-900">
                  {car.status}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
