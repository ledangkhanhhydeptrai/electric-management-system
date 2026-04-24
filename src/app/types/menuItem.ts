import {
  Car,
  Users,
  Settings,
  BarChart3,
  Package,
  FileText,
  Bell,
  Gift,
  FileSignature,
  DollarSign,
  Receipt, // 👈 thêm dòng này
  Activity,
  Route
} from "lucide-react";

export const menuItems = [
  {
    id: "dashboard",
    label: "Tổng quan",
    icon: BarChart3,
    href: "/dealers/dashboard"
  },
  { id: "vehicles", label: "Quản lý xe", icon: Car, href: "/dealers/vehicles" },
  {
    id: "customers",
    label: "Khách hàng",
    icon: Users,
    href: "/dealers/customers"
  },
  { id: "orders", label: "Đơn hàng", icon: FileText, href: "/dealers/orders" },
  {
    id: "contracts",
    label: "Hợp đồng",
    icon: FileSignature,
    href: "/dealers/contracts"
  },
  {
    id: "payments",
    label: "Thanh toán",
    icon: DollarSign,
    href: "/dealers/payments"
  },
  {
    id: "promotions",
    label: "Khuyến mãi",
    icon: Gift,
    href: "/dealers/promotions"
  },
  { id: "feedback", label: "Phản hồi", icon: Bell, href: "/dealers/feedback" },
  {
    id: "inventory",
    label: "Kho hàng",
    icon: Package,
    href: "/dealers/inventory"
  },
  {
    id: "reports",
    label: "Báo cáo",
    icon: BarChart3,
    href: "/dealers/reports"
  },
  {
    id: "settings",
    label: "Cài đặt",
    icon: Settings,
    href: "/dealers/settings"
  },
  {
    id: "formprice",
    label: "Báo giá",
    icon: Receipt, // ✅ dùng component icon chứ không dùng string
    href: "/dealers/quotation"
  },
  {
    id: "formregister",
    label: "Đặt xe",
    icon: Car, // ✅ biểu tượng xe trực quan nhất
    href: "/dealers/formregister"
  },
  {
    id: "delivery",
    label: "Giao xe",
    icon: Activity, // ✅ biểu tượng xe trực quan nhất
    href: "/dealers/VehicleDeliveryTracker"
  },
  {
    id: "TestDriveManager",
    label: "Lái thử",
    icon: Route, // ✅ biểu tượng xe trực quan nhất
    href: "/dealers/TestDriveManager"
  }
];
