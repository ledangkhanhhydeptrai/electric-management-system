// Constants cho trạng thái xe
export const statusMap: Record<
  string,
  { label: string; color: string; gradient: string; emoji: string }
> = {
  IN_FACTORY: {
    label: "Đang sản xuất",
    color: "bg-blue-500",
    gradient: "from-blue-500 to-blue-700",
    emoji: "🏭"
  },
  IN_TRANSIT: {
    label: "Đang vận chuyển",
    color: "bg-purple-500",
    gradient: "from-purple-500 to-purple-700",
    emoji: "🚚"
  },
  IN_STOCK: {
    label: "Trong kho",
    color: "bg-amber-500",
    gradient: "from-amber-500 to-amber-700",
    emoji: "📦"
  },
  ALLOCATED: {
    label: "Đã phân bổ",
    color: "bg-cyan-600",
    gradient: "from-cyan-500 to-cyan-700",
    emoji: "📋"
  },
  SOLD: {
    label: "Đã bán",
    color: "bg-gray-500",
    gradient: "from-gray-500 to-gray-700",
    emoji: "✅"
  }
};

// Utility function format số
export const formatNumber = (num: number) => {
  return new Intl.NumberFormat("vi-VN").format(num);
};
