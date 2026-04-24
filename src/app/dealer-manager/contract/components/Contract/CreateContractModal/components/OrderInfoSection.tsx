// components/Contract/ContractModal/OrderInfoSection.tsx
import React from "react";
import { Dealer } from "@/app/evm/admin/dealerView/types/types";
import { OrderData } from "@/services/orderService/order";

interface OrderInfoSectionProps {
  orders: OrderData[];
  dealers: Dealer[];
  orderId: string;
  setOrderId: (val: string) => void;
}

const OrderInfoSection: React.FC<OrderInfoSectionProps> = ({
  orders,
  orderId,
  setOrderId,
}) => {
  const formatPrice = (price: number) => {
    return (price / 1000000).toLocaleString("vi-VN") + "M";
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border-2 border-blue-100">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
          1
        </div>
        <h3 className="text-lg font-bold text-gray-900">Thông tin đơn hàng</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Order ID */}
        <div className="group">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Chọn đơn hàng <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 outline-none bg-white border-gray-200 hover:border-gray-300 appearance-none"
            >
              <option value="">-- Chọn đơn hàng --</option>
              {orders.map((order) => (
                <option key={order.id} value={order.id}>
                  📦 {order.orderNo} - {order.customerName} (
                  {formatPrice(order.totalPrice)})
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl pointer-events-none">
              📦
            </div>
          </div>
        </div>

        {/* Dealer */}
        {/* <div className="group">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Chọn đại lý <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              value={sellerDealerId}
              onChange={(e) => setSellerDealerId(e.target.value)}
              className="w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 outline-none bg-white border-gray-200 hover:border-gray-300 appearance-none"
            >
              <option value="">-- Chọn đại lý --</option>
              {dealers.map((dealer) => (
                <option key={dealer.id} value={dealer.id}>
                  🏢 {dealer.name} - {dealer.phone}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl pointer-events-none">
              🏢
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default OrderInfoSection;
