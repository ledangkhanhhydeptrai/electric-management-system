export const formatDate = (dateString?: string): string => {
  if (!dateString) return "N/A";
  return dateString;
};

export const formatNumber = (num: number): string => {
  return num.toLocaleString("vi-VN");
};

export const calculatePercentage = (
  available: number,
  qtyOnHand: number
): string => {
  if (qtyOnHand === 0) return "0";
  return ((available / qtyOnHand) * 100).toFixed(1);
};