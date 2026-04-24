import { fetchBaseResponse } from "@/config/api.config";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export type Enum = "ECO" | "PLUS" | "PREMIUM" | "";
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};
export interface Model {
  name: string;
  year: number;
  horsepower: number;
  version: Enum;
  rangeKm: number;
  batteryCapacity: number;
  description: string;
  basePrice: number;
  imageFile: File | null; // thêm trường file ảnh
}
export interface Models {
  id: string;
  name: string;
  year: number;
  horsepower: number;
  version: string;
  rangeKm: number;
  batteryCapacity: number;
  description: string;
  manufacturerId: number;
  manufacturerName: string;
  basePrice: number;
}
export interface UpdateModels {
  name: string;
  year: number;
  horsepower: number;
  rangeKm: number;
  batteryCapacity: number;
  description: string;
  basePrice: number;
}
export const createModel = async ({
  name,
  year,
  horsepower,
  version,
  rangeKm,
  batteryCapacity,
  description,
  basePrice,
  imageFile
}: Model) => {
  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("year", year.toString());
    formData.append("horsepower", horsepower.toString());
    formData.append("version", version);
    formData.append("rangeKm", rangeKm.toString());
    formData.append("batteryCapacity", batteryCapacity.toString());
    formData.append("description", description);
    formData.append("basePrice", basePrice.toString());

    if (imageFile) formData.append("imageFile", imageFile);

    const response = await fetch(`${API_URL}/vehicle-models`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
        // KHÔNG set Content-Type
      },
      body: formData
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating model:", error);
    throw error;
  }
};

export const getAllModel = async () => {
  try {
    const response = await fetchBaseResponse(`/vehicle-models`, {
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
export const getModelById = async (id: string) => {
  try {
    const response = await fetchBaseResponse(`/vehicle-models/${id}`, {
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
export const updateModelById = async (id: string, modelData: UpdateModels) => {
  try {
    const response = await fetchBaseResponse(`/vehicle-models/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      data: modelData
    });
    console.log("Response:", response);
    if (response.message === "Update VehicleModel successful") {
      return response;
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export const deleteModelById = async (id: string) => {
  try {
    const response = await fetchBaseResponse(`/vehicle-models/${id}`, {
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
