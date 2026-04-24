import React from "react";
import { AlertCircle, Mail, Send, X } from "lucide-react";

// Email Modal Component
interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (email: string) => void;
  defaultEmail: string;
  isSending: boolean;
}

export const EmailModal: React.FC<EmailModalProps> = ({
  isOpen,
  onClose,
  onSend,
  defaultEmail,
  isSending
}) => {
  const [email, setEmail] = React.useState(defaultEmail);
  const [emailError, setEmailError] = React.useState("");

  React.useEffect(() => {
    setEmail(defaultEmail);
  }, [defaultEmail]);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSend = () => {
    if (!email.trim()) {
      setEmailError("Vui lòng nhập email");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Email không hợp lệ");
      return;
    }
    setEmailError("");
    onSend(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md animate-in zoom-in-95 duration-300">
        {/* Gradient Border Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl blur opacity-75" />

        {/* Modal Content */}
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">Gửi Báo Giá</h3>
                  <p className="text-white/80 text-sm font-medium">
                    Gửi báo giá qua email cho khách hàng
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                disabled={isSending}
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            {/* Email Input */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                <Mail className="w-4 h-4 text-teal-600" />
                Email khách hàng
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="example@email.com"
                  disabled={isSending}
                  className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium ${
                    emailError
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-200 focus:border-teal-400"
                  } ${isSending ? "opacity-50 cursor-not-allowed" : ""}`}
                />
                {emailError && (
                  <p className="mt-2 text-sm text-red-600 font-medium flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {emailError}
                  </p>
                )}
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-200">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <AlertCircle className="w-5 h-5 text-teal-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-gray-800 mb-1">
                    Lưu ý
                  </h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li className="flex items-start gap-1.5">
                      <span className="text-teal-600 font-bold">•</span>
                      <span>Email sẽ được gửi ngay lập tức đến khách hàng</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-teal-600 font-bold">•</span>
                      <span>
                        Báo giá sẽ bao gồm đầy đủ thông tin sản phẩm và giá
                      </span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-teal-600 font-bold">•</span>
                      <span>
                        Trạng thái báo giá sẽ tự động chuyển sang Đã gửi
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 pt-0 flex items-center gap-3">
            <button
              onClick={onClose}
              disabled={isSending}
              className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Hủy
            </button>
            <button
              onClick={handleSend}
              disabled={isSending}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Đang gửi...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Gửi Email</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
