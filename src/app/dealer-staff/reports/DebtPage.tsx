import React, { useState, useMemo } from "react";
import DebtTable from "./components/DebtTable";
import {
  DollarOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  WarningOutlined,
  CalendarOutlined,
  RiseOutlined,
  DownloadOutlined,
  PlusOutlined
} from "@ant-design/icons";

interface Debt {
  id: string;
  customer: string;
  amount: number;
  dueDate: string;
  status: "Paid" | "Unpaid";
}

const mockDebts: Debt[] = [
  {
    id: "D001",
    customer: "Nguyen Van A",
    amount: 500000,
    dueDate: "2025-09-15",
    status: "Unpaid"
  },
  {
    id: "D002",
    customer: "Tran Thi B",
    amount: 300000,
    dueDate: "2025-09-20",
    status: "Paid"
  },
  {
    id: "D003",
    customer: "Le Van C",
    amount: 750000,
    dueDate: "2025-08-30",
    status: "Unpaid"
  },
  {
    id: "D004",
    customer: "Pham Thi D",
    amount: 450000,
    dueDate: "2025-10-05",
    status: "Unpaid"
  },
  {
    id: "D005",
    customer: "Hoang Van E",
    amount: 600000,
    dueDate: "2025-09-10",
    status: "Paid"
  },
  {
    id: "D006",
    customer: "Vo Thi F",
    amount: 350000,
    dueDate: "2025-10-25",
    status: "Unpaid"
  }
];

