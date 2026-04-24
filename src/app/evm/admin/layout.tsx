"use client";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaUserCircle, FaUser, FaBuilding, FaCar } from "react-icons/fa";
import Image from "next/image";
import { Boxes, ClipboardList, Home, PackageCheck } from "lucide-react";
import { FiMenu, FiChevronDown } from "react-icons/fi";
import { Logout } from "@/services/auth/logout/logout";
import { Alert, Snackbar } from "@mui/material";
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
  { icon: <FaUser />, label: "Quản lý người dùng", path: "/evm/admin/users" },
  // { icon: <FaCog />, label: "Quản lý hệ thống", path: "/evm/admin/system" },
  // { icon: <FaBoxOpen />, label: "Quản lý đơn hàng", path: "/evm/admin/orders" },
  {
    icon: <PackageCheck className="w-5 h-5" />,
    label: "Quản lý đơn hàng đại lý",
    path: "/evm/admin/dealerOrder"
  },
  {
    icon: <ClipboardList />,
    label: "Quản lý mẫu xe",
    path: "/evm/admin/model"
  },
  { icon: <FaCar />, label: "Quản lý xe điện", path: "/evm/admin/cars" },
  {
    icon: <FaBuilding />,
    label: "Quản lý đại lý",
    path: "/evm/admin/dealerView"
  },
  {
    icon: <Home size={20} color="#ffffff" />, // size và màu tùy chỉnh
    label: "Quản lý tài khoản hãng",
    path: "/evm/admin/accountManufacturer"
  },

  // {
  //   icon: <FaChartLine />,
  //   label: "Quản lý báo cáo",
  //   path: "/evm/admin/reports"
  // },
  // { icon: <Gift />, label: "Điều khoản giá cả", path: "/evm/admin/pricing" },
  // {
  //   icon: <Package />,
  //   label: "Quản lý tiêu thụ",
  //   path: "/evm/admin/consumption"
  // },
  // {
  //   icon: <Factory />,
  //   label: "Quản lý hãng xe",
  //   path: "/evm/admin/manufacturer"
  // },
  {
    icon: <Boxes />,
    label: "Quản lý tồn kho",
    path: "/evm/admin/inventories"
  },
  // {
  //   icon: <HiUserGroup />,
  //   label: "Quản lý khách hàng",
  //   path: "/evm/admin/customer"
  // },
  {
    icon: <HiIdentification />,
    label: "Quản lý nhân viên",
    path: "/evm/admin/staff"
  }
];

export default function StaffLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  // const [userInfo, setUserInfo] = useState<Account | null>(null);
  const [profile, setProfile] = useState<ProfileProps | null>(null);
  // const searchParams = new URLSearchParams(
  //   typeof window !== "undefined" ? window.location.search : ""
  // );
  // const loginSuccess = searchParams.get("login_success");

  const [openSnackbar, setOpenSnackbar] = useState(false);

  React.useEffect(() => {
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
        console.log("Profile fetched:", res);
        setProfile(res ? (res as ProfileProps) : null);
      } catch (err) {
        console.error(err);
        setProfile(null);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <LoadingProfile />;
  if (!profile.id)
    return <EmptyProfile onRetry={() => window.location.reload()} />;
  return (
    <div className="flex bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`bg-gradient-to-b from-emerald-600 via-emerald-700 to-emerald-800 text-white flex flex-col fixed top-0 left-0 h-full transition-all duration-300 z-50 shadow-2xl
          ${isSidebarOpen ? "w-72" : "w-20"}
        `}
      >
        {/* Header with Logo */}
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
                <h1 className="font-bold text-xl tracking-wide">VinFast</h1>
                {/* <p className="text-xs text-emerald-100">
                  {String(profile.role) === "ADMIN"
                    ? `Đại lý ${profile.dealerName}`
                    : "Quản trị viên"}
                </p> */}
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
              const isActive = pathname === item.path;
              return (
                <li
                  key={item.label}
                  onClick={() => router.push(item.path)}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className={`group flex items-center cursor-pointer rounded-xl transition-all duration-200 relative overflow-hidden
                    ${
                      isActive
                        ? "bg-white text-emerald-700 shadow-lg scale-105"
                        : "hover:bg-emerald-500/20 hover:scale-105 hover:shadow-md"
                    }
                    ${
                      isSidebarOpen
                        ? "gap-4 px-4 py-3.5"
                        : "justify-center py-3.5"
                    }
                  `}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-600 rounded-r-full" />
                  )}

                  {/* Icon */}
                  <span
                    className={`text-xl transition-transform duration-200 ${
                      !isActive && "group-hover:scale-110"
                    } ${isActive && "text-emerald-600"}`}
                  >
                    {item.icon}
                  </span>

                  {/* Label */}
                  {isSidebarOpen && (
                    <span
                      className={`text-sm font-medium transition-all ${
                        isActive ? "font-semibold" : ""
                      }`}
                    >
                      {item.label}
                    </span>
                  )}

                  {/* Hover effect background */}
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
          isSidebarOpen ? "ml-72" : "ml-20"
        }`}
      >
        {/* Header with Glassmorphism */}
        <header
          className={`h-20 bg-white/80 backdrop-blur-md flex items-center justify-between px-8 shadow-lg fixed top-0 z-40 transition-all duration-300 border-b border-slate-200/50`}
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
                  MANAGER EVM
                </p>
                <p className="text-xs text-slate-500">managerevm@vinfast.vn</p>
              </div>
              <FiChevronDown
                className={`text-slate-600 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border border-slate-200 animate-fadeIn">
                <div className="p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 border-b border-emerald-200">
                  <p className="text-sm font-semibold text-slate-800">
                    Admin Account
                  </p>
                  <p className="text-xs text-slate-600">admin@vinfast.vn</p>
                </div>

                <button
                  onClick={() => {
                    router.push("/evm/admin/profile");
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-slate-700 hover:bg-emerald-50 transition-all flex items-center gap-3 group"
                >
                  <FaUser className="text-emerald-600 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Quản lý tài khoản</span>
                </button>
                {/* 
                <button
                  onClick={() => {
                    router.push("/evm/admin/settings");
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-slate-700 hover:bg-emerald-50 transition-all flex items-center gap-3 group"
                >
                  <FaCog className="text-emerald-600 group-hover:scale-110 group-hover:rotate-90 transition-all" />
                  <span className="font-medium">Cài đặt</span>
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
              </div>
            )}
          </div>
        </header>

        {/* Main Content Area */}
        <main className="overflow-y-auto">
          <div className="">{children}</div>
        </main>
      </div>

      {/* Custom Styles */}
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
