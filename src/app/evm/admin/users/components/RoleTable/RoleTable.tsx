"use client";
import {
  Account,
  AccountTableProps,
  UpdateAccountDTO
} from "@/app/types/Account/Account";
import {
  accountService,
  UpdateService
} from "@/services/accountService/account";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AccountTableHeader from "./components/AccountTableHeader";
import AccountTableRow from "./components/AccountTableRow";
import UpdateAccountModal from "./components/UpdateAccountModal";

import EmptyAccountState from "./components/EmptyAccountState";
import NotificationToast from "./components/NotificationToast";
import UpdatePasswordModal from "./components/UpdatePasswordModal";
import { forgotPassword } from "@/services/auth/forgotPasswordService/forgotPassword";

interface NotificationsProps {
  open: boolean;
  message: string;
  severity: "success" | "error";
}

export default function AccountTable({
  accounts = [],
  onUpdate
}: AccountTableProps) {
  const router = useRouter();
  const [data, setData] = useState<Account[]>(accounts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [selectedAcc, setSelectedAcc] = useState<Account | null>(null);
  const [notification, setNotification] = useState<NotificationsProps>({
    open: false,
    message: "",
    severity: "success"
  });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await accountService();
        setData(res);
      } catch (e) {
        console.error("Lỗi khi fetch accounts:", e);
      }
    };
    fetchData();
  }, []);

  const openModal = (acc: Account) => {
    setSelectedAcc(acc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAcc(null);
  };

  const openPasswordModal = (acc: Account) => {
    setSelectedAcc(acc);
    setIsPasswordModalOpen(true);
  };

  const closePasswordModal = () => {
    setIsPasswordModalOpen(false);
    setSelectedAcc(null);
  };

  const handleUpdate = async (
    id: string,
    formData: {
      username: string;
      phoneNumber: string;
    }
  ) => {
    if (!selectedAcc?.id) {
      setNotification({
        open: true,
        message: "❌ Không tìm thấy ID tài khoản",
        severity: "error"
      });
      return;
    }

    const payload: UpdateAccountDTO = {
      ...formData
    };

    try {
      const updated = await UpdateService(id, payload);
      if (updated) {
        setData((prev) =>
          prev.map((acc) =>
            acc.id === selectedAcc.id
              ? {
                  ...acc,
                  ...formData,
                  updatedAt: Math.floor(Date.now() / 1000)
                }
              : acc
          )
        );

        if (onUpdate && selectedAcc) {
          onUpdate({ ...selectedAcc, ...formData });
        }

        setNotification({
          open: true,
          message: "✅ Cập nhật thành công!",
          severity: "success"
        });
        setIsModalOpen(false);
        window.location.reload();
      } else {
        setNotification({
          open: true,
          message: "❌ Cập nhật thất bại.",
          severity: "error"
        });
      }
    } catch (e) {
      console.error("❌ Lỗi kết nối server:", e);
      setNotification({
        open: true,
        message: "❌ Không thể kết nối server.",
        severity: "error"
      });
    }
  };

  const handlePasswordUpdate = async (formData: {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }) => {
    if (!selectedAcc?.id) {
      setNotification({
        open: true,
        message: "❌ Không tìm thấy ID tài khoản",
        severity: "error"
      });
      return;
    }

    if (formData.newPassword !== formData.confirmNewPassword) {
      setNotification({
        open: true,
        message: "❌ Mật khẩu xác nhận không khớp",
        severity: "error"
      });
      return;
    }

    try {
      const response = await forgotPassword(
        formData.oldPassword,
        formData.newPassword,
        formData.confirmNewPassword
      );

      setNotification({
        open: true,
        message:
          response.message || "Đổi mật khẩu thành công! Đang chuyển hướng...",
        severity: "success"
      });
      window.location.reload();
      setIsPasswordModalOpen(false);
    } catch (e) {
      console.error("❌ Lỗi kết nối server:", e);
      setNotification({
        open: true,
        message: "❌ Không thể cập nhật mật khẩu.",
        severity: "error"
      });
    }
  };

  const handleDelete = async (accountId: string) => {
    console.log("Delete account:", accountId);
    // Implement delete logic here
  };

  return (
    <>
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #10b981 0%, #059669 100%);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #059669 0%, #047857 100%);
        }
      `}</style>

      <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
            <AccountTableHeader totalAccounts={data.length} />

            {data.length > 0 ? (
              <div className="overflow-x-auto custom-scrollbar">
                <table className="min-w-full divide-y divide-gray-200/50">
                  <thead className="bg-gradient-to-r from-emerald-50 to-teal-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Username
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Số điện thoại
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Ngày tạo
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Trạng thái
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Hành động
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100/50">
                    {data.map((acc, index) => (
                      <AccountTableRow
                        key={acc.id}
                        account={acc}
                        index={index}
                        onEdit={openModal}
                        onDelete={handleDelete}
                        onPasswordUpdate={openPasswordModal}
                        onNavigate={() =>
                          router.push(`/evm/admin/users/${acc.id}`)
                        }
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <EmptyAccountState />
            )}
          </div>
        </div>

        {isModalOpen && selectedAcc && (
          <UpdateAccountModal
            account={selectedAcc}
            onClose={closeModal}
            onUpdate={handleUpdate}
          />
        )}

        {isPasswordModalOpen && selectedAcc && (
          <UpdatePasswordModal
            account={selectedAcc}
            onClose={closePasswordModal}
            onUpdate={handlePasswordUpdate}
          />
        )}

        <NotificationToast
          open={notification.open}
          message={notification.message}
          severity={notification.severity}
          onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
        />
      </div>
    </>
  );
}
