"use client";
import React from "react";
import {
  Truck,
  AlertTriangle,
  CheckCircle,
  Package,
  CheckCircleIcon
} from "lucide-react";
import { Header } from "./components/Header";
import { StatCard } from "./components/StatCard";
import { SearchFilter } from "./components/SearchFilter";
import { InventoryCard } from "./components/InventoryCard";
import { EmptyState } from "./components/EmptyState";
import { CreateInventoryModal } from "./components/CreateInventoryModal";
import { InventoryItem } from "./types/types";
import {
  createInventories,
  DeleteInventoryById,
  getAllInventories,
  UpdateInventoryById
} from "@/services/inventoriesService/inventories";
import { getAllDealer } from "@/services/dealerService/dealerService";
import { Dealer } from "../dealerView/types/types";

import { searchFilter } from "@/services/vehicle/vehicle";
import { Alert, Slide, SlideProps, Snackbar } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { useRouter } from "next/navigation";
import UpdateInventoryModal from "./components/UpdateInventoryModal";
import { getAllModel, Models } from "@/services/vehicleModel/vehicle";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
import { AxiosError } from "axios";
import { Car } from "@/app/evm/admin/cars/types";
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

export default function InventorySystem() {
  useAuthGuard(["Dealer Manager"]);
  const [data, setData] = React.useState<InventoryItem[]>([]);
  const [selectedItem, setSelectedItem] = React.useState<InventoryItem | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] =
    React.useState<boolean>(false);
  const [dealer, setDealer] = React.useState<Dealer[]>([]);
  const [vehicle, setVehicle] = React.useState<Car[]>([]);
  const [name, setName] = React.useState<string>("");
  const [quantity, setQuantity] = React.useState<number>(0);
  const [qtyReserved, setQtyReserved] = React.useState<number>(0);
  const [qtyIncoming, setQtyIncoming] = React.useState<number>(0);
  const [dealerId, setDealerId] = React.useState<string>("");
  const [vehicleId, setVehicleId] = React.useState<string>("");
  const [modelId, setModelId] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [model, setModel] = React.useState<Models[]>([]);
  const [notification, setNotification] = React.useState<NotificationsProps>({
    open: false,
    message: "",
    severity: "success"
  });

  const router = useRouter();
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await getAllInventories();
      if (Array.isArray(response)) {
        setData(response);
      } else {
        setData([]);
      }
    };
    const fetchDealer = async () => {
      const response = await getAllDealer();
      if (Array.isArray(response)) {
        setDealer(response);
      } else {
        setDealer([]);
      }
    };
    const fetchVehicle = async () => {
      const response = await searchFilter({});
      if (Array.isArray(response)) {
        setVehicle(response);
      } else {
        setVehicle([]);
      }
    };
    const fetchModel = async () => {
      const response = await getAllModel();
      if (Array.isArray(response)) {
        setModel(response);
      } else {
        setModel([]);
      }
    };
    fetchModel();
    fetchData();
    fetchDealer();
    fetchVehicle();
  }, []);

  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [filterStatus, setFilterStatus] = React.useState<string>("all");

  const handleCreateInventory = async (data: {
    dealerId: string;
    vehicleId: string;
    modelId: string;
    quantity: number;
  }) => {
    setLoading(true);
    try {
      const response = await createInventories({
        quantity: data.quantity,
        modelId: data.modelId,
        dealerId: data.dealerId,
        vehicleId: data.vehicleId
      });

      if (response) {
        setNotification({
          open: true,
          message: "Tạo kho xe thành công",
          severity: "success"
        });
        window.location.reload();
      } else {
        setNotification({
          open: true,
          message: "Tạo kho xe thất bại",
          severity: "error"
        });
      }
    } catch (error) {
      const errors = error as AxiosError;
      console.error("Error creating inventory:", errors);
      setNotification({
        open: true,
        message: errors.message || "Có lỗi xảy ra khi tạo inventory!",
        severity: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (
    id: string,
    data: {
      name: string;
      quantity: number;
      qtyReserved: number;
      qtyIncoming: number;
    }
  ) => {
    console.log("Updating inventory id:", id);
    console.log("Payload:", { name, quantity, qtyReserved, qtyIncoming });

    try {
      const response = await UpdateInventoryById(id, data);
      if (response) {
        setNotification({
          open: true,
          message: "Cập nhật kho thành công",
          severity: "success"
        });
        // Cập nhật data trực tiếp thay vì reload
        window.location.reload();
        setIsUpdateModalOpen(false);
      }
    } catch (error) {
      console.error("Error", error);
      setNotification({
        open: true,
        message: "Cập nhật kho thất bại",
        severity: "error"
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await DeleteInventoryById(id);
      if (response) {
        setNotification({
          open: true,
          message: "Xóa kho thành công",
          severity: "success"
        });
        window.location.reload();
      }
    } catch (error) {
      console.error("Error:", error);
      setNotification({
        open: true,
        message: "Xóa kho thất bại",
        severity: "error"
      });
    }
  };
  // Tính toán tổng số liệu
  const totalQuantity = data.reduce((sum, item) => sum + item.qtyOnHand, 0);
  const totalLowStock = data.filter((item) => item.qtyOnHand <= 0).length; // ví dụ low stock < 1
  const totalNormalStock = data.filter(
    (item) => item.qtyOnHand > 0 && item.qtyOnHand < item.available
  ).length;
  const totalFullStock = data.filter(
    (item) => item.qtyOnHand >= item.available
  ).length;

  // Filter data
  const filteredData = data
  .filter(item => item.dealerId !== "58249b1e-84fc-463d-8fee-3ed3fed7754d") // ẩn kho cụ thể
  .filter(item => {
    const matchesSearch =
      (item.name?.toUpperCase() ?? "").includes(searchTerm.toUpperCase()) ||
      (item.vehicleModelName?.toUpperCase() ?? "").includes(searchTerm.toUpperCase()) ||
      (item.dealerName?.toUpperCase() ?? "").includes(searchTerm.toUpperCase());
    if (filterStatus === "all") return matchesSearch;
    return matchesSearch;
  });
  if (loading) {
    return <Spinner />;
  }
  const handleClose = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <div className="mt-21 bg-gradient-to-br from-blue-50 to-gray-100">
      <Header
        totalItems={data.length}
        message=""
        onCreateInventory={() => setIsModalOpen(true)}
      />

      {/* Summary Stats */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            label="Tổng số xe"
            value={totalQuantity}
            icon={<Truck className="w-6 h-6 text-blue-600" />}
            iconBgColor="bg-blue-100"
            valueColor="text-gray-900"
          />
          <StatCard
            label="Tồn kho thấp"
            value={totalLowStock}
            icon={<AlertTriangle className="w-6 h-6 text-red-600" />}
            iconBgColor="bg-red-100"
            valueColor="text-red-600"
          />
          <StatCard
            label="Bình thường"
            value={totalNormalStock}
            icon={<Package className="w-6 h-6 text-blue-600" />}
            iconBgColor="bg-blue-100"
            valueColor="text-blue-600"
          />
          <StatCard
            label="Đầy kho"
            value={totalFullStock}
            icon={<CheckCircle className="w-6 h-6 text-green-600" />}
            iconBgColor="bg-green-100"
            valueColor="text-green-600"
          />
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Danh sách tồn kho
        </h2>

        {/* <button
          onClick={() => setIsModalOpen(true)} // mở modal điều phối
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white rounded-xl font-semibold hover:shadow-lg transform transition-all"
        >
          <Package className="w-4 h-4" />
          <span>Điều phối xe</span>
        </button> */}
      </div>
      <SearchFilter
        searchTerm={searchTerm}
        filterStatus={filterStatus}
        onSearchChange={setSearchTerm}
        onFilterChange={setFilterStatus}
      />

      {/* Inventory Cards */}
      <div className="max-w-7xl mx-auto">
        <div className="space-y-6">
          {filteredData.map((item) => (
            <InventoryCard
              key={item.id}
              items={[item]} // ✅ wrap in array
              onView={() =>
                router.push(`/dealer-manager/inventories/${item.id}`)
              }
              onEdit={() => {
                setSelectedItem(item);
                setName(item.name || "");
                setQuantity(item.qtyOnHand);
                setQtyReserved(0);
                setQtyIncoming(item.available || 0);
                setIsUpdateModalOpen(true);
              }}
              onDelete={() => handleDelete(item.id)}
              dealers={dealer}
            />
          ))}
        </div>

        {filteredData.length === 0 && <EmptyState />}
      </div>

      {/* Create Inventory Modal */}
      <CreateInventoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateInventory}
        dealers={dealer}
        vehicles={vehicle}
        quantity={quantity}
        setQuantity={setQuantity}
        dealerId={dealerId}
        setDealerId={setDealerId}
        vehicleId={vehicleId}
        setVehicleId={setVehicleId}
        model={model}
        modelId={modelId}
        setModelId={setModelId}
      />
      <UpdateInventoryModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        handleUpdate={(id, data) => handleUpdate(id, data)}
        name={name}
        setName={setName}
        quantity={quantity}
        setQuantity={setQuantity}
        qtyReserved={qtyReserved}
        setQtyReserved={setQtyReserved}
        qtyIncoming={qtyIncoming}
        setQtyIncoming={setQtyIncoming}
        selectedId={selectedItem?.id || null}
        item={selectedItem} // truyền toàn bộ item
      />

      {/* <DispatchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem}
        onSubmit={handleDispatchSubmit}
        dealers={dealer} // Danh sách đại lý
      /> */}
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
}
