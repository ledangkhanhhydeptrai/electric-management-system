"use client";
import React from "react";
import { CheckCircleIcon } from "lucide-react";
import { InventoryCard } from "./components/InventoryCard";
import { Car } from "../cars/types";
import { searchFilter } from "@/services/vehicle/vehicle";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
import { Alert, Slide, SlideProps, Snackbar } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { useRouter } from "next/navigation";

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
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-slate-50/90 via-blue-50/90 to-indigo-100/90 backdrop-blur-sm z-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-700 font-semibold text-lg">
          Đang tải kho xe...
        </p>
      </div>
    </div>
  );
}

interface NotificationsProps {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
}

export default function InventorySystem() {
  useAuthGuard(["EVM Staff"]);
  const router = useRouter();

  const [vehicles, setVehicles] = React.useState<Car[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [notification, setNotification] = React.useState<NotificationsProps>({
    open: false,
    message: "",
    severity: "success"
  });

  // Fetch vehicles
  const fetchVehicles = React.useCallback(async () => {
    try {
      setLoading(true);
      const response = await searchFilter({});
      setVehicles(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      setNotification({
        open: true,
        message: "❌ Không thể tải danh sách xe",
        severity: "error"
      });
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(
    () => {
      fetchVehicles();
    },
    [fetchVehicles]
  );

  // Auto refresh every 30s
  React.useEffect(
    () => {
      const interval = setInterval(() => {
        fetchVehicles();
      }, 30000);
      return () => clearInterval(interval);
    },
    [fetchVehicles]
  );

  const handleEdit = (carId: string) => {
    console.log("");
  };

  const handleDelete = async (carId: string) => {
    if (!confirm("Bạn có chắc muốn xóa xe này khỏi kho?")) return;

    try {
      setLoading(true);
      // await deleteCarById(carId);

      setNotification({
        open: true,
        message: "🗑️ Đã xóa xe thành công",
        severity: "success"
      });

      await fetchVehicles();
    } catch (error) {
      console.error("Error:", error);
      setNotification({
        open: true,
        message: "❌ Xóa xe thất bại",
        severity: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => setNotification(prev => ({ ...prev, open: false }));

  if (loading) return <Spinner />;

  return (
    <div className="mt-21 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-[1800px] mx-auto">
        {/* Refresh Button - Fixed Position */}
        {/* <div className="fixed bottom-8 right-8 z-40">
          <button
            onClick={fetchVehicles}
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-2xl hover:shadow-blue-500/50 hover:scale-110 transition-all duration-200 font-semibold"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Làm mới</span>
          </button>
        </div> */}

        {/* Inventory Card */}
        <InventoryCard
          cars={vehicles}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onClick={id => router.push(`/evm/staff/cars/${id}`)}
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
                notification.severity === "success" ? "#3b82f6" : "#ef4444",
              color: "white",
              fontWeight: "bold",
              borderRadius: "12px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              px: 2.5,
              py: 1.5
            }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
