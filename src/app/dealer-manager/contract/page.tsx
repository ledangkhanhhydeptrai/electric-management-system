"use client";
import React, { useEffect } from "react";
import { FaFileContract, FaCheckCircle, FaClock } from "react-icons/fa";
import { Leaf, TrendingUp } from "lucide-react";

import SearchAndFilter from "./components/Contract/SearchAndFilter";
import StatsCard from "./components/Contract/StatsCard";

import ErrorIcon from "@mui/icons-material/Error";
import {
  createContractModal,
  getAllContract,
  handleCancelContract,
  handleDownloadFile,
  ItemExtra,
  PaymentMethod
} from "@/services/contract/contractService";
import { useRouter } from "next/navigation";
import { Alert, Slide, SlideProps, Snackbar } from "@mui/material";
import { CheckCircleIcon } from "lucide-react";
import {
  getAllOrder,
  getOrderById,
  OrderData
} from "@/services/orderService/order"; // ✅ Import getOrderDetail
import { Car } from "@/app/evm/admin/cars/types";
import { searchFilter } from "@/services/vehicle/vehicle";
import { Dealer } from "@/app/evm/admin/dealerView/types/types";
import { getAllDealer } from "@/services/dealerService/dealerService";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
import { CustomerVIP } from "@/app/evm/admin/customer/types/customer";
import { searchFilterCustomer } from "@/services/customerService/customer";
import ContractTable from "./components/Contract/ContractTable/ContractTable";
import { CreateContractModal } from "./components/Contract/CreateContractModal/CreateContractModal";
import { Contract } from "@/app/dealer-manager/contract/types/contract";

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
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-50 z-50">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-t-transparent border-emerald-500 rounded-full animate-spin" />
        <Leaf className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-emerald-600 animate-pulse" />
      </div>
    </div>
  );
}

interface NotificationsProps {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
}

