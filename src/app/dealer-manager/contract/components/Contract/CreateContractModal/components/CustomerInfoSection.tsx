// components/Contract/ContractModal/CustomerInfoSection.tsx
import React from "react";
import { CustomerVIP } from "@/app/evm/admin/customer/types/customer";
import CustomerPreview from "./CustomerPreview";

interface CustomerInfoSectionProps {
  customers: CustomerVIP[];
  buyerId: string;
  setBuyerId: (val: string) => void;
}

const CustomerInfoSection: React.FC<CustomerInfoSectionProps> = ({
  customers,
  buyerId,
  setBuyerId
}) => {
  const selectedCustomer = customers.find((c) => c.id === buyerId);

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 border-2 border-green-100">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold">
          2
        </div>
        <h3 className="text-lg font-bold text-gray-900">
          Thông tin khách hàng
        </h3>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-bold text-gray-700">
          Chọn khách hàng <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select
            value={buyerId}
            onChange={(e) => setBuyerId(e.target.value)}
            className="w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-200 outline-none bg-white border-gray-200 hover:border-gray-300 appearance-none"
          >
            <option value="">-- Chọn khách hàng --</option>
            {customers.map((cust) => {
              const typeEmoji =
                cust.customerType === "COMPANY"
                  ? "⭐"
                  : cust.customerType === "INDIVIDUAL"
                  ? "🏢"
                  : "👤";
              return (
                <option key={cust.id} value={cust.id}>
                  {typeEmoji} {cust.fullName} - {cust.phone} - {cust.email}
                </option>
              );
            })}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl pointer-events-none">
            👤
          </div>
        </div>

        {/* Customer Preview */}
        {buyerId && selectedCustomer && (
          <CustomerPreview customer={selectedCustomer} />
        )}
      </div>
    </div>
  );
};

export default CustomerInfoSection;