import { fetchBaseResponse } from "@/config/api.config";

export const getAllDealerAccount = async () => {
  try {
    const response = await fetchBaseResponse(`/accounts/dealer`, {
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
