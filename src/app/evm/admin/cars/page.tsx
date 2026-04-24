"use client";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import CarTable from "./components/CarTable";
import AddCarModal from "./components/Modal";
import UpdateCarForm from "./components/UpdateCarForm";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
import { useRouter } from "next/navigation";
import {
  createVehicle,
  deleteVehicleById,
  searchFilter,
  ColorEnum,
  UpdateVehicle
} from "@/services/vehicle/vehicle";
import { getAllDealer } from "@/services/dealerService/dealerService";
import { getAllModel, Models, Enum } from "@/services/vehicleModel/vehicle";
import { Dealer } from "../dealerView/types/types";
import { TabId, Car } from "./types";
import { Slide, SlideProps, Snackbar, Alert } from "@mui/material";
import { CheckCircleIcon } from "lucide-react";
import ErrorIcon from "@mui/icons-material/Error";
import { generateVinForModel } from "@/utils/vinGenerator";

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

export default function EVManagementSystem() {
  useAuthGuard(["Administrator"]);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");

  // State xe
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);

  // State filter
  const [filterStatus, setFilterStatus] = useState("all");
  const [tempFilterStatus, setTempFilterStatus] = useState(filterStatus);
  const [filterModelId, setFilterModelId] = useState("");
  const [filterColor, setFilterColor] = useState<ColorEnum>("");
  const [filterVinContains, setFilterVinContains] = useState("");
  const [filterMinRangeKm, setFilterMinRangeKm] = useState(0);
  const [tempFilterMinRangeKm, setTempFilterMinRangeKm] = useState(0);
  const [filterDealerId, setFilterDealerId] = useState("");
  const [filterManufacturerName, setFilterManufacturerName] = useState("");
  const [filterVersion, setFilterVersion] = useState<Enum>("");

  // Modal add/update
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<UpdateVehicle | null>(null);

  // State modal add car
  const [vin, setVin] = useState("");
  const [mfgDate, setMfgDate] = useState("");
  const [batteryKwh, setBatteryKwh] = useState(0);
  const [rangeKm, setRangeKm] = useState(0);
  const [seat, setSeat] = useState(0);
  const [baseWarrantyMonths, setBaseWarrantyMonths] = useState(0);
  const [color, setColor] = useState("");
  const [version, setVersion] = useState("");
  const [modelId, setModelId] = useState("");
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  // Master data
  const [vehiclemodel, setVehiclemodel] = useState<Models[]>([]);
  const [dealer, setDealer] = useState<Dealer[]>([]);

  // Notification
  const [notification, setNotification] = useState<NotificationsProps>({
    open: false,
    message: "",
    severity: "success"
  });

  // Fetch master data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const carsResp = await searchFilter({});
        setCars(
          Array.isArray(carsResp)
            ? carsResp.sort((a, b) => a.price - b.price)
            : []
        );

        const modelResp = await getAllModel();
        setVehiclemodel(Array.isArray(modelResp) ? modelResp : []);

        const dealerResp = await getAllDealer();
        setDealer(Array.isArray(dealerResp) ? dealerResp : []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Auto generate VIN khi mở modal và chọn model
  useEffect(
    () => {
      if (isAddModalOpen && modelId)
        setVin(generateVinForModel(modelId, vehiclemodel));
    },
    [isAddModalOpen, modelId, vehiclemodel]
  );

  // Add new car
  const handleAddCar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("vin", vin);
      formData.append("color", color);
      formData.append("version", version);
      formData.append("mfgDate", new Date(mfgDate).toISOString());
      formData.append("batteryKwh", batteryKwh.toString());
      formData.append("rangeKm", rangeKm.toString());
      formData.append("seat", seat.toString());
      formData.append("baseWarrantyMonths", baseWarrantyMonths.toString());
      formData.append("modelId", modelId);
      if (imageFile) formData.append("imageFile", imageFile);
      const resp = await createVehicle(formData);
      if (resp) {
        setNotification({
          open: true,
          message: "Tạo xe thành công",
          severity: "success"
        });
        window.location.reload();
      } else {
        setNotification({
          open: true,
          message: "Tạo xe thất bại",
          severity: "error"
        });
      }
    } catch (error) {
      console.error(error);
      setNotification({
        open: true,
        message: "Tạo xe thất bại",
        severity: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete car
  const handleDelete = async (id: string) => {
    try {
      const resp = await deleteVehicleById(id);
      if (resp) {
        setNotification({
          open: true,
          message: "Đã xóa xe thành công",
          severity: "success"
        });
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      setNotification({
        open: true,
        message: "Xóa xe thất bại",
        severity: "error"
      });
    }
  };

  // Search/filter
  const handleSearchFilter = async () => {
    setFilterStatus(tempFilterStatus);
    setLoading(true);
    try {
      const resp = await searchFilter({
        modelId: filterModelId || undefined,
        status: filterStatus !== "all" ? filterStatus : undefined,
        color: filterColor || undefined,
        vinContains: filterVinContains || undefined,
        minRangeKm: tempFilterMinRangeKm,
        dealerId: filterDealerId || undefined,
        manufacturerName: filterManufacturerName || undefined,
        version: filterVersion
      });
      setCars(Array.isArray(resp) ? resp : []);
    } catch (error) {
      console.error(error);
      setNotification({
        open: true,
        message: "Không thể tìm kiếm xe",
        severity: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  const handleCloseNotification = () =>
    setNotification(prev => ({ ...prev, open: false }));

  // Metrics
  // const totalStock = cars.filter(c => c.status === "IN_STOCK").length;
  // const totalSold = cars.filter(c => c.status === "SOLD").length;

  return (
    <div className="mt-22 bg-gradient-to-br from-gray-50 to-gray-100">
      <Header onAddClick={() => setIsAddModalOpen(true)} />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      <main>
        <CarTable
          cars={cars}
          onClick={(id: string) => router.push(`/evm/admin/cars/${id}`)}
          onRowClick={(id: string) => {
            const car = cars.find(c => c.id === id);
            if (!car) return;
            setSelectedCar({
              id: car.id,
              color: car.color as ColorEnum,
              status: car.status,
              version: car.version as Enum,
              rangeKm: car.rangeKm
            });
            setIsUpdateModalOpen(true);
          }}
          onDelete={handleDelete}
          filterModelId={filterModelId}
          setFilterModelId={setFilterModelId}
          filterColor={filterColor}
          setFilterColor={setFilterColor}
          filterVinContains={filterVinContains}
          setFilterVinContains={setFilterVinContains}
          filterMinRangeKm={filterMinRangeKm}
          setFilterMinRangeKm={setFilterMinRangeKm}
          tempFilterMinRangeKm={tempFilterMinRangeKm}
          setTempFilterMinRangeKm={setTempFilterMinRangeKm}
          filterDealerId={filterDealerId}
          setFilterDealerId={setFilterDealerId}
          filterManufacturerName={filterManufacturerName}
          setFilterManufacturerName={setFilterManufacturerName}
          filterVersion={filterVersion}
          setFilterVersion={setFilterVersion}
          tempFilterStatus={tempFilterStatus}
          setTempFilterStatus={setTempFilterStatus}
          onSearchFilter={handleSearchFilter}
          dealer={dealer}
          model={vehiclemodel}
        />
      </main>

      <AddCarModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddCar={handleAddCar}
        vin={vin}
        setVin={setVin}
        mfgDate={mfgDate}
        setMfgDate={setMfgDate}
        batteryKwh={batteryKwh}
        setBatteryKwh={setBatteryKwh}
        rangeKm={rangeKm}
        setRangeKm={setRangeKm}
        seat={seat}
        setSeat={setSeat}
        baseWarrantyMonths={baseWarrantyMonths}
        setBaseWarrantyMonths={setBaseWarrantyMonths}
        color={color}
        setColor={setColor}
        version={version}
        setVersion={setVersion}
        modelId={modelId}
        setModelId={setModelId}
        vehiclemodel={vehiclemodel}
        imageFile={imageFile}
        setImageFile={setImageFile}
      />

      {isUpdateModalOpen &&
        selectedCar &&
        <UpdateCarForm
          isOpen={isUpdateModalOpen}
          onCancel={() => setIsUpdateModalOpen(false)}
          carData={selectedCar}
          onUpdate={updatedData => {
            setCars(prev =>
              prev.map(
                c => (c.id === updatedData.id ? { ...c, ...updatedData } : c)
              )
            );
            setNotification({
              open: true,
              message: "Cập nhật thành công!",
              severity: "success"
            });
            setIsUpdateModalOpen(false);
          }}
        />}

      <Snackbar
        open={notification.open}
        onClose={handleCloseNotification}
        TransitionComponent={SlideTransition}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={4000}
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
