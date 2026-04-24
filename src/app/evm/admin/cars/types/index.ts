export interface Cars {
  vin: string;
  code: string;
  mfgDate: string;
  price: number;
  batteryKwh: number;
  rangeKm: number;
  seat: number;
  baseWarrantlyMonths: number;
  color: string;
  status: string;
  manufacturerId: number;
  modelId: number;
}
export interface Car {
  id: string;
  vin: string;
  code: string;
  batteryKwh: number;
  rangeKm: number;
  seat: number;
  baseWarrantyMonths: number;
  color: string;
  status: string;
  manufacturerName: string;
  modelName: string;
  dealerId: string;
  version: string;
  productionDate: string;
  imageUrl: string;
}
export interface SalesData {
  month: string;
  sales: number;
  revenue: number;
}

export interface ModelDistribution {
  name: string;
  value: number;
  color: string;
  [key: string]: string | number; // ✅ Thêm dòng này là TypeScript hết lỗi ngay
}

export type TabId = "dashboard" | "inventory" | "analytics";
