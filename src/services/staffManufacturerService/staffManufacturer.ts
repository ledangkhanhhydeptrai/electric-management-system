import { fetchBaseResponse } from "@/config/api.config";
export interface ManuProps{
  id:string;
  fullName:string;
  position:string;
  title:string;
  workLocation:string;
}
export const getAllManufacturerServiceForManager = async () => {
  try {
    const response = await fetchBaseResponse(`/staffs/manufacturer`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error", error);
  }
};
