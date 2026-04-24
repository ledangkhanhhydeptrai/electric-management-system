import { AlertCircle, ArrowLeft } from "lucide-react";

export default function ErrorState({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-red-100 to-pink-100 rounded-full blur-3xl opacity-50"></div>
        
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-12 h-12 text-red-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Không tìm thấy
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Model xe này không tồn tại hoặc đã bị xóa khỏi hệ thống.
          </p>
          <button
            onClick={onBack}
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl font-semibold transition-all overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 w-full"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative flex items-center justify-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              Quay lại danh sách
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}