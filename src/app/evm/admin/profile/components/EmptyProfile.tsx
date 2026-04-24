import { AlertCircle, Database, RefreshCw, Shield, User } from "lucide-react";

export function EmptyProfile({ onRetry }: { onRetry: () => void }) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6 relative overflow-hidden flex items-center justify-center">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_60%,rgba(20,184,166,0.15),transparent_50%)]"></div>
      </div>

      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-emerald-300/20 via-teal-300/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
      <div
        className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-cyan-300/20 via-blue-300/20 to-transparent rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="max-w-2xl mx-auto text-center">
        {/* Empty State Card */}
        <div className="bg-white/60 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/80 p-12 space-y-8">
          {/* Icon */}
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <div className="relative w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-2xl mx-auto">
              <Database className="w-16 h-16 text-white" strokeWidth={1.5} />
            </div>
            <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-4 border-white shadow-xl">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-3">
            <h1 className="text-4xl font-black bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
              Không tìm thấy dữ liệu
            </h1>
            <p className="text-gray-600 text-lg">
              Không thể tải thông tin người dùng. Vui lòng thử lại sau.
            </p>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-200/50">
              <User className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <p className="text-xs font-semibold text-gray-600">
                Không có thông tin
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-200/50">
              <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-xs font-semibold text-gray-600">
                Phiên đã hết hạn
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-4 border border-orange-200/50">
              <AlertCircle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="text-xs font-semibold text-gray-600">Lỗi kết nối</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {onRetry && (
              <button
                onClick={onRetry}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 hover:-translate-y-1"
              >
                <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                Thử lại
              </button>
            )}
            <button
              onClick={() => (window.location.href = "/")}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-700 rounded-2xl font-bold shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-emerald-300 transition-all duration-300 hover:-translate-y-1"
            >
              Về trang chủ
            </button>
          </div>

          {/* Help Text */}
          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Nếu vấn đề vẫn tiếp diễn, vui lòng liên hệ{" "}
              <a
                href="#"
                className="text-emerald-600 font-semibold hover:text-emerald-700 underline"
              >
                hỗ trợ kỹ thuật
              </a>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span>Hệ thống hoạt động</span>
          </div>
          <div className="w-px h-4 bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-gray-400" />
            <span>Bảo mật SSL</span>
          </div>
        </div>
      </div>
    </main>
  );
}