"use client";
import React, { useState } from "react";
import { Users, Building2, User, Award, Plus } from "lucide-react";
import { CustomerVIP } from "./types/customer";
import ErrorIcon from "@mui/icons-material/Error";
import { CheckCircleIcon } from "lucide-react";
import {
  createCustomer,
  DeleteCustomerById,
  searchFilterCustomer,
  updateCustomerById
} from "@/services/customerService/customer";
import CreateFormCustomer from "./components/CreateFormCustomer";
import { Alert, Slide, SlideProps, Snackbar } from "@mui/material";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
import { useRouter } from "next/navigation";
import UpdateFormCustomer from "./components/UpdateFormCustomer";
import { AxiosError } from "axios";

// Import components
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import SearchFilters from "./components/SearchFilters";
import CustomerCard from "./components/CustomerCard";

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

const Customer: React.FC = () => {
  useAuthGuard(["EVM Staff"]);
  const router = useRouter();

  // State management
  const [customers, setCustomers] = useState<CustomerVIP[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerVIP | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Filter states
  const [filterType, setFilterType] = useState<
    "ALL" | "INDIVIDUAL" | "COMPANY"
  >("ALL");
  const [filterFullName, setFilterFullName] = useState<string>("");
  const [filterEmail, setFilterEmail] = useState<string>("");
  const [filterPhone, setFilterPhone] = useState<string>("");
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  // Form states
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [customerType, setCustomerType] = useState<"INDIVIDUAL" | "COMPANY">(
    "INDIVIDUAL"
  );

  // Notification state
  const [notification, setNotification] = useState<NotificationsProps>({
    open: false,
    message: "",
    severity: "success"
  });

  const handleClose = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Fetch customers on mount
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await searchFilterCustomer({});
        console.log("Response", response);
        if (Array.isArray(response)) {
          setCustomers(response);
        } else {
          setCustomers([]);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Calculate stats
  const stats = {
    total: customers.length,
    individual: customers.filter((c) => c.customerType === "INDIVIDUAL").length,
    company: customers.filter((c) => c.customerType === "COMPANY").length,
    newThisMonth: customers.filter((c) => {
      const created = new Date(c.createdAt);
      const now = new Date();
      return (
        created.getMonth() === now.getMonth() &&
        created.getFullYear() === now.getFullYear()
      );
    }).length
  };

  // Handle create customer
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formattedDob = dob ? `${dob}T00:00:00` : null;
    try {
      const response = await createCustomer({
        fullName,
        email,
        phone,
        address,
        dob: formattedDob,
        customerType
      });
      if (response) {
        setNotification({
          open: true,
          message: "Tạo khách hàng mới thành công",
          severity: "success"
        });
        window.location.reload();
      }
    } catch (error) {
      const errors = error as AxiosError;
      console.error("Error", errors);
      setNotification({
        open: true,
        message: errors.message || "có lỗi xảy ra",
        severity: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle update customer
  const handleOpenUpdate = (customer: CustomerVIP) => {
    setSelectedCustomer(customer);
    setFullName(customer.fullName);
    setEmail(customer.email);
    setPhone(customer.phone);
    setAddress(customer.address);
    setDob(customer.dob ? customer.dob.split("T")[0] : "");
    setCustomerType(customer.customerType);
    setIsUpdateModalOpen(true);
  };

  const handleUpdate = async (id: string) => {
    const formattedDob = dob ? `${dob}T00:00:00` : null;
    try {
      const response = await updateCustomerById(id, {
        fullName,
        email,
        phone,
        address,
        dob: formattedDob,
        customerType
      });
      if (response) {
        setNotification({
          open: true,
          message: "Cập nhật thành công",
          severity: "success"
        });
        window.location.reload();
      } else {
        setNotification({
          open: true,
          message: "Cập nhật thất bại",
          severity: "error"
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setNotification({
        open: true,
        message: "Có lỗi xảy ra",
        severity: "error"
      });
    }
  };

  // Handle delete customer
  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa khách hàng này?")) return;

    try {
      const response = await DeleteCustomerById(id);
      if (response) {
        setNotification({
          open: true,
          message: "Xóa khách hàng thành công",
          severity: "success"
        });
        window.location.reload();
      } else {
        setNotification({
          open: true,
          message: "Xóa khách hàng thất bại",
          severity: "error"
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setNotification({
        open: true,
        message: "Có lỗi xảy ra",
        severity: "error"
      });
    }
  };

  // Handle search
  const handleSearch = async () => {
    setIsSearching(true);
    try {
      const response = await searchFilterCustomer({
        type: filterType !== "ALL" ? filterType : undefined,
        fullName: filterFullName,
        email: filterEmail,
        phone: filterPhone
      });
      if (Array.isArray(response)) {
        setCustomers(response);
      } else {
        setCustomers([]);
      }
    } catch (error) {
      console.error("Error:", error);
      setNotification({
        open: true,
        message: "Có lỗi xảy ra khi tìm kiếm",
        severity: "error"
      });
    } finally {
      setIsSearching(false);
    }
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setFilterType("ALL");
    setFilterFullName("");
    setFilterEmail("");
    setFilterPhone("");
    // Reload all customers
    const fetchData = async () => {
      try {
        const response = await searchFilterCustomer({});
        if (Array.isArray(response)) {
          setCustomers(response);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .shimmer-effect {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.4) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }

        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(99, 102, 241, 0.15);
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #6366f1 0%, #8b5cf6 100%);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #4f46e5 0%, #7c3aed 100%);
        }
      `}</style>

      <div className="mt-22 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <Header stats={stats} onAddClick={() => setIsCreateModalOpen(true)} />

          {/* Stats Cards */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeInUp"
            style={{ animationDelay: "0.1s" }}
          >
            <StatCard
              icon={<User className="w-6 h-6 text-blue-600" />}
              label="Cá nhân"
              value={stats.individual}
              total={stats.total}
              bgColor="text-blue-600"
              iconBgColor="bg-gradient-to-br from-blue-100 to-cyan-100"
              gradientColor="bg-gradient-to-r from-blue-500 to-cyan-600"
            />

            <StatCard
              icon={<Building2 className="w-6 h-6 text-purple-600" />}
              label="Công ty"
              value={stats.company}
              total={stats.total}
              bgColor="text-purple-600"
              iconBgColor="bg-gradient-to-br from-purple-100 to-pink-100"
              gradientColor="bg-gradient-to-r from-purple-500 to-pink-600"
            />

            <StatCard
              icon={<Award className="w-6 h-6 text-green-600" />}
              label="Tổng cộng"
              value={stats.total}
              total={stats.total}
              bgColor="text-green-600"
              iconBgColor="bg-gradient-to-br from-green-100 to-emerald-100"
              gradientColor="bg-gradient-to-r from-green-500 to-emerald-600"
            />
          </div>

          {/* Search & Filter */}
          <SearchFilters
            filterType={filterType}
            setFilterType={setFilterType}
            filterFullName={filterFullName}
            setFilterFullName={setFilterFullName}
            filterEmail={filterEmail}
            setFilterEmail={setFilterEmail}
            filterPhone={filterPhone}
            setFilterPhone={setFilterPhone}
            showAdvanced={showAdvanced}
            setShowAdvanced={setShowAdvanced}
            handleSearch={handleSearch}
            handleClearFilters={handleClearFilters}
            isSearching={isSearching}
            stats={stats}
          />

          {/* Customer Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {customers.map((customer, index) => (
              <CustomerCard
                key={customer.id}
                customer={customer}
                index={index}
                onView={(id) => router.push(`/evm/staff/customer/${id}`)}
                onEdit={handleOpenUpdate}
                onDelete={handleDelete}
                formatDate={formatDate}
              />
            ))}
          </div>

          {/* Empty State */}
          {customers.length === 0 && (
            <div className="bg-white rounded-3xl shadow-2xl p-12 text-center border border-gray-100">
              <div className="relative inline-block mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 rounded-full blur-3xl opacity-40 animate-pulse" />
                <div className="relative bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-12 rounded-3xl shadow-2xl">
                  <Users className="w-24 h-24 text-indigo-600" />
                </div>
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                Không tìm thấy khách hàng
              </h3>
              <p className="text-gray-600 text-lg mb-8">
                {filterType !== "ALL" ||
                filterFullName ||
                filterEmail ||
                filterPhone
                  ? "Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác"
                  : "Chưa có khách hàng nào trong hệ thống"}
              </p>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:scale-105 transition-all flex items-center gap-3 mx-auto"
              >
                <Plus className="w-5 h-5" />
                Thêm khách hàng đầu tiên
              </button>
            </div>
          )}
        </div>

        {/* Modals */}
        <CreateFormCustomer
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          handleSubmit={handleSubmit}
          fullName={fullName}
          setFullName={setFullName}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          address={address}
          setAddress={setAddress}
          dob={dob}
          setDob={setDob}
          customerType={customerType}
          setCustomerType={setCustomerType}
        />

        {isUpdateModalOpen && !selectedCustomer ? (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md mx-auto">
              <div className="flex justify-center mb-4">
                <ErrorIcon className="text-red-500" style={{ fontSize: 48 }} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Không có khách hàng được chọn
              </h3>
              <p className="text-gray-600 mb-6">
                Vui lòng chọn một khách hàng để cập nhật thông tin.
              </p>
              <button
                onClick={() => setIsUpdateModalOpen(false)}
                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all"
              >
                Đóng
              </button>
            </div>
          </div>
        ) : (
          <UpdateFormCustomer
            customerId={selectedCustomer?.id || ""}
            isOpen={isUpdateModalOpen}
            fullName={fullName}
            setFullName={setFullName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            address={address}
            setAddress={setAddress}
            dob={dob}
            setDob={setDob}
            customerType={customerType}
            setCustomerType={setCustomerType}
            onClose={() => setIsUpdateModalOpen(false)}
            handleSubmit={handleUpdate}
          />
        )}

        {/* Notifications */}
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
    </>
  );
};

export default Customer;
