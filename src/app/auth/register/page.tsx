"use client";
import { Enum, registerUser } from "@/services/auth/register/registerServices";
import { useRouter } from "next/navigation";
import React from "react";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Zap,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  X,
  Shield,
  Check
} from "lucide-react";

interface NotificationsProps {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
}

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

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showPass, setShowPass] = React.useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = React.useState<boolean>(false);
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const [acceptTerms, setAcceptTerms] = React.useState<boolean>(false);
  const [roleType, setRoleType] = React.useState<Enum>("EVM_STAFF");
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

  const getPasswordStrength = (pass: string) => {
    if (!pass) return { strength: 0, label: "", color: "" };
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^a-zA-Z0-9]/.test(pass)) strength++;

    const levels = [
      { strength: 0, label: "", color: "" },
      { strength: 1, label: "Yếu", color: "bg-red-500" },
      { strength: 2, label: "Trung bình", color: "bg-yellow-500" },
      { strength: 3, label: "Khá", color: "bg-blue-500" },
      { strength: 4, label: "Mạnh", color: "bg-emerald-500" }
    ];

    return levels[strength];
  };

  const passwordStrength = getPasswordStrength(password);

  const handleSubmit = async () => {
    // Validation
    if (!username || !email || !phoneNumber || !password || !confirmPassword) {
      setNotification({
        open: true,
        message: "Vui lòng điền đầy đủ thông tin",
        severity: "error"
      });
      return;
    }

    if (password !== confirmPassword) {
      setNotification({
        open: true,
        message: "Mật khẩu xác nhận không khớp",
        severity: "error"
      });
      return;
    }

    if (password.length < 6) {
      setNotification({
        open: true,
        message: "Mật khẩu phải có ít nhất 6 ký tự",
        severity: "error"
      });
      return;
    }

    if (!acceptTerms) {
      setNotification({
        open: true,
        message: "Vui lòng đồng ý với điều khoản sử dụng",
        severity: "error"
      });
      return;
    }

    setLoading(true);
    try {
      const response = await registerUser({
        username,
        password,
        email,
        phoneNumber,
        roleType
      });

      if (response) {
        setNotification({
          open: true,
          message:
            response.message ||
            "Đăng ký thành công! Đang chuyển đến trang đăng nhập...",
          severity: "success"
        });
        setTimeout(() => {
          router.push("/auth/login");
        }, 2000);
      } else {
        setNotification({
          open: true,
          message: "Đăng ký thất bại. Vui lòng thử lại.",
          severity: "error"
        });
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : typeof error === "string"
          ? error
          : "Đăng ký thất bại. Vui lòng thử lại.";

      setNotification({
        open: true,
        message,
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 overflow-hidden relative p-4">
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
            <div className="flex items-center gap-3">
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
                Bắt đầu hành trình xanh
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Tạo tài khoản để trải nghiệm các mẫu xe điện tiên tiến, tham gia
                chương trình ưu đãi và cùng kiến tạo tương lai bền vững.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-3">
              {[
                "Truy cập miễn phí vào hệ thống quản lý",
                "Nhận thông tin ưu đãi độc quyền",
                "Hỗ trợ tư vấn 24/7",
                "Bảo mật thông tin tuyệt đối"
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 bg-emerald-100 rounded-full">
                    <Check size={14} className="text-emerald-600" />
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Decorative Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 rounded-3xl blur opacity-30" />
              <div className="relative h-64 bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
                <Shield size={120} className="text-white/40 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Right: Register Form */}
          <div className="w-full">
            <div className="relative">
              {/* Card Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl blur-xl opacity-20" />

              {/* Main Card */}
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 md:p-10">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl mb-4 shadow-lg">
                    <User size={28} className="text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    Đăng ký tài khoản
                  </h3>
                  <p className="text-gray-600">
                    Điền thông tin để tạo tài khoản mới
                  </p>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  {/* Username */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tên đăng nhập
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <User size={20} />
                      </div>
                      <input
                        type="text"
                        placeholder="Nhập tên đăng nhập"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={loading}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <Mail size={20} />
                      </div>
                      <input
                        type="email"
                        placeholder="example@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={loading}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Số điện thoại
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <Phone size={20} />
                      </div>
                      <input
                        type="tel"
                        placeholder="0123456789"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={loading}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all disabled:opacity-50"
                      />
                    </div>
                  </div>
                  <select
                    name="roleType"
                    value={roleType}
                    onChange={(e) =>
                      setRoleType(
                        e.target.value as
                          | "EVM_STAFF"
                          | "DEALER_STAFF"
                          | "ADMIN"
                          | "DEALER_MANAGER"
                      )
                    }
                    className="w-full px-5 py-4 pl-12 pr-10 rounded-2xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none font-medium text-base shadow-sm appearance-none bg-white cursor-pointer"
                    required
                  >
                    <option value="" disabled>
                      Chọn vai trò
                    </option>
                    <option value="EVM_STAFF">Nhân viên EVM</option>
                    <option value="DEALER_MANAGER">Quản lý đại lý</option>
                    <option value="DEALER_STAFF">Nhân viên đại lý</option>
                    <option value="ADMIN">Quản trị viên</option>
                  </select>
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
                        className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all disabled:opacity-50"
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
                    {/* Password Strength */}
                    {password && (
                      <div className="mt-2">
                        <div className="flex gap-1 mb-1">
                          {[1, 2, 3, 4].map((level) => (
                            <div
                              key={level}
                              className={`h-1 flex-1 rounded-full transition-all ${
                                level <= passwordStrength.strength
                                  ? passwordStrength.color
                                  : "bg-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                        {passwordStrength.label && (
                          <p className="text-xs text-gray-600">
                            Độ mạnh:{" "}
                            <span className="font-semibold">
                              {passwordStrength.label}
                            </span>
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Xác nhận mật khẩu
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <Lock size={20} />
                      </div>
                      <input
                        type={showConfirmPass ? "text" : "password"}
                        placeholder="Nhập lại mật khẩu"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={loading}
                        className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all disabled:opacity-50"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPass(!showConfirmPass)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        disabled={loading}
                      >
                        {showConfirmPass ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                    {confirmPassword && password !== confirmPassword && (
                      <p className="mt-1 text-xs text-red-500">
                        Mật khẩu không khớp
                      </p>
                    )}
                  </div>

                  {/* Terms & Conditions */}
                  <div className="flex items-start gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      disabled={loading}
                      className="w-4 h-4 mt-0.5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer disabled:cursor-not-allowed"
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm text-gray-600 cursor-pointer"
                    >
                      Tôi đồng ý với{" "}
                      <button className="text-emerald-600 font-semibold hover:text-emerald-700">
                        Điều khoản sử dụng
                      </button>{" "}
                      và{" "}
                      <button className="text-emerald-600 font-semibold hover:text-emerald-700">
                        Chính sách bảo mật
                      </button>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="group w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-6"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Đang xử lý...</span>
                      </>
                    ) : (
                      <>
                        <span>Tạo tài khoản</span>
                        <ArrowRight
                          size={20}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </>
                    )}
                  </button>
                </div>

                {/* Login Link */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Đã có tài khoản?{" "}
                    <button
                      onClick={() => router.push("/auth/login")}
                      disabled={loading}
                      className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Đăng nhập ngay
                    </button>
                  </p>
                </div>
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