const ContractPage: React.FC = () => {
  useAuthGuard(["Dealer Manager"]);

  const [searchTerm, setSearchTerm] = React.useState("");
  const [loading, setLoading] = React.useState<boolean>(true);
  const [filterStatus, setFilterStatus] = React.useState<
    "All" | "DRAFT" | "PENDING" | "COMPLETED" | "CANCELLED"
  >("All");
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [contractsList, setContractsList] = React.useState<Contract[]>([]);
  const [orderId, setOrderId] = React.useState<string>("");
  const [buyerId, setBuyerId] = React.useState<string>("");
  const [vehicleId, setVehicleId] = React.useState<string>("");
  const [paymentMethod, setPaymentMethod] =
    React.useState<PaymentMethod>("CASH");
  const [discount, setDiscount] = React.useState<number>(0);
  const [deposit, setDeposit] = React.useState<number>(0);
  const [vat, setVat] = React.useState<number>(10);
  const [notes, setNotes] = React.useState<string>("");
  const [extraItems, setExtraItems] = React.useState<ItemExtra[]>([]);
  const [notification, setNotification] = React.useState<NotificationsProps>({
    open: false,
    message: "",
    severity: "success"
  });
  const [order, setOrder] = React.useState<OrderData[]>([]);
  const [vehicle, setVehicle] = React.useState<Car[]>([]);
  const [dealer, setDealer] = React.useState<Dealer[]>([]);
  const [customer, setCustomer] = React.useState<CustomerVIP[]>([]);

  const router = useRouter();
  const maxQuantities = React.useMemo(() => {
    const quantities: { [itemName: string]: number } = {};

    if (orderId && order.length > 0) {
      const selectedOrder = order.find((o) => o.id === orderId);

      if (selectedOrder && selectedOrder.items) {
        selectedOrder.items.forEach((item) => {
          const itemName = item.vehicleVin || item.vehicleCode || "Xe điện";
          quantities[itemName] = item.quantity;
        });

        console.log("📊 Max quantities calculated:", quantities);
      }
    }

    return quantities;
  }, [orderId, order]);
  // ✅ AUTO-FILL LOGIC - Fetch OrderDetail when orderId changes
  // ✅ CLEANED UP - Auto-fill without deposit
  // ✅ Auto-fill from Order (CREATE MODE ONLY)
  useEffect(() => {
    const fetchOrderDetailAndAutoFill = async () => {
      if (!orderId || order.length === 0) return;

      const selectedOrder = order.find((o) => o.id === orderId);
      if (!selectedOrder) return;

      try {
        console.log("🔄 Fetching order detail for:", orderId);
        const orderDetail = await getOrderById(orderId);

        if (!orderDetail) {
          setNotification({
            open: true,
            message: "⚠️ Không thể tải chi tiết đơn hàng",
            severity: "warning"
          });
          return;
        }

        // ✅ 1. Auto-fill Customer
        if (orderDetail.customerId) {
          setBuyerId(orderDetail.customerId);
          console.log("✅ Customer ID auto-filled:", orderDetail.customerId);
        }

        // ✅ 2. Auto-fill Vehicle & Discount from Items
        if (orderDetail.items && orderDetail.items.length > 0) {
          const firstItem = orderDetail.items[0];

          const foundVehicle =
            vehicle.find((v) => v.vin === firstItem.vehicleVin) ||
            vehicle.find((v) => v.code === firstItem.vehicleCode);

          if (foundVehicle) {
            setVehicleId(foundVehicle.id);
            console.log("✅ Vehicle found:", foundVehicle.vin);
          } else {
            console.warn("⚠️ Vehicle not found for VIN:", firstItem.vehicleVin);
          }

          if (firstItem.discountAmount > 0) {
            setDiscount(firstItem.discountAmount);
          }

          // ✅ 3. Auto-fill Extra Items
          const mappedItems: ItemExtra[] = orderDetail.items.map((item) => ({
            itemName: item.vehicleVin || item.vehicleCode || "Xe điện",
            qty: item.quantity,
            unitPrice: item.unitPrice
          }));

          setExtraItems(mappedItems);
          console.log("✅ Extra items auto-filled:", mappedItems.length);
        }

        setNotification({
          open: true,
          message: `✅ Đã tự động điền thông tin từ đơn hàng ${orderDetail.orderNo}`,
          severity: "success"
        });
      } catch (error) {
        console.error("❌ Error:", error);
        setNotification({
          open: true,
          message: "❌ Có lỗi khi tải thông tin đơn hàng",
          severity: "error"
        });
      }
    };

    fetchOrderDetailAndAutoFill();
  }, [orderId, order, vehicle]); // ✅ Add contractId dependency

  // Fetch all initial data
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllContract();
        if (Array.isArray(response)) {
          setContractsList(response);
        } else {
          setContractsList([]);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchOrder = async () => {
      try {
        const response = await getAllOrder();
        if (Array.isArray(response)) {
          setOrder(response);
        } else {
          setOrder([]);
        }
      } catch (error) {
        console.error("Error", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchVehicle = async () => {
      try {
        const response = await searchFilter({});
        if (Array.isArray(response)) {
          setVehicle(response);
        } else {
          setVehicle([]);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchDealer = async () => {
      try {
        const response = await getAllDealer();
        if (Array.isArray(response)) {
          setDealer(response);
        } else {
          setDealer([]);
        }
      } catch (error) {
        console.error("Error", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCustomer = async () => {
      try {
        const response = await searchFilterCustomer({});
        if (Array.isArray(response)) {
          setCustomer(response);
        } else {
          setCustomer([]);
        }
      } catch (error) {
        console.error("Error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    fetchOrder();
    fetchVehicle();
    fetchDealer();
    fetchCustomer();
  }, []);

  // Handle create new contract
  const handleCreateContract = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (!orderId || !buyerId || !vehicleId) {
      setNotification({
        open: true,
        message: "⚠️ Vui lòng điền đầy đủ thông tin bắt buộc",
        severity: "error"
      });
      return;
    }

    try {
      setLoading(true);

      const response = await createContractModal({
        orderId,
        buyerId,
        vehicleId,
        paymentMethod,
        deposit,
        discount,
        vat,
        extraItems,
        notes
      });

      if (response) {
        setNotification({
          open: true,
          message: "✅ Tạo hợp đồng thành công",
          severity: "success"
        });

        // Reset form
        setOrderId("");
        setBuyerId("");
        setVehicleId("");
        setDeposit(0);
        setDiscount(0);
        setVat(0);
        setExtraItems([]);
        setNotes("");
        setIsCreateModalOpen(false);

        // Reload data
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        setNotification({
          open: true,
          message: "❌ Tạo hợp đồng thất bại",
          severity: "error"
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setNotification({
        open: true,
        message: "❌ Có lỗi xảy ra khi tạo hợp đồng",
        severity: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  // ECO Theme Stats
  const stats = [
    {
      title: "Tổng hợp đồng",
      value: contractsList.length,
      icon: <FaFileContract />,
      gradient: "bg-gradient-to-br from-emerald-400 to-green-600",
      percentage: "+12% so với tháng trước"
    },
    {
      title: "Đang thực hiện",
      value: contractsList.filter(
        (c) => c.status === "PENDING" || c.status === "DRAFT"
      ).length,
      icon: <FaClock />,
      gradient: "bg-gradient-to-br from-teal-400 to-cyan-600",
      percentage: "Đang hoạt động"
    },
    {
      title: "Hoàn thành",
      value: contractsList.filter((c) => c.status === "COMPLETED").length,
      icon: <FaCheckCircle />,
      gradient: "bg-gradient-to-br from-green-400 to-emerald-600",
      percentage: "+3 trong tuần này"
    },
    {
      title: "Giá trị tổng",
      value: `${(
        contractsList.reduce((sum, c) => {
          const realTotal =
            c.total && c.total > 0
              ? c.total
              : (c.subtotal - c.discount) * (1 + (c.vat || 0));
          return sum + realTotal;
        }, 0) / 1_000_000_000
      ).toFixed(2)}B VNĐ`,
      icon: <TrendingUp />,
      gradient: "bg-gradient-to-br from-lime-400 to-green-600",
      percentage: "Tổng giá trị"
    }
  ];

  // Filter contracts
  const filteredContracts = contractsList.filter((contract) => {
    const matchesSearch =
      contract.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.code?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || contract.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleClose = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  if (loading) return <Spinner />;

  // Download contract PDF
  const handleDownload = async (id: string) => {
    try {
      setLoading(true);

      const fileData = await handleDownloadFile(id);

      if (!fileData || typeof fileData !== "string") {
        throw new Error("Không nhận được đường dẫn file");
      }

      const fileUrl = fileData.startsWith("http")
        ? fileData
        : `${process.env.NEXT_PUBLIC_API_URL}${fileData}`;

      const response = await fetch(fileUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`
        }
      });

      if (!response.ok) {
        throw new Error("Không thể tải file PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `contract-${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      setNotification({
        open: true,
        message: "✅ Tải hợp đồng thành công",
        severity: "success"
      });
    } catch (error) {
      console.error("Download error:", error);
      setNotification({
        open: true,
        message: "❌ Không thể tải hợp đồng",
        severity: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id: string, reason: string) => {
    try {
      setLoading(true);
      const response = await handleCancelContract(id, reason);
      if (response) {
        setNotification({
          open: true,
          message: "✅ Hủy hợp đồng thành công",
          severity: "success"
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error("Error:", error);
      setNotification({
        open: true,
        message: "❌ Hủy hợp đồng thất bại",
        severity: "error"
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-20 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <div className="">
        {/* Header - ECO Theme */}
        <div className="mb-8 relative">
          <div className="absolute top-0 right-0 opacity-10">
            <Leaf className="w-32 h-32 text-emerald-600" />
          </div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-2">
            Quản lý hợp đồng
          </h1>
          <p className="text-gray-600 font-medium">
            Theo dõi và quản lý tất cả hợp đồng bán xe điện
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <StatsCard key={idx} {...stat} />
          ))}
        </div>

        {/* Search and Filter */}
        <SearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterStatus={filterStatus}
          onFilterChange={setFilterStatus}
          onCreateClick={() => setIsCreateModalOpen(true)}
        />

        {/* Contracts Table */}
        <ContractTable
          contracts={filteredContracts}
          onViewDetail={(id: string) =>
            router.push(`/dealer-manager/contract/${id}`)
          }
          vehicles={vehicle}
          onDownload={handleDownload}
          onCancel={(id: string, reason: string) => handleCancel(id, reason)}
        />

        {/* Create Contract Modal */}
        <CreateContractModal
          isOpen={isCreateModalOpen}
          onClose={() => {
            setIsCreateModalOpen(false);
            // Reset form when close
            setOrderId("");
            setBuyerId("");
            setVehicleId("");
            setDeposit(0);
            setDiscount(0);
            setVat(0);
            setExtraItems([]);
            setNotes("");
            setPaymentMethod("CASH");
          }}
          handleSubmit={handleCreateContract}
          orderId={orderId}
          setOrderId={setOrderId}
          buyerId={buyerId}
          setBuyerId={setBuyerId}
          vehicleId={vehicleId}
          setVehicleId={setVehicleId}
          paymentMethod={paymentMethod as "CASH" | "TRANSFER" | "CARD"}
          setPaymentMethod={setPaymentMethod}
          deposit={deposit}
          setDeposit={setDeposit}
          discount={discount}
          setDiscount={setDiscount}
          vat={vat}
          setVat={setVat}
          extraItems={extraItems}
          setExtraItems={setExtraItems}
          notes={notes}
          setNotes={setNotes}
          orders={order}
          vehicles={vehicle}
          dealers={dealer}
          customer={customer}
           maxQuantities={maxQuantities} // ✅ Pass maxQuantities
        />

        {/* Notification Snackbar */}
        <Snackbar
          open={notification.open}
          onClose={handleClose}
          TransitionComponent={SlideTransition}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={3000}
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
                notification.severity === "success"
                  ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                  : notification.severity === "warning"
                  ? "#f59e0b"
                  : notification.severity === "info"
                  ? "#3b82f6"
                  : "#ef4444",
              color: "white",
              fontWeight: "bold",
              borderRadius: "16px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              px: 3,
              py: 2,
              display: "flex",
              alignItems: "center",
              gap: 1.5
            }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default ContractPage;
