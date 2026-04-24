import { Role } from "@/app/types/User/Role";
import { fetchBaseResponse } from "@/config/api.config";
export interface ProfileProps {
  id: string;
  username: string;
  email: string;
  role: Role;
  fullName: string;
  dealerName: string;
}
export const getProfile = async () => {
  try {
    const response = await fetchBaseResponse(`/accounts/profile`, {
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
