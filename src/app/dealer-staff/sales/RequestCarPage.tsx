"use client";
import React from "react";
import OrderForm from "./components/OrderForm";
import {
  CarOutlined,
  ThunderboltOutlined,
  SafetyOutlined,
  RocketOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  DollarOutlined,
  TeamOutlined
} from "@ant-design/icons";

const RequestCarPage: React.FC = () => {
  const benefits = [
    {
      icon: <ThunderboltOutlined className="text-3xl" />,
      title: "100% Xe Điện",
      description: "Thân thiện môi trường, tiết kiệm chi phí",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <SafetyOutlined className="text-3xl" />,
      title: "An Toàn 5 Sao",
      description: "Chuẩn an toàn quốc tế NCAP",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <RocketOutlined className="text-3xl" />,
      title: "Công Nghệ AI",
      description: "Hệ thống lái tự động thông minh",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <DollarOutlined className="text-3xl" />,
      title: "Hỗ Trợ Vay",
      description: "Lãi suất ưu đãi chỉ từ 0%",
      color: "from-orange-500 to-red-500"
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Điền thông tin",
      description: "Hoàn tất form đặt xe bên dưới"
    },
    {
      number: "2",
      title: "Xác nhận đơn",
      description: "Nhân viên liên hệ trong 24h"
    },
    {
      number: "3",
      title: "Lái thử xe",
      description: "Trải nghiệm xe tại showroom"
    },
    {
      number: "4",
      title: "Nhận xe",
      description: "Giao xe tận nơi hoặc tại đại lý"
    }
  ];

  const stats = [
    { label: "Khách hàng hài lòng", value: "98%", icon: <TeamOutlined /> },
    {
      label: "Giao xe nhanh",
      value: "7-14 ngày",
      icon: <ClockCircleOutlined />
    },
    { label: "Bảo hành", value: "10 năm", icon: <CheckCircleOutlined /> },
    { label: "Đại lý", value: "50+", icon: <CarOutlined /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-green-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-300 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      <div
        className="absolute top-1/4 right-0 w-80 h-80 bg-emerald-300 rounded-full filter blur-3xl opacity-20 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-0 left-1/4 w-72 h-72 bg-green-200 rounded-full filter blur-3xl opacity-20 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="relative z-10 p-6 md:p-10 max-w-[1600px] mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-5 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl blur opacity-40"></div>
              <div className="relative p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl">
                <CarOutlined className="text-white text-5xl" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-green-800 to-emerald-900">
                Đặt Xe Từ Hãng
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                Sở hữu xe điện VinFast với quy trình đơn giản và nhanh chóng
              </p>
            </div>
          </div>
          <div className="h-1 w-32 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full"></div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl hover:border-green-300 transition-all duration-300 hover:-translate-y-1"
              style={{
                animation: `slideUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl mb-3 text-green-600 text-2xl">
                  {stat.icon}
                </div>
                <div className="text-3xl font-black text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Tại Sao Chọn VinFast?
            </h2>
            <p className="text-gray-600 text-lg">
              Những lợi ích vượt trội khi sở hữu xe điện VinFast
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`
                }}
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                >
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content: Steps & Form */}
        <div className="grid lg:grid-cols-3 gap-10 mb-12">
          {/* Steps Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-green-600 to-emerald-600 rounded-full"></div>
                  Quy Trình Đặt Xe
                </h2>

                <div className="space-y-6">
                  {steps.map((step, index) => (
                    <div key={index} className="flex gap-4 group">
                      <div className="relative">
                        <div
                          className={`w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          {step.number}
                        </div>
                        {index < steps.length - 1 && (
                          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-0.5 h-10 bg-gradient-to-b from-green-300 to-emerald-300"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-2">
                        <h3 className="font-bold text-gray-900 mb-1 group-hover:text-green-600 transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Contact Info */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span>📞</span>
                      Cần hỗ trợ?
                    </h4>
                    <p className="text-sm text-gray-700 mb-2">
                      Hotline:{" "}
                      <strong className="text-green-600">1900-xxxx</strong>
                    </p>
                    <p className="text-sm text-gray-700">
                      Email:{" "}
                      <strong className="text-green-600">
                        support@vinfast.vn
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Form Section */}
          <div className="lg:col-span-2">
            <div className="animate-fadeIn">
              <OrderForm />
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl shadow-2xl p-8 md:p-12 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3">Cam Kết Của Chúng Tôi</h2>
            <p className="text-green-100 text-lg">
              Đảm bảo trải nghiệm mua xe tốt nhất cho khách hàng
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-3xl">
                  ✓
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Minh Bạch Giá</h3>
                  <p className="text-green-100 text-sm">
                    Không phát sinh chi phí ẩn
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-3xl">
                  🛡️
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Bảo Hành Tốt</h3>
                  <p className="text-green-100 text-sm">Hỗ trợ trọn đời xe</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-3xl">
                  🚀
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Giao Xe Nhanh</h3>
                  <p className="text-green-100 text-sm">
                    Chỉ từ 7-14 ngày làm việc
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default RequestCarPage;
