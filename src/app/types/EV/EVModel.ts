export enum VehicleColor {
  White = "WHITE",
  Black = "BLACK",
  Blue = "BLUE",
  Red = "RED",
  Silver = "SILVER",
  Grey = "GREY",
  Green = "GREEN",
  Gold = "GOLD"
}

export enum Version {
  ECO = "ECO",
  PLUS = "PLUS",
  PREMIUM = "PREMIUM"
}

export type EVModel = {
  id: string;
  name: string;
  year: number;
  horsepower: number;
  version: string;
  rangeKm: number;
  batteryCapacity: number;
  description: string;
  manufacturerId: number;
  manufacturerName: string;
  basePrice: number;
};
export type CountModel = {
  modelId: string;
  modelName: string;
  version: Version;
  color: VehicleColor;
  count: number;
  code: string;
};
