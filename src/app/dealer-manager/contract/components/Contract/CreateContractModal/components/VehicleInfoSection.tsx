// components/Contract/ContractModal/VehicleInfoSection.tsx
import React from "react";
import { Car } from "@/app/evm/admin/cars/types";

interface VehicleInfoSectionProps {
  vehicles: Car[];
  vehicleId: string;
  setVehicleId: (val: string) => void;
}

const VehicleInfoSection: React.FC<VehicleInfoSectionProps> = ({
  vehicles,
  vehicleId,
  setVehicleId
}) => {
  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-5 border-2 border-orange-100">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold">
          3
        </div>
        <h3 className="text-lg font-bold text-gray-900">Thông tin xe</h3>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-bold text-gray-700">
          Chọn xe <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
            className="w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-200 outline-none bg-white border-gray-200 hover:border-gray-300 appearance-none"
          >
            <option value="">-- Chọn xe --</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                🚗 {vehicle.modelName} - {vehicle.code} ({vehicle.color})
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl pointer-events-none">
            🚗
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleInfoSection;
