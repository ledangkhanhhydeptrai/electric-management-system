"use client";
import React from "react";
import FeedbackTable from "./components/FeedbackTable";
import { 
  CommentOutlined,
  SmileOutlined,
  FrownOutlined,
  StarOutlined,
  TrophyOutlined,
  RiseOutlined
} from "@ant-design/icons";

const FeedbackPage = () => {
  // Mock statistics - replace with real data
  const stats = {
    avgRating: 4.2,
    totalFeedback: 156,
    positiveFeedback: 89,
    negativeFeedback: 24,
    responseRate: 94,
    growthRate: 15
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-pink-50 to-orange-50">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-10">
          {/* Average Rating */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-yellow-300 transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-gradient-to-br from-yellow-100 to-orange-200 rounded-2xl mb-3 group-hover:scale-110 transition-transform duration-300">
                <StarOutlined className="text-yellow-600 text-3xl" />
              </div>
              <div className="text-4xl font-black text-gray-900 mb-1">{stats.avgRating}</div>
              <div className="text-sm text-gray-600 font-medium">Đánh giá TB</div>
              <div className="flex mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-lg ${
                      star <= Math.floor(stats.avgRating)
                        ? "text-yellow-400"
                        : star - 1 < stats.avgRating
                        ? "text-yellow-300"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Total Feedback */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl mb-3 group-hover:scale-110 transition-transform duration-300">
                <CommentOutlined className="text-blue-600 text-3xl" />
              </div>
              <div className="text-4xl font-black text-gray-900 mb-1">{stats.totalFeedback}</div>
              <div className="text-sm text-gray-600 font-medium">Tổng phản hồi</div>
              <div className="flex items-center gap-1 mt-2">
                <RiseOutlined className="text-green-600 text-xs" />
                <span className="text-green-600 text-xs font-semibold">+{stats.growthRate}%</span>
              </div>
            </div>
          </div>

          {/* Positive Feedback */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-green-300 transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl mb-3 group-hover:scale-110 transition-transform duration-300">
                <SmileOutlined className="text-green-600 text-3xl" />
              </div>
              <div className="text-4xl font-black text-gray-900 mb-1">{stats.positiveFeedback}</div>
              <div className="text-sm text-gray-600 font-medium">Tích cực</div>
              <div className="text-green-600 text-xs font-semibold mt-2">
                {Math.round((stats.positiveFeedback / stats.totalFeedback) * 100)}% tổng
              </div>
            </div>
          </div>

          {/* Negative Feedback */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-red-300 transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-gradient-to-br from-red-100 to-pink-200 rounded-2xl mb-3 group-hover:scale-110 transition-transform duration-300">
                <FrownOutlined className="text-red-600 text-3xl" />
              </div>
              <div className="text-4xl font-black text-gray-900 mb-1">{stats.negativeFeedback}</div>
              <div className="text-sm text-gray-600 font-medium">Khiếu nại</div>
              <div className="text-red-600 text-xs font-semibold mt-2">
                {Math.round((stats.negativeFeedback / stats.totalFeedback) * 100)}% tổng
              </div>
            </div>
          </div>

          {/* Response Rate */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-purple-300 transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-gradient-to-br from-purple-100 to-pink-200 rounded-2xl mb-3 group-hover:scale-110 transition-transform duration-300">
                <TrophyOutlined className="text-purple-600 text-3xl" />
              </div>
              <div className="text-4xl font-black text-gray-900 mb-1">{stats.responseRate}%</div>
              <div className="text-sm text-gray-600 font-medium">Tỷ lệ phản hồi</div>
              <div className="text-purple-600 text-xs font-semibold mt-2">
                Xuất sắc
              </div>
            </div>
          </div>

          {/* Satisfaction Score */}
          <div className="group bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col items-center text-center text-white h-full justify-center">
              <div className="text-5xl mb-2">😊</div>
              <div className="text-3xl font-black mb-1">
                {Math.round((stats.positiveFeedback / stats.totalFeedback) * 100)}%
              </div>
              <div className="text-sm font-medium opacity-90">Hài lòng</div>
            </div>
          </div>
        </div>

        {/* Quick Insights */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-500 rounded-xl text-white">
                <TrophyOutlined className="text-2xl" />
              </div>
              <div>
                <h3 className="font-bold text-blue-900 text-lg">Điểm mạnh</h3>
                <p className="text-blue-700 text-sm">Top feedback tích cực</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="bg-white/60 rounded-lg p-3">
                <p className="text-sm font-semibold text-blue-900">Dịch vụ tốt</p>
                <p className="text-xs text-blue-700">35 lượt đề cập</p>
              </div>
              <div className="bg-white/60 rounded-lg p-3">
                <p className="text-sm font-semibold text-blue-900">Xe chất lượng cao</p>
                <p className="text-xs text-blue-700">28 lượt đề cập</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border-2 border-red-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-red-500 rounded-xl text-white">
                <FrownOutlined className="text-2xl" />
              </div>
              <div>
                <h3 className="font-bold text-red-900 text-lg">Cần cải thiện</h3>
                <p className="text-red-700 text-sm">Vấn đề thường gặp</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="bg-white/60 rounded-lg p-3">
                <p className="text-sm font-semibold text-red-900">Giao xe chậm</p>
                <p className="text-xs text-red-700">12 khiếu nại</p>
              </div>
              <div className="bg-white/60 rounded-lg p-3">
                <p className="text-sm font-semibold text-red-900">Hướng dẫn chưa rõ</p>
                <p className="text-xs text-red-700">8 khiếu nại</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border-2 border-green-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-500 rounded-xl text-white">
                <RiseOutlined className="text-2xl" />
              </div>
              <div>
                <h3 className="font-bold text-green-900 text-lg">Xu hướng</h3>
                <p className="text-green-700 text-sm">Tháng này</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="bg-white/60 rounded-lg p-3">
                <p className="text-sm font-semibold text-green-900">+15% phản hồi</p>
                <p className="text-xs text-green-700">So với tháng trước</p>
              </div>
              <div className="bg-white/60 rounded-lg p-3">
                <p className="text-sm font-semibold text-green-900">+8% hài lòng</p>
                <p className="text-xs text-green-700">Cải thiện đáng kể</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Table */}
        <div className="animate-fadeIn">
          <FeedbackTable />
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default FeedbackPage;