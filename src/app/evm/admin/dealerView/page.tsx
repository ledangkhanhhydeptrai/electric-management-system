"use client";
import React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import {
  Plus,
  Search,
  Download,
  Check,
  Building2,
  CheckCircleIcon
} from "lucide-react";
import { Dealer, UpdateDealer } from "./types/types";
import {
  createDealer,
  getAllDealer,
  updateDealerById
} from "@/services/dealerService/dealerService";
import { Alert, Slide, SlideProps, Snackbar } from "@mui/material";
import LoadingSpinner from "./LoadingSpinner";
import DealerStats from "./components/DealerStats";
import DealerSearchBar from "./components/DealerSearchBar";
import DealerList from "./components/DealerList";
import DealerModal from "./components/DealerModal";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
import { CreateInventoryModal } from "../inventories/components/CreateInventoryModal";
import { Car } from "../cars/types";
import { getAllModel, Models } from "@/services/vehicleModel/vehicle";
import { createInventories } from "@/services/inventoriesService/inventories";
import { searchFilter } from "@/services/vehicle/vehicle";
import { AxiosError } from "axios";

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

export default function DealersView() {
  useAuthGuard(["Administrator"]);
  const [dealers, setDealers] = React.useState<Dealer[]>([]);
  const [showModal, setShowModal] = React.useState(false);
  const [model, setModel] = React.useState<Models[]>([]);
  const [modalType, setModalType] = React.useState<
    "add" | "view" | "edit" | ""
  >("");
  const [selectedDealer, setSelectedDealer] = React.useState<Dealer | null>(
    null
  );
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [showToast, setShowToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");
  const [code, setCode] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [address, setAddress] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(true);
  const [dealer, setDealer] = React.useState<Dealer[]>([]);
  const [vehicle, setVehicle] = React.useState<Car[]>([]);
  const [name, setName] = React.useState<string>("");
  const [quantity, setQuantity] = React.useState<number>(0);
  const [dealerId, setDealerId] = React.useState<string>("");
  const [vehicleId, setVehicleId] = React.useState<string>("");
  const [modelId, setModelId] = React.useState<string>("");

  const [notification, setNotification] = React.useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({
    open: false,
    message: "",
    severity: "success"
  });

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
      console.error("Error creating inventory:", error);
      setNotification({
        open: true,
        message: "Có lỗi xảy ra khi tạo inventory!",
        severity: "error"
      });
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    const fetchDealer = async () => {
      try {
        const response = await getAllDealer();
        if (Array.isArray(response)) {
          setDealer(response);
        } else {
          setDealer([]);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchDealer();
  }, []);
  const handleClose = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await createDealer({
        code,
        name,
        phone,
        email,
        address
      });
      if (response) {
        setNotification({
          open: true,
          message: response.message || "Tạo đại lý thành công",
          severity: "success"
        });
        // keep original behavior: reload page
        window.location.reload();
      }
    } catch (error) {
      const errors = error as AxiosError;
      console.error("Error:", errors);
      const message = errors.message || "Có lỗi xảy ra";
      setNotification({
        open: true,
        message: message,
        severity: "error"
      });
    }
  };

  const showNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // ✅ FIX: openModal chỉ cần set modalType và selectedDealer, useEffect trong DealerModal sẽ lo việc load data
  const openModal = (
    type: "add" | "view" | "edit",
    dealer: Partial<Dealer> | null = null
  ) => {
    console.log("Opening modal:", { type, dealer });
    setModalType(type);
    setSelectedDealer(dealer as Dealer | null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType("");
    setSelectedDealer(null);
  };

  const handleEdit = async (id: string, data: UpdateDealer) => {
    try {
      const response = await updateDealerById(id, data);
      const res = response as
        | { success?: boolean; message?: string }
        | null
        | undefined;
      if (res) {
        setNotification({
          open: true,
          message: res.message || "Cập nhật thành công",
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
      console.error("Error updating dealer:", error);
      setNotification({
        open: true,
        message: "Cập nhật thất bại",
        severity: "error"
      });
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Bạn có chắc muốn xóa đại lý "${name}"?`)) {
      setDealers((prev) => prev.filter((d) => d.id !== id));
      showNotification(`✅ Đã xóa đại lý "${name}"`);
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getAllDealer();
        if (Array.isArray(response)) setDealers(response);
        else setDealers([]);
      } catch (error) {
        console.error("Error fetching dealers:", error);
      } finally {
        setLoading(false);
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
    fetchData();
    fetchVehicle();
    fetchModel();
  }, []);

  if (loading) return <LoadingSpinner />;

  const filteredDealers = dealers.filter((dealer) => {
    const matchesSearch =
      dealer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dealer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dealer.phone.includes(searchQuery) ||
      dealer.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="mt-21 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
              <Building2 className="w-10 h-10 text-blue-600" />
              Quản lý đại lý
            </h1>
            <p className="text-gray-600 mt-2">
              Quản lý thông tin liên hệ đại lý
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => showNotification("📥 Đang xuất dữ liệu...")}
              className="bg-white border-2 border-gray-300 text-gray-700 px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm font-medium"
            >
              <Download className="w-4 h-4" /> Xuất Excel
            </button>
            <button
              onClick={() => openModal("add")}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl font-medium"
            >
              <Plus className="w-5 h-5" /> Thêm đại lý
            </button>
          </div>
        </div>

        <DealerStats dealers={dealers} />

        <DealerSearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          // onAdd={() => openModal("add")}
        />

        {searchQuery && (
          <div className="text-sm text-gray-700 bg-blue-50 border-2 border-blue-200 px-5 py-3 rounded-xl inline-flex items-center gap-2 font-medium">
            <Search className="w-4 h-4 text-blue-600" /> Tìm thấy{" "}
            <span className="font-bold text-blue-600">
              {filteredDealers.length}
            </span>{" "}
            kết quả
          </div>
        )}

        <DealerList
          dealers={filteredDealers}
          onEdit={(d) => openModal("edit", d)}
          onDelete={handleDelete}
          // onDispatch={(dealer) => {
          //   setDealerId(dealer.id); // set dealerId cho modal
          //   setIsModalOpen(true); // bật modal
          // }}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery("")}
          onAdd={() => openModal("add")}
        />

        <DealerModal
          isOpen={showModal}
          onClose={closeModal}
          modalType={modalType}
          selectedDealer={selectedDealer}
          code={code}
          setCode={setCode}
          name={name}
          setName={setName}
          phone={phone}
          setPhone={setPhone}
          email={email}
          setEmail={setEmail}
          address={address}
          setAddress={setAddress}
          handleSubmit={handleSubmit}
          handleUpdateDealer={handleEdit}
        />
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
        {showToast && (
          <div className="fixed bottom-6 right-6 bg-gray-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-in slide-in-from-right-5 duration-300">
            <Check className="w-5 h-5 text-green-400" />
            <p className="font-medium">{toastMessage}</p>
          </div>
        )}
      </div>

      <Snackbar
        open={notification.open}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={4000}
      >
        <Alert
          onClose={handleClose}
          severity={notification.severity === "success" ? "success" : "error"}
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
