import { SignatureContract } from "@/services/contract/contractService";
import { Alert, Slide, SlideProps, Snackbar } from "@mui/material";
import { CheckCircleIcon } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import {
  FaTimes,
  FaTrash,
  FaCheck,
  FaEye,
  FaCloudUploadAlt
} from "react-icons/fa";
import ErrorIcon from "@mui/icons-material/Error";
import { CustomerVIP } from "@/app/evm/admin/customer/types/customer";
import { searchFilterCustomer } from "@/services/customerService/customer";

/* ===========================
   🔹 Transition
=========================== */
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

/* ===========================
   🔹 Spinner
=========================== */
function Spinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
      <div className="w-14 h-14 border-4 border-t-transparent border-green-500 rounded-full animate-spin" />
    </div>
  );
}

/* ===========================
   🔹 Notification Type
=========================== */
interface NotificationsProps {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
}

interface SignatureCanvasProps {
  penColor: string;
  canvasProps: {
    className: string;
  };
}
export interface SignatureCanvasRef {
  clear: () => void;
  isEmpty: () => boolean;
  getTrimmedCanvas: () => HTMLCanvasElement | null;
}

const SignatureCanvas = React.forwardRef<
  SignatureCanvasRef,
  SignatureCanvasProps
>((props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  React.useImperativeHandle(ref, () => ({
    clear: () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
      }
    },
    isEmpty: () => {
      const canvas = canvasRef.current;
      if (!canvas) return true;
      const ctx = canvas.getContext("2d");
      if (!ctx) return true;
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      return !imageData.data.some((channel) => channel !== 0);
    },
    getTrimmedCanvas: () => canvasRef.current
  }));

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const rect = canvas.getBoundingClientRect();
        ctx.beginPath();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
      }
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const rect = canvas.getBoundingClientRect();
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.strokeStyle = props.penColor;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.stroke();
      }
    }
  };

  const stopDrawing = () => setIsDrawing(false);

  return (
    <canvas
      ref={canvasRef}
      className={props.canvasProps.className}
      width={600}
      height={300}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
    />
  );
});
SignatureCanvas.displayName = "SignatureCanvas";

/* ===========================
   🔹 Signature Modal
=========================== */
export interface SignaturePadModalProps {
  contractId?: string;
  signerRole: string;
  signerName: string;
  setSignerName: (val: string) => void;
  signerIdNo: string;
  setSignerIdNo: (val: string) => void;
  isOpen: boolean;
  onClose: () => void;
  onSave?: (signature: string) => void;
}

