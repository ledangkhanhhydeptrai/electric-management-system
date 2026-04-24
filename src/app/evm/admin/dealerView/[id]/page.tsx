"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { Dealer } from "../types/types";
import { useParams } from "next/navigation";
import { getDealerById } from "@/services/dealerService/dealerService";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
import { Alert, Slide, SlideProps, Snackbar } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { LoadingState } from "./components/LoadingState";
import { ErrorState } from "./components/ErrorState";
import { DealerHeader } from "./components/DealerHeader";
import { ContactInfoCards } from "./components/ContactInfoCards";
import { DealerStatistics } from "./components/DealerStatistics";
import { Notification } from "./components/types";

// ============================================
// HELPER FUNCTIONS
// ============================================
const formatDateTime = (dateStr: string): string => {
  if (!dateStr) return "N/A";
  const match = dateStr.match(
    /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/
  );
  if (!match) return "N/A";
  const [, year, month, day] = match;
  return `${day}/${month}/${year}`;
};

const getRelativeTime = (dateStr: string): string => {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "N/A";

  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Hôm nay";
  if (diffDays === 1) return "Hôm qua";
  if (diffDays < 7) return `${diffDays} ngày trước`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} tuần trước`;
  return `${Math.floor(diffDays / 30)} tháng trước`;
};

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

// ============================================
// MAIN COMPONENT
// ============================================
const DealerId: React.FC = () => {
  useAuthGuard(["Administrator"]);
  const { id } = useParams();

  // States
  const [dealer, setDealer] = useState<Dealer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [notification, setNotification] = useState<Notification>({
    open: false,
    message: "",
    severity: "success"
  });

  // Fetch dealer data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getDealerById(String(id));
        if (response) {
          setDealer(response as Dealer);
        }
      } catch (error) {
        console.error("Error:", error);
        setNotification({
          open: true,
          message: "Không thể tải thông tin đại lý",
          severity: "error"
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  // ============================================
  // HELPER FUNCTIONS
  // ============================================

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleClose = () => {
    setNotification((p) => ({ ...p, open: false }));
  };

  const handleBack = () => window.history.back();

  // ============================================
  // LOADING & ERROR STATES
  // ============================================
  if (loading) return <LoadingState />;
  if (!dealer) return <ErrorState onBack={handleBack} />;

  // ============================================
  // MAIN RENDER
  // ============================================
  return (
    <div className="mt-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Back Button */}
        <div className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition-all duration-300 border border-gray-100">
          <button
            onClick={handleBack}
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 font-semibold transition-all group w-full"
          >
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-2.5 rounded-xl group-hover:from-blue-100 group-hover:to-indigo-100 transition-all duration-300">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform text-blue-600" />
            </div>
            <span className="text-base">Quay lại danh sách đại lý</span>
          </button>
        </div>

        {/* Header */}
        <DealerHeader
          name={dealer.name}
          createdAt={dealer.createdAt}
          getRelativeTime={getRelativeTime}
        />

        {/* Full Width Layout - No Staff Section */}
        <div className="space-y-6">
          {/* Contact Cards */}
          <ContactInfoCards
            address={dealer.address}
            phone={dealer.phone}
            email={dealer.email}
            createdAt={dealer.createdAt}
            copiedField={copiedField}
            onCopy={copyToClipboard}
            formatDateTime={formatDateTime}
            getRelativeTime={getRelativeTime}
          />

          {/* Statistics */}
          <DealerStatistics />
        </div>

        {/* Enhanced Toast Notification */}
        {copiedField && !notification.open && (
          <div className="fixed bottom-6 right-6 z-50 animate-slideUp">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-gray-700 backdrop-blur-sm">
              <div className="bg-green-500/20 backdrop-blur-sm p-2 rounded-xl">
                <Check className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="font-bold text-sm">Đã sao chép thành công</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {copiedField} đã được lưu vào clipboard
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Snackbar Notification */}
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
              notification.severity === "success"
                ? "linear-gradient(135deg, #4caf50 0%, #45a049 100%)"
                : "linear-gradient(135deg, #f44336 0%, #e53935 100%)",
            color: "white",
            fontWeight: "bold",
            borderRadius: "16px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
            px: 3,
            py: 2,
            "& .MuiAlert-icon": {
              fontSize: "24px"
            },
            "& .MuiAlert-message": {
              fontSize: "15px",
              fontWeight: 600
            }
          }}
        >
          {notification.message}
        </Alert>
      </Snackbar>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default DealerId;
