"use client";

import FooterInternal from "@/components/FooterInternal";
import HeaderInternal from "@/components/HeaderInternal";
import Image from "next/image";
import { Modal } from "antd";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Zap,
  Leaf,
  Award,
  MapPin,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Globe
} from "lucide-react";

export default function BrandPage() {
  const router = useRouter();

  const highlights = [
    {
      title: "Công nghệ tiên phong",
      desc: "VinFast phát triển các dòng xe điện với công nghệ hiện đại, tích hợp hệ sinh thái thông minh.",
      image:
        "https://vinfastvietnam.com.vn/wp-content/uploads/2023/09/Xam-min.png",
      icon: <Zap size={24} />,
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Thiết kế đột phá",
      desc: "Các mẫu xe VinFast được thiết kế bởi các studio hàng đầu thế giới, mang phong cách hiện đại và sang trọng.",
      image:
        "https://vinfast-vn.vn/wp-content/uploads/2023/10/vinfast-vf6-red.png",
      icon: <Award size={24} />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Bền bỉ & Thân thiện môi trường",
      desc: "Hướng tới giao thông xanh, VinFast cam kết giảm phát thải và phát triển bền vững.",
      image: "https://vinfast-hcm.vn/wp-content/uploads/2022/12/4.png",
      icon: <Leaf size={24} />,
      color: "from-green-500 to-emerald-500"
    }
  ];

  const stats = [
    {
      number: "100K+",
      label: "Xe đã bàn giao",
      icon: <TrendingUp size={20} />
    },
    { number: "50+", label: "Showroom toàn quốc", icon: <MapPin size={20} /> },
    { number: "30+", label: "Quốc gia có mặt", icon: <Globe size={20} /> },
    { number: "#1", label: "Thương hiệu xe điện VN", icon: <Award size={20} /> }
  ];

  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [selectedHighlight, setSelectedHighlight] = React.useState<
    (typeof highlights)[0] | null
  >(null);

  const openModal = (highlight: (typeof highlights)[0]) => {
    setSelectedHighlight(highlight);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedHighlight(null);
  };

  return (
    <>
      <HeaderInternal />

      <main className="relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl -z-10" />

        {/* Hero Section */}
        <section className="">
          <div className="">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-6 shadow-sm">
                <Sparkles size={16} />
                <span>Thương hiệu xe điện hàng đầu Việt Nam</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  VinFast
                </span>
                <br />
                <span className="text-gray-800">
                  Hành trình xe điện Việt Nam
                </span>
              </h1>

              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                VinFast là hãng xe Việt Nam tiên phong trong lĩnh vực xe điện,
                mang đến giải pháp di chuyển
                <span className="font-semibold text-emerald-600">
                  {" "}
                  thông minh, bền vững
                </span>{" "}
                và thân thiện với môi trường.
              </p>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              {stats.map((stat, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:-translate-y-1">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl text-white mb-3 mx-auto group-hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold text-gray-800 mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Highlights Section */}
        <section className="py-16 px-6 bg-gradient-to-b from-gray-50 to-white">
          <div className="">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Điểm nổi bật
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Khám phá những ưu điểm vượt trội của VinFast trong hành trình
                chinh phục thị trường xe điện
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {highlights.map((h, idx) => (
                <div
                  key={idx}
                  onClick={() => openModal(h)}
                  className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer hover:-translate-y-2"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${h.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  ></div>

                  {/* Icon Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <div
                      className={`flex items-center justify-center w-12 h-12 bg-gradient-to-br ${h.color} rounded-xl text-white shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}
                    >
                      {h.icon}
                    </div>
                  </div>

                  {/* Image Container */}
                  <div className="relative w-full h-56 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                    <Image
                      src={h.image}
                      alt={h.title}
                      fill
                      className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-emerald-600 transition-colors">
                      {h.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {h.desc}
                    </p>

                    <div className="flex items-center text-emerald-600 font-semibold text-sm group-hover:gap-3 gap-2 transition-all">
                      <span>Tìm hiểu thêm</span>
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-emerald-200 rounded-3xl transition-colors duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="">
            <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl shadow-2xl">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

              <div className="relative p-12 text-center text-white">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
                  <MapPin size={32} className="text-white" />
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Hệ thống showroom VinFast
                </h2>

                <p className="text-emerald-50 text-lg mb-8 max-w-2xl mx-auto">
                  VinFast hiện có mặt tại nhiều tỉnh thành lớn trên cả nước và
                  đang mở rộng ra thế giới. Đến trải nghiệm ngay hôm nay!
                </p>

                <button
                  onClick={() => router.push("/internal/cars")}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-emerald-700 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-100"
                >
                  <span>Xem danh sách showroom</span>
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Enhanced Modal */}
      <Modal
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        centered
        width={700}
        styles={{
          body: { padding: 0 },
          content: { borderRadius: "24px", overflow: "hidden" }
        }}
      >
        {selectedHighlight && (
          <div className="overflow-hidden">
            {/* Modal Image */}
            <div className="relative h-80 w-full bg-gradient-to-br from-gray-50 to-gray-100">
              <Image
                src={selectedHighlight.image}
                alt={selectedHighlight.title}
                fill
                className="object-contain p-8"
              />

              {/* Icon Badge */}
              <div
                className={`absolute top-6 right-6 flex items-center justify-center w-16 h-16 bg-gradient-to-br ${selectedHighlight.color} rounded-2xl text-white shadow-xl`}
              >
                {selectedHighlight.icon}
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 bg-white">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                {selectedHighlight.title}
              </h2>

              <p className="text-gray-700 mb-6 leading-relaxed text-base">
                {selectedHighlight.desc}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => router.push("/internal/cars")}
                  className={`flex-1 py-3 rounded-xl bg-gradient-to-r ${selectedHighlight.color} text-white font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-100`}
                >
                  Khám phá ngay
                </button>

                <button
                  onClick={closeModal}
                  className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-all duration-300"
                >
                  Đóng
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
