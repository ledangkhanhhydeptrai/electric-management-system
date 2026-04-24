import React from "react";
import { Building2, MapPin, AlertCircle } from "lucide-react";

interface DealerInfoCardProps {
  dealerName: string;
  onClick:()=>void;
}

export const DealerInfoCard: React.FC<DealerInfoCardProps> = ({
  dealerName,
  onClick
}) => {
  return (
    <div className="group bg-gradient-to-br from-pink-500/20 to-rose-500/20 backdrop-blur-md rounded-2xl p-6 border-2 border-pink-400/40 hover:border-rose-400/70 hover:shadow-2xl hover:shadow-pink-500/40 transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center shadow-2xl shadow-pink-500/50 group-hover:scale-110 transition-transform border-2 border-pink-400/50">
          <Building2 className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-2xl font-black text-white drop-shadow-lg">
          Thông tin đại lý
        </h3>
      </div>

      <div className="space-y-4">
        {dealerName ? (
          <>
            <div className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-pink-400/30 hover:bg-white/15 hover:border-pink-400/50 transition-all">
              <MapPin className="w-6 h-6 text-pink-400" />
              <div>
                <p className="text-xs text-pink-300 font-medium">Đại lý</p>
                <p className="text-white font-bold text-lg">
                  {dealerName || "N/A"}
                </p>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold py-4 px-4 rounded-xl transition-all duration-300 shadow-2xl shadow-pink-500/50 hover:shadow-rose-500/70 hover:scale-105 active:scale-95 border-2 border-pink-400/50"
            >
              Xem chi tiết đại lý →
            </button>
          </>
        ) : (
          <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-pink-400/30">
            <AlertCircle className="w-12 h-12 text-pink-400 mx-auto mb-2" />
            <p className="text-pink-200 font-medium">
              Chưa có thông tin đại lý
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
