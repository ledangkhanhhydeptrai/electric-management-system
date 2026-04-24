import React from "react";
import {
  ArrowLeft,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  FileX
} from "lucide-react";

interface ContractHeaderProps {
  contractCode: string;
  status: string;
  onGoBack: () => void;
  onSign: () => void;
  canSign: boolean;
}

export const ContractHeader: React.FC<ContractHeaderProps> = ({
  contractCode,
  status,
  onGoBack,
  onSign,
  canSign
}) => {
  const getStatusBadge = (status: string) => {
    const statusConfig: Record<
      string,
      { label: string; color: string; icon: React.ReactNode }
    > = {
      DRAFT: {
        label: "Nháp",
        color: "bg-gradient-to-r from-gray-500 to-slate-600",
        icon: <FileX className="w-4 h-4" />
      },
      PENDING: {
        label: "Chờ xử lý",
        color: "bg-gradient-to-r from-yellow-500 to-amber-600",
        icon: <Clock className="w-4 h-4" />
      },
      SIGNED: {
        label: "Đã ký",
        color: "bg-gradient-to-r from-green-500 to-emerald-600",
        icon: <CheckCircle className="w-4 h-4" />
      },
      CANCELLED: {
        label: "Đã hủy",
        color: "bg-gradient-to-r from-red-500 to-rose-600",
        icon: <XCircle className="w-4 h-4" />
      }
    };
    const config = statusConfig[status] || statusConfig.DRAFT;
    return (
      <span
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold ${config.color} shadow-lg`}
      >
        {config.icon}
        {config.label}
      </span>
    );
  };

  return (
    <>
      {/* Back Button */}
      <button
        onClick={onGoBack}
        className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Quay lại</span>
      </button>

      {/* Header Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 backdrop-blur-lg bg-opacity-90">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Hợp đồng {contractCode}
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Chi tiết và thông tin hợp đồng
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {getStatusBadge(status)}
            {canSign && (
              <button
                onClick={onSign}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl font-semibold"
              >
                <FileText className="w-5 h-5" />
                Ký hợp đồng
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
