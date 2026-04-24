"use client";
import React, { useState } from "react";
import {
  Building2,
  Users,
  FileText,
  DollarSign,
  Target,
  Award,
  Calendar,
  CheckCircle2,
  Plus,
  Search,
  Filter
} from "lucide-react";
import {
  Dealer,
  DealerCard,
  DealerDetailModal,
  dealers
} from "./components/DealerCard";
import { Contract, ContractDetailModal, contracts } from "./ContractsPage";
import { Account, AccountDetailModal, accounts } from "./AccountsPage";
import { Modal } from "./Modal";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";

export default function DealerListPage() {
  useAuthGuard(["EVM Staff"]);
  const [selectedDealer, setSelectedDealer] = useState<Dealer | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");

  const debts = [
    {
      dealer: "Đại lý Hà Nội",
      total: "500M",
      paid: "300M",
      remaining: "200M",
      dueDate: "15/12/2024"
    },
    {
      dealer: "Đại lý TP.HCM",
      total: "800M",
      paid: "700M",
      remaining: "100M",
      dueDate: "20/12/2024"
    },
    {
      dealer: "Đại lý Đà Nẵng",
      total: "350M",
      paid: "350M",
      remaining: "0M",
      dueDate: "Đã thanh toán"
    }
  ];

  const targets = [
    { dealer: "Đại lý Hà Nội", target: 200, achieved: 150, percentage: 75 },
    { dealer: "Đại lý TP.HCM", target: 300, achieved: 220, percentage: 73 },
    { dealer: "Đại lý Đà Nẵng", target: 150, achieved: 95, percentage: 63 }
  ];

  return (
    <div className="text-left">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Hero */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-4">
              Quản lý Đại lý
            </h1>
            <p className="text-slate-600 text-lg">
              Hệ thống quản lý toàn diện cho mạng lưới đại lý
            </p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg">
            <Plus className="w-5 h-5" />
            Thêm đại lý mới
          </button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm đại lý, tài khoản..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
              />
            </div>
            <button className="flex items-center gap-2 px-6 py-3 border-2 border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
              <Filter className="w-5 h-5" />
              Lọc
            </button>
          </div>
        </div>

        {/* Dealers */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-2xl shadow-lg">
              <Building2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-800">
                Danh sách đại lý
              </h2>
              <p className="text-slate-600 mt-1">
                Tổng quan mạng lưới phân phối
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dealers.map((dealer) => (
              <DealerCard
                key={dealer.id}
                dealer={dealer}
                onViewDetails={setSelectedDealer}
              />
            ))}
          </div>
        </section>

        {/* Accounts */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-2xl shadow-lg">
              <Users className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-800">
                Quản lý tài khoản
              </h2>
              <p className="text-slate-600 mt-1">Danh sách tài khoản đại lý</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-purple-50 to-indigo-50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Tên
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Đại lý
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Vai trò
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Trạng thái
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {accounts.map((acc) => (
                    <tr
                      key={acc.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {acc.name.charAt(0)}
                          </div>
                          <span className="font-medium text-slate-800">
                            {acc.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{acc.dealer}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          {acc.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            acc.status === "Hoạt động"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {acc.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedAccount(acc)}
                          className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                        >
                          Chi tiết
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Contracts */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-3 rounded-2xl shadow-lg">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-800">Hợp đồng</h2>
              <p className="text-slate-600 mt-1">Quản lý hợp đồng đại lý</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {contracts.map((contract) => (
              <div
                key={contract.id}
                className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold text-lg">
                      {contract.id}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        contract.status === "Còn hiệu lực"
                          ? "bg-white/20 text-white"
                          : "bg-yellow-400 text-yellow-900"
                      }`}
                    >
                      {contract.status}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Đại lý</p>
                    <p className="font-semibold text-slate-800">
                      {contract.dealer}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {contract.startDate} - {contract.endDate}
                    </span>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl">
                    <p className="text-xs text-slate-600 mb-1">
                      Giá trị hợp đồng
                    </p>
                    <p className="text-2xl font-bold text-emerald-600">
                      {contract.value}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedContract(contract)}
                    className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium text-sm"
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Debts */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-br from-orange-500 to-red-600 p-3 rounded-2xl shadow-lg">
              <DollarSign className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-800">Công nợ</h2>
              <p className="text-slate-600 mt-1">Theo dõi công nợ đại lý</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <div className="space-y-4">
              {debts.map((debt, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-800">
                      {debt.dealer}
                    </h3>
                    {debt.remaining === "0M" ? (
                      <span className="flex items-center gap-2 px-3 py-1 bg-green-500 text-white rounded-full text-xs font-semibold">
                        <CheckCircle2 className="w-4 h-4" />
                        Đã thanh toán
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-xs font-semibold">
                        Còn nợ
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-slate-600 mb-1">
                        Tổng công nợ
                      </p>
                      <p className="text-lg font-bold text-slate-800">
                        {debt.total}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 mb-1">
                        Đã thanh toán
                      </p>
                      <p className="text-lg font-bold text-green-600">
                        {debt.paid}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Còn lại</p>
                      <p className="text-lg font-bold text-red-600">
                        {debt.remaining}
                      </p>
                    </div>
                  </div>

                  {debt.remaining !== "0M" && (
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar className="w-4 h-4" />
                      <span>Hạn thanh toán: {debt.dueDate}</span>
                    </div>
                  )}

                  <div className="mt-4 bg-white rounded-lg h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
                      style={{
                        width: `${
                          (parseInt(debt.paid) / parseInt(debt.total)) * 100
                        }%`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Targets */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-2xl shadow-lg">
              <Target className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-800">
                Chỉ tiêu bán hàng
              </h2>
              <p className="text-slate-600 mt-1">Theo dõi hiệu suất đại lý</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {targets.map((target, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-800">{target.dealer}</h3>
                  <Award
                    className={`w-6 h-6 ${
                      target.percentage >= 75
                        ? "text-yellow-500"
                        : target.percentage >= 50
                        ? "text-blue-500"
                        : "text-slate-400"
                    }`}
                  />
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">Tiến độ</span>
                    <span
                      className={`text-sm font-bold ${
                        target.percentage >= 75
                          ? "text-green-600"
                          : target.percentage >= 50
                          ? "text-blue-600"
                          : "text-orange-600"
                      }`}
                    >
                      {target.percentage}%
                    </span>
                  </div>
                  <div className="bg-slate-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        target.percentage >= 75
                          ? "bg-gradient-to-r from-green-500 to-emerald-600"
                          : target.percentage >= 50
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600"
                          : "bg-gradient-to-r from-orange-500 to-red-600"
                      }`}
                      style={{ width: `${target.percentage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-slate-600 mb-1">Chỉ tiêu</p>
                    <p className="text-xl font-bold text-blue-600">
                      {target.target}
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-xs text-slate-600 mb-1">Đã đạt</p>
                    <p className="text-xl font-bold text-green-600">
                      {target.achieved}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Modals */}
      {selectedDealer && (
        <Modal
          isOpen={!!selectedDealer}
          onClose={() => setSelectedDealer(null)}
          title={`Chi tiết ${selectedDealer.name}`}
        >
          <DealerDetailModal
            dealer={selectedDealer}
            onClose={() => setSelectedDealer(null)}
          />
        </Modal>
      )}

      {selectedAccount && (
        <Modal
          isOpen={!!selectedAccount}
          onClose={() => setSelectedAccount(null)}
          title="Thông tin tài khoản"
        >
          <AccountDetailModal
            account={selectedAccount}
            onClose={() => setSelectedAccount(null)}
          />
        </Modal>
      )}

      {selectedContract && (
        <Modal
          isOpen={!!selectedContract}
          onClose={() => setSelectedContract(null)}
          title="Chi tiết hợp đồng"
        >
          <ContractDetailModal
            contract={selectedContract}
            onClose={() => setSelectedContract(null)}
          />
        </Modal>
      )}
    </div>
  );
}
