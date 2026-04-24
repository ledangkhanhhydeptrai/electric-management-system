import React from "react";
import { Plus, Edit2, Trash2, Package } from "lucide-react";
import { EVVersion } from "@/app/types/EV/EVVersion";

interface VersionsListProps {
  versions: EVVersion[];
  modelId: string;
  modelName: string;
  onAddVersion: (modelId: string) => void;
  onEditVersion: (modelId: string, version: EVVersion) => void;
  onDeleteVersion: (modelId: string, versionId: string) => void;
}

export default function VersionsList({
  versions,
  modelId,
  modelName,
  onAddVersion,
  onEditVersion,
  onDeleteVersion
}: VersionsListProps) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-semibold text-gray-700">
          Các phiên bản của {modelName}
        </h4>
        <button
          onClick={() => onAddVersion(modelId)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg text-sm"
        >
          <Plus className="w-4 h-4" />
          Tạo Version
        </button>
      </div>

      <div className="grid gap-3">
        {versions.map(version =>
          <div
            key={version.id}
            className="bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h5 className="font-bold text-gray-800 text-lg">
                  {version.name}
                </h5>
                <p className="text-2xl font-bold text-green-600 mt-1">
                  ${version.price.toLocaleString("vi-VN")}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEditVersion(modelId, version)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDeleteVersion(modelId, version.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
              <div className="bg-green-50 px-3 py-2 rounded-lg">
                <div className="text-xs text-gray-600">Range</div>
                <div className="font-semibold text-gray-800">
                  {version.range} km
                </div>
              </div>
              <div className="bg-blue-50 px-3 py-2 rounded-lg">
                <div className="text-xs text-gray-600">0-100</div>
                <div className="font-semibold text-gray-800">
                  {version.acceleration}
                </div>
              </div>
              <div className="bg-purple-50 px-3 py-2 rounded-lg">
                <div className="text-xs text-gray-600">Top Speed</div>
                <div className="font-semibold text-gray-800">
                  {version.topSpeed} km/h
                </div>
              </div>
              <div className="bg-orange-50 px-3 py-2 rounded-lg">
                <div className="text-xs text-gray-600">Battery</div>
                <div className="font-semibold text-gray-800">
                  {version.batteryCapacity} kWh
                </div>
              </div>
            </div>

            {version.features &&
              version.features.length > 0 &&
              <div className="mb-3">
                <div className="text-xs font-semibold text-gray-600 mb-2">
                  Tính năng:
                </div>
                <div className="flex flex-wrap gap-2">
                  {version.features.map((feature, idx) =>
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                    >
                      {feature}
                    </span>
                  )}
                </div>
              </div>}

            {version.colors &&
              version.colors.length > 0 &&
              <div>
                <div className="text-xs font-semibold text-gray-600 mb-2">
                  Màu sắc:
                </div>
                <div className="flex gap-2">
                  {version.colors.map(color =>
                    <div
                      key={color.id}
                      className="group relative"
                      title={color.name}
                    >
                      <div
                        className="w-8 h-8 rounded-full border-2 border-gray-300 cursor-pointer hover:scale-110 transition-transform"
                        style={{ backgroundColor: color.hexCode }}
                      />
                    </div>
                  )}
                </div>
              </div>}
          </div>
        )}

        {versions.length === 0 &&
          <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500 text-sm">Chưa có phiên bản nào</p>
            <button
              onClick={() => onAddVersion(modelId)}
              className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              + Thêm phiên bản đầu tiên
            </button>
          </div>}
      </div>
    </div>
  );
}
