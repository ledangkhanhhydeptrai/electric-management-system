"use client";
import React, { useState } from "react";
import { EVModel } from "@/app/types/EV/EVModel";
import { EVVersion } from "@/app/types/EV/EVVersion";
import DashboardHeader from "./components/DashboardHeader";
import SearchFilters from "./components/SearchFilters";
import ModelsTable from "./components/ModelsTable";
import ModelModal from "./components/ModelModal";
import VersionModal from "./components/VersionModal";
import { Alert, Slide, SlideProps, Snackbar } from "@mui/material";
import {
  createModel,
  deleteModelById,
  getAllModel,
  updateModelById
} from "@/services/vehicleModel/vehicle";
import { CheckCircleIcon } from "lucide-react";
import ErrorIcon from "@mui/icons-material/Error";
import LoadingSpinner from "./components/LoadingSpinner";
import ModelModalUpdate from "./components/ModelModalUpdate";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
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
export default function EVManagementDashboard() {
  useAuthGuard(["Administrator"]);
  const [models, setModels] = useState<EVModel[]>([]);
  const [showModelModal, setShowModelModal] = useState(false);
  const [showVersionModal, setShowVersionModal] = useState(false);
  const [editingModel, setEditingModel] = useState<EVModel | null>(null);
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [editingVersion, setEditingVersion] = useState<{
    modelId: string;
    version: EVVersion | null;
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [name, setName] = React.useState<string>("");
  const [year, setYear] = React.useState<number>(0);
  const [horsepower, setHorsepower] = React.useState<number>(0);
  const [version, setVersion] = React.useState<"ECO" | "PLUS" | "PREMIUM">(
    "ECO"
  );
  const [rangeKm, setRangeKm] = React.useState<number>(0);
  const [batteryCapacity, setBatteryCapacity] = React.useState<number>(0);
  const [description, setDescription] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [basePrice, setBasePrice] = React.useState<number>(0);
  const [notification, setNotification] = React.useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({
    open: false,
    message: "",
    severity: "success"
  });
  React.useEffect(() => {
    if (editingModel) {
      // car là object từ DB bạn muốn edit
      setBasePrice(editingModel.basePrice);
    }
  }, [editingModel]);
  React.useEffect(() => {
    const fetchModel = async () => {
      const response = await getAllModel();
      if (Array.isArray(response)) {
        setModels(response.sort((a, b) => a.year - b.year));
      } else {
        setModels([]);
      }
    };
    fetchModel();
  }, []);
  const handleClose = () => {
    setNotification((p) => ({ ...p, open: false }));
  };
  // Filter models
  const filteredModels = models.filter((model) => {
    const matchesSearch = model.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  // ============================================================================
  // MODEL CRUD
  // ============================================================================
  function addModel() {
    setEditingModel(null);
    setShowModelModal(true);
  }
  function handleEditModel(model: EVModel) {
    setEditingModel(model);
    setName(model.name);
    setYear(model.year);
    setHorsepower(model.horsepower);
    setVersion(model.version as "ECO" | "PLUS" | "PREMIUM");
    setRangeKm(model.rangeKm);
    setBatteryCapacity(model.batteryCapacity);
    setDescription(model.description);
    setShowModelModal(true);
  }

  async function saveModel() {
    setLoading(true);
    try {
      if (editingModel) {
        const response = await updateModelById(editingModel.id, {
          name,
          year,
          horsepower,
          rangeKm,
          batteryCapacity,
          description,
          basePrice
        });
        if (response) {
          setNotification({
            open: true,
            message:
              (response as { message?: string }).message ||
              "Cập nhật model thành công",
            severity: "success"
          });
          window.location.reload();
        }
      } else {
        try {
          const response = await createModel({
            name,
            year,
            horsepower,
            version,
            rangeKm,
            batteryCapacity,
            description,
            basePrice,
            imageFile
          });

          if (response) {
            setNotification({
              open: true,
              message: response.message || "Tạo model thành công",
              severity: "success"
            });
          }

          window.location.reload();
        } catch (err) {
          const errors = err as AxiosError;
          console.error("❌ Error:", errors);

          const message = errors?.message || "Tạo model thất bại";

          setNotification({
            open: true,
            message,
            severity: "error"
          });
        }
      }
    } catch (err) {
      console.error("Error:", err);
      setNotification({
        open: true,
        message: "Có lỗi xảy ra",
        severity: "error"
      });
    } finally {
      setShowModelModal(false);
      setEditingModel(null);
      setLoading(false);
    }
  }

  async function deleteModel(id: string) {
    if (!confirm("Bạn có chắc muốn xóa model này?")) return;

    try {
      const response = await deleteModelById(id);
      if (response !== undefined) {
        setNotification({
          open: true,
          message: "Xóa model thành công",
          severity: "success"
        });
        // Cập nhật state local để xóa model khỏi bảng ngay lập tức
        setModels((prev) => prev.filter((m) => m.id !== id));
      } else {
        setNotification({
          open: true,
          message: "Xóa model thất bại",
          severity: "error"
        });
      }
    } catch (err) {
      console.error("Error:", err);
      setNotification({
        open: true,
        message: "Có lỗi xảy ra khi xóa model",
        severity: "error"
      });
    }
  }

  // ============================================================================
  // VERSION CRUD
  // ============================================================================
  function saveVersion() {
    if (!editingVersion?.version || !editingVersion.version.name) {
      alert("Vui lòng điền tên phiên bản");
      return;
    }
    setShowVersionModal(false);
    setEditingVersion(null);
  }
  if (loading) return <LoadingSpinner />;
  return (
    <div className="mt-20">
      <div className="">
        {/* Header */}
        <DashboardHeader onAddModel={addModel} />

        {/* Stats Cards */}
        {/* <StatsCards
          totalModels={stats.totalModels}
          totalVersions={stats.totalVersions}
          avgPrice={stats.avgPrice}
          avgRange={stats.avgRange}
        /> */}

        {/* Filters & Search */}
        <SearchFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterCategory={filterCategory}
          onFilterChange={setFilterCategory}
        />

        {/* Models Table */}
        <ModelsTable
          models={filteredModels}
          onEditModel={handleEditModel}
          onDeleteModel={deleteModel}
        />
      </div>

      {/* Create/Edit Model Modal */}

      {editingModel ? (
        <ModelModalUpdate
          isOpen={showModelModal}
          basePrice={basePrice}
          setBasePrice={setBasePrice}
          onClose={() => {
            setShowModelModal(false);
            setEditingModel(null);
          }}
          onSave={saveModel}
          editingModel={editingModel}
          name={name}
          setName={setName}
          year={year}
          setYear={setYear}
          horsepower={horsepower}
          setHorsepower={setHorsepower}
          rangeKm={rangeKm}
          setRangeKm={setRangeKm}
          batteryCapacity={batteryCapacity}
          setBatteryCapacity={setBatteryCapacity}
          description={description}
          setDescription={setDescription}
        />
      ) : (
        <ModelModal
          isOpen={showModelModal}
          onClose={() => {
            setShowModelModal(false);
            setEditingModel(null);
          }}
          onSave={saveModel}
          name={name}
          setName={setName}
          year={year}
          setYear={setYear}
          horsepower={horsepower}
          setHorsepower={setHorsepower}
          version={version}
          setVersion={(v: string) =>
            setVersion(v as "ECO" | "PLUS" | "PREMIUM")
          }
          rangeKm={rangeKm}
          setRangeKm={setRangeKm}
          batteryCapacity={batteryCapacity}
          setBatteryCapacity={setBatteryCapacity}
          description={description}
          setDescription={setDescription}
          basePrice={basePrice}
          setBasePrice={setBasePrice}
          imageFile={imageFile}
          setImageFile={setImageFile}
        />
      )}
      {/* Create/Edit Version Modal */}
      <VersionModal
        isOpen={showVersionModal}
        version={editingVersion?.version || null}
        onClose={() => {
          setShowVersionModal(false);
          setEditingVersion(null);
        }}
        onSave={saveVersion}
        onChange={(version) =>
          setEditingVersion((prev) => (prev ? { ...prev, version } : null))
        }
      />
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
