"use client";
import React from "react";
import { Search, Building2 } from "lucide-react";
import { Dealer } from "./types/types";
import { getAllDealer } from "@/services/dealerService/dealerService";
import LoadingSpinner from "./LoadingSpinner";
import DealerStats from "./components/DealerStats";
import DealerSearchBar from "./components/DealerSearchBar";
import DealerList from "./components/DealerList";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
export default function DealersView() {
  useAuthGuard(["Staff"]);
  const [dealers, setDealers] = React.useState<Dealer[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getAllDealer();
        if (Array.isArray(response)) setDealers(response);
        else setDealers([]);
      } catch (error) {
        console.error("Error fetching dealers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;

  const filteredDealers = dealers.filter((dealer) => {
    const matchesSearch =
      dealer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dealer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dealer.phone.includes(searchQuery) ||
      dealer.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="mt-22 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
              <Building2 className="w-10 h-10 text-blue-600" />
              Quản lý đại lý
            </h1>
            <p className="text-gray-600 mt-2">
              Quản lý thông tin liên hệ đại lý
            </p>
          </div>
        </div>

        <DealerStats dealers={dealers} />

        <DealerSearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          // onAdd={() => openModal("add")}
        />

        {searchQuery && (
          <div className="text-sm text-gray-700 bg-blue-50 border-2 border-blue-200 px-5 py-3 rounded-xl inline-flex items-center gap-2 font-medium">
            <Search className="w-4 h-4 text-blue-600" /> Tìm thấy{" "}
            <span className="font-bold text-blue-600">
              {filteredDealers.length}
            </span>{" "}
            kết quả
          </div>
        )}

        <DealerList
          dealers={filteredDealers}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery("")}
        />
      </div>
    </div>
  );
}
