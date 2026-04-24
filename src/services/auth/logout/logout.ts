import { fetchBaseResponse } from "@/config/api.config";

export async function Logout() {
  try {
    await fetchBaseResponse("/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("roles");
    }
    return true;
  } catch (error) {
    console.error("Error", error);
    return false;
  }
}
