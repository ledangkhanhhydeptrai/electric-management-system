"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { Dealer } from "../types/types";
import { useParams } from "next/navigation";
import {
  getDealerById,
  getDealerIdByStaff
} from "@/services/dealerService/dealerService";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
import { Alert, Slide, SlideProps, Snackbar } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// Components

// Types & Utils

import { LoadingState } from "./components/LoadingState";
import { ErrorState } from "./components/ErrorState";
import { DealerHeader } from "./components/DealerHeader";
import { ContactInfoCards } from "./components/ContactInfoCards";
import { DealerStatistics } from "./components/DealerStatistics";
import { StaffListView } from "./components/StaffListView";
import { DealerStaffResponse, Notification } from "./components/types";
import { formatDateTime, getRelativeTime } from "./components/utils";

// ============================================
// TRANSITION COMPONENT
// ============================================
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
  useAuthGuard(["Dealer Manager"]);
  const { id } = useParams();

  // States
  const [dealer, setDealer] = useState<Dealer | null>(null);
  const [dealerStaffs, setDealerStaffs] = useState<DealerStaffResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  // const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
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

    const fetchDealerStaffs = async () => {
      try {
        const response = await getDealerIdByStaff(String(id));
        if (Array.isArray(response)) {
          setDealerStaffs(response);
        } else {
          setDealerStaffs([]);
        }
      } catch (error) {
        console.error("Error fetching dealer staffs:", error);
        setDealerStaffs([]);
      }
    };

    if (id) {
      fetchData();
      fetchDealerStaffs();
    }
  }, [id]);

  // ============================================
  // OPERATIONS
  // ============================================

  // const handleRemoveStaff = async (staffId: string) => {
  //   if (deleteConfirm === staffId) {
  //     // TODO: Call API to remove staff
  //     // await removeStaffFromDealer(String(id), staffId);

  //     setDealerStaffs(dealerStaffs.filter((s) => s.id !== staffId));
  //     setDeleteConfirm(null);
  //     setNotification({
  //       open: true,
  //       message: "Đã xóa nhân viên khỏi đại lý!",
  //       severity: "success"
  //     });
  //   } else {
  //     setDeleteConfirm(staffId);
  //     setTimeout(() => setDeleteConfirm(null), 3000);
  //   }
  // };

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
    <div className="mt-22 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors group mb-6"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Quay lại danh sách
        </button>

        {/* Header */}
        <DealerHeader
          name={dealer.name}
          createdAt={dealer.createdAt}
          getRelativeTime={getRelativeTime}
        />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Contact Info */}
          <div className="lg:col-span-2 space-y-6">
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

          {/* Right Column - Staff List */}
          <div className="lg:col-span-1">
            <StaffListView
              staffs={dealerStaffs}
              // deleteConfirm={deleteConfirm}
              // onRemoveStaff={handleRemoveStaff}
            />
          </div>
        </div>

        {/* Copy Toast Notification */}
        {copiedField && !notification.open && (
          <div className="fixed bottom-6 right-6 bg-gray-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-slideIn">
            <div className="bg-green-500 rounded-full p-1">
              <Check className="w-4 h-4" />
            </div>
            <p className="font-semibold">Đã sao chép {copiedField}</p>
          </div>
        )}
      </div>

      {/* Snackbar Notification */}
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
            py: 1.5
          }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default DealerId;