const DebtsPage = () => {
  const [debts] = useState<Debt[]>(mockDebts);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalAmount = debts.reduce((sum, d) => sum + d.amount, 0);
    const paidAmount = debts.filter(d => d.status === "Paid").reduce((sum, d) => sum + d.amount, 0);
    const unpaidAmount = debts.filter(d => d.status === "Unpaid").reduce((sum, d) => sum + d.amount, 0);
    const overdueCount = debts.filter(d => 
      d.status === "Unpaid" && new Date(d.dueDate) < new Date()
    ).length;
    const paidCount = debts.filter(d => d.status === "Paid").length;
    const unpaidCount = debts.filter(d => d.status === "Unpaid").length;
    const collectionRate = debts.length > 0 ? Math.round((paidCount / debts.length) * 100) : 0;

    return {
      totalAmount,
      paidAmount,
      unpaidAmount,
      overdueCount,
      totalCount: debts.length,
      paidCount,
      unpaidCount,
      collectionRate
    };
  }, [debts]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  // Upcoming due dates (next 7 days, unpaid)
  const upcomingDues = useMemo(() => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return debts
      .filter(d => {
        const dueDate = new Date(d.dueDate);
        return d.status === "Unpaid" && dueDate >= today && dueDate <= nextWeek;
      })
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
      .slice(0, 3);
  }, [debts]);

  return (
    <div className="">
      <div className="">
        
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-center gap-5 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-600 rounded-2xl blur opacity-40"></div>
              <div className="relative p-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-xl">
                <FileTextOutlined className="text-white text-5xl" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-orange-800 to-red-900">
                Báo Cáo Công Nợ
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                Theo dõi và quản lý các khoản công nợ
              </p>
            </div>
          </div>
          <div className="h-1 w-32 bg-gradient-to-r from-orange-600 to-red-600 rounded-full"></div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-10">
          {/* Total Debts */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl mb-2 group-hover:scale-110 transition-transform duration-300">
                <FileTextOutlined className="text-blue-600 text-2xl" />
              </div>
              <div className="text-3xl font-black text-gray-900 mb-1">{stats.totalCount}</div>
              <div className="text-xs text-gray-600 font-medium">Tổng khoản</div>
            </div>
          </div>

          {/* Total Amount */}
          <div className="lg:col-span-2 group bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-purple-300 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 font-medium mb-1">Tổng giá trị</p>
                <p className="text-2xl font-black text-gray-900">{formatCurrency(stats.totalAmount)}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-200 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <DollarOutlined className="text-purple-600 text-3xl" />
              </div>
            </div>
          </div>

          {/* Paid */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-green-300 transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-200 rounded-xl mb-2 group-hover:scale-110 transition-transform duration-300">
                <CheckCircleOutlined className="text-green-600 text-2xl" />
              </div>
              <div className="text-2xl font-black text-gray-900 mb-1">{formatCurrency(stats.paidAmount)}</div>
              <div className="text-xs text-gray-600 font-medium">Đã thu</div>
              <div className="text-xs text-green-600 font-semibold mt-1">{stats.paidCount} khoản</div>
            </div>
          </div>

          {/* Unpaid */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-orange-300 transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl mb-2 group-hover:scale-110 transition-transform duration-300">
                <CloseCircleOutlined className="text-orange-600 text-2xl" />
              </div>
              <div className="text-2xl font-black text-gray-900 mb-1">{formatCurrency(stats.unpaidAmount)}</div>
              <div className="text-xs text-gray-600 font-medium">Còn nợ</div>
              <div className="text-xs text-orange-600 font-semibold mt-1">{stats.unpaidCount} khoản</div>
            </div>
          </div>

          {/* Overdue */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-red-300 transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-gradient-to-br from-red-100 to-pink-200 rounded-xl mb-2 group-hover:scale-110 transition-transform duration-300">
                <WarningOutlined className="text-red-600 text-2xl" />
              </div>
              <div className="text-3xl font-black text-gray-900 mb-1">{stats.overdueCount}</div>
              <div className="text-xs text-gray-600 font-medium">Quá hạn</div>
            </div>
          </div>

          {/* Collection Rate */}
          <div className="group bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col items-center text-center text-white h-full justify-center">
              <RiseOutlined className="text-4xl mb-2" />
              <div className="text-3xl font-black mb-1">{stats.collectionRate}%</div>
              <div className="text-xs font-medium opacity-90">Tỷ lệ thu</div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-4 gap-6 mb-10">
          {/* Upcoming Due Dates */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-6 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl text-white">
                  <CalendarOutlined className="text-2xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Sắp Đến Hạn</h2>
                  <p className="text-sm text-gray-600">7 ngày tới</p>
                </div>
              </div>

              <div className="space-y-3">
                {upcomingDues.length > 0 ? (
                  upcomingDues.map((debt) => {
                    const daysUntil = Math.ceil((new Date(debt.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                    return (
                      <div
                        key={debt.id}
                        className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border-2 border-orange-200 hover:border-orange-400 transition-all"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md">
                              {debt.customer.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 text-sm">{debt.customer}</p>
                              <p className="text-xs text-gray-600">{debt.id}</p>
                            </div>
                          </div>
                        </div>

                        <div className="text-lg font-bold text-orange-600 mb-2">
                          {formatCurrency(debt.amount)}
                        </div>

                        <div className={`flex items-center gap-2 text-xs font-semibold ${
                          daysUntil === 0 ? "text-red-600" : daysUntil <= 3 ? "text-orange-600" : "text-gray-600"
                        }`}>
                          <CalendarOutlined />
                          <span>
                            {daysUntil === 0 ? "📌 Hôm nay" : `📅 Còn ${daysUntil} ngày`}
                          </span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <CalendarOutlined className="text-4xl mb-2 opacity-30" />
                    <p className="text-sm">Không có khoản nợ sắp đến hạn</p>
                  </div>
                )}
              </div>

              <button className="w-full mt-4 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold rounded-xl hover:from-orange-700 hover:to-red-700 transition-all shadow-lg">
                Xem tất cả
              </button>
            </div>
          </div>

          {/* Quick Actions & Summary */}
          <div className="lg:col-span-3 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Thao Tác Nhanh</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <button className="flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl border-2 border-blue-200 transition-all hover:shadow-md">
                  <PlusOutlined className="text-blue-600 text-2xl" />
                  <span className="text-sm font-semibold text-gray-900">Tạo công nợ mới</span>
                </button>
                
                <button className="flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-xl border-2 border-green-200 transition-all hover:shadow-md">
                  <CheckCircleOutlined className="text-green-600 text-2xl" />
                  <span className="text-sm font-semibold text-gray-900">Ghi nhận thanh toán</span>
                </button>
                
                <button className="flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-xl border-2 border-purple-200 transition-all hover:shadow-md">
                  <DownloadOutlined className="text-purple-600 text-2xl" />
                  <span className="text-sm font-semibold text-gray-900">Xuất báo cáo</span>
                </button>
              </div>
            </div>

            {/* Collection Progress */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Tiến Độ Thu Hồi</h3>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 font-medium">Tỷ lệ thu hồi thành công</span>
                  <span className="text-2xl font-black text-green-600">{stats.collectionRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-1000"
                    style={{ width: `${stats.collectionRate}%` }}
                  ></div>
                </div>
              </div>

              {/* Summary Grid */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-200">
                  <div className="text-2xl font-black text-blue-900">{stats.totalCount}</div>
                  <div className="text-xs text-blue-700 font-medium mt-1">Tổng khoản</div>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
                  <div className="text-2xl font-black text-green-900">{stats.paidCount}</div>
                  <div className="text-xs text-green-700 font-medium mt-1">Đã thu</div>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 text-center border border-orange-200">
                  <div className="text-2xl font-black text-orange-900">{stats.unpaidCount}</div>
                  <div className="text-xs text-orange-700 font-medium mt-1">Chưa thu</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Debt Table */}
        <div className="animate-fadeIn">
          <DebtTable debts={debts} />
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default DebtsPage;