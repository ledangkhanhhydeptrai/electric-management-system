// app/compare/page.tsx
"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useState, useMemo } from "react";
import { CheckCircle2, Car } from "lucide-react";
import Image from "next/image";

interface CarAttribute {
  label: string;
  value: string | number | boolean;
  type: "text" | "number" | "boolean";
}

interface Car {
  id: string;
  name: string;
  thumbnail: string;
  price: number;
  attributes: CarAttribute[];
}

const MOCK_CARS: Car[] = [
  {
    id: "car-001",
    name: "VinFast VF 8 Plus",
    thumbnail:
      "https://images.unsplash.com/photo-1621254359048-b4b02d6b3c9b?...",
    price: 1300000000,
    attributes: [
      { label: "Loại động cơ", value: "Điện", type: "text" },
      { label: "Công suất tối đa (HP)", value: 402, type: "number" },
      { label: "Mô-men xoắn (Nm)", value: 620, type: "number" },
      { label: "Tăng tốc 0-100km/h", value: "5.5 giây", type: "text" },
      { label: "Phạm vi hoạt động (km)", value: 420, type: "number" },
      { label: "Số chỗ ngồi", value: 5, type: "number" },
      { label: "Hỗ trợ lái nâng cao", value: true, type: "boolean" },
      { label: "Màn hình cảm ứng", value: "15.6 inch", type: "text" }
    ]
  },
  {
    id: "car-002",
    name: "Toyota Camry 2.5Q",
    thumbnail:
      "https://images.unsplash.com/photo-1594954784749-33d3950ef4b2?...",
    price: 1450000000,
    attributes: [
      { label: "Loại động cơ", value: "Xăng 2.5L", type: "text" },
      { label: "Công suất tối đa (HP)", value: 181, type: "number" },
      { label: "Mô-men xoắn (Nm)", value: 235, type: "number" },
      { label: "Tăng tốc 0-100km/h", value: "9.2 giây", type: "text" },
      { label: "Phạm vi hoạt động (km)", value: "N/A", type: "text" },
      { label: "Số chỗ ngồi", value: 5, type: "number" },
      { label: "Hỗ trợ lái nâng cao", value: false, type: "boolean" },
      { label: "Màn hình cảm ứng", value: "9 inch", type: "text" }
    ]
  },
  {
    id: "car-003",
    name: "Mercedes-Benz C 200",
    thumbnail:
      "https://images.unsplash.com/photo-1626297058864-dd55694c979d?...",
    price: 1800000000,
    attributes: [
      { label: "Loại động cơ", value: "Xăng 1.5L Turbo", type: "text" },
      { label: "Công suất tối đa (HP)", value: 204, type: "number" },
      { label: "Mô-men xoắn (Nm)", value: 300, type: "number" },
      { label: "Tăng tốc 0-100km/h", value: "7.3 giây", type: "text" },
      { label: "Phạm vi hoạt động (km)", value: "N/A", type: "text" },
      { label: "Số chỗ ngồi", value: 5, type: "number" },
      { label: "Hỗ trợ lái nâng cao", value: true, type: "boolean" },
      { label: "Màn hình cảm ứng", value: "11.9 inch", type: "text" }
    ]
  }
];

const formatCurrency = (amount: number) =>
  amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

export default function ComparePage() {
  const [selectedCarIds, setSelectedCarIds] = useState<string[]>([]);

  const selectedCars = useMemo(() => {
    return selectedCarIds
      .map((id) => MOCK_CARS.find((car) => car.id === id))
      .filter(Boolean) as Car[];
  }, [selectedCarIds]);

  const allAttributes = useMemo(() => {
    const attributeLabels = new Set<string>();
    selectedCars.forEach((car) => {
      car.attributes.forEach((attr) => attributeLabels.add(attr.label));
    });
    return Array.from(attributeLabels);
  }, [selectedCars]);

  const toggleCarSelection = (carId: string) => {
    setSelectedCarIds((prevIds) => {
      if (prevIds.includes(carId)) {
        return prevIds.filter((id) => id !== carId);
      } else if (prevIds.length < 3) {
        return [...prevIds, carId];
      }
      alert("Bạn chỉ có thể so sánh tối đa 3 xe cùng lúc.");
      return prevIds;
    });
  };

  return (
    <>
      <Header />

      {/* Car selection */}
      <section className="mt-15 bg-white/90 p-10 shadow-xl border border-gray-200 rounded-2xl">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3">
            <Car className="w-10 h-10 text-orange-500 drop-shadow-md" />
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 drop-shadow-lg">
              So sánh xe điện & xe xăng
            </h1>
          </div>
          <p className="mt-4 text-lg md:text-xl text-gray-700 mx-auto">
            Chọn tối đa{" "}
            <span className="font-bold text-orange-500">3 mẫu xe</span> để xem
            chi tiết thông số, giá cả và tính năng nổi bật.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_CARS.map((car) => (
            <div
              key={car.id}
              onClick={() => toggleCarSelection(car.id)}
              className={`relative bg-white rounded-xl overflow-hidden shadow-md border border-gray-300 
              hover:border-orange-400 hover:shadow-orange-300/50 transition-all duration-300 hover:scale-105 cursor-pointer 
              ${
                selectedCarIds.includes(car.id) ? "ring-4 ring-orange-400" : ""
              }`}
            >
              <Image
                src={car.thumbnail}
                alt={car.name}
                width={500}
                height={300}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  {car.name}
                </h3>
                <p className="text-orange-500 font-semibold text-lg">
                  {formatCurrency(car.price)}
                </p>
              </div>
              {selectedCarIds.includes(car.id) && (
                <CheckCircle2 className="absolute top-4 right-4 text-orange-500 w-8 h-8 drop-shadow-lg" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      {selectedCars.length > 0 && (
        <section className="mt-16 bg-white/90 p-10 shadow-xl border border-gray-200 rounded-2xl">
          <h2 className="text-3xl font-extrabold text-orange-500 mb-10 text-center tracking-wide">
            📊 Bảng so sánh chi tiết
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-gray-900 rounded-xl overflow-hidden shadow-md">
              <thead>
                <tr>
                  <th className="bg-gray-100 p-4 text-left font-bold tracking-wide text-gray-900">
                    Thuộc tính
                  </th>
                  {selectedCars.map((car) => (
                    <th
                      key={car.id}
                      className="bg-gray-100 p-4 text-center font-bold text-gray-900"
                    >
                      {car.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allAttributes.map((label, index) => (
                  <tr
                    key={label}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                    } hover:bg-orange-50 transition-colors`}
                  >
                    <td className="p-4 font-semibold text-gray-900">{label}</td>
                    {selectedCars.map((car) => {
                      const attr = car.attributes.find(
                        (a) => a.label === label
                      );
                      return (
                        <td key={car.id} className="p-4 text-center">
                          {attr
                            ? attr.type === "boolean"
                              ? attr.value
                                ? "✅"
                                : "❌"
                              : attr.value
                            : "-"}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
