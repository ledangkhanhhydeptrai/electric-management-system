"use client";
import FooterInternal from "@/components/FooterInternal";
import HeaderInternal from "@/components/HeaderInternal";
import { Modal } from "antd";
import Image from "next/image";
import React from "react";
import {
  Zap,
  Battery,
  Gauge,
  Users,
  CheckCircle,
  ArrowRight,
  Calendar,
  Shield,
  Sparkles
} from "lucide-react";

interface CarProps {
  id: string | number;
  name: string;
  version: string;
  price: number;
  image: string;
  badge?: string;
  specs?: {
    battery: string;
    range: string;
    speed: string;
    seats: string;
  };
  features?: string[];
}

export default function CarsPage() {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [selectedCar, setSelectedCar] = React.useState<CarProps | null>(null);
  const [filterCategory, setFilterCategory] = React.useState<string>("all");

  const cars: CarProps[] = [
    {
      id: "EV001",
      name: "VinFast VF 3",
      version: "Tiêu chuẩn",
      price: 315000000,
      image:
        "https://vinfastvietnam.com.vn/wp-content/uploads/2023/09/Xam-min.png",
      badge: "Phổ biến",
      specs: {
        battery: "18.64 kWh",
        range: "215 km",
        speed: "110 km/h",
        seats: "4 chỗ"
      },
      features: ["Sạc nhanh", "Kết nối thông minh", "Camera 360°"]
    },
    {
      id: "EV002",
      name: "VinFast VF 6",
      version: "Plus",
      price: 675000000,
      image:
        "https://vinfast-vn.vn/wp-content/uploads/2023/10/vinfast-vf6-red.png",
      badge: "Mới",
      specs: {
        battery: "59.6 kWh",
        range: "410 km",
        speed: "160 km/h",
        seats: "5 chỗ"
      },
      features: ["ADAS cấp 2", "Sạc siêu nhanh", "Hệ thống giải trí 12.9 inch"]
    },
    {
      id: "EV003",
      name: "VinFast VF 8",
      version: "Eco",
      price: 1090000000,
      image:
        "https://i1-vnexpress.vnecdn.net/2024/07/15/VF-8-Lux-1.jpg?w=2400&h=0&q=100&dpr=1&fit=crop&s=o9FTtusEg0wMW8eR4uUxkg&t=image",
      badge: "Bán chạy",
      specs: {
        battery: "87.7 kWh",
        range: "471 km",
        speed: "180 km/h",
        seats: "5 chỗ"
      },
      features: ["Tự lái cấp 2+", "Sạc DC 150kW", "Nội thất cao cấp"]
    },
    {
      id: "EV004",
      name: "VinFast VF 9",
      version: "Plus",
      price: 1580000000,
      image: "https://vinfast-hcm.vn/wp-content/uploads/2022/12/4.png",
      badge: "Cao cấp",
      specs: {
        battery: "123 kWh",
        range: "594 km",
        speed: "200 km/h",
        seats: "7 chỗ"
      },
      features: ["ADAS cấp 2+", "Ghế massage", "Hệ thống âm thanh 14 loa"]
    },
    {
      id: "EV005",
      name: "VinFast VF 9",
      version: "Eco",
      price: 1450000000,
      image: "https://vinfast-hcm.vn/wp-content/uploads/2022/12/4.png",
      specs: {
        battery: "123 kWh",
        range: "594 km",
        speed: "200 km/h",
        seats: "7 chỗ"
      },
      features: ["ADAS cấp 2", "Nội thất rộng rãi", "Cốp sau điện"]
    },
    {
      id: "EV006",
      name: "VinFast VF 8",
      version: "Plus",
      price: 1290000000,
      image:
        "https://i1-vnexpress.vnecdn.net/2024/07/15/VF-8-Lux-1.jpg?w=2400&h=0&q=100&dpr=1&fit=crop&s=o9FTtusEg0wMW8eR4uUxkg&t=image",
      specs: {
        battery: "87.7 kWh",
        range: "471 km",
        speed: "180 km/h",
        seats: "5 chỗ"
      },
      features: ["ADAS cấp 2+", "Sạc DC 150kW", "Panoramic sunroof"]
    }
  ];

  const categories = [
    { id: "all", label: "Tất cả", count: cars.length },
    { id: "compact", label: "Compact", count: 2 },
    { id: "suv", label: "SUV", count: 3 },
    { id: "premium", label: "Cao cấp", count: 1 }
  ];

  const formatPrice = (price: number) =>
    price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  const openModal = (car: CarProps) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
  };

  return (
    <>
      <HeaderInternal />

      <main className="">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl -z-10" />

        {/* Hero Section */}
        <section className="pt-12 pb-8 px-6">
          <div className="">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-6 shadow-sm">
                <Zap size={16} />
                <span>Dòng xe điện thông minh</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  Danh mục xe điện
                </span>
              </h1>

              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Khám phá các dòng xe điện VinFast với thiết kế hiện đại, công
                nghệ tiên tiến và trải nghiệm lái đẳng cấp
              </p>
            </div>

            {/* Filter Categories */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilterCategory(cat.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    filterCategory === cat.id
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg scale-105"
                      : "bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      filterCategory === cat.id
                        ? "bg-white/20"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Cars Grid */}
        <section className="pb-16 px-6">
          <div className="">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {cars.map((car, idx) => (
                <div
                  key={car.id}
                  className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer hover:-translate-y-2"
                  onClick={() => openModal(car)}
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {/* Badge */}
                  {car.badge && (
                    <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                      <Sparkles size={12} />
                      {car.badge}
                    </div>
                  )}

                  {/* Image Container */}
                  <div className="relative h-56 w-full bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                    <Image
                      src={car.image}
                      alt={car.name}
                      fill
                      className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
                          {car.name}
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">
                          Phiên bản: {car.version}
                        </p>
                      </div>
                    </div>

                    {/* Specs */}
                    {car.specs && (
                      <div className="grid grid-cols-2 gap-3 my-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="flex items-center justify-center w-8 h-8 bg-emerald-100 rounded-lg">
                            <Battery size={16} className="text-emerald-600" />
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Pin</div>
                            <div className="font-semibold">
                              {car.specs.battery}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="flex items-center justify-center w-8 h-8 bg-cyan-100 rounded-lg">
                            <Zap size={16} className="text-cyan-600" />
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Tầm xa</div>
                            <div className="font-semibold">
                              {car.specs.range}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                            <Gauge size={16} className="text-blue-600" />
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Tốc độ</div>
                            <div className="font-semibold">
                              {car.specs.speed}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-lg">
                            <Users size={16} className="text-purple-600" />
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">
                              Chỗ ngồi
                            </div>
                            <div className="font-semibold">
                              {car.specs.seats}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Price */}
                    <div className="mb-4 pt-4 border-t border-gray-100">
                      <div className="text-sm text-gray-500 mb-1">Giá xe</div>
                      <div className="text-2xl font-bold text-emerald-600">
                        {formatPrice(car.price)}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button
                      className="group/btn w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(car);
                      }}
                    >
                      <span>Xem chi tiết</span>
                      <ArrowRight
                        size={18}
                        className="group-hover/btn:translate-x-1 transition-transform"
                      />
                    </button>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-emerald-200 rounded-3xl transition-colors duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl mb-6 shadow-xl">
              <Calendar size={32} className="text-white" />
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Đặt lịch lái thử ngay hôm nay
            </h2>

            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Trải nghiệm trực tiếp sức mạnh và sự êm ái của xe điện VinFast tại
              showroom gần bạn
            </p>

            <button className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-100">
              <span>Đặt lịch ngay</span>
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </section>
      </main>

      {/* Enhanced Modal */}
      <Modal
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        centered
        width={800}
        styles={{
          body: { padding: 0 },
          content: { borderRadius: "24px", overflow: "hidden" }
        }}
      >
        {selectedCar && (
          <div className="overflow-hidden">
            {/* Modal Header Image */}
            <div className="relative h-80 w-full bg-gradient-to-br from-gray-50 to-gray-100">
              <Image
                src={selectedCar.image}
                alt={selectedCar.name}
                fill
                className="object-contain p-8"
              />
              {selectedCar.badge && (
                <div className="absolute top-6 left-6 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-sm font-bold shadow-xl flex items-center gap-2">
                  <Sparkles size={16} />
                  {selectedCar.badge}
                </div>
              )}
            </div>

            {/* Modal Content */}
            <div className="p-8 bg-white">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    {selectedCar.name}
                  </h2>
                  <p className="text-gray-600">
                    Phiên bản:{" "}
                    <span className="font-semibold text-emerald-600">
                      {selectedCar.version}
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-1">Giá xe</div>
                  <div className="text-3xl font-bold text-emerald-600">
                    {formatPrice(selectedCar.price)}
                  </div>
                </div>
              </div>

              {/* Specifications Grid */}
              {selectedCar.specs && (
                <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-xl">
                      <Battery size={20} className="text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">
                        Dung lượng pin
                      </div>
                      <div className="font-bold text-gray-800">
                        {selectedCar.specs.battery}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 bg-cyan-100 rounded-xl">
                      <Zap size={20} className="text-cyan-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Tầm xa tối đa</div>
                      <div className="font-bold text-gray-800">
                        {selectedCar.specs.range}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl">
                      <Gauge size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Tốc độ tối đa</div>
                      <div className="font-bold text-gray-800">
                        {selectedCar.specs.speed}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl">
                      <Users size={20} className="text-purple-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Số chỗ ngồi</div>
                      <div className="font-bold text-gray-800">
                        {selectedCar.specs.seats}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Features */}
              {selectedCar.features && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Shield size={20} className="text-emerald-600" />
                    Tính năng nổi bật
                  </h3>
                  <div className="grid gap-2">
                    {selectedCar.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-gray-700"
                      >
                        <CheckCircle
                          size={18}
                          className="text-emerald-500 flex-shrink-0"
                        />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-all duration-300"
                >
                  Đóng
                </button>
                <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-100">
                  Đặt lịch lái thử
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <FooterInternal />
    </>
  );
}
