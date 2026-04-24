import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000
});

API.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export interface BaseResponse<T> {
  status: number; // HTTP status code
  data: T; // payload
  message: string; // thông điệp server
  serverStatus?: number; // status trong body (nếu có)
  success?: boolean;
}
export async function fetchBaseResponse<T = unknown>(
  url: string,
  config?: AxiosRequestConfig
): Promise<BaseResponse<T>> {
  try {
    const response: AxiosResponse = await API(url, config);
    const raw = response.data;

    if (Array.isArray(raw)) {
      return {
        status: response.status,
        data: raw as T,
        message: "Success",
        serverStatus: response.status,
        success: true
      };
    }

    if (typeof raw === "object" && raw !== null) {
      return {
        status: response.status,
        data: (raw.data !== undefined ? raw.data : raw) as T,
        message: raw.message || "Success",
        serverStatus: raw.status || response.status,
        success: raw.success || false
      };
    }

    return {
      status: response.status,
      data: raw as T,
      message: "Success",
      serverStatus: response.status,
      success: true
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const raw = error.response?.data;
      console.error("❌ API Error:", raw || error.message);

      // Ném nguyên JSON backend nếu có, fallback mới dùng message/status mặc định
      throw (
        raw || {
          status: error.response?.status || 500,
          message: "Lỗi kết nối máy chủ",
          error: "Internal Server Error",
          timestamp: new Date().toISOString()
        }
      );
    }

    // fallback nếu không phải lỗi từ axios
    console.error("❌ Unknown Error:", error);
    throw {
      status: 500,
      message: "Unexpected error",
      error: "Internal Server Error",
      timestamp: new Date().toISOString()
    };
  }
}

export default API;
