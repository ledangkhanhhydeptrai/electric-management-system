"use client";
import React, { useState } from "react";
import {
  Search,
  UserCircle,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Eye,
  Filter,
  Download,
  Plus,
  Users,
  Activity,
  Clock,
  Shield
} from "lucide-react";
import { MdVerifiedUser } from "react-icons/md";
import { Account } from "@/app/types/Account/Account";
import { getAllManuAccount } from "@/services/accountManufacturerService/accountManu";

// ===== Main Component =====
const AccountDealer: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "inactive"
  >("all");
  
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllManuAccount();
        if (Array.isArray(response)) {
          setAccounts(response);
        } else {
          setAccounts([]);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);
  // Filter accounts
  const filteredAccounts = accounts.filter((account) => {
    const matchesSearch =
      account.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.phoneNumber.includes(searchTerm);

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && account.isActive) ||
      (filterStatus === "inactive" && !account.isActive);

    return matchesSearch && matchesStatus;
  });
console.log("Accounts:", accounts);
console.log("Filtered Accounts:", filteredAccounts);
  // Stats
  const totalAccounts = accounts.length;
  const activeAccounts = accounts.filter((a) => a.isActive).length;
  const inactiveAccounts = accounts.filter((a) => !a.isActive).length;

  return (
    <main className="mt-20 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_50%)]" />
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_60%,rgba(20,184,166,0.15),transparent_50%)]" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(6,182,212,0.1),transparent_50%)]" />
      </div>

      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-emerald-300/20 via-teal-300/20 to-transparent rounded-full blur-3xl animate-pulse" />
      <div
        className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-cyan-300/20 via-blue-300/20 to-transparent rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="relative">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-700 bg-clip-text text-transparent mb-2">
                Quản lý tài khoản Hãng
              </h1>
              <p className="text-gray-600 text-lg">
                Danh sách tất cả tài khoản đại lý trong hệ thống
              </p>
            </div>

            {/* <div className="flex gap-3">
              <button className="group flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-xl text-gray-700 rounded-xl font-semibold border border-white/80 hover:border-emerald-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                Xuất Excel
              </button>
              <button className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 hover:-translate-y-1">
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                Thêm tài khoản
              </button>
            </div> */}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            icon={Users}
            label="Tổng số tài khoản"
            value={totalAccounts}
            gradient="from-emerald-500 to-teal-600"
            trend="+12% tháng này"
          />
          <StatsCard
            icon={CheckCircle}
            label="Đang hoạt động"
            value={activeAccounts}
            gradient="from-blue-500 to-cyan-600"
            trend="+8% tháng này"
          />
          <StatsCard
            icon={Shield}
            label="Không hoạt động"
            value={inactiveAccounts}
            gradient="from-purple-500 to-pink-600"
            trend="-3% tháng này"
          />
        </div>

        {/* Search & Filter */}
        <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/80 shadow-lg p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên, email, số điện thoại..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 transition-all outline-none font-medium"
              />
            </div>

            {/* Filter Status */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilterStatus("all")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  filterStatus === "all"
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
                    : "bg-white border-2 border-gray-200 text-gray-700 hover:border-emerald-300"
                }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => setFilterStatus("active")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  filterStatus === "active"
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
                    : "bg-white border-2 border-gray-200 text-gray-700 hover:border-emerald-300"
                }`}
              >
                Hoạt động
              </button>
              <button
                onClick={() => setFilterStatus("inactive")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  filterStatus === "inactive"
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
                    : "bg-white border-2 border-gray-200 text-gray-700 hover:border-emerald-300"
                }`}
              >
                Không hoạt động
              </button>
            </div>
          </div>

          {/* Result count */}
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
            <Filter className="w-4 h-4" />
            <span>
              Hiển thị{" "}
              <span className="font-bold text-emerald-600">
                {filteredAccounts.length}
              </span>{" "}
              / {totalAccounts} tài khoản
            </span>
          </div>
        </div>

        {/* Accounts Grid */}
        {filteredAccounts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredAccounts.map((account) => (
              <AccountCard
                key={account.id}
                account={account}
                onView={() => console.log("View:", account.id)}
                onEdit={() => console.log("Edit:", account.id)}
                onDelete={() => console.log("Delete:", account.id)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/80 shadow-lg p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Không tìm thấy tài khoản
            </h3>
            <p className="text-gray-600">
              Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default AccountDealer;
function StatsCard({
  icon: Icon,
  label,
  value,
  gradient,
  trend
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  gradient: string;
  trend?: string;
}) {
  return (
    <div className="group relative bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/80 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
      <div
        className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity`}
      />

      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-600 mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className="text-xs text-emerald-600 font-semibold mt-2 flex items-center gap-1">
              <Activity className="w-3 h-3" />
              {trend}
            </p>
          )}
        </div>
        <div
          className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
        >
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>
    </div>
  );
}

// ===== Account Card Component =====
function AccountCard({
  account,
  onEdit,
  onDelete,
  onView
}: {
  account: Account;
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void;
}) {
  return (
    <div className="group relative bg-white/60 backdrop-blur-xl rounded-2xl border border-white/80 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/5 group-hover:to-teal-500/5 transition-all duration-300" />

      {/* Status Badge */}
      <div className="absolute top-4 right-4 z-10">
        {account.isActive ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold border border-emerald-300">
            <CheckCircle className="w-3 h-3" />
            Hoạt động
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-100 text-red-700 rounded-full text-xs font-bold border border-red-300">
            <XCircle className="w-3 h-3" />
            Không hoạt động
          </span>
        )}
      </div>

      <div className="relative p-6">
        {/* Avatar & Name */}
        <div className="flex items-start gap-4 mb-5">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <UserCircle className="w-9 h-9 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center border-2 border-white">
              <MdVerifiedUser className="w-3 h-3 text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {account.username}
            </h3>
            <p className="text-sm text-gray-500 font-mono truncate">
              {account.id}
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 mb-5">
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200/50">
            <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span className="text-sm font-medium text-gray-700 truncate">
              {account.email}
            </span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200/50">
            <Phone className="w-4 h-4 text-purple-600 flex-shrink-0" />
            <span className="text-sm font-medium text-gray-700">
              {account.phoneNumber}
            </span>
          </div>
        </div>

        {/* Timestamps */}
        <div className="space-y-2 mb-5 p-4 bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl border border-gray-200/50">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600 flex items-center gap-1.5">
              <Calendar className="w-3 h-3" />
              Tạo lúc
            </span>
            <span className="font-semibold text-gray-900">
              {account.createdAt}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600 flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              Cập nhật
            </span>
            <span className="font-semibold text-gray-900">
              {account.lastModifiedAt}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        {/* <div className="grid grid-cols-3 gap-2">
          <button
            onClick={onView}
            className="flex items-center justify-center gap-2 px-3 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-semibold text-sm hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 hover:shadow-lg"
          >
            <Eye className="w-4 h-4" />
            Xem
          </button>
          <button
            onClick={onEdit}
            className="flex items-center justify-center gap-2 px-3 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold text-sm hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 hover:shadow-lg"
          >
            <Edit className="w-4 h-4" />
            Sửa
          </button>
          <button
            onClick={onDelete}
            className="flex items-center justify-center gap-2 px-3 py-2.5 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-semibold text-sm hover:from-red-600 hover:to-pink-700 transition-all duration-300 hover:shadow-lg"
          >
            <Trash2 className="w-4 h-4" />
            Xóa
          </button>
        </div> */}
      </div>
    </div>
  );
}
