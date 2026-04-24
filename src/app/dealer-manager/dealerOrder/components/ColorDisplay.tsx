import React from "react";

interface ColorDisplayProps {
  color: string;
}

const ColorDisplay: React.FC<ColorDisplayProps> = ({ color }) => {
  const colorMap: Record<string, { label: string; bg: string }> = {
    BLUE: { label: "Xanh dương", bg: "bg-blue-500" },
    RED: { label: "Đỏ", bg: "bg-red-500" },
    BLACK: { label: "Đen", bg: "bg-gray-900" },
    WHITE: { label: "Trắng", bg: "bg-gray-100 border border-gray-300" },
    SILVER: { label: "Bạc", bg: "bg-gray-400" }
  };

  const colorInfo = colorMap[color] || { label: color, bg: "bg-gray-500" };

  return (
    <div className="flex items-center gap-2">
      <div className={`w-6 h-6 rounded-full ${colorInfo.bg} shadow-md`}></div>
      <span className="text-sm text-gray-700">{colorInfo.label}</span>
    </div>
  );
};

export default ColorDisplay;
