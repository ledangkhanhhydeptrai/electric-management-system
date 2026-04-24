"use client";
import React, { useState } from "react";
import {
  Activity,
  Settings,
  Globe,
  Percent,
  DollarSign,
  Languages,
  Palette,
  Bell,
  Shield,
  Save,
  Search,
  Filter,
  Download,
  RefreshCw,
  User,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Info,
  Eye,
  EyeOff,
  Smartphone,
  Mail,
  Lock,
  X
} from "lucide-react";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";

// SettingsForm Component
const SettingsForm = () => {
  useAuthGuard(["Administrator"]);
  const [siteName, setSiteName] = useState("VinFast System");
  const [taxRate, setTaxRate] = useState(10);
  const [defaultCurrency, setDefaultCurrency] = useState("VND");
  const [language, setLanguage] = useState("vi");
  const [theme, setTheme] = useState("light");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [autoLogout, setAutoLogout] = useState(30);

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState<
    "success" | "error" | "info"
  >("success");

  const showNotification = (
    message: string,
    severity: "success" | "error" | "info"
  ) => {
    setNotificationMessage(message);
    setNotificationSeverity(severity);
    setNotificationOpen(true);
    setTimeout(() => setNotificationOpen(false), 4000);
  };

  const handleSave = () => {
    try {
      showNotification(`Cài đặt đã được lưu thành công!`, "success");
    } catch (error) {
      console.error("Error saving settings:", error);
      showNotification("Lỗi khi lưu cài đặt. Vui lòng thử lại.", "error");
    }
  };

  const handleReset = () => {
    setSiteName("VinFast System");
    setTaxRate(10);
    setDefaultCurrency("VND");
    setLanguage("vi");
    setTheme("light");
    setEmailNotifications(true);
    setSmsNotifications(false);
    setTwoFactorAuth(false);
    setAutoLogout(30);
    showNotification("Đã khôi phục cài đặt mặc định", "info");
  };

  return (
    <>
      {/* Notification */}
      {notificationOpen && (
        <div className="fixed top-6 right-6 z-50 animate-slide-in">
          <div
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-sm border-l-4 ${
              notificationSeverity === "success"
                ? "bg-white border-green-500 text-green-800"
                : notificationSeverity === "error"
                ? "bg-white border-red-500 text-red-800"
                : "bg-white border-blue-500 text-blue-800"
            }`}
          >
            {notificationSeverity === "success" && (
              <CheckCircle className="w-6 h-6 text-green-600" />
            )}
            {notificationSeverity === "error" && (
              <XCircle className="w-6 h-6 text-red-600" />
            )}
            {notificationSeverity === "info" && (
              <Info className="w-6 h-6 text-blue-600" />
            )}
            <span className="font-medium">{notificationMessage}</span>
            <button
              onClick={() => setNotificationOpen(false)}
              className="ml-4 hover:bg-slate-100 p-1 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Main Settings */}
        <div className="xl:col-span-3 space-y-8">
          {/* General Settings */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-slate-200">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl shadow-lg">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    Cài đặt chung
                  </h2>
                  <p className="text-slate-600 mt-1">
                    Cấu hình cơ bản của hệ thống
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-8">
              {/* Site Name */}
              <div className="group">
                <label className="flex items-center gap-3 text-slate-700 font-semibold mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <Globe className="w-5 h-5 text-blue-600" />
                  </div>
                  Tên hệ thống
                </label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-all bg-slate-50 hover:bg-white text-slate-900 font-medium shadow-sm"
                  placeholder="Nhập tên hệ thống"
                />
                <p className="text-sm text-slate-500 mt-2">
                  Tên này sẽ hiển thị trên header và tab trình duyệt
                </p>
              </div>

              {/* Financial Settings */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="group">
                  <label className="flex items-center gap-3 text-slate-700 font-semibold mb-3">
                    <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                      <Percent className="w-5 h-5 text-green-600" />
                    </div>
                    Thuế suất (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={taxRate}
                      onChange={(e) => setTaxRate(Number(e.target.value))}
                      className="w-full px-4 py-4 pr-12 rounded-xl border-2 border-slate-200 focus:border-green-500 focus:outline-none transition-all bg-slate-50 hover:bg-white text-slate-900 font-medium shadow-sm"
                      placeholder="10"
                      min={0}
                      max={100}
                    />
                    <div className="absolute right-4 top-4 text-slate-400 font-bold">
                      %
                    </div>
                  </div>
                </div>

                <div className="group">
                  <label className="flex items-center gap-3 text-slate-700 font-semibold mb-3">
                    <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
                      <DollarSign className="w-5 h-5 text-emerald-600" />
                    </div>
                    Đơn vị tiền tệ
                  </label>
                  <select
                    value={defaultCurrency}
                    onChange={(e) => setDefaultCurrency(e.target.value)}
                    className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 focus:border-emerald-500 focus:outline-none transition-all bg-slate-50 hover:bg-white text-slate-900 font-medium shadow-sm appearance-none cursor-pointer"
                  >
                    <option value="VND">🇻🇳 VND - Việt Nam Đồng</option>
                    <option value="USD">🇺🇸 USD - US Dollar</option>
                    <option value="EUR">🇪🇺 EUR - Euro</option>
                    <option value="JPY">🇯🇵 JPY - Japanese Yen</option>
                  </select>
                </div>
              </div>

              {/* Localization Settings */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="group">
                  <label className="flex items-center gap-3 text-slate-700 font-semibold mb-3">
                    <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                      <Languages className="w-5 h-5 text-purple-600" />
                    </div>
                    Ngôn ngữ
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:outline-none transition-all bg-slate-50 hover:bg-white text-slate-900 font-medium shadow-sm appearance-none cursor-pointer"
                  >
                    <option value="vi">🇻🇳 Tiếng Việt</option>
                    <option value="en">🇺🇸 English</option>
                    <option value="ja">🇯🇵 日本語</option>
                    <option value="ko">🇰🇷 한국어</option>
                  </select>
                </div>

                <div className="group">
                  <label className="flex items-center gap-3 text-slate-700 font-semibold mb-3">
                    <div className="p-2 bg-pink-100 rounded-lg group-hover:bg-pink-200 transition-colors">
                      <Palette className="w-5 h-5 text-pink-600" />
                    </div>
                    Giao diện
                  </label>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 focus:border-pink-500 focus:outline-none transition-all bg-slate-50 hover:bg-white text-slate-900 font-medium shadow-sm appearance-none cursor-pointer"
                  >
                    <option value="light">☀️ Sáng</option>
                    <option value="dark">🌙 Tối</option>
                    <option value="auto">🔄 Tự động</option>
                  </select>
                </div>
              </div>

              {/* Auto Logout */}
              <div className="group">
                <label className="flex items-center gap-3 text-slate-700 font-semibold mb-3">
                  <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                  Tự động đăng xuất (phút)
                </label>
                <div className="flex gap-4 flex-wrap">
                  {[15, 30, 60, 120].map((minutes) => (
                    <button
                      key={minutes}
                      onClick={() => setAutoLogout(minutes)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        autoLogout === minutes
                          ? "bg-orange-500 text-white shadow-lg"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {minutes} phút
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Notifications */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 px-6 py-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-amber-500 to-yellow-600 p-2 rounded-lg shadow-md">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Thông báo</h3>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <label className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl cursor-pointer hover:from-slate-100 hover:to-blue-100 transition-all border border-slate-200">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-semibold text-slate-800">Email</div>
                    <div className="text-xs text-slate-500">
                      Nhận thông báo qua email
                    </div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-green-50 rounded-xl cursor-pointer hover:from-slate-100 hover:to-green-100 transition-all border border-slate-200">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-semibold text-slate-800">SMS</div>
                    <div className="text-xs text-slate-500">
                      Nhận thông báo qua tin nhắn
                    </div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={smsNotifications}
                  onChange={(e) => setSmsNotifications(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-300 text-green-600 focus:ring-green-500"
                />
              </label>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-red-50 to-pink-50 px-6 py-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-red-500 to-pink-600 p-2 rounded-lg shadow-md">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Bảo mật</h3>
              </div>
            </div>

            <div className="p-6">
              <label className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-red-50 rounded-xl cursor-pointer hover:from-slate-100 hover:to-red-100 transition-all border border-slate-200">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-red-600" />
                  <div>
                    <div className="font-semibold text-slate-800">
                      Xác thực 2 lớp
                    </div>
                    <div className="text-xs text-slate-500">
                      Tăng cường bảo mật
                    </div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={twoFactorAuth}
                  onChange={(e) => setTwoFactorAuth(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-300 text-red-600 focus:ring-red-500"
                />
              </label>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 rounded-2xl shadow-xl p-6 text-white">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Thống kê nhanh
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-indigo-100">Lần lưu cuối</span>
                <span className="font-bold">2 phút trước</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-indigo-100">Tổng cài đặt</span>
                <span className="font-bold">8 tùy chọn</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-indigo-100">Trạng thái</span>
                <span className="px-3 py-1 bg-green-400 rounded-full text-xs font-bold text-green-900">
                  Hoạt động
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="mt-8 bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-slate-600">
            <Info className="w-5 h-5" />
            <span className="font-medium">
              Các thay đổi sẽ được áp dụng ngay sau khi lưu
            </span>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all font-semibold"
            >
              Khôi phục mặc định
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              Lưu cài đặt
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// LogTable Component
const LogTable = () => {
  interface Log {
    id: string;
    user: string;
    action: string;
    date: string;
    time: string;
    status: "Success" | "Failed";
    details?: string;
  }

  const sampleLogs: Log[] = [
    {
      id: "1",
      user: "Nguyễn Văn A",
      action: "Cập nhật giá xe",
      date: "2025-10-08",
      time: "14:30:25",
      status: "Success",
      details: "Thay đổi giá VinFast VF8 từ 950M thành 920M VNĐ"
    },
    {
      id: "2",
      user: "Trần Thị B",
      action: "Tạo đơn hàng mới",
      date: "2025-10-07",
      time: "11:15:42",
      status: "Success",
      details: "Đơn hàng #ORD-2024-0892 - VinFast VF9"
    },
    {
      id: "3",
      user: "Lê Văn C",
      action: "Xóa tài khoản đại lý",
      date: "2025-10-06",
      time: "09:45:18",
      status: "Failed",
      details: "Không đủ quyền hạn"
    },
    {
      id: "4",
      user: "Phạm Thị D",
      action: "Thêm tồn kho",
      date: "2025-10-05",
      time: "16:20:05",
      status: "Success",
      details: "Thêm 25 xe VinFast VF5"
    },
    {
      id: "5",
      user: "Hoàng Văn E",
      action: "Sửa chính sách giảm giá",
      date: "2025-10-04",
      time: "13:55:30",
      status: "Success",
      details: "Cập nhật giảm giá từ 5% thành 7%"
    }
  ];

  const [logs] = useState<Log[]>(sampleLogs);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "All" | "Success" | "Failed"
  >("All");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "All" || log.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Tổng nhật ký</p>
              <p className="text-3xl font-bold text-slate-800">{logs.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Thành công</p>
              <p className="text-3xl font-bold text-slate-800">
                {logs.filter((l) => l.status === "Success").length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-xl">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Thất bại</p>
              <p className="text-3xl font-bold text-slate-800">
                {logs.filter((l) => l.status === "Failed").length}
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-xl">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Tỷ lệ thành công</p>
              <p className="text-3xl font-bold text-slate-800">
                {Math.round(
                  (logs.filter((l) => l.status === "Success").length /
                    logs.length) *
                    100
                )}
                %
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-xl">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex-1 relative w-full lg:max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm theo người dùng hoặc hành động..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-slate-50"
            />
          </div>

          <div className="flex gap-3 w-full lg:w-auto">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-slate-600" />
              <select
                value={filterStatus}
                onChange={(e) =>
                  setFilterStatus(
                    e.target.value as "All" | "Success" | "Failed"
                  )
                }
                className="px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors font-medium cursor-pointer bg-slate-50"
              >
                <option value="All">Tất cả trạng thái</option>
                <option value="Success">Chỉ thành công</option>
                <option value="Failed">Chỉ thất bại</option>
              </select>
            </div>

            <button className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors flex items-center gap-2 font-medium">
              <RefreshCw className="w-4 h-4" />
              Làm mới
            </button>

            <button className="px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl transition-all flex items-center gap-2 font-medium shadow-lg">
              <Download className="w-4 h-4" />
              Xuất file
            </button>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-slate-50 to-blue-50 border-b-2 border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Người dùng
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Hành động
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Ngày & Giờ
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Chi tiết
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredLogs.map((log) => (
                <React.Fragment key={log.id}>
                  <tr
                    className="hover:bg-blue-50 transition-colors cursor-pointer"
                    onClick={() => toggleRow(log.id)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                          {log.user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                        <span className="font-semibold text-slate-800">
                          {log.user}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-700 font-medium">
                      {log.action}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-slate-800 font-semibold">
                          {log.date}
                        </span>
                        <span className="text-sm text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {log.time}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {log.status === "Success" ? (
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                          <CheckCircle className="w-4 h-4" />
                          Thành công
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                          <XCircle className="w-4 h-4" />
                          Thất bại
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center gap-1 mx-auto">
                        {expandedRow === log.id ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                        {expandedRow === log.id ? "Ẩn" : "Xem"}
                      </button>
                    </td>
                  </tr>
                  {expandedRow === log.id && (
                    <tr className="bg-slate-50">
                      <td colSpan={5} className="px-6 py-6">
                        <div className="flex items-start gap-4 p-6 bg-white rounded-xl border-2 border-blue-200 shadow-sm">
                          <div className="bg-blue-100 p-3 rounded-xl">
                            <Activity className="w-6 h-6 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-slate-800 mb-2 text-lg">
                              Chi tiết hành động
                            </p>
                            <p className="text-slate-600 leading-relaxed">
                              {log.details}
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-16">
            <Activity className="w-20 h-20 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-xl font-semibold">
              Không tìm thấy nhật ký nào
            </p>
            <p className="text-slate-400 mt-2">
              Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredLogs.length > 0 && (
        <div className="mt-8 flex items-center justify-between bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <p className="text-slate-600">
            Hiển thị{" "}
            <span className="font-bold text-slate-800">
              {filteredLogs.length}
            </span>{" "}
            trong tổng số{" "}
            <span className="font-bold text-slate-800">{logs.length}</span> nhật
            ký
          </p>
          <div className="flex gap-3">
            <button className="px-6 py-2 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-semibold">
              Trước
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all font-semibold shadow-lg">
              Sau
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// Main Settings Page
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"settings" | "logs">("settings");

  return (
    <main className="-mt-1 text-left">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-4 rounded-2xl shadow-xl">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent">
                  Cài đặt & Hoạt động
                </h1>
                <p className="text-slate-600 mt-2 text-lg">
                  Cấu hình hệ thống và theo dõi nhật ký hoạt động
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Tabs */}
          <div className="">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab("settings")}
                className={`flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold transition-all transform ${
                  activeTab === "settings"
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg scale-105"
                    : "text-slate-700 hover:bg-slate-100 hover:scale-105"
                }`}
              >
                <Settings className="w-5 h-5" />
                Cài đặt hệ thống
              </button>
              <button
                onClick={() => setActiveTab("logs")}
                className={`flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold transition-all transform ${
                  activeTab === "logs"
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg scale-105"
                    : "text-slate-700 hover:bg-slate-100 hover:scale-105"
                }`}
              >
                <Activity className="w-5 h-5" />
                Nhật ký hoạt động
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="animate-fade-in">
          {activeTab === "settings" ? <SettingsForm /> : <LogTable />}
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
      `}</style>
    </main>
  );
}
