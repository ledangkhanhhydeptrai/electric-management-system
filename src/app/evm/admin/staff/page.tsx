"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Users,
  UserCheck,
  Search,
  CheckCircleIcon,
  PlusCircle,
} from "lucide-react";
import {
  createStaff,
  searchStaff,
  Staff,
  StaffSearchProps,
  updateStaff
} from "@/services/staffService/staff";
import StatsCard from "./components/StatsCard";
import SearchBar from "./components/SearchBar";
import FilterPanel from "./components/FilterPanel";
import StaffTable from "./components/StaffTable";
import Pagination from "./components/Pagination";
import StaffModal from "./components/StaffModal";
import ErrorIcon from "@mui/icons-material/Error";
import { Alert, Slide, SlideProps, Snackbar } from "@mui/material";
import { AxiosError } from "axios";
import CreateStaffModal from "./components/CreateStaffModal";
import { Account } from "@/app/types/Account/Account";
import { accountService } from "@/services/accountService/account";
import { Dealer } from "../dealerView/types/types";
import { getAllDealer } from "@/services/dealerService/dealerService";
import { getAllManufacturerServiceForManager, ManuProps } from "@/services/staffManufacturerService/staffManufacturer";
// import UnassignedStaffTable, {
//   UnassignedStaff
// } from "./components/UnassignedStaffTable";

