import { fetchBaseResponse } from "@/config/api.config";
export type Enum = "EVM_STAFF" | "DEALER_MANAGER" | "DEALER_STAFF" | "ADMIN";
export interface RegisterData {
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
  roleType: Enum;
}

export async function registerUser(data: RegisterData) {
  try {
    const res = await fetchBaseResponse("/accounts", {
      method: "POST",
      data, // Axios tự stringify JSON
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (res.success !== true) {
      // Throw nguyên response để frontend dùng message, status...
      throw res;
    }

    return res;
  } catch (error: unknown) {
    // Nếu backend trả lỗi dạng JSON chuẩn { message: string, ... }
    if (error && typeof error === "object" && "message" in error) {
      throw error;
    }

    // fallback nếu không phải object hoặc không có message
    throw { message: "Đăng ký thất bại" };
  }
}
