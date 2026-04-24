"use client";
import React from "react";
import { MdStorefront, MdVerifiedUser } from "react-icons/md";
import {
  User,
  Award,
  Shield,
  Sparkles,
  Building2,
  Mail,
  UserCircle,
  Fingerprint,
  Crown,
  Star
} from "lucide-react";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
import { getProfile, ProfileProps } from "@/services/profileService/profile";
import { LoadingProfile } from "./components/LoadingProfile";
import { EmptyProfile } from "./components/EmptyProfile";
export default function AdminProfile() {
  useAuthGuard(["Administrator"]);
  const [data, setData] = React.useState<ProfileProps | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProfile();
        if (response) {
          setData(response as ProfileProps);
        } else {
          setData(null);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);
  if (!data) {
    return <LoadingProfile />;
  }
  if (!data.id) {
    return <EmptyProfile onRetry={() => window.location.reload()} />;
  }
  console.log("Data", data.fullName);
  return (
    <main className="mt-20 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden">
      {/* Animated Background Patterns */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_50%)]" />
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_60%,rgba(20,184,166,0.15),transparent_50%)]" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(6,182,212,0.1),transparent_50%)]" />
      </div>

      {/* Floating Gradient Orbs */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-emerald-300/20 via-teal-300/20 to-transparent rounded-full blur-3xl animate-float" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-cyan-300/20 via-blue-300/20 to-transparent rounded-full blur-3xl animate-float-delayed" />
      <div className="fixed top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-r from-teal-300/15 to-emerald-300/15 rounded-full blur-3xl animate-float-slow" />

      <div className="space-y-8">
        {/* Hero Profile Card */}
        <div className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 shadow-2xl overflow-hidden">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]" />
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full translate-y-40 -translate-x-40" />
            <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full animate-pulse" />
            <div
              className="absolute bottom-20 left-20 w-40 h-40 bg-white/10 rounded-full animate-pulse"
              style={{ animationDelay: "1s" }}
            />
          </div>

          {/* Floating Stars */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-twinkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`
              }}
            >
              <Star className="w-4 h-4 text-white/30" fill="currentColor" />
            </div>
          ))}

          <div className="relative p-12">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Avatar Section */}
              <div className="relative">
                <div className="relative group">
                  {/* Outer glow rings */}
                  <div className="absolute -inset-8 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 rounded-full blur-2xl opacity-50 group-hover:opacity-70 animate-pulse" />
                  <div
                    className="absolute -inset-4 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full blur-xl opacity-40 animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  />

                  {/* Avatar container */}
                  <div className="relative w-48 h-48 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-xl rounded-full border-4 border-white shadow-2xl flex items-center justify-center ring-8 ring-white/20 group-hover:scale-105 transition-transform duration-500">
                    <User
                      className="w-24 h-24 text-white drop-shadow-lg"
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Crown badge */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 rounded-full flex items-center justify-center border-4 border-white shadow-xl animate-bounce">
                    <Crown className="w-8 h-8 text-white" fill="currentColor" />
                  </div>

                  {/* Shield badge */}
                  <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center border-4 border-white shadow-xl">
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>

              {/* Info Section */}
              <div className="flex-1 text-center lg:text-left text-white space-y-6">
                {/* Name */}
                <div>
                  <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                    <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
                    <h1 className="text-5xl font-black drop-shadow-2xl tracking-tight">
                      {data.fullName || "N/A"}
                    </h1>
                    <Sparkles
                      className="w-6 h-6 text-yellow-300 animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    />
                  </div>
                </div>

                {/* Role Badge */}
                <div className="flex justify-center lg:justify-start">
                  <span className="inline-flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-md rounded-2xl text-lg font-bold border-2 border-white/40 shadow-2xl hover:bg-white/30 transition-all duration-300 group">
                    <Award className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                    {data.role}
                    <MdVerifiedUser className="w-6 h-6 text-blue-300" />
                  </span>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/30">
                    <p className="text-emerald-200 text-sm mb-1">Trạng thái</p>
                    <div className="text-2xl font-bold flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                      Hoạt động
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/30">
                    <p className="text-emerald-200 text-sm mb-1">Vai trò</p>
                    <p className="text-2xl font-bold">{data.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dealer Info Card */}
          <div className="md:col-span-2">
            <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_70%)] group-hover:bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.15),transparent_70%)] transition-all duration-700"></div>

              <div className="relative flex items-center gap-6">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <Building2
                    className="w-10 h-10 text-white"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="flex-1 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <MdStorefront className="text-2xl text-emerald-200" />
                    <p className="text-emerald-100 font-semibold text-lg">
                      Đơn vị công tác
                    </p>
                  </div>
                  <h2 className="text-3xl font-black drop-shadow-lg">
                    {data.dealerName || "N/A"}
                  </h2>
                </div>
                <div className="hidden lg:flex items-center gap-2 bg-white/20 backdrop-blur-md px-6 py-3 rounded-2xl">
                  <Star
                    className="w-5 h-5 text-yellow-300"
                    fill="currentColor"
                  />
                  <span className="font-bold">Premium</span>
                </div>
              </div>
            </div>
          </div>

          {/* Email Card */}
          <InfoCard
            icon={Mail}
            label="Địa chỉ Email"
            value={data.email}
            gradient="from-blue-500 to-cyan-600"
            iconBg="from-blue-500 to-cyan-600"
          />

          {/* Username Card */}
          <InfoCard
            icon={UserCircle}
            label="Tên đăng nhập"
            value={data.username}
            gradient="from-purple-500 to-pink-600"
            iconBg="from-purple-500 to-pink-600"
          />

          {/* User ID Card - Full width */}
          <div className="md:col-span-2">
            <div className="group relative bg-white/40 backdrop-blur-xl rounded-3xl p-6 border border-white/60 hover:border-emerald-400/60 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/10 group-hover:to-teal-500/10 transition-all duration-500"></div>

              <div className="relative flex items-center gap-5">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <Fingerprint className="w-8 h-8 text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-emerald-500" />
                    Mã định danh người dùng
                  </p>
                  <div className="flex items-center gap-3">
                    <code className="text-base font-mono font-bold text-gray-900 bg-gray-100 px-4 py-2 rounded-xl flex-1 truncate group-hover:bg-emerald-50 transition-colors">
                      {data.id}
                    </code>
                    <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 hover:shadow-lg">
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(30px, -30px);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-30px, 30px);
          }
        }
        @keyframes float-slow {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(20px, 20px);
          }
        }
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        .animate-shine {
          animation: shine 3s infinite;
        }
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 25s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 30s ease-in-out infinite;
        }
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
function InfoCard({
  icon: Icon,
  label,
  value,
  gradient,
  iconBg
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  gradient: string;
  iconBg: string;
}) {
  return (
    <div className="group relative bg-white/40 backdrop-blur-xl rounded-3xl p-6 border border-white/60 hover:border-white/80 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2">
      {/* Gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
      ></div>

      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent animate-shine"></div>
      </div>

      <div className="relative flex items-center gap-5">
        {/* Icon */}
        <div
          className={`relative w-16 h-16 bg-gradient-to-br ${iconBg} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
        >
          <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse"></div>
          <Icon className="w-8 h-8 text-white relative z-10" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-600 mb-1.5 flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-emerald-500" />
            {label}
          </p>
          <p className="text-lg font-bold text-gray-900 truncate group-hover:text-emerald-700 transition-colors">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
