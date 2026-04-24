import {
  Battery,
  Camera,
  Car,
  DollarSign,
  FileText,
  Palette
} from "lucide-react";

export const vinFastModels = [
  { value: "VF 5", label: "VF 5 - Compact SUV" },
  { value: "VF 6", label: "VF 6 - Mid-size SUV" },
  { value: "VF 7", label: "VF 7 - Mid-size SUV" },
  { value: "VF 8", label: "VF 8 - Premium SUV" },
  { value: "VF 9", label: "VF 9 - Full-size SUV" },
  { value: "VF Wild", label: "VF Wild - Pickup Truck" }
];
export const variants = [
  { value: "Base", label: "Base" },
  { value: "Eco", label: "Eco" },
  { value: "Plus", label: "Plus" },
  { value: "Premium", label: "Premium" }
];
export const chargingPorts = [
  { value: "CCS2", label: "CCS2 (DC Fast Charging)" },
  { value: "Type 2", label: "Type 2 (AC Charging)" },
  { value: "CHAdeMO", label: "CHAdeMO" }
];

export const vinFastColors = [
  "Trắng Ngọc Trai",
  "Đen Huyền Bí",
  "Xanh Đại Dương",
  "Đỏ Passion",
  "Xám Titan",
  "Xanh Emerald",
  "Nâu Chocolate",
  "Bạc Moonstone"
];

export const interiorColors = [
  "Đen Premium",
  "Kem Ivory",
  "Nâu Cognac",
  "Xám Charcoal"
];

export const wheelSizes = [
  "18 inch",
  "19 inch",
  "20 inch",
  "21 inch",
  "22 inch"
];

export const bodyTypes = [
  { value: "suv", label: "SUV" },
  { value: "crossover", label: "Crossover" },
  { value: "pickup", label: "Pickup Truck" }
];

export const conditions = [
  { value: "new", label: "Mới" },
  { value: "used-excellent", label: "Cũ - Xuất Sắc" },
  { value: "used-good", label: "Cũ - Tốt" },
  { value: "used-fair", label: "Cũ - Khá" },
  { value: "used-poor", label: "Cũ - Yếu" }
];

export const availableFeatures = [
  "VinFast Connect - Kết nối thông minh",
  "Màn hình cảm ứng 15.6 inch",
  "Hệ thống âm thanh Harman Kardon",
  "Ghế da Nappa cao cấp",
  "Ghế lái chỉnh điện 12 hướng",
  "Ghế phụ chỉnh điện 8 hướng",
  "Hệ thống sưởi/làm mát ghế",
  "Cửa sổ trời Panoramic",
  "Đèn LED Matrix thông minh",
  "Hệ thống ADAS cấp độ 2",
  "Camera 360 độ",
  "Cảm biến đỗ xe trước/sau",
  "Sạc không dây điện thoại",
  "Cổng sạc USB-C",
  "Điều hòa tự động 3 vùng",
  "Khởi động bằng nút bấm",
  "Chìa khóa thông minh",
  "Hệ thống phanh tái sinh",
  "Chế độ lái thể thao/eco/normal",
  "Hệ thống định vị GPS",
  "Cảnh báo va chạm",
  "Cảnh báo điểm mù",
  "Kiểm soát hành trình thích ứng",
  "Hỗ trợ giữ làn đường"
];

export const sections = [
  { id: "basic", label: "Thông Tin Cơ Bản", icon: Car },
  { id: "technical", label: "Thông Số Điện", icon: Battery },
  { id: "appearance", label: "Ngoại Hình", icon: Palette },
  { id: "financial", label: "Thông Tin Tài Chính", icon: DollarSign },
  { id: "features", label: "Tính Năng & Mô Tả", icon: FileText },
  { id: "documents", label: "Tài Liệu & Hình Ảnh", icon: Camera }
];
