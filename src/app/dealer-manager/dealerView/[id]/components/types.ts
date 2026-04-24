// components/dealer-detail-view/types.ts
export interface DealerStaffResponse {
  id: string;
  fullName: string;
}

export interface Notification {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
}