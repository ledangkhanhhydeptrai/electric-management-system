export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND"
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString("vi-VN", { hour12: false });
};

export const getStatusConfig = (status: string) => {
  const statusConfig = {
    PENDING: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      label: "Chờ xử lý"
    },
    CONFIRMED: {
      bg: "bg-blue-100",
      text: "text-blue-800",
      label: "Đã xác nhận"
    },
    PROCESSING: {
      bg: "bg-purple-100",
      text: "text-purple-800",
      label: "Đang xử lý"
    },
    DELIVERED: { bg: "bg-green-100", text: "text-green-800", label: "Đã giao" },
    CANCELLED: { bg: "bg-red-100", text: "text-red-800", label: "Đã hủy" }
  };
  return statusConfig[status as keyof typeof statusConfig];
};
