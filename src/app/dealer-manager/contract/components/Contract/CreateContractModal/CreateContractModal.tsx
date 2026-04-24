// components/Contract/ContractModal/index.tsx - Refactored Version
"use client";
import React from "react";
import { Car } from "@/app/evm/admin/cars/types";
import { CustomerVIP } from "@/app/evm/admin/customer/types/customer";
import { Dealer } from "@/app/evm/admin/dealerView/types/types";
import { ItemExtra } from "@/services/contract/contractService";
import ContractModalHeader from "./components/ContractModalHeader";
import OrderInfoSection from "./components/OrderInfoSection";
import VehicleInfoSection from "./components/VehicleInfoSection";
import PaymentInfoSection from "./components/PaymentInfoSection";
import ItemsListSection from "./components/ItemsListSection";
import NotesSection from "./components/NotesSection";
import ModalFooter from "./components/ModalFooter";
import CustomerInfoSection from "./components/CustomerInfoSection";
import { OrderData } from "@/services/orderService/order";

interface CreateContractModalProps {
  customer: CustomerVIP[];
  isOpen: boolean;
  onClose: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  orders: OrderData[];
  dealers: Dealer[];
  vehicles: Car[];
  orderId: string;
  setOrderId: (val: string) => void;
  buyerId: string;
  setBuyerId: (val: string) => void;
  vehicleId: string;
  setVehicleId: (val: string) => void;
  paymentMethod: "CASH" | "TRANSFER" | "CARD";
  setPaymentMethod: (val: "CASH" | "TRANSFER" | "CARD") => void;
  deposit: number;
  setDeposit: (val: number) => void;
  discount: number;
  setDiscount: (val: number) => void;
  vat: number;
  setVat: (val: number) => void;
  extraItems: ItemExtra[];
  setExtraItems: (val: ItemExtra[]) => void;
  notes: string;
  setNotes: (val: string) => void;
  contractId?: string; // ✅ NEW: For edit mode
  maxQuantities: { [itemName: string]: number }; // ✅ Add this
}

export const CreateContractModal: React.FC<CreateContractModalProps> = ({
  isOpen,
  onClose,
  handleSubmit,
  orders,
  vehicles,
  dealers,
  orderId,
  setOrderId,
  buyerId,
  setBuyerId,
  vehicleId,
  setVehicleId,
  paymentMethod,
  setPaymentMethod,
  deposit,
  setDeposit,
  discount,
  setDiscount,
  vat,
  setVat,
  extraItems,
  setExtraItems,
  notes,
  setNotes,
  contractId,
  customer,
  maxQuantities = {} // ✅ Receive maxQuantities
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <ContractModalHeader contractId={contractId} onClose={onClose} />

        {/* Form Content */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(95vh-240px)] custom-scrollbar">
            {/* Section 1: Order Info */}
            <OrderInfoSection
              orders={orders}
              dealers={dealers}
              orderId={orderId}
              setOrderId={setOrderId}
            />

            {/* Section 2: Customer Info */}
            <CustomerInfoSection
              customers={customer}
              buyerId={buyerId}
              setBuyerId={setBuyerId}
            />

            {/* Section 3: Vehicle Info */}
            <VehicleInfoSection
              vehicles={vehicles}
              vehicleId={vehicleId}
              setVehicleId={setVehicleId}
            />

            {/* Section 4: Payment Info */}
            <PaymentInfoSection
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              deposit={deposit}
              setDeposit={setDeposit}
              discount={discount}
              setDiscount={setDiscount}
              vat={vat}
              setVat={setVat}
            />

            {/* Section 5: Items List */}
            <ItemsListSection
              extraItems={extraItems}
              setExtraItems={setExtraItems}
              maxQuantities={maxQuantities}
            />

            {/* Section 6: Notes */}
            <NotesSection notes={notes} setNotes={setNotes} />
          </div>

          {/* Footer */}
          <ModalFooter itemsCount={extraItems.length} onClose={onClose} />
        </form>

        {/* Custom Scrollbar Styles */}
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f5f9;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #6366f1 0%, #4f46e5 100%);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, #4f46e5 0%, #4338ca 100%);
          }
        `}</style>
      </div>
    </div>
  );
};
