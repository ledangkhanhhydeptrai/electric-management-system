import React, { useEffect, useState } from "react";
import {
  TrophyOutlined,
  RocketOutlined,
  ThunderboltOutlined,
  FrownOutlined,
  FireOutlined
} from "@ant-design/icons";

interface Props {
  total: number;
  target?: number;
  label?: string;
  showDetails?: boolean;
}

const SalesChart: React.FC<Props> = ({ 
  total, 
  target = 2000000,
  label = "Tiến độ doanh số",
  showDetails = true 
}) => {
  const [animatedPercent, setAnimatedPercent] = useState(0);
  const actualPercent = Math.min((total / target) * 100, 100);

  // Animate progress bar on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercent(actualPercent);
    }, 100);
    return () => clearTimeout(timer);
  }, [actualPercent]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getPerformanceLevel = () => {
    if (actualPercent >= 100) return {
      label: "Vượt mục tiêu",
      color: "from-yellow-400 to-orange-500",
      bgColor: "from-yellow-50 to-orange-50",
      textColor: "text-yellow-700",
      icon: <TrophyOutlined className="text-xl" />,
      emoji: "🏆"
    };
    if (actualPercent >= 90) return {
      label: "Xuất sắc",
      color: "from-green-400 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
      textColor: "text-green-700",
      icon: <FireOutlined className="text-xl" />,
      emoji: "🔥"
    };
    if (actualPercent >= 75) return {
      label: "Tốt",
      color: "from-blue-400 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
      textColor: "text-blue-700",
      icon: <RocketOutlined className="text-xl" />,
      emoji: "🚀"
    };
    if (actualPercent >= 50) return {
      label: "Trung bình",
      color: "from-yellow-400 to-amber-500",
      bgColor: "from-yellow-50 to-amber-50",
      textColor: "text-yellow-700",
      icon: <ThunderboltOutlined className="text-xl" />,
      emoji: "⚡"
    };
    return {
      label: "Cần cải thiện",
      color: "from-orange-400 to-red-500",
      bgColor: "from-orange-50 to-red-50",
      textColor: "text-red-700",
      icon: <FrownOutlined className="text-xl" />,
      emoji: "📈"
    };
  };

  const performance = getPerformanceLevel();

  return (
    <div className="space-y-3">
      {/* Header */}
      {showDetails && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-700">{label}</span>
            <span className="text-lg">{performance.emoji}</span>
          </div>
          <div className={`px-3 py-1 rounded-full font-bold text-xs bg-gradient-to-r ${performance.bgColor} ${performance.textColor} border border-current/20`}>
            {performance.label}
          </div>
        </div>
      )}

      {/* Progress Bar Container */}
      <div className="relative">
        {/* Background Track */}
        <div className="w-full h-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full overflow-hidden shadow-inner">
          {/* Progress Fill */}
          <div
            className={`h-full bg-gradient-to-r ${performance.color} rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
            style={{ width: `${animatedPercent}%` }}
          >
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine"></div>
          </div>
        </div>

        {/* Percentage Badge */}
        <div 
          className="absolute -top-8 transition-all duration-1000 ease-out"
          style={{ left: `${Math.max(0, Math.min(animatedPercent - 5, 95))}%` }}
        >
          <div className={`relative px-3 py-1 bg-gradient-to-r ${performance.color} rounded-lg shadow-lg`}>
            <div className="text-white font-bold text-sm whitespace-nowrap">
              {Math.round(actualPercent)}%
            </div>
            {/* Arrow pointing down */}
            <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gradient-to-br ${performance.color} rotate-45`}></div>
          </div>
        </div>
      </div>

      {/* Details */}
      {showDetails && (
        <div className="space-y-2">
          {/* Values */}
          <div className="flex items-center justify-between text-sm">
            <div>
              <span className="text-gray-600">Hiện tại: </span>
              <span className="font-bold text-gray-900">{formatCurrency(total)}</span>
            </div>
            <div>
              <span className="text-gray-600">Mục tiêu: </span>
              <span className="font-bold text-gray-900">{formatCurrency(target)}</span>
            </div>
          </div>

          {/* Remaining */}
          {actualPercent < 100 && (
            <div className={`flex items-center gap-2 p-3 rounded-xl bg-gradient-to-r ${performance.bgColor} border ${performance.textColor} border-current/20`}>
              {performance.icon}
              <div className="flex-1">
                <p className="text-xs font-medium">Còn lại để đạt mục tiêu:</p>
                <p className={`text-sm font-bold ${performance.textColor}`}>
                  {formatCurrency(target - total)}
                </p>
              </div>
              <div className={`text-2xl font-black ${performance.textColor}`}>
                {Math.round(100 - actualPercent)}%
              </div>
            </div>
          )}

          {/* Achievement Badge */}
          {actualPercent >= 100 && (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300">
              <div className="p-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full">
                <TrophyOutlined className="text-white text-xl" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-yellow-900">Đã hoàn thành mục tiêu!</p>
                <p className="text-xs text-yellow-700">
                  Vượt {formatCurrency(total - target)} ({Math.round(actualPercent - 100)}%)
                </p>
              </div>
              <div className="text-3xl">🎉</div>
            </div>
          )}
        </div>
      )}

      {/* Milestones */}
      {showDetails && (
        <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
          <div className="flex flex-col items-center">
            <div className={`w-2 h-2 rounded-full mb-1 ${actualPercent >= 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span>0%</span>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-2 h-2 rounded-full mb-1 ${actualPercent >= 25 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span>25%</span>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-2 h-2 rounded-full mb-1 ${actualPercent >= 50 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span>50%</span>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-2 h-2 rounded-full mb-1 ${actualPercent >= 75 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span>75%</span>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-2 h-2 rounded-full mb-1 ${actualPercent >= 100 ? 'bg-yellow-500' : 'bg-gray-300'}`}></div>
            <span>100%</span>
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }

        .animate-shine {
          animation: shine 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default SalesChart;