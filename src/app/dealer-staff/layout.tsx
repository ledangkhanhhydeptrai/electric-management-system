"use client";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  FaCar,
  FaUserCircle,
  FaSignOutAlt,
  FaUser,
  FaBoxOpen
} from "react-icons/fa";
import Image from "next/image";
import {
  Boxes,
  FileText,
  ChevronDown,
  PackageCheck,
  Package
} from "lucide-react";
import { FiMenu } from "react-icons/fi";
import { Alert, Snackbar } from "@mui/material";
import { HiUserGroup } from "react-icons/hi";
import Cookies from "js-cookie";
import { Account } from "../types/Account/Account";
import { getProfile, ProfileProps } from "@/services/profileService/profile";
import { LoadingProfile } from "./profile/components/LoadingProfile";
import { EmptyProfile } from "./profile/components/EmptyProfile";

type MenuItem = {
  icon: React.ReactNode;
  label: string;
  path: string;
};

const menuItems: MenuItem[] = [
  { icon: <FaCar />, label: "Danh mục xe", path: "/dealer-staff/cars" },
  { icon: <Boxes />, label: "Quản lý kho", path: "/dealer-staff/inventories" },
  {
    icon: <Package />,
    label: "Quản lý báo giá",
    path: "/dealer-staff/quotation"
  },
  {
    icon: <FileText />,
    label: "Quản lý hợp đồng",
    path: "/dealer-staff/contract"
  },
  {
    icon: <FaBoxOpen />,
    label: "Quản lý đơn hàng",
    path: "/dealer-staff/orders"
  },
  {
    icon: <PackageCheck className="w-5 h-5" />,
    label: "Quản lý đơn hàng đại lý",
    path: "/dealer-staff/dealerOrder"
  },
  {
    icon: <HiUserGroup />,
    label: "Quản lý khách hàng",
    path: "/dealer-staff/customer"
  }
  // {
  //   icon: <FaBuilding />,
  //   label: "Quản lý đại lý",
  //   path: "/dealer-staff/dealerView"
  // }
];

export default function DealerstaffLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [userInfo, setUserInfo] = useState<Account | null>(null);
  const [profile, setProfile] = useState<ProfileProps | null>(null);
  // Lấy thông tin user từ sessionStorage
  React.useEffect(() => {
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
        setProfile(res ? (res as ProfileProps) : null);
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
  // Logout
  const handleLogout = () => {
    sessionStorage.removeItem("userInfo");
    Cookies.remove("accessToken");
    router.push("/auth/login");
  };

  return (
    <div className="flex bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 min-h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`bg-gradient-to-b from-emerald-600 via-green-700 to-teal-800 text-white flex flex-col fixed top-0 left-0 h-full transition-all duration-300 z-50 shadow-2xl ${
          isSidebarOpen ? "w-90" : "w-20"
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center h-20 px-4 border-b border-emerald-500/30 ${
            isSidebarOpen ? "justify-between" : "justify-center"
          }`}
        >
          {isSidebarOpen && (
            <div className="flex items-center gap-3 animate-fadeIn">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-xl" />
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/VinFast_logo_%28simple_variant%29.svg/2048px-VinFast_logo_%28simple_variant%29.svg.png"
                  alt="VinFast Logo"
                  width={48}
                  height={48}
                  className="object-contain relative z-10 drop-shadow-lg"
                />
              </div>
              <div>
                <h1 className="font-bold text-xl tracking-wide">
                  Nhân viên đại lý
                </h1>
                <p className="text-xs text-emerald-100">
                  {String(profile.role) === "DEALER_STAFF"
                    ? `${profile.dealerName}`
                    : "Nhân viên hãng"}
                </p>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`p-2.5 hover:bg-emerald-500/30 rounded-lg transition-all duration-200 hover:scale-110 ${
              !isSidebarOpen && "mx-auto"
            }`}
          >
            <FiMenu size={24} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 scrollbar-thin scrollbar-thumb-emerald-500 scrollbar-track-transparent">
          <ul className="flex flex-col gap-2">
            {menuItems.map((item, index) => {
              const isActive = pathname.startsWith(item.path);
              return (
                <li
                  key={item.label}
                  onClick={() => router.push(item.path)}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className={`group flex items-center cursor-pointer rounded-xl transition-all duration-200 relative overflow-hidden ${
                    isActive
                      ? "bg-white text-emerald-700 shadow-lg scale-105"
                      : "hover:bg-emerald-500/20 hover:scale-105 hover:shadow-md"
                  } ${
                    isSidebarOpen
                      ? "gap-4 px-4 py-3.5"
                      : "justify-center py-3.5"
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-600 rounded-r-full" />
                  )}
                  <span
                    className={`text-xl transition-transform duration-200 ${
                      !isActive && "group-hover:scale-110"
                    } ${isActive && "text-emerald-600"}`}
                  >
                    {item.icon}
                  </span>
                  {isSidebarOpen && (
                    <span
                      className={`text-sm font-medium transition-all ${
                        isActive ? "font-semibold" : ""
                      }`}
                    >
                      {item.label}
                    </span>
                  )}
                  {!isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/10 to-emerald-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "ml-90" : "ml-20"
        }`}
      >
        {/* Header */}
        <header
          className={`h-20 bg-white/80 backdrop-blur-md flex items-center justify-between px-8 shadow-lg fixed top-0 z-40 transition-all duration-300 border-b border-emerald-200/50`}
          style={{
            left: isSidebarOpen ? "22.5rem" : "5rem",
            width: isSidebarOpen ? "calc(100% - 22.5rem)" : "calc(100% - 5rem)"
          }}
        >
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {menuItems.find((item) => pathname.startsWith(item.path))
                ?.label || "Dashboard"}
            </h1>
            <p className="text-sm text-gray-500 mt-0.5 flex items-center gap-2">
              <span className="text-emerald-500">🌿</span> Quản lý thân thiện
              môi trường
            </p>
          </div>

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-emerald-50 transition-all duration-200 group"
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
                <p className="text-xs text-slate-500">{userInfo.email}</p>
              </div>
              <ChevronDown
                className={`text-slate-600 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border border-emerald-200 animate-fadeIn">
                <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-100 border-b border-emerald-200">
                  <p className="text-sm font-semibold text-slate-800">
                    {userInfo.username}
                  </p>
                  <p className="text-xs text-slate-600">{userInfo.email}</p>
                </div>

                {/* <button
                  onClick={() => {
                    router.push("/dealer-staff/profile");
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-slate-700 hover:bg-emerald-50 transition-all flex items-center gap-3 group"
                >
                  <FaUser className="text-emerald-600 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Hồ sơ cá nhân</span>
                </button> */}

                <div className="border-t border-slate-200" />

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-all flex items-center gap-3 group font-medium"
                >
                  <FaSignOutAlt className="group-hover:scale-110 transition-transform" />
                  <span>Đăng xuất</span>
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Main content area */}
        <main className="overflow-y-auto">{children}</main>
      </div>

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{
            borderRadius: "12px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            fontWeight: "600",
            fontSize: "14px",
            bgcolor: "linear-gradient(135deg, #10b981 0%, #059669 100%)"
          }}
        >
          ✅ Đăng nhập thành công!
        </Alert>
      </Snackbar>

      {/* Global styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.3);
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.5);
        }
      `}</style>
    </div>
  );
}
