"use client";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Package, CheckCircleIcon } from "lucide-react";
import {
  DealerOrderData,
  getAllDealerOrder,
  updateOrderDealerByApprove,
  updateOrderDealerByReject
} from "@/services/dealerOrderService/dealerOrder";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
import { Alert, Slide, SlideProps, Snackbar } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { AxiosError } from "axios";
import { OrderFilters } from "./components/OrderFilters";
import { OrderCard } from "./components/OrderCard";
import { createInventories } from "@/services/inventoriesService/inventories";
import { getAllModel, Models } from "@/services/vehicleModel/vehicle";
import { CreateInventoryModal } from "../inventories/components/CreateInventoryModal";
import { Dealer } from "../dealerView/types/types";
import { Car } from "../cars/types";
import { searchFilter } from "@/services/vehicle/vehicle";
import { getAllDealer } from "@/services/dealerService/dealerService";

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

const DealerOrder: React.FC = () => {
  useAuthGuard(["Administrator"]);
  const router = useRouter();
  const [data, setData] = useState<DealerOrderData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [notification, setNotification] = useState<NotificationsProps>({
    open: false,
    message: "",
    severity: "success"
  });
  const [loading, setLoading] = useState<boolean>(false);

  // Inventory Modal
  const [inventoryModalOpen, setInventoryModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<DealerOrderData | null>(
    null
  );
  const [dealerId, setDealerId] = useState("");
  const [modelId, setModelId] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [models, setModels] = React.useState<Models[]>([]);
  const [vehicles, setVehicles] = React.useState<Car[]>([]);
  const [dealers, setDealers] = React.useState<Dealer[]>([]);
  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getAllDealerOrder();
        if (Array.isArray(response)) setData(response);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    const fetchModel = async () => {
      try {
        const response = await getAllModel();
        if (Array.isArray(response)) {
          setModels(response);
        } else {
          setModels([]);
        }
      } catch (error) {
        console.error("Error", error);
      }
    };
    const fetchVehicles = async () => {
      try {
        const response = await searchFilter({});
        if (Array.isArray(response)) {
          setVehicles(response);
        } else {
          setVehicles([]);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    const fetchDealer = async () => {
      try {
        const response = await getAllDealer();
        if (Array.isArray(response)) {
          setDealers(response);
        } else {
          setDealers([]);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchDealer();
    fetchVehicles();
    fetchModel();
    fetchData();
  }, []);

  const handleCloseNotification = () =>
    setNotification((prev) => ({ ...prev, open: false }));

  const toggleExpand = (orderId: string) =>
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);

  const filteredOrders = useMemo(() => {
    return data.filter((order) => {
      const matchesSearch =
        order.dealerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.staffName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some((item) =>
          item.modelName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesStatus =
        filterStatus === "ALL" || order.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [data, searchTerm, filterStatus]);

  // =========================
  // QUICK APPROVE + OPEN INVENTORY
  // =========================
  const handleQuickApprove = async (order: DealerOrderData) => {
    setLoading(true);
    try {
      const response = await updateOrderDealerByApprove(order.id);
      if (response) {
        setSelectedOrder(order);
        setDealerId(order.dealerId); // <- thêm dòng này
        setInventoryModalOpen(true);
        setNotification({
          open: true,
          message:
            "Đơn hàng đã được phê duyệt. Vui lòng điều phối sản phẩm vào kho.",
          severity: "success"
        });

        const refreshedOrders = await getAllDealerOrder();
        if (Array.isArray(refreshedOrders)) setData(refreshedOrders);
      }
    } catch (err) {
      const errors = err as AxiosError;
      setNotification({
        open: true,
        message: errors.message || "Có lỗi xảy ra khi duyệt đơn hàng",
        severity: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // QUICK REJECT
  // =========================
  const handleQuickReject = async (orderId: string, reason: string) => {
    if (!reason.trim()) {
      setNotification({
        open: true,
        message: "Nhập lý do từ chối",
        severity: "warning"
      });
      return;
    }
    setLoading(true);
    try {
      const response = await updateOrderDealerByReject(orderId, reason);
      if (response) {
        setNotification({
          open: true,
          message: "Đã từ chối đơn hàng",
          severity: "success"
        });
        const refreshedOrders = await getAllDealerOrder();
        if (Array.isArray(refreshedOrders)) setData(refreshedOrders);
      }
    } catch (err) {
      const errors = err as AxiosError;
      setNotification({
        open: true,
        message: errors.message || "Có lỗi xảy ra",
        severity: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // SUBMIT INVENTORY FORM
  // =========================
  const handleSubmitInventory = async ({
    modelId,
    vehicleId,
    quantity
  }: {
    dealerId: string;
    modelId: string;
    vehicleId: string;
    quantity: number;
  }) => {
    if (!selectedOrder) return;

    setLoading(true);
    try {
      await createInventories({
        dealerId: selectedOrder.dealerId,
        modelId,
        vehicleId,
        quantity
      });
      setNotification({
        open: true,
        message: "Điều phối thành công",
        severity: "success"
      });

      // refresh đơn hàng và inventory
      const refreshedOrders = await getAllDealerOrder();
      if (Array.isArray(refreshedOrders)) setData(refreshedOrders);
    } catch (err) {
      console.error(err);
      setNotification({
        open: true,
        message: "Điều phối thất bại",
        severity: "error"
      });
    } finally {
      setInventoryModalOpen(false);
      setDealerId("");
      setModelId("");
      setVehicleId("");
      setQuantity(0);
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="mt-22 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Quản Lý Đơn Hàng Đại Lý
        </h1>
        <p className="text-gray-600">
          Theo dõi và quản lý đơn hàng từ các đại lý
        </p>
      </div>

      {/* Filters */}
      <OrderFilters
        searchTerm={searchTerm}
        filterStatus={filterStatus}
        onSearchChange={setSearchTerm}
        onStatusChange={setFilterStatus}
      />

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center backdrop-blur-lg bg-opacity-90">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Không tìm thấy đơn hàng nào</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              isExpanded={expandedOrderId === order.id}
              onToggleExpand={() => toggleExpand(order.id)}
              onQuickApprove={() => handleQuickApprove(order)}
              onQuickReject={() =>
                handleQuickReject(order.id, "Lý do từ chối nhanh")
              }
              onViewDetail={() =>
                router.push(`/evm/admin/dealerOrder/${order.id}`)
              }
              onApprove={() => handleQuickApprove(order)} // hoặc callback riêng nếu muốn khác
              onReject={() => handleQuickReject(order.id, "Lý do từ chối")} // callback riêng
            />
          ))
        )}
      </div>

      {/* Inventory Modal */}
      {selectedOrder && (
        <CreateInventoryModal
          isOpen={inventoryModalOpen}
          onClose={() => setInventoryModalOpen(false)}
          dealers={dealers}
          vehicles={vehicles}
          model={models}
          dealerId={dealerId}
          setDealerId={setDealerId}
          modelId={modelId}
          setModelId={setModelId}
          vehicleId={vehicleId}
          setVehicleId={setVehicleId}
          quantity={quantity}
          setQuantity={setQuantity}
          onSubmit={handleSubmitInventory}
        />
      )}

      {/* Notification */}
      <Snackbar
        open={notification.open}
        onClose={handleCloseNotification}
        TransitionComponent={SlideTransition}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={3000}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          variant="filled"
          iconMapping={{
            success: <CheckCircleIcon fontSize="small" />,
            error: <ErrorIcon fontSize="small" />
          }}
          sx={{
            borderRadius: "12px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            fontWeight: "600"
          }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default DealerOrder;
