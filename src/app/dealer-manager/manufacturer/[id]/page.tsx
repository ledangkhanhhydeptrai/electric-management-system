"use client";
import { useState, useEffect } from "react";
import { Manufacturer } from "../types/types";
import { useParams } from "next/navigation";
import { manufacturerById } from "@/services/manufacturerService/manufacturer";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";

export default function ManufacturerDetail() {
  useAuthGuard(["Dealer Manager"])
  const { id } = useParams();
  const [data, setData] = useState<Manufacturer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await manufacturerById(Number(id));
        if (response) {
          setData(response as Manufacturer);
        } else {
          setData(null);
        }
      } catch (error) {
        console.error("Error:", error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="w-20 h-20 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl">
              🚗
            </div>
          </div>
          <p className="mt-6 text-gray-700 text-lg font-semibold animate-pulse">
            Đang tải dữ liệu...
          </p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-10 text-center max-w-lg border border-gray-100 transform transition hover:scale-105">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">❌</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Không tìm thấy
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Hãng xe không tồn tại hoặc đã bị xóa khỏi hệ thống
          </p>
          <button
            onClick={() => window.history.back()}
            className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 flex items-center gap-3 mx-auto"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform">
              ←
            </span>
            Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="group mb-8 flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-all duration-300 font-medium bg-white px-4 py-2 rounded-xl shadow-sm hover:shadow-md"
        >
          <span className="text-xl transform group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          <span>Quay lại danh sách</span>
        </button>

        {/* Hero Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 rounded-3xl shadow-2xl overflow-hidden mb-8 transform transition hover:scale-[1.01]">
          <div className="p-8 sm:p-12 relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-black text-sm font-semibold">
                    {data.active ? "Đang hoạt động" : "Ngừng hoạt động"}
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 tracking-tight">
                  {data.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-white text-opacity-90">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🏷️</span>
                    <span className="font-mono font-semibold text-lg">
                      {data.code}
                    </span>
                  </div>
                  <div className="w-px h-6 bg-white bg-opacity-30" />
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🌍</span>
                    <span className="font-medium text-lg">{data.country}</span>
                  </div>
                </div>
              </div>

              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white bg-opacity-20 backdrop-blur-sm rounded-3xl flex items-center justify-center transform transition hover:rotate-6">
                <span className="text-6xl sm:text-7xl">🚗</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Dealer Count */}
          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 border border-gray-100 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all">
                🏪
              </div>
              <div className="bg-orange-50 px-3 py-1 rounded-full">
                <span className="text-orange-600 text-xs font-bold">
                  THỐNG KÊ
                </span>
              </div>
            </div>
            <p className="text-gray-500 text-sm font-medium mb-2">
              Số lượng đại lý
            </p>
            <p className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              {data.dealerCount}
            </p>
            <p className="text-gray-400 text-xs mt-2">đại lý trên toàn quốc</p>
          </div>

          {/* ID Card */}
          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 border border-gray-100 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center text-3xl shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all">
                🔑
              </div>
              <div className="bg-gray-50 px-3 py-1 rounded-full">
                <span className="text-gray-600 text-xs font-bold">
                  HỆ THỐNG
                </span>
              </div>
            </div>
            <p className="text-gray-500 text-sm font-medium mb-2">
              Mã định danh
            </p>
            <p className="text-4xl font-bold text-gray-900 font-mono">
              {data.id}
            </p>
            <p className="text-gray-400 text-xs mt-2">mã số duy nhất</p>
          </div>

          {/* Status */}
          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 border border-gray-100 transition-all duration-300 hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-14 h-14 bg-gradient-to-br ${
                  data.active
                    ? "from-green-500 to-emerald-500"
                    : "from-red-500 to-pink-500"
                } rounded-2xl flex items-center justify-center text-3xl shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all`}
              >
                {data.active ? "✅" : "⛔"}
              </div>
              <div
                className={`${
                  data.active ? "bg-green-50" : "bg-red-50"
                } px-3 py-1 rounded-full`}
              >
                <span
                  className={`${
                    data.active ? "text-green-600" : "text-red-600"
                  } text-xs font-bold`}
                >
                  TRẠNG THÁI
                </span>
              </div>
            </div>
            <p className="text-gray-500 text-sm font-medium mb-2">
              Tình trạng hoạt động
            </p>
            <div className="flex items-center gap-3">
              <span
                className={`w-4 h-4 ${
                  data.active ? "bg-green-500" : "bg-red-500"
                } rounded-full ${data.active ? "animate-pulse" : ""}`}
              />
              <p
                className={`text-2xl font-bold ${
                  data.active ? "text-green-600" : "text-red-600"
                }`}
              >
                {data.active ? "Đang hoạt động" : "Ngừng hoạt động"}
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Company Info */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-xl">
                🏢
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Thông tin công ty
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <span className="text-2xl mt-1">🏷️</span>
                <div className="flex-1">
                  <p className="text-blue-600 text-xs font-bold mb-1 uppercase tracking-wide">
                    Tên hãng
                  </p>
                  <p className="text-gray-900 text-lg font-semibold">
                    {data.name}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-xl border border-purple-100">
                <span className="text-2xl mt-1">🌍</span>
                <div className="flex-1">
                  <p className="text-purple-600 text-xs font-bold mb-1 uppercase tracking-wide">
                    Xuất xứ
                  </p>
                  <p className="text-gray-900 text-lg font-semibold">
                    {data.country}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                <span className="text-2xl mt-1">💼</span>
                <div className="flex-1">
                  <p className="text-indigo-600 text-xs font-bold mb-1 uppercase tracking-wide">
                    Mã hãng
                  </p>
                  <p className="text-gray-900 text-lg font-semibold font-mono">
                    {data.code}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-8 text-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl flex items-center justify-center text-xl">
                📊
              </div>
              <h2 className="text-2xl font-bold">Phân tích nhanh</h2>
            </div>

            <div className="space-y-6">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-5 border border-white border-opacity-20">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">🏪</span>
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-xs font-bold">
                    MẠNG LƯỚI
                  </span>
                </div>
                <p className="text-black text-opacity-80 text-sm mb-2">
                  Tổng số đại lý
                </p>
                <p className="text-black text-5xl font-bold mb-2">{data.dealerCount}</p>
                <p className="text-white text-opacity-70 text-sm">
                  đại lý phân phối
                </p>
              </div>

              <div className="bg-black bg-opacity-10 backdrop-blur-sm rounded-xl p-5 border border-white border-opacity-20">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{data.active ? "✅" : "⛔"}</span>
                  <span className="bg-black bg-opacity-20 px-3 py-1 rounded-full text-xs font-bold">
                    STATUS
                  </span>
                </div>
                <p className="text-white text-opacity-80 text-sm mb-2">
                  Hoạt động kinh doanh
                </p>
                <div className="flex items-center gap-2">
                  <span
                    className={`w-3 h-3 ${
                      data.active ? "bg-green-400" : "bg-red-400"
                    } rounded-full ${data.active ? "animate-pulse" : ""}`}
                  />
                  <p className="text-xl font-bold">
                    {data.active ? "Đang hoạt động" : "Tạm ngừng"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-start gap-4">
            <span className="text-3xl">ℹ️</span>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Thông tin hỗ trợ
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Dữ liệu được cập nhật thường xuyên. Nếu có thắc mắc về thông tin
                hãng xe, vui lòng liên hệ bộ phận quản lý để được hỗ trợ chi
                tiết hơn.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
