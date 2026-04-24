import { fetchBaseResponse } from "@/config/api.config";

export interface Staff {
  id: string;
  fullName: string;
  dealerId: string;
  // Fake fields
  title: string; // Chức vụ
  position: string; // Vị trí
  workLocation: string; // Nơi làm việc
}
export interface StaffDealer {
  fullName: string;
  dealerId: string;
}
export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: number;
  unpaged: boolean;
  paged: boolean;
}
export interface StaffSearchProps {
  q?: string;
  role?: string;
  status?: string;
  createdFrom?: string;
  createdTo?: string;
  page?: number;
  size?: number;
}

export interface StaffResponse {
  success: boolean;
  status: number;
  message: string;
  data: {
    content: Staff[];
    pageable: Pageable;
    last: boolean;
    totalElements: number;
    totalPages: number;
    first: boolean;
    size: number;
    number: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    numberOfElements: number;
    empty: boolean;
  };
}

/**
 * 🔎 API: Tìm kiếm staff theo query
 */
export const searchStaff = async ({
  q,
  role,
  status,
  createdFrom,
  createdTo,
  page = 0,
  size = 20
}: StaffSearchProps): Promise<StaffResponse | null> => {
  try {
    const params = new URLSearchParams();

    if (q) params.append("q", q);
    if (role) params.append("role", role);
    if (status) params.append("status", status);
    if (createdFrom) params.append("createdFrom", createdFrom);
    if (createdTo) params.append("createdTo", createdTo);
    params.append("page", page.toString());
    params.append("size", size.toString());

    const response = await fetchBaseResponse(`/staffs?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (response.success || response.status === 200) {
      return response as StaffResponse;
    }

    throw new Error(response.message || "Failed to fetch staff list");
  } catch (error) {
    console.error("❌ Error in searchStaff:", error);
    return null;
  }
};

/**
 * 👥 API: Lấy tất cả staff (dạng array)
 */
export const getAllStaff = async (): Promise<Staff[]> => {
  try {
    const response = (await fetchBaseResponse(`/staffs`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })) as StaffResponse;

    // ✅ Trường hợp backend trả về { data: { content: [...] } }
    if (Array.isArray(response.data.content)) {
      return response.data.content;
    }

    // ✅ Nếu backend trả về trực tiếp mảng
    if (Array.isArray(response)) {
      return response;
    }

    if (Array.isArray(response?.data)) {
      return response.data as Staff[];
    }

    console.warn("⚠️ Không nhận được mảng staff hợp lệ:", response);
    return [];
  } catch (error) {
    console.error("❌ Error fetching staff:", error);
    return [];
  }
};
export const createStaff = async ({
  fullName,
  accountId,
  position,
  title,
  workLocation
}: {
  fullName: string;
  accountId: string;
  position: string;
  title: string;
  workLocation: string;
}) => {
  try {
    const response = await fetchBaseResponse(`/staffs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: { fullName, accountId, position, title, workLocation }
    });
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export const updateStaff = async (
  id: string,
  {
    fullName,
    dealerId,
    position,
    title,
    workLocation
  }: {
    fullName: string;
    dealerId: string;
    position: string;
    title: string;
    workLocation: string;
  }
) => {
  try {
    const response = await fetchBaseResponse(`/staffs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      data: { fullName, dealerId, position, title, workLocation }
    });
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export const getStaffUnassgined = async () => {
  try {
    const response = await fetchBaseResponse(`/staffs/unassigned`, {
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
