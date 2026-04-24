import { fetchBaseResponse } from "@/config/api.config";

export const getAllOrder = async () => {
  try {
    const response = await fetchBaseResponse(`/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.message === "Orders retrieved successfully") {
      return response.data;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
export type ItemProps = {
  inventoryId: string;
  quantity: number;
  discountAmount: number;
};
export interface OrderProps {
  customerId: string;
  items: ItemProps[];
}
export const createOrder = async ({ customerId, items }: OrderProps) => {
  try {
    const response = await fetchBaseResponse(`/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: { customerId, items }
    });
    if (response.message === "Order created successfully") {
      return response.data;
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export interface OrderItem {
  id: string;
  orderId: string;
  quantity: number;
  unitPrice: number;
  discountAmount: number;
  lineTotal: number;
  vehicleVin: string;
  vehicleCode: string;
}

export interface OrderData {
  id: string;
  orderNo: string;
  dealerId: string;
  dealerName: string;
  staffId: string;
  staffName: string;
  customerId: string;
  customerName: string;
  totalPrice: number;
  status: string;
  orderDate: string;
  createdAt: string;
  items: OrderItem[];
}
export const getOrderById = async (id: string): Promise<OrderData | null> => {
  try {
    const response = await fetchBaseResponse(`/orders/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (response.message === "Order retrieved successfully") {
      return response.data as OrderData;
    }

    return null;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const getOrderDealerById = async (dealerId: string) => {
  try {
    const response = await fetchBaseResponse(`/orders/dealer/${dealerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.message === "Dealer orders retrieved successfully") {
      return response.data;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
export interface updateProps {
  status: string;
}
export const handleUpdateOrder = async (
  id: string,
  { status }: updateProps
) => {
  try {
    const response = await fetchBaseResponse(`/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      data: { status }
    });
    if (response.message === "Order updated successfully") {
      return response.data;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
export interface updateItem {
  itemId: string;
  quantity: number;
  discountAmount: number;
}
export const updateItem = async (
  orderId: string,
  { itemId, quantity, discountAmount }: updateItem
) => {
  try {
    const response = await fetchBaseResponse(
      `/orders/${orderId}/items/${itemId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        data: { quantity, discountAmount }
      }
    );
    if (response.message === "Order item updated successfully") {
      return response.data;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
export const deleteOrderById = async (id: string) => {
  try {
    const response = await fetchBaseResponse(`/orders/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
export const deleteOrderIdItemId = async (orderId: string, itemId: string) => {
  try {
    const response = await fetchBaseResponse(
      `/orders/${orderId}/items/${itemId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
export const getDealerIdByTracking = async (id: string) => {
  try {
    const response = await fetchBaseResponse(`/orders/${id}/tracking`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
export const getAllOrderByDealerId = async (dealerId: string) => {
  try {
    const response = await fetchBaseResponse(`/orders/dealer/${dealerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
