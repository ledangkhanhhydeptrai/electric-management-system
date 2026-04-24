"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Dealer } from "../types/types";
import { useParams } from "next/navigation";
import { getDealerById } from "@/services/dealerService/dealerService";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
import { LoadingState } from "./components/LoadingState";
import { ErrorState } from "./components/ErrorState";
import { copyToClipboard } from "./components/dealer-detail-utils";
import { HeroHeader } from "./components/HeroHeader";
import { QuickStatsBar } from "./components/QuickStatsBar";
import { ContactInfoCard } from "./components/ContactInfoCard";
import { SystemInfoCard } from "./components/SystemInfoCard";
import { StatisticsCards } from "./components/StatisticsCards";
import { ToastNotification } from "./components/ToastNotification";



const DealerId: React.FC = () => {
  useAuthGuard(["EVM Staff"]);
  const { id } = useParams();

  // States
  const [dealer, setDealer] = useState<Dealer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Fetch dealer data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDealerById(String(id));
        if (response) {
          setDealer(response as Dealer);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Handlers
  const handleCopy = async (text: string, field: string) => {
    await copyToClipboard(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleBack = () => window.history.back();

  // Loading state
  if (loading) {
    return <LoadingState />;
  }

  // Error state
  if (!dealer) {
    return <ErrorState onBack={handleBack} />;
  }

  // Main render
  return (
    <div className="mt-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="group flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3.5 rounded-2xl font-semibold transition-all shadow-md hover:shadow-lg border border-gray-100"
        >
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-2 rounded-xl group-hover:from-blue-100 group-hover:to-indigo-100 transition-all">
            <ArrowLeft className="w-5 h-5 text-blue-600 group-hover:-translate-x-1 transition-transform" />
          </div>
          <span>Quay lại danh sách đại lý</span>
        </button>

        {/* Hero Header */}
        <div>
          <HeroHeader dealer={dealer} />
          <QuickStatsBar />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Information */}
          <div className="space-y-6">
            <ContactInfoCard
              dealer={dealer}
              copiedField={copiedField}
              onCopy={handleCopy}
            />
          </div>

          {/* System Information */}
          <div className="space-y-6">
            <SystemInfoCard dealer={dealer} />
          </div>
        </div>

        {/* Statistics Cards */}
        <StatisticsCards />
      </div>

      {/* Toast Notification */}
      {copiedField && <ToastNotification message={copiedField} />}
    </div>
  );
};

export default DealerId;