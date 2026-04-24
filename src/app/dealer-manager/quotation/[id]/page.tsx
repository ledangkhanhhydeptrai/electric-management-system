"use client";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import {
  ArrowLeft,
  Download,
  Mail,
  Phone,
  User,
  Calendar,
  Package,
  DollarSign,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Printer,
  Edit,
  FileText,
  Sparkles,
  Car,
  Palette,
  Hash,
  Send
} from "lucide-react";
import {
  getQuotationById,
  Quotation,
  sendQuotationToCustomer
} from "@/services/quotationService/quotation";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
import { Alert, Slide, SlideProps, Snackbar } from "@mui/material";
import { CheckCircleIcon } from "lucide-react";
import ErrorIcon from "@mui/icons-material/Error";
import { AxiosError } from "axios";
import { EmailModal } from "./components/EmailModal";
interface SlideTransitionProps
  extends Omit<SlideProps, "direction" | "children"> {
  children: React.ReactElement;
}
function SlideTransition({ children, ...props }: SlideTransitionProps) {
  return (
    <Slide {...props} direction="left">
      {children}
    </Slide>
  );
}

function Spinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
      <div className="w-14 h-14 border-4 border-t-transparent border-green-500 rounded-full animate-spin" />
    </div>
  );
}

interface NotificationsProps {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
}

