"use client";

import {
  LoginResponse,
  loginUser
} from "@/services/auth/loginService/loginService";
import { useRouter } from "next/navigation";
import React from "react";
import Cookies from "js-cookie";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Zap,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  X
} from "lucide-react";
import { Role } from "@/app/types/User/Role";
import { accountService } from "@/services/accountService/account";

interface NotificationsProps {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
}

interface ApiError {
  message: string;
  status: number;
  [key: string]: unknown;
}

// Spinner component
function Spinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-t-transparent border-emerald-500 rounded-full animate-spin" />
        <div
          className="absolute inset-0 w-16 h-16 border-4 border-b-transparent border-teal-300 rounded-full animate-spin"
          style={{ animationDirection: "reverse" }}
        />
      </div>
    </div>
  );
}

export default function Login() {
  const [showPass, setShowPass] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);
  const router = useRouter();
  const [notification, setNotification] = React.useState<NotificationsProps>({
    open: false,
    message: "",
    severity: "success"
  });

  React.useEffect(() => {
    if (notification.open) {
      const timer = setTimeout(() => {
        setNotification((prev) => ({ ...prev, open: false }));
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notification.open]);

  const handleClose = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  const handleSubmit = async () => {
    if (!username || !password) {
      setNotification({
        open: true,
        message: "Vui lòng nhập đầy đủ thông tin",
        severity: "error"
      });
      return;
    }

    setLoading(true);
    try {
      // 1. Login
      const result = (await loginUser({ username, password })) as LoginResponse;

      if (!result.data?.token) {
        throw new Error("Token không tồn tại");
      }

      // 2. Lưu token vào Cookies
      Cookies.set("accessToken", result.data.token, {
        expires: rememberMe ? 7 : 1,
        secure: true,
        sameSite: "Strict",
        path: "/"
      });

      // 3. Lấy thông tin user từ API /account
      try {
        const accounts = await accountService(); // trả về mảng account
        if (Array.isArray(accounts) && accounts.length > 0) {
          // Lọc account theo username vừa login
          const account = accounts.find((acc) => acc.username === username); // 'username' là biến từ form login
          if (account) {
            const userInfo = {
              username: account.username,
              email: account.email
            };
            sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
          } else {
            console.warn("Không tìm thấy account phù hợp với user đang login");
          }
        }
      } catch (err) {
        console.error("Lấy thông tin account thất bại", err);
      }

      // 4. Xử lý role để redirect
      const apiRoles = result.data?.roles || [];
      const roles = apiRoles.filter((r: unknown): r is Role =>
        Object.values(Role).includes(r as Role)
      );

      setTimeout(() => {
        if (roles.includes(Role.Administrator))
          router.push("/evm/admin?login_success=true");
        else if (roles.includes(Role.DealerManager))
          router.push("/dealer-manager?login_success=true");
        else if (roles.includes(Role.StaffDealer))
          router.push("/dealer-staff?login_success=true");
        else if (roles.includes(Role.EVMStaff))
          router.push("/evm/staff?login_success=true");
        else router.push("/");
      }, 500); // giảm thời gian chờ cho UX tốt hơn
    } catch (error) {
      const err = error as ApiError;
      setNotification({
        open: true,
        message:
          err.message || "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.",
        severity: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 overflow-hidden relative p-3.5">
      {loading && <Spinner />}

      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-emerald-400 to-teal-400 opacity-20 blur-3xl rounded-full animate-blob" />
        <div className="absolute top-1/4 -right-32 w-80 h-80 bg-gradient-to-br from-cyan-400 to-blue-400 opacity-20 blur-3xl rounded-full animate-blob animation-delay-2000" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-gradient-to-br from-teal-400 to-emerald-400 opacity-20 blur-3xl rounded-full animate-blob animation-delay-4000" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left: Brand Section */}
          <div className="hidden md:block space-y-8">
            {/* Logo */}
            <div
              className="flex items-center gap-3"
              onClick={() => router.push("/")}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl blur opacity-60 animate-pulse" />
                <div className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl shadow-xl">
                  <Zap size={32} className="text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Electric Vehicle
                </h1>
                <p className="text-sm text-emerald-600 font-semibold">
                  Dealer Portal
                </p>
              </div>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h2 className="text-5xl font-extrabold text-gray-900 leading-tight">
                Chào mừng trở lại!
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Đăng nhập để quản lý đơn hàng, theo dõi khách hàng và khám phá
                các chương trình khuyến mãi mới nhất.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <CheckCircle size={20} />, text: "Quản lý dễ dàng" },
                { icon: <CheckCircle size={20} />, text: "Báo cáo chi tiết" },
                { icon: <CheckCircle size={20} />, text: "Hỗ trợ 24/7" },
                { icon: <CheckCircle size={20} />, text: "Bảo mật cao" }
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-emerald-600"
                >
                  {feature.icon}
                  <span className="text-gray-700 font-medium">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Decorative Image */}
            {/* <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 rounded-3xl blur opacity-30" />
              <div className="relative h-64 bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
                <Zap size={120} className="text-white/40 animate-pulse" />
              </div>
            </div> */}
          </div>

          {/* Right: Login Form */}
          <div className="w-full">
            <div className="relative">
              {/* Card Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl blur-xl opacity-20" />

              {/* Main Card */}
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 md:p-10">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl mb-4 shadow-lg">
                    <Lock size={28} className="text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    Đăng nhập
                  </h3>
                  <p className="text-gray-600">
                    Nhập thông tin tài khoản của bạn
                  </p>
                </div>

                {/* Google Login */}
                {/* <button
                  type="button"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-md mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
                    />
                    <path
                      fill="#34A853"
                      d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
                    />
                    <path
                      fill="#4A90E2"
                      d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5818182 23.1818182,9.90909091 L12,9.90909091 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
                    />
                  </svg>
                  Đăng nhập với Google
                </button> */}

                {/* Divider */}
                {/* <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500 font-medium">
                      Hoặc đăng nhập với email
                    </span>
                  </div>
                </div> */}

                {/* Form Fields */}
                <div className="space-y-5">
                  {/* Username */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tên đăng nhập
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <Mail size={20} />
                      </div>
                      <input
                        type="text"
                        autoFocus
                        placeholder="Nhập tên đăng nhập"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={loading}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Mật khẩu
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <Lock size={20} />
                      </div>
                      <input
                        type={showPass ? "text" : "password"}
                        placeholder="Nhập mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={loading}
                        className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        disabled={loading}
                      >
                        {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        disabled={loading}
                        className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer disabled:cursor-not-allowed"
                      />
                      <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                        Ghi nhớ đăng nhập
                      </span>
                    </label>
                    {/* <button
                      type="button"
                      onClick={() => router.push("/auth/forgot-password")}
                      disabled={loading}
                      className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Quên mật khẩu?
                    </button> */}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="group w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Đang xử lý...</span>
                      </>
                    ) : (
                      <>
                        <span>Đăng nhập</span>
                        <ArrowRight
                          size={20}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </>
                    )}
                  </button>
                </div>

                {/* <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Chưa có tài khoản?{" "}
                    <button
                      onClick={() => router.push("/auth/register")}
                      disabled={loading}
                      className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Đăng ký ngay
                    </button>
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Notification */}
      {notification.open && (
        <div className="fixed top-6 right-6 z-50 animate-slide-in-right">
          <div
            className={`bg-white rounded-xl shadow-2xl border-2 p-4 min-w-80 max-w-md ${
              notification.severity === "success"
                ? "border-emerald-200"
                : "border-red-200"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 ${
                  notification.severity === "success"
                    ? "bg-gradient-to-br from-emerald-500 to-teal-500"
                    : "bg-gradient-to-br from-red-500 to-rose-500"
                }`}
              >
                {notification.severity === "success" ? (
                  <CheckCircle size={20} className="text-white" />
                ) : (
                  <AlertCircle size={20} className="text-white" />
                )}
              </div>
              <div className="flex-1">
                <div
                  className={`font-bold mb-1 ${
                    notification.severity === "success"
                      ? "text-emerald-900"
                      : "text-red-900"
                  }`}
                >
                  {notification.severity === "success" ? "Thành công!" : "Lỗi!"}
                </div>
                <div className="text-sm text-gray-600">
                  {notification.message}
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -20px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(20px, 20px) scale(1.05);
          }
        }
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
