import React from "react";
import { Circle } from "lucide-react";

interface StatusSummaryCardProps {
  currentStatus: {
    label: string;
    color: string;
    gradient: string;
    emoji: string;
  };
}

export const StatusSummaryCard: React.FC<StatusSummaryCardProps> = ({
  currentStatus
}) => {
  return (
    <div
      className={`bg-gradient-to-br ${currentStatus.gradient} rounded-2xl p-8 shadow-xl border border-white border-opacity-20`}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-white bg-opacity-20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white border-opacity-30">
          <span className="text-4xl">{currentStatus.emoji}</span>
        </div>
        <div>
          <p className="text-white text-opacity-80 text-sm font-bold uppercase tracking-wider mb-1">
            Trạng thái hiện tại
          </p>
          <p className="text-white text-2xl font-black">
            {currentStatus.label}
          </p>
        </div>
      </div>
      <div className="bg-black bg-opacity-10 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-20">
        <div className="flex items-center gap-2">
          <Circle className="w-3 h-3 fill-current text-white animate-pulse" />
          <p className="text-white text-sm font-medium">
            Được cập nhật liên tục
          </p>
        </div>
      </div>
    </div>
  );
};