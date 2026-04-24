import { fetchBaseResponse } from "@/config/api.config";
import { Enum } from "../vehicleModel/vehicle";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export type ColorEnum =
  | "WHITE"
  | "BLACK"
  | "BLUE"
  | "RED"
  | "SILVER"
  | "GREY"
  | "GREEN"
  | "GOLDEN"
  | "";
export interface vehicleData {
  vin: string;
  code: string;
  mfgDate: string;
  price: number;
  batteryKwh: number;
  rangeKm: number;
  seat: number;
  baseWarrantyMonths: number;
  color: ColorEnum;
  status: Enum;
  modelId: string;
  version: string;
  imageFile: File | null;
}
export const createVehicle = async (formData: FormData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/vehicles`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
        // ❗ Không đặt Content-Type
      },
      body: formData,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text);
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};


export const getVehicleById = async (id: string) => {
  try {
    const response = await fetchBaseResponse(`/vehicles/${id}`, {
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
export interface UpdateVehicle {
  id: string;
  color: ColorEnum;
  status: string;
  rangeKm: number;
  version: Enum;
}
export const UpdateVehicleById = async ({
  id,
  color,
  status,
  rangeKm,
  version
}: UpdateVehicle) => {
  try {
    const response = await fetchBaseResponse(`/vehicles`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      data: { id, color, status, rangeKm, version }
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export const deleteVehicleById = async (id: string) => {
  try {
    const response = await fetchBaseResponse(`/vehicles/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.status === 204) {
      return true;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
export const searchFilter = async ({
  modelId,
  status,
  color,
  vin,
  vinContains,
  minRangeKm,
  dealerId,
  manufacturerName,
  version
}: {
  modelId?: string;
  status?: string;
  color?: ColorEnum;
  vin?: string;
  vinContains?: string;
  minRangeKm?: number;
  dealerId?: string;
  manufacturerName?: string;
  version?: string;
}) => {
  try {
    const response = await fetchBaseResponse("/vehicles", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      params: {
        modelId,
        status,
        color,
        vin,
        vinContains,
        minRangeKm,
        dealerId,
        manufacturerName,
        version
      }
    });

    if (response.status === 200) {
      return response.data; // chứa success, message, data
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
export const getVehicleCountByModelId = async (modelId: string) => {
  try {
    const response = await fetchBaseResponse(`/vehicles/${modelId}/counts`, {
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
export const getVehicleStockById = async (dealerId: string) => {
  try {
    const response = await fetchBaseResponse(`/vehicles/${dealerId}/stock`, {
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
export const getVehicleDealerByInventory = async (dealerId: string) => {
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
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
