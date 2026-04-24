"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { AccountServiceDetail } from "@/services/accountService/account";
import { Account } from "@/app/types/Account/Account";
import {
  Mail,
  Phone,
  Calendar,
  User,
  ArrowLeft,
  Activity,
  Clock,
  Shield
} from "lucide-react";
import Image from "next/image";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";

export default function UserDetailPage() {
  useAuthGuard(["Administrator"]);
  const { id } = useParams();
  const [data, setData] = React.useState<Account | null>(null);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  React.useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const response = await AccountServiceDetail(id as string);
        if (response) setData(response as unknown as Account);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto" />
          <p className="text-emerald-700 text-lg font-semibold">
            Đang tải thông tin...
          </p>
        </div>
      </div>
    );
  }

  const memberSince = Math.floor(
    (Date.now() - new Date(data.createdAt).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="mt-21 space-y-6">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-emerald-700 hover:text-emerald-900 font-semibold transition-all hover:gap-3 group bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-xl shadow-lg hover:shadow-xl"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Quay lại
      </button>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Profile Card */}
        <div className="xl:col-span-2">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/40">
            {/* Header */}
            <div className="relative h-64 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600">
              {/* Avatar */}
              <div className="absolute -bottom-20 left-8">
                <div className="relative w-40 h-40 rounded-full p-1 bg-white shadow-2xl">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={`https://i.pravatar.cc/200?u=${data.id}`}
                      alt={data.username}
                      width={160}
                      height={160}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  {/* Status Badge */}
                  {data.isActive && (
                    <div className="absolute bottom-2 right-2 w-10 h-10 bg-emerald-500 rounded-full border-4 border-white shadow-lg">
                      <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="pt-24 px-8 pb-8">
              {/* Name & Status */}
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-3">
                  {data.username}
                </h1>
                <p className="text-emerald-600 font-medium text-lg mb-4">
                  {data.email}
                </p>

                <div className="flex flex-wrap gap-3">
                  {data.isActive ? (
                    <span className="px-5 py-2.5 bg-emerald-100 text-emerald-700 rounded-xl text-sm font-semibold flex items-center gap-2 border border-emerald-200">
                      <Activity className="w-5 h-5" />
                      Đang hoạt động
                    </span>
                  ) : (
                    <span className="px-5 py-2.5 bg-red-100 text-red-700 rounded-xl text-sm font-semibold flex items-center gap-2 border border-red-200">
                      <Activity className="w-5 h-5" />
                      Không hoạt động
                    </span>
                  )}
                  <span className="px-5 py-2.5 bg-blue-100 text-blue-700 rounded-xl text-sm font-semibold flex items-center gap-2 border border-blue-200">
                    <Calendar className="w-5 h-5" />
                    {memberSince} ngày tham gia
                  </span>
                  <span className="px-5 py-2.5 bg-purple-100 text-purple-700 rounded-xl text-sm font-semibold flex items-center gap-2 border border-purple-200">
                    <Shield className="w-5 h-5" />
                    Thành viên
                  </span>
                </div>
              </div>

              {/* Info Grid */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Thông tin chi tiết
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* <InfoCard
                    icon={<Hash className="w-5 h-5" />}
                    label="Mã người dùng"
                    value={data.id}
                    gradient="from-blue-500 to-blue-600"
                  /> */}
                  <InfoCard
                    icon={<Phone className="w-5 h-5" />}
                    label="Số điện thoại"
                    value={data.phoneNumber || "Chưa cập nhật"}
                    gradient="from-green-500 to-emerald-600"
                  />
                  <InfoCard
                    icon={<Mail className="w-5 h-5" />}
                    label="Email"
                    value={data.email}
                    gradient="from-purple-500 to-purple-600"
                  />
                  <InfoCard
                    icon={<Calendar className="w-5 h-5" />}
                    label="Ngày tạo"
                    value={new Date(data.createdAt).toLocaleDateString(
                      "vi-VN",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      }
                    )}
                    gradient="from-orange-500 to-orange-600"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Stats & Additional Info */}
        <div className="space-y-6">
          {/* Stats Card */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/40">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Thống kê</h2>
            <div className="space-y-5">
              <StatBox
                icon={<Activity className="w-6 h-6" />}
                label="Trạng thái"
                value={data.isActive ? "Đang hoạt động" : "Không hoạt động"}
                gradient={
                  data.isActive
                    ? "from-emerald-500 to-green-600"
                    : "from-red-500 to-orange-600"
                }
              />
              <StatBox
                icon={<Calendar className="w-6 h-6" />}
                label="Thời gian tham gia"
                value={`${memberSince} ngày`}
                gradient="from-blue-500 to-cyan-600"
              />
              <StatBox
                icon={<Clock className="w-6 h-6" />}
                label="Ngày tạo tài khoản"
                value={new Date(data.createdAt).toLocaleDateString("vi-VN")}
                gradient="from-purple-500 to-pink-600"
              />
              <StatBox
                icon={<User className="w-6 h-6" />}
                label="Tên người dùng"
                value={data.username}
                gradient="from-indigo-500 to-blue-600"
              />
            </div>
          </div>

          {/* Quick Info Card */}
          <div className="bg-gradient-to-br from-emerald-100 via-teal-100 to-cyan-100 rounded-3xl p-8 border-2 border-white/60 shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-emerald-600" />
              Thông tin
            </h3>
            <div className="space-y-3 text-gray-700">
              {/* <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-sm">
                  ID:{" "}
                  <span className="font-mono font-semibold">
                    {data.id.slice(0, 12)}...
                  </span>
                </span>
              </div> */}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal-500" />
                <span className="text-sm">
                  Email: <span className="font-semibold">{data.email}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500" />
                <span className="text-sm">
                  Phone:{" "}
                  <span className="font-semibold">
                    {data.phoneNumber || "Chưa có"}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Info Card Component */
function InfoCard({
  icon,
  label,
  value,
  gradient
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  gradient: string;
}) {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start gap-4">
        <div
          className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-md`}
        >
          <div className="text-white">{icon}</div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            {label}
          </p>
          <p className="text-base font-bold text-gray-900 break-all leading-relaxed">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

/* Stats Box Component */
function StatBox({
  icon,
  label,
  value,
  gradient
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  gradient: string;
}) {
  return (
    <div className="group relative bg-white rounded-2xl p-5 border border-gray-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-4">
        <div
          className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}
        >
          <div className="text-white">{icon}</div>
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            {label}
          </p>
          <p className="text-lg font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}
