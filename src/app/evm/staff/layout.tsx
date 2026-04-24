"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaCar, FaUserCircle, FaBuilding } from "react-icons/fa";
import {
  Package,
  ClipboardList,
  PackageCheck,
  Zap,
  Menu,
  X
} from "lucide-react";
import { FiChevronDown } from "react-icons/fi";
import { Logout } from "@/services/auth/logout/logout";
import { Alert, Snackbar } from "@mui/material";
import { Account } from "@/app/types/Account/Account";
import { HiIdentification } from "react-icons/hi";
import { getProfile, ProfileProps } from "@/services/profileService/profile";
import { LoadingProfile } from "./profile/components/LoadingProfile";
import { EmptyProfile } from "./profile/components/EmptyProfile";

type MenuItem = {
  icon: React.ReactNode;
  label: string;
  path: string;
};

const menuItems: MenuItem[] = [
  { icon: <FaCar />, label: "Danh mục xe", path: "/evm/staff/cars" },
  {
    icon: <Package />,
    label: "Quản lý tồn kho",
    path: "/evm/staff/inventories"
  },
  {
    icon: <PackageCheck />,
    label: "Quản lý đơn hàng đại lý",
    path: "/evm/staff/dealerOrder"
  },
  {
    icon: <ClipboardList />,
    label: "Quản lý mẫu xe",
    path: "/evm/staff/model"
  },
  {
    icon: <FaBuilding />,
    label: "Quản lý đại lý",
    path: "/evm/staff/dealerView"
  },
  {
    icon: <HiIdentification />,
    label: "Quản lý nhân viên",
    path: "/evm/staff/staff"
  }
];

export default function StaffLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userInfo, setUserInfo] = useState<Account | null>(null);
  const [profile, setProfile] = useState<ProfileProps | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Lấy userInfo từ sessionStorage
    const info = sessionStorage.getItem("userInfo");
    if (info) setUserInfo(JSON.parse(info));

    // Check login_success query
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      const loginSuccess = url.searchParams.get("login_success");
      if (loginSuccess) {
        setOpenSnackbar(true);
        url.searchParams.delete("login_success");
        window.history.replaceState({}, "", url.toString());
      }
    }

    // Fetch profile
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setProfile(res ? res as ProfileProps : null);
      } catch (err) {
        console.error(err);
        setProfile(null);
      }
    };
    fetchProfile();
  }, []);

  if (!userInfo) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-2xl animate-fadeIn">
          <FaUserCircle size={60} className="mx-auto text-emerald-600 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Bạn chưa đăng nhập
          </h1>
          <p className="text-gray-500 mb-6">
            Vui lòng đăng nhập để truy cập dashboard của bạn.
          </p>
          <button
            onClick={() => router.push("/auth/login")}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-colors"
          >
            Đến trang đăng nhập
          </button>
        </div>
      </div>
    );
  }

  if (!profile) return <LoadingProfile />;
  if (!profile.id)
    return <EmptyProfile onRetry={() => window.location.reload()} />;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Sidebar */}
      <aside
        className={`bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 text-white flex flex-col fixed top-0 bottom-0 transition-all duration-300 z-50 shadow-2xl ${isSidebarOpen
          ? "w-72 px-6"
          : "w-20 px-3"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-20 mb-6 border-b border-white/20">
          {isSidebarOpen &&
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl tracking-wide">VinFast</h1>
                <p className="text-xs text-emerald-100">
                  {String(profile.role) === "EVM_STAFF"
                    ? `Đại lý ${profile.dealerName}`
                    : "Nhân viên hãng"}
                </p>
              </div>
            </div>}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2.5 hover:bg-white/20 rounded-xl transition-all backdrop-blur-sm"
          >
            {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="flex flex-col gap-2">
            {menuItems.map(item => {
              const isActive = pathname === item.path;
              return (
                <li
                  key={item.label}
                  onClick={() => router.push(item.path)}
                  className={`flex items-center cursor-pointer rounded-xl transition-all duration-200 group relative overflow-hidden
                    ${isActive
                      ? "bg-white/25 shadow-lg backdrop-blur-sm"
                      : "hover:bg-white/10"}
                    ${isSidebarOpen
                      ? "gap-4 px-4 py-3.5"
                      : "justify-center py-3.5"}
                  `}
                >
                  {isActive &&
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full" />}
                  <span
                    className={`text-lg transition-transform group-hover:scale-110 ${isActive
                      ? "ml-2"
                      : ""}`}
                  >
                    {item.icon}
                  </span>
                  {isSidebarOpen &&
                    <span
                      className={`text-sm font-medium ${isActive
                        ? "font-semibold"
                        : ""}`}
                    >
                      {item.label}
                    </span>}
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div
        className="flex-1 flex flex-col transition-all duration-300"
        style={{ marginLeft: isSidebarOpen ? "18rem" : "5rem" }}
      >
        {/* Header */}
        <header
          className="h-20 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 flex items-center justify-between px-8 shadow-sm fixed top-0 z-40 transition-all duration-300"
          style={{
            left: isSidebarOpen ? "18rem" : "5rem",
            width: isSidebarOpen ? "calc(100% - 18rem)" : "calc(100% - 5rem)"
          }}
        >
          <div className="absolute top-2 right-4">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-slate-100 transition-all duration-200 group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-md group-hover:blur-lg transition-all" />
                <FaUserCircle
                  size={40}
                  className="text-emerald-600 relative z-10"
                />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-slate-800">
                  {userInfo.username}
                </p>
                <p className="text-xs text-slate-600">
                  {userInfo.email}
                </p>
              </div>
              <FiChevronDown
                className={`text-slate-600 transition-transform duration-200 ${isDropdownOpen
                  ? "rotate-180"
                  : ""}`}
              />
            </button>

            {isDropdownOpen &&
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border border-slate-200 animate-fadeIn">
                <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-100 border-b border-emerald-200">
                  <p className="text-sm font-semibold text-slate-800">
                    {userInfo.username}
                  </p>
                  <p className="text-xs text-slate-600">
                    {userInfo.email}
                  </p>
                </div>
                {/* <button
                  onClick={() => {
                    router.push("/evm/staff/profile");
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-slate-700 hover:bg-emerald-50 transition-all flex items-center gap-3 group"
                >
                  <FaUser className="text-emerald-600 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Quản lý tài khoản</span>
                </button> */}
                <div className="border-t border-slate-200" />
                <button
                  onClick={async () => {
                    const ok = await Logout();
                    if (ok) router.push("/auth/login");
                  }}
                  className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-all flex items-center gap-3 group font-medium"
                >
                  <svg
                    className="w-5 h-5 group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Đăng xuất</span>
                </button>
              </div>}
          </div>
        </header>

        <main className="">
          {children}
        </main>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{ borderRadius: "10px" }}
        >
          ✅ Đăng nhập thành công!
        </Alert>
      </Snackbar>
    </div>
  );
}
