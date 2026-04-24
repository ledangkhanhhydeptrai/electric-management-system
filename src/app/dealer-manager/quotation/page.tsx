"use client";
import React from "react";
import {
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  Calendar,
  Mail,
  Phone,
  Package,
  X
} from "lucide-react";
import {
  createQuotation,
  EnumQuotation,
  getAllQuotation,
  ItemsPropsQuotation
} from "@/services/quotationService/quotation";
import { Alert, Slide, SlideProps, Snackbar } from "@mui/material";
import { CheckCircleIcon } from "lucide-react";
import ErrorIcon from "@mui/icons-material/Error";
import { AxiosError } from "axios";
import QuotationForm from "./components/QuotationForm";
import { getAllModel, Models } from "@/services/vehicleModel/vehicle";
import { useRouter } from "next/navigation";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
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
interface QuotationItem {
  modelId: string;
  modelName: string;
  color: string;
  quantity: number;
  price: number;
}

interface Quotation {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: EnumQuotation;
  totalAmount: number;
  createdAt: number[];
  items: QuotationItem[];
}

const QuotationPage: React.FC = () => {
  useAuthGuard(["Dealer Manager"]);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<EnumQuotation>("All");
  const [openForm, setOpenForm] = React.useState<boolean>(false);
  const [selectedQuotation, setSelectedQuotation] = React.useState<Quotation[]>(
    []
  );
  const [customerName, setCustomerName] = React.useState("");
  const [customerEmail, setCustomerEmail] = React.useState("");
  const [customerPhone, setCustomerPhone] = React.useState("");
  const [items, setItems] = React.useState<ItemsPropsQuotation[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [notification, setNotification] = React.useState<NotificationsProps>({
    open: false,
    message: "",
    severity: "success"
  });
  const [models, setModels] = React.useState<Models[]>([]);
  React.useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await getAllModel();
        if (Array.isArray(response)) {
          setModels(response);
        } else {
          setModels([]);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    const fetchQuotation = async () => {
      try {
        const response = await getAllQuotation();
        if (Array.isArray(response)) {
          setSelectedQuotation(response);
        } else {
          setSelectedQuotation([]);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchModels();
    fetchQuotation();
  }, []);
  const handleOpenForm = () => setOpenForm(true);

  // Hàm đóng popup
  const handleCloseForm = () => {
    setOpenForm(false);
    setCustomerName("");
    setCustomerEmail("");
    setCustomerPhone("");
    setItems([]);
  };
  // Mock data

  const getStatusColor = (status: string) => {
    const colors = {
      DRAFT: "bg-gray-100 text-gray-700 border-gray-300",
      SENT: "bg-blue-100 text-blue-700 border-blue-300",
      APPROVED: "bg-green-100 text-green-700 border-green-300",
      REJECTED: "bg-red-100 text-red-700 border-red-300",
      EXPIRED: "bg-orange-100 text-orange-700 border-orange-300"
    };
    return colors[status as keyof typeof colors] || colors.DRAFT;
  };
  const handleClose = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };
  const getStatusText = (status: string) => {
    const texts = {
      DRAFT: "Nháp",
      SENT: "Đã gửi",
      APPROVED: "Đã duyệt",
      REJECTED: "Từ chối",
      EXPIRED: "Hết hạn"
    };
    return texts[status as keyof typeof texts] || status;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(amount);
  };
  if (loading) return <Spinner />;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await createQuotation({
        customerEmail,
        customerName,
        customerPhone,
        items
      });
      if (response) {
        setNotification({
          open: true,
          message: "Tạo đơn giá thành công",
          severity: "success"
        });
        window.location.reload();
      }
    } catch (error) {
      const errors = error as AxiosError;
      console.error("Error:", errors);
      setNotification({
        open: true,
        message: errors.message || "Có lỗi xảy ra",
        severity: "error"
      });
    } finally {
      setLoading(false);
    }
  };
  const formatDate = (dateArray: number[]) => {
    // Tạo Date từ array: [year, month, day, hour, minute, second, ms]
    // Lưu ý: month trong JS tính từ 0 (0 = January)
    const [year, month, day, hour, minute, second = 0, ms = 0] = dateArray;
    const date = new Date(year, month - 1, day, hour, minute, second, ms);

    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="mt-22 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Quản lý Báo giá
              </h1>
              <p className="text-gray-600">
                Quản lý và theo dõi tất cả báo giá của khách hàng
              </p>
            </div>
            <button
              onClick={handleOpenForm} // mở popup
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Tạo báo giá mới
            </button>
          </div>

          {/* Search and Filter */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên khách hàng, email, số điện thoại..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={statusFilter}
                  onChange={e =>
                    setStatusFilter(e.target.value as EnumQuotation)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
                >
                  <option value="All">Tất cả trạng thái</option>
                  <option value="DRAFT">Nháp</option>
                  <option value="SENT">Đã gửi</option>
                  <option value="ACCEPTED">Đã duyệt</option>
                  <option value="REJECTED">Từ chối</option>
                  <option value="CANCEL">Hủy</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Quotations List */}
        <div className="space-y-4">
          {selectedQuotation
            .filter(q => statusFilter === "All" || q.status === statusFilter)
            .map((quotation, index) =>
              <div
                key={quotation.id}
                className="bg-white/70 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-800">
                          {quotation.customerName}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                            quotation.status
                          )}`}
                        >
                          {getStatusText(quotation.status)}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-blue-500" />
                          <span>
                            {quotation.customerEmail}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-green-500" />
                          <span>
                            {quotation.customerPhone}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-purple-500" />
                          <span>
                            {formatDate(quotation.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">Tổng giá trị</p>
                      <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {formatCurrency(quotation.totalAmount)}
                      </p>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-4 mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      Danh sách sản phẩm ({quotation.items.length})
                    </h4>
                    <div className="space-y-2">
                      {quotation.items.map((item, itemIndex) =>
                        <div
                          key={itemIndex}
                          className="bg-white rounded-lg p-3 flex items-center justify-between"
                        >
                          <div>
                            <p className="font-semibold text-gray-800">
                              {item.modelName}
                            </p>
                            <p className="text-sm text-gray-600">
                              Màu: {item.color} • Số lượng: {item.quantity}
                            </p>
                          </div>
                          <p className="font-bold text-blue-600">
                            {formatCurrency(item.price)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 justify-end">
                    <button
                      onClick={() =>
                        router.push(
                          `/dealer-manager/quotation/${quotation.id}`
                        )}
                      className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all duration-300 flex items-center gap-2 text-sm font-medium"
                    >
                      <Eye className="w-4 h-4" />
                      Xem
                    </button>
                    <button className="px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-all duration-300 flex items-center gap-2 text-sm font-medium">
                      <Edit className="w-4 h-4" />
                      Sửa
                    </button>
                    <button className="px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-all duration-300 flex items-center gap-2 text-sm font-medium">
                      <Download className="w-4 h-4" />
                      Tải về
                    </button>
                    <button className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all duration-300 flex items-center gap-2 text-sm font-medium">
                      <Trash2 className="w-4 h-4" />
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      {openForm &&
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-6 relative shadow-xl overflow-y-auto max-h-[90vh]">
            {/* Nút đóng */}
            <button
              onClick={handleCloseForm}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Form */}
            <QuotationForm
              customerName={customerName}
              setCustomerName={setCustomerName}
              customerEmail={customerEmail}
              setCustomerEmail={setCustomerEmail}
              customerPhone={customerPhone}
              setCustomerPhone={setCustomerPhone}
              items={items}
              setItems={setItems}
              onSubmit={async e => {
                e.preventDefault();
                await handleSubmit(e);
                handleCloseForm();
              }}
              onCancel={handleCloseForm}
              models={models}
            />
          </div>
        </div>}
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

export default QuotationPage;
