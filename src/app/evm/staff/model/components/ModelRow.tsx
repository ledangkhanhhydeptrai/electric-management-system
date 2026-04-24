import React from "react";
import {
  Car,
  Package,
  Edit2,
  Trash2,
  Zap,
  Battery,
  Gauge,
} from "lucide-react";
import { EVModel } from "@/app/types/EV/EVModel";
interface ModelRowProps {
  model: EVModel;
  onEditModel: () => void;
  onDelete: (id: string) => void;
  onClick: () => void;
}
export const VndSign = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <text x="0" y="18" fontSize="18" fontWeight="bold">₫</text>
  </svg>
);
export default function ModelRow({
  model,
  onEditModel,
  onDelete,
  onClick
}: ModelRowProps) {
  return (
    <tr
      className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/30 transition-all duration-200 cursor-pointer group border-b border-gray-100 last:border-0"
      onClick={onClick}
    >
      {/* Model Name */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-200 group-hover:scale-110">
            <Car className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {model.name}
            </div>
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <Package className="w-3 h-3" />
              <span>
                {model.manufacturerName}
              </span>
            </div>
          </div>
        </div>
      </td>

      {/* Year */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
          <span className="text-gray-700 font-medium">
            {model.year}
          </span>
        </div>
      </td>

      {/* Horsepower */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-2">
          <Gauge className="w-4 h-4 text-orange-500" />
          <span className="text-gray-700 font-medium">
            {model.horsepower}
          </span>
          <span className="text-xs text-gray-500">hp</span>
        </div>
      </td>

      {/* Version */}
      <td className="px-4 py-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-lg text-xs font-semibold group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-200 shadow-sm">
          <VndSign className="w-3.5 h-3.5" />
          {model.basePrice.toLocaleString("vi-VN")}
        </span>
      </td>

      {/* Range */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-green-500" />
          <span className="text-gray-700 font-medium">
            {model.rangeKm}
          </span>
          <span className="text-xs text-gray-500">km</span>
        </div>
      </td>

      {/* Battery */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-2">
          <Battery className="w-4 h-4 text-emerald-500" />
          <span className="text-gray-700 font-medium">
            {model.batteryCapacity}
          </span>
        </div>
      </td>

      {/* Description */}
      <td className="px-4 py-4 text-gray-600 text-sm max-w-xs">
        <div className="truncate">
          {model.description}
        </div>
      </td>

      {/* Manufacturer */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-1.5">
          <Package className="w-4 h-4 text-purple-500" />
          <span className="text-gray-700 font-medium">
            {model.manufacturerName}
          </span>
        </div>
      </td>

      {/* Actions */}
      <td className="px-4 py-4 text-right">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={e => {
              e.stopPropagation();
              onEditModel();
            }}
            className="group/edit inline-flex items-center gap-1.5 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all duration-200 font-medium shadow-sm hover:shadow-md hover:scale-105"
          >
            <Edit2 className="w-3.5 h-3.5 group-hover/edit:rotate-12 transition-transform" />
            <span>Sửa</span>
          </button>
          <button
            onClick={e => {
              e.stopPropagation();
              onDelete(model.id);
            }}
            className="group/delete inline-flex items-center gap-1.5 px-3 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all duration-200 font-medium shadow-sm hover:shadow-md hover:scale-105"
          >
            <Trash2 className="w-3.5 h-3.5 group-hover/delete:rotate-12 transition-transform" />
            <span>Xóa</span>
          </button>
        </div>
      </td>
    </tr>
  );
}
