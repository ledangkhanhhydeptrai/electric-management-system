import { EVColor } from "./EVColor";

export type EVVersion = {
  id: string;
  name: string;
  price: number;
  range?: number;
  acceleration?: string;
  topSpeed?: number;
  batteryCapacity?: number;
  motorPower?: number;
  chargingTime?: string;
  drivetrain?: string;
  seats?: number;
  features?: string[];
  colors: EVColor[];
};
