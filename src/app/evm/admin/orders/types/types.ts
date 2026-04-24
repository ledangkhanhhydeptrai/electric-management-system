export type OrderStatus =
  | "DRAFT"
  | "PENDING"
  | "CONFIRMED"
  | "ALLOCATED"
  | "DELIVERED"
  | "CANCELLED";

export interface Order {
  id: string;
  orderNo: string;
  dealerId: string;
  customerName: string;
  staffId: string;
  dealerName: string;
  staffName: string;
  customerId: string;
  totalPrice: number;
  status: OrderStatus;
  orderDate: string;
}

export interface OrderStats {
  total: number;
  pending: number;
  delivered: number;
  totalRevenue: number;
}

export interface SelectOption {
  value: string;
  label: string;
}
