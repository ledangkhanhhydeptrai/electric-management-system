"use client";
import { forgotPassword } from "@/services/auth/forgotPasswordService/forgotPassword";
import React from "react";
import {
  Lock,
  Eye,
  EyeOff,
  Key,
  Shield,
  CheckCircle,
  AlertCircle,
  X,
  ArrowLeft,
  ArrowRight,
  Check,
  Zap
} from "lucide-react";
import { useRouter } from "next/navigation";

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

const ForgotPassword: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showOldPass, setShowOldPass] = React.useState<boolean>(false);
  const [showNewPass, setShowNewPass] = React.useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = React.useState<boolean>(false);
  const [oldPassword, setOldPassword] = React.useState<string>("");
  const [newPassword, setNewPassword] = React.useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] =
    React.useState<string>("");

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

  const passwordStrength = getPasswordStrength(newPassword);

  const checkPasswordRequirements = (pass: string) => ({
    length: pass.length >= 8,
    mixed: /[a-z]/.test(pass) && /[A-Z]/.test(pass),
    number: /[0-9]/.test(pass),
    special: /[^a-zA-Z0-9]/.test(pass)
  });

  const requirements = checkPasswordRequirements(newPassword);

  const handleSubmit = async () => {
    // Validation
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      setNotification({
        open: true,
        message: "Vui lòng điền đầy đủ thông tin",
        severity: "error"
      });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setNotification({
        open: true,
        message: "Mật khẩu mới không khớp",
        severity: "error"
      });
      return;
    }

    if (newPassword.length < 8) {
      setNotification({
        open: true,
        message: "Mật khẩu mới phải có ít nhất 8 ký tự",
        severity: "error"
      });
      return;
    }

    if (oldPassword === newPassword) {
      setNotification({
        open: true,
        message: "Mật khẩu mới không được trùng với mật khẩu cũ",
        severity: "error"
      });
      return;
    }

    setLoading(true);
    try {
      const response = await forgotPassword(
        oldPassword,
        newPassword,
        confirmNewPassword
      );

      setNotification({
        open: true,
        message:
          response.message || "Đổi mật khẩu thành công! Đang chuyển hướng...",
        severity: "success"
      });

      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (error: unknown) {
      let errorMessage = "Đổi mật khẩu thất bại. Vui lòng thử lại.";
      if (typeof error === "object" && error !== null && "message" in error) {
        errorMessage = (error as { message?: string }).message || errorMessage;
      }
      setNotification({
        open: true,
        message: errorMessage,
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
                Bảo mật tài khoản
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Cập nhật mật khẩu mới để đảm bảo an toàn cho tài khoản của bạn.
                Mật khẩu mạnh giúp bảo vệ thông tin khỏi truy cập trái phép.
              </p>
            </div>

            {/* Security Tips */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Shield size={20} className="text-emerald-600" />
                Lời khuyên bảo mật
              </h3>
              {[
                "Sử dụng mật khẩu độc nhất cho mỗi tài khoản",
                "Kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt",
                "Không chia sẻ mật khẩu với bất kỳ ai",
                "Thay đổi mật khẩu định kỳ"
              ].map((tip, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-6 h-6 bg-emerald-100 rounded-full flex-shrink-0 mt-0.5">
                    <Check size={14} className="text-emerald-600" />
                  </div>
                  <span className="text-gray-700">{tip}</span>
                </div>
              ))}
            </div>

            {/* Decorative Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 rounded-3xl blur opacity-30" />
              <div className="relative h-64 bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
                <Key size={120} className="text-white/40 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Right: Password Change Form */}
          <div className="w-full">
            <div className="relative">
              {/* Card Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl blur-xl opacity-20" />

              {/* Main Card */}
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 md:p-10">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl mb-4 shadow-lg">
                    <Key size={28} className="text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    Đổi mật khẩu
                  </h3>
                  <p className="text-gray-600">
                    Cập nhật mật khẩu mới cho tài khoản
                  </p>
                </div>

                {/* Form Fields */}
                <div className="space-y-5">
                  {/* Old Password */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Mật khẩu hiện tại
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <Lock size={20} />
                      </div>
                      <input
                        type={showOldPass ? "text" : "password"}
                        placeholder="Nhập mật khẩu hiện tại"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={loading}
                        className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all disabled:opacity-50"
                      />
                      <button
                        type="button"
                        onClick={() => setShowOldPass(!showOldPass)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        disabled={loading}
                      >
                        {showOldPass ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Mật khẩu mới
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <Lock size={20} />
                      </div>
                      <input
                        type={showNewPass ? "text" : "password"}
                        placeholder="Nhập mật khẩu mới"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={loading}
                        className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all disabled:opacity-50"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPass(!showNewPass)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        disabled={loading}
                      >
                        {showNewPass ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {/* Password Strength */}
                    {newPassword && (
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

                  {/* Confirm New Password */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Xác nhận mật khẩu mới
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <Lock size={20} />
                      </div>
                      <input
                        type={showConfirmPass ? "text" : "password"}
                        placeholder="Nhập lại mật khẩu mới"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
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
                    {confirmNewPassword &&
                      newPassword !== confirmNewPassword && (
                        <p className="mt-1 text-xs text-red-500">
                          Mật khẩu không khớp
                        </p>
                      )}
                  </div>

                  {/* Password Requirements */}
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4">
                    <p className="text-sm font-bold text-emerald-900 mb-3 flex items-center gap-2">
                      <Shield size={16} />
                      Yêu cầu mật khẩu
                    </p>
                    <div className="space-y-2">
                      {[
                        {
                          check: requirements.length,
                          text: "Tối thiểu 8 ký tự"
                        },
                        {
                          check: requirements.mixed,
                          text: "Chữ hoa và chữ thường"
                        },
                        {
                          check: requirements.number,
                          text: "Có ít nhất một số"
                        },
                        {
                          check: requirements.special,
                          text: "Ký tự đặc biệt (!@#$%...)"
                        }
                      ].map((req, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div
                            className={`flex items-center justify-center w-4 h-4 rounded-full ${
                              req.check ? "bg-emerald-500" : "bg-gray-200"
                            }`}
                          >
                            {req.check && (
                              <Check size={10} className="text-white" />
                            )}
                          </div>
                          <span
                            className={`text-xs ${
                              req.check
                                ? "text-emerald-700 font-medium"
                                : "text-gray-600"
                            }`}
                          >
                            {req.text}
                          </span>
                        </div>
                      ))}
                    </div>
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
                        <span>Cập nhật mật khẩu</span>
                        <ArrowRight
                          size={20}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </>
                    )}
                  </button>
                </div>

                {/* Back to Login */}
                <div className="mt-6 text-center">
                  <button
                    onClick={() => router.push("/auth/login")}
                    disabled={loading}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft size={16} />
                    <span>Quay lại đăng nhập</span>
                  </button>
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
};

export default ForgotPassword;
