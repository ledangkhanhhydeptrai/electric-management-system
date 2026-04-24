"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building2,
  Clock,
  UserCircle
} from "lucide-react";
import { getCustomerById } from "@/services/customerService/customer";

interface CustomerData {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  dob: string;
  customerType: "INDIVIDUAL" | "COMPANY";
  createdAt: string;
  lastModifiedAt: string;
}

const CustomerId: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(
    () => {
      // Simulate API call
      const fetchCustomer = async () => {
        try {
          const response = await getCustomerById(String(id));
          if (response) {
            setCustomer(response as CustomerData);
          } else {
            setCustomer(null);
          }
          setTimeout(() => {
            setCustomer(response as CustomerData);
            setLoading(false);
          }, 500);
        } catch (error) {
          console.error("Error fetching customer:", error);
          setLoading(false);
        }
      };

      fetchCustomer();
    },
    [id]
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600" />
          <p className="mt-4 text-gray-600 font-medium">
            Đang tải thông tin...
          </p>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Không tìm thấy khách hàng
          </h2>
          <p className="text-gray-600 mb-6">
            Khách hàng với ID này không tồn tại trong hệ thống
          </p>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-22 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Quay lại</span>
        </button>

        {/* Header Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
          {/* Gradient Header */}
          <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24 blur-2xl" />

            <div className="relative flex items-start justify-between">
              <div className="flex items-center gap-6">
                {/* Avatar */}
                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white shadow-lg">
                  {customer.customerType === "INDIVIDUAL"
                    ? <UserCircle className="w-16 h-16" />
                    : <Building2 className="w-16 h-16" />}
                </div>

                {/* Name and Type */}
                <div>
                  <h1 className="text-4xl font-black text-white mb-3">
                    {customer.fullName}
                  </h1>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-4 py-1.5 rounded-full text-sm font-bold ${customer.customerType ===
                      "INDIVIDUAL"
                        ? "bg-blue-500/20 text-blue-100 border border-blue-400/30"
                        : "bg-purple-500/20 text-purple-100 border border-purple-400/30"}`}
                    >
                      {customer.customerType === "INDIVIDUAL"
                        ? "👤 Cá nhân"
                        : "🏢 Công ty"}
                    </span>
                    <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white/30">
                      ID: {customer.id.slice(0, 8)}...
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Info Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200">
            <div className="bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Email</p>
                  <p className="text-sm font-bold text-gray-900">
                    {customer.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-xl">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">
                    Số điện thoại
                  </p>
                  <p className="text-sm font-bold text-gray-900">
                    {customer.phone}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-pink-100 rounded-xl">
                  <Calendar className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Ngày sinh</p>
                  <p className="text-sm font-bold text-gray-900">
                    {formatDate(customer.dob)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6 animate-in fade-in slide-in-from-left-4 duration-500 delay-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                  <User className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Thông tin liên hệ
                </h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 font-medium mb-1">
                      Địa chỉ email
                    </p>
                    <p className="text-gray-900 font-semibold">
                      {customer.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 font-medium mb-1">
                      Số điện thoại
                    </p>
                    <p className="text-gray-900 font-semibold">
                      {customer.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <MapPin className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 font-medium mb-1">
                      Địa chỉ
                    </p>
                    <p className="text-gray-900 font-semibold">
                      {customer.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6 animate-in fade-in slide-in-from-left-4 duration-500 delay-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Thông tin cá nhân
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl border border-pink-200">
                  <p className="text-sm text-pink-700 font-medium mb-1">
                    Ngày sinh
                  </p>
                  <p className="text-gray-900 font-bold text-lg">
                    {formatDate(customer.dob)}
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
                  <p className="text-sm text-indigo-700 font-medium mb-1">
                    Loại khách hàng
                  </p>
                  <p className="text-gray-900 font-bold text-lg">
                    {customer.customerType === "INDIVIDUAL"
                      ? "Cá nhân"
                      : "Công ty"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Metadata */}
          <div className="space-y-6">
            {/* System Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6 animate-in fade-in slide-in-from-right-4 duration-500 delay-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Thông tin hệ thống
                </h2>
              </div>

              <div className="space-y-4">
                {/* <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500 font-medium mb-2">
                    ID khách hàng
                  </p>
                  <p className="text-xs font-mono text-gray-900 bg-white px-3 py-2 rounded-lg border border-gray-200">
                    {customer.id}
                  </p>
                </div> */}

                <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <p className="text-sm text-blue-700 font-medium">
                      Ngày tạo
                    </p>
                  </div>
                  <p className="text-gray-900 font-semibold">
                    {formatDateTime(customer.createdAt)}
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <p className="text-sm text-purple-700 font-medium">
                      Cập nhật lần cuối
                    </p>
                  </div>
                  <p className="text-gray-900 font-semibold">
                    {formatDateTime(customer.lastModifiedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerId;
