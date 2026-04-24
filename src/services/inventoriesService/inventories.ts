import { fetchBaseResponse } from "@/config/api.config";

export const getAllInventories = async () => {
  try {
    const response = await fetchBaseResponse(`/inventories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.message === "Inventories retrieved successfully") {
      return response.data;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
export interface Inventories {
  quantity: number;
  dealerId: string;
  vehicleId: string;
  modelId: string;
}

export const createInventories = async ({
  quantity,
  modelId,
  dealerId,
  vehicleId
}: Inventories) => {
  try {
    // Kiểm tra dữ liệu trước khi gửi
    if (!dealerId) throw new Error("dealerId is required");
    if (!vehicleId) throw new Error("vehicleId is required");
    if (!modelId) throw new Error("modelId is required");

    const response = await fetchBaseResponse(`/inventories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: { quantity, modelId, dealerId, vehicleId } // ✅ dùng data với axios
    });

    if (response.success && response.message === "Inventory created successfully") {
      return response.data;
    } else {
      console.error("Failed to create inventory:", response);
      return null;
    }
  } catch (error) {
    console.error("Error creating inventory:", error);
    throw error;
  }
};

export const getInventoryById = async (id: string) => {
  try {
    const response = await fetchBaseResponse(`/inventories/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.message === "Inventory retrieved successfully") {
      return response.data;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
export const getInventoryByDealerId = async (dealerId: string) => {
  try {
    const response = await fetchBaseResponse(
      `/vehicles/dealer/${dealerId}/inventory`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    if (response.message === "Get inventory summary by dealer successfully") {
      return response.data;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
export interface UpdateInventory {
  name: string;
  quantity: number;
  qtyReserved: number;
  qtyIncoming: number;
}
export const UpdateInventoryById = async (
  id: string,
  payload: UpdateInventory
) => {
  try {
    const response = await fetchBaseResponse(`/inventories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      data: payload
    });
    if (response.message === "Inventory updated successfully") {
      return response.data;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
export const DeleteInventoryById = async (id: string) => {
  try {
    const response = await fetchBaseResponse(`/inventories/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log("Message", response.message);
    if (response.message === "Inventory deleted successfully") {
      return true;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
export const getModelInventoryId = async (modelId: string) => {
  try {
    const response = await fetchBaseResponse(
      `/inventories/model/${modelId}/quantity`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    if (response.message === "Inventory quantity retrieved successfully") {
      return response.data;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
