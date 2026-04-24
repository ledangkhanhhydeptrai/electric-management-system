// components/dealer-detail/types.ts
export interface DealerStaffResponse {
  id: string;
  fullName: string;
}

export interface Notification {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
}

export interface ContactCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  onCopy?: () => void;
  copied?: boolean;
  gradient: string;
}