interface FormData {
  fullName: string;
  dealerId: string;
}
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
export default function StaffManagement() {
  const [staffs, setStaffs] = useState<ManuProps[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredStaffs, setFilteredStaffs] = useState<ManuProps[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    dealerId: ""
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [account, setAccount] = React.useState<Account[]>([]);
  // const [unassignedStaffs, setUnassignedStaffs] = useState<UnassignedStaff[]>(
  //   []
  // );
  // const [isLoadingUnassigned, setIsLoadingUnassigned] =
  //   useState<boolean>(false);
  // const [showUnassignedTable, setShowUnassignedTable] =
  //   useState<boolean>(false);

  // Search & Pagination states
  const [pendingFilters, setPendingFilters] = useState<StaffSearchProps>({
    q: "",
    role: "",
    status: "",
    createdFrom: "",
    createdTo: "",
    page: 0,
    size: 20
  });

  const [searchFilters, setSearchFilters] = useState<StaffSearchProps>({
    q: "",
    role: "",
    status: "",
    createdFrom: "",
    createdTo: "",
    page: 0,
    size: 0
  });
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize] = useState<number>(20);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [notification, setNotification] = React.useState<NotificationsProps>({
    open: false,
    message: "",
    severity: "success"
  });
  const [dealers, setDealers] = React.useState<Dealer[]>([]);

  // Fetch unassigned staff
  // const fetchUnassignedStaffs = useCallback(async () => {
  //   try {
  //     setIsLoadingUnassigned(true);
  //     const response = await getStaffUnassgined();
  //     setUnassignedStaffs(Array.isArray(response) ? response : []);
  //     console.log("Response:", response);
  //   } catch (error) {
  //     console.error("Failed to fetch unassigned staffs:", error);
  //     setUnassignedStaffs([]);
  //   } finally {
  //     setIsLoadingUnassigned(false);
  //   }
  // }, []);

  // Fetch data với search filters
  const fetchStaffs = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getAllManufacturerServiceForManager();

      if (Array.isArray(response)) {
        setStaffs(response);
        setFilteredStaffs(response);
      } else {
        setStaffs([]);
        setFilteredStaffs([]);
      }
    } catch (error) {
      console.error("Failed to fetch staffs:", error);
      setStaffs([]);
      setFilteredStaffs([]);
      setTotalPages(0);
      setTotalElements(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // const handleCreateStaff = async (data: {
  //   fullName: string;
  //   accountId: string;
  // }) => {
  //   console.log("Creating staff:", data);
  //   try {
  //     const response = await createStaff(data);
  //     if (response) {
  //       setNotification({
  //         open: true,
  //         message: "Tạo nhân viên thành công",
  //         severity: "success"
  //       });
  //       setIsModalOpen(false);
  //       await fetchStaffs(); // refresh lại danh sách mà không reload trang
  //       // await fetchUnassignedStaffs();
  //     }
  //   } catch (error) {
  //     const errors = error as AxiosError;
  //     console.error("Error:", errors);
  //     setNotification({
  //       open: true,
  //       message: errors.message || "Có lỗi xảy ra",
  //       severity: "error"
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const fetchAccount = React.useCallback(async () => {
    try {
      const response = await accountService();
      if (Array.isArray(response)) {
        setAccount(response);
      } else {
        setAccount([]);
      }
    } catch (error) {
      console.error("Error", error);
    }
  }, []);

  const fetchDealer = React.useCallback(async () => {
    try {
      const response = await getAllDealer();
      if (Array.isArray(response)) {
        setDealers(response);
      } else {
        setDealers([]);
      }
    } catch (error) {
      console.error("Error", error);
    }
  }, []);

  useEffect(() => {
    fetchStaffs();
    fetchAccount();
    fetchDealer();
    // fetchUnassignedStaffs();
  }, [fetchStaffs, fetchAccount, fetchDealer]);

  const handleSearch = () => {
    setCurrentPage(0);
    fetchStaffs();
  };

  const handleResetFilters = () => {
    setSearchFilters({
      q: "",
      role: "",
      status: "",
      createdFrom: "",
      createdTo: ""
    });
    setCurrentPage(0);
  };

  const handleClose = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  const handleEdit = (staff: Staff) => {
    setEditingStaff(staff);
    setFormData({
      fullName: staff.fullName,
      dealerId: staff.dealerId ?? ""
    });
    setShowModal(true);
  };

  const handleDelete = (id: string): void => {
    if (window.confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) {
      setStaffs(staffs.filter((staff) => staff.id !== id));
      fetchStaffs();
    }
  };

  if (isLoading) return <Spinner />;

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     if (editingStaff) {
  //       const response = await updateStaff(editingStaff.id, formData);
  //       if (response) {
  //         setShowModal(false);
  //         setEditingStaff(null);

  //         // ✅ Get dealer name để show trong notification
  //         const dealerName = dealers.find(
  //           (d) => d.id === formData.dealerId
  //         )?.name;

  //         setNotification({
  //           open: true,
  //           message: dealerName
  //             ? `Đã phân công ${formData.fullName} vào đại lý ${dealerName}!`
  //             : `Cập nhật thông tin ${formData.fullName} thành công!`,
  //           severity: "success"
  //         });

  //         await fetchStaffs();
  //         // await fetchUnassignedStaffs();
  //       }
  //     } else {
  //       const response = await createStaff({
  //         fullName: formData.fullName,
  //         accountId: account.length > 0 ? account[0].id : ""
  //       });
  //       if (response) {
  //         setShowModal(false);

  //         setNotification({
  //           open: true,
  //           message: `Đã thêm nhân viên ${formData.fullName} thành công!`,
  //           severity: "success"
  //         });
  //         window.location.reload();
  //       }
  //     }
  //   } catch (error) {
  //     const axiosError = error as AxiosError<{ message?: string }>;
  //     console.error("Error updating staff:", error);

  //     setNotification({
  //       open: true,
  //       message:
  //         axiosError.response?.data?.message ||
  //         "Có lỗi xảy ra khi lưu thông tin nhân viên",
  //       severity: "error"
  //     });
  //   }
  // };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="mt-22 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="">
        {/* Header Section */}
        <div className="mb-8">
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-8 mb-6 shadow-lg border border-blue-100">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            {/* Content */}
            <div className="relative flex items-center justify-between">
              {/* Left Side - Title & Icon */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl blur-xl opacity-50 animate-pulse" />
                  <div className="relative p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      Quản Lý Nhân Viên
                    </h1>
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-bold rounded-full shadow-md">
                      PRO
                    </span>
                  </div>
                  <p className="text-gray-600 font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    Quản lý thông tin nhân viên của bạn
                  </p>
                </div>
              </div>

              {/* Right Side - Action Button */}
              {/* <button
                onClick={() => setIsModalOpen(true)}
                className="group relative flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              >

                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400 blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />

                <div className="relative flex items-center gap-3">
                  <div className="p-1 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                    <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                  </div>
                  <span className="text-base">Thêm nhân viên</span>
                </div>
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                </div>
              </button> */}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <StatsCard
              title="Tổng Nhân Viên"
              value={totalElements}
              icon={Users}
              iconBgColor="bg-blue-100"
              iconColor="text-blue-600"
              valueColor="text-blue-600"
            />
            <StatsCard
              title="Trang Hiện Tại"
              value={`${currentPage + 1} / ${totalPages}`}
              icon={UserCheck}
              iconBgColor="bg-green-100"
              iconColor="text-green-600"
              valueColor="text-green-600"
            />
            <StatsCard
              title="Kết Quả Tìm Kiếm"
              value={filteredStaffs.length}
              icon={Search}
              iconBgColor="bg-purple-100"
              iconColor="text-purple-600"
              valueColor="text-purple-600"
            />
            {/* <StatsCard
              title="Chưa Phân Công"
              value={unassignedStaffs.length}
              icon={UserX}
              iconBgColor="bg-orange-100"
              iconColor="text-orange-600"
              valueColor="text-orange-600"
            /> */}
          </div>
        </div>

        {/* Unassigned Staff Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-6">
          {/* <div
            className="bg-gradient-to-r from-orange-50 to-amber-50 px-6 py-4 border-b border-orange-100 cursor-pointer hover:from-orange-100 hover:to-amber-100 transition-all duration-200"
            onClick={() => setShowUnassignedTable(!showUnassignedTable)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl shadow-md">
                  <UserX className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Nhân Viên Chưa Phân Công
                  </h2>
                  <p className="text-sm text-gray-600">
                    {unassignedStaffs.length} nhân viên đang chờ phân công
                  </p>
                </div>
              </div>
              <button className="px-4 py-2 bg-white rounded-lg font-medium text-orange-600 hover:bg-orange-50 transition-colors shadow-sm border border-orange-200">
                {showUnassignedTable ? "Ẩn" : "Hiển thị"}
              </button>
            </div>
          </div> */}

          {/* {showUnassignedTable && (
            <div className="animate-slideDown">
              <UnassignedStaffTable
                staffs={unassignedStaffs}
                isLoading={isLoadingUnassigned}
                onAssign={(staffId) => {
                  console.log("Assign staff:", staffId);
                  // Implement assign logic here
                  setNotification({
                    open: true,
                    message: "Tính năng đang được phát triển",
                    severity: "info"
                  });
                }}
              />
            </div>
          )} */}
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
          <SearchBar
            searchValue={
              searchFilters.q !== undefined && searchFilters.q !== null
                ? searchFilters.q
                : ""
            }
            onSearchChange={(value) =>
              setSearchFilters({ ...searchFilters, q: value })
            }
            onSearch={handleSearch}
            showFilters={showFilters}
            onToggleFilters={() => setShowFilters(!showFilters)}
          />

          {showFilters && (
            <FilterPanel
              filters={pendingFilters}
              onFilterChange={setPendingFilters}
              onSearch={() => {
                setSearchFilters(pendingFilters);
                handleSearch();
              }}
              onReset={() => {
                const reset = {
                  q: "",
                  role: "",
                  status: "",
                  createdFrom: "",
                  createdTo: "",
                  page: 0,
                  size: 20
                };
                setPendingFilters(reset);
                handleResetFilters();
                handleSearch();
              }}
            />
          )}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <StaffTable
            staffs={filteredStaffs}
            currentPage={currentPage}
            pageSize={pageSize}
            isLoading={isLoading}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalElements={totalElements}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {/* Modal */}
      {/* <StaffModal
        show={showModal}
        editingStaff={editingStaff}
        formData={formData}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        onFormChange={setFormData}
        dealers={dealers}
      />
      <CreateStaffModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateStaff}
        accounts={account}
      /> */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            transform: translateY(-10px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
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
