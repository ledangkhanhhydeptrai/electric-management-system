import React from "react";
import {
  ShoppingCart,
  CreditCard,
  User,
  Building2,
  CarFrontIcon
} from "lucide-react";
import { CustomerVIP } from "@/app/evm/admin/customer/types/customer";
import { Car } from "@/app/evm/admin/cars/types";
import { Dealer } from "@/app/evm/admin/dealerView/types/types";

interface ContractInfoCardProps {
  customers: CustomerVIP[]; // ✅ là mảng
  vehicle: Car[];
  orderId: string;
  paymentMethod: string;
  buyerId: string;
  vehicleId: string;
  dealerId: string;
  dealers: Dealer[];
}

export const ContractInfoCard: React.FC<ContractInfoCardProps> = ({
  customers,
  orderId,
  paymentMethod,
  buyerId,
  vehicle,
  vehicleId,
  dealerId,
  dealers
}) => {
  const buyer = customers.find((c) => c.id === buyerId); // ✅ tìm đúng khách hàng theo ID
  const carname = vehicle.find((c) => c.id === vehicleId);
  const dealername = dealers.find((c) => c.id === dealerId);
  const getPaymentMethodLabel = (method: string) => {
    const methods: Record<string, { label: string; icon: React.ReactNode }> = {
      TRANSFER: {
        label: "Chuyển khoản",
        icon: <CreditCard className="w-4 h-4" />
      },
      CASH: { label: "Tiền mặt", icon: <CreditCard className="w-4 h-4" /> },
      CARD: { label: "Thẻ", icon: <CreditCard className="w-4 h-4" /> }
    };
    return (
      methods[method] || {
        label: method,
        icon: <CreditCard className="w-4 h-4" />
      }
    );
  };

  const paymentInfo = getPaymentMethodLabel(paymentMethod);

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden backdrop-blur-lg bg-opacity-90">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <ShoppingCart className="w-6 h-6" />
          Thông tin cơ bản
        </h2>
      </div>

      <div className="p-6 space-y-4">
        {/* Order ID */}
        <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">Mã đơn hàng</p>
            <p className="text-sm font-bold text-gray-800 break-all">
              {orderId || "N/A"}
            </p>
          </div>
        </div>

        {/* Payment Method */}
        <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
          <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
            {paymentInfo.icon}
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">Phương thức thanh toán</p>
            <p className="text-lg font-bold text-gray-800">
              {paymentInfo.label}
            </p>
          </div>
        </div>

        {/* Buyer */}
        {buyer && (
          <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Khách hàng</p>
              <p className="text-sm font-semibold text-gray-800 break-all">
                {buyer.fullName}
              </p>
              {buyer.email && (
                <p className="text-xs text-gray-500">{buyer.email}</p>
              )}
            </div>
          </div>
        )}

        {/* Vehicle VIN */}
        {carname && (
          <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
              <CarFrontIcon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">VIN xe</p>
              <p className="text-sm font-semibold text-gray-800 break-all">
                {carname.vin}
              </p>
            </div>
          </div>
        )}

        {/* Dealer */}
        {dealername && (
          <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-cyan-50 to-sky-50 rounded-xl">
            <div className="w-10 h-10 bg-cyan-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Đại lý</p>
              <p className="text-lg font-bold text-gray-800">{dealername.name}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
