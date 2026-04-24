import { fetchBaseResponse } from "@/config/api.config";

// export const getAllManufacturers = async () => {
//   try {
//     const response = await fetchBaseResponse(`/manufacturers`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json"
//       }
//     });
//     if (response.message === "Manufacturers retrieved successfully") {
//       return response.data;
//     }
//   } catch (error) {
//     console.error("Error fetching manufacturers:", error);
//     return null;
//   }
// };
interface ManufacturerData {
  code: string;
  name: string;
  country: string;
}
export const createManufacturer = async ({
  code,
  name,
  country
}: ManufacturerData) => {
  try {
    const response = await fetchBaseResponse(`/manufacturers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: { code, name, country }
    });

    if (response.message === "Manufacturer created successfully") {
      return response;
    }
  } catch (error) {
    console.error("Error creating manufacturer:", error);
    throw error;
  }
};
export const manufacturerById = async (id: number) => {
  try {
    const response = await fetchBaseResponse(`/manufacturers/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.message === "Manufacturer retrieved successfully") {
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching manufacturer by ID:", error);
  }
};
export const updateManufacturerById = async (
  id: number,
  payload: { code: string; name: string; country: string }
) => {
  try {
    const response = await fetchBaseResponse(`/manufacturers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      data: payload
    });

    if (response.message === "Manufacturer updated successfully") {
      return response;
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
