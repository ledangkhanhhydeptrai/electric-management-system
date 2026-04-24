import { CheckCircle2, Clock, Star } from "lucide-react";

export type Account = {
  id: number;
  name: string;
  dealer: string;
  role: string;
  status: string;
  email: string;
  phone: string;
  joinDate: string;
  department: string;
  ordersProcessed: number;
  rating: number;
  permissions: string[];
  recentActivities: { action: string; time: string }[];
};
export const accounts = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      dealer: "Đại lý Hà Nội",
      role: "Quản lý",
      status: "Hoạt động",
      email: "nguyenvana@dealer.com",
      phone: "0912-345-678",
      joinDate: "01/01/2022",
      department: "Kinh doanh",
      ordersProcessed: 234,
      rating: 4.7,
      permissions: [
        "Quản lý đơn hàng",
        "Xem báo cáo",
        "Quản lý kho",
        "Duyệt thanh toán"
      ],
      recentActivities: [
        { action: "Duyệt đơn hàng #1234", time: "2 giờ trước" },
        { action: "Cập nhật giá sản phẩm", time: "5 giờ trước" },
        { action: "Xuất báo cáo tháng", time: "1 ngày trước" }
      ]
    },
    {
      id: 2,
      name: "Trần Thị B",
      dealer: "Đại lý TP.HCM",
      role: "Nhân viên",
      status: "Hoạt động",
      email: "tranthib@dealer.com",
      phone: "0987-654-321",
      joinDate: "15/06/2023",
      department: "Bán hàng",
      ordersProcessed: 156,
      rating: 4.5,
      permissions: ["Tạo đơn hàng", "Xem kho", "Liên hệ khách hàng"],
      recentActivities: [
        { action: "Tạo đơn hàng mới", time: "1 giờ trước" },
        { action: "Tư vấn khách hàng", time: "3 giờ trước" }
      ]
    },
    {
      id: 3,
      name: "Lê Văn C",
      dealer: "Đại lý Đà Nẵng",
      role: "Kế toán",
      status: "Tạm ngưng",
      email: "levanc@dealer.com",
      phone: "0909-123-456",
      joinDate: "20/03/2021",
      department: "Tài chính",
      ordersProcessed: 89,
      rating: 4.3,
      permissions: ["Quản lý công nợ", "Xuất hóa đơn", "Xem báo cáo tài chính"],
      recentActivities: [
        { action: "Xuất hóa đơn #5678", time: "1 ngày trước" },
        { action: "Đối chiếu công nợ", time: "2 ngày trước" }
      ]
    }
  ];

type AccountDetailModalProps = {
  account: Account;
  onClose: () => void;
};

export const AccountDetailModal = ({ account }: AccountDetailModalProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl">
        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
          {account.name.charAt(0)}
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-slate-800">{account.name}</h3>
          <p className="text-slate-600">{account.email}</p>
          <div className="flex gap-2 mt-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
              {account.role}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                account.status === "Hoạt động"
                  ? "bg-green-100 text-green-700"
                  : "bg-orange-100 text-orange-700"
              }`}
            >
              {account.status}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-xl">
            <h3 className="font-bold text-slate-800 mb-3">Thông tin cá nhân</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Mã nhân viên:</span>
                <span className="font-semibold">NV-{account.id}001</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Số điện thoại:</span>
                <span className="font-semibold">{account.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Ngày vào làm:</span>
                <span className="font-semibold">{account.joinDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Phòng ban:</span>
                <span className="font-semibold">{account.department}</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-green-50 rounded-xl">
            <h3 className="font-bold text-slate-800 mb-3">Quyền hạn</h3>
            <div className="space-y-2">
              {account.permissions.map((perm, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-sm">{perm}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-purple-50 rounded-xl">
            <h3 className="font-bold text-slate-800 mb-3">
              Hiệu suất công việc
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-slate-600 mb-1">Đơn xử lý</p>
                <p className="text-2xl font-bold text-purple-600">
                  {account.ordersProcessed}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-600 mb-1">Đánh giá</p>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="text-xl font-bold">{account.rating}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-orange-50 rounded-xl">
            <h3 className="font-bold text-slate-800 mb-3">Hoạt động gần đây</h3>
            <div className="space-y-2">
              {account.recentActivities.map((activity, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm">
                  <Clock className="w-4 h-4 text-slate-500 mt-0.5" />
                  <div>
                    <p className="text-slate-800">{activity.action}</p>
                    <p className="text-xs text-slate-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors">
          Chỉnh sửa thông tin
        </button>
        <button className="px-6 py-3 border-2 border-red-300 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition-colors">
          Vô hiệu hóa
        </button>
      </div>
    </div>
  );
};