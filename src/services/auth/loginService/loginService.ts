// loginUser.ts
import { fetchBaseResponse } from "@/config/api.config";
export interface LoginResponseData {
  token: string;
  roles: string[];
}
export interface LoginData {
  username: string;
  password: string;
}
export interface LoginResponse {
  status: number;
  message: string;
  data: LoginResponseData;
}
export async function loginUser(
  data: LoginData
): Promise<LoginResponse | undefined> {
  const res = await fetchBaseResponse("/auth/login", {
    method: "POST",
    data,
    headers: { "Content-Type": "application/json" }
  });

  // Nếu API trả status !== 200, throw để component xử lý
  if (res.success !== true) {
    throw { message: res.message || "Đăng nhập thất bại", status: res.status };
  }
  // Trả về data khi login thành công
  if (res.success === true || res.message === "Login successful") {
    const loginData = res.data as LoginResponseData;
    if (typeof window !== "undefined" && loginData.token) {
      localStorage.setItem("token", loginData.token);
      localStorage.setItem("roles", JSON.stringify(loginData.roles));
    }
    return {
      data: loginData,
      message: res.message,
      status: res.status
    };
  }
}