export const SignaturePadModal: React.FC<SignaturePadModalProps> = ({
  contractId,
  signerRole,
  signerName,
  setSignerName,
  signerIdNo,
  setSignerIdNo,
  isOpen,
  onClose,
  onSave
}) => {
  const sigRef = useRef<SignatureCanvasRef | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<NotificationsProps>({
    open: false,
    message: "",
    severity: "success"
  });
  const [customer, setCustomer] = React.useState<CustomerVIP[]>([]);

  // Filter states
  const [filterType, setFilterType] = useState<
    "ALL" | "INDIVIDUAL" | "COMPANY"
  >("ALL");
  const [filterFullName, setFilterFullName] = useState<string>("");
  const [filterEmail, setFilterEmail] = useState<string>("");
  const [filterPhone, setFilterPhone] = useState<string>("");
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  React.useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await searchFilterCustomer({
          type: filterType !== "ALL" ? filterType : undefined,
          fullName: filterFullName,
          email: filterEmail,
          phone: filterPhone
        });
        if (Array.isArray(response)) {
          setCustomer(response);
        } else {
          setCustomer([]);
        }
      } catch (error) {
        console.error("Error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomer();
  });
  const clear = () => {
    sigRef.current?.clear();
    setPreview(null);
    setIsSaved(false);
  };

  const handleClose = () => setNotification((p) => ({ ...p, open: false }));

  const showPreview = () => {
    if (sigRef.current?.isEmpty()) {
      setNotification({
        open: true,
        message: "Vui lòng ký trước khi xem trước!",
        severity: "warning"
      });
      return;
    }

    if (!signerName.trim() || !signerIdNo.trim()) {
      setNotification({
        open: true,
        message: "Vui lòng điền đầy đủ thông tin người ký!",
        severity: "warning"
      });
      return;
    }

    const canvas = sigRef.current?.getTrimmedCanvas();
    const dataURL = canvas?.toDataURL("image/png");
    if (dataURL) {
      setPreview(dataURL);
      if (onSave) onSave(dataURL);
      setNotification({
        open: true,
        message:
          "Xem trước chữ ký thành công! Hãy kiểm tra và bấm 'Lưu lên hệ thống'",
        severity: "info"
      });
    }
  };

  const saveToSystem = async () => {
    if (!preview || !contractId) {
      setNotification({
        open: true,
        message: "Không tìm thấy chữ ký để lưu!",
        severity: "error"
      });
      return;
    }

    try {
      setLoading(true);
      const response = await SignatureContract(contractId, {
        signerRole,
        signerName,
        signerIdNo,
        signaturePayload: {
          type: "BASE64",
          value: preview
        }
      });

      if (response) {
        setIsSaved(true);
        setNotification({
          open: true,
          message: "Ký hợp đồng thành công! Chữ ký đã được lưu vào hệ thống",
          severity: "success"
        });
        window.location.reload();
      }
    } catch (err) {
      console.error("❌ Lỗi khi ký:", err);
      setNotification({
        open: true,
        message: "Lỗi khi lưu chữ ký lên hệ thống!",
        severity: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white p-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24 blur-2xl"></div>

          <div className="relative flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl">
                  ✍️
                </div>
                <h2 className="text-3xl font-bold">Ký điện tử</h2>
              </div>
              <p className="text-blue-50 text-sm ml-15">
                Hợp đồng: {contractId || "Mới"} • Vai trò: {signerRole}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all"
            >
              <FaTimes size={24} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6 overflow-y-auto max-h-[calc(90vh-280px)]">
          {/* Instructions */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4">
            <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
              <span className="text-xl">ℹ️</span>
              Hướng dẫn ký
            </h3>
            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside ml-1">
              <li>Điền đầy đủ thông tin người ký bên dưới</li>
              <li>Sử dụng chuột để ký tên vào khung canvas</li>
              <li>
                Nhấn <strong>Xem trước chữ ký</strong> để kiểm tra
              </li>
              <li>
                Nhấn <strong>Lưu lên hệ thống</strong> để gửi chữ ký lên server
              </li>
              <li>
                Nhấn <strong>Xóa</strong> nếu muốn ký lại
              </li>
              <li>
                Nhấn <strong>Xác nhận</strong> để hoàn tất
              </li>
            </ul>
          </div>

          {/* Thông tin người ký */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2 border-b-2 border-gray-200 pb-2">
              <span>👤</span> Thông tin người ký
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Tên người ký */}
              {/* Tên người ký - Select Customer */}
              <div className="group">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Người ký hợp đồng <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={signerName}
                    onChange={(e) => setSignerName(e.target.value)}
                    className="w-full px-5 py-3.5 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 outline-none bg-gray-50 focus:bg-white border-gray-200 hover:border-gray-300 appearance-none"
                  >
                    <option value="">-- Chọn người ký --</option>
                    {customer.map((cust) => {
                      const typeEmoji =
                        cust.customerType === "COMPANY"
                          ? "⭐"
                          : cust.customerType === "INDIVIDUAL"
                          ? "🏢"
                          : "👤";
                      return (
                        <option key={cust.id} value={cust.fullName}>
                          {typeEmoji} {cust.fullName} - {cust.phone}
                        </option>
                      );
                    })}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    ✍️
                  </div>
                </div>

                {/* Preview người ký khi đã chọn */}
                {signerName &&
                  customer.find((c) => c.fullName === signerName) && (
                    <div className="mt-3 p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-100">
                      {(() => {
                        const selectedSigner = customer.find(
                          (c) => c.fullName === signerName
                        );
                        if (!selectedSigner) return null;

                        const customerTypeConfig: {
                          [key: string]: {
                            emoji: string;
                            label: string;
                            bg: string;
                            text: string;
                          };
                        } = {
                          INDIVIDUAL: {
                            emoji: "👤",
                            label: "Cá nhân",
                            bg: "bg-blue-100",
                            text: "text-blue-700"
                          },
                          BUSINESS: {
                            emoji: "🏢",
                            label: "Doanh nghiệp",
                            bg: "bg-purple-100",
                            text: "text-purple-700"
                          },
                          VIP: {
                            emoji: "⭐",
                            label: "VIP",
                            bg: "bg-yellow-100",
                            text: "text-yellow-700"
                          }
                        };

                        const typeConfig = customerTypeConfig[
                          selectedSigner.customerType
                        ] || {
                          emoji: "👤",
                          label: selectedSigner.customerType,
                          bg: "bg-gray-100",
                          text: "text-gray-700"
                        };

                        return (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="font-bold text-blue-700 text-sm flex items-center gap-2">
                                <span>✍️</span>
                                <span>{selectedSigner.fullName}</span>
                              </h4>
                              <span
                                className={`px-2 py-0.5 rounded-full text-xs font-bold ${typeConfig.bg} ${typeConfig.text}`}
                              >
                                {typeConfig.emoji} {typeConfig.label}
                              </span>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div className="bg-white rounded-lg p-2 border border-blue-200">
                                <div className="text-[10px] text-gray-600 mb-0.5">
                                  📧 Email
                                </div>
                                <div className="font-semibold text-gray-900 text-xs truncate">
                                  {selectedSigner.email}
                                </div>
                              </div>

                              <div className="bg-white rounded-lg p-2 border border-blue-200">
                                <div className="text-[10px] text-gray-600 mb-0.5">
                                  📱 Điện thoại
                                </div>
                                <div className="font-semibold text-gray-900 text-xs">
                                  {selectedSigner.phone}
                                </div>
                              </div>

                              {selectedSigner.address && (
                                <div className="col-span-2 bg-white rounded-lg p-2 border border-blue-200">
                                  <div className="text-[10px] text-gray-600 mb-0.5">
                                    📍 Địa chỉ
                                  </div>
                                  <div className="font-medium text-gray-900 text-xs">
                                    {selectedSigner.address}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}
              </div>

              {/* Số CMND/CCCD */}
              <div className="group">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Số CMND/CCCD <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={signerIdNo}
                    onChange={(e) => setSignerIdNo(e.target.value)}
                    className="w-full px-5 py-3.5 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 outline-none bg-gray-50 focus:bg-white border-gray-200 hover:border-gray-300"
                    placeholder="VD: 001234567890"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    🆔
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Signature Canvas */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3 items-center gap-2">
              <span>✍️</span> Vùng ký tên{" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 bg-gradient-to-br from-gray-50 to-blue-50">
              <SignatureCanvas
                ref={sigRef}
                penColor="black"
                canvasProps={{
                  className:
                    "border-2 border-gray-300 rounded-lg w-full bg-white shadow-sm cursor-crosshair hover:border-blue-400 transition-colors"
                }}
              />
              <p className="text-xs text-gray-500 mt-2 text-center">
                💡 Sử dụng chuột hoặc màn hình cảm ứng để ký tên
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={clear}
              disabled={loading}
              className="flex-1 px-6 py-3.5 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-semibold hover:shadow-xl hover:from-gray-600 hover:to-gray-700 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaTrash />
              Xóa chữ ký
            </button>
            <button
              onClick={showPreview}
              disabled={loading || !!preview}
              className="flex-1 px-6 py-3.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-xl hover:from-blue-600 hover:to-indigo-700 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaEye />
              Xem trước chữ ký
            </button>
          </div>

          {/* Preview Section */}
          {preview && (
            <div className="border-t-2 border-gray-200 pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <span>👁️</span> Xem trước chữ ký
                </h4>
                {isSaved && (
                  <span className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
                    <FaCheck />
                    Đã lưu vào hệ thống
                  </span>
                )}
              </div>

              <div
                className={`bg-gradient-to-br rounded-xl p-6 border-2 ${
                  isSaved
                    ? "from-green-50 to-emerald-50 border-green-300"
                    : "from-yellow-50 to-amber-50 border-yellow-300"
                }`}
              >
                <Image
                  src={preview}
                  alt="Preview"
                  className="mx-auto border-2 border-gray-300 rounded-lg bg-white shadow-lg"
                  width={400}
                  height={200}
                />

                {/* Thông tin người ký */}
                <div
                  className={`mt-4 p-4 bg-white rounded-lg border-2 shadow-sm ${
                    isSaved ? "border-green-200" : "border-yellow-200"
                  }`}
                >
                  <h5
                    className={`font-bold mb-3 text-sm flex items-center gap-2 ${
                      isSaved ? "text-green-700" : "text-yellow-700"
                    }`}
                  >
                    <span>📋</span> Thông tin chữ ký
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 font-medium">👤 Tên:</span>
                      <span className="text-gray-900 font-semibold">
                        {signerName || "---"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 font-medium">
                        🆔 CMND:
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {signerIdNo || "---"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Nút lưu lên hệ thống */}
                {!isSaved && (
                  <div className="mt-4">
                    <button
                      onClick={saveToSystem}
                      disabled={loading}
                      className="w-full px-6 py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-xl hover:from-green-600 hover:to-emerald-700 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaCloudUploadAlt className="text-lg" />
                      Lưu lên hệ thống
                    </button>
                    <p className="text-xs text-center mt-2 text-yellow-700">
                      ⚠️ Chữ ký chưa được lưu vào hệ thống. Vui lòng kiểm tra và
                      nhấn nút trên để lưu.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 p-6 bg-gray-50/50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 hover:border-gray-400 active:scale-95 transition-all duration-200 font-semibold"
          >
            Hủy
          </button>
        </div>
      </div>

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
              notification.severity === "success"
                ? "#4caf50"
                : notification.severity === "error"
                ? "#f44336"
                : notification.severity === "warning"
                ? "#ff9800"
                : "#2196f3",
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
};
