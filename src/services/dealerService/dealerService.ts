import { UpdateDealer } from "@/app/evm/admin/dealerView/types/types";
import { fetchBaseResponse } from "@/config/api.config";
import { Staff } from "../staffService/staff";

export const getAllDealer = async () => {
  try {
    const response = await fetchBaseResponse(`/dealers`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    if (response.message === "Dealers retrieved successfully") {
      return response.data;
    }

    console.warn("⚠️ Unexpected response:", response);
    return [];
  } catch (error) {
    console.error("❌ Error fetching dealers:", error);
    return [];
  }
};

export const getDealerById = async (id: string) => {
  try {
    const response = await fetchBaseResponse(`/dealers/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    if (response.message === "Dealer retrieved successfully") {
      return response.data;
    }

    console.warn("⚠️ Unexpected response:", response);
    return null;
  } catch (error) {
    console.error("❌ Error fetching dealer by ID:", error);
    return null;
  }
};

interface DealerPayload {
  code: string;
  name: string;
  phone: string;
  email: string;
  address: string;
}

export const createDealer = async (payload: DealerPayload) => {
  try {
    const response = await fetchBaseResponse(`/dealers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: payload
    });

    if (response.message === "Dealer created successfully") {
      return response;
    }

    throw new Error(response.message || "Failed to create dealer");
  } catch (error) {
    console.error("❌ Error creating dealer:", error);
    throw error;
  }
};

export const updateDealerById = async (id: string, payload: UpdateDealer) => {
  try {
    const response = await fetchBaseResponse(`/dealers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      data: payload
    });

    if (response.message === "Dealer updated successfully") {
      return response.data;
    }

    throw new Error(response.message || "Failed to update dealer");
  } catch (error) {
    console.error("❌ Error updating dealer by ID:", error);
    throw error;
  }
};

/* ==============================
   👥 Dealer - Staff Management
============================== */

export interface StaffProps {
  id: string;
  fullName: string;
}

export interface DealerStaff {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  createdAt: string;
  contents: StaffProps[];
}

/**
 * 🧩 Thêm nhiều nhân viên vào đại lý
 * Backend yêu cầu body là: ["uuid1", "uuid2"]
 */
export const addMultipleStaffToDealer = async (
  dealerId: string,
  staffIds: string[]
) => {
  try {
    const response = await fetchBaseResponse(`/dealers/${dealerId}/staff`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: staffIds // ✅ gửi trực tiếp mảng UUID
    });

    if (response.status === 200 || response.success) {
      return response.data;
    }

    throw new Error(response.message || "Failed to add staff to dealer");
  } catch (error) {
    console.error("❌ Error adding staff to dealer:", error);
    throw error;
  }
};
interface DealerStaffResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    staffs: Staff[];
  };
}

/**
 * 👀 Lấy danh sách staff theo dealerId
 */
/**
 * 👥 Lấy danh sách staff theo dealerId
 *
 * - Gọi API: `/dealers/:dealerId/staff`
 * - Trả về danh sách `Staff[]` nếu thành công
 * - Luôn đảm bảo type an toàn, không dùng `any`
 */
export const getDealerIdByStaff = async (
  dealerId: string
): Promise<Staff[] | null> => {
  try {
    // 🛰️ Gọi API để lấy danh sách staff theo dealerId
    // Vì không chắc chắn backend trả về kiểu gì => dùng `unknown`
    const response: unknown = await fetchBaseResponse(
      `/dealers/${dealerId}/staff`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      }
    );

    console.log("📦 Raw dealer staff response:", response);

    /**
     * ✅ Hàm kiểm tra runtime (type guard)
     * Mục đích: xác định response có đúng shape của DealerStaffResponse không
     */
    const isDealerStaffResponse = (r: unknown): r is DealerStaffResponse => {
      // Phải là object (không null)
      if (typeof r !== "object" || r === null) return false;

      // Ép tạm về Record<string, unknown> để kiểm tra key động
      const obj = r as Record<string, unknown>;

      // Kiểm tra từng thuộc tính bắt buộc
      return (
        typeof obj.success === "boolean" && // success phải là boolean
        typeof obj.message === "string" && // message là string
        typeof obj.data === "object" && // data là object
        obj.data !== null &&
        // data.staffs phải là mảng
        Array.isArray((obj.data as { staffs: unknown }).staffs)
      );
    };

    /**
     * 🧩 Case 1: API chuẩn (đúng định dạng DealerStaffResponse)
     * Trả về mảng staffs trong response.data.staffs
     */
    if (isDealerStaffResponse(response)) {
      return response.data.staffs;
    }

    /**
     * 🧩 Case 2: Backend trả về { data: Staff[] } (thiếu success, message)
     */
    if (
      typeof response === "object" &&
      response !== null &&
      Array.isArray((response as { data?: unknown }).data)
    ) {
      return (response as { data: Staff[] }).data;
    }

    /**
     * 🧩 Case 3: Backend trả trực tiếp mảng Staff[] ở root
     * (ví dụ: `[ { id: "...", fullName: "..." }, ... ]`)
     */
    if (Array.isArray(response)) {
      // Kiểm tra từng phần tử xem có dạng { id, fullName }
      const isValidStaffArray = response.every(
        (s) =>
          typeof s === "object" && s !== null && "id" in s && "fullName" in s
      );

      if (isValidStaffArray) {
        return response as Staff[];
      }
    }

    /**
     * ⚠️ Nếu không trúng case nào → cảnh báo dữ liệu không hợp lệ
     */
    console.warn("⚠️ Không có dữ liệu staffs hợp lệ:", response);
    return null;
  } catch (error) {
    /**
     * ❌ Nếu lỗi mạng / API / parse → log lỗi và trả về null
     */
    console.error("❌ Error fetching dealer staffs:", error);
    return null;
  }
};
