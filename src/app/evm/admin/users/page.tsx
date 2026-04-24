"use client";
import React from "react";
import RolesPage from "./RolesPage";
import { accountService } from "@/services/accountService/account";
import { Account } from "@/app/types/Account/Account";
import {
  registerUser,
  type RegisterData
} from "@/services/auth/register/registerServices";
import SearchBar from "./components/SearchBar";
import CreateAccountModal from "./components/CreateAccountModal";
import Notification from "./components/Notification";
import { UserPlus } from "lucide-react";
import UserStatsCards from "./components/UserStatsCard";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
import LoadingSpinner from "./components/LoadingSpinner";

interface NotificationsProps {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
}

export default function UserListPage() {
  useAuthGuard(["Administrator"]);
  const [data, setData] = React.useState<Account[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [notification, setNotification] = React.useState<NotificationsProps>({
    open: false,
    message: "",
    severity: "success"
  });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await accountService();
        setData(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // const filteredData = data.filter(
  //   (user) =>
  //     user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     user.phoneNumber.includes(searchTerm)
  // );

  const handleCreateAccount = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (formData: RegisterData) => {
    try {
      const response = await registerUser(formData);

      if (response) {
        setNotification({
          open: true,
          message: response.message || "Đăng ký thành công",
          severity: "success"
        });
        handleCloseModal();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        setNotification({
          open: true,
          message: "Đăng ký thất bại",
          severity: "error"
        });
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : typeof error === "string"
          ? error
          : "Đăng ký thất bại";

      setNotification({
        open: true,
        message,
        severity: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>

      <main className="mt-20 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Section */}
          <div
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20"
            style={{ animation: "slideDown 0.6s ease-out" }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl blur-xl opacity-40 animate-pulse" />
                  <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-xl">
                    <svg
                      className="w-9 h-9 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                    Quản lý người dùng
                  </h1>
                  <p className="text-gray-600 text-sm mt-1 font-medium">
                    Quản lý và theo dõi {data.length} người dùng trong hệ thống
                    🌱
                  </p>
                </div>
              </div>

              <button
                onClick={handleCreateAccount}
                className="group relative flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                <UserPlus className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform" />
                <span className="relative z-10">Tạo tài khoản</span>
              </button>
            </div>

            {/* Stats Cards */}
            <UserStatsCards data={data} />

            {/* Search Bar */}
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          </div>

          {/* User List Section */}
          {/* <div
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20"
            style={{ animation: "scaleIn 0.6s ease-out 0.2s both" }}
          >
            {loading ? (
              <LoadingSpinner />
            ) : filteredData.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Danh sách người dùng
                    </h2>
                    {searchTerm && (
                      <p className="text-sm text-emerald-600 mt-1 font-medium">
                        Tìm thấy {filteredData.length} kết quả
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredData.map((user) => (
                    <div key={user.id}>
                      <UserCard account={user} />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <EmptyUserState searchTerm={searchTerm} />
            )}
          </div> */}

          {/* Roles Section */}
          <div style={{ animation: "fadeIn 0.6s ease-out 0.4s both" }}>
            <RolesPage />
          </div>
        </div>

        {/* Modals & Notifications */}
        {showModal && (
          <CreateAccountModal
            onClose={handleCloseModal}
            onSubmit={handleSubmit}
          />
        )}

        <Notification
          open={notification.open}
          message={notification.message}
          severity={notification.severity}
          onClose={handleCloseNotification}
        />
      </main>
    </>
  );
}
