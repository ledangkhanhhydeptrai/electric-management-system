export type Contract = {
  id: string;
  code: string;
  orderId: string;
  buyerId: string;
  sellerDealerId: string;
  vehicleId: string;
  subtotal: number;
  discount: number;
  vat: number;
  total: number;
  deposit: number;
  paymentMethod: "CASH" | "TRANSFER" | "CARD" | "FINANCING";
  status: "DRAFT" | "PENDING" | "COMPLETED" | "CANCELLED";
  pdfUrl: string;
  notes: string;
  signedAt: string;
  items: StatsCardProps[];
};
export interface StatsCardProps {
  itemName: string;
  qty: number;
  unitPrice: number;
  amount: number;
}
