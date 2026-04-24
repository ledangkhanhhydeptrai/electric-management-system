// components/dealer-detail/DealerHeader.tsx
import React from "react";
import { Building2, Clock } from "lucide-react";

interface DealerHeaderProps {
  name: string;
  createdAt: string;
  getRelativeTime: (dateStr: string) => string;
}

export const DealerHeader: React.FC<DealerHeaderProps> = ({
  name,
  createdAt,
  getRelativeTime
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />
        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{name}</h1>
              <div className="flex items-center gap-2 text-blue-100 mt-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Tạo {getRelativeTime(createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};