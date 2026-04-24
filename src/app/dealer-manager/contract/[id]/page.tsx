"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Contract } from "../types/contract";
import { getContractById } from "@/services/contract/contractService";
import { SignaturePadModal } from "../components/SignaturePad";
import { useAuthGuard } from "../../../hooks/useAuthGuard";
import { ContractHeader } from "./components/ContractHeader";
import { ContractInfoCard } from "./components/ContractInfoCard";
import { ContractItemsTable } from "./components/ContractItemsTable";
import { PaymentSummary } from "./components/PaymentSummary";
import { Loader2 } from "lucide-react";
import { CustomerVIP } from "@/app/evm/admin/customer/types/customer";
import { searchFilterCustomer } from "@/services/customerService/customer";
import { Car } from "@/app/evm/admin/cars/types";
import { searchFilter } from "@/services/vehicle/vehicle";
import { Dealer } from "@/app/evm/admin/dealerView/types/types";
import { getAllDealer } from "@/services/dealerService/dealerService";

const ContractById: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const [data, setData] = useState<Contract | null>(null);
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);
  const [signerName, setSignerName] = useState("");
  const [signerIdNo, setSignerIdNo] = useState("");
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = React.useState<CustomerVIP[]>([]);
  const [vehicle, setVehicle] = React.useState<Car[]>([]);
  const [dealer, setDealer] = React.useState<Dealer[]>([]);
  useAuthGuard(["Dealer Manager"]);

  // Fetch Contract Data
  useEffect(
    () => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const contract = await getContractById(String(id));
          if (contract) {
            setData(contract as Contract);
          }
        } catch (error) {
          console.error("Error fetching contract:", error);
        } finally {
          setLoading(false);
        }
      };
      const fetchCustomer = async () => {
        try {
          const response = await searchFilterCustomer({});
          if (Array.isArray(response)) {
            setCustomer(response);
          } else {
            setCustomer([]);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
      const fetchVehicle = async () => {
        try {
          const response = await searchFilter({});
          if (Array.isArray(response)) {
            setVehicle(response);
          } else {
            setVehicle([]);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
      const fetchDealer = async () => {
        try {
          const response = await getAllDealer();
          if (Array.isArray(response)) {
            setDealer(response);
          } else {
            setDealer([]);
          }
        } catch (error) {
          console.error("Error", error);
        }
      };
      fetchCustomer();
      fetchDealer();
      fetchData();
      fetchVehicle();
    },
    [id]
  );

  const handleGoBack = () => router.back();

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Đang tải hợp đồng...</p>
        </div>
      </div>
    );
  }

  // Error states
  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">❌</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Không tìm thấy hợp đồng
          </h2>
          <p className="text-gray-600 mb-6">
            Hợp đồng bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <button
            onClick={handleGoBack}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg font-semibold"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  const canSign = data.status === "DRAFT" || data.status === "PENDING";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 mt-16">
      <div className="max-w-7xl mx-auto">
        <ContractHeader
          contractCode={data.code}
          status={data.status}
          onGoBack={handleGoBack}
          onSign={() => setIsSignModalOpen(true)}
          canSign={canSign}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contract Items Table */}
            {data.items &&
              data.items.length > 0 &&
              <ContractItemsTable items={data.items} />}

            {/* Payment Summary */}
            <PaymentSummary
              subtotal={data.subtotal}
              discount={data.discount}
              vat={data.vat}
              total={data.total}
              deposit={data.deposit}
              notes={data.notes}
            />
          </div>

          {/* Right Column - Contract Info */}
          <div className="lg:col-span-1">
            <ContractInfoCard
              orderId={data.orderId}
              paymentMethod={data.paymentMethod}
              buyerId={data.buyerId}
              customers={customer}
              vehicle={vehicle}
              vehicleId={data.vehicleId}
              dealers={dealer}
              dealerId={data.sellerDealerId}
            />
          </div>
        </div>
      </div>

      <SignaturePadModal
        contractId={data.id}
        signerRole="SELLER"
        signerName={signerName}
        setSignerName={setSignerName}
        signerIdNo={signerIdNo}
        setSignerIdNo={setSignerIdNo}
        isOpen={isSignModalOpen}
        onClose={() => setIsSignModalOpen(false)}
        onSave={signature => console.log("Đã lưu chữ ký:", signature)}
      />

      <style>{`
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
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ContractById;
