import React from "react";
import { Package, Circle, MapPin } from "lucide-react";
import { Car } from "../../types";


interface VehicleDetailsCardProps {
  data: Car;
}

export const VehicleDetailsCard: React.FC<VehicleDetailsCardProps> = ({
  data
}) => {
  return (
    <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-8 border border-gray-600 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
          <Package className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Thông tin chi tiết</h2>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-600 bg-opacity-30 rounded-xl p-4 border border-gray-600 hover:border-blue-500 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-4 h-4 text-blue-400" />
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">
              Mã xe
            </p>
          </div>
          <p className="text-white text-xl font-bold font-mono">{data.code}</p>
        </div>

        <div className="bg-gray-600 bg-opacity-30 rounded-xl p-4 border border-gray-600 hover:border-purple-500 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Circle className="w-4 h-4 text-purple-400" />
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">
              Màu sắc
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-white shadow-lg" />
            <p className="text-white text-xl font-bold">{data.color}</p>
          </div>
        </div>

        <div className="bg-gray-600 bg-opacity-30 rounded-xl p-4 border border-gray-600 hover:border-green-500 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-green-400" />
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">
              Nhà sản xuất
            </p>
          </div>
          <p className="text-white text-xl font-bold">
            {data.manufacturerName}
          </p>
        </div>
      </div>
    </div>
  );
};