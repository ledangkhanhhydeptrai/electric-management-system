import { fetchBaseResponse } from "@/config/api.config";
import { ColorEnum } from "../vehicle/vehicle";
export interface ItemProps {
  id: string;
  modelId: string;
  modelName: string;
  color: string;
  quantity: number;
}
export interface DealerOrderData {
  id: string;
  dealerId: string;
  dealerName: string;
  staffId: string;
  staffName: string;
  status:
    | "REQUESTED"
    | "APPROVED"
    | "REJECTED"
    | "IN_PRODUCTION"
    | "IN_TRANSIT"
    | "DELIVERED"
    | "CANCELLED";
  createdAtOrder: number[];
  note: string;
  items: ItemProps[];
}
export const getAllDealerOrder = async () => {
  try {
    const response = await fetchBaseResponse(`/api/dealer-orders`, {
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
export const getDealerOrderById = async (id: string) => {
  try {
    const response = await fetchBaseResponse(`/api/dealer-orders/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log("Error:", error);
  }
};
export const getDealerOrderByDealerId = async (dealerId: string) => {
  try {
    const response = await fetchBaseResponse(
      `/api/dealer-orders/dealer/${dealerId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error", error);
  }
};
export interface ItemPropsDealerForm {
  modelId: string;
  color: ColorEnum;
  quantity: number;
}
export interface DealerForm {
  items: ItemPropsDealerForm[];
  note: string;
}
export const addDealerOrderForm = async ({ items, note }: DealerForm) => {
  try {
    const response = await fetchBaseResponse(`/api/dealer-orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: { items, note }
    });
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export const updateOrderDealerById = async (id: string, status: string) => {
  try {
    const response = await fetchBaseResponse(
      `/api/dealer-orders/${id}/status?status=${status}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    if (response.success === true) {
      return response.data;
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export const updateOrderDealerByApprove = async (id: string) => {
  try {
    const response = await fetchBaseResponse(
      `/api/dealer-orders/${id}/approve`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
export const updateOrderDealerByReject = async (id: string, reason: string) => {
  try {
    const response = await fetchBaseResponse(
      `/api/dealer-orders/${id}/reject?reason=${reason}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
