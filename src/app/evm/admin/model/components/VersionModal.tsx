import React from "react";
import { Check } from "lucide-react";
import { EVVersion } from "@/app/types/EV/EVVersion";
import Modal from "./Modal";

interface VersionModalProps {
  isOpen: boolean;
  version: EVVersion | null;
  onClose: () => void;
  onSave: () => void;
  onChange: (version: EVVersion | null) => void;
}

export default function VersionModal({
  isOpen,
  version,
  onClose,
  onSave,
  onChange
}: VersionModalProps) {
  const handleFieldChange = (field: string, value: string | number) => {
    onChange(
      version
        ? { ...version, [field]: value }
        : {
            id: "",
            name: "",
            price: 0,
            colors: [],
            features: [],
            [field]: value
          }
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={version?.id ? "Chỉnh sửa Version" : "Tạo Version Mới"}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tên Version <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={version?.name || ""}
            onChange={(e) => handleFieldChange("name", e.target.value)}
            placeholder="VD: Standard, Premium, Long Range..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Giá ($) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={version?.price || 0}
              onChange={(e) =>
                handleFieldChange("price", Number(e.target.value))
              }
              placeholder="25000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Range (km)
            </label>
            <input
              type="number"
              value={version?.range || 0}
              onChange={(e) =>
                handleFieldChange("range", Number(e.target.value))
              }
              placeholder="320"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              0-100 (s)
            </label>
            <input
              type="text"
              value={version?.acceleration || ""}
              onChange={(e) =>
                handleFieldChange("acceleration", e.target.value)
              }
              placeholder="6.5s"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Top Speed (km/h)
            </label>
            <input
              type="number"
              value={version?.topSpeed || 0}
              onChange={(e) =>
                handleFieldChange("topSpeed", Number(e.target.value))
              }
              placeholder="180"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số chỗ
            </label>
            <input
              type="number"
              value={version?.seats || 5}
              onChange={(e) =>
                handleFieldChange("seats", Number(e.target.value))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pin (kWh)
            </label>
            <input
              type="number"
              value={version?.batteryCapacity || 0}
              onChange={(e) =>
                handleFieldChange("batteryCapacity", Number(e.target.value))
              }
              placeholder="60"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Động cơ (hp)
            </label>
            <input
              type="number"
              value={version?.motorPower || 0}
              onChange={(e) =>
                handleFieldChange("motorPower", Number(e.target.value))
              }
              placeholder="200"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hệ dẫn động
            </label>
            <select
              value={version?.drivetrain || "RWD"}
              onChange={(e) => handleFieldChange("drivetrain", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="RWD">RWD</option>
              <option value="FWD">FWD</option>
              <option value="AWD">AWD</option>
              <option value="4WD">4WD</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thời gian sạc
            </label>
            <input
              type="text"
              value={version?.chargingTime || ""}
              onChange={(e) =>
                handleFieldChange("chargingTime", e.target.value)
              }
              placeholder="8h (AC) / 30min (DC)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            💡 <strong>Lưu ý:</strong> Tính năng và màu sắc sẽ được thêm trong
            phiên bản tiếp theo
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={onSave}
            className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            {version?.id ? "Cập nhật" : "Tạo Version"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