const QuotationById: React.FC = () => {
  useAuthGuard(["Dealer Manager"]);
  const { id } = useParams();
  const [data, setData] = React.useState<Quotation | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const [isEmailModalOpen, setIsEmailModalOpen] = React.useState(false);
  const [isSendingEmail, setIsSendingEmail] = React.useState(false);
  const [notification, setNotification] = React.useState<NotificationsProps>({
    open: false,
    message: "",
    severity: "success"
  });

  const handleClose = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getQuotationById(String(id));
        if (response) {
          setData(response as Quotation);
        } else {
          setData(null);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <Spinner />;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(amount);
  };

  const formatDate = (dateArray: number[]) => {
    const [year, month, day, hour, minute, second] = dateArray;
    const date = new Date(year, month - 1, day, hour, minute, second);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getStatusConfig = (status: string) => {
    const configs = {
      DRAFT: {
        label: "Bản nháp",
        bg: "bg-gray-100",
        text: "text-gray-700",
        border: "border-gray-300",
        icon: Clock,
        gradient: "from-gray-500 to-gray-600"
      },
      SENT: {
        label: "Đã gửi",
        bg: "bg-blue-100",
        text: "text-blue-700",
        border: "border-blue-300",
        icon: Mail,
        gradient: "from-blue-500 to-blue-600"
      },
      APPROVED: {
        label: "Đã duyệt",
        bg: "bg-emerald-100",
        text: "text-emerald-700",
        border: "border-emerald-300",
        icon: CheckCircle2,
        gradient: "from-emerald-500 to-emerald-600"
      },
      REJECTED: {
        label: "Từ chối",
        bg: "bg-red-100",
        text: "text-red-700",
        border: "border-red-300",
        icon: XCircle,
        gradient: "from-red-500 to-red-600"
      },
      EXPIRED: {
        label: "Hết hạn",
        bg: "bg-orange-100",
        text: "text-orange-700",
        border: "border-orange-300",
        icon: AlertCircle,
        gradient: "from-orange-500 to-orange-600"
      }
    };
    return configs[status as keyof typeof configs] || configs.DRAFT;
  };

  const handleSendQuotation = async (email: string) => {
    setIsSendingEmail(true);
    try {
      const response = await sendQuotationToCustomer(String(id), email);
      if (response) {
        setNotification({
          open: true,
          message: "✅ Gửi báo giá thành công!",
          severity: "success"
        });
        window.location.reload();
      }
    } catch (error) {
      const errors = error as AxiosError;
      console.error("Error:", errors);
      setNotification({
        open: true,
        message: errors.message || "❌ Có lỗi xảy ra khi gửi email",
        severity: "error"
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="inline-block p-6 bg-white rounded-2xl shadow-2xl mb-4">
            <FileText className="w-16 h-16 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Không tìm thấy báo giá
          </h3>
          <p className="text-gray-600 mb-6">
            Báo giá này không tồn tại hoặc đã bị xóa
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  const statusConfig = getStatusConfig(data.status);
  const StatusIcon = statusConfig.icon;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    console.log("Downloading PDF...");
  };

  const handleEdit = () => {
    console.log("Edit quotation");
  };

  return (
    <div className="mt-20 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 overflow-hidden">
      <div className="">
        {/* Header Actions */}
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg hover:bg-gray-50 transition-all shadow text-sm"
          >
            <ArrowLeft className="w-4 h-4 text-gray-600" />
            <span className="font-semibold text-gray-700">Quay lại</span>
          </button>

          <div className="flex items-center gap-2">
            {/* Send Email Button */}
            <button
              onClick={() => setIsEmailModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all text-sm font-bold"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Gửi Email</span>
            </button>

            <button
              onClick={handleEdit}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 rounded-lg hover:border-emerald-400 transition-all shadow text-sm group"
            >
              <Edit className="w-4 h-4 text-gray-600 group-hover:text-emerald-600" />
              <span className="font-semibold text-gray-700 hidden sm:inline">
                Sửa
              </span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 rounded-lg hover:border-teal-400 transition-all shadow text-sm group"
            >
              <Printer className="w-4 h-4 text-gray-600 group-hover:text-teal-600" />
              <span className="font-semibold text-gray-700 hidden sm:inline">
                In
              </span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 rounded-lg hover:border-cyan-400 transition-all shadow text-sm group"
            >
              <Download className="w-4 h-4 text-gray-600 group-hover:text-cyan-600" />
              <span className="font-semibold text-gray-700 hidden sm:inline">
                Tải
              </span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-4">
          {/* Header Card */}
          <div className="backdrop-blur-xl bg-white/90 rounded-xl p-4 border border-white/60 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              {/* Title Section */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg shadow-lg">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                      Báo Giá #{data.id.slice(0, 8).toUpperCase()}
                    </h1>
                    <p className="text-gray-500 text-xs">Chi tiết báo giá</p>
                  </div>
                </div>

                {/* Status Badge */}
                <div
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 ${statusConfig.bg} ${statusConfig.text} border ${statusConfig.border} rounded-lg font-bold shadow text-sm`}
                >
                  <StatusIcon className="w-4 h-4" />
                  {statusConfig.label}
                </div>
              </div>

              {/* Date Info */}
              <div className="text-left md:text-right">
                <p className="text-gray-600 text-xs font-semibold mb-1 flex items-center gap-1 justify-start md:justify-end">
                  <Calendar className="w-3.5 h-3.5 text-teal-600" />
                  Ngày tạo
                </p>
                <p className="text-base font-bold text-gray-800">
                  {formatDate(data.createdAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="backdrop-blur-xl bg-white/80 rounded-xl p-4 border border-white/60 shadow-lg">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg shadow">
                <User className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-lg font-bold text-gray-800">
                Thông tin khách hàng
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Customer Name */}
              <div className="group">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-emerald-100 rounded-md group-hover:bg-emerald-200 transition-colors">
                    <User className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <p className="text-xs font-bold text-gray-600">Họ và tên</p>
                </div>
                <p className="text-sm font-bold text-gray-800 ml-7">
                  {data.customerName}
                </p>
              </div>

              {/* Customer Email */}
              <div className="group">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-teal-100 rounded-md group-hover:bg-teal-200 transition-colors">
                    <Mail className="w-3.5 h-3.5 text-teal-600" />
                  </div>
                  <p className="text-xs font-bold text-gray-600">Email</p>
                </div>
                <p className="text-sm font-bold text-gray-800 ml-7 break-all">
                  {data.customerEmail}
                </p>
              </div>

              {/* Customer Phone */}
              <div className="group">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-cyan-100 rounded-md group-hover:bg-cyan-200 transition-colors">
                    <Phone className="w-3.5 h-3.5 text-cyan-600" />
                  </div>
                  <p className="text-xs font-bold text-gray-600">Điện thoại</p>
                </div>
                <p className="text-sm font-bold text-gray-800 ml-7">
                  {data.customerPhone}
                </p>
              </div>
            </div>
          </div>

          {/* Items List */}
          <div className="backdrop-blur-xl bg-white/80 rounded-xl p-4 border border-white/60 shadow-lg">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
              <div className="p-2 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg shadow">
                <Package className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Danh sách sản phẩm
                </h2>
                <p className="text-xs text-gray-500">
                  {data.items.length} sản phẩm
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {data.items.map((item, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-white to-emerald-50/50 rounded-xl p-4 border border-gray-200 hover:border-teal-400 hover:shadow-lg transition-all"
                >
                  {/* Item Header */}
                  <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg shadow text-white font-black text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-gray-800 flex items-center gap-1.5">
                          <Car className="w-4 h-4 text-teal-600" />
                          {item.modelName}
                        </h3>
                        <p className="text-xs text-gray-500">
                          Sản phẩm #{index + 1}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Item Details Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {/* Model ID */}
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Hash className="w-3 h-3 text-gray-400" />
                        <p className="text-xs font-bold text-gray-500">
                          Tên mẫu xe
                        </p>
                      </div>
                      <p className="text-xs font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded break-all">
                        {item.modelName}
                      </p>
                    </div>

                    {/* Color */}
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Palette className="w-3 h-3 text-gray-400" />
                        <p className="text-xs font-bold text-gray-500">
                          Màu sắc
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 bg-blue-500 rounded-full border border-gray-300" />
                        <p className="text-xs font-bold text-gray-700">
                          {item.color}
                        </p>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Package className="w-3 h-3 text-gray-400" />
                        <p className="text-xs font-bold text-gray-500">
                          Số lượng
                        </p>
                      </div>
                      <p className="text-xl font-black text-gray-800">
                        {item.quantity}
                      </p>
                    </div>

                    {/* Unit Price */}
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <DollarSign className="w-3 h-3 text-gray-400" />
                        <p className="text-xs font-bold text-gray-500">
                          Đơn giá
                        </p>
                      </div>
                      <p className="text-sm font-bold text-emerald-600">
                        {formatCurrency(item.price)}
                      </p>
                    </div>
                  </div>

                  {/* Item Subtotal */}
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-3">
                      <span className="text-sm text-gray-700 font-bold flex items-center gap-1.5">
                        <DollarSign className="w-4 h-4 text-emerald-600" />
                        Thành tiền:
                      </span>
                      <span className="text-xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total Summary */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-xl blur-xl opacity-75 group-hover:opacity-100 transition-all animate-pulse" />
            <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-xl p-5 shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-white animate-pulse" />
                  <h3 className="text-lg font-black text-white">
                    TỔNG GIÁ TRỊ BÁO GIÁ
                  </h3>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3">
                  <div className="text-white">
                    <p className="text-sm font-bold opacity-90 mb-1">
                      {data.items.length} sản phẩm
                    </p>
                    <p className="text-xs opacity-75">Đã bao gồm thuế VAT</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-3xl md:text-4xl font-black text-white drop-shadow-2xl">
                      {formatCurrency(data.totalAmount)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Modal */}
      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        onSend={handleSendQuotation}
        defaultEmail={data.customerEmail}
        isSending={isSendingEmail}
      />

      {/* Notification */}
      <Snackbar
        open={notification.open}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={4000}
      >
        <Alert
          onClose={handleClose}
          severity={notification.severity}
          variant="filled"
          iconMapping={{
            success: <CheckCircleIcon fontSize="small" />,
            error: <ErrorIcon fontSize="small" />
          }}
          sx={{
            width: "100%",
            bgcolor:
              notification.severity === "success" ? "#4caf50" : "#f44336",
            color: "white",
            fontWeight: "bold",
            borderRadius: "12px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
            px: 2,
            py: 1.5,
            display: "flex",
            alignItems: "center",
            gap: 1
          }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default QuotationById;
