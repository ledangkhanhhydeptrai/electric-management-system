import {
  Building2,
  Calendar,
  CheckCircle2,
  DollarSign,
  Edit,
  Target
} from "lucide-react";

export type Contract = {
  id: string;
  dealer: string;
  startDate: string;
  endDate: string;
  value: string;
  status: string;
  representative: string;
  position: string;
  phone: string;
  signDate: string;
  duration: string;
  paid: string;
  remaining: string;
  terms: string[];
  notes: string;
};
export const contracts = [
    {
      id: "CT001",
      dealer: "Đại lý Hà Nội",
      startDate: "01/01/2024",
      endDate: "31/12/2024",
      value: "5 tỷ",
      status: "Còn hiệu lực",
      representative: "Nguyễn Văn A",
      position: "Giám đốc",
      phone: "024-1234-5678",
      signDate: "15/12/2023",
      duration: "12 tháng",
      paid: "3 tỷ",
      remaining: "2 tỷ",
      terms: [
        "Đại lý cam kết mua tối thiểu 200 xe/năm",
        "Chiết khấu 15% cho đơn hàng trên 50 xe",
        "Hỗ trợ marketing 50 triệu/quý",
        "Đào tạo miễn phí cho nhân viên bán hàng"
      ],
      notes:
        "Hợp đồng độc quyền khu vực miền Bắc. Đại lý có trách nhiệm duy trì showroom chuẩn theo quy định của nhà sản xuất."
    },
    {
      id: "CT002",
      dealer: "Đại lý TP.HCM",
      startDate: "15/02/2024",
      endDate: "15/02/2025",
      value: "8 tỷ",
      status: "Còn hiệu lực",
      representative: "Trần Thị B",
      position: "Tổng giám đốc",
      phone: "028-9876-5432",
      signDate: "01/02/2024",
      duration: "12 tháng",
      paid: "6 tỷ",
      remaining: "2 tỷ",
      terms: [
        "Đại lý cam kết mua tối thiểu 300 xe/năm",
        "Chiết khấu 18% cho đơn hàng trên 50 xe",
        "Hỗ trợ marketing 80 triệu/quý",
        "Cung cấp xe demo miễn phí"
      ],
      notes:
        "Đại lý lớn nhất khu vực miền Nam với 3 showroom. Ưu tiên phân phối các dòng xe cao cấp."
    },
    {
      id: "CT003",
      dealer: "Đại lý Đà Nẵng",
      startDate: "01/06/2023",
      endDate: "01/06/2024",
      value: "3 tỷ",
      status: "Sắp hết hạn",
      representative: "Lê Văn C",
      position: "Giám đốc kinh doanh",
      phone: "0236-7890-123",
      signDate: "15/05/2023",
      duration: "12 tháng",
      paid: "2.5 tỷ",
      remaining: "500M",
      terms: [
        "Đại lý cam kết mua tối thiểu 150 xe/năm",
        "Chiết khấu 12% cho đơn hàng trên 30 xe",
        "Hỗ trợ marketing 30 triệu/quý",
        "Đào tạo kỹ thuật định kỳ"
      ],
      notes:
        "Hợp đồng sắp hết hạn, cần gia hạn trong tháng tới. Đại lý có tiềm năng mở rộng sang các tỉnh lân cận."
    }
  ];
export const ContractDetailModal = ({
  contract
}: {
  contract: Contract;
  onClose: () => void;
}) => {
  return (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-3xl font-bold">{contract.id}</h3>
            <p className="text-emerald-100 mt-1">Hợp đồng đại lý</p>
          </div>
          <span
            className={`px-4 py-2 rounded-full text-sm font-bold ${
              contract.status === "Còn hiệu lực"
                ? "bg-white/20"
                : "bg-yellow-400 text-yellow-900"
            }`}
          >
            {contract.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="p-4 bg-emerald-50 rounded-xl">
            <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-600" />
              Thông tin đại lý
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Tên đại lý:</span>
                <span className="font-semibold">{contract.dealer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Người đại diện:</span>
                <span className="font-semibold">{contract.representative}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Chức vụ:</span>
                <span className="font-semibold">{contract.position}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Số điện thoại:</span>
                <span className="font-semibold">{contract.phone}</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-xl">
            <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Thời gian hợp đồng
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Ngày ký:</span>
                <span className="font-semibold">{contract.signDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Ngày bắt đầu:</span>
                <span className="font-semibold">{contract.startDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Ngày kết thúc:</span>
                <span className="font-semibold">{contract.endDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Thời hạn:</span>
                <span className="font-semibold">{contract.duration}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-purple-50 rounded-xl">
            <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-purple-600" />
              Giá trị hợp đồng
            </h3>
            <div className="space-y-3">
              <div className="p-4 bg-white rounded-lg">
                <p className="text-xs text-slate-600 mb-1">Tổng giá trị</p>
                <p className="text-3xl font-bold text-emerald-600">
                  {contract.value}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-slate-600 mb-1">Đã thanh toán</p>
                  <p className="text-lg font-bold text-green-600">
                    {contract.paid}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 mb-1">Còn lại</p>
                  <p className="text-lg font-bold text-orange-600">
                    {contract.remaining}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-orange-50 rounded-xl">
            <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
              <Target className="w-5 h-5 text-orange-600" />
              Điều khoản chính
            </h3>
            <div className="space-y-2">
              {contract.terms.map((term, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">{term}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-50 rounded-xl">
        <h3 className="font-bold text-slate-800 mb-3">Ghi chú</h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          {contract.notes}
        </p>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors">
          <Edit className="w-4 h-4 inline mr-2" />
          Chỉnh sửa hợp đồng
        </button>
        <button className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors">
          Tải xuống PDF
        </button>
        <button className="px-6 py-3 border-2 border-red-300 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition-colors">
          Hủy hợp đồng
        </button>
      </div>
    </div>
  );
};
