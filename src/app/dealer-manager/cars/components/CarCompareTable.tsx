"use client";
import React from "react";
import {
  DollarSign,
  Car,
  Palette,
  Gauge,
  CheckCircle2,
  Award
} from "lucide-react";

export interface CarCompare {
  id: string;
  name: string;
  price: number;
  type: string;
  color?: string;
  mileage?: number;
  features?: string[];
}

const carsFromApi = [
  {
    id: "3d3291e6-e421-4ce7-a009-ecdab44a3dfe",
    vin: "Vinfast VF8",
    code: "VF8",
    color: "blue",
    status: "IN_STOCK",
    rangeKm: 50000,
    seat: 7,
    batteryKwh: 500,
    price: 500000000
  }
];

// Map JSON API sang CarCompare
const mappedCars: CarCompare[] = carsFromApi.map((car) => ({
  id: car.id,
  name: car.vin,
  price: car.price,
  type: car.code,
  color: car.color,
  mileage: car.rangeKm,
  features: [
    `Ghế: ${car.seat}`,
    `Pin: ${car.batteryKwh} kWh`,
    `Trạng thái: ${car.status}`
  ]
}));

const CarCompareTable: React.FC = () => {
  const cars = mappedCars;

  const specsList: {
    key: keyof CarCompare | "features";
    label: string;
    icon: React.ReactNode;
  }[] = [
    { key: "price", label: "Giá bán", icon: <DollarSign size={18} className="text-green-600" /> },
    { key: "type", label: "Loại xe", icon: <Car size={18} className="text-blue-600" /> },
    { key: "color", label: "Màu sắc", icon: <Palette size={18} className="text-pink-600" /> },
    { key: "mileage", label: "Km đã đi", icon: <Gauge size={18} className="text-orange-600" /> },
    { key: "features", label: "Tính năng", icon: <Award size={18} className="text-blue-600" /> }
  ];

  const minPrice = Math.min(...cars.map((car) => car.price));

  return (
    <div className="w-full">
      {/* Car Headers */}
      {/* <div
        className="grid gap-4 mb-6"
        style={{ gridTemplateColumns: `200px repeat(${cars.length}, 1fr)` }}
      >
        {cars.map((car, index) => (
          <div
            key={car.id}
            className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30">
                <span className="text-xs font-bold">#{index + 1}</span>
              </div>
              {car.price === minPrice && (
                <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full">
                  <span className="text-xs font-bold">Giá tốt nhất</span>
                </div>
              )}
            </div>
            <h3 className="text-xl font-bold mb-2">{car.name}</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">{car.price.toLocaleString("vi-VN")}</span>
              <span className="text-sm text-blue-100">VNĐ</span>
            </div>
          </div>
        ))}
      </div> */}

      {/* Comparison Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <tbody className="divide-y divide-gray-100">
              {specsList.map((spec, index) => (
                <tr key={spec.key} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                  <td className="px-6 py-5 w-52">
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-100 p-2 rounded-lg">{spec.icon}</div>
                      <span className="font-bold text-gray-900">{spec.label}</span>
                    </div>
                  </td>
                  {cars.map((car) => (
                    <td key={car.id} className="px-6 py-5">
                      {spec.key === "price" ? (
                        <div className="flex flex-col gap-1">
                          <span className={`text-lg font-bold ${car.price === minPrice ? "text-green-600" : "text-gray-900"}`}>
                            {car.price.toLocaleString("vi-VN")} VNĐ
                          </span>
                        </div>
                      ) : spec.key === "features" ? (
                        car.features?.length ? (
                          <div className="flex flex-col gap-2">
                            {car.features.map((f, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm">
                                <CheckCircle2 size={16} className="text-green-600 flex-shrink-0" />
                                <span className="text-gray-700">{f}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-400 italic">Không có dữ liệu</span>
                        )
                      ) : spec.key === "mileage" ? (
                        car.mileage !== undefined ? (
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">{car.mileage.toLocaleString("vi-VN")}</span>
                            <span className="text-sm text-gray-500">km</span>
                          </div>
                        ) : (
                          <span className="text-gray-400 italic">Không có dữ liệu</span>
                        )
                      ) : spec.key === "color" ? (
                        <span className="inline-block bg-pink-100 text-pink-800 px-3 py-1.5 rounded-full text-sm font-semibold">{car.color || "-"}</span>
                      ) : null}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CarCompareTable;
