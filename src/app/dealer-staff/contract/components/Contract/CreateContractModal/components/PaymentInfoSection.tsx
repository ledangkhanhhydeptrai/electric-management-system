// components/Contract/ContractModal/PaymentInfoSection.tsx
import React from "react";

interface PaymentInfoSectionProps {
  paymentMethod: "CASH" | "TRANSFER" | "CARD";
  setPaymentMethod: (val: "CASH" | "TRANSFER" | "CARD") => void;
  deposit: number;
  setDeposit: (val: number) => void;
  discount: number;
  setDiscount: (val: number) => void;
  vat: number;
  setVat: (val: number) => void;
}

const PaymentInfoSection: React.FC<PaymentInfoSectionProps> = ({
  paymentMethod,
  setPaymentMethod,
  deposit,
  setDeposit,
  discount,
  setDiscount,
  vat,
  setVat
}) => {
  const paymentMethods = [
    { value: "CASH", label: "Tiền mặt", icon: "💵" },
    { value: "TRANSFER", label: "Chuyển khoản", icon: "🏦" },
    { value: "CARD", label: "Thẻ", icon: "💳" }
  ] as const;

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 border-2 border-purple-100">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
          4
        </div>
        <h3 className="text-lg font-bold text-gray-900">
          Thông tin thanh toán
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Payment Method */}
        <div className="col-span-2">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Phương thức thanh toán <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-3">
            {paymentMethods.map((method) => (
              <button
                key={method.value}
                type="button"
                onClick={() => setPaymentMethod(method.value)}
                className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                  paymentMethod === method.value
                    ? "bg-purple-100 border-purple-500 shadow-md scale-105"
                    : "bg-white border-gray-200 hover:border-purple-300"
                }`}
              >
                <div className="text-2xl mb-1">{method.icon}</div>
                <div className="text-xs font-bold text-gray-900">
                  {method.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Deposit */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Đặt cọc (VNĐ) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-xl">
              💰
            </div>
            <input
              type="number"
              value={deposit}
              onChange={(e) => setDeposit(Number(e.target.value))}
              className="w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200 outline-none bg-white border-gray-200 hover:border-gray-300"
              placeholder="50000000"
            />
          </div>
        </div>

        {/* Discount */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Giảm giá (VNĐ)
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-xl">
              🏷️
            </div>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              className="w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200 outline-none bg-white border-gray-200 hover:border-gray-300"
              placeholder="0"
            />
          </div>
        </div>

        {/* VAT */}
        <div className="col-span-2">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            VAT (%)
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-xl">
              📊
            </div>
            <input
              type="number"
              value={vat}
              onChange={(e) => setVat(Number(e.target.value))}
              className="w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200 outline-none bg-white border-gray-200 hover:border-gray-300"
              placeholder="10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfoSection;
