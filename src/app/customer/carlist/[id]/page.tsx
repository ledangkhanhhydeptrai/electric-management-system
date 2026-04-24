"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const VinFastGridId = () => {
  const router = useRouter();
  const car = {
    id: "vf3",
    name: "VinFast VF 8",
    brand: "VinFast",
    model: "VF 8",
    origin: "Việt Nam",
    image:
      "data:image/jpeg;base64,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",
    description:
      "VinFast VF 8 là dòng SUV điện hiện đại với thiết kế sang trọng, trang bị công nghệ tiên tiến và quãng đường di chuyển dài. Đây là lựa chọn lý tưởng cho những ai muốn trải nghiệm xe điện đẳng cấp Việt."
  };

  return (
    <>
      <Header />
      <main className="mt-15 min-h-screen bg-white text-gray-900 py-12 px-4">
        <div className="max-w-7xl mx-auto overflow-hidden">
          <div className="md:flex">
            {/* Hình xe */}
            <div className="md:w-1/2 relative h-96 md:h-[600px] mt-15">
              <Image
                src={car.image}
                alt={car.name}
                fill
                className="object-cover rounded-l-3xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-l-3xl" />
            </div>

            {/* Thông tin xe */}
            <div className="md:w-1/2 p-10 flex flex-col justify-between gap-8">
              <div>
                <h1 className="text-5xl font-extrabold text-orange-500 mb-6">
                  {car.name}
                </h1>
                <p className="mb-3">
                  <span className="font-semibold text-orange-400">
                    Thương hiệu:
                  </span>{" "}
                  {car.brand}
                </p>
                <p className="mb-3">
                  <span className="font-semibold text-orange-400">Mẫu xe:</span>{" "}
                  {car.model}
                </p>
                <p className="mb-3">
                  <span className="font-semibold text-orange-400">
                    Xuất xứ:
                  </span>{" "}
                  {car.origin}
                </p>
                <p className="mt-6 text-gray-700">
                  <span className="font-semibold text-orange-400">
                    Miêu tả:{" "}
                  </span>
                  {car.description}
                </p>
              </div>

              {/* Nút CTA */}
              <div className="flex flex-col sm:flex-row gap-6 mt-6">
                <button
                  onClick={() => router.push("/customer/payment")}
                  className="relative px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 group overflow-hidden"
                >
                  <span className="absolute inset-0 bg-white opacity-10 blur-lg"></span>
                  <span className="relative z-10">Đặt xe ngay</span>
                </button>
                <button
                  onClick={() => router.push(`/customer/carlist/compare`)}
                  className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300"
                >
                  So sánh
                </button>
                <button
                  onClick={() => router.push("/customer/form")}
                  className="relative px-10 py-4 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-bold rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 group overflow-hidden"
                >
                  <span className="absolute inset-0 bg-white opacity-10 blur-lg"></span>
                  <span className="relative z-10">Đăng ký lái thử</span>
                </button>
              </div>

              {/* Thông số kỹ thuật */}
              <div className="bg-gray-100 p-8 rounded-2xl shadow-inner mt-6 border border-gray-300">
                <h2 className="text-3xl font-bold text-orange-500 mb-4">
                  Thông số kỹ thuật
                </h2>
                <ul className="space-y-3 text-gray-700">
                  <li>
                    <span className="font-semibold text-orange-400">
                      Động cơ:
                    </span>{" "}
                    Điện 2 motor
                  </li>
                  <li>
                    <span className="font-semibold text-orange-400">
                      Công suất:
                    </span>{" "}
                    402 HP
                  </li>
                  <li>
                    <span className="font-semibold text-orange-400">
                      Tốc độ tối đa:
                    </span>{" "}
                    200 km/h
                  </li>
                  <li>
                    <span className="font-semibold text-orange-400">
                      Hệ dẫn động:
                    </span>{" "}
                    AWD
                  </li>
                  <li>
                    <span className="font-semibold text-orange-400">Pin:</span>{" "}
                    90 kWh
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default VinFastGridId;
