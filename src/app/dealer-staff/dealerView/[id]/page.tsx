"use client";
import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building2,
  Copy,
  Check,
  AlertCircle,
  Clock,
  // TrendingUp,
  // DollarSign,
  // Package,
  Activity
} from "lucide-react";
import { Dealer } from "../types/types";
import { useParams } from "next/navigation";
import { getDealerById } from "@/services/dealerService/dealerService";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";

// ============================================
// HELPER FUNCTIONS
// ============================================
const formatDateTime = (dateStr: string): string => {
  if (!dateStr) return "N/A";
  const match = dateStr.match(
    /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/
  );
  if (!match) return "N/A";
  const [, year, month, day] = match;
  return `${day}/${month}/${year}`;
};

const getRelativeTime = (dateStr: string): string => {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "N/A";

  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Hôm nay";
  if (diffDays === 1) return "Hôm qua";
  if (diffDays < 7) return `${diffDays} ngày trước`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} tuần trước`;
  return `${Math.floor(diffDays / 30)} tháng trước`;
};

// ============================================
// TYPES
// ============================================

// ============================================
// SUB-COMPONENTS
// ============================================

// Info Card Component
interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | React.ReactNode;
  gradient: string;
  onCopy?: () => void;
  copyValue?: string;
  href?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  icon,
  label,
  value,
  gradient,
  onCopy,
  href
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (onCopy) {
      onCopy();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200 hover:-translate-y-1">
      <div className="flex items-start gap-4">
        <div
          className={`bg-gradient-to-br ${gradient} p-3.5 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
            {label}
          </label>
          {href ? (
            <a
              href={href}
              className="text-blue-600 hover:text-blue-700 font-semibold break-all transition-colors"
            >
              {value}
            </a>
          ) : (
            <div className="text-gray-900 font-medium break-words">{value}</div>
          )}
        </div>
        {onCopy && (
          <button
            onClick={handleCopy}
            className="p-2.5 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-110"
            title="Copy"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <Copy className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

// Stat Card Component
// interface StatCardProps {
//   icon: React.ReactNode;
//   value: string | number;
//   label: string;
//   gradient: string;
//   trend?: string;
// }

// const StatCard: React.FC<StatCardProps> = ({
//   icon,
//   value,
//   label,
//   gradient,
//   trend
// }) => {
//   return (
//     <div
//       className={`relative overflow-hidden bg-gradient-to-br ${gradient} rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 group hover:-translate-y-1`}
//     >
//       <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
//       <div className="relative">
//         <div className="flex items-center justify-between mb-3">
//           <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
//             {icon}
//           </div>
//           {trend && (
//             <span className="text-white/90 text-sm font-medium flex items-center gap-1">
//               <TrendingUp className="w-4 h-4" />
//               {trend}
//             </span>
//           )}
//         </div>
//         <div className="text-3xl font-bold text-white mb-1">{value}</div>
//         <p className="text-white/80 text-sm font-medium">{label}</p>
//       </div>
//     </div>
//   );
// };

// ============================================
// MAIN COMPONENT
// ============================================
const DealerId: React.FC = () => {
  useAuthGuard(["Staff"]);
  const { id } = useParams();

  // States
  const [dealer, setDealer] = useState<Dealer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDealerById(String(id));
        if (response) {
          setDealer(response as Dealer);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // ============================================
  // HELPER FUNCTIONS
  // ============================================

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // const showToast = (message: string) => {
  //   setCopiedField(message);
  //   setTimeout(() => setCopiedField(null), 3000);
  // };

  const handleBack = () => window.history.back();

  // ============================================
  // LOADING STATE
  // ============================================
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6" />
            <div
              className="absolute inset-0 w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto"
              style={{
                animationDirection: "reverse",
                animationDuration: "1.5s"
              }}
            />
          </div>
          <p className="text-gray-700 font-semibold text-lg">
            Đang tải dữ liệu...
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Vui lòng đợi trong giây lát
          </p>
        </div>
      </div>
    );
  }

  // ============================================
  // ERROR STATE
  // ============================================
  if (!dealer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md">
          <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <AlertCircle className="w-12 h-12 text-red-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Không tìm thấy đại lý
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Đại lý này có thể đã bị xóa hoặc không tồn tại trong hệ thống.
          </p>
          <button
            onClick={handleBack}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all inline-flex items-center gap-3 shadow-lg font-bold hover:scale-105 duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }

  // ============================================
  // MAIN RENDER
  // ============================================
  return (
    <div className="mt-19 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="group flex items-center gap-2 text-gray-700 hover:text-blue-600 font-semibold transition-all duration-200 mb-8 hover:scale-105"
        >
          <div className="p-2 bg-white rounded-xl shadow-md group-hover:shadow-lg transition-all">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </div>
          <span>Quay lại danh sách</span>
        </button>

        {/* Header Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8 border border-gray-100">
          <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-10 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full -ml-36 -mb-36" />
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />

            <div className="relative">
              <div className="flex items-start gap-6">
                <div className="bg-white/20 backdrop-blur-xl p-5 rounded-2xl shadow-2xl border border-white/30">
                  <Building2 className="w-12 h-12 text-white" />
                </div>
                <div className="flex-1">
                  <h1 className="text-4xl font-black text-white mb-3 tracking-tight">
                    {dealer.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-white/90">
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        Tạo {getRelativeTime(dealer.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl">
                      <Activity className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        Đang hoạt động
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={<Package className="w-6 h-6 text-white" />}
            value="0"
            label="Tổng đơn hàng"
            gradient="from-blue-500 to-blue-600"
            trend="+0%"
          />
          <StatCard
            icon={<DollarSign className="w-6 h-6 text-white" />}
            value="0đ"
            label="Tổng doanh thu"
            gradient="from-green-500 to-green-600"
            trend="+0%"
          />
          <StatCard
            icon={<TrendingUp className="w-6 h-6 text-white" />}
            value="0"
            label="Đơn đang xử lý"
            gradient="from-orange-500 to-orange-600"
          />
        </div> */}

        {/* Contact Information */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-xl">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              Thông tin liên hệ
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoCard
                icon={<MapPin className="w-6 h-6 text-white" />}
                label="Địa chỉ"
                value={dealer.address}
                gradient="from-blue-500 to-blue-600"
              />
              <InfoCard
                icon={<Phone className="w-6 h-6 text-white" />}
                label="Số điện thoại"
                value={dealer.phone}
                gradient="from-green-500 to-green-600"
                href={`tel:${dealer.phone}`}
                onCopy={() => copyToClipboard(dealer.phone, "phone")}
              />
              <InfoCard
                icon={<Mail className="w-6 h-6 text-white" />}
                label="Email"
                value={dealer.email}
                gradient="from-purple-500 to-purple-600"
                href={`mailto:${dealer.email}`}
                onCopy={() => copyToClipboard(dealer.email, "email")}
              />
              <InfoCard
                icon={<Calendar className="w-6 h-6 text-white" />}
                label="Ngày tạo"
                value={
                  <div>
                    <div className="font-semibold">
                      {formatDateTime(dealer.createdAt)}
                    </div>
                    <div className="mt-2 inline-flex items-center gap-2 bg-orange-50 text-orange-700 px-3 py-1.5 rounded-xl text-xs font-semibold">
                      <Clock className="w-3 h-3" />
                      {getRelativeTime(dealer.createdAt)}
                    </div>
                  </div>
                }
                gradient="from-orange-500 to-orange-600"
              />
            </div>
          </div>
        </div>

        {/* Toast Notification */}
        {copiedField && (
          <div className="fixed bottom-8 right-8 bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50 animate-in slide-in-from-bottom-5 border border-gray-700">
            <div className="p-2 bg-green-500/20 rounded-xl">
              <Check className="w-5 h-5 text-green-400" />
            </div>
            <p className="font-semibold">{copiedField}</p>
          </div>
        )}
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #6366f1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #4f46e5);
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes zoom-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes slide-in-from-bottom-5 {
          from {
            transform: translateY(1.25rem);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-in {
          animation-fill-mode: both;
        }
        .fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .zoom-in {
          animation: zoom-in 0.2s ease-out;
        }
        .slide-in-from-bottom-5 {
          animation: slide-in-from-bottom-5 0.3s ease-out;
        }
        .duration-200 {
          animation-duration: 0.2s;
        }
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default DealerId;
