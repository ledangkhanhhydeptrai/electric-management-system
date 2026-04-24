// Helper functions cho Dealer Order
import { ItemProps } from "@/services/dealerOrderService/dealerOrder";

/**
 * Format date array thành string
 * @param dateArray - Array [year, month, day, hour, minute]
 * @returns Formatted date string DD/MM/YYYY HH:mm
 */
export const formatDate = (dateArray: number[]): string => {
  const [year, month, day, hour, minute] = dateArray;
  return `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year} ${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`;
};

/**
 * Tính tổng số lượng xe trong items
 * @param items - Danh sách items
 * @returns Tổng số lượng
 */
export const getTotalQuantity = (items: ItemProps[]): number => {
  return items.reduce((sum, item) => sum + item.quantity, 0);
};

/**
 * Filter orders based on search term and status
 * @param orders - All orders
 * @param searchTerm - Search keyword
 * @param filterStatus - Status filter
 * @returns Filtered orders
 */
export const filterOrders = <T extends {
  dealerName: string;
  staffName: string;
  status: string;
  items: Array<{ modelName: string }>;
}>(
  orders: T[],
  searchTerm: string,
  filterStatus: string
): T[] => {
  return orders.filter((order) => {
    const matchesSearch =
      order.dealerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.staffName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) =>
        item.modelName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesStatus = filterStatus === "ALL" || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });
};

/**
 * Validate order form data
 * @param formData - Form data to validate
 * @returns Object containing validation errors
 */
export const validateOrderForm = (formData: {
  dealerId: string;
  staffId: string;
  items: Array<{ modelId: string; color: string; quantity: number }>;
}): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!formData.dealerId) {
    errors.dealerId = "Vui lòng chọn đại lý";
  }

  if (!formData.staffId) {
    errors.staffId = "Vui lòng chọn nhân viên";
  }

  if (formData.items.length === 0) {
    errors.items = "Vui lòng thêm ít nhất một xe";
  } else {
    formData.items.forEach((item, index) => {
      if (!item.modelId) {
        errors[`item_${index}_model`] = "Vui lòng chọn model xe";
      }
      if (!item.color) {
        errors[`item_${index}_color`] = "Vui lòng chọn màu sắc";
      }
      if (item.quantity < 1) {
        errors[`item_${index}_quantity`] = "Số lượng phải lớn hơn 0";
      }
    });
  }

  return errors;
};