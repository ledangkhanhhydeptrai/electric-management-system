import {
  ArrowUpRight,
  BarChart3,
  Building2,
  ChevronRight,
  Edit,
  Mail,
  MapPin,
  Phone,
  Star,
  Target
} from "lucide-react";

export type Dealer = {
  id: number;
  name: string;
  region: string;
  sales: number;
  orders: number;
  performance: number;
  rating: number;
  debt: string;
  phone: string;
  email: string;
  address: string;
  joinDate: string;
  recentTransactions: {
    description: string;
    date: string;
    amount: number;
  }[];
};
export const dealers = [
    {
      id: 1,
      name: "Đại lý Hà Nội",
      region: "Miền Bắc",
      sales: 150,
      orders: 45,
      performance: 75,
      rating: 4.5,
      debt: "200M",
      phone: "024-1234-5678",
      email: "hanoi@dealer.com",
      address: "123 Đường ABC, Hà Nội",
      joinDate: "01/01/2020",
      recentTransactions: [
        {
          description: "Thanh toán đơn hàng #1234",
          date: "10/10/2024",
          amount: 50
        },
        { description: "Nhập hàng mới", date: "08/10/2024", amount: -30 },
        { description: "Thanh toán công nợ", date: "05/10/2024", amount: 20 }
      ]
    },
    {
      id: 2,
      name: "Đại lý Đà Nẵng",
      region: "Miền Trung",
      sales: 95,
      orders: 32,
      performance: 63,
      rating: 4.2,
      debt: "150M",
      phone: "0236-7890-123",
      email: "danang@dealer.com",
      address: "456 Đường XYZ, Đà Nẵng",
      joinDate: "15/03/2021",
      recentTransactions: [
        {
          description: "Thanh toán đơn hàng #5678",
          date: "12/10/2024",
          amount: 35
        },
        { description: "Nhập hàng mới", date: "09/10/2024", amount: -25 }
      ]
    },
    {
      id: 3,
      name: "Đại lý TP.HCM",
      region: "Miền Nam",
      sales: 220,
      orders: 68,
      performance: 88,
      rating: 4.8,
      debt: "100M",
      phone: "028-9876-5432",
      email: "hcm@dealer.com",
      address: "789 Đường KLM, TP.HCM",
      joinDate: "10/06/2019",
      recentTransactions: [
        {
          description: "Thanh toán đơn hàng #9012",
          date: "15/10/2024",
          amount: 75
        },
        { description: "Nhập hàng mới", date: "13/10/2024", amount: -45 },
        { description: "Thanh toán công nợ", date: "11/10/2024", amount: 30 }
      ]
    }
  ];
export const DealerCard = ({
  dealer,
  onViewDetails
}: {
  dealer: Dealer;
  onViewDetails: (dealer: Dealer) => void;
}) => {
  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 overflow-hidden transform hover:-translate-y-1">
      <div className="relative h-32 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 p-6">
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-white text-xs font-semibold">#{dealer.id}</span>
        </div>
        <Building2 className="w-12 h-12 text-white/80 mb-2" />
        <div className="absolute bottom-4 left-6">
          <h3 className="text-xl font-bold text-white">{dealer.name}</h3>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-4 h-4 text-blue-600" />
          <span className="text-sm text-slate-600 font-medium">
            {dealer.region}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-slate-600 mb-1">Doanh số</p>
            <p className="text-lg font-bold text-blue-600">{dealer.sales}</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="text-xs text-slate-600 mb-1">Đơn hàng</p>
            <p className="text-lg font-bold text-green-600">{dealer.orders}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 bg-slate-200 rounded-full h-2">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
              style={{ width: `${dealer.performance}%` }}
            />
          </div>
          <span className="text-sm font-semibold text-slate-700">
            {dealer.performance}%
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            <Phone className="w-4 h-4" />
            Liên hệ
          </button>
          <button
            onClick={() => onViewDetails(dealer)}
            className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
          >
            Chi tiết
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
export const DealerDetailModal = ({
  dealer
}: {
  dealer: Dealer;
  onClose: () => void;
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <Building2 className="w-6 h-6 text-blue-600" />
              <h3 className="font-bold text-slate-800">Thông tin cơ bản</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Tên đại lý:</span>
                <span className="font-semibold">{dealer.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Khu vực:</span>
                <span className="font-semibold">{dealer.region}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Mã số:</span>
                <span className="font-semibold">
                  DL-{dealer.id}00{dealer.id}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Ngày gia nhập:</span>
                <span className="font-semibold">{dealer.joinDate}</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <Phone className="w-6 h-6 text-green-600" />
              <h3 className="font-bold text-slate-800">Liên hệ</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-600" />
                <span>{dealer.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-600" />
                <span>{dealer.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-600" />
                <span>{dealer.address}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <BarChart3 className="w-6 h-6 text-purple-600" />
              <h3 className="font-bold text-slate-800">Hiệu suất</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-slate-600 mb-1">Doanh số tháng</p>
                <p className="text-2xl font-bold text-purple-600">
                  {dealer.sales}
                </p>
                <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>+12%</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-600 mb-1">Đơn hàng</p>
                <p className="text-2xl font-bold text-blue-600">
                  {dealer.orders}
                </p>
                <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>+8%</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-600 mb-1">Đánh giá</p>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-bold">{dealer.rating}/5</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-600 mb-1">Hiệu suất</p>
                <p className="text-xl font-bold text-green-600">
                  {dealer.performance}%
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <Target className="w-6 h-6 text-orange-600" />
              <h3 className="font-bold text-slate-800">Chỉ tiêu & Công nợ</h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Chỉ tiêu tháng</span>
                  <span className="font-semibold">150/200</span>
                </div>
                <div className="bg-slate-200 rounded-full h-2">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-red-600 rounded-full"
                    style={{ width: "75%" }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Công nợ:</span>
                  <span className="font-semibold text-red-600">
                    {dealer.debt}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-50 rounded-xl">
        <h3 className="font-bold text-slate-800 mb-3">
          Lịch sử giao dịch gần đây
        </h3>
        <div className="space-y-2">
          {dealer.recentTransactions.map((tx, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 bg-white rounded-lg"
            >
              <div>
                <p className="font-medium text-slate-800">{tx.description}</p>
                <p className="text-xs text-slate-500">{tx.date}</p>
              </div>
              <span
                className={`font-bold ${
                  tx.amount > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {tx.amount > 0 ? "+" : ""}
                {tx.amount}M
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
          <Edit className="w-4 h-4 inline mr-2" />
          Chỉnh sửa
        </button>
        <button className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors">
          Xem báo cáo
        </button>
      </div>
    </div>
  );
};
