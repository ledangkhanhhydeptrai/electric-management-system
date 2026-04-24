// /components/dealers/components/DealerModal.tsx
"use client";
import React from "react";
import { Alert, Slide, SlideProps, Snackbar } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Plus, Eye, Edit, X, MapPin } from "lucide-react";
import { Dealer, UpdateDealer } from "../types/types";
import { Manufacturer } from "../../manufacturer/types/types";

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

export default function DealerModal({
  isOpen,
  onClose,
  modalType,
  selectedDealer,
  // form states passed into modal (we will manage local form here)
  code,
  setCode,
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
  address,
  setAddress,
  manufacturerId,
  setManufacturerId,
  manufacturers,
  handleSubmit,
  handleUpdateDealer
}: {
  isOpen: boolean;
  onClose: () => void;
  modalType: "add" | "view" | "edit" | "";
  selectedDealer: Dealer | null;
  code: string;
  setCode: (v: string) => void;
  name: string;
  setName: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  address: string;
  setAddress: (v: string) => void;
  manufacturerId: number;
  setManufacturerId: (v: number) => void;
  manufacturers: Manufacturer[];
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleUpdateDealer: (id: string, data: UpdateDealer) => Promise<void>;
}) {
  const [notification, setNotification] = React.useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  // ✅ FIX: Tự động điền dữ liệu vào form khi mở modal edit
  React.useEffect(() => {
    console.log("DealerModal useEffect triggered:", {
      modalType,
      selectedDealer
    });

    if (modalType === "edit" && selectedDealer) {
      console.log("Setting form data from dealer:", selectedDealer);
      setCode(selectedDealer.code || "");
      setName(selectedDealer.name || "");
      setPhone(selectedDealer.phone || "");
      setEmail(selectedDealer.email || "");
      setAddress(selectedDealer.address || "");
      // Nếu có manufacturerId trong selectedDealer thì set luôn
    } else if (modalType === "add") {
      // Reset form khi mở modal add
      console.log("Resetting form for add mode");
      setCode("");
      setName("");
      setPhone("");
      setEmail("");
      setAddress("");
      setManufacturerId(0);
    }
  }, [
    modalType,
    selectedDealer,
    setAddress,
    setCode,
    setEmail,
    setManufacturerId,
    setName,
    setPhone
  ]);

  const handleClose = () => {
    setNotification((p) => ({ ...p, open: false }));
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 flex justify-between items-center rounded-t-2xl">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                {modalType === "add" && (
                  <>
                    <Plus className="w-6 h-6" /> Thêm đại lý mới
                  </>
                )}
                {modalType === "view" && (
                  <>
                    <Eye className="w-6 h-6" /> Chi tiết: {selectedDealer?.name}
                  </>
                )}
                {modalType === "edit" && (
                  <>
                    <Edit className="w-6 h-6" /> Chỉnh sửa:{" "}
                    {selectedDealer?.name}
                  </>
                )}
              </h2>
              <button
                onClick={onClose}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8">
              {modalType === "view" && selectedDealer && (
                <div className="space-y-5">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-5 border-2 border-blue-200">
                    <label className="text-xs font-bold text-blue-600 uppercase tracking-wider flex items-center gap-2">
                      ID Đại lý
                    </label>
                    <p className="text-sm text-gray-800 mt-2 font-mono break-all bg-white px-3 py-2 rounded-lg">
                      {selectedDealer.id}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-5 border-2 border-gray-200">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-2 mb-3">
                      Tên đại lý
                    </label>
                    <p className="text-2xl text-gray-900 font-bold">
                      {selectedDealer.name}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-5 border-2 border-gray-200">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-2 mb-3">
                      <MapPin className="w-4 h-4" />
                    </label>
                    <p className="text-sm text-gray-900 leading-relaxed">
                      {selectedDealer.address}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div className="bg-gray-50 rounded-xl p-5 border-2 border-gray-200">
                      <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-2 mb-3">
                        Điện thoại
                      </label>
                      <a
                        href={`tel:${selectedDealer.phone}`}
                        className="text-lg text-blue-600 hover:text-blue-700 block font-bold hover:underline"
                      >
                        {selectedDealer.phone}
                      </a>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-5 border-2 border-gray-200">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-2 mb-3">
                      Email
                    </label>
                    <a
                      href={`mailto:${selectedDealer.email}`}
                      className="text-sm text-blue-600 hover:text-blue-700 block break-all hover:underline"
                    >
                      {selectedDealer.email}
                    </a>
                  </div>
                </div>
              )}

              {modalType === "add" && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Mã đại lý *
                      </label>
                      <input
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        type="text"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl"
                        placeholder="VD: DL-001"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Tên đại lý *
                      </label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl"
                        placeholder="VD: Đại lý VinFast Hà Nội"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Nhà sản xuất
                    </label>
                    <select
                      value={manufacturerId}
                      onChange={(e) =>
                        setManufacturerId(Number(e.target.value))
                      }
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl"
                    >
                      <option value="">-- Chọn nhà sản xuất --</option>
                      {manufacturers?.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name} {m.country}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Địa chỉ *
                    </label>
                    <textarea
                      rows={3}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl resize-none"
                      placeholder="Số nhà, đường, phường, quận, thành phố"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Số điện thoại *
                      </label>
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        type="tel"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl"
                        placeholder="0123456789"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl"
                        placeholder="email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
                  >
                    ✅ Tạo đại lý
                  </button>
                </form>
              )}

              {modalType === "edit" && selectedDealer && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Mã đại lý *
                    </label>
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl"
                      placeholder="VD: VF5"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Tên đại lý *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl"
                      placeholder="VD: Vinfast VF5"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Địa chỉ *
                    </label>
                    <textarea
                      rows={3}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl resize-none"
                      placeholder="VD: ABCD"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Số điện thoại *
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl"
                        placeholder="01234567891011"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl"
                        placeholder="ledangkhanhhy1@gmail.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Nút cập nhật */}
                  <button
                    onClick={() =>
                      handleUpdateDealer(selectedDealer.id, {
                        code,
                        name,
                        phone,
                        email,
                        address
                      })
                    }
                    className="w-full py-3 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
                  >
                    Cập nhật
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Snackbar
        open={notification.open}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={3000}
      >
        <Alert
          onClose={handleClose}
          severity={notification.severity}
          variant="filled"
          iconMapping={{ success: <CheckCircleIcon />, error: <ErrorIcon /> }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
}
