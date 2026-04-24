import React from "react";
import { Building2, Clock, CalendarDays, Sparkles } from "lucide-react";
import { Dealer } from "../../types/types";
import { formatDateTime, getRelativeTime } from "./dealer-detail-utils";

interface HeroHeaderProps {
  dealer: Dealer;
}

export const HeroHeader: React.FC<HeroHeaderProps> = ({ dealer }) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
      <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 md:p-12">
        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full -ml-40 -mb-40 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
        </div>

        {/* Content */}
        <div className="relative">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/30 shadow-lg">
                <Building2 className="w-10 h-10 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    {dealer.name}
                  </h1>
                  <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold border border-white/30">
                    <Sparkles className="w-3 h-3 inline mr-1" />
                    Đại lý
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-blue-100">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      Tạo {getRelativeTime(dealer.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {formatDateTime(dealer.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};