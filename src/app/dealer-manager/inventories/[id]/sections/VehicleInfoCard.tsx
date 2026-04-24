import React, { useState } from "react";
import { Car, ExternalLink } from "lucide-react";

import { VehicleDetailModal } from "./VehicleDetailModal";
import { Modal } from "../shared/Modal";

interface VehicleInfoCardProps {
  vehicleModelId: string;
  vehicleModelName: string;
  // Thêm các props cho số lượng xe
  qtyOnHand?: number;
  available?: number;
  qtyReserved?: number;
  qtyIncoming?: number;
  // Optional specifications
  specifications?: {
    engine?: string;
    fuelType?: string;
    transmission?: string;
    color?: string;
    year?: number;
  };
}

export const VehicleInfoCard: React.FC<VehicleInfoCardProps> = ({
  vehicleModelId,
  vehicleModelName,
  qtyOnHand = 0,
  available = 0,
  qtyReserved = 0,
  qtyIncoming = 0,
  specifications
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="group bg-gradient-to-br from-violet-500/20 to-purple-500/20 backdrop-blur-md rounded-2xl p-6 border-2 border-violet-400/40 hover:border-purple-400/70 hover:shadow-2xl hover:shadow-violet-500/40 transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-2xl shadow-violet-500/50 group-hover:scale-110 transition-transform border-2 border-violet-400/50">
            <Car className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-2xl font-black text-white drop-shadow-lg">
            Thông tin xe
          </h3>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-violet-400/30 hover:bg-white/15 hover:border-violet-400/50 transition-all">
            <span className="text-violet-200 font-semibold">Mã mẫu xe</span>
            <span className="text-white font-mono text-sm font-bold bg-violet-500/20 px-3 py-1 rounded-lg border border-violet-400/30">
              {vehicleModelId}
            </span>
          </div>
          <div className="flex justify-between items-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-violet-400/30 hover:bg-white/15 hover:border-violet-400/50 transition-all">
            <span className="text-violet-200 font-semibold">Tên mẫu xe</span>
            <span className="text-white font-bold">
              {vehicleModelName || "N/A"}
            </span>
          </div>

          {/* Detail Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-bold py-4 px-4 rounded-xl transition-all duration-300 shadow-2xl shadow-violet-500/50 hover:shadow-purple-500/70 hover:scale-105 active:scale-95 border-2 border-violet-400/50 flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-5 h-5" />
            Xem chi tiết xe
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Chi tiết xe"
      >
        <VehicleDetailModal
          vehicleDetail={{
            vehicleModelId,
            vehicleModelName,
            qtyOnHand,
            available,
            qtyReserved,
            qtyIncoming,
            specifications
          }}
        />
      </Modal>
    </>
  );
};