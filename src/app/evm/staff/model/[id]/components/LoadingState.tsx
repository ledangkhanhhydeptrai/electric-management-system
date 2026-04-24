import { Zap } from "lucide-react";

export default function LoadingState() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-ping opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
          <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
            <Zap className="w-12 h-12 text-blue-600 animate-pulse" />
          </div>
        </div>
        <p className="text-lg font-semibold text-gray-700 mb-2">Đang tải thông tin...</p>
        <p className="text-sm text-gray-500">Vui lòng chờ trong giây lát</p>
      </div>
    </div>
  );
}