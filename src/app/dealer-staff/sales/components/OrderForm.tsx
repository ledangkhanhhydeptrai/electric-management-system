// "use client";
import React, { useState } from "react";
import { Snackbar, Alert, Slide, SlideProps } from "@mui/material";
import {
  UserOutlined,
  CarOutlined,
  NumberOutlined,
  CheckCircleOutlined,
  ShoppingCartOutlined,
  ThunderboltOutlined
} from "@ant-design/icons";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

const carOptions = [
  { 
    value: "VF8", 
    label: "VinFast VF 8", 
    price: "$35,000",
    icon: "🚙",
    color: "from-green-500 to-emerald-500"
  },
  { 
    value: "VF9", 
    label: "VinFast VF 9", 
    price: "$55,000",
    icon: "🚗",
    color: "from-blue-500 to-cyan-500"
  },
  { 
    value: "e34", 
    label: "VinFast VF e34", 
    price: "$20,000",
    icon: "🚘",
    color: "from-purple-500 to-pink-500"
  }
];

const OrderForm: React.FC = () => {
  const [customer, setCustomer] = useState("");
  const [car, setCar] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("success");

  const [errors, setErrors] = useState({
    customer: "",
    car: "",
    quantity: ""
  });

  const validateForm = () => {
    const newErrors = {
      customer: "",
      car: "",
      quantity: ""
    };

    if (!customer.trim()) {
      newErrors.customer = "Vui lòng nhập tên khách hàng";
    }
    if (!car) {
      newErrors.car = "Vui lòng chọn mẫu xe";
    }
    if (quantity < 1) {
      newErrors.quantity = "Số lượng phải lớn hơn 0";
    }

    setErrors(newErrors);
    return !newErrors.customer && !newErrors.car && !newErrors.quantity;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setMessage("Vui lòng điền đầy đủ thông tin!");
      setSeverity("error");
      setOpen(true);
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const selectedCar = carOptions.find(c => c.value === car);
      console.log({ customer, car, quantity });
      
      setMessage(
        `Đặt xe thành công! ${selectedCar?.icon}\n${customer} - ${selectedCar?.label} x${quantity}`
      );
      setSeverity("success");
      setOpen(true);

      // Reset form
      setCustomer("");
      setCar("");
      setQuantity(1);
      setErrors({ customer: "", car: "", quantity: "" });
      setLoading(false);
    }, 1500);
  };

  const selectedCarInfo = carOptions.find(c => c.value === car);

  return (
    <>
      <div className="bg-gradient-to-br from-green-50 via-white to-green-100 rounded-3xl shadow-2xl border border-green-200 space-y-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200 overflow-hidden"
        >
          {/* Form Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-2xl">
                <ShoppingCartOutlined className="text-white text-3xl" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">
                  Đặt Xe Mới
                </h2>
                <p className="text-green-100 text-sm mt-1">
                  Điền thông tin để đặt xe điện VinFast
                </p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8 space-y-6">
            {/* Tên khách hàng */}
            <div className="space-y-2">
              <label className="text-gray-700 font-semibold text-sm flex items-center gap-2">
                <UserOutlined className="text-green-600" />
                Tên khách hàng
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={customer}
                  onChange={(e) => {
                    setCustomer(e.target.value);
                    if (errors.customer) {
                      setErrors({ ...errors, customer: "" });
                    }
                  }}
                  className={`w-full bg-white text-gray-900 placeholder-gray-400 border-2 ${
                    errors.customer ? "border-red-400" : "border-gray-300"
                  } rounded-xl px-5 py-4 pl-12 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300`}
                />
                <UserOutlined className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              </div>
              {errors.customer && (
                <p className="text-red-500 text-sm flex items-center gap-1 animate-shake">
                  <span>⚠️</span> {errors.customer}
                </p>
              )}
            </div>

            {/* Chọn mẫu xe */}
            <div className="space-y-2">
              <label className="text-gray-700 font-semibold text-sm flex items-center gap-2">
                <CarOutlined className="text-green-600" />
                Chọn mẫu xe
                <span className="text-red-500">*</span>
              </label>
              <select
                value={car}
                onChange={(e) => {
                  setCar(e.target.value);
                  if (errors.car) {
                    setErrors({ ...errors, car: "" });
                  }
                }}
                className={`w-full bg-white text-gray-900 border-2 ${
                  errors.car ? "border-red-400" : "border-gray-300"
                } rounded-xl px-5 py-4 pl-12 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 cursor-pointer appearance-none`}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 1rem center",
                  backgroundSize: "1.5em 1.5em"
                }}
              >
                <option value="" disabled>
                  -- Chọn xe điện --
                </option>
                {carOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.icon} {option.label} - {option.price}
                  </option>
                ))}
              </select>
              <CarOutlined className="absolute left-4 top-1/2 text-gray-400 text-lg pointer-events-none" style={{ marginTop: "2.2rem" }} />
              {errors.car && (
                <p className="text-red-500 text-sm flex items-center gap-1 animate-shake">
                  <span>⚠️</span> {errors.car}
                </p>
              )}
            </div>

            {/* Selected Car Preview */}
            {selectedCarInfo && (
              <div className={`p-5 bg-gradient-to-r ${selectedCarInfo.color} rounded-2xl animate-slideDown`}>
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{selectedCarInfo.icon}</span>
                    <div>
                      <p className="font-bold text-lg">{selectedCarInfo.label}</p>
                      <p className="text-sm opacity-90">Xe điện thông minh</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{selectedCarInfo.price}</p>
                    <div className="flex items-center gap-1 text-sm opacity-90">
                      <ThunderboltOutlined />
                      <span>Electric</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Số lượng */}
            <div className="space-y-2">
              <label className="text-gray-700 font-semibold text-sm flex items-center gap-2">
                <NumberOutlined className="text-green-600" />
                Số lượng
                <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-xl font-bold text-xl text-gray-700 transition-all duration-300 hover:scale-110 active:scale-95"
                >
                  −
                </button>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(Math.max(1, Number(e.target.value)));
                    if (errors.quantity) {
                      setErrors({ ...errors, quantity: "" });
                    }
                  }}
                  className={`flex-1 text-center bg-white text-gray-900 border-2 ${
                    errors.quantity ? "border-red-400" : "border-gray-300"
                  } rounded-xl px-5 py-4 text-2xl font-bold focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300`}
                />
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="w-12 h-12 bg-green-100 hover:bg-green-200 rounded-xl font-bold text-xl text-green-700 transition-all duration-300 hover:scale-110 active:scale-95"
                >
                  +
                </button>
              </div>
              {errors.quantity && (
                <p className="text-red-500 text-sm flex items-center gap-1 animate-shake">
                  <span>⚠️</span> {errors.quantity}
                </p>
              )}
            </div>

            {/* Order Summary */}
            {car && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 animate-slideDown">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <CheckCircleOutlined className="text-green-600" />
                  Tóm tắt đơn hàng
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Khách hàng:</span>
                    <span className="font-semibold text-gray-900">
                      {customer || "Chưa nhập"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Mẫu xe:</span>
                    <span className="font-semibold text-gray-900">
                      {selectedCarInfo?.label}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Số lượng:</span>
                    <span className="font-semibold text-gray-900">
                      {quantity} xe
                    </span>
                  </div>
                  <div className="h-px bg-green-300 my-3"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-semibold">Tổng tạm tính:</span>
                    <span className="text-2xl font-bold text-green-600">
                      ${(parseInt(selectedCarInfo?.price.replace(/[$,]/g, "") || "0") * quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold px-8 py-5 rounded-xl shadow-xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                loading ? "animate-pulse" : ""
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  Đang xử lý...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2 text-lg">
                  <ShoppingCartOutlined className="text-xl" />
                  Gửi Yêu Cầu Đặt Xe
                </span>
              )}
            </button>

            {/* Info Note */}
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-4">
              <p className="text-blue-800 text-sm flex items-start gap-2">
                <span className="text-lg">ℹ️</span>
                <span>
                  <strong>Lưu ý:</strong> Sau khi gửi yêu cầu, đội ngũ tư vấn sẽ liên hệ với bạn trong vòng 24h để xác nhận đơn hàng và hỗ trợ thủ tục.
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>

      {/* Snackbar thông báo */}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        TransitionComponent={SlideTransition}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={severity}
          sx={{
            width: "100%",
            fontWeight: "600",
            fontSize: "1rem",
            borderRadius: "12px",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            "& .MuiAlert-icon": {
              fontSize: "1.5rem"
            }
          }}
        >
          {message}
        </Alert>
      </Snackbar>

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.4s ease-out;
        }

        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: #10b981;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #059669;
        }
      `}</style>
    </>
  );
};

export default OrderForm;